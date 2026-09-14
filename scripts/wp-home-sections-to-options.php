<?php
/**
 * Clone Home Flexible Content layouts into Site Settings section groups.
 *
 * php -c <local-php.ini> /tmp/wp-cli.phar --path=<public> eval-file scripts/wp-home-sections-to-options.php
 */

if ( ! function_exists( 'acf_get_field_group' ) ) {
	echo "ACF missing\n";
	return;
}

$sections_map = array(
	'hero'         => array(
		'group_key'          => 'group_as_opt_hero',
		'title'              => 'Hero',
		'slug'               => 'site-hero',
		'graphql_field_name' => 'heroFields',
		'prefix'             => 'hero_',
		'note'               => 'Логотипы марок — в разделе «Бренды».',
	),
	'about'        => array(
		'group_key'          => 'group_as_opt_about',
		'title'              => 'О компании',
		'slug'               => 'site-about',
		'graphql_field_name' => 'aboutFields',
		'prefix'             => 'about_',
	),
	'services'     => array(
		'group_key'          => 'group_as_opt_services',
		'title'              => 'Услуги (секция)',
		'slug'               => 'site-services',
		'graphql_field_name' => 'servicesSectionFields',
		'prefix'             => 'services_',
		'note'               => 'Список услуг — в меню «Услуги». Здесь заголовки секции; подписи модалки и форма заявки — ниже на этой странице.',
	),
	'steps'        => array(
		'group_key'          => 'group_as_opt_steps',
		'title'              => 'Этапы работы',
		'slug'               => 'site-steps',
		'graphql_field_name' => 'stepsFields',
		'prefix'             => 'steps_',
	),
	'team'         => array(
		'group_key'          => 'group_as_opt_team',
		'title'              => 'Команда',
		'slug'               => 'site-team',
		'graphql_field_name' => 'teamFields',
		'prefix'             => 'team_',
	),
	'specialOffer' => array(
		'group_key'          => 'group_as_opt_special_offer',
		'title'              => 'Спецпредложение',
		'slug'               => 'site-special-offer',
		'graphql_field_name' => 'specialOfferFields',
		'prefix'             => 'special_offer_',
		'note'               => 'Записи акций — в меню «Акции». Здесь тексты блока на главной.',
	),
	'reviews'      => array(
		'group_key'          => 'group_as_opt_reviews',
		'title'              => 'Отзывы (секция)',
		'slug'               => 'site-reviews',
		'graphql_field_name' => 'reviewsSectionFields',
		'prefix'             => 'reviews_',
		'note'               => 'Сами отзывы — в меню «Отзывы». Здесь заголовки, сводка и ссылки на площадки.',
	),
	'commercial'   => array(
		'group_key'          => 'group_as_opt_commercial',
		'title'              => 'Коммерческое',
		'slug'               => 'site-commercial',
		'graphql_field_name' => 'commercialFields',
		'prefix'             => 'commercial_',
		'note'               => 'Поля формы коммерческого предложения — ниже на этой странице.',
	),
	'faq'          => array(
		'group_key'          => 'group_as_opt_faq',
		'title'              => 'FAQ',
		'slug'               => 'site-faq',
		'graphql_field_name' => 'faqFields',
		'prefix'             => 'faq_',
	),
	'contact_form' => array(
		'group_key'          => 'group_as_opt_contact_form',
		'title'              => 'Форма обратной связи (секция)',
		'slug'               => 'site-contact-form',
		'graphql_field_name' => 'contactFormSectionFields',
		'prefix'             => 'contact_form_',
		'note'               => 'Подписи полей формы — ниже на этой странице.',
	),
	'contacts'     => array(
		'group_key'          => 'group_as_opt_contacts',
		'title'              => 'Контакты (секция)',
		'slug'               => 'site-contacts',
		'graphql_field_name' => 'contactsFields',
		'prefix'             => 'contacts_',
		'note'               => 'Филиалы — в меню «Филиалы». Здесь email и карты.',
	),
	'feedback'     => array(
		'group_key'          => 'group_as_opt_feedback',
		'title'              => 'Фидбек',
		'slug'               => 'site-feedback',
		'graphql_field_name' => 'feedbackSectionFields',
		'prefix'             => 'feedback_',
		'note'               => 'Подписи полей формы — ниже на этой странице.',
	),
);

