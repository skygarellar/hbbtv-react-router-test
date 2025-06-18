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

export type ContainerHandler = {
  onLoad?: () => void;
  onUnload?: () => void;
};

export type KeyRemappingCallback = (e: KeyboardEvent) => void;

export type KeysRemapping = Partial<Record<Keys, KeyRemappingCallback>>;

export type ContainerId = string;

export type Container = {
  id: ContainerId;
  parentId?: ContainerId;
  keysRemapping: KeysRemapping;
  handler?: ContainerHandler;
};

export type ContainerProps = Container & {
  children?: React.ReactNode;
};

export type NavigatorStore = {
  keydownHandler: (e: KeyboardEvent) => void;

  activeContainer: ContainerId | null;
  setActiveContainer: (id: ContainerId, parentId: ContainerId | null) => void;

  containers: Record<ContainerId, Container>;
  registerContainer: (container: Container) => void;
  unregisterContainer: (id: ContainerId) => void;

  containersStack: ContainerId[];
  containerStackPush: (id: ContainerId) => void;
  containerStackPop: () => void;

  notify: (e: KeyboardEvent) => void;
};
