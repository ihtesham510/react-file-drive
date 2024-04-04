import { TypesofFile } from '@/lib/types'
import { SetStateAction, createContext, useContext, useState } from 'react'
interface QueryContextType {
	query: string
	setQuery: React.Dispatch<SetStateAction<string>>
	type: TypesofFile
	setQueryType: React.Dispatch<SetStateAction<TypesofFile>>
}
const QueryContext = createContext<QueryContextType | undefined>(undefined)
const SearchQueryContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [query, setQuery] = useState<string>('')
	const [type, setQueryType] = useState<TypesofFile>()
	return <QueryContext.Provider value={{ query, setQuery, type, setQueryType }}>{children}</QueryContext.Provider>
}
export const useSearchQuery = () => {
	const context = useContext(QueryContext)
	if (!context) {
		throw new Error('Query Context Must be Provided')
	}
	return context
}
export default SearchQueryContextProvider
