<?php
/**
 * Remove cloned Offer fields (Badge/Until/Image/Disclaimer/Cta) from Review CPT.
 * Leaves author/platform/rating/avatar/text/branch. Does not touch CPT Offer.
 *
 * php -c <local-php.ini> /tmp/wp-cli.phar --path=<public> eval-file scripts/wp-acf-detach-review-offer.php
 */

if ( ! function_exists( 'acf_get_field' ) ) {
	echo "ACF missing\n";
	return;
}

$key = 'field_6aa2708bc8a03';
$field = acf_get_field( $key );
if ( ! $field ) {
	echo "MISS $key (already removed?)\n";
} else {
	acf_delete_field( $key );
	echo "DELETED $key {$field['name']}\n";
}

$remaining = acf_get_fields( 'group_6aa2708b173a9' );
$names     = array();
foreach ( $remaining ?: array() as $f ) {
	$names[] = $f['name'];
	echo "KEEP {$f['key']} {$f['name']}\n";
}

$expected = array( 'author_name', 'platform', 'rating', 'avatar', 'text', 'branch' );
$extra    = array_values( array_diff( $names, $expected ) );
$missing  = array_values( array_diff( $expected, $names ) );
if ( $extra ) {
	echo 'EXTRA ' . implode( ',', $extra ) . "\n";
}
if ( $missing ) {
	echo 'MISSING ' . implode( ',', $missing ) . "\n";
}

$offer = acf_get_field( 'field_6aa26e422161e' );
echo $offer ? "OFFER nested group still present\n" : "OFFER nested group MISSING\n";

if ( function_exists( 'graphql_get_endpoint_url' ) ) {
	do_action( 'graphql_purge_schema_cache' );
}
delete_transient( 'wpgraphql_schema' );
global $wpdb;
$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '%graphql%schema%'" );
echo "DONE DETACH\n";
