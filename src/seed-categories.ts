import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const categories = [
        {
            nom: 'Fruits & Légumes',
            image: 'https://cdn-icons-png.flaticon.com/512/1147/1147934.png'
        },
        {
            nom: 'Pains & Pâtisseries',
            image: 'https://cdn-icons-png.flaticon.com/512/4670/4670536.png'
        },
        {
            nom: 'Produits laitiers',
            image: 'https://cdn-icons-png.flaticon.com/512/3070/3070925.png'
        },
        {
            nom: 'Viandes & Poissons',
            image: 'https://cdn-icons-png.flaticon.com/512/4773/4773199.png'
        },
        {
            nom: 'Ingrédients & Épices',
            image: 'https://cdn-icons-png.flaticon.com/512/10551/10551911.png'
        },
        {
            nom: 'Surgelés & Plats cuisinés',
            image: 'https://cdn-icons-png.flaticon.com/512/5029/5029236.png'
        },
        {
            nom: 'Pâtes, Riz & Céréales',
            image: 'https://cdn-icons-png.flaticon.com/512/9921/9921058.png'
        },
        {
            nom: 'Snacks & Friandises',
            image: 'https://cdn-icons-png.flaticon.com/512/2553/2553691.png'
        },
        {
            nom: 'Boissons',
            image: 'https://cdn-icons-png.flaticon.com/512/2881/2881698.png'
        },
    ];

    for (const categorie of categories) {
        await prisma.categorie.create({
            data: categorie,
        });
    }

    console.log('Catégories avec images insérées avec succès');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


