import { Keys } from "../types";

export const PROJECT = "Sky TV Skin";

export const KeyOptions: Record<Keys, (string | number)[]> = {
  [Keys.Up]: ["ArrowUp", 38],
  [Keys.Down]: ["ArrowDown", 40],
  [Keys.Left]: ["ArrowLeft", 37],
  [Keys.Right]: ["ArrowRight", 39],
  [Keys.Enter]: ["Enter", 13],
  [Keys.Back]: [461, 8],
  [Keys.Red]: [403],
  [Keys.Green]: [404],
  [Keys.Yellow]: [405],
  [Keys.Blue]: [406],
};
