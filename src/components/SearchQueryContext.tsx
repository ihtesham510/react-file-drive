import { TypesofFile, QueryContextType, SortType } from '@/lib/types'
import { createContext, useContext, useState } from 'react'

const QueryContext = createContext<QueryContextType | undefined>(undefined)
const SearchQueryContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [query, setQuery] = useState<string>('')
	const [type, setQueryType] = useState<TypesofFile>()
	const [sortType, setSortType] = useState<SortType>('CreatedAcen')
	return (
		<QueryContext.Provider value={{ query, setQuery, type, setQueryType, sortType, setSortType }}>
			{children}
		</QueryContext.Provider>
	)
}
export const useSearchQuery = () => {
	const context = useContext(QueryContext)
	if (!context) {
		throw new Error('Query Context Must be Provided')
	}
	return context
}
export default SearchQueryContextProvider
