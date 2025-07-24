import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import useNavigator from "../hooks/useNavigator";
import { Keys } from "../types";
import { logger } from "../utils";
import ContainerComp from "./Container";

type BoxProps = {
    components: ReactNode[];
    id: string;
    className?: string
};

const Box: React.FC<BoxProps> = ({ components, id, className }) => {

    const { notify, setActiveContainer } = useNavigator(id);

    const [currIndex, setCurrIndex] = useState(0);
    const currIndexRef = useRef(0)


    useEffect(() => {
        currIndexRef.current = currIndex
        console.log("TEST BOX REF CURR INDEX :", id, currIndex)
    }, [currIndex])

    const keysRemapping = {
        [Keys.Right]: (e: KeyboardEvent) => {
            console.log("TEST BOX REF RIGHT :", currIndexRef.current)
            logger.debug("Right key pressed on box", id, e);
            // notify(e);
            // setCurrIndex(prev => prev + 1);
            // setActiveContainer(id)
        },
        [Keys.Left]: (e: KeyboardEvent) => {
            console.log("TEST BOX REF LEFT :", currIndexRef.current)
            // if (currIndex === 0) {
            //     notify(e);
            // }
            // else {
            //     setCurrIndex(prev => prev - 1);
            // }
        },
        [Keys.Down]: (e: KeyboardEvent) => {
            actionDOWN(e)
        },
        [Keys.Up]: (e: KeyboardEvent) => {
            actionUP(e)
        },
    };

    const actionUP = useCallback((e: KeyboardEvent) => {
        console.log("TEST BOX CURRINDEX ON UP: ", currIndexRef.current, currIndex)
        if (currIndexRef.current === 0) {
            notify(e);
        }
        else {
            setCurrIndex(prev => prev - 1);
            console.log("TEST ID: ", components[currIndexRef.current - 1])
            setActiveContainer(id + (currIndexRef.current - 1))
        }
    }, [currIndex])

    const actionDOWN = useCallback((e?: KeyboardEvent) => {
        console.log("TEST BOX CURRINDEX ON DOWN: ", currIndexRef.current, currIndex, id + (currIndexRef.current + 1), components.length - 1)
        if (currIndexRef.current < components.length - 1) {
            setCurrIndex(prev => prev + 1);
            setActiveContainer(id + (currIndexRef.current + 1))
        }
        else {
            notify(e);
        }
    }, [currIndex])

    useEffect(() => {

        return () => {
            // Save state
        }

    }, []);

    const handler = {
        onLoad: () => {
            // console.log("TEST BOX onLoad", currIndex, id, id + currIndex)
            // setActiveContainer(id + currIndex)
        },
        onUnload: () => { }
    }

    const renderComponents =
        components.map((component: ReactNode) => component)


    return (
        <ContainerComp id={id} keysRemapping={keysRemapping} handler={handler} >
            <div className={className} >
                {currIndex}
                {renderComponents}
            </div>
        </ContainerComp>
    )
};

export default Box;
