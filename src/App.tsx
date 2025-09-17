import { useEffect } from "react";
import "./App.css";
import useNavigator from "./hooks/useNavigator";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Layout from "./components/Layout";
import Example from "./pages/example";
import NewPage from "./pages/newPage";

function App() {
  const { keydownHandler, setActiveContainer } = useNavigator();

  // useEffect(() => {
  //   setActiveContainer("app", null);
  // }, []);

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
        <Route path="example" element={<Example />} />
        <Route path="new" element={<NewPage />} />
      </Route>
    </Routes>
  );
}

export default App;
