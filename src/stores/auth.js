import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		isAuthenticated: false,
		acuntId: null,
		expirDt: null,
		regDt: null,
		email: null,
		persnNm: null,
		phone: null,
		sex: null,
		orgId: null,
		turnConnCd: null,
	}),
	actions: {
		login(acunt, persn, turnConnCd) {
			this.isAuthenticated = true;

			this.acuntId = acunt.acuntId;
			this.expirDt = acunt.expirDt;
			this.regDt = acunt.regDt;
			this.email = persn.email;
			this.persnNm = persn.persnNm;
			this.phone = persn.phone;
			this.sex = persn.sex;
			this.orgId = persn.orgId;
			this.turnConnCd = turnConnCd;

			sessionStorage.setItem('acuntId', acunt.acuntId);
			sessionStorage.setItem('expirDt', acunt.expirDt);
		},
		logout() {
			this.isAuthenticated = false;

			sessionStorage.removeItem('acuntId');
			sessionStorage.removeItem('expirDt');
		},
	},
});
