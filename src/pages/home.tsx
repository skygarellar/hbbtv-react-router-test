import { useEffect } from "react";
import Container from "../components/Container";
import Page from "../components/Page";
import Rail from "../components/Rail";
import useNavigator from "../hooks/useNavigator";

const Home = () => {
  const { setActiveContainer } = useNavigator("home");

  useEffect(() => {
    setActiveContainer("homerail");
  }, [setActiveContainer]);

  return (
    <Page name="home">
      <Container id="homeapp" keysRemapping={{}} handler={{}}>
        <Rail
          id="homerail"
          items={[{ id: "item1" }, { id: "item2" }, { id: "item3" }]}
        />
        <Rail
          id="homerail2"
          items={[{ id: "item4" }, { id: "item5" }, { id: "item6" }]}
        />
      </Container>
    </Page>
  );
};

export default Home;
