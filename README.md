# Puntored Backend

Proyecto backend para la gestión de pagos y usuarios.

## Requisitos

* Node.js
* npm
* Docker y Docker Compose instalados en tu sistema

---

## Levantar la base de datos

Desde la carpeta del proyecto, ejecuta:

```bash
docker compose up -d
```

Esto levantará los siguientes servicios:

* **MySQL**: puerto `3306`
* **PHPMyAdmin**: puerto `8080`

### Credenciales por defecto

* Root: `root123`
* Base de datos: `puntored`
* Usuario app: `appuser`
* Contraseña app: `app123`

---

## Configurar permisos para Prisma (shadow database)

1. Conéctate al MySQL como root:

```bash
docker compose exec mysql mysql -u root -p
```

* Ingresa la contraseña: `root123`

2. Ejecuta los siguientes comandos dentro de MySQL:

```sql
GRANT ALL PRIVILEGES ON *.* TO 'appuser'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
```

Esto permite que Prisma pueda crear la **shadow database** y ejecutar migraciones.

---

## Configuración del proyecto

Copia el archivo `.env` que se adjunta en la raíz del proyecto.

Contenido mínimo recomendado:

```env
DATABASE_URL="mysql://appuser:app123@localhost:3306/puntored"
SHADOW_DATABASE_URL="mysql://appuser:app123@localhost:3306/prisma_shadow"
JWT_SECRET="puntoRedSupersecreto123"
```

---

## Inicializar proyecto

1. Instala las dependencias:

```bash
npm install
```

2. Ejecuta las migraciones para crear las tablas:

```bash
npx prisma migrate dev --name init
```

> ⚠️ Alternativa rápida en desarrollo:
>
> ```bash
> npx prisma db push
> ```
>
> Esto crea las tablas directamente sin usar shadow database.

3. Crear el usuario admin y datos iniciales:

```bash
npm run seed
```

### Credenciales admin por defecto

* Username: `admin`
* Password: `admin123`

---

## Correr la API en desarrollo

```bash
npm run start:dev
```

La API estará disponible en: [http://localhost:3000/v1](http://localhost:3000/v1)

---

## Ejecutar tests

```bash
npm run test
```

---

## Scripts disponibles

* `npm run build` - Construir el proyecto
* `npm run start` - Iniciar la API
* `npm run start:dev` - Iniciar en modo desarrollo
* `npm run test` - Ejecutar pruebas unitarias
* `npm run seed` - Insertar datos iniciales
