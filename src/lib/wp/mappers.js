import {img, mediaUrl} from '@/lib/media';
import {SECTION_MAP_TYPES} from '@/lib/landingSections';

function scalar(value) {
    if (Array.isArray(value)) return value[0] ?? '';
    if (value == null) return '';
    return value;
}

function num(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
}

export function mapMedia(value) {
    if (!value) return null;
    if (typeof value === 'string') return img(value);
    const node = value.node ?? value;
    const url = node.sourceUrl || node.mediaItemUrl || node.guid || mediaUrl(value);
    if (!url) return null;
    return img(url, node.altText || value.alt || '');
}

function mediaString(value) {
    const media = mapMedia(value);
    return media ? mediaUrl(media) : '';
}

function nodeSlug(node) {
    return node?.slug || '';
}

function nodeId(node) {
    return node?.databaseId ?? node?.id ?? null;
}

function firstNode(connection) {
    const nodes = connection?.nodes;
    return Array.isArray(nodes) && nodes.length ? nodes[0] : null;
}

function unwrapWysiwyg(html) {
    return String(html || '')
        .replace(/^\s*<p[^>]*>/i, '')
        .replace(/<\/p>\s*$/i, '')
        .trim();
}

function htmlToParagraphs(html) {
    if (!html) return [];
    const withBreaks = String(html)
        .replace(/<\/p>/gi, '\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/h[1-6]>/gi, '\n');
    const text = withBreaks.replace(/<[^>]+>/g, ' ');
    return text
        .split(/\n+/)
        .map((part) => part.replace(/\s+/g, ' ').trim())
        .filter(Boolean);
}

function isoDate(value) {
    if (!value) return '';
    const raw = String(value);
    if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10);
    if (/^\d{8}$/.test(raw)) {
        return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
    }
    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) return raw;
    return parsed.toISOString().slice(0, 10);
}

function toMessenger(branch) {
    return {
        name: branch.shortName,
        url: branch.messenger?.url || '',
        logo: branch.messenger?.logo,
        alt: branch.messenger?.alt || branch.shortName,
    };
}

function branchFormOptions(branches, {includeAny = false, anyLabel = 'Не имеет значения'} = {}) {
    const options = branches.map((branch) => ({
        value: branch.slug,
        label: branch.formLabel || branch.title || branch.name,
    }));
    if (includeAny) {
        options.push({value: 'any', label: anyLabel || 'Не имеет значения'});
    }
    return options;
}

function brandSelectOptions(brands, otherLabel = 'Другая') {
    const names = (brands || []).map((brand) => brand.name).filter(Boolean);
    return otherLabel ? [...names, otherLabel] : names;
}

const TIMING_CODES = new Set(['today', 'week', 'month', 'other']);
const TIMING_BY_LABEL = {
    сегодня: 'today',
    'в ближайшую неделю': 'week',
    'в ближайший месяц': 'month',
    другое: 'other',
};
const DEFAULT_TIMING_OPTIONS = [
    {value: 'today', label: 'Сегодня'},
    {value: 'week', label: 'В ближайшую неделю'},
    {value: 'month', label: 'В ближайший месяц'},
    {value: 'other', label: 'Другое'},
];

function mapTimingOptions(rows) {
    const seen = new Set();
    const options = [];
    for (const row of rows || []) {
        const label = String(row?.label || '').trim();
        const raw = String(scalar(row?.value) || '').trim();
        const code = TIMING_CODES.has(raw)
            ? raw
            : TIMING_BY_LABEL[raw.toLowerCase()] || TIMING_BY_LABEL[label.toLowerCase()];
        if (!code || seen.has(code)) continue;
        seen.add(code);
        const fallback = DEFAULT_TIMING_OPTIONS.find((opt) => opt.value === code);
        options.push({
            value: code,
            label: label || fallback?.label || code,
        });
    }
    return options.length ? options : DEFAULT_TIMING_OPTIONS;
}

function withShared(form, site) {
    return {
        ...form,
        consent: site.consent,
        errors: site.formErrors,
        successMessage: site.formSuccess.message,
    };
}

