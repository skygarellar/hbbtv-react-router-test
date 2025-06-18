import { useEffect } from "react";
import useNavigator from "../hooks/useNavigator";
import type { ContainerProps } from "../types";

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
console.log(`Container registered: ${id}`);
    return () => {
      // TBD: Handle cleanup if necessary
      console.log(`Container unregistered: ${id}`);
      unregisterContainer(id);
    };
    
  }, [keysRemapping, handler, id, registerContainer, unregisterContainer]);

  return <>{children}</>;
};

export default Container;
