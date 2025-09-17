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

// type ListContainerProps = {
//   items: unknown[];
//   type?: "horizontal" | "vertical";
// };
// const ListContainer = ({items, type}: ListContainerProps) => {
//   return (
//     <div
//       style={
//         type === "horizontal"
//           ? {
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//             }
//           : {
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//             }
//       }
//     >
//       {items.map((item, idx) => (
//         <Card item={item as { id: string }} />
//       ))}
//     </div>
//   );
// };

// [{ id: "A1" }, { id: "A2" }, { id: "A3" }, { id: "A4" }]

// const itemComp = ({id}: {id: string}) => {
//   return <FocusableItem id={id}>

//   </FocusableItem>
// }

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
    // <List
    //   key="B"
    //   id="boxtop01"
    //   type="horizontal"
    //   items={[{ id: "B1" }, { id: "B2" }, { id: "B3" }, { id: "B4" }]}
    // />,
  ];

  const rightComponent = [
    <List
      key="C"
      id="boxtop10"
      type="vertical"
      items={[{ id: "C1" }, { id: "C2" }, { id: "C3" }, { id: "C4" }]}
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

  const rightBox = [
    <Box
      key="C"
      id="boxtop1"
      components={rightComponent}
      className="top-right-side-container"
    />,
  ];

  const top = [
    leftBox,
    //  rightBox
  ];
  // const leftRight = [leftBox, rightComponent]

  const box1 = [
    <ContainerBox
      className="container-vertical-1"
      id="boxtop0"
      key="AA"
      children={top}
      type="horizontal"
    />,
  ];

  // const box2 = [
  //   <List
  //     id="boxbottom0"
  //     className="list"
  //     items={[{ id: "D1" }, { id: "D2" }, { id: "D3" }, { id: "D4" }]}
  //   />,
  //   <List
  //     id="boxbottom1"
  //     className="list"
  //     items={[{ id: "E1" }, { id: "E2" }, { id: "E3" }, { id: "E4" }]}
  //   />,
  //   <List
  //     id="boxbottom2"
  //     className="list"
  //     items={[{ id: "F1" }, { id: "F2" }, { id: "F3" }, { id: "F4" }]}
  //   />,
  // ];

  const boxes = [
    { id: "boxtop", components: box1 },
    // { id: "boxbottom", components: box2 },
  ];

  useEffect(() => {
    // console.log("Example mounted, setting active container to 'boxtop'");
    setActiveContainer("boxtop", "example");
  }, [setActiveContainer]);

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
    // <Page name="example" keysRemapping={keysRemapping} handler={{}}>
    // {boxes.map((box) => (
    //   <ContainerBox
    //     key={box.id}
    //     id={box.id}
    //     children={box.components}
    //     type="horizontal"
    //   />
    // ))}
    // </Page>

        <FocusableContainer
          id={"example"}
          keysRemapping={keysRemapping}
          
        >
          {boxes.map((box) => (<FocusableHorizontalList items={box.components} className="list"/>))}
        </FocusableContainer>
      
  );
};

export default Example;
