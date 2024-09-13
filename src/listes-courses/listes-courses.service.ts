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


    async findOne(id: number) {
        return this.databaseService.listDeCourse.findUnique({ where: { id } });
    }

    async update(id: number, data: Prisma.ListDeCourseUpdateInput) {
        return this.databaseService.listDeCourse.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return this.databaseService.listDeCourse.delete({
            where: { id },
        });
    }
}