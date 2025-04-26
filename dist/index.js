/*
  DESC
*/
import tinycolor from "tinycolor2";
import defaultTheme from "./theme/default.json" assert { type: "json" };
import { createPalette, DARK_BRIGHTNESS, LIGHT_BRIGHTNESS, } from "./palette.js";
/*
  DESC Constant variable
*/
const WITH_CUSMARK = true;
const WITHOUT_CUSMARK = false;
/*
  DESC The utils function
*/
const createTheme = (palette, isDark) => {
    return createPalette(palette, isDark ? DARK_BRIGHTNESS : LIGHT_BRIGHTNESS);
};
const transValueToVariable = (prefix, valueList, withCusMark, markList) => {
    return Object.keys(valueList).reduce((pre, item) => {
        if (withCusMark && markList) {
            return pre.concat(...markList.map((mark, index) => {
                return {
                    varName: [`--${prefix}-${item}-${mark}`],
                    varValue: Array.isArray(valueList[item]) ? valueList[item][index] : null,
                };
            }));
        }
        else {
            return pre.concat(...Object.keys(valueList[item]).map((value) => {
                return {
                    varName: [`--${prefix}-${item}-${value}`],
                    varValue: valueList[item]?.[value],
                };
            }));
        }
    }, []);
};
/*
  DESC The utils function generate css variable with theme
*/
export const themeTransVar = (theme, isDark) => {
    const varMap = {};
    const defaultTheme = {
        palette: theme.palette,
        other: theme.other
    };
    transValueToVariable("apsc", createTheme(defaultTheme.palette, false), WITH_CUSMARK, isDark ? DARK_BRIGHTNESS : LIGHT_BRIGHTNESS).reduce((pre, variable) => {
        pre[variable.varName] = tinycolor(variable.varValue).toRgbString();
        return pre;
    }, varMap);
    transValueToVariable("apsc", defaultTheme.other, WITHOUT_CUSMARK).reduce((pre, variable) => {
        pre[variable.varName] = variable.varValue;
        return pre;
    }, varMap);
    return varMap;
};
