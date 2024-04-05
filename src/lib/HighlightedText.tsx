interface HighlightProps {
	text: string
	value: string
}
export const HighlightedText: React.FC<HighlightProps> = ({ text, value }) => {
	const textArr = text.split('')
	const valueArr = value.split('')
	return <></>
}
