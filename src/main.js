import { createApp } from 'vue'
import App from './components/Index/App.vue'
import * as Icons from '@element-plus/icons-vue'
// import 'element-plus/dist/index.css'
import "~/styles/reset.scss"
// import '~/styles/element/index.scss'
//app.useRouter
import router from "./router";
import store from "./store";
const app = createApp(App);
app.use(router).use(store).mount('#app')
//动态注册图标组件
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key])
})