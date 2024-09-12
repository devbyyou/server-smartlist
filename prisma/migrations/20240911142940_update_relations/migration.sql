/*
  Warnings:

  - You are about to drop the column `utilisateurId` on the `ListDeCourse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ListDeCourse" DROP CONSTRAINT "ListDeCourse_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "Produit" DROP CONSTRAINT "Produit_categorieId_fkey";

-- AlterTable
ALTER TABLE "ListDeCourse" DROP COLUMN "utilisateurId";

-- AddForeignKey
ALTER TABLE "ListDeCourse" ADD CONSTRAINT "ListDeCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "Categorie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
