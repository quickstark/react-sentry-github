import { useState } from "react";
import reactLogo from "./assets/react.svg";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import "./App.css";

let release = `react-sentry-github@1.0.0`;
let error_message = `Houston we have a 1st Error`;

Sentry.init({
  dsn: "https://08f1f241b9b94950806db3856f284080@o1347124.ingest.sentry.io/4503904517685248",
  integrations: [new BrowserTracing()],
  release: release,
  tracesSampleRate: 1.0,
});

class ValidationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = `ERROR: "${message}" from ${release} `; // (2)
  }
}

function App() {
  const [count, setCount] = useState(0);

  function handleClick(message) {
    throw new ValidationError(message);
  }

  Sentry.setContext("customer", {
    name: "Dirk Nielsen",
    address: "121 Main St",
    zip: "12121",
    nonsensitive: {
      favorite_color: "Yellow",
      favorite_movie: "Sentry",
      favorite_comic: "Marvel",
    },
    sensitive: {
      email: "dirk.nielsen@sentry.io",
      phone: "555-111-1212",
      socsec: "555-11-2121",
      cc: "378282246310005",
    },
  });
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
            handleClick(error_message);
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default Sentry.withProfiler(App);
