/**
 * External dependencies
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  props
 * @param  props.attributes
 * @param  props.setAttributes
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { appid, unit, city } = attributes;

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title="Settings" initialOpen={ true }>
					<TextControl
						label="API key"
						help="The OpenWeather API key."
						value={ appid }
						onChange={ ( value ) =>
							setAttributes( {
								appid: value,
							} )
						}
					/>
					<SelectControl
						label="Unit"
						help="The temperature in °C, °F or °K."
						value={ unit }
						options={ [
							{ label: 'Celsius', value: 'metric' },
							{ label: 'Fahrenheit', value: 'imperial' },
							{ label: 'Kelvin', value: 'standard' },
						] }
						onChange={ ( value ) =>
							setAttributes( {
								unit: value,
							} )
						}
					/>
					<TextControl
						label="City"
						help="The city to show the weather for."
						value={ city }
						onChange={ ( value ) =>
							setAttributes( {
								city: value,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<Block { ...attributes } />
		</div>
	);
}
