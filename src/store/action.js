import {CHANGE_THEME} from "./types";
import themes from "../styles/themes"
import {colorMix} from "../components/Common/Utiltool.js"
const actions = {
  /**
   * 主题切换
   */
  async [CHANGE_THEME]({commit, state}, params = {}) {
    console.log(state.theme)
    const theme =  state.theme === "defaultTheme" ? "darkTheme":"defaultTheme";
    const colorObj = themes[theme];
    // 获取基本色色阶
    for (let i = 1; i < 10; i += 1) {
      colorObj[`--el-color-primary-light-${10 - i}`] = colorMix(colorObj['--el-color-white'], colorObj['--el-color-primary'], i * 0.1)
    }
    // 设置css 变量
    Object.keys(colorObj).map(item => {
      document.documentElement.style.setProperty(item, colorObj[item])
    })
   commit(CHANGE_THEME,theme);
  },
};
export default actions;


