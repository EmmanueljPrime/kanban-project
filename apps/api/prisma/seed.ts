/**
 * Prisma seed file
 * --------------------------------------------------------------
 * Objectif : Insérer des données de base dans la DB (Utilisateurs, Projets, Tâches )
 * idempotent : On peut relancer la seed sans dupliquer l'utilisateur grâce à upsert()
 *
 * Pour lancer la seed : npx prisma db seed
 *
 * */
import {PrismaClient, TaskStatus} from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient({
  log : ['warn', 'error']
})

async function main(){
  const email = 'demo@kanban.local'
  const plainPassword = 'demo123!'
  const hashedPassword = await bcrypt.hash(plainPassword, 10)

  const user = await prisma.user.upsert({
    where: {email},
    update: {

    },
    create:{
      email,
      password: hashedPassword,
    },
    select: {id: true, email:true},
  })

  const project = await prisma.project.create({
    data:{
      name: 'Kanban MVP',
      ownerId: user.id,
    },
    select: {id:true, name:true, ownerId:true},
  })

  await prisma.task.createMany({
    data: [
      {
        title: 'Task 1',
        status: TaskStatus.TODO,
        projectId: project.id,
      },
      {
        title: 'Task 2',
        status: TaskStatus.DOING,
        projectId: project.id,
      },
      {
        title: 'Task 3',
        status: TaskStatus.DONE,
        projectId: project.id,
      }
    ],
    skipDuplicates: true
  })

  const taskCount = await prisma.task.count({ where: { projectId: project.id } })

  console.log('Seed terminée !')
  console.log(` - Utilisateur : ${user.email}(${user.id})`)
  console.log(` - Projet : ${project.name}(${project.id})`)
  console.log(` - Tâches : ${taskCount} crées / présentes`)
}

main().catch((e)=>{
  console.error('Seed failed:',e)
  process.exit(1)
}).finally(async()=>{
  await prisma.$disconnect()
})
