import { prisma } from "../../lib/prisma";
import { ICategory } from "./category.interface";

const createCategoryIntoDB =async(payload:ICategory)=>{
    const createCategory = await prisma.categories.create({
        data :{
            ...payload
        }
    })

    return {
        createCategory
    }
};

const getAllCategories = async()=>{
    const categories = await prisma.categories.findMany();

    return {categories}
}

const getAllUserIntoDB = async()=>{
    const users = await prisma.user.findMany();

    return {users}
}

export const categoriesService ={
    createCategoryIntoDB,
    getAllCategories,
    getAllUserIntoDB
}