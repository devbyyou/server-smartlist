import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('api/produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) { }

  @Post()
  create(@Body() createProduitDto: Prisma.ProduitCreateInput) {
    return this.produitsService.create(createProduitDto);
  }

  // Endpoint pour ajouter un produit dans une liste de courses
  @Post('add-to-list')
  async addToList(@Body() data: any) {

    return this.produitsService.createListWithProduct(data);
  }

  @Get()
  findAll() {
    return this.produitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produitsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProduitDto: Prisma.ProduitUpdateInput,
  ) {
    return this.produitsService.update(+id, updateProduitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produitsService.remove(+id);
  }

}