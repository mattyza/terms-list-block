=== Terms List Block ===
Contributors:      Matty Cohen
Tags:              block
Tested up to:      6.1
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Displays a list of terms for the selected taxonomy, or the current term when used in a taxonomy term archive template.

== Description ==

Displays a list of terms for the selected taxonomy, or the current term when used in a taxonomy term archive template.

This block is intended for use in taxonomy archive templates, in pages to show a top-level list of terms, and on single entries to show terms assigned to that entry for a given taxonomy.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/terms-list-block` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress.
1. Find and add the "Terms List" block to your pages or taxonomy archive template.


== Frequently Asked Questions ==

= The results of the block are different in the editor and on my website. What is happening here? =

The display in the editor is intended to be a basic display to show what the output of the block looks like, primarily for styling purposes.

When used on the frontend of your website, the block outputs based on what is given to it- either the selected taxonomy, or the content of the taxonomy archive or single post view being used.

= I see internal taxonomies for navigation menus and patterns in the "Select Taxonomy" field. I want these gone. =

I know. So do I. The `getTaxonomies()` method is set to pull all registered taxonomies.

== Screenshots ==

1. The editor view of this block.
2. An example of how the block outputs on the frontend, using a custom taxonomy.

== Changelog ==

= 0.1.0 =
* Release

== Attribution ==

This block is inspired by the layout of the "Categories" block in WordPress. The code used to output a list of categories in the editor is copied and modified from the "Categories" block.