
import {createApp} from 'vue';
import 'view-ui-plus/dist/styles/viewuiplus.css'
require('./bootstrap');
import 'vue-toast-notification/dist/theme-sugar.css';
import ViewUIPlus from 'view-ui-plus'



import App from './App.vue';
import axios from 'axios';
import router from './router';
import VueToast from 'vue-toast-notification';
import common from './commo';
import store from './store'
import { i18nVue } from 'laravel-vue-i18n'
import LaravelVuePagination from 'laravel-vue-pagination'

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.mixin(common);
app.use(store);
app.use(router);
app.use(ViewUIPlus);

app.use(VueToast, {
    // One of the options
    position: 'top'
})
app.use(i18nVue, {
    lang: 'en',
    resolve: lang => import(`./lang/${lang}.json`),
});
app.component('mainapp', App)
app.component('pagination', LaravelVuePagination);
app.mount('#app');
