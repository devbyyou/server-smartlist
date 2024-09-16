import { Injectable } from '@nestjs/common';
import { AxiosService } from '../axios/axios.service';

@Injectable()
export class OpenfoodfactsService {
    constructor(private readonly axiosService: AxiosService) { }

    // Méthode pour rechercher des produits par nom via Open Food Facts
    async searchProduct(query: string) {
        const data = await this.axiosService.get('cgi/search.pl', {
            search_terms: query,
            json: true,
        });
        return data.products; // Retourne les produits trouvés
    }
}