function namePhoneCarFields(group, brands, otherLabel) {
    const fields = [
        {
            name: 'name',
            label: group?.nameLabel || '',
            type: 'text',
            placeholder: group?.namePlaceholder || '',
            required: Boolean(group?.nameRequired),
        },
        {
            name: 'phone',
            label: group?.phoneLabel || '',
            type: 'tel',
            placeholder: group?.phonePlaceholder || '',
            required: Boolean(group?.phoneRequired),
        },
    ];
    if (group?.carBrandLabel || group?.carBrandPlaceholder) {
        fields.push({
            name: 'carBrand',
            label: group.carBrandLabel || '',
            type: 'select',
            placeholder: group.carBrandPlaceholder || '',
            required: Boolean(group.carBrandRequired),
            options: brandSelectOptions(brands, otherLabel),
        });
    }
    return fields;
}

export function mapBranch(node) {
    const f = node.branchFields || {};
    const logo = mapMedia(f.messengerLogo);
    return {
        id: node.databaseId,
        slug: node.slug,
        name: f.name || node.title || '',
        title: f.title || '',
        shortName: f.shortName || '',
        formLabel: f.formLabel || '',
        workHours: f.workHours || '',
        address: f.address || '',
        phone: f.phone || '',
        panoramaUrl: f.panoramaUrl || '',
        mapUrl: f.mapUrl || '',
        marker: {x: num(f.markerX), y: num(f.markerY)},
        messenger: {
            url: f.messengerUrl || '',
            logo,
            alt: logo?.alt || 'Max',
        },
        footerLogo: mapMedia(f.footerLogo),
        footerLogoDark: mapMedia(f.footerLogoDark),
    };
}

function mapIconText(rows) {
    return (rows || []).map((row) => ({
        icon: mapMedia(row.icon),
        text: row.text || '',
    }));
}

export function mapServiceRecord(node) {
    const f = node.serviceFields || {};
    const branchSlugs = (f.branches?.nodes || []).map(nodeSlug).filter(Boolean);
    return {
        slug: node.slug,
        title: node.title || '',
        price: f.price || '',
        image: mapMedia(f.image),
        heroImage: mapMedia(f.heroImage),
        description: f.description || '',
        benefitsTitle: f.benefitsTitle || '',
        symptomsTitle: f.symptomsTitle || '',
        benefits: mapIconText(f.benefits),
        symptoms: mapIconText(f.symptoms),
        popular: (f.popular || []).map((row) => ({
            title: row.title || '',
            price: row.price || '',
            image: mapMedia(row.image),
        })),
        priceList: (f.priceList || []).map((row) => ({
            title: row.title || '',
            price: row.price || '',
        })),
        trust: f.trust
            ? {
                image: mapMedia(f.trust.image),
                title: f.trust.title || '',
                text: f.trust.text || '',
            }
            : null,
        branches: branchSlugs,
    };
}

export function toServiceCard(service) {
    return {
        slug: service.slug,
        title: service.title,
        price: service.price,
        image: service.image,
    };
}

export function toServiceDetail(service, {site, forms}) {
    const modal = site.serviceModal || {};
    return {
        slug: service.slug,
        mark: modal.mark,
        title: service.title,
        description: service.description,
        heroImage: service.heroImage,
        quickForm: forms.quick,
        benefitsTitle: service.benefitsTitle || modal.benefitsTitle,
        benefits: service.benefits,
        symptomsTitle: service.symptomsTitle || modal.symptomsTitle,
        symptoms: service.symptoms,
        trust: service.trust,
        popularTitle: modal.popularTitle,
        popular: service.popular,
        priceListTitle: modal.priceListTitle,
        priceListSubTitle: modal.priceListSubTitle,
        priceList: service.priceList,
        startingPrice: service.price,
        cardCta: modal.cardCta,
        showMore: modal.showMore,
        branches: service.branches || [],
    };
}

