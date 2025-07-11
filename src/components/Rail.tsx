import { useEffect, useState } from "react";
import useNavigator from "../hooks/useNavigator";
import { Keys } from "../types";
import { logger } from "../utils";
import ContainerComp from "./Container";

type RailProps = {
  items: unknown[];
  id: string;
};

const Card: React.FC<{ item: unknown; selected: boolean }> = ({
  item,
  selected,
}) => {
  return (
    <div className={`card ${selected ? "selected" : ""}`}>
      {JSON.stringify(item)}
    </div>
  );
};

const Rail: React.FC<RailProps> = ({ items, id }) => {
  const { notify, getActiveContainer } = useNavigator(id);
  const activeContainer = getActiveContainer();

  useEffect(() => {
    console.log("xxx Rail component mounted with id:", activeContainer, id);
  }, [activeContainer]);

  const [currIndex, setCurrIndex] = useState(0);
  const keysRemapping = {
    [Keys.Right]: (e: KeyboardEvent) => {
      logger.debug("Right key pressed on rail", e);
      // notify(e);
      if (currIndex >= items.length - 1) {
        setCurrIndex(0);
      } else {
        setCurrIndex((prev) => prev + 1);
      }
    },
    [Keys.Left]: (e: KeyboardEvent) => {
      if (currIndex === 0) {
        notify(e);
      } else {
        setCurrIndex((prev) => prev - 1);
      }
    },
    [Keys.Up]: (e: KeyboardEvent) => {
      console.log("xxx key up pressed on rail", e);
      notify(e);
    },
    [Keys.Down]: (e: KeyboardEvent) => {
      console.log("xxx key down pressed on rail", e);
      notify(e);
    },
  };

  useEffect(() => {
    return () => {
      // Save state
    };
  }, []);

  const handler = {
    onLoad: () => {},
    onUnload: () => {},
  };

  console.log("xxx in rail, active:", activeContainer);

  return (
    <ContainerComp id={id} keysRemapping={keysRemapping} handler={handler}>
      <div style={{ display: "flex" }}>
        {items.map((item, idx) => {
          //   const isSelected = activeContainer?.id === id && idx === currIndex;
          return <Card item={item} selected={idx === currIndex} />;
        })}
      </div>
    </ContainerComp>
  );
};

export default Rail;
