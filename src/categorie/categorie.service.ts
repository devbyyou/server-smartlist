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
  async getOrCreateCategorieId(categoriesApi: String[]): Promise<number> {
    // Séparer la chaîne des catégories en tableau, et nettoyer les espaces
    const categoriesArray = categoriesApi.map(cat => cat.trim().toLowerCase());

    // Récupérer toutes les catégories existantes dans la base de données
    const existingCategories = await this.databaseService.categorie.findMany();

    // Parcourir chaque catégorie API et chercher une correspondance partielle
    for (const categorieApi of categoriesArray) {
      // Diviser la catégorie API en mots-clés (par exemple, sur les espaces ou "&")
      const keywords = categorieApi.split(/\s+|&/);

      for (const keyword of keywords) {
        const matchingCategorie = existingCategories.find(categorie =>
          categorie.nom.toLowerCase().includes(keyword)
        );

        // Si une correspondance est trouvée, retourner l'ID de la catégorie
        if (matchingCategorie) {
          return matchingCategorie.id;
        }
      }
    }

    // Si aucune correspondance n'est trouvée, créer une nouvelle catégorie avec le premier nom de l'API
    const newCategorie = await this.databaseService.categorie.create({
      data: {
        nom: categoriesArray[0] || 'Catégorie inconnue',  // Utiliser la première catégorie séparée par une virgule
      },
    });

    return newCategorie.id;  // Retourner l'ID de la nouvelle catégorie
  }

}
