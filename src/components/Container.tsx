import { useEffect } from "react";
import useNavigator from "../hooks/useNavigator";
import type { ContainerProps } from "../types";
import { logger } from "../utils";

const Container: React.FC<ContainerProps> = ({
  id,
  keysRemapping,
  handler,
  children,
}) => {
  const { registerContainer, unregisterContainer } = useNavigator(id);

  useEffect(() => {
    const container = { id, keysRemapping, handler };
    registerContainer(container);
    logger.debug(`Container registered: ${id}`);
    return () => {
      // TBD: Handle cleanup if necessary
      logger.debug(`Container unregistered: ${id}`);
      unregisterContainer(id);
    };

  }, [keysRemapping, handler, id, registerContainer, unregisterContainer]);

  return <>{children}</>;
};

export default Container;
