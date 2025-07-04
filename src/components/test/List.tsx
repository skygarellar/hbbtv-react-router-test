import { useEffect, useState } from "react";
import useNav, { navStore } from "../../hooks/useNav";
import Cont from "../test/Cont";
import { Keys } from "../../types";

type RailProps = {
    items: unknown[];
    id: string;
    parentId: string
};

const Item: React.FC<{ item: unknown; selected: boolean }> = ({ item, selected }) => {
    return (
        <div className={`item ${selected ? 'selected' : ''}`}>
            {JSON.stringify(item)}
        </div>
    );
};

const List: React.FC<RailProps> = ({ items, id, parentId }) => {

    const { notify } = useNav();

    const activeContainer = navStore.getState().activeContainer

    const [currIndex, setCurrIndex] = useState<number>(0);


    const keysRemapping = {
        [Keys.Up]: (e: KeyboardEvent) => {
            if (currIndex === 0)
                notify(e);
            else setCurrIndex(prev => prev - 1);
        },
        [Keys.Down]: (e: KeyboardEvent) => {
            console.log("TEST LIST ::: ", currIndex, items.length)
            if (currIndex < items.length - 1)
                setCurrIndex(prev => prev + 1);
            else notify(e)
        }
    };

    const handler = {
        onLoad: () => { console.log("++++++++ onLoad: ", id) },
        onUnload: () => { console.log("++++++++ onUnLoad: ", id) }
    }


    useEffect(() => console.log("TEST .::. CURR_activeContainer: ", id, activeContainer), [id, activeContainer])
    useEffect(() => console.log("TEST .::. CURR_INDEX test: ", id, currIndex), [id, currIndex])

    return (
        <Cont id={id} keysRemapping={keysRemapping} handler={handler} parentId={parentId}>
            {items.map((item, idx) => <Item item={item} selected={id === activeContainer && idx === currIndex} />)}
        </Cont>
    )
};

export default List;
