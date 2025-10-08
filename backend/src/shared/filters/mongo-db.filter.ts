import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import mongoose from 'mongoose';
import { MongoServerError } from 'mongodb';

interface ErrorHandler {
  status: number;
  message: string | ((error: any) => string);
}

@Injectable()
@Catch(MongoServerError, mongoose.Error)
export class MongoExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(MongoExceptionFilter.name);

  private readonly errorHandlers = new Map<Function, ErrorHandler>([
    [
      mongoose.Error.ValidationError,
      {
        status: HttpStatus.BAD_REQUEST,
        message: 'Validación de esquema fallida.',
      },
    ],
    [
      mongoose.Error.CastError,
      {
        status: HttpStatus.BAD_REQUEST,
        message: 'Identificador o tipo de dato inválido.',
      },
    ],
    [
      mongoose.Error.DocumentNotFoundError,
      {
        status: HttpStatus.NOT_FOUND,
        message: 'Documento no encontrado.',
      },
    ],
    [
      mongoose.Error.MissingSchemaError,
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Esquema de Mongoose no registrado.',
      },
    ],
    [
      mongoose.Error.ParallelSaveError,
      {
        status: HttpStatus.CONFLICT,
        message: 'Conflicto al guardar el documento (paralelismo).',
      },
    ],
    [
      mongoose.Error.ValidatorError,
      {
        status: HttpStatus.BAD_REQUEST,
        message: (err) => `Error de validación en campo: ${err.path}`,
      },
    ],
    [
      MongoServerError,
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: (err) => this.resolveMongoCodeMessage(err.code),
      },
    ],
  ]);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const handler = [...this.errorHandlers.entries()].find(
      ([type]) => exception instanceof type,
    );

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error desconocido en la base de datos.';

    if (handler) {
      const [_, info] = handler;
      status = info.status;
      message =
        typeof info.message === 'function'
          ? info.message(exception)
          : info.message;
    }

    const code = exception?.code ?? 0;

    this.logger.error(
      `MongoDB Error (${exception.name}): ${exception.message}`,
      exception.stack,
    );

    response.status(status).json({
      statusCode: status,
      error: exception.name || 'DatabaseError',
      message,
      code,
      timestamp: new Date().toISOString(),
    });
  }

  private resolveMongoCodeMessage(code: number): string {
    const mongoErrorMap: Record<number, string> = {
      11000: 'Registro duplicado (clave única).',
      121: 'Violación de validación de esquema.',
      26: 'Colección o base de datos inexistente.',
      50: 'Operación abortada o interrumpida.',
    };

    return mongoErrorMap[code] || 'Error en el servidor de MongoDB.';
  }
}
