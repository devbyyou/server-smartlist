import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, Req } from '@nestjs/common';
import { ListesCoursesService } from './listes-courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';  // Importer Prisma pour typer les entrées

@UseGuards(JwtAuthGuard)  // Si tu utilises le Guard JWT pour protéger ces routes
@Controller('listes-de-courses')
export class ListesCoursesController {
    constructor(private readonly listesDeCoursesService: ListesCoursesService) { }

    @Post()
    create(@Body() createListDto: Prisma.ListDeCourseCreateInput) {
        // Appel direct à Prisma via le service, en passant les données envoyées
        return this.listesDeCoursesService.create(createListDto);        
    }

    @Get()
    findAll() {
        // Récupérer toutes les listes de courses
        return this.listesDeCoursesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        // Récupérer une liste de courses spécifique via son ID
        return this.listesDeCoursesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateData: Prisma.ListDeCourseUpdateInput) {
        // Mettre à jour une liste de courses via son ID
        return this.listesDeCoursesService.update(+id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        // Supprimer une liste de courses via son ID
        return this.listesDeCoursesService.remove(+id);
    }
}