function mapReview(node, branches) {
    const f = node.reviewFields || {};
    const branchNode = firstNode(f.branch);
    const branchId = nodeId(branchNode);
    const fallback = branches.find((b) => b.slug === nodeSlug(branchNode));
    return {
        id: node.databaseId,
        branchId: branchId ?? fallback?.id ?? null,
        platform: scalar(f.platform),
        author: f.authorName || node.title || '',
        avatar: mapMedia(f.avatar),
        rating: num(f.rating, 0),
        text: f.text || '',
    };
}

function mapNewsItem(node) {
    const gallery = (node.newsFields?.gallery?.nodes || []).map((media) =>
        img(media.sourceUrl || media.mediaItemUrl, media.altText || ''),
    );
    const category = node.newsCategories?.nodes?.[0]?.name || '';
    return {
        id: node.databaseId,
        slug: node.slug,
        date: isoDate(node.date),
        title: node.title || '',
        category,
        gallery,
        paragraphs: htmlToParagraphs(node.content),
    };
}

function mapOffer(node) {
    const f = node.offerFields?.offerFields || node.offerFields || {};
    return {
        id: node.databaseId,
        slug: node.slug,
        badge: f.badge || 'Акция',
        title: node.title || '',
        cta: {label: f.ctaLabel || 'Оставить заявку'},
        disclaimer: f.disclaimer || '',
        until: isoDate(f.until),
        image: mapMedia(f.image),
    };
}

function mapLegalPage(node) {
    if (!node?.slug) return null;
    return {
        slug: node.slug,
        title: node.title || '',
        updatedAt: isoDate(node.legalFields?.updatedAt) || '',
        html: node.content || '',
    };
}

function mapSite(raw, branches) {
    const settings = raw.siteSettings || {};
    const chrome = settings.siteSettingsFields || {};
    const seo = settings.seoFields || {};
    const modal = settings.modalErrorsFields || {};
    const serviceModal = settings.serviceModalFields || {};
    const consentLegal = firstNode(modal.consent?.legal);
    const legal = (chrome.legal?.nodes || [])
        .map((node) => ({
            label: node.title || node.slug,
            slug: node.slug,
        }))
        .filter((item) => item.slug);

    const socials = (chrome.socials || []).map((row) => ({
        name: row.name || '',
        url: row.url || '',
        logo: mapMedia(row.logo),
        logoDark: mapMedia(row.logoDark),
        alt: row.name || '',
    }));

    return {
        seo: {
            title: seo.seoTitle || '',
            description: seo.seoDescription || '',
        },
        callModal: {
            title: modal.callModalTitle || '',
        },
        consent: {
            label: modal.consent?.label || '',
            linkText: modal.consent?.linkText || '',
            slug: consentLegal?.slug || 'privacy',
            required: Boolean(modal.consent?.required),
        },
        formSuccess: {
            message: modal.formSuccessMessage || '',
        },
        formErrors: {
            nameRequired: modal.formErrors?.nameRequired || '',
            nameShort: modal.formErrors?.nameShort || '',
            phone: modal.formErrors?.phone || '',
            carBrand: modal.formErrors?.carBrand || '',
            timing: modal.formErrors?.timing || '',
            branch: modal.formErrors?.branch || '',
            consent: modal.formErrors?.consent || '',
        },
        serviceModal: {
            mark: serviceModal.mark || '',
            benefitsTitle: serviceModal.benefitsTitle || '',
            symptomsTitle: serviceModal.symptomsTitle || '',
            popularTitle: serviceModal.popularTitle || '',
            priceListTitle: serviceModal.priceListTitle || '',
            priceListSubTitle: serviceModal.priceListSubtitle || '',
            cardCta: serviceModal.cardCta || '',
            showMore: serviceModal.showMore || '',
        },
        header: {
            logo: mapMedia(chrome.logo),
            menu: (chrome.menu || []).map((item) => ({
                label: item.label || '',
                link: item.link || '',
            })),
            socials,
        },
        footer: {
            logo: mapMedia(chrome.footerLogo),
            logoDark: mapMedia(chrome.footerLogoDark),
            copyright: chrome.copyright || '',
            legal,
            socials,
        },
    };
}

