import { useEffect, useState } from "react";
import List from "../components/test/List";
import useNav from "../hooks/useNav";
import { Keys } from "../types";
import Cont from "../components/test/Cont";
import Page from "../components/Page";

const Test = () => {

    const items = [
        {
            id: "testlist1",
            items: [{ id: "item1" }, { id: "item2" }, { id: "item3" }],
            parentId: "testapp"
        },
        {
            id: "testlist2",
            items: [{ id: "item4" }, { id: "item5" }, { id: "item6" }]
        }
    ]

    const { setActiveContainer, notify } = useNav();

    const [currIndex, setCurrIndex] = useState<number>(0);

    useEffect(() => {
        setActiveContainer("testapp", "app");
    }, []);



    const keysRemapping = {
        [Keys.Up]: (e: KeyboardEvent) => {
            console.log("********* Test: keysRemapping: ", e)
            if (currIndex === 0)
                notify(e, "testapp");
            else setCurrIndex(prev => prev - 1);
        },
        [Keys.Down]: (e: KeyboardEvent) => {
            console.log("********* Test: keysRemapping: ", e)
            console.log("Test - NOTIFY .... ")
            if (currIndex < items.length - 1)
                setCurrIndex(prev => prev + 1);
            else notify(e, "testapp")
        }
    };

    useEffect(() => {
        setActiveContainer(items[currIndex].id, "testapp")
    }, [currIndex])

    const handler = {
        onLoad: () => {
            console.log("+++++++++++++ ONLOAD Test")
        },
        onUnload: () => { }
    }

    return (
        <Page name="test">
            <Cont id="testapp" keysRemapping={keysRemapping} handler={handler} parentId="">
                {items.map((rail) => <List id={rail.id} items={rail.items} parentId="testapp" />)}
            </Cont>
        </Page>
    );
};

export default Test;