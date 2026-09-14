<?php
/**
 * Move Site Settings field groups onto ACF options subpages.
 * Keep GraphQL on type SiteSettings.
 *
 * php -c <local-php.ini> /tmp/wp-cli.phar --path=<public> eval-file scripts/wp-split-site-settings.php
 */

if ( ! function_exists( 'acf_get_field_group' ) ) {
	echo "ACF missing\n";
	return;
}

$map = array(
	'group_6a845d326061c' => 'site-chrome',
	'group_6a855d6421951' => 'site-seo-page',
	'group_6a855eabc15e6' => 'site-labels-page',
	'group_6aa2644130630' => 'site-brands',
	'group_6a8563ec447ff' => 'site-services',
	'group_6a85657edc994' => 'site-commercial',
	'group_6a85673864a33' => 'site-contact-form',
	'group_6a856c356e147' => 'site-feedback',
	'group_6a85601f9473b' => 'site-modals',
	'group_6aa2630e44552' => 'site-services',
	'group_as_opt_hero' => 'site-hero',
	'group_as_opt_about' => 'site-about',
	'group_as_opt_services' => 'site-services',
	'group_as_opt_steps' => 'site-steps',
	'group_as_opt_team' => 'site-team',
	'group_as_opt_special_offer' => 'site-special-offer',
	'group_as_opt_reviews' => 'site-reviews',
	'group_as_opt_commercial' => 'site-commercial',
	'group_as_opt_faq' => 'site-faq',
	'group_as_opt_contact_form' => 'site-contact-form',
	'group_as_opt_contacts' => 'site-contacts',
	'group_as_opt_feedback' => 'site-feedback',
);

foreach ( $map as $key => $slug ) {
	$group = acf_get_field_group( $key );
	if ( ! $group ) {
		echo "MISS $key\n";
		continue;
	}

	$group['location'] = array(
		array(
			array(
				'param'    => 'options_page',
				'operator' => '==',
				'value'    => $slug,
			),
		),
	);
	$group['graphql_types']                       = array( 'SiteSettings' );
	$group['map_graphql_types_from_location_rules'] = 0;
	$group['show_in_graphql']                     = 1;

	acf_update_field_group( $group );
	$check = acf_get_field_group( $key );
	$loc   = $check['location'][0][0]['value'] ?? '?';
	$types = isset( $check['graphql_types'] ) ? implode( ',', (array) $check['graphql_types'] ) : '';
	echo "OK $key -> $loc gql_types=$types\n";
}

if ( function_exists( 'graphql_get_endpoint_url' ) ) {
	do_action( 'graphql_purge_schema_cache' );
}
delete_transient( 'wpgraphql_schema' );
global $wpdb;
$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '%graphql%schema%'" );
echo "DONE SPLIT SITE SETTINGS\n";
