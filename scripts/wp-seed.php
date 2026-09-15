<?php
/**
 * Seed Local WP from frontend mocks (media from public/mock).
 */

$MOCK = '/Users/eric/Documents/Projects/autoservice/public/mock/';

require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

function as_media( $rel ) {
	static $cache = array();
	$rel          = ltrim( $rel, '/' );
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
	if ( $id ) {
		$cache[ $rel ] = $id;
		return $id;
	}
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
	$cache[ $rel ] = (int) $id;
	return (int) $id;
}

$maya        = 52;
$dorozhnaya  = 48;
$engine      = 375;
$home        = 248;

update_field( 'seo_title', 'Авторитет — автосервис в Краснодаре', 'option' );
update_field( 'seo_description', 'Диагностика, ремонт и обслуживание автомобилей в Краснодаре. Два филиала.', 'option' );
update_field( 'form_errors_name_short', 'Слишком короткое имя', 'option' );
update_field( 'consent_required', 1, 'option' );
update_field( 'card_cta', 'Подробнее', 'option' );
update_field( 'car_brand_label', 'Марка Вашего авто', 'option' );
update_field( 'car_brand_placeholder', 'выберите из списка', 'option' );
update_field( 'car_brand_required', 1, 'option' );
update_field( 'name_label', 'Как к Вам обращаться?', 'option' );
update_field( 'name_placeholder', 'начните вводить', 'option' );
update_field( 'name_required', 1, 'option' );
update_field( 'phone_label', 'Ваш номер телефона', 'option' );
update_field( 'phone_placeholder', '+7 (999) 999-99-99', 'option' );
update_field( 'phone_required', 1, 'option' );

update_field(
	'timing_options',
	array(
		array( 'value' => 'today', 'label' => 'Сегодня' ),
		array( 'value' => 'week', 'label' => 'В ближайшую неделю' ),
		array( 'value' => 'month', 'label' => 'В ближайший месяц' ),
		array( 'value' => 'other', 'label' => 'Другое' ),
	),
	'option'
);

update_field(
	'panorama_url',
	'https://yandex.ru/map-widget/v1/?ll=39.021325%2C45.070558&z=10&l=stv&panorama%5Bpoint%5D=39.021467%2C45.070555&panorama%5Bdirection%5D=42.416318%2C7.161085&panorama%5Bspan%5D=117.625646%2C60.000000',
	$dorozhnaya
);
update_field( 'map_url', 'https://yandex.ru/maps', $dorozhnaya );
update_field( 'marker_x', 45, $dorozhnaya );
update_field( 'marker_y', 27, $dorozhnaya );
update_field(
	'panorama_url',
	'https://yandex.ru/map-widget/v1/?ll=38.997736%2C45.133651&z=10&l=stv&panorama%5Bpoint%5D=38.997132%2C45.133730&panorama%5Bdirection%5D=292.765806%2C-9.262492&panorama%5Bspan%5D=117.625646%2C60.000000',
	$maya
);
update_field( 'map_url', 'https://yandex.ru/maps', $maya );
update_field( 'marker_x', 53, $maya );
update_field( 'marker_y', 58, $maya );

$icons = array(
	'engine'  => as_media( 'services/icons/engine.png' ),
	'car'     => as_media( 'services/icons/car.png' ),
	'fire'    => as_media( 'services/icons/fire.png' ),
	'gears'   => as_media( 'services/icons/gears.png' ),
	'gear'    => as_media( 'services/icons/gear.png' ),
	'warning' => as_media( 'services/icons/warning.png' ),
);

$tyres_id = (int) $GLOBALS['wpdb']->get_var( "SELECT ID FROM {$GLOBALS['wpdb']->posts} WHERE post_type='service' AND post_name='tyres-service' LIMIT 1" );
if ( ! $tyres_id ) {
	$tyres_id = wp_insert_post(
		array(
			'post_type'   => 'service',
			'post_status' => 'publish',
			'post_title'  => 'Шиномонтаж',
			'post_name'   => 'tyres-service',
		)
	);
	echo "CREATED tyres $tyres_id\n";
}

