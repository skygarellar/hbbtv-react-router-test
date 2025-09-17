import { useEffect } from "react";
import useNavigator, { navigatorStore } from "../../hooks/useNavigator";
import type { Container, ContainerProps } from "../../types";
import { logger } from "../../utils";
import type { FocusableContainerProps } from "./types";

const FocusableContainer: React.FC<FocusableContainerProps> = ({
  children,
  className,
  forceActive,
  id,
  keysRemapping,
  handler,
  parentId,
  style,
}) => {
  const { registerContainer, unregisterContainer } = useNavigator();

  const activeContainer = navigatorStore((state) => state.activeContainer);

  useEffect(() => {
    const container: Container = { id, keysRemapping, handler, parentId };
    registerContainer(container);
    // logger.debug(`Container registered: ${id}`);

    // If forceActive is true, set this container as the active one
    if (forceActive) {
      navigatorStore((state) => state.setActiveContainer(id, parentId || null));
    }

    return () => {
      // TBD: Handle cleanup if necessary
      // logger.debug(`Container unregistered: ${id}`);
      unregisterContainer(container);
    };
  }, [keysRemapping, handler, id, registerContainer, unregisterContainer]);

  return (
    <div
      className={className}
      style={{
        ...style,
        border: activeContainer?.id === id ? "2px solid #ccc" : "none",
      }}
    >
      {children}
    </div>
  );
};

export default FocusableContainer;
