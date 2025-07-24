import { useEffect } from "react";
import useNavigator from "../hooks/useNavigator";
import type { Container, ContainerProps } from "../types";
import { logger } from "../utils";

const ContainerComp: React.FC<ContainerProps> = ({
  id,
  keysRemapping,
  handler,
  children,
}) => {
  const { getActiveContainer, registerContainer, unregisterContainer } = useNavigator(id);

  const activeContainer = getActiveContainer();

  console.log("xxx active container in ContainerComp:", activeContainer?.id);

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
  console.log("xxx active container in", id);

  return <div style={activeContainer?.id === id ?{
    border: "2px solid #ccc",
  } : {border: "none"}}>{children}</div>;
};

export default ContainerComp;
