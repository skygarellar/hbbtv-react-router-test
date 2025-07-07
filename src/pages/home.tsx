import { useEffect } from "react";
import Page from "../components/Page";
import Rail from "../components/Rail";
import useNavigator from "../hooks/useNavigator";
import { Keys } from "../types";
import { logger } from "../utils";

const Home = () => {
  const { setActiveContainer } = useNavigator("home");

  
  useEffect(() => {
    setActiveContainer("homerail");
  }, [setActiveContainer]);

  const keysRemapping = {
    [Keys.Right]: (e: KeyboardEvent) => {
      logger.debug("Right key pressed on home", e);
    }
  };

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
