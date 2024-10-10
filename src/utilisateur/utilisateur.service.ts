import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
// import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
// import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';

@Injectable()
export class UtilisateurService {
  constructor(
    private readonly databaseService: DatabaseService
  ) { }

  create(data: Prisma.UtilisateurCreateInput) {
    return this.databaseService.utilisateur.create(
      { data }
    )
  }

  findAll() {
    return this.databaseService.utilisateur.findMany()
  }

  findOne(userId: string) {
    const id = parseInt(userId, 10)
    return this.databaseService.utilisateur.findUnique({
      where:
      {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        listesCourses:{
          include: {
            produits: true,
          },
        },
      },
     
    })
  }

  update(id: number, data: Prisma.UtilisateurCreateInput) {
    return this.databaseService.utilisateur.update({
      where: {
        id
      },
      data
    })
  }

  remove(id: number) {
    return this.databaseService.utilisateur.delete({
      where:
        { id }
    })
  }
}
