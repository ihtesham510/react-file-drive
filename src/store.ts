import { create } from 'zustand'
import { SortType, Theme, TypesofFile } from './lib/types'

export interface TypeSearchQueryStore {
	searchQuery: string
	setQuery: (query: string) => void
	sortType: SortType
	setSortType: (type: SortType) => void
	fileType: TypesofFile | undefined
	setFileType: (type: TypesofFile) => void
}
export const useQueryStore = create<TypeSearchQueryStore>()(set => ({
	searchQuery: '',
	setQuery: query => set(state => ({ ...state, searchQuery: query })),
	sortType: 'CreatedAcen',
	setSortType: type => set(state => ({ ...state, sortType: type })),
	fileType: undefined,
	setFileType: type => set(state => ({ ...state, fileType: type })),
}))

export interface TypeThemeStore {
	theme: Theme
	toggleTheme: () => void
}
function isDarkTheme() {
	const hasDarkTheme = localStorage.getItem('theme')
	if (!hasDarkTheme) {
		return false
	}
	if (hasDarkTheme === 'dark') {
		return true
	}
}
export const useThemeStore = create<TypeThemeStore>()(set => ({
	theme: isDarkTheme() ? 'dark' : 'light',
	toggleTheme: () => set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}))

export interface TypeAlertDeleteDialog {
	open: boolean
	toggleDialog: (e?: boolean) => void
  confirmAction: () => 
  void,
	onConfirm: (func: () => void) => void
	onCancel: () => void
}
export const useAlertDeleteDialog = create<TypeAlertDeleteDialog>(set => ({
  open: false,
  confirmAction: () => {},
  toggleDialog: e => set(state => ({ ...state, open: e ?? !state.open })),
  onConfirm: func => set(state => ({ ...state, confirmAction: func })),
  onCancel: () => set(state => ({ ...state, open: false })),
}));
