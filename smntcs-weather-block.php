<?php
/**
 * Plugin Name: SMNTCS Weather Block
 * Description: Show the weather for a certain location.
 * Version: 0.1.0
 * Author: Niels Lange
 * Author URI: https://nielslange.com
 * License: GPL-3.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: smntcs-weather-block
 * Requires at least: 5.8
 * Requires PHP: 7.0
 *
 * @package SMNTCS\WeatherBlock
 */

defined( 'ABSPATH' ) || exit;

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function smntcs_block_init() {
	register_block_type( __DIR__, array(
		'render_callback' => 'smntcs_render_block_with_attributes'
	) );
}

// Copied from @wordpress/dependency-extraction-webpack-plugin docs.
function smntcs_enqueue_frontend_script() {
	$script_path       = 'build/frontend.js';
	$script_asset_path = 'build/frontend.asset.php';
	$script_asset      = require( $script_asset_path );
	$script_url = plugins_url( $script_path, __FILE__ );
	wp_enqueue_script( 'script', $script_url, $script_asset['dependencies'], $script_asset['version'] );
}

// Copied from WooCommerce Blocks.
function smntcs_add_attributes_to_block( $attributes = [], $content = '' ) {
	$escaped_data_attributes = [];

	foreach ( $attributes as $key => $value ) {
		if ( is_bool( $value ) ) {
			$value = $value ? 'true' : 'false';
		}
		if ( ! is_scalar( $value ) ) {
			$value = wp_json_encode( $value );
		}
		$escaped_data_attributes[] = 'data-' . esc_attr( strtolower( preg_replace( '/(?<!\ )[A-Z]/', '-$0', $key ) ) ) . '="' . esc_attr( $value ) . '"';
	}

	return preg_replace( '/^<div /', '<div ' . implode( ' ', $escaped_data_attributes ) . ' ', trim( $content ) );
}

function smntcs_render_block_with_attributes( $attributes = [], $content = '' ) {
	if ( ! is_admin() ) {
		smntcs_enqueue_frontend_script();
	}
	return smntcs_add_attributes_to_block($attributes, $content);
};

add_action( 'init', 'smntcs_block_init' );