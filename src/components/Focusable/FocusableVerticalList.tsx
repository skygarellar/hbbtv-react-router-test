import React from "react";
import type { FocusableItemType } from "./FocusableItem";
import FocusableContainer from "./FocusableContainer";
import { Keys } from "../../types";
import { logger } from "../../utils";
import useNavigator, { navigatorStore } from "../../hooks/useNavigator";
import type { FocusableListProps } from "./types";
import Card from "../Card";

const FocusableVerticalList = ({
  containerId,
  className,
  forceActive,
  itemComponent,
  itemClassName,
  items,
  parentId,
  selectedItemClassName,
}: FocusableListProps) => {
  const { notify, setActiveId } = useNavigator();
  const [currIndex, setCurrIndex] = React.useState(0);

  const keysRemapping = {
    [Keys.Down]: (e: KeyboardEvent) => {
      logger.debug("TEST : LIST : Right key pressed on list");
      // notify(e);
      if (currIndex < items.length - 1) {
        setActiveId(items[currIndex + 1]?.id as string);
        setCurrIndex((prev) => prev + 1);
      } else notify(e);
    },
    [Keys.Up]: (e: KeyboardEvent) => {
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
    [Keys.Right]: (e: KeyboardEvent) => {
      notify(e);
    },
    [Keys.Left]: (e: KeyboardEvent) => {
      notify(e);
    },
  };

  return (
    <FocusableContainer
      id={containerId}
      forceActive={forceActive}
      keysRemapping={keysRemapping}
      parentId={parentId}
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {items.map((item: any, index: number) => {
        return <Card item={item as { id: string }} />;
      })}
    </FocusableContainer>
  );
};

export default FocusableVerticalList;
