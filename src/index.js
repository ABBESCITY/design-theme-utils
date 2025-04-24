/* 
  DESC
*/
import tinycolor from "tinycolor2";
import defaultTheme from "./theme/default.json" assert { type: "json" };
import {
  createPalette,
  DARK_BRIGHTNESS,
  LIGHT_BRIGHTNESS,
} from "./palette/index.js";

const WITH_CUSMARK = true;
const WITHOUT_CUSMARK = false;

const createTheme = (palette, isDark) => {
  return createPalette(palette, isDark ? DARK_BRIGHTNESS : LIGHT_BRIGHTNESS);
};

const transValueToVariable = (prefix, valueList, withCusMark, markList) => {
  return Object.keys(valueList).reduce((pre, item) => {
    if (withCusMark) {
      return pre.concat(
        ...markList.map((mark, index) => {
          return {
            varName: [`--${prefix}-${item}-${mark}`],
            varValue: valueList[item][index],
          };
        })
      );
    } else {
      return pre.concat(
        ...Object.keys(valueList[item]).map((value) => {
          return {
            varName: [`--${prefix}-${item}-${value}`],
            varValue: valueList[item][value],
          };
        })
      );
    }
  }, []);
};

const themeTransVar = (theme, isDark) => {
  const varMap = {};
  transValueToVariable(
    "apsc",
    createTheme(defaultTheme.palette, false),
    WITH_CUSMARK,
    isDark ? DARK_BRIGHTNESS : LIGHT_BRIGHTNESS
  ).reduce((pre, variable) => {
    pre[variable.varName] = tinycolor(variable.varValue).toRgbString();
    return pre;
  }, varMap);
  transValueToVariable("apsc", defaultTheme.other, WITHOUT_CUSMARK).reduce(
    (pre, variable) => {
      pre[variable.varName] = variable.varValue;
      return pre;
    },
    varMap
  );
  return varMap;
};

export default {
  themeTransVar,
};
