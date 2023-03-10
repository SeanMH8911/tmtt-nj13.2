import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

  const res = await prisma.openingTime.create({
    data:{
      venueId:"clf1l6rmh0000bzr473zgsbuw",
      dayOfWeek: 6,
      openTime: new Date(0,0,0,9,0,0),
      closeTime: new Date(0,0,0,23,0,0)
    }
  })
    
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
 console.log(res);
 
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