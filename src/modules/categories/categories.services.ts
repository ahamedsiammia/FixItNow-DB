import { prisma } from "../../lib/prisma";

const getAllServicesCategoriesIntoDB = async()=>{
    const services = await prisma.categories.findMany({
        include :{
            service : true
        }
    });

    return {services}
};


export const categoriesService ={
    getAllServicesCategoriesIntoDB
}