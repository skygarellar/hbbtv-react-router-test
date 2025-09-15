import React, { useEffect } from "react";
import useNavigatorManager from "./NavigatorManager";
import type { ElementObj } from "../../types";

type WrapperProps = {
  id: string;
  children: React.ReactNode;
};

const Wrapper = ({ id, children }: WrapperProps) => {
  const {
    wrappers,
    selectedId,
    previousId,
    setImperativeSelection,
    keyListener,
  } = useNavigatorManager();
  const [elements, setElements] = React.useState<ElementObj[]>(
    wrappers[wrappers.findIndex((wrapper) => wrapper.id === id)].elements
  );
  const [selected, setSelected] = React.useState<boolean>(false);

  useEffect(() => {
    setSelected(selectedId === id);
  }, [selectedId, id]);

  return null;
};
