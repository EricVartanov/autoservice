# Контракт контента: Next.js ↔ WP + ACF

Живой JS-канон: `src/content/`. Всё, что видит пользователь (заголовки, формы, кнопки, ошибки, SEO, aria-подписи), приходит из WP. Код знает только технические ключи.

Канон картинки: `{ url, alt }`. Хелпер `mediaUrl()` / `mediaAlt()` в `src/lib/media.js`.

Mapper `mapWpPage` / WPGraphQL — отдельный шаг. Он собирает именованные ACF-группы в уже существующий JS-shape (`form.fields[]`, `section.type`, …).

---

## Что в WP, что в коде

**В WP (Options / CPT)** — весь копирайт: seo, меню, лейблы UI, согласие, тексты ошибок и успеха, лейблы/плейсхолдеры форм, заголовки модалки услуги, секции главной, записи услуг/новостей/акций/филиалов/legal.

**В коде (не редактируется)** — ключи контракта:

- `fields[].name` и `type` как enum (`name`, `phone`, `carBrand`, `vin`, `partName`)
- `radio.value` (`today`, `week`, `month`, `other`; филиал = `branch.slug` **или `any`**)
- `section.type`, `LANDING_SECTIONS` (id / theme / className) в `src/lib/landingSections.js`
- логика валидации (`src/lib/formValidation.js`)

Не делать в ACF repeater полей со свободным текстовым `name` — редактор сломает `phone`. Формы — **именованные группы**. Mapper собирает `form.fields[]` для текущих компонентов.

---

## Options page `site`

Соответствует `src/content/site.js` → объект `site`.

### SEO

| ACF | JS |
|---|---|
| `seo_title` | `site.seo.title` |
| `seo_description` | `site.seo.description` |

### Header / footer

| ACF | JS |
|---|---|
| `logo` | `site.header.logo` |
| `menu` repeater (`label`, `link`) | `site.header.menu[]` |
| `socials` repeater (`name`, `url`, `logo`, `logo_dark`) | header + footer socials |
| `footer_logo` / `footer_logo_dark` | `site.footer.logo` / `logoDark` |
| `copyright` | `site.footer.copyright` |
| `legal` relationship на legal-страницы | `site.footer.legal[]` `{ label, slug }` |

Мессенджеры и филиалы здесь **не дублировать** — CPT `branch`.

### Labels (все UI-подписи)

`site.labels` — одна группа:

| key | пример |
|---|---|
| `branches` | Филиалы |
| `open_menu` / `close_menu` | Открыть / Закрыть меню |
| `back_to_top` | Наверх |
| `show_more` | Показать еще |
| `collapse` / `expand` | Свернуть / Развернуть |
| `more_details` | Подробнее |
| `legal_updated` | Дата последнего обновления |
| `theme_toggle` | Переключить тему |
| `prev_slide` / `next_slide` | слайдер |
| `news_pagination` / `prev_page` / `next_page` | пагинация новостей |
| `select_placeholder` | Выберите |
| `panorama_cta` | Смотреть панораму |
| `map_cta` | Открыть на Яндекс карте |
| `reviews_empty` | Пока нет отзывов по этому фильтру |
| `brand_other` | Другая |

FAQ: CTA «Смотреть все» = `cta.label` layout; свёртка списка = `labels.collapse` (не хардкод в компоненте).

### Call modal / consent / формы (общие)

| ACF | JS |
|---|---|
| `call_modal_title` | `site.callModal.title` |
| `consent` group (`label`, `link_text`, relationship legal, `required`) | `site.consent` `{ label, linkText, slug, required }` |
| `form_success_message` | `site.formSuccess.message` |
| `form_errors` group | `site.formErrors` (`nameRequired`, `nameShort`, `phone`, `carBrand`, `timing`, `branch`, `consent`) |

Consent и ошибки **один раз** в Options. Формы только ссылаются на них (в моках: `forms.*.consent` / `errors` / `successMessage`).

### `service_modal`

Обвязка модалки услуги — дефолты для всех записей CPT. Запись может переопределить `benefits_title` / `symptoms_title` (см. CPT `service`).

| ACF | JS |
|---|---|
| `mark` | `site.serviceModal.mark` |
| `benefits_title` | `benefitsTitle` (fallback, если у записи нет своего) |
| `symptoms_title` | `symptomsTitle` (fallback) |
| `popular_title` | `popularTitle` |
| `price_list_title` | `priceListTitle` |
| `price_list_subtitle` | `priceListSubTitle` |
| `card_cta` | кнопка на карточке услуги |
| `show_more` | прайс в модалке |
| связь с `forms.quick` | `forms.quick` |

