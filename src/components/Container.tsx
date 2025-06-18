import { useEffect } from "react";
import useNavigator from "../hooks/useNavigator";
import type { ContainerProps } from "../types";

const Container: React.FC<ContainerProps> = ({
  id,
  keysRemapping,
  handler,
  children,
}) => {
  const { registerContainer, unregisterContainer } = useNavigator();

  useEffect(() => {
    const container = { id, keysRemapping, handler };
    registerContainer(container);

    return () => {
      // TBD: Handle cleanup if necessary
      // unregisterContainer(id);
    };
    
  }, [keysRemapping, handler, id, registerContainer, unregisterContainer]);

  return <>{children}</>;
};
export default Container;
