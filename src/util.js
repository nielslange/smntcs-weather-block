/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Format temperature.
 *
 * @param {String} unit The formatting unit.
 * @param {Number} temp The unformated temperature.
 * @return {string} The formated temperature.
 */
export function formatTemp( unit, temp ) {
	if ( ! unit || Number.isNaN( temp ) ) {
		return undefined;
	}

	switch ( unit ) {
		case 'imperial':
			return `${ parseInt( temp ) }°F`;
		case 'standard':
			return `${ parseInt( temp ) }°K`;
		case 'metric':
			return `${ parseInt( temp ) }°C`;
		default:
			return undefined;
	}
}

/**
 * Format humidity.
 *
 * @param {Number} temp The unformated humidity.
 * @return {string} The formated humidity.
 */
export function formatHumidity( humidity ) {
	if ( Number.isNaN( humidity ) ) {
		return undefined;
	}

	return `${ humidity }%`;
}

/**
 * Format wind speed.
 *
 * @param {String} unit The formatting unit.
 * @param {Number} speed The unformated wind speed.
 * @return {string} The formated wind speed.
 */
export function formatWindSpeed( unit, speed ) {
	if ( ! unit || Number.isNaN( speed ) ) {
		return undefined;
	}

	switch ( unit ) {
		case 'imperial':
			return `${ speed }mph`;
		case 'standard':
			return `${ speed }m/s`;
		case 'metric':
			return `${ speed }m/s`;
		default:
			return undefined;
	}
}

/**
 * Format wind direction.
 *
 * @param {Number} direction The wind direction in degrees.
 * @return {string} The wind direction in words.
 */
export function formatWindDirection( direction ) {
	if ( Number.isNaN( direction ) ) {
		return undefined;
	}

	switch ( true ) {
		case direction >= 0 && direction < 22.5:
			return _( 'N', 'smntcs-weather-block' );
		case direction >= 22.5 && direction < 45:
			return _( 'NNE', 'smntcs-weather-block' );
		case direction >= 45 && direction < 67.5:
			return _( 'NE', 'smntcs-weather-block' );
		case direction >= 67.5 && direction < 90:
			return _( 'ENE', 'smntcs-weather-block' );
		case direction >= 90 && direction < 112.5:
			return _( 'E', 'smntcs-weather-block' );
		case direction >= 112.5 && direction < 135:
			return _( 'ESE', 'smntcs-weather-block' );
		case direction >= 135 && direction < 157.5:
			return _( 'SE', 'smntcs-weather-block' );
		case direction >= 157.5 && direction < 180:
			return _( 'SSE', 'smntcs-weather-block' );
		case direction >= 180 && direction < 202.5:
			return _( 'S', 'smntcs-weather-block' );
		case direction >= 202.5 && direction < 225:
			return _( 'SSW', 'smntcs-weather-block' );
		case direction >= 225 && direction < 247.5:
			return _( 'SW', 'smntcs-weather-block' );
		case direction >= 247.5 && direction < 270:
			return _( 'WSW', 'smntcs-weather-block' );
		case direction >= 270 && direction < 292.5:
			return _( 'W', 'smntcs-weather-block' );
		case direction >= 292.5 && direction < 315:
			return _( 'WNW', 'smntcs-weather-block' );
		case direction >= 315 && direction < 337.5:
			return _( 'NW', 'smntcs-weather-block' );
		case direction >= 337.5 && direction >= 360:
			return _( 'NNW', 'smntcs-weather-block' );
	}
}
