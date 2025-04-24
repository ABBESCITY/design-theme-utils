import { Hct, argbFromHex } from "@material/material-color-utilities";
import tinycolor from "tinycolor2";

/* 
  DESC Palette brightness'value
*/
export const LIGHT_BRIGHTNESS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
export const DARK_BRIGHTNESS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

/* 
  DESC Create a color palette from theme json
*/
export const createPalette = (sourcePlatte, brightness) => {
  Object.keys(sourcePlatte).forEach((colorName) => {
    const color = tinycolor(sourcePlatte[colorName]).toHexString();
    const hctColor = Hct.fromInt(argbFromHex(color));
    sourcePlatte[colorName] = brightness.map((brightness) => {
      return Hct.from(hctColor.hue, hctColor.chroma, brightness);
    })
  })
  return sourcePlatte
}

export const verifyColorGroup = (colorList, levelList) => {
  return
}