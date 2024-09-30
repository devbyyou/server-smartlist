import { Injectable } from '@nestjs/common';
import { AxiosService } from '../axios/axios.service';
// import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OpenfoodfactsService {
    constructor(
        private readonly axiosService: AxiosService,
    
    ) { }

    // Méthode pour rechercher des produits par nom via Open Food Facts
    async searchProduct(query: string) {
        const data = await this.axiosService.get('cgi/search.pl', {
            search_terms: query,
            json: true,
        });

        return data.products; // Retourne les produits trouvés
    };

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