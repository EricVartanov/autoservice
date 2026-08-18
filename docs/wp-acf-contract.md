# Контракт контента: Next.js ↔ WP + ACF

Живой JS-канон лежит в `src/content/`. Этот документ — спецификация полей WordPress 1:1 к нему. Подключение WPGraphQL/REST и mapper `mapWpPage` — отдельный шаг.

Канон картинки на фронте: `{ url, alt }`. ACF Image отдаёт объект media; mapper кладёт `url` + `alt`. Хелпер `mediaUrl()` / `mediaAlt()` в `src/lib/media.js` принимает и legacy `{ path }`, `{ src }`, и строку.

---

## Options page `site`

Группа полей сайта (ACF Options). Соответствует `src/content/site.js`.

| ACF field | Type | JS |
|---|---|---|
| `logo` | Image | `mockHeader.logo` |
| `logo_dark` | Image | не в хедере; футер: `mockFooter.logoDark` |
| `footer_logo` | Image | `mockFooter.logo` |
| `copyright` | Text | `mockFooter.copyright` |
| `menu` | Repeater | `mockHeader.menu[]` |
| `menu.label` | Text | |
| `menu.link` | URL / Text | `/#about`, `/news` |
| `socials` | Repeater | `mockHeader.socials[]` / `mockFooter.socials[]` |
| `socials.name` | Text | `vk` |
| `socials.url` | URL | |
| `socials.logo` | Image | светлая / цветная |
| `socials.logo_dark` | Image | для футера |
| `legal` | Repeater (relationship на legal-страницы) | `mockFooter.legal[]` `{ label, slug }` |

Мессенджеры и филиалы в Options **не дублировать** — они живут в CPT `branch`.

---

## CPT `branch`

Соответствует `src/content/branches.js` → `mockBranches`.

| ACF field | Type | JS |
|---|---|---|
| (WP title) | | `name` («Филиал 1») |
| `slug` | native | `dorozhnaya`, `maya` |
| `title` | Text | улица: «2-я Дорожная» |
| `short_name` | Text | `ф-л 2-я Дорожная` |
| `form_label` | Text | подпись в радио форм |
| `work_hours` | Text | |
| `address` | Textarea | допускает `\n` |
| `phone` | Text | |
| `panorama_url` | URL | |
| `map_url` | URL | |
| `marker_x` / `marker_y` | Number | пины на карте |
| `messenger_url` | URL | Max / мессенджер филиала |
| `messenger_logo` | Image | |
| `footer_logo` | Image | |
| `footer_logo_dark` | Image | |

Фронт собирает messengers шапки/FAQ из `branch.messenger`. Формы берут `slug` + `formLabel`.

---

## CPT `service`

Одна запись = карточка на главной **и** деталка модалки. `src/content/services.js`.

| ACF field | Type | JS |
|---|---|---|
| title / slug | native | `title`, `slug` |
| `price` | Text | «от 1100 руб.» |
| `image` | Image | карточка секции |
| `hero_image` | Image | фон модалки |
| `description` | Textarea | |
| `benefits` | Repeater | `{ icon, text }` |
| `benefits.icon` | Select (набор иконок) или Image | |
| `benefits.text` | Text | |
| `symptoms` | Repeater | как benefits |
| `trust` | Group | |
| `trust.image` | Image | |
| `trust.title` | Text | |
| `trust.text` | Textarea | |
| `popular` | Repeater | `{ title, price, image }` |
| `price_list` | Repeater | `{ title, price }` |

Секция главной `services.services` — relationship на этот CPT, на фронте режется до `{ slug, title, price, image }`.

Тексты обвязки модалки (`mark`, `benefitsTitle`, `quickForm`) — константы фронта, не поля ACF.

---

## CPT `news` + taxonomy `news_category`

`src/content/news.js`.

| WP / ACF | JS |
|---|---|
| title, slug, date | `title`, `slug`, `date` (ISO) |
| taxonomy `news_category` | `category` (строка в моках) |
| `gallery` | Image gallery → `gallery[]` `{ url, alt }` |
| content (WYSIWYG / Gutenberg) | на фронте пока `paragraphs[]`; mapper позже режет HTML на абзацы |

---

## CPT `offer`

`src/content/offers.js`.

| ACF field | Type | JS |
|---|---|---|
| title / slug | native | |
| `badge` | Text | «Акция» |
| `until` | Date | ISO `YYYY-MM-DD`; UI форматирует в `dd.mm.yy` |
| `image` | Image | |
| `disclaimer` | Textarea | |
| `cta_label` | Text | |

