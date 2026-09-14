<?php
/**
 * Form leads: REST endpoint, email + Max notifications.
 *
 * Copy to wp-content/mu-plugins/autoservice-leads.php
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'acf/init', 'autoservice_leads_register_fields' );
add_action( 'rest_api_init', 'autoservice_leads_register_routes' );
add_filter( 'rest_pre_serve_request', 'autoservice_leads_rest_cors', 15, 4 );
add_filter( 'rest_authentication_errors', 'autoservice_leads_allow_public', 20 );

function autoservice_leads_register_fields() {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_local_field_group(
		array(
			'key'                   => 'group_as_opt_notifications',
			'title'                 => 'Уведомления о заявках',
			'fields'                => array(
				array(
					'key'             => 'field_as_notify_intro',
					'label'           => '',
					'name'            => '',
					'type'            => 'message',
					'message'         => 'Заявки с сайта уходят на почту и/или в Max. Пока оба канала пустые, формы вернут ошибку отправки. Для Max: создайте бота, добавьте его в группу (или напишите ему в личку) и вставьте токен и ID.',
					'new_lines'       => 'wpautop',
					'esc_html'        => 0,
					'show_in_graphql' => 0,
				),
				array(
					'key'             => 'field_as_notify_email',
					'label'           => 'Email для заявок',
					'name'            => 'notify_email',
					'type'            => 'email',
					'instructions'    => 'На этот адрес уходит письмо с данными формы.',
					'show_in_graphql' => 0,
				),
				array(
					'key'             => 'field_as_max_bot_token',
					'label'           => 'Токен бота Max',
					'name'            => 'max_bot_token',
					'type'            => 'password',
					'instructions'    => 'Токен из настроек чат-бота на platform-api2.max.ru.',
					'show_in_graphql' => 0,
				),
				array(
					'key'             => 'field_as_max_chat_id',
					'label'           => 'Max chat_id (группа)',
					'name'            => 'max_chat_id',
					'type'            => 'text',
					'instructions'    => 'ID группового чата, куда добавлен бот. Приоритетнее личного чата.',
					'show_in_graphql' => 0,
				),
				array(
					'key'             => 'field_as_max_user_id',
					'label'           => 'Max user_id (личный чат)',
					'name'            => 'max_user_id',
					'type'            => 'text',
					'instructions'    => 'Если группа не нужна — ID человека, который написал боту /start.',
					'show_in_graphql' => 0,
				),
				array(
					'key'             => 'field_as_smartcaptcha_secret',
					'label'           => 'Секрет SmartCaptcha',
					'name'            => 'smartcaptcha_secret',
					'type'            => 'password',
					'instructions'    => 'Серверный ключ Яндекс SmartCaptcha. Пока пустой — капча не проверяется. Клиентский ключ задаётся во фронте (NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_SITEKEY).',
					'show_in_graphql' => 0,
				),
				array(
					'key'           => 'field_as_cors_origins',
					'label'         => 'CORS origins фронта',
					'name'          => 'cors_origins',
					'type'          => 'textarea',
					'instructions'  => 'По одному origin на строку. Нужны, чтобы браузер мог слать заявки на WP.',
					'default_value' => "http://localhost:3000\nhttp://127.0.0.1:3000",
					'rows'          => 4,
					'new_lines'     => '',
					'show_in_graphql' => 0,
				),
			),
			'location'              => array(
				array(
					array(
						'param'    => 'options_page',
						'operator' => '==',
						'value'    => 'site-notifications',
					),
				),
			),
			'position'              => 'normal',
			'style'                 => 'default',
			'label_placement'       => 'top',
			'instruction_placement' => 'label',
			'active'                => true,
			'show_in_graphql'       => 0,
		)
	);
}

function autoservice_leads_allow_public( $result ) {
	if ( ! is_wp_error( $result ) ) {
		return $result;
	}

	if ( 'rest_cookie_invalid_nonce' !== $result->get_error_code() ) {
		return $result;
	}

	$route = isset( $GLOBALS['wp']->query_vars['rest_route'] ) ? $GLOBALS['wp']->query_vars['rest_route'] : '';
	if ( 0 === strpos( $route, '/autoservice/v1/lead' ) ) {
		return true;
	}

	return $result;
}

function autoservice_leads_register_routes() {
	register_rest_route(
		'autoservice/v1',
		'/lead',
		array(
			array(
				'methods'             => 'POST',
				'callback'            => 'autoservice_leads_handle',
				'permission_callback' => '__return_true',
			),
			array(
				'methods'             => 'OPTIONS',
				'callback'            => 'autoservice_leads_options',
				'permission_callback' => '__return_true',
			),
		)
	);
}

function autoservice_leads_options() {
	return new WP_REST_Response( null, 204 );
}

function autoservice_leads_option( $name ) {
	if ( function_exists( 'get_field' ) ) {
		$value = get_field( $name, 'option' );
		if ( null !== $value && false !== $value && '' !== $value ) {
			return $value;
		}
	}

	return get_option( 'options_' . $name, '' );
}

function autoservice_leads_allowed_origins() {
	$raw   = autoservice_leads_option( 'cors_origins' );
	$lines = preg_split( '/\r\n|\r|\n/', (string) $raw );
	$origins = array();

	foreach ( $lines as $line ) {
		$line = untrailingslashit( trim( $line ) );
		if ( $line ) {
			$origins[] = $line;
		}
	}

	if ( ! $origins ) {
		$origins = array( 'http://localhost:3000', 'http://127.0.0.1:3000' );
	}

	return $origins;
}

function autoservice_leads_apply_cors() {
	$origin  = isset( $_SERVER['HTTP_ORIGIN'] ) ? esc_url_raw( wp_unslash( $_SERVER['HTTP_ORIGIN'] ) ) : '';
	$origin  = untrailingslashit( $origin );
	$allowed = autoservice_leads_allowed_origins();

	if ( $origin && in_array( $origin, $allowed, true ) ) {
		header( 'Access-Control-Allow-Origin: ' . $origin );
		header( 'Access-Control-Allow-Methods: POST, OPTIONS' );
		header( 'Access-Control-Allow-Headers: Content-Type' );
		header( 'Access-Control-Max-Age: 86400' );
		header( 'Vary: Origin' );
	}
}

function autoservice_leads_rest_cors( $served, $result, $request, $server ) {
	unset( $result, $server );

	$route = $request->get_route();
	if ( 0 !== strpos( $route, '/autoservice/v1/' ) ) {
		return $served;
	}

	autoservice_leads_apply_cors();

	if ( 'OPTIONS' === $request->get_method() ) {
		status_header( 204 );
		return true;
	}

	return $served;
}

function autoservice_leads_text( $value ) {
	return sanitize_text_field( is_scalar( $value ) ? (string) $value : '' );
}

function autoservice_leads_handle( WP_REST_Request $request ) {
	$params = $request->get_json_params();
	if ( ! is_array( $params ) ) {
		$params = $request->get_params();
	}

	if ( '' !== autoservice_leads_text( $params['website'] ?? '' ) ) {
		return new WP_REST_Response( array( 'ok' => true ), 200 );
	}

	$allowed_types = array( 'contact', 'quick', 'commercial', 'feedback' );
	$type          = sanitize_key( $params['type'] ?? '' );
	$name          = autoservice_leads_text( $params['name'] ?? '' );
	$phone_digits  = preg_replace( '/\D+/', '', (string) ( $params['phone'] ?? '' ) );

	if ( ! in_array( $type, $allowed_types, true ) ) {
		return new WP_Error( 'invalid_type', 'Некорректный тип формы.', array( 'status' => 400 ) );
	}

	if ( mb_strlen( $name ) < 2 ) {
		return new WP_Error( 'invalid_name', 'Укажите имя.', array( 'status' => 400 ) );
	}

	if ( ! preg_match( '/^7\d{10}$/', $phone_digits ) ) {
		return new WP_Error( 'invalid_phone', 'Укажите телефон.', array( 'status' => 400 ) );
	}

	$captcha = autoservice_leads_verify_captcha( $params['captchaToken'] ?? '', $request );
	if ( is_wp_error( $captcha ) ) {
		return $captcha;
	}

	$extra = array();
	if ( isset( $params['extra'] ) && is_array( $params['extra'] ) ) {
		foreach ( array( 'vin', 'partName' ) as $key ) {
			if ( isset( $params['extra'][ $key ] ) && '' !== autoservice_leads_text( $params['extra'][ $key ] ) ) {
				$extra[ $key ] = autoservice_leads_text( $params['extra'][ $key ] );
			}
		}
	}

	$lead = array(
		'type'     => $type,
		'name'     => $name,
		'phone'    => $phone_digits,
		'carBrand' => autoservice_leads_text( $params['carBrand'] ?? '' ),
		'timing'   => autoservice_leads_text( $params['timing'] ?? '' ),
		'branch'   => autoservice_leads_text( $params['branch'] ?? '' ),
		'message'  => sanitize_textarea_field( (string) ( $params['message'] ?? '' ) ),
		'service'  => autoservice_leads_text( $params['service'] ?? '' ),
		'extra'    => $extra,
	);

	$email_to   = sanitize_email( (string) autoservice_leads_option( 'notify_email' ) );
	$max_token  = trim( (string) autoservice_leads_option( 'max_bot_token' ) );
	$max_chat   = trim( (string) autoservice_leads_option( 'max_chat_id' ) );
	$max_user   = trim( (string) autoservice_leads_option( 'max_user_id' ) );

	$mail_enabled = (bool) is_email( $email_to );
	$max_enabled  = ( '' !== $max_token && ( '' !== $max_chat || '' !== $max_user ) );

	if ( ! $mail_enabled && ! $max_enabled ) {
		return new WP_Error(
			'not_configured',
			'Каналы уведомлений не настроены.',
			array( 'status' => 503 )
		);
	}

	$body    = autoservice_leads_format_message( $lead );
	$sent    = false;
	$errors  = array();

	if ( $mail_enabled ) {
		$subject = 'Новая заявка с сайта — ' . autoservice_leads_type_label( $type );
		$headers = array( 'Content-Type: text/plain; charset=UTF-8' );
		if ( wp_mail( $email_to, $subject, $body, $headers ) ) {
			$sent = true;
		} else {
			$errors[] = 'email';
		}
	}

	if ( $max_enabled ) {
		$max_result = autoservice_leads_send_max( $max_token, $max_chat, $max_user, $body );
		if ( is_wp_error( $max_result ) ) {
			$errors[] = 'max';
		} else {
			$sent = true;
		}
	}

	if ( $sent ) {
		return new WP_REST_Response( array( 'ok' => true ), 200 );
	}

	return new WP_Error(
		'delivery_failed',
		'Не удалось отправить заявку.',
		array(
			'status'   => 502,
			'channels' => $errors,
		)
	);
}

function autoservice_leads_client_ip( WP_REST_Request $request ) {
	$forwarded = $request->get_header( 'x_forwarded_for' );
	if ( $forwarded ) {
		$parts = explode( ',', $forwarded );
		$ip    = trim( $parts[0] );
		if ( filter_var( $ip, FILTER_VALIDATE_IP ) ) {
			return $ip;
		}
	}

	$remote = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
	return filter_var( $remote, FILTER_VALIDATE_IP ) ? $remote : '';
}

function autoservice_leads_verify_captcha( $token, WP_REST_Request $request ) {
	$secret = trim( (string) autoservice_leads_option( 'smartcaptcha_secret' ) );
	if ( '' === $secret ) {
		return true;
	}

	$token = trim( (string) $token );
	if ( '' === $token ) {
		return new WP_Error( 'captcha_failed', 'Капча не пройдена.', array( 'status' => 403 ) );
	}

	$body = array(
		'secret' => $secret,
		'token'  => $token,
	);
	$ip = autoservice_leads_client_ip( $request );
	if ( $ip ) {
		$body['ip'] = $ip;
	}

	$response = wp_remote_post(
		'https://smartcaptcha.cloud.yandex.ru/validate',
		array(
			'timeout' => 10,
			'body'    => $body,
		)
	);

	if ( is_wp_error( $response ) ) {
		return new WP_Error( 'captcha_failed', 'Капча не пройдена.', array( 'status' => 403 ) );
	}

	$data = json_decode( wp_remote_retrieve_body( $response ), true );
	if ( ! is_array( $data ) || 'ok' !== ( $data['status'] ?? '' ) ) {
		return new WP_Error( 'captcha_failed', 'Капча не пройдена.', array( 'status' => 403 ) );
	}

	return true;
}

function autoservice_leads_type_label( $type ) {
	$labels = array(
		'contact'    => 'Форма обратной связи',
		'quick'      => 'Быстрая заявка',
		'commercial' => 'Коммерческое предложение',
		'feedback'   => 'Фидбек',
	);

	return isset( $labels[ $type ] ) ? $labels[ $type ] : $type;
}

function autoservice_leads_format_message( $lead ) {
	$lines   = array();
	$lines[] = 'Новая заявка: ' . autoservice_leads_type_label( $lead['type'] );
	$lines[] = '';
	$lines[] = 'Имя: ' . $lead['name'];
	$lines[] = 'Телефон: +' . $lead['phone'];

	if ( $lead['service'] ) {
		$lines[] = 'Услуга: ' . $lead['service'];
	}
	if ( $lead['carBrand'] ) {
		$lines[] = 'Марка: ' . $lead['carBrand'];
	}
	if ( $lead['timing'] ) {
		$lines[] = 'Срок: ' . $lead['timing'];
	}
	if ( $lead['branch'] ) {
		$lines[] = 'Филиал: ' . $lead['branch'];
	}
	if ( ! empty( $lead['extra']['vin'] ) ) {
		$lines[] = 'VIN: ' . $lead['extra']['vin'];
	}
	if ( ! empty( $lead['extra']['partName'] ) ) {
		$lines[] = 'Запчасть: ' . $lead['extra']['partName'];
	}
	if ( $lead['message'] ) {
		$lines[] = 'Сообщение: ' . $lead['message'];
	}

	return implode( "\n", $lines );
}

function autoservice_leads_send_max( $token, $chat_id, $user_id, $text ) {
	$query = array();
	if ( '' !== $chat_id ) {
		$query['chat_id'] = $chat_id;
	} else {
		$query['user_id'] = $user_id;
	}

	$url = add_query_arg( $query, 'https://platform-api2.max.ru/messages' );

	$response = wp_remote_post(
		$url,
		array(
			'timeout' => 15,
			'headers' => array(
				'Authorization' => $token,
				'Content-Type'  => 'application/json',
			),
			'body'    => wp_json_encode( array( 'text' => $text ) ),
		)
	);

	if ( is_wp_error( $response ) ) {
		return $response;
	}

	$code = (int) wp_remote_retrieve_response_code( $response );
	if ( $code < 200 || $code >= 300 ) {
		return new WP_Error( 'max_http', 'Max API error ' . $code );
	}

	return true;
}
