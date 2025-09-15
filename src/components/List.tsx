import { useEffect, useState } from "react";
import useNavigator, { navigatorStore } from "../hooks/useNavigator";
import { Keys } from "../types";
import { logger } from "../utils";
import ContainerComp from "./Container";
import Card from "./Card";

type ListProps = {
  items: unknown[];
  id: string;
  className?: string;
  type?: string;
};

const List: React.FC<ListProps> = ({
  items,
  id,
  className = "list",
  type = "horizontal",
}) => {
  const { setActiveId, notify } = useNavigator(id);

  const [currIndex, setCurrIndex] = useState(0);

  const keysRemappingH = {
    [Keys.Right]: (e: KeyboardEvent) => {
      logger.debug(
        "TEST : LIST : Right key pressed on list",
        e,
        currIndex,
        navigatorStore.getState().activeId
      );
      // notify(e);
      if (currIndex < items.length - 1) {
        setActiveId(items[currIndex + 1]?.id as string);
        setCurrIndex((prev) => prev + 1);
      } else notify(e);
    },
    [Keys.Left]: (e: KeyboardEvent) => {
      logger.debug(
        "TEST : LIST : Left key pressed on list",
        e,
        currIndex,
        navigatorStore.getState().activeId
      );
      if (currIndex === 0) {
        notify(e);
      } else {
        setActiveId(items[currIndex - 1]?.id as string);
        setCurrIndex((prev) => prev - 1);
      }
    },
  };

  const keysRemappingV = {
    [Keys.Down]: (e: KeyboardEvent) => {
      logger.debug("TEST : LIST : DOWN key pressed on list", e);
      // notify(e);
      if (currIndex < items.length - 1) {
        setActiveId(items[currIndex + 1]?.id as string);
        setCurrIndex((prev) => prev + 1);
      } else notify(e);
    },
    [Keys.Up]: (e: KeyboardEvent) => {
      if (currIndex === 0) {
        notify(e);
      } else {
        setActiveId(items[currIndex - 1]?.id as string);
        setCurrIndex((prev) => prev - 1);
      }
    },
    [Keys.Right]: (e: KeyboardEvent) => {
      notify(e);
    },
    [Keys.Left]: (e: KeyboardEvent) => {
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

  const horizontalStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  };

  const verticalStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <ContainerComp
      id={id}
      keysRemapping={type === "horizontal" ? keysRemappingH : keysRemappingV}
      handler={handler}
    >
      <div
        className={className}
        style={
          type === "horizontal"
            ? {
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }
            : {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }
        }
      >
        {items.map((item, idx) => (
          <Card item={item as { id: string }} />
        ))}
      </div>
    </ContainerComp>
  );
};

export default List;
