import Icon from '@/components/icons/Icon';
import {site} from '@/lib/mock-data';

export default function NewsPagination({page, pageCount, onChange}) {
    if (pageCount <= 1) return null;

    const pages = Array.from({length: pageCount}, (_, i) => i + 1);

    return (
        <nav
            className="mt-10 flex items-center justify-center gap-4 md:mt-14 md:gap-6"
            aria-label={site.labels.newsPagination}
        >
            <button
                type="button"
                onClick={() => onChange(page - 1)}
                disabled={page <= 1}
                className="cursor-pointer text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                aria-label={site.labels.prevPage}
            >
                <Icon name="arrow-left" className="h-6 w-6 md:h-7 md:w-7" />
            </button>

            <ul className="flex items-center gap-3 md:gap-4">
                {pages.map((n) => (
                    <li key={n}>
                        <button
                            type="button"
                            onClick={() => onChange(n)}
                            aria-current={n === page ? 'page' : undefined}
                            className={`min-w-7 cursor-pointer font-helvetica text-base md:text-lg ${
                                n === page
                                    ? 'font-bold text-foreground'
                                    : 'text-foreground-light hover:text-foreground'
                            }`}
                        >
                            {n}
                        </button>
                    </li>
                ))}
            </ul>

            <button
                type="button"
                onClick={() => onChange(page + 1)}
                disabled={page >= pageCount}
                className="cursor-pointer text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                aria-label={site.labels.nextPage}
            >
                <Icon name="arrow-right" className="h-6 w-6 md:h-7 md:w-7" />
            </button>
        </nav>
    );
}
