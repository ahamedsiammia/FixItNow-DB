import { prisma } from "../../lib/prisma";
import { ICategory, IUpdateUserStatus } from "./category.interface";

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


const updateUserStatusIntoDB = async(id : string,payload:IUpdateUserStatus,)=>{
    const {status} = payload;

    const user = await prisma.user.update({
        where :{
             id
        },
        data :{
            status : status
        },
        omit : {
            password : true
        }
    })

    return {user}
}

export const categoriesService ={
    createCategoryIntoDB,
    getAllCategories,
    getAllUserIntoDB,
    updateUserStatusIntoDB
}