import { NextFunction, Request, Response } from "express";
import { userRole } from "../../generated/prisma/enums";
import { varifyToken } from "../utils/token/jwtToken";
import config from "../config";
import { sendResponse } from "../utils/sendResponse";
import { prisma } from "../lib/prisma";
import  HttpStatus  from "http-status";

declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        id: string;
        role: userRole;
      };
    }
  }
}


export const auth = (...requierdRole: userRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken ?  req.cookies.accessToken
    : req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;
        

    if (!token) {
      throw new Error(
        "Your not Logged In . Please Logged in to access to this Resource.",
      );
    }

    const verifyToken = await varifyToken(
      token,
      config.jwt_access_secret as string,
    );

    // console.log(verifyToken);

    if (!verifyToken.success && verifyToken.data !== undefined) {
      throw new Error(verifyToken.message);
    }

    const {email,id,name,role } = verifyToken.data! 
    if (!requierdRole.includes(role as userRole)) {
      return sendResponse(res, {
        success: false,
        statusCode: HttpStatus.FORBIDDEN,
        message: "You Have don't access For Route",
        data: [],
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
        name,
        email,
        role :role as userRole,
      },
    });

    if (!user) {
      sendResponse(res, {
        success: false,
        statusCode: HttpStatus.NOT_FOUND,
        message: "User Not Exist",
        data:[]
      });
    }

    if (user?.status === "BLOCKED") {
      sendResponse(res, {
        success: false,
        statusCode: HttpStatus.NOT_FOUND,
        message: "Your account has been blocked. please contact support.",
        data:[]
      });
    }

    req.user  = {
      id: id,
      name: name,
      email: email,
      role: role as userRole,
    };

    next();
};

};


