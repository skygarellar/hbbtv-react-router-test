import { useEffect } from "react";
import useNavigator, { navigatorStore } from "../hooks/useNavigator";
import type { Container, ContainerProps } from "../types";
import { logger } from "../utils";

const ContainerComp: React.FC<ContainerProps> = ({
  id,
  keysRemapping,
  handler,
  children,
  style,
}) => {
  const { registerContainer, unregisterContainer } = useNavigator();

  const activeContainer = navigatorStore((state) => state.activeContainer);

  useEffect(() => {
    const container: Container = { id, keysRemapping, handler };
    registerContainer(container);
    logger.debug(`Container registered: ${id}`);
    return () => {
      // TBD: Handle cleanup if necessary
      logger.debug(`Container unregistered: ${id}`);
      unregisterContainer(container);
    };
  }, [keysRemapping, handler, id, registerContainer, unregisterContainer]);

  return (
    <div
      style={{
        ...style,
        border: activeContainer?.id === id ? "2px solid #ccc" : "none",
      }}
    >
      {children}
    </div>
  );
};

export default ContainerComp;
