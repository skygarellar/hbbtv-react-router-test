import { useEffect } from "react";
import "./App.css";
import useNavigator from "./hooks/useNavigator";

function App() {
  const { keydownHandler } = useNavigator();

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);
  
  return (
    <>
      <h1>Hello world!</h1>
      <a href="/about">About</a>
    </>
  );
}

export default App;