update_field( 'price', 'от 1 250 руб.', $tyres_id );
update_field( 'image', as_media( 'services/tyres.jpg' ), $tyres_id );
update_field( 'hero_image', as_media( 'services/modalbgtyres.jpg' ), $tyres_id );
update_field( 'description', 'Шины — единственный элемент автомобиля, который контактирует с дорогой. От их состояния зависит управляемость, торможение и безопасность. Неправильный монтаж, дисбаланс или износ могут привести к вибрациям, увеличенному тормозному пути и повреждению подвески', $tyres_id );
update_field( 'symptoms_title', 'Признаки, что нужен шиномонтаж:', $tyres_id );
update_field(
	'benefits',
	array(
		array( 'icon' => $icons['engine'], 'text' => 'Ровное и предсказуемое поведение автомобиля' ),
		array( 'icon' => $icons['car'], 'text' => 'Отсутствие вибраций на руле и кузове' ),
		array( 'icon' => $icons['fire'], 'text' => 'Правильный износ шин' ),
		array( 'icon' => $icons['gears'], 'text' => 'Снижение нагрузки на подвеску' ),
		array( 'icon' => $icons['gear'], 'text' => 'Безопасное торможение и устойчивость на дороге' ),
	),
	$tyres_id
);
update_field(
	'symptoms',
	array(
		array( 'icon' => $icons['warning'], 'text' => 'Вибрации на скорости' ),
		array( 'icon' => $icons['warning'], 'text' => 'Неравномерный износ протектора' ),
		array( 'icon' => $icons['warning'], 'text' => 'Увод автомобиля в сторону' ),
		array( 'icon' => $icons['warning'], 'text' => 'Потеря давления в колесе' ),
		array( 'icon' => $icons['warning'], 'text' => 'Посторонние звуки при движении' ),
	),
	$tyres_id
);
update_field( 'popular', array(), $tyres_id );
update_field(
	'price_list',
	array(
		array( 'title' => 'Шиномонтаж и балансировка колес 13-14 радиус', 'price' => 'от 3 150 руб.' ),
		array( 'title' => 'Шиномонтаж и балансировка колес 15-16 радиус', 'price' => 'от 4 200 руб.' ),
		array( 'title' => 'Ремонт (заплатка) и балансировка', 'price' => 'от 1 250 руб.' ),
		array( 'title' => 'Балансировка колес', 'price' => 'от 2 500 руб.' ),
	),
	$tyres_id
);
update_field(
	'trust',
	array(
		'image' => as_media( 'services/modal2gisbg.png' ),
		'title' => 'Почему клиенты доверяют нам',
		'text'  => 'Мы используем профессиональное оборудование, соблюдаем технологию монтажа, аккуратно работаем с дисками и выполняем точную балансировку.',
	),
	$tyres_id
);
update_field( 'branches', array( $maya ), $tyres_id );

$review_id = (int) $GLOBALS['wpdb']->get_var( "SELECT ID FROM {$GLOBALS['wpdb']->posts} WHERE post_type='review' AND post_status='publish' LIMIT 1" );
if ( ! $review_id ) {
	$review_id = wp_insert_post(
		array(
			'post_type'   => 'review',
			'post_status' => 'publish',
			'post_title'  => 'm0kik',
		)
	);
	echo "CREATED review $review_id\n";
}
update_field( 'author_name', 'm0kik', $review_id );
update_field( 'platform', 'yandex', $review_id );
update_field( 'rating', 4.9, $review_id );
update_field( 'avatar', as_media( 'reviews/avatar1.webp' ), $review_id );
update_field( 'text', 'Обратился с проблемами в электрике. Сделали полную диагностику, нашли неисправный датчик и проблемы с проводкой. Все исправили аккуратно, объяснили, что и как, дали гарантию. Электроника теперь работает отлично.', $review_id );
update_field( 'branch', $maya, $review_id );

