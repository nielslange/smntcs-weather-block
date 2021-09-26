/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import WeatherIcon from './weather-icon.js';
import Edit from './edit';
import save from './save';

registerBlockType( 'smntcs/weather-block', {
	icon: <WeatherIcon />,
	edit: Edit,
	save,
} );
