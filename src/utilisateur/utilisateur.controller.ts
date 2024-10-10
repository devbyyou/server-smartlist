import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/utilisateur')
export class UtilisateurController {
  constructor(
    private readonly utilisateurService: UtilisateurService,
  ) { }

  @Post()
  create(@Body() createUtilisateurDto: Prisma.UtilisateurCreateInput) {
    return this.utilisateurService.create(createUtilisateurDto);
  }

  @Get()
  findAll() {
    return this.utilisateurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utilisateurService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUtilisateurDto: Prisma.UtilisateurCreateInput) {
    return this.utilisateurService.update(+id, updateUtilisateurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilisateurService.remove(+id);
  }
}
