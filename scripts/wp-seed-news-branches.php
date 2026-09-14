<?php
/**
 * Seed CPT news + news page ACF from frontend mocks, and set branch map markers.
 *
 * php -c <local-php.ini> /tmp/wp-cli.phar --path=<public> eval-file scripts/wp-seed-news-branches.php
 */

require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

function as_media( $rel, $alt = '' ) {
	static $cache = array();
	$rel          = ltrim( $rel, '/' );
	if ( str_starts_with( $rel, 'mock/' ) ) {
		$rel = substr( $rel, 5 );
	}
	if ( isset( $cache[ $rel ] ) ) {
		$id = $cache[ $rel ];
		if ( $id && $alt && ! get_post_meta( $id, '_wp_attachment_image_alt', true ) ) {
			update_post_meta( $id, '_wp_attachment_image_alt', $alt );
		}
		return $id;
	}
	global $wpdb;
	$abs  = '/Users/eric/Documents/Projects/autoservice/public/mock/' . $rel;
	$base = basename( $abs );
	if ( ! file_exists( $abs ) ) {
		echo "NO FILE $abs\n";
		$cache[ $rel ] = 0;
		return 0;
	}
	$id = (int) $wpdb->get_var(
		$wpdb->prepare(
			"SELECT ID FROM {$wpdb->posts} WHERE post_type='attachment' AND guid LIKE %s ORDER BY ID DESC LIMIT 1",
			'%' . $wpdb->esc_like( $base )
		)
	);
	if ( ! $id ) {
		$tmp = wp_tempnam( $base );
		copy( $abs, $tmp );
		$file_array = array(
			'name'     => $base,
			'tmp_name' => $tmp,
		);
		$id         = media_handle_sideload( $file_array, 0, null, array( 'post_title' => pathinfo( $base, PATHINFO_FILENAME ) ) );
		if ( is_wp_error( $id ) ) {
			echo 'IMPORT FAIL ' . $rel . ' ' . $id->get_error_message() . "\n";
			$cache[ $rel ] = 0;
			return 0;
		}
		echo "IMPORTED $rel -> $id\n";
	}
	$id = (int) $id;
	if ( $id && $alt && ! get_post_meta( $id, '_wp_attachment_image_alt', true ) ) {
		update_post_meta( $id, '_wp_attachment_image_alt', $alt );
	}
	$cache[ $rel ] = $id;
	return $id;
}

function as_post_id_by_slug( $type, $slug ) {
	global $wpdb;
	return (int) $wpdb->get_var(
		$wpdb->prepare(
			"SELECT ID FROM {$wpdb->posts} WHERE post_type=%s AND post_name=%s ORDER BY ID DESC LIMIT 1",
			$type,
			$slug
		)
	);
}

function as_paragraphs_html( $paragraphs ) {
	$html = '';
	foreach ( $paragraphs as $text ) {
		$html .= '<p>' . esc_html( $text ) . '</p>';
	}
	return $html;
}

$news_text = array(
	'Мы продолжаем развивать сервис и повышать качество обслуживания. В этом материале рассказываем о важных изменениях, которые уже доступны клиентам обоих филиалов.',
	'Команда Авторитет работает так, чтобы каждый визит был понятным и предсказуемым: от диагностики до выдачи автомобиля с рекомендациями.',
	'Если у вас остались вопросы — оставьте заявку на сайте или свяжитесь с менеджером выбранного филиала.',
);

