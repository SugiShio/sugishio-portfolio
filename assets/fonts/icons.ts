export type IconsId =
  | "lock"
  | "plane";

export type IconsKey =
  | "Lock"
  | "Plane";

export enum Icons {
  Lock = "lock",
  Plane = "plane",
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
  [Icons.Lock]: "61697",
  [Icons.Plane]: "61698",
};