$slides = array();
for ( $i = 1; $i <= 9; $i++ ) {
	$slides[] = as_media( "steps/slide{$i}.webp" );
}

$sections = array(
	array(
		'acf_fc_layout'    => 'hero',
		'title'            => "Ремонт автомобилей.\nПонятный процесс,\nнадёжный результат!",
		'background_video' => as_media( 'hero-video.mp4' ),
		'slides'           => array(
			array(
				'title' => "Диагностика,\nобслуживание\nи ремонт",
				'text'  => 'Когда всё - от диагностики до сложного ремонта - можно сделать в одном месте, жизнь становится проще. Мы работаем так, чтобы Вы могли спокойно заниматься своими делами. Просто привозите автомобиль — остальное мы берём на себя',
			),
			array(
				'title' => "Кузовной\nремонт\nи покраска",
				'text'  => 'Второй слайд с описанием услуги...',
			),
			array(
				'title' => "Шиномонтаж\nи развал-\nсхождение",
				'text'  => 'Третий слайд с описанием услуги...',
			),
		),
		'stats'            => array(
			array( 'value' => '900+', 'label' => 'Довольных клиентов' ),
			array( 'value' => '10', 'label' => 'Лет на рынке' ),
		),
		'cta'              => array( 'label' => 'Оставить заявку' ),
	),
	array(
		'acf_fc_layout' => 'about',
		'title'         => "Вы получаете качество\nс первого касания",
		'title_back'    => 'качество работы',
		'subtitle'      => "Качество начинается не с финального результата -\nего видно с первых минут. Когда работа начинается чётко\nи без суеты, Вы сразу понимаете, что процесс под контролем",
		'first'         => array(
			'image'   => as_media( 'about/about-card-bg1.webp' ),
			'eyebrow' => 'Возможность предоставления фото и видео материалов',
			'title'   => 'Прозрачная диагностика',
			'text'    => 'Вы видите реальную картину по автомобилю: прозрачная диагностика, фото и видеоотчеты и пояснения к ним.',
		),
		'second'        => array(
			'image' => as_media( 'about/about-card-bg2.webp' ),
			'title' => 'Согласование всех работ',
			'text'  => 'Все работы обсуждаются заранее. Каждый шаг только после вашего решения. Никаких сюрпризов.',
		),
		'third'         => array(
			'title'      => 'Надежность',
			'stat'       => 92,
			'stat_label' => 'положительных отзывов',
			'text'       => 'Вы понимаете, что вас не подведут, не затянут сроки, не «навесят» лишнее.',
		),
		'about_stats'   => array(
			array( 'image' => as_media( 'statistics/tools.png' ), 'value' => '10', 'text' => 'Лет обслуживаем и ремонтируем авто' ),
			array( 'image' => as_media( 'statistics/garage.png' ), 'value' => '5000+', 'text' => 'Автомобилей отремонтировано' ),
			array( 'image' => as_media( 'statistics/winner.png' ), 'value' => '92%', 'text' => 'Положительных отзывов' ),
			array( 'image' => as_media( 'statistics/worker.png' ), 'value' => '10', 'text' => 'Лет средний стаж мастеров' ),
		),
		'video_wrapper' => array(
			'video_btn_label' => 'Смотреть видео о нас',
			'videos_repeater' => array(
				array( 'label' => 'Видео о нас', 'file' => as_media( 'hero-video_long.mp4' ) ),
				array( 'label' => 'Видео 2', 'file' => as_media( 'hero-video_old.mp4' ) ),
			),
		),
	),
	array(
		'acf_fc_layout' => 'services',
		'title'         => "Вы получаете полный спектр\nуслуг по диагностике, ремонту \nи обслуживанию автомобиля",
		'title_back'    => 'наши услуги',
		'mark'          => 'Услуги',
		'service_list'  => array( $engine, $tyres_id ),
	),
	array(
		'acf_fc_layout' => 'steps',
		'title'         => 'Процесс работы от первого шага до результата',
		'mark'          => 'Этапы',
		'steps'         => array(
			array( 'title' => 'Диагностика и понимание задачи', 'text' => 'Мы изучаем автомобиль и фиксируем факты по его состоянию. Объясняем, что происходит и какие есть варианты решения.' ),
			array( 'title' => 'Обсуждение вариантов ремонта', 'text' => 'Мы предлагаем несколько подходов — по глубине работ, срокам и бюджету.' ),
			array( 'title' => 'Согласование плана', 'text' => 'Формируем понятный план действий. Если появляется новая информация — она обсуждается сразу.' ),
			array( 'title' => 'Выполнение работ', 'text' => 'Работы выполняет мастер, который закрепляется за Вашим автомобилем от начала до конца.' ),
			array( 'title' => 'Проверка и выдача', 'text' => 'Мы проверяем результат и передаём автомобиль с отчётом и рекомендациями.' ),
		),
		'images'        => $slides,
	),
	array(
		'acf_fc_layout'  => 'team',
		'mark'           => 'Команда',
		'title'          => 'Авторитет — это люди',
		'title_back'     => 'наша команда',
		'highlight_html' => 'Автосервис — это не стены и не оборудование, а, <span>прежде всего, люди</span>',
		'subtitle'       => 'Наши люди - это причина, по которой к нам с радостью хотят приехать снова.',
		'image'          => as_media( 'team/team1.webp' ),
	),
	array(
		'acf_fc_layout'  => 'specialOffer',
		'title'          => 'Отремонтируем сегодня —',
		'title_line_2'   => 'оплатите потом.',
		'subtitle'       => 'Чтобы рассчитать условия кредита уточняйте информацию у менеджера',
		'highlight_html' => 'Поломка <span> не должна менять</span> ваши планы',
		'highlight_mark' => 'Специальное предложение',
		'image'          => as_media( 'specialOffer/specialOffer.webp' ),
		'details_html'   => '<p>Не откладывайте заботу об автомобиле на потом! Наш Автосервис предоставляет удобную возможность воспользоваться услугами в кредит.</p>',
	),
	array(
		'acf_fc_layout' => 'reviews',
		'mark'          => 'Отзывы',
		'title'         => "Мы слышим Вас, поэтому\nкаждый отзыв важен",
		'title_back'    => 'отзывы',
		'summary'       => array(
			'count'       => 900,
			'count_label' => 'отзывов на 3-х площадках',
			'platforms'   => array(
				array( 'id' => 'google', 'logo' => as_media( 'reviews/google.webp' ) ),
				array( 'id' => 'yandex', 'logo' => as_media( 'reviews/yandex.webp' ) ),
				array( 'id' => '2gis', 'logo' => as_media( 'reviews/2gis.webp' ) ),
			),
		),
		'platforms'     => array(
			array(
				'id'    => 'yandex',
				'label' => 'Отзывы Яндекс',
				'links' => array(
					array( 'branchId' => $maya, 'url' => 'https://yandex.ru/maps/org/avtoritet_1_go_maya' ),
					array( 'branchId' => $dorozhnaya, 'url' => 'https://yandex.ru/maps/org/avtoritet_2_ya_dorozhnaya' ),
				),
			),
			array(
				'id'    => '2gis',
				'label' => 'Отзывы 2GIS',
				'links' => array(
					array( 'branchId' => $maya, 'url' => 'https://2gis.ru/krasnodar/firm/avtoritet_1_go_maya' ),
					array( 'branchId' => $dorozhnaya, 'url' => 'https://2gis.ru/krasnodar/firm/avtoritet_2_ya_dorozhnaya' ),
				),
			),
			array(
				'id'    => 'google',
				'label' => 'Отзывы Google',
				'links' => array(
					array( 'branchId' => $maya, 'url' => 'https://maps.google.com/?cid=avtoritet_1_go_maya' ),
					array( 'branchId' => $dorozhnaya, 'url' => 'https://maps.google.com/?cid=avtoritet_2_ya_dorozhnaya' ),
				),
			),
		),
		'cta'           => array( 'label' => 'Смотреть все' ),
	),
	array(
		'acf_fc_layout'    => 'commercial',
		'mark'             => 'Коммерческий транспорт',
		'title'            => "Обслуживание\nи ремонт коммерческого\nтранспорта",
		'subtitle'         => 'Наш Автосервис также выполняет профессиональный ремонт и обслуживание коммерческого транспорта.',
		'cta'              => array( 'label' => 'Подробнее' ),
		'details_html'     => '<p>Для Вашего автопарка доступен полный спектр услуг. Имеются только два ограничения: мы не обслуживаем крупнотоннажные грузовики и не принимаем автомобили выше 3 метров.</p>',
		'background_image' => as_media( 'commercial/commercial-bg.webp' ),
		'limitations'      => array(
			array( 'image' => as_media( 'commercial/truck.webp' ), 'text' => "Не обслуживаем\nкрупнотоннажные грузовики" ),
			array( 'image' => as_media( 'commercial/semi-truck.webp' ), 'text' => "Не обслуживаем автомобили\nвыше 3 метров" ),
		),
	),
	array(
		'acf_fc_layout' => 'faq',
		'mark'          => 'F&Q',
		'title'         => "Мы собрали список\nсамых частых вопросов",
		'cta'           => array( 'label' => 'Смотреть все' ),
		'items'         => array(
			array( 'question' => 'Предоставляем ли мы гарантию?', 'answer' => 'Да, мы предоставляем гарантию на работы 3 месяца или 10 000 км. пробега — в зависимости от того, что наступит раньше.' ),
			array( 'question' => 'Можно ли Клиентам посещать ремзону?', 'answer' => 'Да, вы можете присутствовать в ремонтной зоне в сопровождении мастера-приёмщика.' ),
			array( 'question' => 'Какой у нас режим работы и работаем ли мы в праздничные дни?', 'answer' => 'Работаем ежедневно с 09:00 до 20:00, включая праздничные дни.' ),
		),
	),
	array(
		'acf_fc_layout'    => 'contact_form',
		'title'            => "Не откладывайте ремонт — чем раньше Вы решите вопрос, \n тем дешевле он Вам обойдётся!",
		'background_image' => as_media( 'contactForm/contact-form-bg.webp' ),
	),
	array(
		'acf_fc_layout'   => 'contacts',
		'email'           => 'Avtoritet-servis23@yandex.ru',
		'map_image'       => as_media( 'contacts/map.webp' ),
		'map_image_dark'  => as_media( 'contacts/map-dark.webp' ),
		'map_image_modal' => as_media( 'contacts/map-modal.webp' ),
	),
	array(
		'acf_fc_layout' => 'feedback',
		'intro'         => "У Вас есть рекомендации по улучшению качества услуг? \nОстались нерешённые вопросы после обслуживания?",
		'title'         => "Будь то благодарность или конструктивная критика, \nпишите и мы свяжемся с вами",
		'manager'       => array(
			'title' => 'Менеджер по работе с клиентами – Мария',
			'photo' => as_media( 'feedback/maria.webp' ),
		),
		'tires'         => as_media( 'feedback/tires.webp' ),
	),
);

$ok = update_field( 'sections', $sections, $home );
echo $ok ? "HOME SECTIONS SAVED\n" : "HOME SECTIONS FAILED\n";
echo 'layouts=' . count( get_field( 'sections', $home ) ?: array() ) . "\n";
echo "tyres=$tyres_id review=$review_id\n";
echo "DONE SEED\n";
