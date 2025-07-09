import { create } from "zustand";
import type {
  Container,
  ContainerId,
  Keys,
  NavigatorStore,
  NavigatorHook,
} from "../types";
import { getKey, logger } from "../utils";
import { useState } from "react";

const navigatorStore = create<NavigatorStore>((set, get) => ({
  containers: new Map<ContainerId, Container>(),

  activeContainer: null,
  activePage: null,

  containersStack: new Map<ContainerId, Container>(),

  keydownHandler: (e: KeyboardEvent) => {
    const key = getKey(e);
    logger.debug(`Key pressed: ${key}`);
    if (!key) return;
    const currActiveContainer = get().activeContainer;
    if (!currActiveContainer) return;
    const container = get().containers.get(currActiveContainer.id);
    if (container && container.keysRemapping) {
      const remap = container.keysRemapping[key as Keys];
      if (remap) {
        remap(e);
      } else {
        get().notify(e);
      }
    }
  },

  setActiveContainer: (cId: ContainerId) => {
    const stack = get().containersStack;
    const currActiveContainer = get().activeContainer;
    const newActiveContainer = get().containers.get(cId)!;
    
    if(currActiveContainer) {
    
        if(currActiveContainer.parentId === newActiveContainer!.parentId) {
            //Subling containers => replace
            get().containerStackPop();
            get().containerStackPush(newActiveContainer!);
        }
        else {
            // father
            if(currActiveContainer.id === newActiveContainer!.parentId) {
                // curr active container is my parent
                get().containerStackPush(newActiveContainer!);
            }
            else {
            
                // da rivedere
                const parentId = newActiveContainer!.parentId!;
                const stackContainerIds = Array.from(stack.keys());
                
                // a => containerA
                // [a, b, c, d]
                // [a, b]
                // [a, b, f]
                
                const newStackContainerIds = stackContainerIds.slice(0, stackContainerIds.indexOf(parentId) + 1);
                const containers = get().containers;
                const newStack = newStackContainerIds.reduce((acc, id) => {
                    acc.set(id, containers.get(id));
                    return acc;
                }, new Map());
                set({ containersStack: newStack});
                get().containerStackPush(newActiveContainer);
            }
        }
    }
    else {
        // che famo?
        get().containerStackPush(newActiveContainer);
    }

},

  registerContainer: (container: Container) => {
    const containers = get().containers;
    containers.set(container.id, container);
    set({ containers: new Map(containers) });
  },

  unregisterContainer: (container: Container) => {
    const containers = get().containers;
    containers.delete(container.id);
    set({ containers: new Map(containers) });
  },

  containerStackPop: () => {
    const stack = get().containersStack;
    const lastId = Array.from(stack.keys()).pop(); // Remove the last element from the stack
    stack.delete(lastId!);
    get().containers.get(lastId!)!.handler?.onUnload?.();
    logger.debug(`Container with ID ${lastId} unloaded`);
    logger.debug(`Current stack: ${stack}`);
    set({ containersStack: new Map(stack) });
  },

  containerStackPush: (container: Container) => {
    const stack = get().containersStack;
    if (!container) return;
    if (container.handler?.onLoad) {
      container.handler.onLoad();
    }
    stack.set(container.id, container);
    set({ containersStack: new Map(stack) });
  },

  notify: (e: KeyboardEvent) => {
    
    // get().containerStackPop();
    const stack = get().containersStack;

    // [a, b, c, d] 
    const ids = Array.from(stack.keys()).reverse().slice(1);
    const id =  ids.find((id) => {
      return stack.get(id)?.keysRemapping?.[getKey(e) as Keys];
    });
    if (id) {
      stack.get(id)?.keysRemapping?.[getKey(e) as Keys]?.(e);
    }
    return;
  },

  setActivePage: (name: string) => {
    logger.debug(`Setting active page: ${name}`);
    set({ activePage: name, containersStack: new Map<ContainerId, Container>() });
  },
}));

const useNavigator = (containerId: ContainerId): NavigatorHook => {
  const [state] = useState<NavigatorHook>({
    keydownHandler: navigatorStore.getState().keydownHandler,
    setActivePage: navigatorStore.getState().setActivePage,
    setActiveContainer: (id: ContainerId) => {
      navigatorStore.getState().setActiveContainer(id, containerId);
    },
    registerContainer: navigatorStore.getState().registerContainer,
    unregisterContainer: navigatorStore.getState().unregisterContainer,
    notify: navigatorStore.getState().notify,
  });

  return state;
};

export default useNavigator;
