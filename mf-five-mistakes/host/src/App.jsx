import React from "react";
import ReactDOM from "react-dom";

// import Counter from "remote/Counter";

import "./index.scss";

import { importRemote } from "@module-federation/utilities";

function System(props) {
  const {
    system,
    system: { url, scope, module },
  } = props;

  if (!system || !url || !scope || !module) {
    return <h2>No system specified</h2>;
  }

  const Component = React.lazy(() => importRemote({ url, scope, module }));

  return (
    <React.Suspense fallback="Loading System">
      <ErrorBoundary>
        <Component app={{ name: scope }} />
      </ErrorBoundary>
    </React.Suspense>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const App = () => {
  const [system, setSystem] = React.useState({});
  function setApp2() {
    setSystem({
      url: "http://localhost:3001",
      scope: "remote",
      module: "./Counter",
    });
  }

  function setApp3() {
    setSystem({
      url: "http://localhost:3003",
      scope: "app3",
      module: "./Widget",
    });
  }
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>HOST</div>
      <button onClick={setApp2}>Load App 2 Widget</button>
      <br></br>
      <button onClick={setApp3}>Load App 3 Widget</button>
      <div style={{ marginTop: "2em" }}>
        <System system={system} />
      </div>
      {/* <ErrorBoundary>
        <Counter app={{ name: "Host" }} />
      </ErrorBoundary> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
