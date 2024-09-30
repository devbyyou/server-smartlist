import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { OpenfoodfactsService } from '../openfoodfacts/openfoodfacts.service';
import { CategorieService } from 'src/categorie/categorie.service';

@Injectable()
export class ProduitsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly openFoodFactsService: OpenfoodfactsService,
    private readonly categorieService: CategorieService,

  ) { }
  // Créer une liste de courses et y ajouter un produit
  async createListWithProduct(data: any) {

    const userId: number = data.userId
    const produitId: string = data.produitId

    console.log("data 2 ----->", data);
    console.log("userId & produitId -------->", userId, produitId);

    // Vérifier si une liste de courses existe pour cet utilisateur
    let list = await this.databaseService.listDeCourse.findFirst({
      where: { userId },
    });

    // Extraire les 9 derniers chiffres du produitId
    const produitIdInt = parseInt(produitId.slice(-9), 10);

    // Vérifier si le produit existe déjà dans la base de données
    let produit = await this.databaseService.produit.findUnique({
      where: { id: produitIdInt },
    });

    if (!produit) {
      // Rechercher le produit dans l'API Open Food Facts si non trouvé dans la base de données
      const produitFromApi = await this.openFoodFactsService.getProductById(produitId);

      if (!produitFromApi) {
        throw new Error('Produit non trouvé dans Open Food Facts');
      }
      // console.log("produitFromApi --------->", produitFromApi);

      // Extraire les catégories de l'API et les convertir en tableau
      const categoriesApi = produitFromApi.product.categories?.split(',').map((cat: string) => cat.trim()) || [];

      console.log("categoriesApi --------->", categoriesApi);
      // Trouver ou créer une catégorie correspondante 
      const categorieId = await this.categorieService.getOrCreateCategorieId(categoriesApi);

      console.log("categorieId --------->", categorieId);
      // Créer le produit avec les informations récupérées de l'API
      produit = await this.databaseService.produit.create({
        data: {
          id: produitIdInt,
          nom: produitFromApi.product.product_name,
          categorieId: categorieId,
          quantite: 1,
          image: produitFromApi.product.image_url ? produitFromApi.product.image_url : '',
        },
      });
    }

    // Ajouter le produit à la liste de courses, ou créer une nouvelle liste si elle n'existe pas
    if (!list) {
      list = await this.databaseService.listDeCourse.create({
        data: {
          userId,
          produits: {
            connect: { id: produitIdInt },
          },
        },
      });
    } else {
      await this.databaseService.listDeCourse.update({
        where: { id: list.id },
        data: {
          produits: {
            connect: { id: produitIdInt },
          },
        },
      });
    }

    // Mettre à jour la quantité du produit dans la base de données (si nécessaire)
    await this.databaseService.produit.update({
      where: { id: produitIdInt },
      data: { quantite: produit.quantite },
    });

    return list;
  }

  // Créer un produit
  async create(createProductDto: Prisma.ProduitCreateInput) {
    const { categorie, ...productData } = createProductDto;

    // Vérifier si une catégorie a été fournie et si c'est une chaîne de caractères
    if (!categorie || typeof categorie !== 'string') {
      throw new Error("La catégorie doit être un nom valide (chaîne de caractères).");
    }

    // Chercher la catégorie existante via son nom
    const existingCategory = await this.databaseService.categorie.findUnique({
      where: { nom: categorie }, // Chercher la catégorie par son nom unique
    });

    if (!existingCategory) {
      // Si la catégorie n'existe pas, la créer
      return this.databaseService.produit.create({
        data: {
          ...productData,
          categorie: {
            create: { nom: categorie }, // Créer une nouvelle catégorie avec un nom
          },
        },
      });
    }

    // Si la catégorie existe, connecter le produit à cette catégorie via son ID
    return this.databaseService.produit.create({
      data: {
        ...productData,
        categorie: {
          connect: { id: existingCategory.id }, // Connecter à la catégorie via son ID
        },
      },
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