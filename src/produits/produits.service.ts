import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { OpenfoodfactsService } from '../openfoodfacts/openfoodfacts.service';

@Injectable()
export class ProduitsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly openFoodFactsService: OpenfoodfactsService
  ) { }

  // Créer un produit
  async create(createProductDto: Prisma.ProduitCreateInput) {
    return this.databaseService.produit.create({
      data: createProductDto,
    });
  }

  // Rechercher des produits via Open Food Facts
  async searchProductFromOpenFoodFacts(query: string) {
    return this.openFoodFactsService.searchProduct(query);
  }

  // Récupérer tous les produits
  async findAll() {
    return this.databaseService.produit.findMany({
      include: {
        categorie: true, // Inclure la catégorie associée
      },
    });
  }

  // Récupérer un produit par ID
  async findOne(id: number) {
    return this.databaseService.produit.findUnique({
      where: {
        id,
      },
      include: {
        categorie: true,
      },
    });
  }

  // Mettre à jour un produit
  async update(id: number, updateProductDto: Prisma.ProduitUpdateInput) {
    return this.databaseService.produit.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  // Supprimer un produit
  async remove(id: number) {
    return this.databaseService.produit.delete({
      where: { id },
    });
  }
}