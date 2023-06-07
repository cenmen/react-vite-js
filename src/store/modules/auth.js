import { pick } from 'lodash-es';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

const initAuthState = {
	tokenInfo: {},
	authInfo: {},
	userInfo: {},
	currentRouter: null
};

export const useAuthStore = create(
	devtools(
		persist(
			set => ({
				...initAuthState,
				resetAuthStore: () => set(initAuthState, true),
				updateAuthStore: values => set(state => ({ ...state, ...values }))
			}),
			{
				name: 'auth-storage',
				storage: createJSONStorage(() => localStorage),
				partialize: state => pick(state, ['tokenInfo', 'authInfo', 'userInfo'])
			}
		),
		{ name: 'auth' }
	)
);
