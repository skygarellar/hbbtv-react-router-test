import { useEffect, useState } from "react";
import useNavigator from "../hooks/useNavigator";
import { Keys } from "../types";
import { logger } from "../utils";
import ContainerComp from "./Container";

type ListProps = {
    items: unknown[];
    id: string;
    className?: string;
    type?: string
};

const Card: React.FC<{ item: { id: string }; selected: boolean }> = ({ item, selected }) => {
    return (
        <div className={`card ${selected ? 'selected' : ''}`}>
            {item.id}
        </div>
    );
};

const List: React.FC<ListProps> = ({ items, id, className = "list", type = "horizontal" }) => {

    const { notify } = useNavigator(id);

    const [currIndex, setCurrIndex] = useState(0);
    const keysRemapping = {
        [Keys.Right]: (e: KeyboardEvent) => {
            logger.debug("TEST : LIST : Right key pressed on list", e);
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

    const horizontalStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }

    const verticalStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <ContainerComp id={id} keysRemapping={keysRemapping} handler={handler} >
            <div className={className} style={type === "horizontal" ? {
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            } : {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                {items.map((item, idx) => <Card item={item} selected={idx === currIndex} />)}
            </div>
        </ContainerComp>
    )
};

export default List;
