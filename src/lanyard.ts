import { useEffect, useState } from "react";
import useSWR from "swr";
import { API_URL, HEARTBEAT_INTERVAL } from "./constants";
import type {
	LanyardData,
	LanyardGeneric,
	LanyardOptions,
	LanyardResponse,
} from "./types";

export const useLanyard = <T extends LanyardOptions>(
	options: T,
): LanyardGeneric<T> => {
	const apiUrl = options.apiUrl || API_URL;

	if (options.socket) {
		const [status, setStatus] = useState<LanyardData>();
		const [websocket, setWebsocket] = useState<WebSocket>();
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			const supportsWebSocket =
				"WebSocket" in window || "MozWebSocket" in window;
			if (options.socket && !supportsWebSocket)
				throw new Error(
					"Browser doesn't support WebSocket connections.",
				);

			const subscription =
				typeof options.userId === "object"
					? "subscribe_to_ids"
					: "subscribe_to_id";

			let heartbeat: NodeJS.Timeout;
			let socket: WebSocket;

			const connectWebsocket = () => {
				if (heartbeat) clearInterval(heartbeat);

				socket = new WebSocket(`wss://${apiUrl}/socket`);
				setWebsocket(socket);
				setLoading(true);

				socket.addEventListener("open", () => {
					socket.send(
						JSON.stringify({
							op: 2,
							d: {
								[subscription]: options.userId,
							},
						}),
					);

					heartbeat = setInterval(() => {
						socket.send(
							JSON.stringify({
								op: 3,
							}),
						);
					}, HEARTBEAT_INTERVAL);
				});

				socket.addEventListener("message", ({ data }) => {
					const { t, d } = JSON.parse(data) as {
						t: "INIT_STATE" | "PRESENCE_UPDATE";
						d: LanyardData;
					};
					if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
						setStatus(d || ({} as LanyardData));
						if (loading) setLoading(false);
					}
				});

				socket.addEventListener("close", connectWebsocket);
			};

			connectWebsocket();

			return () => {
				clearInterval(heartbeat);
				socket.removeEventListener("close", connectWebsocket);
				socket.close();
			};
		}, []);

		return { websocket, loading, status } as LanyardGeneric<T>;
	} else {
		if (typeof options.userId === "string") {
			return useSWR<LanyardResponse>(
				`lanyard_${options.userId}`,
				async () => {
					const req = await fetch(
						`https://${apiUrl}/v1/users/${options.userId}`,
					);

					const body = (await req.json()) as LanyardResponse;
					if (body.error) throw new Error(body.error.message);

					return body;
				},
			) as LanyardGeneric<T>;
		} else {
			return useSWR<LanyardResponse[]>(
				`lanyard_${options.userId.join("_")}`,
				async () => {
					const responseArray: LanyardResponse[] = [];

					for (const id of options.userId) {
						const req = await fetch(
							`https://${apiUrl}/v1/users/${id}`,
						);

						const body = (await req.json()) as LanyardResponse;
						if (body.error) throw new Error(body.error.message);

						responseArray.push(body);
					}

					return responseArray;
				},
			) as LanyardGeneric<T>;
		}
	}
};
