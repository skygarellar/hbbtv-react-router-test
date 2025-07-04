import { useEffect, useState } from "react";
import Container from "../components/Container";
import Page from "../components/Page";
import Rail from "../components/Rail";
import useNavigator from "../hooks/useNavigator";
import { Keys } from "../types";

const Home = () => {

  const items = [
    {
      id: "homerail1",
      parentId: "home",
      items: [{ id: "item1" }, { id: "item2" }, { id: "item3" }]
    },
    {
      id: "homerail2",
      parentId: "home",
      items: [{ id: "item4" }, { id: "item5" }, { id: "item6" }]
    }
  ]

  const { setActiveContainer, notify } = useNavigator("home");

  const [currIndex, setCurrIndex] = useState<number>(0);

  useEffect(() => {
    setActiveContainer("home");
  }, []);

  const keysRemapping = {
    [Keys.Up]: (e: KeyboardEvent) => {
      console.log("********* keysRemapping container rails: ", e, currIndex, items.length - 1)
      setActiveContainer("homerail1");
      if (currIndex === 0)
        notify(e);
      else setCurrIndex(prev => prev - 1);
    },
    [Keys.Down]: (e: KeyboardEvent) => {
      console.log("********* keysRemapping container rails: ", e, currIndex, items.length - 1)
      if (currIndex < items.length - 1)
        setCurrIndex(prev => prev + 1);
      else notify(e)
    }
  };

  useEffect(() => {
    console.log("_:_:_:_:_:_:_:_:__:_:_: ", currIndex)
    setActiveContainer(items[currIndex].id)
  }, [currIndex])

  const handler = {
    onLoad: () => {
      console.log("+++++++++++++ ONLOAD")
      setActiveContainer("homerail1")
    },
    onUnload: () => { }
  }

  return (

    // <Page name="home">
    <Container id="home" keysRemapping={keysRemapping} handler={handler}>
      {/* <Rail
        id="homerail1"
        items={[{ id: "item1" }, { id: "item2" }, { id: "item3" }]}
      />
      <Rail
        id="homerail2"
        items={[{ id: "item4" }, { id: "item5" }, { id: "item6" }]}
      /> */}
      {items.map((rail) => <Rail id={rail.id} items={rail.items} parentId={rail.parentId} />)}
    </Container>
    // </Page>
  );
};

export default Home;
