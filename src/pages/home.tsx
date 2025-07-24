import { useEffect, useMemo } from "react";
import Page from "../components/Page";
import Rail from "../components/Rail";
import useNavigator from "../hooks/useNavigator";
import { Keys } from "../types";
import { logger } from "../utils";

const Home = () => {
  const { getActiveContainer,setActiveContainer } = useNavigator("home");

  const activeContainer = getActiveContainer();

  useEffect(() => {
    console.log("xxx entro nell effect pre set");
    setActiveContainer("homerail");
    console.log("xxx entro nell effect post set", activeContainer);
  }, [activeContainer, setActiveContainer]);

  const keysRemapping = useMemo(() => ({
    [Keys.Up]: (e: KeyboardEvent) => {
      console.log("xxx Up key pressed on home", e);
      // logger.log("xxx Right key pressed on home", e);
      setActiveContainer("homerail");
    },
    [Keys.Down]: (e: KeyboardEvent) => {
      console.log("xxx Down key pressed on home", e);
      // logger.log("xxx Right key pressed on home", e);
      setActiveContainer("homerail2");
    },
  }), [activeContainer, setActiveContainer]);

  console.log("xxx active container in home:", activeContainer);

  return (
    <Page name="home" keysRemapping={keysRemapping} handler={{}}>
      <Rail
        id="homerail"
        items={[{ id: "item1" }, { id: "item2" }, { id: "item3" }]}
        
      />
      <Rail
        id="homerail2"
        items={[{ id: "item4" }, { id: "item5" }, { id: "item6" }]}
      />
    </Page>
  );
};

export default Home;
