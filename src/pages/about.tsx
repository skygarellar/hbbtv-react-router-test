import { useEffect } from "react";
import Container from "../components/Container";
import Page from "../components/Page";
import Rail from "../components/Rail";
import useNavigator from "../hooks/useNavigator";

const About = () => {

  const { setActiveContainer} = useNavigator("about");

  useEffect(() => {
    setActiveContainer("aboutrail");
  }, [setActiveContainer]);

  return (
    <Page name="about">
      <Container id="aboutapp" keysRemapping={{}} handler={{}}>
        <Rail
          id="aboutrail"
          items={[{ id: "item1" }, { id: "item2" }, { id: "item3" }]}
        />
      </Container>
    </Page>
  );
};

export default About;