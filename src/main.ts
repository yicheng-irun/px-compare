import {createApp} from 'vue';
import './style.css';
import App from './App.vue';
import {createPinia} from 'pinia';
import {createRouter, createWebHashHistory, type RouteRecordRaw} from 'vue-router';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: async () => import('./pages/page-index.vue'),
	},
	{
		path: '/compare',
		component: async () => import('./pages/page-compare.vue'),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
app.use(router);

app.mount('#app');
