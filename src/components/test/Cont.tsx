import { useEffect } from "react";
import useNav from "../../hooks/useNav";
import type { ContainerProps } from "../../types";
import { logger } from "../../utils";

const Cont: React.FC<ContainerProps> = ({
    id,
    keysRemapping,
    handler,
    children,
    parentId
}) => {
    const { registerContainer, unregisterContainer } = useNav();


    useEffect(() => {
        return () => {
            // TBD: Handle cleanup if necessary
            logger.debug(`Container unregistered: ${id}`);
            unregisterContainer(id);
        }
    }, [])

    useEffect(() => {
        const container = { id, keysRemapping, handler, parentId };
        registerContainer(container);
        logger.debug(`Container registered: ${id}`);
        // return () => {
        //     // TBD: Handle cleanup if necessary
        //     logger.debug(`Container unregistered: ${id}`);
        //     unregisterContainer(id);
        // };
    }, [keysRemapping, handler]);

    return <>{children}</>;
};

export default Cont;
