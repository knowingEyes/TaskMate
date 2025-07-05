import { getFromLocalstorage } from "./localstorage";

export const savedSettings = getFromLocalstorage("settings");
export const settings = {
  animations: false,
  sound: false,
  "task counter badge": false,
  "local date": false,
  "auto close input": false,
  "reset profile": false,
  "enable haptic feed back": true,
  "confirm before deleting tasks": true,
  "drag and drop": false,
  ...savedSettings,
};





