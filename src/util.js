/**
 * Format temperature
 *
 * @param {string} format The format of the temperature.
 * @param {string} temp The temperature without units.
 * @return {string} The temperature with units.
 */
export function formatTemp( format, temp ) {
	if ( ! format || ! temp ) {
		return undefined;
	}

	switch ( format ) {
		case 'I':
			return `${ parseInt( temp ) }°F`;
		case 'S':
			return `${ parseInt( temp ) }°K`;
		default:
			return `${ parseInt( temp ) }°C`;
	}
}
