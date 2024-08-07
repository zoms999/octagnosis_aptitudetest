// src/stores/i18n.js
import { defineStore } from 'pinia';

export const useI18nStore = defineStore('i18n', {
	state: () => ({
		language: 'ko',
	}),
	actions: {
		setLanguage(lang) {
			this.language = lang;
		},
	},
});
