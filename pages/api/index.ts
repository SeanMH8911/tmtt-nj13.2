import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const result = await prisma.user.create({
  data: {
    email: 'seanhoweworasask@gmail.com',
    role: "Artist",
    Artist: {
      create: {
        stageName: "Bobby",
        address: "40 Sunset Bay, Adeje, Tenerife, 34343",
        contactNumber: "07940968593",
        facebookLink: "https://www.facebook.com",
        instagramLink: "https://www.instagram.com",
        twitterLink: "https://twitter.com",
        websiteLink: "https://www.test.com",
        avaiableForHire: true,

      }
    },
    
  }
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
 
  })

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