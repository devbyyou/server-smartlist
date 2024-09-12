/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProduitsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Créer un produit
  async create(createProductDto: Prisma.ProduitCreateInput) {
    return this.databaseService.produit.create({
      data: createProductDto,
    });
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
        categorie: true, // Inclure la catégorie pour chaque produit
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