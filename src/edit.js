/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * WordPress dependencies
 */
import {
	PanelBody,
	Placeholder,
	Spinner,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';
import { useEntityRecords } from '@wordpress/core-data';
import { withSelect } from '@wordpress/data';
import { listView } from '@wordpress/icons';

/*
 * Edit component for the terms list block.
 * @param  {Object} props - The component props.
 * @param  {Object} props.attributes - Component attributes.
 * @param  {string} props.attributes.selectedTaxonomy - The selected taxonomy.
 * @param  {boolean} props.attributes.showPostCounts - Flag to display post counts.
 * @param  {boolean} props.attributes.showEmpty - Flag to show empty terms.
 * @param  {Function} props.setAttributes - Function to set component attributes.
 * @return {JSX.Element} Edit component JSX.
 */
export default function Edit( {
	attributes: { selectedTaxonomy, showPostCounts, showEmpty },
	setAttributes,
} ) {
	const classes = 'wp-block-terms-list';

	const blockProps = useBlockProps( {
		className: classes,
	} );

	/**
	 * Sets up our query parameters for use later.
	 */
	const query = {
		per_page: -1,
		hide_empty: ! showEmpty,
		context: 'view',
		parent: 0,
	};

	/**
	 * Returns the terms for the selected taxnomy using our query.
	 */
	const { records: terms, isResolving } = useEntityRecords(
		'taxonomy',
		selectedTaxonomy,
		query
	);

	/*
	 * Gets the list of terms based on parent ID.
	 * @param   {number} parentId - The ID of the parent term.
	 * @return {Object[]} The list of terms.
	 */
	const getTermsList = ( parentId ) => {
		if ( ! terms?.length ) {
			return [];
		}
		if ( parentId === null ) {
			return terms;
		}
		return terms.filter( ( { parent } ) => parent === parentId );
	};

	/**
	 * Renders the name of a term.
	 * @param {string} name - The name of the term.
	 * @return {string} Rendered term name.
	 */
	const renderTermName = ( name ) =>
		! name ? __( '(Untitled)' ) : decodeEntities( name ).trim();

	/**
	 * Renders the list of terms.
	 * @return {JSX.Element[]} Array of rendered term list items.
	 */
	const renderTermList = () => {
		const parentId = 0;
		const termsList = getTermsList( parentId );
		return termsList.map( ( term ) => renderTermListItem( term ) );
	};

	/**
	 * Renders an individual term list item.
	 * @param {Object} term - The term object to render.
	 * @return {JSX.Element} Rendered term list item HTML.
	 */
	const renderTermListItem = ( term ) => {
		const childTerms = getTermsList( term.id );
		const { id, link, count, name } = term;

		return (
			<li key={ id } className={ `cat-item cat-item-${ id }` }>
				<a href={ link } target="_blank" rel="noreferrer noopener">
					{ renderTermName( name ) }
				</a>
				{ showPostCounts && ` (${ count })` }
				{ !! childTerms.length && (
					<ul className="children">
						{ childTerms.map( ( childTerm ) =>
							renderTermListItem( childTerm )
						) }
					</ul>
				) }
			</li>
		);
	};

	/**
	 * Toggles an attribute value using the setAttributes function.
	 * @param {string} attributeName - The name of the attribute to toggle.
	 * @return {Function} Function to set the attribute.
	 */
	const toggleAttribute = (attributeName) => (newValue) =>
		setAttributes({ [attributeName]: newValue });

	/*
	 * Creates a control object for selecting a taxonomy.
	 * @return {Object[]} A formatted SelectControl.
	 */
	const TaxonomySelectControl = withSelect((select) => {
		const taxonomies = select('core').getTaxonomies();

		return {
			taxonomies,
		};
	})(({ taxonomies, onChange, value }) => {
		const taxonomyOptions = taxonomies.map((taxonomy) => ({
			label: taxonomy.labels.singular_name + ' (' + taxonomy.slug + ')',
			value: taxonomy.slug,
		}));

		return (
			<SelectControl
				__nextHasNoMarginBottom
				label={__('Select Taxonomy')}
				options={taxonomyOptions}
				value={value}
				onChange={onChange}
			/>
		);
	});

	/**
	 * Determines the tag name based on whether or not we have terms to list.
	 * @type {string} The determined tag name.
	 */
	const TagName = !! terms?.length && ! isResolving ? 'ul' : 'div';

	return (
		<TagName { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) }>
					<TaxonomySelectControl
						value={ selectedTaxonomy }
						onChange={ toggleAttribute( 'selectedTaxonomy' ) }
					/>
					<p>
						{ __(
							'The selected taxonomy will be overridden when viewing a term archive or a single post.'
						) }
					</p>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Show post counts' ) }
						checked={ showPostCounts }
						onChange={ toggleAttribute( 'showPostCounts' ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Show empty terms' ) }
						checked={ showEmpty }
						onChange={ toggleAttribute( 'showEmpty' ) }
					/>
				</PanelBody>
			</InspectorControls>
			{ isResolving && (
				<Placeholder
					icon={ listView }
					label={ __( 'Taxonomy Terms List' ) }
				>
					<Spinner />
				</Placeholder>
			) }
			{ ! isResolving && terms?.length === 0 && (
				<p>
					{ __(
						'Your site does not have any terms for this taxonomy, so there is nothing to display here at the moment.'
					) }
				</p>
			) }
			{ ! isResolving && terms?.length > 0 && renderTermList() }
		</TagName>
	);
}
