<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 *
 * $attributes, $block, and $content are available
 */
global $post;
?>
<ul <?php echo get_block_wrapper_attributes(); ?>>
	<?php
		$taxonomy_list_args = array(
			'title_li' => '',
			'hide_title_if_empty' => true,
			'show_count' => $attributes['showPostCounts'],
			'hide_empty' => ! $attributes['showEmpty'],
			'depth' => 1,
			'echo' => false,
			'show_option_none' => '',
		);

		if( is_tax() ) {
			$current_term = get_queried_object();
			$taxonomy_slug = $current_term->taxonomy;
			$taxonomy = get_taxonomy( $taxonomy_slug );
			$taxonomy_list_args['child_of'] = $current_term->term_id;

		} else {
			$taxonomy_slug = $attributes['selectedTaxonomy'];
			$taxonomy = get_taxonomy( $taxonomy_slug );
		}

		$taxonomy_list_args['taxonomy'] = $taxonomy_slug;

		if( is_single() ) { // Doesn't apply to pages
			$categories_list = get_the_term_list( $post, $taxonomy_list_args['taxonomy'], '<li>', null, '</li>' );
		} else {
			$categories_list = wp_list_categories( $taxonomy_list_args );
		}

		echo $categories_list;
	?>
</ul>
