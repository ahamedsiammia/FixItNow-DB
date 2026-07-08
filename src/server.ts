import app from "./app"
import config from "./config";
import { prisma } from "./lib/prisma";

const port = config.port

async function main() {
    try {
        await prisma.$connect();
        console.log("connect to the database successfully");
        app.listen(port,()=>{
            console.log(`server is running post on ${port}`);
        })
    } catch (error) {
        console.log(`Error starting on server :  `,error);
        await prisma.$disconnect()
        process.exit(1);
    }
}


main()