$news_items = array(
	array(
		'slug'     => 'kommercheskij-transport',
		'date'     => '2026-06-12',
		'title'    => 'Расширили обслуживание коммерческого транспорта',
		'category' => 'Коммерческий транспорт',
		'gallery'  => array(
			array( 'file' => 'commercial/commercial-bg.webp', 'alt' => 'Обслуживание коммерческого транспорта в автосервисе Авторитет' ),
		),
	),
	array(
		'slug'     => 'meropriyatie-iyun-2026',
		'date'     => '2026-06-12',
		'title'    => 'Открытый день в автосервисе Авторитет',
		'category' => 'Мероприятия',
		'gallery'  => array(
			array( 'file' => 'services/engine2.png', 'alt' => 'Мероприятие в автосервисе Авторитет' ),
			array( 'file' => 'services/engine3.png', 'alt' => 'Гости на мероприятии автосервиса Авторитет' ),
		),
	),
	array(
		'slug'     => 'novye-uslugi-vesna-2026',
		'date'     => '2026-03-18',
		'title'    => 'Обновили линейку услуг по ремонту',
		'category' => 'Услуги',
		'gallery'  => array(
			array( 'file' => 'services/engine4.png', 'alt' => 'Ремонт автомобиля в автосервисе Авторитет' ),
		),
	),
	array(
		'slug'     => 'akcii-yanvar-2026',
		'date'     => '2026-01-22',
		'title'    => 'Сезонные акции на диагностику и ТО',
		'category' => 'Акции',
		'gallery'  => array(
			array( 'file' => 'services/engine1.png', 'alt' => 'Акция на услуги автосервиса Авторитет' ),
			array( 'file' => 'services/engine2.png', 'alt' => 'Специальное предложение автосервиса Авторитет' ),
		),
	),
	array(
		'slug'     => 'komanda-noyabr-2025',
		'date'     => '2025-11-05',
		'title'    => 'Знакомим с мастерами Авторитет',
		'category' => 'Команда',
		'gallery'  => array(
			array( 'file' => 'services/engine3.png', 'alt' => 'Команда мастеров автосервиса Авторитет' ),
		),
	),
	array(
		'slug'     => 'meropriyatie-avgust-2025',
		'date'     => '2025-08-14',
		'title'    => 'Корпоративное мероприятие команды',
		'category' => 'Мероприятия',
		'gallery'  => array(
			array( 'file' => 'services/engine4.png', 'alt' => 'Корпоративное мероприятие Авторитет' ),
			array( 'file' => 'services/engine1.png', 'alt' => 'Участники мероприятия автосервиса' ),
		),
	),
	array(
		'slug'     => 'uslugi-aprel-2025',
		'date'     => '2025-04-02',
		'title'    => 'Как проходит диагностика на подъёмнике',
		'category' => 'Услуги',
		'gallery'  => array(
			array( 'file' => 'services/engine2.png', 'alt' => 'Диагностика автомобиля на подъёмнике' ),
		),
	),
	array(
		'slug'     => 'lcv-dekabr-2024',
		'date'     => '2024-12-10',
		'title'    => 'Ремонт лёгкого коммерческого транспорта',
		'category' => 'Коммерческий транспорт',
		'gallery'  => array(
			array( 'file' => 'services/engine3.png', 'alt' => 'Ремонт лёгкого коммерческого транспорта' ),
			array( 'file' => 'services/engine4.png', 'alt' => 'Обслуживание фургона в сервисе Авторитет' ),
		),
	),
	array(
		'slug'     => 'akcii-iyul-2024',
		'date'     => '2024-07-21',
		'title'    => 'Летняя акция на обслуживание',
		'category' => 'Акции',
		'gallery'  => array(
			array( 'file' => 'services/engine1.png', 'alt' => 'Сезонная акция автосервиса Авторитет' ),
		),
	),
	array(
		'slug'     => 'otkrytyj-den-2024',
		'date'     => '2024-02-08',
		'title'    => 'Открытый день и демонстрация работ',
		'category' => 'Мероприятия',
		'gallery'  => array(
			array( 'file' => 'services/engine2.png', 'alt' => 'Открытый день в автосервисе Авторитет' ),
			array( 'file' => 'services/engine3.png', 'alt' => 'Демонстрация работ на мероприятии' ),
		),
	),
	array(
		'slug'     => 'to-oktyabr-2023',
		'date'     => '2023-10-30',
		'title'    => 'Плановое техническое обслуживание',
		'category' => 'Услуги',
		'gallery'  => array(
			array( 'file' => 'services/engine4.png', 'alt' => 'Техническое обслуживание автомобиля' ),
		),
	),
	array(
		'slug'     => 'komanda-maj-2023',
		'date'     => '2023-05-16',
		'title'    => 'Мастера технического центра за работой',
		'category' => 'Команда',
		'gallery'  => array(
			array( 'file' => 'services/engine1.png', 'alt' => 'Мастера автосервиса Авторитет за работой' ),
			array( 'file' => 'services/engine2.png', 'alt' => 'Команда технического центра Авторитет' ),
		),
	),
);

