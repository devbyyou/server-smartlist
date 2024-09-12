/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { Prisma } from '@prisma/client';

@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) { }

  @Post()
  create(@Body() createProduitDto: Prisma.ProduitCreateInput) {
    return this.produitsService.create(createProduitDto);
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
