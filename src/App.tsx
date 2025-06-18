import { useEffect } from "react";
import "./App.css";
import useNavigator from "./hooks/useNavigator";
import Rail from "./components/Rail";
import Container from "./components/Container";

function App() {
  const { keydownHandler, setActiveContainer } = useNavigator("app");

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  useEffect(() => {
    setActiveContainer("rail");
  }, [setActiveContainer]);

  return (
    <>
      <h3>SKY TV SKIN</h3>
      <Container id="app" keysRemapping={{}} handler={{}}>
        <a href="/about">About</a>
        <Rail
          id="rail"
          items={[{ id: "item1" }, { id: "item2" }, { id: "item3" }]}
        />
      </Container>
    </>
  );
}

export default App;
