// types.ts
export type ContainerId = string;
export type Keys = 'Up' | 'Down' | 'Left' | 'Right' | 'Enter' | 'Escape' | 'Tab';

export interface KeyHandler {
    (e: KeyboardEvent): void | boolean; // return false to prevent bubbling
}

export interface ContainerHandler {
    onLoad?: () => void;
    onUnload?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export interface Container {
    id: ContainerId;
    parentId?: ContainerId;
    keysRemapping: Partial<Record<Keys, KeyHandler>>;
    handler?: ContainerHandler;
    priority?: number; // for stack ordering
}

export interface NavigationState {
    containers: Record<ContainerId, Container>;
    activeContainer: ContainerId | null;
    activePage: string | null;
    containersStack: ContainerId[];
}

// keyboardManager.ts
export class KeyboardManager {
    private keyMap: Record<string, Keys> = {
        'ArrowUp': 'Up',
        'ArrowDown': 'Down',
        'ArrowLeft': 'Left',
        'ArrowRight': 'Right',
        'Enter': 'Enter',
        'Escape': 'Escape',
        'Tab': 'Tab'
    };

    getKey(e: KeyboardEvent): Keys | null {
        return this.keyMap[e.key] || null;
    }

    preventDefaults(e: KeyboardEvent, keys: Keys[]): void {
        const key = this.getKey(e);
        if (key && keys.includes(key)) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
}

// containerRegistry.ts
export class ContainerRegistry {
    private containers = new Map<ContainerId, Container>();
    private listeners = new Set<(containers: Container[]) => void>();

    register(container: Container): void {
        if (this.containers.has(container.id)) {
            console.warn(`Container ${container.id} is already registered`);
            return;
        }

        this.containers.set(container.id, container);
        this.notifyListeners();
    }

    unregister(id: ContainerId): void {
        const removed = this.containers.delete(id);
        if (removed) {
            this.notifyListeners();
        }
    }

    get(id: ContainerId): Container | undefined {
        return this.containers.get(id);
    }

    getAll(): Container[] {
        return Array.from(this.containers.values());
    }

    has(id: ContainerId): boolean {
        return this.containers.has(id);
    }

    onUpdate(listener: (containers: Container[]) => void): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private notifyListeners(): void {
        const containers = this.getAll();
        this.listeners.forEach(listener => listener(containers));
    }
}

// navigationStack.ts
export class NavigationStack {
    private stack: ContainerId[] = [];
    private registry: ContainerRegistry;

    constructor(registry: ContainerRegistry) {
        this.registry = registry;
    }

    push(id: ContainerId): boolean {
        const container = this.registry.get(id);
        if (!container) {
            console.error(`Cannot push unknown container: ${id}`);
            return false;
        }

        // Remove if already in stack to avoid duplicates
        this.remove(id);

        // Call onLoad handler
        container.handler?.onLoad?.();

        this.stack.push(id);
        return true;
    }

    pop(): ContainerId | undefined {
        const id = this.stack.pop();
        if (id) {
            const container = this.registry.get(id);
            container?.handler?.onUnload?.();
        }
        return id;
    }

    peek(): ContainerId | undefined {
        return this.stack[this.stack.length - 1];
    }

    remove(id: ContainerId): boolean {
        const index = this.stack.indexOf(id);
        if (index === -1) return false;

        this.stack.splice(index, 1);
        const container = this.registry.get(id);
        container?.handler?.onUnload?.();
        return true;
    }

    clear(): void {
        // Call onUnload for all containers
        this.stack.forEach(id => {
            const container = this.registry.get(id);
            container?.handler?.onUnload?.();
        });
        this.stack = [];
    }

    getStack(): readonly ContainerId[] {
        return Object.freeze([...this.stack]);
    }

    size(): number {
        return this.stack.length;
    }
}

// eventBubbler.ts
export class EventBubbler {
    private registry: ContainerRegistry;
    private keyboardManager: KeyboardManager;

    constructor(registry: ContainerRegistry, keyboardManager: KeyboardManager) {
        this.registry = registry;
        this.keyboardManager = keyboardManager;
    }

    handleKeyEvent(e: KeyboardEvent, stack: readonly ContainerId[]): boolean {
        const key = this.keyboardManager.getKey(e);
        if (!key) return false;

        // Bubble from top of stack down
        for (let i = stack.length - 1; i >= 0; i--) {
            const containerId = stack[i];
            const container = this.registry.get(containerId);

            if (!container) continue;

            const handler = container.keysRemapping[key];
            if (handler) {
                const result = handler(e);
                // If handler returns false, stop bubbling
                if (result !== false) {
                    return true;
                }
            }
        }

        return false;
    }
}

// navigationStore.ts
import { createStore } from "zustand";

interface NavigationStore extends NavigationState {
    // Core actions
    setActiveContainer: (id: ContainerId, options?: { skipStack?: boolean }) => void;
    setActivePage: (name: string) => void;

    // Container management
    registerContainer: (container: Container) => void;
    unregisterContainer: (id: ContainerId) => void;

    // Event handling
    handleKeyDown: (e: KeyboardEvent) => void;

