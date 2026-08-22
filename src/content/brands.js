import {img} from '@/lib/media';

export const brands = [
    {name: 'Renault', logo: img('/mock/brands/renault.png', 'Renault'), logoDark: img('/mock/brands/renault-dark.png', 'Renault')},
    {name: 'Citroen', logo: img('/mock/brands/citroen.png', 'Citroen'), logoDark: img('/mock/brands/citroen-dark.png', 'Citroen')},
    {name: 'Audi', logo: img('/mock/brands/audi.png', 'Audi'), logoDark: img('/mock/brands/audi-dark.png', 'Audi')},
    {name: 'Ford', logo: img('/mock/brands/ford.png', 'Ford'), logoDark: img('/mock/brands/ford-dark.png', 'Ford')},
    {name: 'Opel', logo: img('/mock/brands/opel.png', 'Opel'), logoDark: img('/mock/brands/opel-dark.png', 'Opel')},
    {name: 'Chevrolet', logo: img('/mock/brands/chevrolet.png', 'Chevrolet'), logoDark: img('/mock/brands/chevrolet-dark.png', 'Chevrolet')},
    {name: 'Nissan', logo: img('/mock/brands/nissan.png', 'Nissan'), logoDark: img('/mock/brands/nissan-dark.png', 'Nissan')},
    {name: 'Volkswagen', logo: img('/mock/brands/vw.png', 'Volkswagen'), logoDark: img('/mock/brands/vw-dark.png', 'Volkswagen')},
];

export function brandSelectOptions() {
    return [...brands.map((brand) => brand.name), 'Другая'];
}
