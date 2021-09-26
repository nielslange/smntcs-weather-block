/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */

export default function save() {
	return <div { ...useBlockProps.save() } />;
}
