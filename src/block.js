/**
 * External dependencies
 */
import useFetch from 'react-fetch-hook';
import {
	WiThermometer,
	WiThermometerExterior,
	WiHumidity,
	WiStrongWind,
} from 'react-icons/wi';

/**
 * Internal dependencies
 */
import {
	formatTemp,
	formatHumidity,
	formatWindSpeed,
	formatWindDirection,
} from './util';
import './style.scss';

/**
 * Export Block
 *
 * @param {Object} city ...
 * @returns
 */
export default function Block( { appid, unit, city } ) {
	// OpenWeather API endpoint
	let url = `https://api.openweathermap.org/data/2.5/weather?appid=${ appid }&units=${ unit }&q=${ city }`;

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
	const cityName = data.name;
	const currentTemp = formatTemp( unit, data.main.temp );
	const maxTemp = formatTemp( unit, data.main.temp_max );
	const minTemp = formatTemp( unit, data.main.temp_min );
	const condition = data.weather[ 0 ].description;
	const humidity = formatHumidity( data.main.humidity );
	const windSpeed = formatWindSpeed( unit, data.wind.speed );
	const windDirection = formatWindDirection( data.wind.deg );
	const wind = `${ windSpeed } ${ windDirection }`;

	console.info( windDirection );

	return (
		<>
			<div className="weather">
				<div className="center icon">
					<img src={ icon } alt="" />
				</div>
				<div className="center city">{ cityName }</div>
				<div className="center condition">{ condition }</div>
				<div className="center currentTemp">{ currentTemp }</div>
				<div className="center maxTemp">
					<WiThermometer /> { maxTemp }
				</div>
				<div className="center minTemp">
					<WiThermometerExterior /> { minTemp }
				</div>
				<div className="center humidity">
					<WiHumidity /> { humidity }
				</div>
				<div className="center windS">
					<WiStrongWind /> { wind }
				</div>
			</div>
			<pre>{ JSON.stringify( data, null, 2 ) }</pre>
		</>
	);
}
