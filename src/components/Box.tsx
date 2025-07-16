import { useEffect, useMemo, useState, type ReactNode } from "react";
import useNavigator from "../hooks/useNavigator";
import { Keys } from "../types";
import { logger } from "../utils";
import ContainerComp from "./Container";

type BoxProps = {
    component: ReactNode;
    id: string;
};

const Box: React.FC<BoxProps> = ({ component, id }) => {

    const { notify } = useNavigator(id);

    const [currIndex, setCurrIndex] = useState(0);
    const keysRemapping = {
        [Keys.Right]: (e: KeyboardEvent) => {
            logger.debug("Right key pressed on box", e);
            // notify(e);
            setCurrIndex(prev => prev + 1);
        },
        [Keys.Left]: (e: KeyboardEvent) => {
            if (currIndex === 0) {
                notify(e);
            }
            else {
                setCurrIndex(prev => prev - 1);
            }
        },
    };

    useEffect(() => {

        return () => {
            // Save state
        }

    }, []);

    const handler = {
        onLoad: () => { },
        onUnload: () => { }
    }

    return (
        <ContainerComp id={id} keysRemapping={keysRemapping} handler={handler} >
            {component}
        </ContainerComp>
    )
};

export default Box;
