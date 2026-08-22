export function collectFormErrors(messages, values) {
    const errors = {};

    if (values.name !== undefined) {
        if (!values.name.trim()) {
            errors.name = messages.nameRequired;
        } else if (values.name.trim().length < 2) {
            errors.name = messages.nameShort;
        }
    }

    if (values.phoneDigits !== undefined && values.phoneDigits.length < 10) {
        errors.phone = messages.phone;
    }

    if ('carBrand' in values && !values.carBrand) {
        errors.carBrand = messages.carBrand;
    }

    if ('timing' in values && !values.timing) {
        errors.timing = messages.timing;
    }

    if ('branch' in values && !values.branch) {
        errors.branch = messages.branch;
    }

    if ('consent' in values && !values.consent) {
        errors.consent = messages.consent;
    }

    return errors;
}