function as_opt_strip_field( $field ) {
	unset(
		$field['ID'],
		$field['id'],
		$field['prefix'],
		$field['value'],
		$field['parent'],
		$field['parent_layout'],
		$field['_name'],
		$field['_valid'],
		$field['sub_fields'],
		$field['layouts']
	);
	return $field;
}

function as_opt_clone_field( $field, $parent, $name_prefix = '' ) {
	$old_key   = $field['key'];
	$orig_name = $field['name'];
	$orig_gql  = isset( $field['graphql_field_name'] ) ? $field['graphql_field_name'] : '';
	$children  = isset( $field['sub_fields'] ) ? $field['sub_fields'] : array();

	$field                 = as_opt_strip_field( $field );
	$field['key']          = 'field_asopt_' . substr( md5( $parent . '|' . $old_key ), 0, 13 );
	$field['parent']       = $parent;
	$field['name']         = $name_prefix ? $name_prefix . $orig_name : $orig_name;
	$field['show_in_graphql'] = 1;
	$field['graphql_field_name'] = $orig_gql ? $orig_gql : $orig_name;

	acf_update_field( $field );
	echo "  FIELD {$field['name']} gql={$field['graphql_field_name']} key={$field['key']}\n";

	$order = 0;
	foreach ( $children as $child ) {
		$child['menu_order'] = $order++;
		as_opt_clone_field( $child, $field['key'], '' );
	}

	return $field['key'];
}

function as_opt_add_message( $parent, $key, $message ) {
	if ( acf_get_field( $key ) ) {
		return;
	}
	acf_update_field(
		array(
			'key'             => $key,
			'label'           => 'Подсказка',
			'name'            => '',
			'type'            => 'message',
			'message'         => $message,
			'new_lines'       => 'wpautop',
			'esc_html'        => 0,
			'parent'          => $parent,
			'menu_order'      => -1,
			'show_in_graphql' => 0,
		)
	);
	echo "  NOTE $key\n";
}

function as_opt_ensure_group( $conf ) {
	$group = acf_get_field_group( $conf['group_key'] );
	if ( ! $group ) {
		$group = array( 'key' => $conf['group_key'] );
	}

	$group['title']                               = $conf['title'];
	$group['location']                            = array(
		array(
			array(
				'param'    => 'options_page',
				'operator' => '==',
				'value'    => $conf['slug'],
			),
		),
	);
	$group['position']                            = 'normal';
	$group['style']                               = 'default';
	$group['label_placement']                     = 'top';
	$group['instruction_placement']               = 'label';
	$group['active']                              = true;
	$group['show_in_graphql']                     = 1;
	$group['graphql_field_name']                  = $conf['graphql_field_name'];
	$group['graphql_types']                       = array( 'SiteSettings' );
	$group['map_graphql_types_from_location_rules'] = 0;

	acf_update_field_group( $group );
	$saved = acf_get_field_group( $conf['group_key'] );
	echo "GROUP {$conf['group_key']} {$conf['graphql_field_name']} -> {$conf['slug']} ID=" . ( $saved['ID'] ?? '?' ) . "\n";
	return $saved;
}

$fc = acf_get_field( 'field_6aa27ab6bf42c' );
if ( ! $fc || empty( $fc['layouts'] ) ) {
	echo "MISS flexible content field_6aa27ab6bf42c\n";
	return;
}

$layouts_by_name = array();
foreach ( $fc['layouts'] as $layout ) {
	$layouts_by_name[ $layout['name'] ] = $layout;
}

