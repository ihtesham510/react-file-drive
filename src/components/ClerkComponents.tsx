import React from 'react'
import {
	UserButton as OriginalUserButton,
	OrganizationSwitcher as OriginalOrganizationSwitcher,
} from '@clerk/clerk-react'

export const UserButton = React.memo(props => <OriginalUserButton {...props} />)
export const OrganizationSwitcher = React.memo(props => <OriginalOrganizationSwitcher {...props} />)
