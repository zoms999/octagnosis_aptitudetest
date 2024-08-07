import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.js';

import './assets/main.css';
import './assets/common.css';
import './assets/components.css';
import './assets/fonts.css';
import './assets/reset.css';
import './assets/sub.css';
import './assets/utility.css';
import './assets/base.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import dayjs from './plugins/dayjs';
import App from './App.vue';
import router from './router';
import globalFunction from './plugins/global-function';

import i18n from '@/i18n/i18n'; // i18n import
import { useI18nStore } from '@/stores/i18n';

const app = createApp(App);
app.use(globalFunction);
app.use(createPinia());

/**
app.config.globalProperties.$authToken = localStorage.getItem('authToken');
router.beforeEach((to, from, next) => {
	const authToken = app.config.globalProperties.$authToken;

	if (to.matched.some(record => record.meta.requiresAuth)) {
		// 로그인 필요한 페이지 접근 시
		if (!authToken) {
			next('/login'); // 로그인 페이지로 리다이렉트
		} else {
			next();
		}
	} else {
		next();
	}
});
 */
app.use(i18n); // i18n 사용
app.use(router);
app.use(dayjs);

const i18nStore = useI18nStore();
const savedLanguage = sessionStorage.getItem('language');
if (savedLanguage) {
	i18nStore.setLanguage(savedLanguage);
}

app.mount('#app');
console.log('MODE', import.meta.env.VITE_APP_API_URL);
