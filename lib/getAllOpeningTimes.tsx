import prisma from "@/prisma/client";

export default async function getAllOpeningTimes(){
    const res = await prisma.openingTime.findMany()
    console.log(res);
    if (!res) throw new Error(" Could not find opening times")
    return res
}