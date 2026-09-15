<?php
/**
 * Seed CPT review from frontend mock patterns (multiple platforms/branches).
 *
 * php -c <local-php.ini> /tmp/wp-cli.phar --path=<public> eval-file scripts/wp-seed-reviews.php
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
		return $cache[ $rel ];
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

if ( ! post_type_exists( 'review' ) ) {
	echo "CPT review missing\n";
	return;
}
if ( ! function_exists( 'update_field' ) ) {
	echo "ACF missing\n";
	return;
}

$maya       = 52;
$dorozhnaya = 48;

$reviews = array(
	array(
		'slug'     => 'm0kik-yandex-maya',
		'author'   => 'm0kik',
		'platform' => 'yandex',
		'branch'   => $maya,
		'rating'   => 4.9,
		'avatar'   => 'reviews/avatar1.webp',
		'text'     => 'Обратился с проблемами в электрике. Сделали полную диагностику, нашли неисправный датчик и проблемы с проводкой. Все исправили аккуратно, объяснили, что и как, дали гарантию. Электроника теперь работает отлично.',
	),
	array(
		'slug'     => 'anastasia-yandex-dorozhnaya',
		'author'   => 'Anastasia',
		'platform' => 'yandex',
		'branch'   => $dorozhnaya,
		'rating'   => 5,
		'avatar'   => 'reviews/avatar2.webp',
		'text'     => 'Отличный сервис, всё сделали быстро и качественно. Рекомендую!',
	),
	array(
		'slug'     => 'igor-2gis-maya',
		'author'   => 'Игорь',
		'platform' => '2gis',
		'branch'   => $maya,
		'rating'   => 5,
		'avatar'   => 'reviews/avatar3.webp',
		'text'     => 'Менял масло и фильтры. Работают аккуратно, цены адекватные.',
	),
	array(
		'slug'     => 'marina-google-dorozhnaya',
		'author'   => 'Марина',
		'platform' => 'google',
		'branch'   => $dorozhnaya,
		'rating'   => 4.8,
		'avatar'   => 'reviews/avatar1.webp',
		'text'     => 'Шиномонтаж сделали за час, балансировка идеальная.',
	),
	array(
		'slug'     => 'sergey-yandex-maya',
		'author'   => 'Сергей',
		'platform' => 'yandex',
		'branch'   => $maya,
		'rating'   => 5,
		'avatar'   => 'reviews/avatar2.webp',
		'text'     => 'Диагностика ходовой — нашли проблему, которую другие пропустили.',
	),
	array(
		'slug'     => 'olga-2gis-dorozhnaya',
		'author'   => 'Ольга',
		'platform' => '2gis',
		'branch'   => $dorozhnaya,
		'rating'   => 4.9,
		'avatar'   => 'reviews/avatar3.webp',
		'text'     => 'Удобно, что два филиала. Записалась онлайн, всё вовремя.',
	),
);

global $wpdb;

foreach ( $reviews as $i => $item ) {
	$id = (int) $wpdb->get_var(
		$wpdb->prepare(
			"SELECT ID FROM {$wpdb->posts} WHERE post_type=%s AND post_name=%s ORDER BY ID DESC LIMIT 1",
			'review',
			$item['slug']
		)
	);
	if ( ! $id && 0 === $i ) {
		$id = (int) $wpdb->get_var(
			"SELECT ID FROM {$wpdb->posts} WHERE post_type='review' AND post_status='publish' ORDER BY ID ASC LIMIT 1"
		);
	}

	$payload = array(
		'post_type'   => 'review',
		'post_status' => 'publish',
		'post_title'  => $item['author'],
		'post_name'   => $item['slug'],
	);
	if ( $id ) {
		$payload['ID'] = $id;
		$updated       = wp_update_post( $payload, true );
		if ( is_wp_error( $updated ) ) {
			echo 'UPDATE FAIL ' . $item['slug'] . ' ' . $updated->get_error_message() . "\n";
			continue;
		}
		echo "UPDATED review {$id} {$item['slug']}\n";
	} else {
		$id = wp_insert_post( $payload, true );
		if ( is_wp_error( $id ) ) {
			echo 'INSERT FAIL ' . $item['slug'] . ' ' . $id->get_error_message() . "\n";
			continue;
		}
		echo "CREATED review {$id} {$item['slug']}\n";
	}

	update_field( 'author_name', $item['author'], $id );
	update_field( 'platform', $item['platform'], $id );
	update_field( 'rating', $item['rating'], $id );
	update_field( 'avatar', as_media( $item['avatar'], $item['author'] ), $id );
	update_field( 'text', $item['text'], $id );
	update_field( 'branch', $item['branch'], $id );
}

$count = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->posts} WHERE post_type='review' AND post_status='publish'" );
echo "DONE REVIEWS count={$count}\n";
