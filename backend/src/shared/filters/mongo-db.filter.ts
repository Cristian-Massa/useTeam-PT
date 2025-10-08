import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import { Response } from 'express';

interface MongoErrorInfo {
  message: string;
  status: number;
}

@Injectable()
@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(MongoExceptionFilter.name);

  // 🔍 Mapa de códigos de error → mensaje + status HTTP
  private readonly errorMap: Record<number, MongoErrorInfo> = {
    11000: {
      message: 'El registro ya existe (violación de clave única).',
      status: HttpStatus.CONFLICT, // 409
    },
    121: {
      message: 'El documento no cumple las reglas de validación del esquema.',
      status: HttpStatus.UNPROCESSABLE_ENTITY, // 422
    },
    8000: {
      message: 'Error de autenticación con la base de datos.',
      status: HttpStatus.UNAUTHORIZED, // 401
    },
    2: {
      message: 'Error genérico de sintaxis o comando en MongoDB.',
      status: HttpStatus.BAD_REQUEST,
    },
    9: {
      message: 'Error de bloqueo o concurrencia en la base de datos.',
      status: HttpStatus.CONFLICT,
    },
    26: {
      message: 'La colección o base de datos no existe.',
      status: HttpStatus.NOT_FOUND,
    },
    50: {
      message: 'Operación abortada o interrumpida.',
      status: HttpStatus.REQUEST_TIMEOUT,
    },
    59: {
      message: 'Error de lectura o escritura en la base de datos.',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    },
    91: {
      message: 'El servidor MongoDB no está disponible o no acepta conexiones.',
      status: HttpStatus.SERVICE_UNAVAILABLE,
    },
  };

  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const code = exception.code ?? 0;
    const mappedError = this.errorMap[code];

    const message =
      mappedError?.message || 'Error desconocido en la base de datos.';
    const status = mappedError?.status || HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(`MongoError [${code}]: ${exception.message}`);

    response.status(status).json({
      statusCode: status,
      error: 'DatabaseError',
      message,
      code,
      timestamp: new Date().toISOString(),
    });
  }
}