function mapForms(raw, site, brands, branches) {
    const settings = raw.siteSettings || {};
    const otherLabel = 'Другая';
    const anyLabel = settings.formContactFields?.branchAnyLabel || 'Не имеет значения';

    const quick = withShared(
        {
            fields: namePhoneCarFields(settings.formQuickFields, brands, otherLabel),
            submitLabel: settings.formQuickFields?.submitLabel || '',
        },
        site,
    );
    const commercial = withShared(
        {
            fields: namePhoneCarFields(settings.formCommercialFields, brands, otherLabel),
            submitLabel: settings.formCommercialFields?.submitLabel || '',
        },
        site,
    );
    const contactGroup = settings.formContactFields || {};
    const contact = withShared(
        {
            fields: namePhoneCarFields(contactGroup, brands, otherLabel),
            radioGroups: [
                {
                    name: 'timing',
                    label: contactGroup.timingLabel || '',
                    required: true,
                    options: mapTimingOptions(contactGroup.timingOptions),
                },
                {
                    name: 'branch',
                    label: contactGroup.branchLabel || '',
                    required: true,
                    options: branchFormOptions(branches, {includeAny: true, anyLabel}),
                },
            ],
            extraSection: {
                title: contactGroup.extraTitle || '',
                fields: [
                    {
                        name: 'vin',
                        label: contactGroup.vinLabel || '',
                        type: 'vin',
                        placeholder: contactGroup.vinPlaceholder || '',
                        required: Boolean(contactGroup.vinRequired),
                    },
                    {
                        name: 'partName',
                        label: contactGroup.partNameLabel || '',
                        type: 'select',
                        placeholder: contactGroup.partNamePlaceholder || '',
                        required: Boolean(contactGroup.partNameRequired),
                        allowCustom: Boolean(contactGroup.allowCustom),
                        options: (contactGroup.partOptions || []).map((row) => row.label).filter(Boolean),
                    },
                ],
            },
            submitLabel: contactGroup.submitLabel || '',
        },
        site,
    );
    const feedbackGroup = settings.formFeedbackFields || {};
    const feedback = withShared(
        {
            fields: namePhoneCarFields(feedbackGroup, brands, otherLabel),
            branch: {
                name: 'branch',
                label: feedbackGroup.branchLabel || '',
                required: true,
                options: branchFormOptions(branches),
            },
            message: {
                name: 'message',
                label: feedbackGroup.messageLabel || '',
                hint: feedbackGroup.messageHint || '',
                placeholder: feedbackGroup.messagePlaceholder || '',
                required: false,
            },
            submitLabel: feedbackGroup.submitLabel || '',
        },
        site,
    );

    return {quick, commercial, contact, feedback};
}

function mapAboutCards(layout) {
    const cards = [];
    if (layout.first) {
        cards.push({
            image: mapMedia(layout.first.image),
            eyebrow: layout.first.eyebrow || '',
            title: layout.first.title || '',
            text: layout.first.text || '',
            variant: 'first',
        });
    }
    if (layout.second) {
        cards.push({
            image: mapMedia(layout.second.image),
            eyebrow: layout.second.eyebrow || '',
            title: layout.second.title || '',
            text: layout.second.text || '',
            variant: 'second',
        });
    }
    if (layout.third) {
        const statRaw = layout.third.stat;
        const stat =
            statRaw == null || statRaw === ''
                ? ''
                : String(statRaw).includes('%')
                    ? String(statRaw)
                    : `${statRaw}%`.replace(/\.0%$/, '%');
        cards.push({
            title: layout.third.title || '',
            stat,
            statLabel: layout.third.statLabel || '',
            text: layout.third.text || '',
            variant: 'third',
        });
    }
    return cards;
}

