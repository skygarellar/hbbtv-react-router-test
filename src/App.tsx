import { useEffect } from "react";
import "./App.css";
import useNav from "./hooks/useNav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Layout from "./components/Layout";
import Test from "./pages/test";

function App() {
  const { keydownHandler } = useNav("app");

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="test" element={<Test />} />
      </Route>
    </Routes>
  );
}

export default App;
