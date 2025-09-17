import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import useNavigator, { navigatorStore } from "../hooks/useNavigator";
import { Keys, type Container } from "../types";
import { logger } from "../utils";
import ContainerComp from "./Container";

type BoxProps = {
  components: any[];
  id: string;
  className?: string;
};

const Box: React.FC<BoxProps> = ({ components, id, className }) => {
  const { notify, setActiveContainer } = useNavigator();
  const activeContainer = navigatorStore((state) => state.activeContainer);

  //   const activeId = navigatorStore((state) => state.activeId);
  //   const setActiveId = navigatorStore((state) => state.setActiveId);

  const [currIndex, setCurrIndex] = useState(0);
  const currIndexRef = useRef(0);

  useEffect(() => {
    if (components.length > 0 && activeContainer?.id === id) {
      const firstContainer = components[0] as Container;
      setActiveContainer(firstContainer.id, id);
    }
  }, [components, activeContainer]);

  useEffect(() => {
    currIndexRef.current = currIndex;
    console.log("TEST BOX REF CURR INDEX :", id, currIndex);
  }, [currIndex]);

  const keysRemapping = {
    [Keys.Right]: (e: KeyboardEvent) => {
      console.log("TEST BOX REF RIGHT :", currIndexRef.current);
      logger.debug("TEST Right key pressed on box", id, e, components);
      // notify(e);
      actionRight(e);
    },
    [Keys.Left]: (e: KeyboardEvent) => {
      console.log("TEST BOX REF LEFT :", currIndexRef.current);
      actionLeft(e);
    },
    [Keys.Down]: (e: KeyboardEvent) => {
      actionDOWN(e);
    },
    [Keys.Up]: (e: KeyboardEvent) => {
      actionUP(e);
    },
  };

  const actionUP = useCallback(
    (e: KeyboardEvent) => {
      console.log(
        "TEST BOX CURRINDEX ON UP: ",
        currIndexRef.current,
        currIndex
      );
      if (currIndexRef.current === 0) {
        notify(e);
      } else {
        setCurrIndex((prev) => prev - 1);
        console.log("TEST ID: ", components[currIndexRef.current - 1]);
        setActiveContainer(id + (currIndexRef.current - 1));
      }
    },
    [currIndex]
  );

  const actionDOWN = useCallback(
    (e?: KeyboardEvent) => {
      console.log(
        "TEST BOX CURRINDEX ON DOWN: ",
        currIndexRef.current,
        currIndex,
        id + (currIndexRef.current + 1),
        components.length - 1
      );
      if (currIndexRef.current < components.length - 1) {
        setCurrIndex((prev) => prev + 1);
        setActiveContainer(id + (currIndexRef.current + 1));
      } else {
        notify(e!);
      }
    },
    [currIndex]
  );

  const actionRight = useCallback(
    (e?: KeyboardEvent) => {
      console.log(
        "TEST BOX CURRINDEX ON RIGHT: ",
        currIndexRef.current,
        currIndex,
        id + (currIndexRef.current + 1),
        components.length - 1
      );
      if (currIndexRef.current < components.length - 1) {
        setCurrIndex((prev) => prev + 1);
        setActiveContainer("boxtop1");
      } else {
        notify(e!);
      }
    },
    [currIndex]
  );

  const actionLeft = useCallback(
    (e?: KeyboardEvent) => {
      console.log(
        "TEST BOX CURRINDEX ON LEFT: ",
        currIndexRef.current,
        currIndex,
        id + (currIndexRef.current + 1),
        components.length - 1
      );
      if (currIndexRef.current < components.length - 1) {
        setCurrIndex((prev) => prev - 1);
        setActiveContainer("boxtop0");
      } else {
        notify(e!);
      }
    },
    [currIndex]
  );

  useEffect(() => {
    return () => {
      // Save state
    };
  }, []);

  const handler = {
    onLoad: () => {
      console.log("TEST BOX onLoad", id + "0");
      setTimeout(() => {
        setActiveContainer(id + "0");
      }, 0);
    },
    onUnload: () => {},
  };

  const renderComponents = components.map((component: ReactNode) => component);

  return (
    //keysRemapping={components.length > 1 ? type === "horizontal" ? keysRemappingH : keysRemappingV : notify()}
    <ContainerComp id={id} keysRemapping={keysRemapping} handler={handler}>
      <div className={className}>
        {currIndex}
        {renderComponents}
      </div>
    </ContainerComp>
  );
};

export default Box;
