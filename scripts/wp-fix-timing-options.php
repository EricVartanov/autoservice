<?php
/**
 * Fix contact form timing_options: ACF select choices + stored values.
 * Values must be today|week|month|other (frontend radio contract).
 *
 * php -c <local-php.ini> /tmp/wp-cli.phar --path=<public> eval-file scripts/wp-fix-timing-options.php
 */

if ( ! function_exists( 'acf_get_field' ) ) {
	echo "ACF missing\n";
	return;
}

$key = 'field_6a85682e3445b';
$field = acf_get_field( $key );
if ( ! $field ) {
	echo "MISS $key\n";
	return;
}

$field['choices'] = array(
	'today' => 'Сегодня',
	'week'  => 'В ближайшую неделю',
	'month' => 'В ближайший месяц',
	'other' => 'Другое',
);
$field['return_format'] = 'value';
$field['multiple']      = 0;
$field['allow_null']    = 0;
$field['ui']            = 0;
acf_update_field( $field );
echo "PATCHED $key choices\n";

$options = array(
	array( 'value' => 'today', 'label' => 'Сегодня' ),
	array( 'value' => 'week', 'label' => 'В ближайшую неделю' ),
	array( 'value' => 'month', 'label' => 'В ближайший месяц' ),
	array( 'value' => 'other', 'label' => 'Другое' ),
);

$ok = update_field( 'timing_options', $options, 'option' );
echo $ok ? "timing_options SAVED\n" : "timing_options FAILED\n";

// If nested under form_contact_fields group, update that too.
$fc = get_field( 'form_contact_fields', 'option' );
if ( is_array( $fc ) ) {
	$fc['timing_options'] = $options;
	$ok2 = update_field( 'form_contact_fields', $fc, 'option' );
	echo $ok2 ? "form_contact_fields.timing_options SAVED\n" : "form_contact_fields update skipped/failed\n";
}

$check = get_field( 'timing_options', 'option' );
echo 'CHECK ' . wp_json_encode( $check, JSON_UNESCAPED_UNICODE ) . "\n";

if ( function_exists( 'graphql_get_endpoint_url' ) ) {
	do_action( 'graphql_purge_schema_cache' );
}
delete_transient( 'wpgraphql_schema' );
echo "DONE TIMING FIX\n";
