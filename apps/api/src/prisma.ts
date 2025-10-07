/**
 * Client Prisma unique, réutilisé partout.
 * Avantage : Permet de centraliser la config du client (log, middlewares, etc.)
 * */

import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['warn', 'error'], //Ajouter 'query' pour voir les requetes
});
