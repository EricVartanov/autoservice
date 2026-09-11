<?php
/**
 * Attach orphan ACF fields, add Review CPT + specialOffer CTA, expose newsFields on NewsItem.
 */

function as_parent( $key, $parent ) {
	$f = acf_get_field( $key );
	if ( ! $f ) {
		echo "MISS $key\n";
		return;
	}
	$f['parent']          = $parent;
	$f['show_in_graphql'] = 1;
	acf_update_field( $f );
	$check = acf_get_field( $key );
	echo "PARENT {$key} -> {$parent} now=" . ( $check['parent'] ?? '?' ) . "\n";
}

function as_add( $field ) {
	if ( acf_get_field( $field['key'] ) ) {
		echo "EXISTS {$field['key']}\n";
		return;
	}
	acf_update_field( $field );
	echo "ADD {$field['key']} {$field['name']}\n";
}

as_parent( 'field_as_contact_cbl', 148 );
as_parent( 'field_as_contact_cbp', 148 );
as_parent( 'field_as_contact_cbr', 148 );
as_parent( 'field_as_fb_nl', 171 );
as_parent( 'field_as_fb_np', 171 );
as_parent( 'field_as_fb_pl', 171 );
as_parent( 'field_as_fb_pp', 171 );
as_parent( 'field_as_fb_nr', 171 );
as_parent( 'field_as_fb_pr', 171 );
as_parent( 'field_as_service_symptoms_title', 55 );

as_add(
	array(
		'key'                => 'field_as_so_cta',
		'label'              => 'CTA',
		'name'               => 'cta',
		'type'               => 'group',
		'layout'             => 'block',
		'parent'             => 252,
		'parent_layout'      => 'layout_6aa2953049134',
		'menu_order'         => 50,
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'cta',
	)
);
as_add(
	array(
		'key'                => 'field_as_so_cta_label',
		'label'              => 'Label',
		'name'               => 'label',
		'type'               => 'text',
		'parent'             => 'field_as_so_cta',
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'label',
	)
);

$review_fields = array(
	array(
		'key'                => 'field_as_review_author',
		'label'              => 'Author',
		'name'               => 'author_name',
		'type'               => 'text',
		'parent'             => 234,
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'authorName',
	),
	array(
		'key'                => 'field_as_review_platform',
		'label'              => 'Platform',
		'name'               => 'platform',
		'type'               => 'select',
		'choices'            => array(
			'yandex' => 'yandex',
			'google' => 'google',
			'2gis'   => '2gis',
		),
		'return_format'      => 'value',
		'parent'             => 234,
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'platform',
	),
	array(
		'key'                => 'field_as_review_rating',
		'label'              => 'Rating',
		'name'               => 'rating',
		'type'               => 'number',
		'parent'             => 234,
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'rating',
	),
	array(
		'key'                => 'field_as_review_avatar',
		'label'              => 'Avatar',
		'name'               => 'avatar',
		'type'               => 'image',
		'return_format'      => 'array',
		'preview_size'       => 'thumbnail',
		'library'            => 'all',
		'parent'             => 234,
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'avatar',
	),
	array(
		'key'                => 'field_as_review_text',
		'label'              => 'Text',
		'name'               => 'text',
		'type'               => 'textarea',
		'parent'             => 234,
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'text',
	),
	array(
		'key'                => 'field_as_review_branch',
		'label'              => 'Branch',
		'name'               => 'branch',
		'type'               => 'relationship',
		'post_type'          => array( 'branch' ),
		'return_format'      => 'id',
		'max'                => 1,
		'parent'             => 234,
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'branch',
	),
);
foreach ( $review_fields as $field ) {
	as_add( $field );
}

$news = acf_get_field_group( 'group_6aa269bfd0353' );
if ( $news ) {
	$news['graphql_types'] = array( 'NewsItem' );
	acf_update_field_group( $news );
	echo "NEWS graphql_types=NewsItem\n";
}

$tyres  = (int) $GLOBALS['wpdb']->get_var( "SELECT ID FROM {$GLOBALS['wpdb']->posts} WHERE post_type='service' AND post_name='tyres-service' LIMIT 1" );
$review = (int) $GLOBALS['wpdb']->get_var( "SELECT ID FROM {$GLOBALS['wpdb']->posts} WHERE post_type='review' AND post_status='publish' ORDER BY ID DESC LIMIT 1" );
$home   = 248;
$maya   = 52;

	$p = acf_get_field( 'field_as_fb_manager_photo' );
	if ( $p ) {
		$p['return_format'] = 'id';
		acf_update_field( $p );
		echo "manager photo return_format=id\n";
	}
	update_field( 'symptoms_title', 'Признаки, что нужен шиномонтаж:', $tyres );
	echo "tyres symptoms_title saved\n";
}
update_field( 'car_brand_label', 'Марка Вашего авто', 'option' );
update_field( 'car_brand_placeholder', 'выберите из списка', 'option' );
update_field( 'car_brand_required', 1, 'option' );
update_field( 'name_label', 'Как к Вам обращаться?', 'option' );
update_field( 'name_placeholder', 'начните вводить', 'option' );
update_field( 'name_required', 1, 'option' );
update_field( 'phone_label', 'Ваш номер телефона', 'option' );
update_field( 'phone_placeholder', '+7 (999) 999-99-99', 'option' );
update_field( 'phone_required', 1, 'option' );

if ( $review ) {
	update_field( 'author_name', 'm0kik', $review );
	update_field( 'platform', 'yandex', $review );
	update_field( 'rating', 4.9, $review );
	$avatar = get_field( 'avatar', $review );
	if ( ! $avatar ) {
		$aid = (int) $GLOBALS['wpdb']->get_var( "SELECT ID FROM {$GLOBALS['wpdb']->posts} WHERE post_type='attachment' AND guid LIKE '%avatar1%' LIMIT 1" );
		if ( $aid ) {
			update_field( 'avatar', $aid, $review );
		}
	}
	update_field( 'text', 'Обратился с проблемами в электрике. Сделали полную диагностику, нашли неисправный датчик и проблемы с проводкой. Все исправили аккуратно, объяснили, что и как, дали гарантию. Электроника теперь работает отлично.', $review );
	update_field( 'branch', array( $maya ), $review );
	echo "review fields saved $review\n";
}

$sections = get_field( 'sections', $home );
if ( is_array( $sections ) ) {
	foreach ( $sections as &$row ) {
		if ( ( $row['acf_fc_layout'] ?? '' ) === 'specialOffer' && empty( $row['cta']['label'] ) ) {
			$row['cta'] = array( 'label' => 'Подробнее' );
		}
	}
	unset( $row );
	update_field( 'sections', $sections, $home );
	echo "specialOffer cta saved\n";
}

if ( function_exists( 'graphql_get_endpoint_url' ) ) {
	do_action( 'graphql_purge_schema_cache' );
}
delete_transient( 'wpgraphql_schema' );
global $wpdb;
$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '%graphql%schema%'" );
echo "DONE ATTACH\n";
