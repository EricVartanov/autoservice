<?php
/**
 * One-off Local WP ACF schema fixes. Run:
 * php -c <local-php.ini> /tmp/wp-cli.phar --path=<public> eval-file scripts/wp-acf-fix.php
 */

if ( ! function_exists( 'acf_get_field' ) ) {
	echo "ACF missing\n";
	return;
}

function as_patch( $key, $patch ) {
	$f = acf_get_field( $key );
	if ( ! $f ) {
		echo "MISS $key\n";
		return null;
	}
	foreach ( $patch as $k => $v ) {
		$f[ $k ] = $v;
	}
	acf_update_field( $f );
	echo "OK {$f['key']} name={$f['name']} gql=" . ( $f['graphql_field_name'] ?? '' ) . "\n";
	return $f;
}

function as_add( $field ) {
	acf_update_field( $field );
	echo "ADD {$field['key']} {$field['name']}\n";
}

as_patch(
	'field_6aa295c549137',
	array(
		'name'               => 'title_line_2',
		'label'              => 'Title line 2',
		'graphql_field_name' => 'titleLine2',
	)
);

as_patch(
	'field_6aa296134913a',
	array(
		'type'     => 'text',
		'tabs'     => '',
		'toolbar'  => '',
		'media_upload' => 0,
	)
);

as_patch( 'field_6aa28ae20f1c5', array( 'graphql_field_name' => 'text' ) );

as_patch(
	'field_6aa28bba0f1cc',
	array(
		'name'               => 'about_stats',
		'graphql_field_name' => 'aboutStats',
	)
);
as_patch(
	'field_6aa28c550f1ce',
	array(
		'name'               => 'value',
		'label'              => 'Value',
		'graphql_field_name' => 'value',
	)
);
as_patch(
	'field_6aa28c5d0f1cf',
	array(
		'name'               => 'text',
		'label'              => 'Text',
		'graphql_field_name' => 'text',
	)
);

as_patch(
	'field_6aa2982449150',
	array(
		'parent'        => 252,
		'parent_layout' => 'layout_6aa296ac4913e',
		'menu_order'    => 20,
	)
);

as_patch(
	'field_6aa2992d91f44',
	array(
		'type'   => 'group',
		'layout' => 'block',
	)
);

as_patch(
	'field_6aa299ef91f51',
	array(
		'name'               => 'map_image',
		'graphql_field_name' => 'mapImage',
	)
);
as_patch(
	'field_6aa29a0091f52',
	array(
		'name'               => 'map_image_dark',
		'graphql_field_name' => 'mapImageDark',
	)
);
as_patch(
	'field_6aa29a1291f53',
	array(
		'name'               => 'map_image_modal',
		'label'              => 'Map image modal',
		'type'               => 'image',
		'return_format'      => 'array',
		'graphql_field_name' => 'mapImageModal',
		'preview_size'       => 'medium',
		'library'            => 'all',
	)
);

$manager = acf_get_field( 'field_6aa29a4b91f58' );
if ( $manager ) {
	$manager['type']               = 'group';
	$manager['layout']             = 'block';
	$manager['graphql_field_name'] = 'manager';
	$manager['sub_fields']         = array();
	acf_update_field( $manager );
	as_add(
		array(
			'key'                => 'field_as_fb_manager_title',
			'label'              => 'Title',
			'name'               => 'title',
			'type'               => 'text',
			'parent'             => 'field_6aa29a4b91f58',
			'show_in_graphql'    => 1,
			'graphql_field_name' => 'title',
		)
	);
	as_add(
		array(
			'key'                => 'field_as_fb_manager_photo',
			'label'              => 'Photo',
			'name'               => 'photo',
			'type'               => 'image',
			'return_format'      => 'array',
			'preview_size'       => 'medium',
			'library'            => 'all',
			'parent'             => 'field_6aa29a4b91f58',
			'show_in_graphql'    => 1,
			'graphql_field_name' => 'photo',
		)
	);
}

as_add(
	array(
		'key'                => 'field_as_hero_cta',
		'label'              => 'CTA',
		'name'               => 'cta',
		'type'               => 'group',
		'layout'             => 'block',
		'parent'             => 252,
		'parent_layout'      => 'layout_6aa27ad3d26f4',
		'menu_order'         => 20,
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'cta',
	)
);
as_add(
	array(
		'key'                => 'field_as_hero_cta_label',
		'label'              => 'Label',
		'name'               => 'label',
		'type'               => 'text',
		'parent'             => 'field_as_hero_cta',
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'label',
	)
);

$car_fields = array(
	array( 'field_as_contact_cbl', 'car_brand_label', 'text', 'Car brand label', 'carBrandLabel' ),
	array( 'field_as_contact_cbp', 'car_brand_placeholder', 'text', 'Car brand placeholder', 'carBrandPlaceholder' ),
);
foreach ( $car_fields as $row ) {
	as_add(
		array(
			'key'                => $row[0],
			'name'               => $row[1],
			'type'               => $row[2],
			'label'              => $row[3],
			'parent'             => 'group_6a85673864a33',
			'show_in_graphql'    => 1,
			'graphql_field_name' => $row[4],
		)
	);
}
as_add(
	array(
		'key'                => 'field_as_contact_cbr',
		'name'               => 'car_brand_required',
		'type'               => 'true_false',
		'label'              => 'Car brand required',
		'parent'             => 'group_6a85673864a33',
		'ui'                 => 1,
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'carBrandRequired',
	)
);

$fb = array(
	array( 'field_as_fb_nl', 'name_label', 'text', 'Name label', 'nameLabel' ),
	array( 'field_as_fb_np', 'name_placeholder', 'text', 'Name placeholder', 'namePlaceholder' ),
	array( 'field_as_fb_pl', 'phone_label', 'text', 'Phone label', 'phoneLabel' ),
	array( 'field_as_fb_pp', 'phone_placeholder', 'text', 'Phone placeholder', 'phonePlaceholder' ),
);
foreach ( $fb as $row ) {
	as_add(
		array(
			'key'                => $row[0],
			'name'               => $row[1],
			'type'               => $row[2],
			'label'              => $row[3],
			'parent'             => 'group_6a856c356e147',
			'show_in_graphql'    => 1,
			'graphql_field_name' => $row[4],
		)
	);
}
as_add(
	array(
		'key'                => 'field_as_fb_nr',
		'name'               => 'name_required',
		'type'               => 'true_false',
		'label'              => 'Name required',
		'parent'             => 'group_6a856c356e147',
		'ui'                 => 1,
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'nameRequired',
	)
);
as_add(
	array(
		'key'                => 'field_as_fb_pr',
		'name'               => 'phone_required',
		'type'               => 'true_false',
		'label'              => 'Phone required',
		'parent'             => 'group_6a856c356e147',
		'ui'                 => 1,
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'phoneRequired',
	)
);

as_add(
	array(
		'key'                => 'field_as_service_symptoms_title',
		'name'               => 'symptoms_title',
		'type'               => 'text',
		'label'              => 'Symptoms title',
		'parent'             => 'group_6a8551d421a55',
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'symptomsTitle',
	)
);

if ( function_exists( 'graphql_get_schema' ) ) {
	graphql_get_schema();
}
echo "DONE ACF FIX\n";
