const SVGSpriter = require('svg-sprite');
const fs = require('fs');
const path = require('path');

const spriter = new SVGSpriter({
    mode: {
        symbol: {
            dest: '.',
            sprite: 'sprite.svg',
        },
    },
    shape: {
        transform: [
            {
                svgo: {
                    plugins: [
                        {
                            name: 'convertColors',
                            params: { currentColor: true }, // заменяет чёрные fill/stroke на currentColor вместо удаления
                        },
                    ],
                },
            },
        ],
    },
});

const sourceDir = path.join(__dirname, '../src/assets/icons-source');
fs.readdirSync(sourceDir).forEach((file) => {
    const filePath = path.join(sourceDir, file);
    spriter.add(filePath, null, fs.readFileSync(filePath, 'utf-8'));
});

spriter.compile((err, result) => {
    if (err) throw err;
    const outDir = path.join(__dirname, '../public/icons');
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(
        path.join(outDir, 'sprite.svg'),
        result.symbol.sprite.contents
    );
    console.log('Спрайт собран: public/icons/sprite.svg');
});