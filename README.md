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
docker-compose up -d
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

## Configuración del proyecto


Copia el archivo `.env` que se adjunta en la raíz del proyecto.

---

## Inicializar proyecto

Instala las dependencias:

```bash
npm install
```

Crea el usuario admin:

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
* `npm run se
