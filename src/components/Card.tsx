import React, { useEffect } from "react";
import useNavigator, { navigatorStore } from "../hooks/useNavigator";
import { logger } from "../utils";

const Card: React.FC<{ item: { id: string } }> = ({ item }) => {
  console.log("xxx render card", item.id);

  //   const selected = navigatorStore.getState().activeId === item.id;
  const activeId = navigatorStore((state) => state.activeId);
  const selected = activeId === item.id;
  useEffect(() => {
    logger.debug(
      "RENDER CARD: ",
      item.id,
      selected,
      navigatorStore.getState().activeId
    );
    return () => {
      logger.debug("RENDER CARD:  Card unmounted: ", item.id);
    };
  }, [navigatorStore.getState().activeId]);

  return <div className={`card ${selected ? "selected" : ""}`}>{item.id}</div>;
};

export default Card;
