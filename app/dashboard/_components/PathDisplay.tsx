'use client'

import { usePathname } from 'next/navigation'

export default function (props: { className: string }) {
	const pathname = usePathname()
	const isActive = (path: string) => pathname.split('/').includes(path)
	if (isActive('allfiles')) return <h1 className={props.className}>All Files</h1>
	if (isActive('trash')) return <h1 className={props.className}>Trash</h1>
	if (isActive('favorites')) return <h1 className={props.className}>favorites</h1>
	return <></>
}
