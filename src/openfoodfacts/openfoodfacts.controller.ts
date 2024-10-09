import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OpenfoodfactsService } from './openfoodfacts.service';

@Controller('search')
export class OpenfoodfactsController {
    constructor(
        private readonly openFoodFactsService: OpenfoodfactsService
    ) { }
    @Get()
    search(@Query('search_terms') searchTerms: string, @Query('json') json: boolean) {
        return this.openFoodFactsService.searchProduct(searchTerms);
    }
    @Get('by-category')
    async getByCategoryId(@Query('categoryId') categoryId: number) {
        return this.openFoodFactsService.getProductsByCategoryId(categoryId);
    }
}
