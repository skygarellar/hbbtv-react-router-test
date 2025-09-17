import type React from "react";
import type { ContainerHandler, ContainerId, KeysRemapping } from "../../types";
import type { FocusableItemType } from "./FocusableItem";

export type FocusableContainerProps = {
  id: ContainerId;
  keysRemapping: KeysRemapping;
  handler?: ContainerHandler;
  parentId?: ContainerId | null;
  forceActive?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export type FocusableListProps = {
  containerId: string;
  className?: string;
  forceActive?: boolean;
  itemComponent?: React.ReactNode;
  itemClassName?: string;
  items: unknown[];
  ItemClassName?: string;
  parentId?: string | null;
  selectedItemClassName?: string;
};

export type FocusableItemProps = {
  children: React.ReactNode;
  className?: string;
  id: string;
  selectionClassName?: string;
};
