import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const result = await prisma.venue.findMany()
    
    // OR: {
    //   title:{
    //     contains: 'ginger',
    //     mode: 'insensitive',
    //   },
    //    OR: {
    //     venueCategory:{
    //       contains: 'Restaurant',
    //       mode: 'insensitive',
    //     }
    //   },
    // }
 console.log(result);
 
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })