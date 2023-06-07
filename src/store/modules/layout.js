import { pick } from 'lodash-es';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

const initLayoutState = {
	isCollapse: false,
	currentTabList: []
};

export const useLayoutStore = create(
	devtools(
		persist(
			set => ({
				...initLayoutState,
				resetLayoutStore: () => set(initLayoutState, true),
				updateLayoutStore: values =>
					set(state => ({
						...state,
						...values
					}))
			}),
			{
				name: 'layout-storage',
				storage: createJSONStorage(() => localStorage),
				partialize: state => pick(state, ['isCollapse', 'currentTabList'])
			}
		),
		{ name: 'layout' }
	)
);
