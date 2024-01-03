<?php
/**
 * Plugin Name:       Terms List Block
 * Plugin URI:        https://matty.blog/plugins/terms-list-block/
 * Description:       A list of terms for the selected taxonomy, or the current term when used in a taxonomy term archive template.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Matty Cohen
 * Author URI:        https://matty.blog/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       terms-list-block
 *
 * @package           terms-list-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function terms_list_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'terms_list_block_init' );