`toServiceDetail()` мёржит Options + запись CPT. Поля записи имеют приоритет.

### Brands

Отдельная группа Options, канон `src/content/brands.js`. Не дублировать в layout `hero`.

| ACF | JS |
|---|---|
| repeater `brands` (`name`, `logo`, `logo_dark`) | `brands[]` `{ name, logo, logoDark }` |

Селект форм = имена марок + опция `labels.brand_other` («Другая»). Value «Другая» — фиксированный ключ на фронте (`brandSelectOptions()`), не свободный ввод в ACF.

### Forms (именованные группы)

`src/content/forms.js` → `forms.quick | commercial | contact | feedback`.

Каждая группа:

- поля с **фиксированными ключами**: `name_label`, `name_placeholder`, `name_required`, то же для `phone`, `car_brand` (options ← brands)
- `submit_label`
- **не** repeater со свободным `name`

Дополнительно:

| форма | поля |
|---|---|
| `contact` | `timing_label` + repeater **подписей** с фиксированными value (`today/week/month/other`); `branch_label` + option «не имеет значения» с **фиксированным** `value: any` (label из поля формы / Options, не свободный value); `extra_title`; `vin` как отдельный тип (`type: vin`, не `text`); `part_name_*` + repeater строк запчастей + флаг `allow_custom` |
| `feedback` | `branch_label`; `message_label`, `message_hint`, `message_placeholder` |
| `quick` / `commercial` | только name / phone / carBrand / submit |

Опции марок и филиалов — relationship / из CPT, не ручной дубль списка.

На фронте mapper собирает привычный `fields[]` / `radioGroups[]`. Компоненты уже едят этот shape.

---

## CPT `branch`

`src/content/branches.js`

| ACF | JS |
|---|---|
| WP title | `name` |
| slug | `dorozhnaya`, `maya` |
| `title`, `short_name`, `form_label` | |
| `work_hours`, `address`, `phone` | |
| `panorama_url`, `map_url`, `marker_x/y` | `panoramaUrl` открывается iframe-модалкой (`PanoramaModal`), не как обычный `href` |
| `messenger_url`, `messenger_logo` | |
| `footer_logo`, `footer_logo_dark` | |

Подписи кнопок панорамы / карты — `labels.panorama_cta` / `labels.map_cta`, не поля филиала.

Шапка / FAQ messengers и футер-ссылки собираются из филиалов. Радио форм — `slug` + `form_label`; в `contact` дополнительно option `any`.

---

## CPT `service`

Уникальный контент записи. Обвязка (дефолтные заголовки блоков, CTA) — Options `service_modal`.

| ACF | JS |
|---|---|
| title / slug | |
| `price` | |
| `image` | карточка |
| `hero_image` | фон модалки |
| `description` | |
| `benefits_title` / `symptoms_title` | опционально; иначе Options `service_modal` |
| `benefits` / `symptoms` repeater `{ icon, text }` | icon = select набора или Image |
| `trust` group (image, title, text) | |
| `popular` repeater (title, price, image) | **опционально**; пусто → блок скрыт (`popular?.length`) |
| `price_list` repeater (title, price) | |
| relationship `branches` | филиалы в модалке; пусто → все филиалы |

Секция главной: relationship на `service`, на фронте карточка `{ slug, title, price, image }`.

Фильтр филиалов в модалке — только relationship `branches`, **не** хардкод slug (`tyres-service` и т.п.).

---

## CPT `news` + taxonomy `news_category`

| WP / ACF | JS |
|---|---|
| title, slug, date | |
| taxonomy | `category` |
| `gallery` | `gallery[]` `{ url, alt }` |
| content WYSIWYG | на фронте `paragraphs[]`; mapper режет HTML |

### Страница «Новости» (page ACF)

`src/content/news.js` → `newsPage`:

| ACF | JS |
|---|---|
| `title` | H1 |
| `empty` | шаблон с `{year}` |
| `seo_title` / `seo_description` | |
| `page_size` | |

---

## CPT `offer`

| ACF | JS |
|---|---|
| title / slug | |
| `badge` | |
| `until` | Date ISO; UI → `dd.mm.yy` |
| `image` | |
| `disclaimer` | |
| `cta_label` | |

---

## Страницы `legal`

Pages (или CPT) со slug `privacy`, `personal-data`. Поля: title, `updated_at`, WYSIWYG. Футер — relationship.

