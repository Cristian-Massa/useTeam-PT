# Proyecto Fullstack con N8N y MongoDB

Este proyecto integra **backend, frontend, base de datos MongoDB** y **N8N** para automatización de flujos de trabajo. Se ejecuta completamente con Docker para facilitar su despliegue.

---

## Requisitos

- [Node.js](https://nodejs.org/) >= 18.x
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)
- Conexión a internet para descargar imágenes de Docker

---

## Variables de entorno

Copia el archivo `.env.example` a `.env` en la raíz del proyecto y completa los valores:

```env
#Base de datos
MONGODB_URI=

#Backend
BACK_PORT=
N8N_WEBHOOK_URL=
JWT_REFRESH_SECRET=
JWT_ACCESS_SECRET=

#Frontend
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_WS_URL=
FRONT_PORT=

#Database Manager (Mongo Express)
MONGO_EXPRESS_USER=
MONGO_EXPRESS_PASSWORD=
MONGO_EXPRESS_PORT=
MONGO_HOST=
MONGO_PORT=

#N8N
N8N_BASIC_AUTH_ACTIVE=
N8N_BASIC_AUTH_USER=
N8N_BASIC_AUTH_PASSWORD=
N8N_HOST=
N8N_PORT=
N8N_PROTOCOL=
NODE_ENV=
WEBHOOK_URL=
GENERIC_TIMEZONE=
EXECUTIONS_DATA_SAVE_ON_ERROR=
EXECUTIONS_DATA_SAVE_ON_SUCCESS=
EXECUTIONS_DATA_PRUNE=
EXECUTIONS_DATA_MAX_AGE=
```

Todos estos valores se encuentran en el archivo .env en la raíz del proyecto.

Inicialización con Docker

Desde la carpeta raíz del proyecto, ejecuta:

npm run docker:init

Esto hará lo siguiente:

Levantar todos los contenedores necesarios:

## MongoDB

## Mongo Express

## Backend

## Frontend

## N8N

Leer automáticamente las variables del .env

Para detener los contenedores:

## docker-compose down

N8N - Configuración de Flujos

Abre N8N en el puerto configurado en tu .env (N8N_PORT y N8N_PROTOCOL).

Copia el flujo JSON que proporcionaste en N8N.

Configura los pasos según tus necesidades.

Agrega un paso adicional al final para notificaciones, puede ser cualquiera que prefieras (por ejemplo:

Enviar email

Notificación por Slack

Webhook a otro sistema)

## Notas

Asegúrate de que los puertos definidos en .env no estén siendo usados por otros servicios.

Los contenedores utilizan los valores de .env directamente, así que cualquier cambio debe hacerse allí y reiniciar Docker.

El flujo de N8N debe configurarse manualmente después de copiar el JSON inicial.

Backend y frontend estarán disponibles en los puertos definidos en .env.
