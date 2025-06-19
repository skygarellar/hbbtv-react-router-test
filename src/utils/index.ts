import { KeyOptions, PROJECT } from "../config";

export const getKey = (e: KeyboardEvent) => {
  const keyPressed = e.key ?? e.keyCode;
  const [keyPressedRemap] = Object.entries(KeyOptions).find(
    ([_, options]) => {
      return options.includes(keyPressed);
    }
  ) ?? [undefined, undefined];
  return keyPressedRemap;
};

const canLog = () =>
  ["localhost", "127.0.0.1"].includes(location.hostname) ||
  location.search.includes("log");

export const logger = {
  log: (...msg: unknown[]) => canLog() && console.log(`[${PROJECT}]`, ...msg),
  debug: (...msg: unknown[]) => canLog() && console.debug(`[${PROJECT}]`, ...msg),
  info: (...msg: unknown[]) => canLog() && console.info(`[${PROJECT}]`, ...msg),
  error: (...msg: unknown[]) => canLog() && console.error(`[${PROJECT}]`, ...msg),
  warn: (...msg: unknown[]) => canLog() && console.warn(`[${PROJECT}]`, ...msg),
};