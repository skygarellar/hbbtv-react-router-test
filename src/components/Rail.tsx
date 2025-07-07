import { useEffect, useState } from "react";
import useNavigator from "../hooks/useNavigator";
import Container from "./Container";
import { Keys } from "../types";
import { logger } from "../utils";

type RailProps = {
    items: unknown[];
    id: string;
};

const Card: React.FC<{ item: unknown; selected: boolean }> = ({ item, selected }) => {
    return (
        <div className={`card ${selected ? 'selected' : ''}`}>
            {JSON.stringify(item)}
        </div>
    );
};

const Rail: React.FC<RailProps> = ({ items, id }) => {

    const { notify } = useNavigator(id);

    const [currIndex, setCurrIndex] = useState(0);
    const keysRemapping = {
        [Keys.Right]: (e: KeyboardEvent) => {
            logger.debug("Right key pressed on rail", e);
            // notify(e);
            setCurrIndex(prev => prev + 1);
        },
        [Keys.Left]: (e: KeyboardEvent) => {
            if(currIndex === 0) {
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
        onLoad: () => {},
        onUnload: () => {}
    }
    
    return (
       <Container id={id} keysRemapping={keysRemapping} handler={handler} >
            {items.map((item, idx) => <Card item={item} selected={ idx === currIndex }/>)}
        </Container>
    )
};

export default Rail;
