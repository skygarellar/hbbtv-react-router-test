import { createStore } from "zustand";
import type { Container, ContainerId, Keys, NavigatorStore } from "../types";
import { getKey, logger } from "../utils";

export const navigatorStore = createStore<NavigatorStore>((set, get) => ({
  containers: {},

  activeContainer: null,
  activePage: null,

  containersStack: [],

  keydownHandler: (e: KeyboardEvent) => {
    const key = getKey(e);
    logger.debug(`Key pressed: ${key}`);
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

  setActiveContainer: (id: ContainerId, parentId: ContainerId | null) => {
    const currentId = get().activeContainer;
    const containers = get().containers;

    if (currentId) {
      const currContainer = containers[currentId];
      //????
      if (currContainer && currContainer.id !== parentId) {
        get().containerStackPop();
      }
    }
    console.log("----------- pre containerStackPush: ", id)
    get().containerStackPush(id);
    set({ activeContainer: id });
    logger.debug(`Active container set to: ${id}`);
    logger.debug(`Test Current stack: ${get().containersStack}`);
    console.log("test .::. current stack: 2:", containers, get().containersStack)
    console.log("TEST parent: ", { currContainer: containers[currentId ?? 0], parentId, containersStack: get().containersStack })
  },

  registerContainer: (container: Container) => {
    // logger.debug(`Container registered: ${container.id}`);
    // console.log("++++++ TEST .::. container: ", container)
    // console.log("++++++ TEST .::. containers: ", get().containers)
    // console.log("++++++ TEST .::. containersStack: ", get().containersStack)
    get().setActiveContainer(container.id, get().containers[get().containersStack.length - 1]?.id)
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
    console.log("---------- containerStackPush container: ", container)
    console.log("---------- containerStackPush containers: ", get().containers)
    if (!container) return;
    // ?????
    if (container.handler?.onLoad) {
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

  notify: (e: KeyboardEvent) => {
    const currentStack = [...get().containersStack]
    console.log("TEST .::. CURRENT STACK: ", currentStack)
    if (currentStack.length > 1) {
      // Rimuovi l'ultimo elemento e prendi il penultimo
      console.log("TEST .::. NOTIFY EVENT: ", e, currentStack)
      const newStack = [...currentStack.slice(0, -1)]
      const newActiveContainer = newStack[newStack.length - 1]
      console.log("TEST .::. NOTIFY EVENT: ", e, newStack)
      set({
        activeContainer: newActiveContainer,
        containersStack: newStack
      });

      get().keydownHandler(e);
    }
    // const stack = get().containersStack;
    // if (stack.length > 0) {
    //   set({ activeContainer: stack[stack.length - 1] });
    //   get().keydownHandler(e);
    // }
  },

  // notify: (e: KeyboardEvent) => {
  //   /**
  //    * Se arriva una notifica vuol dire che l'activeContainer non ha gestito il tasto
  //    * quindi si deve fare pop dello stack e vedere se il successivo ha un handler
  //    * che gestisce il tasto, altrimenti si continua a fare pop fino a che non si trova
  //    * un handler che gestisce il tasto o lo stack è vuoto.
  //    * Ogni volta che faccio pop devo impostare l'activeContainer, ma senza passare dal metodo
  //    * così da rimanere coerente con la logica di gestione dello stack.
  //    */
  //   get().containerStackPop();
  //   const stack = get().containersStack;
  //   if (stack.length > 0) {
  //     set({ activeContainer: stack[stack.length - 1] });
  //     get().keydownHandler(e);
  //   }
  // },

  setActivePage: (name: string) => {
    logger.debug(`Setting active page: ${name}`);
    set({ activePage: name, containersStack: [] });
  }
}));

const useNavigator = (containerId: ContainerId) => {

  const {
    activeContainer,
    keydownHandler,
    setActivePage,
    setActiveContainer,
    registerContainer,
    unregisterContainer,
    notify,
  } = navigatorStore.getState();

  return {
    activeContainer,
    keydownHandler,
    setActivePage,
    setActiveContainer: (id: ContainerId) => {
      setActiveContainer(id, containerId);
    },
    registerContainer,
    unregisterContainer,
    notify,
  };

};

export default useNavigator;
