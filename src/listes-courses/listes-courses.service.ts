import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ListesCoursesService {
    constructor(private readonly databaseService: DatabaseService) { }

    async create(data: Prisma.ListDeCourseCreateInput) {

        return this.databaseService.listDeCourse.create({ data });
    }

    async findAll() {
        return this.databaseService.listDeCourse.findMany();
    }

    async findOne(id: any) {
        // console.log('id 2 -------->', id);
        const parseId = parseInt(id)
        try {
            return this.databaseService.listDeCourse.findFirst({
                where: {
                    userId: parseId
                }, include: {
                    produits: true,  // Inclure les produits associés à la liste de courses
                },
            });
        } catch (error) {
            return { error: 'Erreur lors du find list' }
        }
    }

    async update(id: number, data: Prisma.ListDeCourseUpdateInput) {
        return this.databaseService.listDeCourse.update({
            where: { id },
            data,
        });
    }

    async remove(id: string, listDeCourseId: string) {

        const produitIdInt = parseInt(id, 10);
        const listId = parseInt(listDeCourseId, 10);

        return this.databaseService.produit.delete({
            where: {
                id: produitIdInt,
                listDeCourseId: listId
            },
        });
    }
}