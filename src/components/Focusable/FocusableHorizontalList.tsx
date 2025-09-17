import React, { useEffect } from "react";
import type { FocusableItemType } from "./FocusableItem";
import FocusableContainer from "./FocusableContainer";
import { Keys } from "../../types";
import { logger } from "../../utils";
import useNavigator, { navigatorStore } from "../../hooks/useNavigator";
import type { FocusableListProps } from "./types";
import FocusableItem from "./FocusableItem";
import Card from "../Card";

const FocusableHorizontalList = ({
  containerId,
  className,
  forceActive,
  itemComponent,
  itemClassName,
  items,
  parentId,
  selectedItemClassName,
}: FocusableListProps) => {
  const { notify, setActiveId, getActiveContainer } = useNavigator();
  const [currIndex, setCurrIndex] = React.useState(0);
  const activeContainer = getActiveContainer();

  const keysRemapping = {
    [Keys.Right]: (e: KeyboardEvent) => {
      logger.debug("TEST : LIST : Right key pressed on list");
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
    [Keys.Down]: (e: KeyboardEvent) => {
      notify(e);
    },
    [Keys.Up]: (e: KeyboardEvent) => {
      notify(e);
    },
  };

  const handler = {
    onLoad: () => {},
    onUnload: () => {},
  };

  useEffect(() => {
    if (!activeContainer) return;
    if (activeContainer.id === containerId && items.length > 0) {
      setActiveId(items[0]?.id as string);
      setCurrIndex(0);
    }
  }, [activeContainer]);

  return (
    <FocusableContainer
      id={containerId}
      forceActive={forceActive}
      keysRemapping={keysRemapping}
      parentId={parentId}
      handler={handler}
      className={className}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {items.map((item: any, index) => {
        return <Card item={item as { id: string }} />;
      })}
    </FocusableContainer>
  );
};

export default FocusableHorizontalList;
