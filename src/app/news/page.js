import { Container } from '@/components/Container';

export const metadata = {
    title: 'Новости — Авторитет',
    description: 'Новости автосервиса Авторитет',
};

export default function NewsPage() {
    return (
        <main className="min-h-[60vh] pt-32 pb-20">
            <Container>
                <h1 className="font-heading text-3xl md:text-5xl">Новости</h1>
                <p className="mt-4 text-foreground-light">
                    Скоро здесь появятся новости.
                </p>
            </Container>
        </main>
    );
}
