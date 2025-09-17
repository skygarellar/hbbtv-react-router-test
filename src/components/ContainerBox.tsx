import React, { useEffect } from "react";
import useNavigator, { navigatorStore } from "../hooks/useNavigator";
import ContainerComp from "./Container";
import { Keys } from "../types";
import { logger } from "../utils";

type ContainerBoxProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  keysRemapping: { [key: string]: (e: KeyboardEvent) => void };
  type: "horizontal" | "vertical" | "matrix";
};

const ContainerBox = ({ id, children, className, keysRemapping, type }: ContainerBoxProps) => {
  const { notify, setActiveContainer } = useNavigator();
  const activeContainer = navigatorStore((state) => state.activeContainer);

  useEffect(() => {
    debugger;
    if (
      Array.isArray(children) &&
      children.length > 0
    //    &&
    //   activeContainer?.id === id
    ) {
      const firstContainer = children[0] as any;
      setActiveContainer(firstContainer.props.containerId, id);
    }
    // else {
    //   setActiveContainer(children[0].props.id, id);
    // }
  }, [children, activeContainer]);

//   const keysRemapping = {
//     [Keys.Right]: (e: KeyboardEvent) => {
//       console.log("TEST BOX REF RIGHT :", activeContainer);
//       logger.debug("TEST Right key pressed on box", id, e, activeContainer);
//       // notify(e);
//       // actionRight(e);
//     },
//     [Keys.Left]: (e: KeyboardEvent) => {
//       console.log("TEST BOX REF LEFT :", activeContainer);
//       // actionLeft(e);
//     },
//     [Keys.Down]: (e: KeyboardEvent) => {
//       console.log("TEST BOX REF DOWN :", activeContainer);
//       // actionDOWN(e);
//     },
//     [Keys.Up]: (e: KeyboardEvent) => {
//       console.log("TEST BOX REF UP :", activeContainer);
//       // actionUP(e);
//     },
//   };

  const handler = {
    onLoad: () => {
      console.log("TEST BOX onLoad", id + "0");
      setTimeout(() => {
        // setActiveContainer(id + "0");
      }, 0);
    },
    onUnload: () => {},
  };

  //   const renderComponents = children.map(
  //     (component: React.ReactNode) => component
  //   );

  return (
    <ContainerComp
      id={id}
      keysRemapping={keysRemapping}
      handler={handler}
      style={{
        display: "flex",
        flexDirection: type === "horizontal" ? "row" : "column",
      }}
    >
      {children}
    </ContainerComp>
  );
};

export default ContainerBox;
