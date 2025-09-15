import { useCallback, useEffect, useMemo, useState } from "react";
import useNavigator, { navigatorStore } from "../../hooks/useNavigator";
import { Keys } from "../../types";
import { logger } from "../../utils";
import ContainerComp from "../Container";
import SelectableItem from "../SelectableItem";

type ListProps = {
  items: unknown[];
  id: string;
  className?: string;
  type?: string;
};

const Card: React.FC<{ item: { id: string }; selected: boolean }> = ({
  item,
  selected,
}) => {
  let classes = "card";
  if (selected) classes += " selected";
  return <div className={classes}>{item.id}</div>;
};

const ListTest: React.FC<ListProps> = ({
  items,
  id,
  className = "list",
  type = "horizontal",
}) => {
  const { notify } = useNavigator(id);

  const [currIndex, setCurrIndex] = useState(0);

  const handleRight = (e: KeyboardEvent) => {
    logger.debug("TEST : LIST : Right key pressed on list", currIndex);

    if (currIndex < items.length - 1) setCurrIndex((prev) => prev + 1);
    else notify(e);
  };

  const handleLeft = (e: KeyboardEvent) => {
    logger.debug("TEST : LIST : Left key pressed on list", currIndex);
    if (currIndex === 0) {
      notify(e);
    } else {
      setCurrIndex((prev) => prev - 1);
    }
  };

  const keysRemappingH = {
    [Keys.Right]: (e: KeyboardEvent) => handleRight(e),
    [Keys.Left]: (e: KeyboardEvent) => handleLeft(e),
  };

  const keysRemappingV = {
    [Keys.Down]: (e: KeyboardEvent) => {
      logger.debug("TEST : LIST : DOWN key pressed on list", e);
      // notify(e);
      if (currIndex < items.length - 1) setCurrIndex((prev) => prev + 1);
      else notify(e);
    },
    [Keys.Up]: (e: KeyboardEvent) => {
      if (currIndex === 0) {
        notify(e);
      } else {
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

  const mapping = type === "horizontal" ? keysRemappingH : keysRemappingV;

  return (
    <ContainerComp id={id} keysRemapping={mapping} handler={handler}>
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
        {items.map((item: any, idx) => (
          <Card item={item} selected={idx === currIndex} />
        ))}
      </div>
    </ContainerComp>
  );
};

export default ListTest;
