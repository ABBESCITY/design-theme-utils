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
export const createPalette = (sourcePlatte: JSONObject, brightness: number[]) => {
  Object.keys(sourcePlatte as JSONObject).forEach((colorName: string) => {
    if (!sourcePlatte || typeof sourcePlatte !== 'object') {
      throw new Error("sourcePlatte must be a non-null object");
    }
    const color = tinycolor((sourcePlatte as JSONObject)[colorName] as string).toHexString();
    const hctColor = Hct.fromInt(argbFromHex(color));
    (sourcePlatte as JSONObject)[colorName] = brightness.map((brightness) => {
      return Hct.from(hctColor.hue, hctColor.chroma, brightness);
    }) as unknown as JSONArray
  })
  return sourcePlatte
}

/* 
  DESC Verify that colors are WCAG compliant
*/
export const verifyColorGroup = () => {
  // TODO
  return
}