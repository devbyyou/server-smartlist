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
    //   // Mettre à jour un produit (PATCH)
    //   async updateProduct(productId: string, updateData: any) {
    //     return this.axiosService.patch(`/produits/${productId}`, updateData);
    //   }

    //   // Supprimer un produit (DELETE)
    //   async deleteProduct(productId: string) {
    //     return this.axiosService.delete(`/produits/${productId}`);
    //   }
}