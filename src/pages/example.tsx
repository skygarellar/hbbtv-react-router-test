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

    const leftComponent = [
        <List key="A" id="boxtop00" type="horizontal" items={[{ id: "A1" }, { id: "A2" }, { id: "A3" }, { id: "A4" }]} />,
        <List key="B" id="boxtop01" type="horizontal" items={[{ id: "B1" }, { id: "B2" }, { id: "B3" }, { id: "B4" }]} />
    ]

    const rightComponent = [<List key="C" id="boxtop10" type="vertical" items={[{ id: "C1" }, { id: "C2" }, { id: "C3" }, { id: "C4" }]} />]

    const leftBox = [<Box key="A" id="A" components={leftComponent} className="top-left-side-container" />]

    const rightBox = [<Box key="B" id="boxtop1" components={rightComponent} className="top-right-side-container" />]

    const leftRight = [leftBox, rightBox]

    const box1 = [<Box className="container-vertical-1" id="boxtop0" key="AA" components={leftRight} />]

    const box2 = [
        <List id="boxbottom0" className="list" items={[{ id: "D1" }, { id: "D2" }, { id: "D3" }, { id: "D4" }]} />,
        <List id="boxbottom1" className="list" items={[{ id: "E1" }, { id: "E2" }, { id: "E3" }, { id: "E4" }]} />,
        <List id="boxbottom2" className="list" items={[{ id: "F1" }, { id: "F2" }, { id: "F3" }, { id: "F4" }]} />,
    ]

    const boxes = [
        { id: "boxtop", components: box1, },
        { id: "boxbottom", components: box2 },
    ]

    useEffect(() => {
        setActiveContainer("boxtop");
    }, [setActiveContainer]);

    const keysRemapping = {
        [Keys.Right]: (e: KeyboardEvent) => {
            console.log("TEST example right ")
        }
    };

    return (
        <Page name="example" keysRemapping={keysRemapping} handler={{}}>
            {boxes.map(box => <Box key={box.id} id={box.id} components={box.components} />)}
        </Page>
        // <CartList />
    );
};

export default Example;
