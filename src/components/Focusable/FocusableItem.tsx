import type React from "react";
import { navigatorStore } from "../../hooks/useNavigator";
import type { FocusableItemProps } from "./types";

const FocusableItem = ({
  children,
  className,
  id,
  selectionClassName,
}: FocusableItemProps) => {
  
  const activeElement = navigatorStore((state) => state.activeId);
  const selected = activeElement === id;

  return (
    <div
      id={id}
      className={`${className} ${selected ? selectionClassName : ""}`}
    >
      {children}
    </div>
  );
};

export type FocusableItemType = typeof FocusableItem;

export default FocusableItem;
