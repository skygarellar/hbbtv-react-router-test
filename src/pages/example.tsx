import { useEffect } from "react";
import Page from "../components/Page";
import useNavigator from "../hooks/useNavigator";
import { Keys } from "../types";
import { logger } from "../utils";
import Box from "../components/Box";
import List from "../components/List";
import CartList from "../components/CartList";
import "./example.css"

const Example = () => {
    const { setActiveContainer } = useNavigator("example");


    const leftComponent =
        <div className="top-left-side-container">
            <List key="left-list1" id="left-list1" type="horizontal" items={[{ id: "leftList1Item1" }, { id: "leftList1Item2" }, { id: "leftList1Item3" }, { id: "leftList1Item4" }]} />,
            <List key="left-list2" id="left-list2" type="horizontal" items={[{ id: "leftList2Item1" }, { id: "leftList2Item2" }, { id: "leftList2Item3" }, { id: "leftList2Item4" }]} />
        </div>

    const rightComponent =
        <div className="top-right-side-container">
            <List id="left-list1" type="vertical" items={[{ id: "leftList1Item1" }, { id: "leftList1Item2" }, { id: "leftList1Item3" }, { id: "leftList1Item4" }]} />,
        </div>

    const box1 =
        <div className="container-vertical-1">
            {leftComponent}
            {rightComponent}
        </div>

    const box2 =
        <div className="container-vertical-2">
            <List id="list1" className="list" items={[{ id: "list1Item1" }, { id: "list1Item2" }, { id: "list1Item3" }, { id: "list1Item4" }]} />
            <List id="list2" className="list" items={[{ id: "list2Item1" }, { id: "list2Item2" }, { id: "list2Item3" }, { id: "list2Item4" }]} />
            <List id="list3" className="list" items={[{ id: "list3Item1" }, { id: "list3Item2" }, { id: "list3Item3" }, { id: "list3Item4" }]} />
        </div>

    const boxes = [
        { id: "box1", component: box1, },
        { id: "box2", component: box2, },
    ]

    useEffect(() => {
        setActiveContainer("exampleleftcontainer");
    }, [setActiveContainer]);

    const keysRemapping = {
        [Keys.Right]: (e: KeyboardEvent) => {
            logger.debug("Right key pressed on example", e);
        }
    };

    return (
        <Page name="example" keysRemapping={keysRemapping} handler={{}}>
            {boxes.map(box => <Box key={box.id} id={box.id} component={box.component} />)}
        </Page>
        // <CartList />
    );
};

export default Example;
