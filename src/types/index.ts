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
  keydownHandler: (e: KeyboardEvent) => void;

  activePage: string | null;
  setActivePage: (name: string) => void;

  activeContainer: Container | null;
  setActiveContainer: (id: ContainerId, parentId: ContainerId | null) => void;

  containers: Map<ContainerId, Container>;
  registerContainer: (container: Container) => void;
  unregisterContainer: (container: Container) => void;

  containersStack: Map<ContainerId, Container>;
  containerStackPush: (container: Container) => void;
  containerStackPop: () => void;

  notify: (e: KeyboardEvent) => void;
};

export type NavigatorHook = Pick<NavigatorStore, "keydownHandler" | "setActivePage" | "registerContainer" | "unregisterContainer" | "notify"> & {
  setActiveContainer: (id: ContainerId) => void;
};