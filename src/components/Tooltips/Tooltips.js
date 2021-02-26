import { TooltipHost } from '@fluentui/react'
import { useId } from '@uifabric/react-hooks'

const calloutProps = { gapSpace: 0 }
const hostStyles = { root: { display: 'inline-block' } }
export const Tooltip = ({ children }) => {
	const tooltipId = useId('tooltip')

	return (
		<div style={{ display: 'flex' }}>
			<TooltipHost
				content='Coming soon!'
				id={tooltipId}
				calloutProps={calloutProps}
				styles={hostStyles}
			>
				{children}
			</TooltipHost>
		</div>
	)
}
