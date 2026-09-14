<?php
/**
 * Admin IA: top-level ACF options pages, nested service/review CPTs, News shortcut.
 *
 * Copy to wp-content/mu-plugins/autoservice-admin.php
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'acf/init', 'autoservice_register_options_pages' );
add_filter( 'acf/validate_options_page', 'autoservice_keep_fractional_menu_position' );
add_filter( 'register_post_type_args', 'autoservice_post_type_args', 20, 2 );
add_action( 'admin_menu', 'autoservice_register_content_shortcuts', 9 );
add_action( 'admin_menu', 'autoservice_label_nested_block_submenus', 999 );
add_action( 'admin_init', 'autoservice_redirect_content_shortcuts' );
add_filter( 'parent_file', 'autoservice_highlight_content_shortcuts' );

function autoservice_options_page_defs() {
	return array(
		array(
			'page_title' => 'Hero',
			'menu_title' => 'Hero',
			'menu_slug'  => 'site-hero',
			'icon_url'   => 'dashicons-images-alt2',
			'position'   => '3.01',
		),
		array(
			'page_title' => 'О компании',
			'menu_title' => 'О компании',
			'menu_slug'  => 'site-about',
			'icon_url'   => 'dashicons-building',
			'position'   => '3.02',
		),
		array(
			'page_title' => 'Услуги',
			'menu_title' => 'Услуги',
			'menu_slug'  => 'site-services',
			'icon_url'   => 'dashicons-hammer',
			'position'   => '3.03',
		),
		array(
			'page_title' => 'Этапы работы',
			'menu_title' => 'Этапы работы',
			'menu_slug'  => 'site-steps',
			'icon_url'   => 'dashicons-editor-ol',
			'position'   => '3.04',
		),
		array(
			'page_title' => 'Команда',
			'menu_title' => 'Команда',
			'menu_slug'  => 'site-team',
			'icon_url'   => 'dashicons-groups',
			'position'   => '3.05',
		),
		array(
			'page_title' => 'Спецпредложение',
			'menu_title' => 'Спецпредложение',
			'menu_slug'  => 'site-special-offer',
			'icon_url'   => 'dashicons-megaphone',
			'position'   => '3.06',
		),
		array(
			'page_title' => 'Отзывы',
			'menu_title' => 'Отзывы',
			'menu_slug'  => 'site-reviews',
			'icon_url'   => 'dashicons-star-filled',
			'position'   => '3.07',
		),
		array(
			'page_title' => 'Коммерческое',
			'menu_title' => 'Коммерческое',
			'menu_slug'  => 'site-commercial',
			'icon_url'   => 'dashicons-portfolio',
			'position'   => '3.08',
		),
		array(
			'page_title' => 'FAQ',
			'menu_title' => 'FAQ',
			'menu_slug'  => 'site-faq',
			'icon_url'   => 'dashicons-editor-help',
			'position'   => '3.09',
		),
		array(
			'page_title' => 'Форма обратной связи',
			'menu_title' => 'Форма обратной связи',
			'menu_slug'  => 'site-contact-form',
			'icon_url'   => 'dashicons-email-alt',
			'position'   => '3.10',
		),
		array(
			'page_title' => 'Контакты',
			'menu_title' => 'Контакты',
			'menu_slug'  => 'site-contacts',
			'icon_url'   => 'dashicons-phone',
			'position'   => '3.11',
		),
		array(
			'page_title' => 'Фидбек',
			'menu_title' => 'Фидбек',
			'menu_slug'  => 'site-feedback',
			'icon_url'   => 'dashicons-format-chat',
			'position'   => '3.12',
		),
		array(
			'page_title' => 'Шапка и футер',
			'menu_title' => 'Шапка и футер',
			'menu_slug'  => 'site-chrome',
			'icon_url'   => 'dashicons-align-wide',
			'position'   => '3.16',
		),
		array(
			'page_title' => 'SEO',
			'menu_title' => 'SEO',
			'menu_slug'  => 'site-seo-page',
			'icon_url'   => 'dashicons-search',
			'position'   => '3.17',
		),
		array(
			'page_title' => 'Подписи',
			'menu_title' => 'Подписи',
			'menu_slug'  => 'site-labels-page',
			'icon_url'   => 'dashicons-translation',
			'position'   => '3.18',
		),
		array(
			'page_title' => 'Модалки',
			'menu_title' => 'Модалки',
			'menu_slug'  => 'site-modals',
			'icon_url'   => 'dashicons-screenoptions',
			'position'   => '3.20',
		),
	);
}

function autoservice_keep_fractional_menu_position( $page ) {
	if ( empty( $page['menu_slug'] ) ) {
		return $page;
	}

	foreach ( autoservice_options_page_defs() as $def ) {
		if ( $def['menu_slug'] === $page['menu_slug'] ) {
			$page['position'] = $def['position'];
			break;
		}
	}

	return $page;
}

function autoservice_register_options_pages() {
	if ( ! function_exists( 'acf_add_options_page' ) ) {
		return;
	}

	acf_add_options_page(
		array(
			'page_title'         => 'Настройки сайта',
			'menu_title'         => 'Настройки сайта',
			'menu_slug'          => 'site-settings',
			'capability'         => 'edit_posts',
			'redirect'           => false,
			'parent_slug'        => 'options.php',
			'show_in_graphql'    => true,
			'graphql_field_name' => 'siteSettings',
		)
	);

	foreach ( autoservice_options_page_defs() as $page ) {
		acf_add_options_page(
			array(
				'page_title'      => $page['page_title'],
				'menu_title'      => $page['menu_title'],
				'menu_slug'       => $page['menu_slug'],
				'parent_slug'     => false,
				'capability'      => 'edit_posts',
				'redirect'        => false,
				'icon_url'        => $page['icon_url'],
				'position'        => $page['position'],
				'show_in_graphql' => false,
			)
		);
	}

	acf_add_options_sub_page(
		array(
			'page_title'      => 'Бренды',
			'menu_title'      => 'Бренды',
			'menu_slug'       => 'site-brands',
			'parent_slug'     => 'site-hero',
			'capability'      => 'edit_posts',
			'redirect'        => false,
			'show_in_graphql' => false,
		)
	);
}

function autoservice_post_type_args( $args, $post_type ) {
	$map = array(
		'branch'       => array(
			'menu_position' => '3.13',
			'menu_icon'     => 'dashicons-location',
		),
		'service'      => array(
			'show_in_menu' => 'site-services',
		),
		'offer'        => array(
			'menu_position' => '3.14',
			'menu_icon'     => 'dashicons-tickets-alt',
		),
		'review'       => array(
			'show_in_menu' => 'site-reviews',
		),
		'news'         => array(
			'menu_position' => '3.15',
			'menu_icon'     => 'dashicons-media-document',
		),
		'service_list' => array(
			'show_ui'      => false,
			'show_in_menu' => false,
			'public'       => false,
		),
	);

	if ( isset( $map[ $post_type ] ) ) {
		$args = array_merge( $args, $map[ $post_type ] );
	}

	return $args;
}

function autoservice_news_page_id() {
	$page = get_page_by_path( 'news' );
	if ( $page ) {
		return (int) $page->ID;
	}

	$found = get_posts(
		array(
			'post_type'      => 'page',
			'title'          => 'Новости',
			'post_status'    => 'publish',
			'posts_per_page' => 1,
			'fields'         => 'ids',
		)
	);
	if ( $found ) {
		return (int) $found[0];
	}

	return 0;
}

function autoservice_label_nested_block_submenus() {
	global $submenu;

	$parents = array(
		'site-hero'     => 'Hero',
		'site-services' => 'Услуги',
		'site-reviews'  => 'Отзывы',
	);

	foreach ( $parents as $parent => $page_title ) {
		if ( empty( $submenu[ $parent ] ) || ! is_array( $submenu[ $parent ] ) ) {
			$submenu[ $parent ] = array();
		}

		$block = null;
		$rest  = array();
		foreach ( $submenu[ $parent ] as $item ) {
			if ( isset( $item[2] ) && $item[2] === $parent ) {
				$item[0] = 'Блок на главной';
				$block   = $item;
			} else {
				$rest[] = $item;
			}
		}

		if ( ! $block ) {
			$block = array( 'Блок на главной', 'edit_posts', $parent, $page_title );
		}

		array_unshift( $rest, $block );
		$submenu[ $parent ] = $rest;
	}
}

function autoservice_register_content_shortcuts() {
	$news_id = autoservice_news_page_id();
	if ( $news_id && post_type_exists( 'news' ) ) {
		add_submenu_page(
			'edit.php?post_type=news',
			'Страница новостей',
			'Страница новостей',
			'edit_pages',
			'autoservice-news-page',
			'__return_null'
		);
	}
}

function autoservice_redirect_content_shortcuts() {
	if ( ! is_admin() ) {
		return;
	}

	$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : '';
	if ( ! $page ) {
		return;
	}

	if ( 'site-settings' === $page ) {
		wp_safe_redirect( admin_url( 'admin.php?page=site-hero' ) );
		exit;
	}

	if ( 'autoservice-news-page' === $page ) {
		$news_id = autoservice_news_page_id();
		if ( $news_id ) {
			wp_safe_redirect( admin_url( 'post.php?post=' . $news_id . '&action=edit' ) );
			exit;
		}
	}
}

function autoservice_highlight_content_shortcuts( $parent_file ) {
	$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
	if ( ! $screen ) {
		return $parent_file;
	}

	if ( 'service' === $screen->post_type ) {
		return 'site-services';
	}

	if ( 'review' === $screen->post_type ) {
		return 'site-reviews';
	}

	if ( 'page' !== $screen->post_type ) {
		return $parent_file;
	}

	$id = isset( $_GET['post'] ) ? (int) $_GET['post'] : 0;
	if ( $id && $id === autoservice_news_page_id() ) {
		return 'edit.php?post_type=news';
	}

	return $parent_file;
}
