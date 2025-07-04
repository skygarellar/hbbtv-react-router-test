import { createStore } from "zustand";
import type { Container, ContainerId, Keys, NavStore } from "../types";
import { getKey, logger } from "../utils";

export const navStore = createStore<NavStore>((set, get) => ({
    containers: {},

    activeContainer: null,
    activePage: null,

    containersStack: [],

    keydownHandler: (e: KeyboardEvent) => {
        const key = getKey(e);
        logger.debug(`Key pressed +++: ${key}`);
        if (!key) return;
        const activeId = get().activeContainer;
        if (!activeId) return;
        const container = get().containers[activeId];
        if (container && container.keysRemapping) {
            console.log("test .::. remapping: ", key, container)
            const remap = container.keysRemapping[key as Keys];
            if (remap) {
                remap(e);
            } else {
                get().notify(e);
            }
        }
    },

    setActiveContainer: (id: ContainerId, parentId: ContainerId | null | undefined = undefined) => {

        const currentId = get().activeContainer;
        const containers = get().containers;
        console.log("TEST - SET ACTIVE ::: pre if: ", { currentId })
        if (currentId) {
            const currContainer = containers[currentId];
            //????
            console.log("TEST - SET ACTIVE ::: ", { currContainer, parentId })
            if (currContainer && currContainer.parentId === parentId) {
                get().containerStackPop();
            }
        }
        get().containerStackPush(id);
        set({ activeContainer: id });
        logger.debug(`Active container set to: ${id}`);
        logger.debug(`Test Current stack: ${get().containersStack}`);
        console.log("TEST - SET ACTIVE TEST CURR ID: ", { currentId, containersId: containers[id], id, containersStack: get().containersStack })
    },

    registerContainer: (container: Container) => {
        logger.debug(`Container registered: ${container.id}`);
        set((state) => ({
            containers: {
                ...state.containers,
                [container.id]: container,
            },
        }));
    },

    unregisterContainer: (id: ContainerId) => {
        set((state) => {
            const newContainers = { ...state.containers };
            delete newContainers[id];
            return { containers: newContainers };
        });
    },

    containerStackPop: () => {
        const stack = get().containersStack;
        if (stack.length === 0) return;
        const containerId = stack.pop();

        get().containers[containerId!]?.handler?.onUnload?.();
        logger.debug(`Container popped from stack: ${containerId}`);
        logger.debug(`Current stack: ${stack}`);
        set({ containersStack: [...stack] });
    },

    containerStackPush: (id: ContainerId) => {
        const stack = get().containersStack;
        const container = get().containers[id];
        console.log("++++++ containerStackPush container: ", container)
        console.log("++++++ containerStackPush containers: ", get().containers)
        if (!container) return;
        // ?????
        if (container?.handler?.onLoad) {
            container.handler.onLoad();
        }

        set({ containersStack: [...stack, id] });
    },

    addContainer: (container: Container) => {
        set((state) => ({
            containers: {
                ...state.containers,
                [container.id]: container,
            },
        }));
    },

    // notify: (e: KeyboardEvent) => {
    //     const currentStack = [...get().containersStack]
    //     console.log("TEST .::. notify: CURRENT STACK: ", currentStack, get().containers)
    //     // if (currentStack.length > 1) {
    //     //     // Rimuovi l'ultimo elemento e prendi il penultimo
    //     //     console.log("TEST .::. NOTIFY EVENT: ", e, currentStack)
    //     //     const newStack = [...currentStack.slice(0, -1)]
    //     //     const newActiveContainer = newStack[newStack.length - 1]
    //     //     console.log("TEST .::. NOTIFY EVENT: ", e, newStack)
    //     //     set({
    //     //         activeContainer: newActiveContainer,
    //     //         containersStack: newStack
    //     //     });

    //     //     get().keydownHandler(e);
    //     // }
    //     const stack = get().containersStack;
    //     if (stack.length > 0) {
    //         set({ activeContainer: stack[stack.length - 1] });
    //         get().keydownHandler(e);
    //     }
    // },

    notify: (e: KeyboardEvent, activeId: string = (get().activeContainer ?? "")) => {
        /**
         * Se arriva una notifica vuol dire che l'activeContainer non ha gestito il tasto
         * quindi si deve fare pop dello stack e vedere se il successivo ha un handler
         * che gestisce il tasto, altrimenti si continua a fare pop fino a che non si trova
         * un handler che gestisce il tasto o lo stack è vuoto.
         * Ogni volta che faccio pop devo impostare l'activeContainer, ma senza passare dal metodo
         * così da rimanere coerente con la logica di gestione dello stack.
         */
        // get().containerStackPop();
        // const stack = get().containersStack;
        const stack = get().containersStack.slice(0, get().containersStack.indexOf(activeId))
        // activeId = stack.pop() ?? ""
        console.log("TEST - NOTIFY : step 1: ", { stack, activeId })
        // if (activeId) {
        //     console.log("TEST - NOTIFY : step 1 bis bis: ", { activeId })
        //     const currentContainer: Container = get().containers[activeId ?? ""]
        //     console.log("TEST - NOTIFY : step 2: ", {
        //         evt: e.key.replace("Arrow", ""),
        //         stack
        //     })
        //     if (!currentContainer?.keysRemapping[e.key.replace("Arrow", "") as Keys]) {
        //         console.log("TEST - NOTIFY : step 3a: ", { e, stack })
        //         get().notify(e, activeId)
        //     } else {
        //         console.log("TEST - NOTIFY : step 3b: ", { stack, currActive: stack[stack.length - 1], active: currentContainer.id })
        //         // set({ activeContainer: currentContainer.id });
        //         get().keydownHandler(e);
        //     }
        // }

        const filter = stack.filter((container: string) => get().containers[container].keysRemapping[e.key.replace("Arrow", "") as Keys])
        const last = get().containers[filter.pop() ?? ""]
        if (last) {
            if (!last.keysRemapping[e.key.replace("Arrow", "") as Keys]) {
                console.log("TEST - NOTIFY : step 4a: ", last, e.key.replace("Arrow", ""))
                get().notify(e, last.id)
            } else {
                console.log("TEST - NOTIFY : step 4b: ", last, e.key.replace("Arrow", ""))
                get().keydownHandler(e);
            }
        }
    },

    setActivePage: (name: string) => {
        logger.debug(`Setting active page: ${name}`);
        set({ activePage: name, containersStack: [] });
    }
}));

const useNav = () => {

    const {
        keydownHandler,
        setActivePage,
        setActiveContainer,
        registerContainer,
        unregisterContainer,
        notify,
    } = navStore.getState();

    return {
        keydownHandler,
        setActivePage,
        setActiveContainer,
        registerContainer,
        unregisterContainer,
        notify,
    };

};

export default useNav;
