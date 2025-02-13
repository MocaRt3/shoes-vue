import App from './App.vue'

import '../src/assets/scss/main.scss';
import '../src/assets/scss/main.css';

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import {createRouter, createWebHistory} from 'vue-router';

import Home from './pages/Home.vue';
import Favorites from './pages/Favorites.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/favorites',
		name: 'Favorites',
		component: Favorites,
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

const app = createApp(App);

app.use(router).use(autoAnimatePlugin).mount('#app')
