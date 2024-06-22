<p align="center">
  <img src="https://raw.githubusercontent.com/PHPxCODER/react-use-phplanyard/main/assets/readme.png" alt="Logo" />
  <h3 align="center">React Use PHPLanyard</h3>

  <p align="center">
    Use Lanyard API easily in your React app!
    <br />
    <a href="https://discord.gg/d4jpsFq76f"><strong>Get support »</strong></a>
    <br />
    <br />
    <a href="https://github.com/phpxcoder/react-use-phplanyard/issues">Report Bug</a>
    ·
    <a href="https://github.com/phpxcoder/react-use-phplanyard/issues">Request Feature</a>
    ·
    <a href="https://github.com/Phineas/lanyard">What Is Lanyard</a>
  </p>
</p>

# 📦 Installation

-   Using yarn: `yarn add react-use-phplanyard`
-   Using npm: `npm i react-use-phplanyard`

# 🤓 Usage

Using without websocket:

```js
import { useLanyard } from "react-use-phplanyard";

function App() {
	const lanyard = useLanyard({
		userId: "697757845063729194",
	});

	return (
		<pre>{!lanyard.isValidating && JSON.stringify(lanyard, null, 4)}</pre>
	);
}

export default App;
```

Using with websocket:

```js
import { useLanyard } from "react-use-phplanyard";

function App() {
	const { loading, status /*, websocket */ } = useLanyard({
		userId: "697757845063729194",
		socket: true,
	});

	return <pre>{!loading && JSON.stringify(status, null, 4)}</pre>;
}

export default App;
```

# 🔐 KV Support

You can create/delete KV pairs using this package.

```js
import { set, del } from "react-use-phplanyard";

// Set KV pair
await set({
	apiKey: "your_api_key", // get it using .apikey command on lanyard bot
	userId: "your_user_id",
	key: "test_key",
	value: "test value",
	// apiUrl: "phpxcoder.rest", // if you are using self-hosted api, not required by default
});

// Delete KV pair
await del({
	apiKey: "your_api_key",
	userId: "your_user_id",
	key: "test_key",
	// apiUrl: "phpxcoder.rest", // if you are using self-hosted api, not required by default
});
```

# 🤞 Using Self-Hosted API

You can use this package to connect to your own self-hosted Lanyard API. To do this, you need to pass the `apiUrl` option to the `useLanyard` hook. See [Lanyard self-hosting guide](https://github.com/Phineas/lanyard#self-host-with-docker) for more information.

Using without websocket:

```js
import { useLanyard } from "react-use-phplanyard";

function App() {
	const lanyard = useLanyard({
		userId: "697757845063729194",
		apiUrl: "phpxcoder.rest",
	});

	return (
		<pre>{!lanyard.isValidating && JSON.stringify(lanyard, null, 4)}</pre>
	);
}

export default App;
```

Using with websocket:

```js
import { useLanyard } from "react-use-phplanyard";

function App() {
	const { loading, status /*, websocket */ } = useLanyard({
		userId: "697757845063729194",
		socket: true,
		apiUrl: "phpxcoder.rest",
	});

	return <pre>{!loading && JSON.stringify(status, null, 4)}</pre>;
}

export default App;
```

# 📄 License

Copyright © 2021 [Barış DEMİRCİ](https://github.com/phpxcoder).

Distributed under the [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html) License. See `LICENSE` for more information.

# 🧦 Contributing

Feel free to use GitHub's features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/my-feature`)
3. Run prettier and eslint (`npm run format && npm run lint`)
4. Commit your Changes (`git commit -m 'my awesome feature my-feature'`)
5. Push to the Branch (`git push origin feature/my-feature`)
6. Open a Pull Request

# 🔥 Show your support

Give a ⭐️ if this project helped you!

# 📞 Contact

-   Mail: php@phpxcoder.in
-   Discord: [https://discord.gg/BjEJFwh](https://discord.gg/d4jpsFq76f)
-   Instagram: https://instagram.com/phpxcoder/

# ✨ Special Thanks

-   [Phineas](https://github.com/Phineas) - Creator of [Lanyard API](https://github.com/Phineas/lanyard)
-   [Eggsy](https://github.com/eggsy) - Creator of [vue-lanyard](https://www.npmjs.com/package/@eggsydev/vue-lanyard)
