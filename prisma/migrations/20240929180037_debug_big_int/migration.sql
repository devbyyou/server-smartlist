-- DropForeignKey
ALTER TABLE "Produit" DROP CONSTRAINT "Produit_categorieId_fkey";

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "Categorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
