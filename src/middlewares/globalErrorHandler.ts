// src/middlewares/globalErrorHandler.ts
import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";
import  HttpStatus  from "http-status";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode:number = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong!";

  // ================= Prisma Known Request Errors =================
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2000":
        statusCode = HttpStatus.BAD_REQUEST;
        message = "The provided value for the column is too long.";
        break;

      case "P2001":
        statusCode = HttpStatus.NOT_FOUND;
        message = "The record searched for does not exist.";
        break;

      case "P2002":
        statusCode = HttpStatus.CONFLICT;
        message = `Duplicate value for unique field: ${
          (error.meta?.target as string[])?.join(", ") || "unknown field"
        }`;
        break;

      case "P2003":
        statusCode = HttpStatus.BAD_REQUEST;
        message = `Foreign key constraint failed on field: ${
          error.meta?.field_name || "unknown"
        }. Referenced record does not exist.`;
        break;

      case "P2004":
        statusCode = HttpStatus.BAD_REQUEST;
        message = "A database constraint failed.";
        break;

      case "P2005":
        statusCode = HttpStatus.BAD_REQUEST;
        message = "Invalid value stored for the field in the database.";
        break;

      case "P2006":
        statusCode = HttpStatus.BAD_REQUEST;
        message = "The provided value is not valid for this field.";
        break;

      case "P2007":
        statusCode = HttpStatus.BAD_REQUEST;
        message = "Data validation error.";
        break;

      case "P2011":
        statusCode = HttpStatus.BAD_REQUEST;
        message = `Null constraint violation on field: ${
          error.meta?.target || "unknown"
        }`;
        break;

      case "P2012":
        statusCode = HttpStatus.BAD_REQUEST;
        message = "Missing a required value.";
        break;

      case "P2014":
        statusCode = HttpStatus.BAD_REQUEST;
        message = "The change would violate a required relation.";
        break;

      case "P2016":
        statusCode = HttpStatus.BAD_REQUEST;
        message = "Query interpretation error.";
        break;

      case "P2025":
        statusCode = HttpStatus.NOT_FOUND;
        message =
          (error.meta?.cause as string) ||
          "Record not found. It may have already been deleted or does not exist.";
        break;

      default:
        statusCode = HttpStatus.BAD_REQUEST;
        message = `Database error (code: ${error.code}): ${error.message}`;
    }
  }

  // ================= Prisma Validation Error =================
  else if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = HttpStatus.BAD_REQUEST;
    message = "Invalid data format provided to the database.";
  }

  // ================= Prisma Initialization Error =================
  else if (error instanceof Prisma.PrismaClientInitializationError) {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    message = "Failed to connect to the database.";
  }

  // ================= Prisma Unknown Request Error =================
  else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    message = "An unknown database error occurred.";
  }

  // ================= JWT Errors =================
  else if (error?.name === "JsonWebTokenError") {
    statusCode = HttpStatus.UNAUTHORIZED;
    message = "Invalid token. Please log in again.";
  } else if (error?.name === "TokenExpiredError") {
    statusCode = HttpStatus.UNAUTHORIZED;
    message = "Your session has expired. Please log in again.";
  }

  // ================= Custom statusCode থাকা Error (যদি কোথাও থাকে) =================
  else if (error?.statusCode) {
    statusCode = error.statusCode;
    message = error.message;
  }

  // ================= সাধারণ JS Error =================
  else if (error instanceof Error) {
    message = error.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    data: [],
    error: {
      name: error?.name,
      code: error?.code,
      details: process.env.NODE_ENV === "development" ? error : undefined,
    },
    stack: process.env.NODE_ENV === "development" ? error?.stack : undefined,
  });
};

export default globalErrorHandler;