foreach ( $sections_map as $layout_name => $conf ) {
	if ( empty( $layouts_by_name[ $layout_name ] ) ) {
		echo "MISS LAYOUT $layout_name\n";
		continue;
	}

	as_opt_ensure_group( $conf );
	$group = acf_get_field_group( $conf['group_key'] );
	$parent_id = $group['ID'] ?? $conf['group_key'];

	$existing = acf_get_fields( $conf['group_key'] );
	$has_content = false;
	foreach ( (array) $existing as $field ) {
		if ( 'message' !== $field['type'] ) {
			$has_content = true;
			break;
		}
	}

	if ( ! empty( $conf['note'] ) ) {
		as_opt_add_message( $parent_id, 'field_asopt_note_' . sanitize_key( $layout_name ), $conf['note'] );
	}

	if ( $has_content ) {
		echo "  SKIP clone, fields exist\n";
		continue;
	}

	$order = 0;
	foreach ( $layouts_by_name[ $layout_name ]['sub_fields'] as $field ) {
		$field['menu_order'] = $order++;
		as_opt_clone_field( $field, $parent_id, $conf['prefix'] );
	}
}

$home_id = (int) get_option( 'page_on_front' );
if ( ! $home_id ) {
	foreach ( array( 'homepage', 'home', 'glavnaya' ) as $slug ) {
		$page = get_page_by_path( $slug );
		if ( $page ) {
			$home_id = (int) $page->ID;
			break;
		}
	}
}
if ( ! $home_id ) {
	$home_id = 248;
}

function as_opt_keys_to_names( $value ) {
	if ( ! is_array( $value ) ) {
		return $value;
	}
	$out = array();
	foreach ( $value as $k => $v ) {
		$name = $k;
		if ( is_string( $k ) && 0 === strpos( $k, 'field_' ) ) {
			$field = acf_get_field( $k );
			if ( $field ) {
				$name = $field['name'];
			}
		}
		$out[ $name ] = as_opt_keys_to_names( $v );
	}
	return $out;
}

echo "HOME=$home_id\n";
$rows = get_field( 'sections', $home_id, false );
if ( ! is_array( $rows ) ) {
	echo "NO SECTIONS DATA\n";
} else {
	foreach ( $rows as $row ) {
		$named  = as_opt_keys_to_names( $row );
		$layout = $named['acf_fc_layout'] ?? '';
		if ( empty( $sections_map[ $layout ] ) ) {
			echo "SKIP unknown layout $layout\n";
			continue;
		}
		$prefix = $sections_map[ $layout ]['prefix'];
		foreach ( $named as $name => $value ) {
			if ( 'acf_fc_layout' === $name ) {
				continue;
			}
			$target = $prefix . $name;
			$ok     = update_field( $target, $value, 'option' );
			echo $ok ? "SAVE $target\n" : "FAIL $target\n";
		}
	}
}

$relocate = array(
	'group_6a8563ec447ff' => 'site-services',
	'group_6aa2630e44552' => 'site-services',
	'group_6a85657edc994' => 'site-commercial',
	'group_6a85673864a33' => 'site-contact-form',
	'group_6a856c356e147' => 'site-feedback',
);

foreach ( $relocate as $key => $slug ) {
	$group = acf_get_field_group( $key );
	if ( ! $group ) {
		echo "MISS relocate $key\n";
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
	$group['graphql_types']                         = array( 'SiteSettings' );
	$group['map_graphql_types_from_location_rules'] = 0;
	$group['show_in_graphql']                       = 1;
	acf_update_field_group( $group );
	echo "RELOCATE $key -> $slug\n";
}

$home_group = acf_get_field_group( 'group_6aa27ab5eee16' );
if ( $home_group ) {
	$home_group['active'] = 0;
	acf_update_field_group( $home_group );
	echo "DEACTIVATE group_6aa27ab5eee16\n";
}

if ( function_exists( 'graphql_register_types' ) ) {
	do_action( 'graphql_purge_schema_cache' );
}
delete_transient( 'wpgraphql_schema' );
global $wpdb;
$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '%graphql%schema%'" );
echo "DONE HOME SECTIONS TO OPTIONS\n";