function mapSection(type, layout, ctx) {
    if (!layout) return null;
    const {brands, branches, forms, services, reviews, serviceCards} = ctx;

    if (type === 'hero') {
        return {
            type: 'hero',
            title: layout.title || '',
            backgroundVideo: mediaString(layout.backgroundVideo),
            slides: (layout.slides || []).map((slide) => ({
                title: slide.title || '',
                text: slide.text || '',
            })),
            stats: (layout.stats || []).map((row) => ({
                value: row.value || '',
                label: row.label || '',
            })),
            cta: {label: layout.cta?.label || '', link: '#contacts'},
            brands,
        };
    }

    if (type === 'about') {
        return {
            type: 'about',
            title: layout.title || '',
            titleBack: layout.titleBack || '',
            subtitle: layout.subtitle || '',
            cards: mapAboutCards(layout),
            videoWrapper: {
                textBtn: layout.videoWrapper?.videoBtnLabel || '',
                videos: (layout.videoWrapper?.videosRepeater || [])
                    .map((row) => ({
                        label: row.label || '',
                        url: mediaString(row.file),
                    }))
                    .filter((row) => row.url),
            },
            stats: (layout.aboutStats || []).map((row, i) => ({
                id: i + 1,
                image: mapMedia(row.image),
                value: row.value || '',
                text: row.text || '',
            })),
        };
    }

    if (type === 'services') {
        const related = (layout.serviceList?.nodes || [])
            .map((node) => {
                const rec = services.find((s) => s.slug === node.slug);
                if (rec) return toServiceCard(rec);
                return {
                    slug: node.slug,
                    title: node.title || '',
                    price: node.serviceFields?.price || '',
                    image: mapMedia(node.serviceFields?.image),
                };
            })
            .filter((card) => card.slug);
        return {
            type: 'services',
            title: layout.title || '',
            titleBack: layout.titleBack || '',
            mark: layout.mark || '',
            services: related.length ? related : serviceCards,
        };
    }

    if (type === 'steps') {
        return {
            type: 'steps',
            title: layout.title || '',
            mark: layout.mark || '',
            steps: (layout.steps || []).map((step, i) => ({
                number: String(i + 1).padStart(2, '0'),
                title: step.title || '',
                text: step.text || '',
            })),
            images: (layout.images?.nodes || []).map((node, i) => ({
                id: i + 1,
                image: img(node.sourceUrl || node.mediaItemUrl, node.altText || ''),
            })),
        };
    }

    if (type === 'team') {
        return {
            type: 'team',
            mark: layout.mark || '',
            title: layout.title || '',
            titleBack: layout.titleBack || '',
            highlightHtml: unwrapWysiwyg(layout.highlightHtml),
            subtitle: layout.subtitle || '',
            image: mapMedia(layout.image),
        };
    }

    if (type === 'specialOffer') {
        return {
            type: 'specialOffer',
            title: [layout.title || '', layout.titleLine2 || ''],
            subtitle: layout.subtitle || '',
            highlightHtml: unwrapWysiwyg(layout.highlightHtml),
            highlightMark: layout.highlightMark || '',
            cta: {label: layout.cta?.label || ''},
            image: mapMedia(layout.image),
            detailsHtml: layout.detailsHtml || '',
        };
    }

    if (type === 'reviews') {
        return {
            type: 'reviews',
            mark: layout.mark || '',
            title: layout.title || '',
            titleBack: layout.titleBack || '',
            summary: {
                count: layout.summary?.count == null ? '' : String(layout.summary.count),
                countLabel: layout.summary?.countLabel || '',
                platforms: (layout.summary?.platforms || []).map((row) => ({
                    id: row.id || '',
                    logo: mapMedia(row.logo),
                })),
            },
            platforms: (layout.platforms || []).map((row) => ({
                id: row.id || '',
                label: row.label || '',
                links: (row.links || []).map((link) => ({
                    branchId: nodeId(firstNode(link.branchId)),
                    url: link.url || '',
                })),
            })),
            items: reviews,
            cta: {label: layout.cta?.label || ''},
        };
    }

    if (type === 'commercial') {
        return {
            type: 'commercial',
            mark: layout.mark || '',
            title: layout.title || '',
            subtitle: layout.subtitle || '',
            cta: {label: layout.cta?.label || ''},
            detailsHtml: layout.detailsHtml || '',
            backgroundImage: mapMedia(layout.backgroundImage),
            limitations: (layout.limitations || []).map((row) => ({
                image: mapMedia(row.image),
                text: row.text || '',
            })),
            form: forms.commercial,
        };
    }

    if (type === 'faq') {
        return {
            type: 'faq',
            mark: layout.mark || '',
            title: layout.title || '',
            cta: {label: layout.cta?.label || ''},
            messengers: branches.map(toMessenger),
            items: (layout.items || []).map((item, i) => ({
                id: i + 1,
                question: item.question || '',
                answer: item.answer || '',
            })),
        };
    }

    if (type === 'contact_form') {
        return {
            type: 'contact_form',
            id: 'contact-form',
            title: layout.title || '',
            backgroundImage: mapMedia(layout.backgroundImage),
            form: forms.contact,
        };
    }

    if (type === 'contacts') {
        return {
            type: 'contacts',
            id: 'contacts',
            email: layout.email || '',
            mapImage: mapMedia(layout.mapImage),
            mapImageDark: mapMedia(layout.mapImageDark),
            mapImageModal: mapMedia(layout.mapImageModal),
            branches,
        };
    }

    if (type === 'feedback') {
        return {
            type: 'feedback',
            id: 'feedback',
            intro: layout.intro || '',
            title: layout.title || '',
            manager: {
                title: layout.manager?.title || '',
                photo: mapMedia(layout.manager?.photo),
            },
            tires: mapMedia(layout.tires),
            form: forms.feedback,
        };
    }

    return null;
}

