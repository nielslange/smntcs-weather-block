import useFetch from 'react-fetch-hook';
import NumberFormat from 'react-number-format';

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
export default function Block( { appid, unit, city } ) {
	// OpenWeather API endpoint
	let url = 'https://api.openweathermap.org/data/2.5/weather';

	// Add API key
	url += '?appid=' + appid;

	// Add unit
	url += '&units=' + unit;

	// Add city
	url += '&q=' + city;

	const { isLoading, data, error } = useFetch( url );

	if ( error ) {
		const divStyle = { border: '1px solid red', padding: '10px' };

		return (
			<div style={ divStyle }>
				<p>Code: ${ error.status }</p>
				<p>Message: ${ error.statusText }</p>
			</div>
		);
	}

	if ( isLoading ) {
		return <pre>Loading ...</pre>;
	}

	const icon = `http://openweathermap.org/img/wn/${ data.weather[ 0 ].icon }@2x.png`;

	return (
		<>
			<table>
				<tr>
					<th>icon</th>
					<td>
						<img src={ icon } alt="" />
					</td>
				</tr>
				<tr>
					<th>city</th>
					<td>{ data.name }</td>
				</tr>
				<tr>
					<th>condition</th>
					<td>{ data.weather[ 0 ].description }</td>
				</tr>
				<tr>
					<th>currentTemp</th>
					<td>Math.round({ data.main.temp })</td>
				</tr>
				<tr>
					<th>minMaxTemp</th>
					<td>
						{ data.main.temp_min } - { data.main.temp_max }
					</td>
				</tr>
				<tr>
					<th>rain</th>
					<td>{ data.main.humidity }%</td>
				</tr>
				<tr>
					<th>wind</th>
					<td>{ data.wind.speed }km/h</td>
				</tr>
			</table>
			{ /* <div className="weather">
				<div id="icon"></div>
				<div id="city">city: { data.name }</div>
				<div id="condition">condition</div>
				<div id="currentTemp">currentTemp</div>
				<div id="minMaxTemp">minMaxTemp</div>
				<div id="rain">rain</div>
				<div id="wind">wind</div>
			</div> */ }
			<pre>{ JSON.stringify( data, null, 2 ) }</pre>
		</>
	);
}
