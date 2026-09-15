<?php
/**
 * Remove the Labels ACF options group so GraphQL no longer exposes labelsFields.
 *
 * php -c <local-php.ini> /tmp/wp-cli.phar --path=<public> eval-file scripts/wp-acf-delete-labels.php
 */

if ( ! function_exists( 'acf_get_field_group' ) ) {
	echo "ACF missing\n";
	return;
}

$key   = 'group_6a855eabc15e6';
$group = acf_get_field_group( $key );
if ( ! $group ) {
	echo "MISS $key (already removed?)\n";
} elseif ( function_exists( 'acf_delete_field_group' ) ) {
	acf_delete_field_group( $key );
	echo "DELETED $key\n";
} else {
	$group['active']           = 0;
	$group['show_in_graphql']  = 0;
	acf_update_field_group( $group );
	echo "DEACTIVATED $key (acf_delete_field_group missing)\n";
}

if ( function_exists( 'graphql_get_endpoint_url' ) ) {
	do_action( 'graphql_purge_schema_cache' );
}
delete_transient( 'wpgraphql_schema' );
global $wpdb;
$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '%graphql%schema%'" );
echo "DONE DELETE LABELS\n";