const SECTION_SETTING_KEYS = {
    hero: 'heroFields',
    about: 'aboutFields',
    services: 'servicesSectionFields',
    steps: 'stepsFields',
    team: 'teamFields',
    specialOffer: 'specialOfferFields',
    reviews: 'reviewsSectionFields',
    commercial: 'commercialFields',
    faq: 'faqFields',
    contact_form: 'contactFormSectionFields',
    contacts: 'contactsFields',
    feedback: 'feedbackSectionFields',
};

export function mapWpPayload(raw) {
    const settings = raw.siteSettings || {};
    const branchNodes = raw.branches?.nodes || [];
    if (!branchNodes.length) {
        throw new Error('WordPress has no branches');
    }

    const brands = (settings.brands?.brandsList || []).map((row) => ({
        name: row.name || '',
        logo: mapMedia(row.logo),
        logoDark: mapMedia(row.logoDark),
    }));
    const branches = branchNodes.map(mapBranch);
    const site = mapSite(raw, branches);
    const forms = mapForms(raw, site, brands, branches);
    const services = (raw.services?.nodes || []).map(mapServiceRecord);
    const serviceCards = services.map(toServiceCard);
    const servicesBySlug = Object.fromEntries(
        services.map((service) => [service.slug, toServiceDetail(service, {site, forms})]),
    );
    const reviews = (raw.reviews?.nodes || []).map((node) => mapReview(node, branches));
    const ctx = {brands, branches, forms, services, reviews, serviceCards};
    const sections = SECTION_MAP_TYPES.map((type) =>
        mapSection(type, settings[SECTION_SETTING_KEYS[type]], ctx),
    ).filter(Boolean);

    if (!sections.length) {
        throw new Error('WordPress sections did not map');
    }

    const newsPageFields = raw.newsPageNode?.newsPage?.newsPageFields || {};
    const legalDocs = {};
    for (const node of [raw.privacy, raw.personalData]) {
        const doc = mapLegalPage(node);
        if (doc) legalDocs[doc.slug] = doc;
    }

    return {
        source: 'wp',
        site,
        forms,
        branches,
        brands,
        sections,
        servicesBySlug,
        news: (raw.newsItems?.nodes || []).map(mapNewsItem),
        newsPage: {
            title: newsPageFields.title || 'Новости',
            empty: newsPageFields.empty || 'Новостей за {year} пока нет.',
            seoTitle: newsPageFields.seoTitle || newsPageFields.title || '',
            seoDescription: newsPageFields.seoDescription || site.seo.description,
            pageSize: Math.max(1, Math.round(num(newsPageFields.pageSize, 2))),
        },
        offers: (raw.offers?.nodes || []).map(mapOffer),
        legalDocs,
    };
}
