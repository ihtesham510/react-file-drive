// remove validateDOMNesting Warning in console @stackoverflow
export default function suppressNestingWarnings() {
	// sooth typescript
	type SilenceableConsole = typeof console & { warningsSilenced?: boolean }

	if ((console as SilenceableConsole).warningsSilenced) {
		return
	}

	const origConsoleError = console.error
	console.error = (...args: unknown[]) => {
		const isNestingWarning = (arg: unknown) => typeof arg === 'string' && arg.includes('validateDOMNesting')
		const concernsOurElements = (arg: unknown) => typeof arg === 'string' && arg.includes('ourprefix-')
		const [formatString, child, parent] = args
		if (isNestingWarning(formatString) && (concernsOurElements(child) || concernsOurElements(parent))) {
			return
		}
		// origConsoleError(...args)
	}
	;(console as SilenceableConsole).warningsSilenced = true
}
