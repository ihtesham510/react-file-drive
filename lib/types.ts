import useFiles from '@/hooks/useFiles'

type UseFiles = ReturnType<typeof useFiles>
export type TypeFile = NonNullable<UseFiles['files']>[number]
export type FavFile = NonNullable<UseFiles['favFiles']>[number]
export type TrashFile = NonNullable<UseFiles['trashFiles']>[number]
