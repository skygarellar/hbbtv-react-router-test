import { useEffect, useState } from "react";
import useNavigator, { navigatorStore } from "../hooks/useNavigator";
import Container from "./Container";
import { Keys } from "../types";

type RailProps = {
    items: unknown[];
    id: string;
    parentId: string
};

const Card: React.FC<{ item: unknown; selected: boolean }> = ({ item, selected }) => {
    return (
        <div className={`card ${selected ? 'selected' : ''}`}>
            {JSON.stringify(item)}
        </div>
    );
};

const Rail: React.FC<RailProps> = ({ items, id, parentId }) => {

    const { notify } = useNavigator(parentId);

    const activeContainer = navigatorStore.getState().activeContainer

    const [currIndex, setCurrIndex] = useState<number>(0);
    const keysRemapping = {
        [Keys.Up]: (e: KeyboardEvent) => {
            if (currIndex === 0)
                notify(e);
            else setCurrIndex(prev => prev - 1);
        },
        [Keys.Down]: (e: KeyboardEvent) => {
            if (currIndex < items.length - 1)
                setCurrIndex(prev => prev + 1);
            else notify(e)
        }
    };

    useEffect(() => {
        console.log("TEST .::. ACTIVE CONTAINER: ", navigatorStore.getState().activeContainer)
        if (navigatorStore.getState().activeContainer === id)
            setCurrIndex(0)
        return () => {
            // Save state
        }

    }, []);

    const handler = {
        onLoad: () => { },
        onUnload: () => { }
    }


    useEffect(() => console.log("TEST .::. CURR_activeContainer: ", id, activeContainer), [id, activeContainer])
    useEffect(() => console.log("TEST .::. CURR_INDEX: ", id, currIndex), [id, currIndex])

    return (
        <Container id={id} keysRemapping={keysRemapping} handler={handler} >
            {items.map((item, idx) => <Card item={item} selected={id === activeContainer && idx === currIndex} />)}
        </Container>
    )
};

export default Rail;
