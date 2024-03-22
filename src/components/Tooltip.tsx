import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui/tooltip'
interface ToolTipProps {
	children: React.ReactNode
	message: string
}
const ToolTip: React.FC<ToolTipProps> = ({ children, message }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent className='font-semibold'>
					<p>{message}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
export default ToolTip
