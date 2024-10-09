import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategorieService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {

  }

  create(createCategorieDto: Prisma.CategorieCreateInput) {
    return this.databaseService.categorie.create({ data: createCategorieDto });
  }

  findAll() {
    return this.databaseService.categorie.findMany();
  }

  findOne(id: number) {
    return this.databaseService.categorie.findUnique({
      where: { id }
    })
  }

  update(id: number, updateCategorieDto: Prisma.CategorieUpdateInput) {
    return this.databaseService.categorie.update({
      where: { id },
      data: updateCategorieDto
    })
  }

  remove(id: number) {
    return this.databaseService.categorie.delete({
      where: { id },
    });
  }
  /**
  * Fonction utilitaire pour trouver ou créer une catégorie en fonction des catégories API,
  * avec correspondance partielle sur les mots-clés (par exemple, "Fruits" dans "Fruits & Légumes").
  */

async getOrCreateCategorieId(categoriesApi: string[]): Promise<number> {
  // Séparer la chaîne des catégories en tableau, et nettoyer les espaces
  const categoriesArray = categoriesApi.map(cat => cat.trim().toLowerCase());

  // Récupérer toutes les catégories existantes dans la base de données
  const existingCategories = await this.databaseService.categorie.findMany();

  // Créer une map pour gérer les correspondances multiples pour certaines catégories
  const categoryKeywordMap: { [key: string]: string[] } = {
    'fruits-legumes': ['fruits', 'legumes'],  // Par exemple, "Fruits & Légumes" se divise en "fruits" et "légumes"
    'viandes-poissons': ['viandes', 'poissons'],  // Par exemple, "Viandes & Poissons"
    // Ajouter d'autres catégories composites si nécessaire
  };

  // Parcourir chaque catégorie API et chercher une correspondance partielle
  for (const categorieApi of categoriesArray) {
    // Diviser la catégorie API en mots-clés (par exemple, sur les espaces ou "&")
    const keywords = categorieApi.split(/\s+|&/);

    for (const keyword of keywords) {
      // Normaliser les mots-clés
      const normalizedKeyword = keyword.toLowerCase().replace(/\s+|&/g, '');

      // Chercher une correspondance parmi les catégories existantes
      const matchingCategorie = existingCategories.find(categorie => {
        const existingNom = categorie.nom.toLowerCase().replace(/\s+|&/g, '');
        return existingNom.includes(normalizedKeyword);
      });

      // Si une correspondance est trouvée, retourner l'ID de la catégorie
      if (matchingCategorie) {
        return matchingCategorie.id;
      }

      // Vérifier dans les catégories composites
      for (const [compositeKey, compositeKeywords] of Object.entries(categoryKeywordMap)) {
        if (compositeKeywords.includes(normalizedKeyword)) {
          const matchingCompositeCategorie = existingCategories.find(categorie => {
            return categorie.nom.toLowerCase().includes(compositeKey);
          });

          // Retourner l'ID de la catégorie composite correspondante
          if (matchingCompositeCategorie) {
            return matchingCompositeCategorie.id;
          }
        }
      }
    }
  }

  // Si aucune correspondance n'est trouvée, créer une nouvelle catégorie sous 'produits-divers'
  const newCategorie = await this.databaseService.categorie.create({
    data: {
      nom: 'produits-divers',  // Utiliser "produits-divers" comme nom par défaut pour les nouvelles catégories
    },
  });

  return newCategorie.id;  // Retourner l'ID de la nouvelle catégorie
}


}
