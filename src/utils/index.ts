import { KeyOptions, projectName } from "../config";

export const getKey = (e: KeyboardEvent) => {
  const keyPressed = e.key ?? e.keyCode;
  const [keyPressedRemap] = Object.entries(KeyOptions).find(
    ([key, options]) => {
      return options.includes(keyPressed);
    }
  ) ?? [undefined, undefined];
  return keyPressedRemap;
};

const canLog = () =>
  ["localhost", "127.0.0.1"].includes(location.hostname) ||
  location.search.includes("log");

export const logger = {
  log: (...msg: any[]) => canLog() && console.log(`[${projectName}]`, ...msg),
  debug: (...msg: any[]) => canLog() && console.debug(`[${projectName}]`, ...msg),
  info: (...msg: any[]) => canLog() && console.info(`[${projectName}]`, ...msg),
  error: (...msg: any[]) => canLog() && console.error(`[${projectName}]`, ...msg),
  warn: (...msg: any[]) => canLog() && console.warn(`[${projectName}]`, ...msg),
};