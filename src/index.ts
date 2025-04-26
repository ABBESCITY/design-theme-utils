/* 
  DESC
*/
import tinycolor from "tinycolor2";
import defaultTheme from "./theme/default.json" assert { type: "json" };
import {
  createPalette,
  DARK_BRIGHTNESS,
  LIGHT_BRIGHTNESS,
} from "./palette";


/* 
  DESC Constant variable
*/
const WITH_CUSMARK = true;
const WITHOUT_CUSMARK = false;

/* 
  DESC The utils function
*/
const createTheme = (palette: JSONObject, isDark: boolean) => {
  return createPalette(palette, isDark ? DARK_BRIGHTNESS : LIGHT_BRIGHTNESS);
};
const transValueToVariable = (prefix: string, valueList: JSONObject, withCusMark: boolean, markList?: number[]) => {
  return Object.keys(valueList).reduce((pre: any[], item) => {
    if (withCusMark && markList) {
      return pre.concat(
        ...markList.map((mark, index) => {
          return {
            varName: [`--${prefix}-${item}-${mark}`],
            varValue: Array.isArray(valueList[item]) ? (valueList[item] as JSONArray)[index] : null,
          }
        })
      )
    } else {
      return pre.concat(
        ...Object.keys(valueList[item] as JSONObject).map((value) => {
          return {
            varName: [`--${prefix}-${item}-${value}`],
            varValue: (valueList[item] as JSONObject)?.[value],
          }
        })
      )
    }
  }, []);
};

/* 
  DESC The utils function generate css variable with theme
*/
export const themeTransVar = (theme: JSONObject, isDark: boolean) => {
  const varMap = {};
  const defaultTheme = {
    palette: theme.palette,
    other: theme.other
  }
  transValueToVariable(
    "apsc",
    createTheme(defaultTheme.palette as JSONObject, false),
    WITH_CUSMARK,
    isDark ? DARK_BRIGHTNESS : LIGHT_BRIGHTNESS
  ).reduce((pre, variable) => {
    pre[variable.varName] = tinycolor(variable.varValue).toRgbString();
    return pre;
  }, varMap);

  transValueToVariable("apsc", defaultTheme.other as JSONObject, WITHOUT_CUSMARK).reduce(
    (pre, variable) => {
      pre[variable.varName] = variable.varValue;
      return pre;
    },
    varMap
  );
  return varMap;
};