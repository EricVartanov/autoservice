<?php
/**
 * Seed CPT offer from frontend mocks (src/content/offers.js).
 *
 * php -c <local-php.ini> /tmp/wp-cli.phar --path=<public> eval-file scripts/wp-seed-offers.php
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

$disclaimer = '* Акция действует при записи через сайт. Скидка не суммируется с другими спецпредложениями. Подробности уточняйте у менеджера.';

$offers = array(
	array(
		'slug'       => 'diagnostika-skidka-20',
		'title'      => 'Диагностика вашего автомобиля со скидкой 20% до 31.07.26*',
		'until'      => '2026-07-31',
		'image'      => 'specialOffer/specialOffer.webp',
		'image_alt'  => 'Диагностика со скидкой 20%',
		'menu_order' => 1,
	),
	array(
		'slug'       => 'zamena-masla-skidka-15',
		'title'      => 'Замена масла и фильтров — скидка 15% до 30.09.26*',
		'until'      => '2026-09-30',
		'image'      => 'commercial/commercial-bg.webp',
		'image_alt'  => 'Замена масла и фильтров',
		'menu_order' => 2,
	),
	array(
		'slug'       => 'diagnostika-v-podarok',
		'title'      => 'Компьютерная диагностика в подарок при любом ТО до 31.12.26*',
		'until'      => '2026-12-31',
		'image'      => 'about/about-card-bg1.webp',
		'image_alt'  => 'Компьютерная диагностика в подарок',
		'menu_order' => 3,
	),
	array(
		'slug'       => 'zapravka-kondicionera-skidka-10',
		'title'      => 'Заправка кондиционера со скидкой 10% до 15.08.26*',
		'until'      => '2026-08-15',
		'image'      => 'contactForm/contact-form-bg.webp',
		'image_alt'  => 'Заправка кондиционера',
		'menu_order' => 4,
	),
);

if ( ! post_type_exists( 'offer' ) ) {
	echo "CPT offer missing\n";
	return;
}

if ( ! function_exists( 'update_field' ) ) {
	echo "ACF missing\n";
	return;
}

foreach ( $offers as $item ) {
	$id      = as_post_id_by_slug( 'offer', $item['slug'] );
	$payload = array(
		'post_type'    => 'offer',
		'post_status'  => 'publish',
		'post_title'   => $item['title'],
		'post_name'    => $item['slug'],
		'menu_order'   => $item['menu_order'],
		'post_content' => '',
	);
	if ( $id ) {
		$payload['ID'] = $id;
		$updated       = wp_update_post( $payload, true );
		if ( is_wp_error( $updated ) ) {
			echo 'UPDATE FAIL ' . $item['slug'] . ' ' . $updated->get_error_message() . "\n";
			continue;
		}
		echo "UPDATED offer {$id} {$item['slug']}\n";
	} else {
		$id = wp_insert_post( $payload, true );
		if ( is_wp_error( $id ) ) {
			echo 'INSERT FAIL ' . $item['slug'] . ' ' . $id->get_error_message() . "\n";
			continue;
		}
		echo "CREATED offer {$id} {$item['slug']}\n";
	}

	$media_id = as_media( $item['image'], $item['image_alt'] );
	$ok       = update_field(
		'offer_fields',
		array(
			'badge'      => 'Акция',
			'until'      => $item['until'],
			'image'      => $media_id ? $media_id : '',
			'disclaimer' => $disclaimer,
			'cta_label'  => 'Оставить заявку',
		),
		$id
	);
	echo $ok ? "ACF {$item['slug']} SAVED\n" : "ACF {$item['slug']} FAILED\n";
}

echo "DONE OFFERS\n";