    // Stack management
    pushToStack: (id: ContainerId) => void;
    popFromStack: () => void;
    clearStack: () => void;

    // Utilities
    isContainerActive: (id: ContainerId) => boolean;
    getActiveContainer: () => Container | null;
}

class NavigationFramework {
    private registry = new ContainerRegistry();
    private keyboardManager = new KeyboardManager();
    private eventBubbler = new EventBubbler(this.registry, this.keyboardManager);
    private navigationStack = new NavigationStack(this.registry);

    createStore() {
        return createStore<NavigationStore>((set, get) => ({
            // State
            containers: {},
            activeContainer: null,
            activePage: null,
            containersStack: [],

            // Actions
            setActiveContainer: (id: ContainerId, options = {}) => {
                if (!this.registry.has(id)) {
                    console.error(`Cannot activate unknown container: ${id}`);
                    return;
                }

                const current = get().activeContainer;

                // Blur current container
                if (current) {
                    const currentContainer = this.registry.get(current);
                    currentContainer?.handler?.onBlur?.();
                }

                // Focus new container
                const newContainer = this.registry.get(id);
                newContainer?.handler?.onFocus?.();

                if (!options.skipStack) {
                    this.navigationStack.push(id);
                }

                set({
                    activeContainer: id,
                    containersStack: [...this.navigationStack.getStack()]
                });
            },

            setActivePage: (name: string) => {
                this.navigationStack.clear();
                set({
                    activePage: name,
                    activeContainer: null,
                    containersStack: []
                });
            },

            registerContainer: (container: Container) => {
                this.registry.register(container);
                set((state) => ({
                    containers: {
                        ...state.containers,
                        [container.id]: container,
                    },
                }));
            },

            unregisterContainer: (id: ContainerId) => {
                // Remove from stack if present
                this.navigationStack.remove(id);
                this.registry.unregister(id);

                set((state) => {
                    const newContainers = { ...state.containers };
                    delete newContainers[id];

                    const newActiveContainer = state.activeContainer === id
                        ? this.navigationStack.peek() || null
                        : state.activeContainer;

                    return {
                        containers: newContainers,
                        activeContainer: newActiveContainer,
                        containersStack: [...this.navigationStack.getStack()]
                    };
                });
            },

            handleKeyDown: (e: KeyboardEvent) => {
                const stack = this.navigationStack.getStack();
                const handled = this.eventBubbler.handleKeyEvent(e, stack);

                if (handled) {
                    // Prevent default browser behavior for handled keys
                    this.keyboardManager.preventDefaults(e, ['Up', 'Down', 'Left', 'Right']);
                }
            },

            pushToStack: (id: ContainerId) => {
                const success = this.navigationStack.push(id);
                if (success) {
                    set({
                        activeContainer: id,
                        containersStack: [...this.navigationStack.getStack()]
                    });
                }
            },

            popFromStack: () => {
                const popped = this.navigationStack.pop();
                const newActive = this.navigationStack.peek() || null;

                set({
                    activeContainer: newActive,
                    containersStack: [...this.navigationStack.getStack()]
                });

                return popped;
            },

            clearStack: () => {
                this.navigationStack.clear();
                set({
                    activeContainer: null,
                    containersStack: []
                });
            },

            // Utilities
            isContainerActive: (id: ContainerId) => {
                return get().activeContainer === id;
            },

            getActiveContainer: () => {
                const activeId = get().activeContainer;
                return activeId ? this.registry.get(activeId) || null : null;
            }
        }));
    }
}

// Create singleton instance
const navigationFramework = new NavigationFramework();
export const navStore = navigationFramework.createStore();

// Hook for React components
export const useNavigation = () => {
    const store = navStore.getState();

    return {
        // State
        activeContainer: store.activeContainer,
        activePage: store.activePage,
        containersStack: store.containersStack,

        // Actions
        setActiveContainer: store.setActiveContainer,
        setActivePage: store.setActivePage,
        registerContainer: store.registerContainer,
        unregisterContainer: store.unregisterContainer,
        handleKeyDown: store.handleKeyDown,

        // Utilities
        isContainerActive: store.isContainerActive,
        getActiveContainer: store.getActiveContainer,
    };
};

// Example usage:
/*
const MyComponent = () => {
  const { registerContainer, handleKeyDown } = useNavigation();

  useEffect(() => {
    const container: Container = {
      id: 'my-menu',
      keysRemapping: {
        Up: (e) => console.log('Up pressed'),
        Down: (e) => console.log('Down pressed'),
        Enter: (e) => { 
          console.log('Enter pressed'); 
          return false; // Stop bubbling
        }
      },
      handler: {
        onLoad: () => console.log('Menu loaded'),
        onUnload: () => console.log('Menu unloaded'),
        onFocus: () => console.log('Menu focused'),
        onBlur: () => console.log('Menu blurred')
      }
    };

    registerContainer(container);
    
    // Global key handler
    const handleKey = (e: KeyboardEvent) => handleKeyDown(e);
    document.addEventListener('keydown', handleKey);
    
    return () => {
      document.removeEventListener('keydown', handleKey);
      // unregisterContainer will be called automatically on unmount
    };
  }, []);

  return <div>My navigable component</div>;
};
*/