if ( ! post_type_exists( 'news' ) ) {
	echo "CPT news missing\n";
	return;
}
if ( ! taxonomy_exists( 'news_category' ) ) {
	echo "TAX news_category missing\n";
	return;
}

foreach ( $news_items as $item ) {
	$local  = $item['date'] . ' 12:00:00';
	$html   = as_paragraphs_html( $news_text );
	$id     = as_post_id_by_slug( 'news', $item['slug'] );
	$payload = array(
		'post_type'     => 'news',
		'post_status'   => 'publish',
		'post_title'    => $item['title'],
		'post_name'     => $item['slug'],
		'post_content'  => $html,
		'post_date'     => $local,
		'post_date_gmt' => get_gmt_from_date( $local ),
	);
	if ( $id ) {
		$payload['ID']        = $id;
		$payload['edit_date'] = true;
		$updated              = wp_update_post( $payload, true );
		if ( is_wp_error( $updated ) ) {
			echo 'UPDATE FAIL ' . $item['slug'] . ' ' . $updated->get_error_message() . "\n";
			continue;
		}
		echo "UPDATED news {$id} {$item['slug']}\n";
	} else {
		$id = wp_insert_post( $payload, true );
		if ( is_wp_error( $id ) ) {
			echo 'INSERT FAIL ' . $item['slug'] . ' ' . $id->get_error_message() . "\n";
			continue;
		}
		echo "CREATED news {$id} {$item['slug']}\n";
	}

	wp_set_object_terms( $id, $item['category'], 'news_category' );

	$gallery = array();
	foreach ( $item['gallery'] as $image ) {
		$media_id = as_media( $image['file'], $image['alt'] );
		if ( $media_id ) {
			$gallery[] = $media_id;
		}
	}
	update_field( 'gallery', $gallery, $id );
}

$news_page_id = as_post_id_by_slug( 'page', 'news' );
if ( ! $news_page_id ) {
	$page = get_page_by_path( 'news' );
	$news_page_id = $page ? (int) $page->ID : 0;
}
if ( $news_page_id ) {
	$ok = update_field(
		'news_page_fields',
		array(
			'title'           => 'Новости',
			'empty'           => 'Новостей за {year} пока нет.',
			'seo_title'       => 'Новости — Авторитет',
			'seo_description' => 'Новости автосервиса Авторитет',
			'page_size'       => 2,
		),
		$news_page_id
	);
	echo $ok ? "NEWS PAGE {$news_page_id} SAVED\n" : "NEWS PAGE {$news_page_id} FAILED\n";
} else {
	echo "NEWS PAGE missing\n";
}

$markers = array(
	'maya'       => array( 'x' => 53, 'y' => 58, 'fallback' => 52 ),
	'dorozhnaya' => array( 'x' => 45, 'y' => 27, 'fallback' => 48 ),
);
foreach ( $markers as $slug => $marker ) {
	$id = as_post_id_by_slug( 'branch', $slug );
	if ( ! $id ) {
		$id = (int) $marker['fallback'];
	}
	if ( ! $id || get_post_type( $id ) !== 'branch' ) {
		echo "BRANCH missing {$slug}\n";
		continue;
	}
	update_field( 'marker_x', $marker['x'], $id );
	update_field( 'marker_y', $marker['y'], $id );
	echo "BRANCH {$slug} {$id} marker={$marker['x']},{$marker['y']}\n";
}

echo "DONE NEWS+MARKERS\n";
