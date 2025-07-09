import { useEffect } from "react";
import ContainerComp from "../components/Container";
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
      <ContainerComp id="aboutapp" keysRemapping={{}} handler={{}}>
        <Rail
          id="aboutrail"
          items={[{ id: "item1" }, { id: "item2" }, { id: "item3" }]}
        />
      </ContainerComp>
    </Page>
  );
};

export default About;