import { Injectable } from '@nestjs/common';
import { AxiosService } from '../axios/axios.service';
import * as NodeCache from 'node-cache';

@Injectable()
export class OpenfoodfactsService {
    private cache: NodeCache;

    constructor(private readonly axiosService: AxiosService) {    // Initialisation du cache avec une durée de vie de 5 minutes
        this.cache = new NodeCache({ stdTTL: 300 }); // TTL de 300 secondes (5 minutes)
    }

    // Méthode pour rechercher des produits par nom via Open Food Facts avec mise en cache
    async searchProduct(query: string) {
        // Vérifier si la requête est déjà en cache
        const cachedData = this.cache.get(query);
        if (cachedData) {
            return cachedData; // Si les données sont en cache, les retourner
        }

        // Sinon, effectuer la requête à Open Food Facts
        const data = await this.axiosService.get('cgi/search.pl', {
            search_terms: query,
            json: true,
        });

        // Filtrer les produits pour n'afficher que les résultats les plus pertinents
        const filteredProducts = data.products.filter((product: any) => {
            return (
                product.product_name?.toLowerCase().includes(query.toLowerCase()) ||
                product.generic_name?.toLowerCase().includes(query.toLowerCase())
            );
        });

        // Trier les produits filtrés par pertinence
        const sortedProducts = filteredProducts.sort((a: any, b: any) => {
            if (a.product_name?.toLowerCase() === query.toLowerCase()) return -1;
            if (b.product_name?.toLowerCase() === query.toLowerCase()) return 1;
            return 0;
        });

        // Mettre en cache les résultats avant de les retourner
        this.cache.set(query, sortedProducts);

        return sortedProducts; // Retourner les produits filtrés et triés
    }
    async addProduct(productData: any) {
        return this.axiosService.post(`/produits`, productData);
    }

    async getProductById(productId: string) {
        // Forme correcte de l'URL pour récupérer un produit par ID
        return this.axiosService.getById(`api/v0/produit/${productId}.json`);
    }
    async getProductsByCategoryId(categoryId: number) {
        // Mapping des catégories existantes dans l'API OpenFoodFacts
        const categoryMap: { [key: number]: string[] } = {
            1: ['fruits-frais', 'legumes-frais'],
            2: ['pains'],
            3: ['produits-laitiers'],
            4: ['viandes', 'poissons'],
            5: ['epices'],
            6: ['plats-cuisines', 'surgeles'],
            7: ['pates', 'riz', 'cereales'],
            8: ['snacks'],
            9: ['boissons'],
        };

        // Vérifier si l'ID de catégorie est présent dans le mapping
        const categories = categoryMap[categoryId] || ['produits-divers'];
        if (!categories) {
            // Si l'ID de catégorie n'est pas trouvé, renvoyer un message générique
            return { message: `Catégorie avec l'ID ${categoryId} non trouvée. Veuillez vérifier l'ID.` };
        }

        // Récupérer les produits de toutes les catégories spécifiées
        let combinedProducts: any[] = [];
        for (const category of categories) {
            try {
                const data = await this.axiosService.get(`categorie/${category}.json`);
                if (data.products && data.products.length > 0) {
                    combinedProducts = combinedProducts.concat(data.products);
                }
            } catch (error) {
                console.warn(`Catégorie "${category}" n'a pas pu être récupérée :`, error.message);
            }
        }

        // Filtrer et trier les produits combinés
        const filteredProducts = combinedProducts.filter((product: any) => {
            return product.product_name && !product.product_name.toLowerCase().includes('jus');
        });

        const sortedProducts = filteredProducts.sort((a: any, b: any) => {
            return a.product_name?.localeCompare(b.product_name);
        });

        // Mise en cache des résultats avant de les retourner
        this.cache.set(categories.join('-'), sortedProducts);

        return sortedProducts.length > 0
            ? sortedProducts
            : { message: `Aucun produit trouvé pour la catégorie ${categories.join(', ')}` };
    }



    //   // Mettre à jour un produit (PATCH)
    //   async updateProduct(productId: string, updateData: any) {
    //     return this.axiosService.patch(`/produits/${productId}`, updateData);
    //   }

    //   // Supprimer un produit (DELETE)
    //   async deleteProduct(productId: string) {
    //     return this.axiosService.delete(`/produits/${productId}`);
    //   }
}