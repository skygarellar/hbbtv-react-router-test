import { KeyOptions } from "../config";

export const getKey = (e: KeyboardEvent) => {
  const keyPressed = e.key ?? e.keyCode;
  const [keyPressedRemap] = Object.entries(KeyOptions).find(
    ([key, options]) => {
      return options.includes(keyPressed);
    }
  ) ?? [undefined, undefined];
  return keyPressedRemap;
};