---

## Главная: Options по секциям

Каждая секция — отдельная top-level options page в сайдбаре WP (CPT `service` и `review` вложены в пункты «Услуги» и «Отзывы»). GraphQL без изменений: `siteSettings.heroFields`, `aboutFields`, `servicesSectionFields`, … Порядок на фронте — `LANDING_SECTIONS`, не Flexible Content.

В группе — тексты блока. Списки сущностей — relationship / CPT, не вложенный дубль.

| GraphQL | Поля | Источник списков |
|---|---|---|
| `heroFields` | title, `backgroundVideo`, slides[], stats[], cta | brands — Options `brands` (не дубль в Hero) |
| `aboutFields` | title, titleBack, subtitle, 3 named groups карточек, aboutStats[], `videoWrapper` | `variant` не свободный ввод — три group |
| `servicesSectionFields` | title, titleBack, mark | relationship `service`; форма `formQuickFields`; обвязка модалки `serviceModalFields` |
| `stepsFields` | title, mark, steps[] (title, text), images[] | номер шага считает фронт |
| `teamFields` | mark, title, titleBack, highlightHtml, subtitle, image | |
| `specialOfferFields` | **две строки title** (`title` + `titleLine2`; mapper → `title[0]` / `title[1]`), subtitle, highlightHtml, highlightMark, image, **cta.label**, `detailsHtml` | |
| `reviewsSectionFields` | mark, title, titleBack, summary (`count`, `countLabel`, `platforms[]` `{ id, logo }`), platforms[] (`id`, `label`, `links[]` `{ branchId, url }`), cta.label | items — CPT `review` |
| `commercialFields` | mark, title, subtitle, cta.label, `detailsHtml`, `backgroundImage`, `limitations[]` `{ image, text }` | `formCommercialFields` |
| `faqFields` | mark, title, cta, items[] `{ question, answer }` | messengers ← `branch`; `id` считает фронт; свёртка = `labels.collapse` |
| `contactFormSectionFields` | title, `backgroundImage` | `formContactFields` |
| `contactsFields` | email, `mapImage`, `mapImageDark`, `mapImageModal` | все `branch` (в модалке услуги — только relationship записи) |
| `feedbackSectionFields` | intro, title, manager, tires | `formFeedbackFields` |

### `about` — карточки и видео

Три фиксированных group (`variant` не ввод редактора):

| group | поля |
|---|---|
| first | `image`, `eyebrow`, `title`, `text` |
| second | `image`, `title`, `text`; `eyebrow` опционален |
| third | `stat`, `stat_label`, `title`, `text` — без картинки |

Видео (модалка `AboutVideoModal`):

| ACF | JS |
|---|---|
| `video_btn_label` | `videoWrapper.textBtn` |
| repeater `videos` (`label`, `url` / File) | `videoWrapper.videos[]` |

### `contacts` — карты

| ACF | JS |
|---|---|
| `map_image` | `mapImage` (светлая) |
| `map_image_dark` | `mapImageDark` |
| `map_image_modal` | `mapImageModal` (секция embedded в модалке услуги) |

`LANDING_SECTIONS` (id, theme, className) — только фронт (`src/lib/landingSections.js`).

---

## Отзывы

Shape CPT: `{ id, branchId, platform, author, avatar, rating, text }`.

1. CPT `review` + relationship на филиал + select площадки; summary в секции Отзывы (`count`, `countLabel`, логотипы площадок).
2. Внешние виджеты — в ACF только summary и ссылки. У площадки: repeater `links` `{ branchId, url }` (relationship филиала + URL Яндекс / 2GIS / Google). CTA «Смотреть все» ведёт на URL выбранной пары площадка+филиал. Пустой фильтр — `labels.reviews_empty`.

Не смешивать в одном repeater.

---

## Что не класть в ACF

- свободный `fields[].name` (конструктор форм)
- `LANDING_SECTIONS` (id / theme / className)
- номера шагов (`01`)
- `variant` about как произвольный текст (три фиксированных group)
- дубли title/price/image услуги в секции главной
- дубли филиалов в header / footer / FAQ / формах
- дубли consent / form_errors на каждой форме — только Options
- дубли списка брендов в Hero — только Options `brands`
- хардкод slug услуги для фильтра филиалов — только relationship `branches`

---

## Mapper

`mapWpPayload` читает `siteSettings.<section>Fields` и собирает `sections[]` в JS-shape. Компоненты не знают ACF. Картинки → `{ url, alt }` до UI.
