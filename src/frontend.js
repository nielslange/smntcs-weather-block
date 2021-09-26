import { render, Suspense } from '@wordpress/element';
import Block from './block';

window.addEventListener( 'DOMContentLoaded', () => {
	const element = document.querySelector( '.wp-block-smntcs-weather-block' );
	if ( element ) {
		const attributes = { ...element.dataset };
		render(
			<Suspense fallback={ <div className="wp-block-placeholder" /> }>
				<Block { ...attributes } />
			</Suspense>,
			element
		);
	}
} );
