import useFetch from 'react-fetch-hook';

/**
 * Get temperature.
 *
 * @param {string} temp The temperature without units.
 * @return {string} The temperature with units.
 */
function getTemperature( temp ) {
	switch ( settings.units ) {
		case 'I':
			return `${ temp }°F`;
		case 'S':
			return `${ temp }°K`;
		default:
			return `${ temp }°C`;
	}
}

/**
 * Export Block
 *
 * @param {Object} city ...
 * @returns
 */
export default function Block( { city } ) {
	const weatherAPIEndpoint =
		'https://api.openweathermap.org/data/2.5/weather?Sq=Jakarta&units=metric&appid=927a4aa2d2699fb13085066370c76d9b';

	const { isLoading, data, error } = useFetch( weatherAPIEndpoint );

	if ( error ) {
		const divStyle = { border: '1px solid red', padding: '10px' };

		return (
			<div style={ divStyle }>
				<p>Code: ${ error.status }</p>
				<p>Message: ${ error.statusText }</p>
			</div>
		);
	}

	return isLoading ? (
		<pre>Loading ...</pre>
	) : (
		<pre>{ JSON.stringify( data, null, 2 ) }</pre>
	);
}
