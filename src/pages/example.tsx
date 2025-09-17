import { useEffect } from "react";
import Page from "../components/Page";
import useNavigator, { navigatorStore } from "../hooks/useNavigator";
import { Keys } from "../types";
import { logger } from "../utils";
import Box from "../components/Box";
import List from "../components/List";
import CartList from "../components/CartList";
import "./example.css";
import ContainerBox from "../components/ContainerBox";
import FocusableHorizontalList from "../components/Focusable/FocusableHorizontalList";
import FocusableItem from "../components/Focusable/FocusableItem";
import Card from "../components/Card";
import FocusableContainer from "../components/Focusable/FocusableContainer";
import FocusableVerticalList from "../components/Focusable/FocusableVerticalList";

const MOCK_ITEMS = [{ id: "A1" }, { id: "A2" }, { id: "A3" }, { id: "A4" }];
const MOCK_ITEMS_B = [{ id: "B1" }, { id: "B2" }, { id: "B3" }, { id: "B4" }];

const Example = () => {
  const { setActiveContainer } = useNavigator();

  const leftComponent = [
    <ContainerBox
      key="A"
      id="boxtop00"
      type="horizontal"
      children={[
        <List
          id="AL"
          items={[{ id: "A1" }, { id: "A2" }, { id: "A3" }, { id: "A4" }]}
          type="horizontal"
        />,
      ]}
    />,
  ];

  const leftBox = [
    <Box
      key="A"
      id="A"
      components={leftComponent}
      className="top-left-side-container"
    />,
  ];

  const top = [
    leftBox,
    //  rightBox
  ];

  const box1 = [
    <ContainerBox
      className="container-vertical-1"
      id="boxtop0"
      key="AA"
      children={top}
      type="horizontal"
    />,
  ];

  const boxes = [
    { id: "boxtop", components: box1 },
    // { id: "boxbottom", components: box2 },
  ];

  // useEffect(() => {
  //   // console.log("Example mounted, setting active container to 'boxtop'");
  //   setActiveContainer("exemple", null);
  // }, [setActiveContainer]);

  useEffect(() => {
    console.log("Containers", navigatorStore.getState().containers);
  }, [navigatorStore.getState().containers]);

  const keysRemapping = {
    [Keys.Right]: (e: KeyboardEvent) => {
      console.log("TEST example right ");
    },
    [Keys.Left]: (e: KeyboardEvent) => {
      console.log("TEST example left ");
    },
    [Keys.Up]: (e: KeyboardEvent) => {
      console.log("TEST example up ");
    },
    [Keys.Down]: (e: KeyboardEvent) => {
      console.log("TEST example down ");
    },
  };

  return (
    <ContainerBox id="exemple" type="horizontal" keysRemapping={keysRemapping}>
      <FocusableHorizontalList
        containerId="A"
        items={MOCK_ITEMS}
        parentId="exemple"
      />
      <FocusableVerticalList
        containerId="B"
        items={MOCK_ITEMS_B}
        parentId="exemple"
      />
    </ContainerBox>
  );
};

export default Example;
