const MEDIA_EDGE = `
  node {
    sourceUrl
    mediaItemUrl
    altText
  }
`;

const MEDIA_NODES = `
  nodes {
    sourceUrl
    mediaItemUrl
    altText
  }
`;

const CTA = `
  cta {
    label
  }
`;

export const SITE_QUERY = `
  query SiteData {
    siteSettings {
      siteSettingsFields {
        copyright
        logo { ${MEDIA_EDGE} }
        footerLogo { ${MEDIA_EDGE} }
        footerLogoDark { ${MEDIA_EDGE} }
        menu { label link }
        socials {
          name
          url
          logo { ${MEDIA_EDGE} }
          logoDark { ${MEDIA_EDGE} }
        }
        legal {
          nodes {
            slug
            ... on Page { slug title }
          }
        }
      }
      seoFields { seoTitle seoDescription }
      modalErrorsFields {
        callModalTitle
        formSuccessMessage
        consent {
          label
          linkText
          required
          legal {
            nodes {
              slug
              ... on Page { slug title }
            }
          }
        }
        formErrors {
          branch
          carBrand
          consent
          nameRequired
          nameShort
          phone
          timing
        }
      }
      formQuickFields {
        carBrandLabel
        carBrandPlaceholder
        carBrandRequired
        nameLabel
        namePlaceholder
        nameRequired
        phoneLabel
        phonePlaceholder
        phoneRequired
        submitLabel
      }
      formCommercialFields {
        carBrandLabel
        carBrandPlaceholder
        carBrandRequired
        nameLabel
        namePlaceholder
        nameRequired
        phoneLabel
        phonePlaceholder
        phoneRequired
        submitLabel
      }
      formContactFields {
        allowCustom
        branchAnyLabel
        branchLabel
        extraTitle
        nameLabel
        namePlaceholder
        nameRequired
        partNameLabel
        partNamePlaceholder
        partNameRequired
        partOptions { label }
        phoneLabel
        phonePlaceholder
        phoneRequired
        submitLabel
        timingLabel
        timingOptions { value label }
        vinLabel
        vinPlaceholder
        vinRequired
        carBrandLabel
        carBrandPlaceholder
        carBrandRequired
      }
      formFeedbackFields {
        branchLabel
        messageHint
        messageLabel
        messagePlaceholder
        nameLabel
        namePlaceholder
        nameRequired
        phoneLabel
        phonePlaceholder
        phoneRequired
        submitLabel
      }
      brands {
        brandsList {
          name
          logo { ${MEDIA_EDGE} }
          logoDark { ${MEDIA_EDGE} }
        }
      }
      serviceModalFields {
        benefitsTitle
        cardCta
        mark
        popularTitle
        priceListSubtitle
        priceListTitle
        showMore
        symptomsTitle
      }
      heroFields {
        title
        ${CTA}
        backgroundVideo { ${MEDIA_EDGE} }
        slides { title text }
        stats { value label }
      }
      aboutFields {
        title
        titleBack
        subtitle
        first {
          eyebrow
          title
          text
          image { ${MEDIA_EDGE} }
        }
        second {
          eyebrow
          title
          text
          image { ${MEDIA_EDGE} }
        }
        third { stat statLabel title text }
        aboutStats {
          value
          text
          image { ${MEDIA_EDGE} }
        }
        videoWrapper {
          videoBtnLabel
          videosRepeater {
            label
            file { ${MEDIA_EDGE} }
          }
        }
      }
      servicesSectionFields {
        title
        titleBack
        mark
        serviceList {
          nodes {
            slug
            ... on Service {
              slug
              title
              serviceFields {
                price
                image { ${MEDIA_EDGE} }
              }
            }
          }
        }
      }
      stepsFields {
        title
        mark
        steps { title text }
        images { ${MEDIA_NODES} }
      }
      teamFields {
        mark
        title
        titleBack
        highlightHtml
        subtitle
        image { ${MEDIA_EDGE} }
      }
      specialOfferFields {
        title
        titleLine2
        subtitle
        highlightHtml
        highlightMark
        detailsHtml
        ${CTA}
        image { ${MEDIA_EDGE} }
      }
      reviewsSectionFields {
        mark
        title
        titleBack
        ${CTA}
        summary {
          count
          countLabel
          platforms {
            id
            logo { ${MEDIA_EDGE} }
          }
        }
        platforms {
          id
          label
          links {
            url
            branchId {
              nodes {
                databaseId
                slug
                ... on Branch { databaseId slug }
              }
            }
          }
        }
      }
      commercialFields {
        mark
        title
        subtitle
        detailsHtml
        ${CTA}
        backgroundImage { ${MEDIA_EDGE} }
        limitations {
          text
          image { ${MEDIA_EDGE} }
        }
      }
      faqFields {
        mark
        title
        ${CTA}
        items { question answer }
      }
      contactFormSectionFields {
        title
        backgroundImage { ${MEDIA_EDGE} }
      }
      contactsFields {
        email
        mapImage { ${MEDIA_EDGE} }
        mapImageDark { ${MEDIA_EDGE} }
        mapImageModal { ${MEDIA_EDGE} }
      }
      feedbackSectionFields {
        intro
        title
        tires { ${MEDIA_EDGE} }
        manager {
          title
          photo { ${MEDIA_EDGE} }
        }
      }
    }
    branches(first: 20) {
      nodes {
        databaseId
        slug
        title
        branchFields {
          address
          formLabel
          mapUrl
          markerX
          markerY
          messengerUrl
          name
          panoramaUrl
          phone
          shortName
          title
          workHours
          footerLogo { ${MEDIA_EDGE} }
          footerLogoDark { ${MEDIA_EDGE} }
          messengerLogo { ${MEDIA_EDGE} }
        }
      }
    }
    services(first: 50) {
      nodes {
        databaseId
        slug
        title
        serviceFields {
          price
          description
          benefitsTitle
          symptomsTitle
          image { ${MEDIA_EDGE} }
          heroImage { ${MEDIA_EDGE} }
          benefits { text icon { ${MEDIA_EDGE} } }
          symptoms { text icon { ${MEDIA_EDGE} } }
          popular { title price image { ${MEDIA_EDGE} } }
          priceList { title price }
          trust {
            title
            text
            image { ${MEDIA_EDGE} }
          }
          branches {
            nodes {
              databaseId
              slug
              ... on Branch { databaseId slug }
            }
          }
        }
      }
    }
    reviews(first: 50) {
      nodes {
        databaseId
        title
        reviewFields {
          authorName
          platform
          rating
          text
          avatar { ${MEDIA_EDGE} }
          branch {
            nodes {
              databaseId
              slug
              ... on Branch { databaseId slug }
            }
          }
        }
      }
    }
    newsItems(first: 50) {
      nodes {
        databaseId
        slug
        title
        date
        content
        newsFields {
          gallery { ${MEDIA_NODES} }
        }
        newsCategories {
          nodes { name slug }
        }
      }
    }
    offers(first: 20, where: {orderby: {field: MENU_ORDER, order: ASC}}) {
      nodes {
        databaseId
        slug
        title
        offerFields {
          offerFields {
            badge
            ctaLabel
            disclaimer
            until
            image { ${MEDIA_EDGE} }
          }
        }
      }
    }
    newsPageNode: nodeByUri(uri: "/news") {
      ... on Page {
        newsPage {
          newsPageFields {
            title
            empty
            pageSize
            seoTitle
          }
        }
      }
    }
    privacy: nodeByUri(uri: "/privacy") {
      ... on Page {
        slug
        title
        content
        legalFields { updatedAt }
      }
    }
    personalData: nodeByUri(uri: "/personal-data") {
      ... on Page {
        slug
        title
        content
        legalFields { updatedAt }
      }
    }
  }
`;
