import { useEffect } from "react";
import "./App.css";
import useNavigator from "./hooks/useNavigator";
import Container from "./components/Container";
import { Keys } from "./types";

function App() {
  const { keydownHandler } = useNavigator();

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  const kRemapping = {
    [Keys.Left]: () => { console.log("TEST ::: LEFT") },
    [Keys.Right]: () => { console.log("TEST ::: RIGHT") },
    [Keys.Enter]: () => { console.log("TEST ::: ENTER") },
  };

  useEffect(() => { }, [])

  return (
    <>
      <h1>Hello world!</h1>
      <a href="/about">About</a>
      <Container id="Container1" keysRemapping={kRemapping} />
    </>
  );
}

export default App;
