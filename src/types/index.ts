export const Keys = {
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right",
  Enter: "Enter",
  Back: "Back",
  Red: "Red",
  Green: "Green",
  Yellow: "Yellow",
  Blue: "Blue",
} as const;

export type Keys = keyof typeof Keys;

export type PageProps = Omit<ContainerProps, "id"> & {
  name: string;
};

export type ContainerHandler = {
  onLoad?: () => void;
  onUnload?: () => void;
};

export type KeyRemappingCallback = (e: KeyboardEvent) => void;

export type KeysRemapping = Partial<Record<Keys, KeyRemappingCallback>>;

export type ContainerId = string;

export type Container = {
  id: ContainerId;
  keysRemapping: KeysRemapping;
  handler?: ContainerHandler;
  parentId?: ContainerId | null; // Optional parent ID for nested containers
};

export type ContainerProps = Container & {
  children?: React.ReactNode;
};

export type NavigatorStore = {
  keyPress: Keys | null;
  keydownHandler: (e: KeyboardEvent) => void;

  activePage: string | null;
  setActivePage: (name: string) => void;

  activeContainer: Container | null;
  getActiveContainer: () => Container | null;
  setActiveContainer: (id: ContainerId, parentId: ContainerId | null) => void;

  containers: Map<ContainerId, Container>;
  registerContainer: (container: Container) => void;
  unregisterContainer: (container: Container) => void;

  containersStack: Map<ContainerId, Container>;
  containerStackPush: (container: Container) => void;
  containerStackPop: () => void;

  notify: (e: KeyboardEvent) => void;
};

export type NavigatorHook = Pick<
  NavigatorStore,
  | "keydownHandler"
  | "setActivePage"
  | "registerContainer"
  | "unregisterContainer"
  | "notify"
  | "getActiveContainer"
> & {
  setActiveContainer: (id: ContainerId) => void;
};

// test
export type NavigationProvider = {
  selectedId: string | null;
  previousId: string | null;
  wrappers: Wrapper[];
  setImperativeSelection: (id: string | null) => void;
  setWrappers: (wrappers: Wrapper[]) => void;
  setSelectedId: (id: string | null) => void;
  keyListener: (e: KeyboardEvent) => void;
};

export type Wrapper = {
  id: string;
  elements: ElementObj[];
  selectedElement: ElementObj | Wrapper | null;
  popItem: () => void;
  pushItem: (el: ElementObj) => void;
  clear: () => void;
  load: () => void;
};

export type ElementObj = {
  id: string;
  items: Item[];
  selectedItem: Item | null;
  keyMapping: MappingObject;
  popItem: () => void;
  pushItem: (it: Item) => void;
  clear: () => void;
  notify: (e: KeyboardEvent) => void;
};

export type Item = {
  id: string;
  prev: Item | null;
  next: Item | null;
};

export type MappingObject = Partial<Record<Keys, KeyRemappingCallback>>;