---

## Страницы `legal`

Не CPT, обычные Pages (или CPT `legal` с 2 записями).

| slug | JS |
|---|---|
| `privacy` | Политика конфиденциальности |
| `personal-data` | Согласие на обработку перс. данных |

Поля: `title`, `updated_at` (Date), `html` (WYSIWYG). Футер ссылается relationship / slug.

---

## Главная: Flexible Content `sections`

Layouts 1:1 к `section.type` в `src/app/page.js` / `src/content/home.js`.

В layout — только тексты блока, CTA, декора. Списки сущностей — relationship, не вложенный дубль.

| layout (`type`) | Поля layout | Relationship / источник |
|---|---|---|
| `hero` | `title`, `background_video`, `slides[]` (title, text), `stats[]`, `cta` | `brands` → Options repeater или taxonomy; сейчас `src/content/brands.js` |
| `about` | `title`, `title_back`, `subtitle`, 3 named groups карточек, `stats[]` | карточки не CPT; `variant` не свободный ввод — три group: first / second / third |
| `services` | `title`, `title_back`, `mark` | relationship `service` |
| `steps` | `title`, `mark`, `steps[]` (title, text), `images[]` | `number` (`01`) считает фронт из индекса, в ACF не хранить |
| `team` | `mark`, `title`, `title_back`, `highlight_html`, `subtitle`, `image` | |
| `specialOffer` | `title` (2 строки или textarea), `subtitle`, `highlight_html`, `highlight_mark`, `image` | |
| `reviews` | `mark`, `title`, `title_back`, `summary`, `platforms[]` (фильтр), `cta` | `items` — CPT `review` **или** внешние виджеты (см. ниже) |
| `commercial` | `mark`, `title`, `subtitle`, `cta`, `background_image`, `limitations[]` | опции марки авто — из brands |
| `faq` | `mark`, `title`, `cta`, `items[]` (question, answer) | messengers ← CPT `branch` |
| `contact_form` | `title`, `background_image`, копирайт согласия | схема полей формы **не** в ACF; `branch` options ← CPT `branch`; `carBrand` options ← brands |
| `contacts` | `email`, `map_image` | `branches` ← все записи CPT `branch` |
| `feedback` | `intro`, `title`, `manager` (title, photo), `tires` | то же про форму |

`LANDING_SECTIONS` (id, theme, className) в `src/app/page.js` — только фронт, в CMS не класть.

---

## Формы

Схема (`name`, `type`, `required`, структура radio/extra) остаётся в `src/content/forms.js`.

Из CMS допустимо:

- подписи, плейсхолдеры, `submit_label`, текст согласия (`label`, `link_text`, slug legal);
- опции селектов, которые являются сущностями: марки (`brands`), филиалы (`branch.slug` + `form_label`), список запчастей (опциональный repeater Options).

Не класть в ACF repeater «поле формы» с произвольным `name` — редактор сломает `phone` / `carBrand`.

---

## Отзывы: два пути

В моках `reviews.items[]` — shape CPT:

```
{ id, branchId, platform, author, avatar, rating, text }
```

`branchId` → CPT `branch`. `platform` ∈ `yandex` | `2gis` | `google`.

На проде выбрать одно:

1. **CPT `review`** — ручная модерация, поля как в моках, relationship на филиал, select площадки. Summary (счётчик, логотипы) остаётся в layout секции.
2. **Внешние виджеты** Яндекс / 2ГИС / Google — в ACF только `summary` и ссылки на виджеты; `items` с фронта не рендерить из WP.

Не смешивать ручной ввод и API в одном repeater на главной.

---

## Что не класть в ACF

- Схема полей форм (`fields[].name/type/required`)
- `LANDING_SECTIONS` (id, theme, className)
- Номера шагов (`01` … `05`) — индекс repeater
- Свободный `variant` about-карточек (только три фиксированных group)
- Дубли title/price/image услуги в секции главной
- Дубли филиалов в header / footer / FAQ / формах
- HTML-обёртки ради акцента, если позже вынесут `highlight_html` в два поля — сейчас поле WYSIWYG/Text с `<span>` допустимо как в моках

---

## Mapper (следующий шаг, не в этом репозитории)

`mapWpPage(acf) → { sections: [...] }` приводит ответ WP к текущему JS-shape секций. Компоненты не должны знать про `acf.flexible_content[].acf_fc_layout`. Картинки нормализовать в `{ url, alt }` до компонентов.
