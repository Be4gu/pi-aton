# Documentación de Piñaton

## Descripción general

Piñaton es una aplicación web desarrollada con Next.js que permite a los usuarios explorar perfiles de profesionales que ofrecen servicios relacionados con piñatas y contratarlos. La aplicación cuenta con autenticación mediante Twitch, un sistema de reseñas, y una base de datos PostgreSQL para almacenar la información de perfiles y reseñas.

## Estructura del proyecto

El proyecto sigue una estructura basada en la arquitectura de Next.js App Router:

```
my-app/
├── public/            # Archivos estáticos (imágenes, placeholders)
├── src/
│   ├── app/           # Rutas y páginas de la aplicación
│   ├── components/    # Componentes reutilizables
│   ├── context/       # Contextos de React
│   ├── data/          # Datos estáticos
│   └── lib/           # Utilidades y modelos para la base de datos
├── auth.js            # Configuración de autenticación
└── middleware.js      # Middleware de Next.js
```

## Configuración principal

### Archivos de configuración

- **auth.js**: Configuración principal de NextAuth.js con proveedor de Twitch.
- **middleware.js**: Middleware de Next.js para proteger rutas.
- **next.config.mjs**: Configuración de Next.js, incluye dominios permitidos para imágenes.
- **package.json**: Dependencias y scripts de la aplicación.
- **tailwind.config.mjs**: Configuración de Tailwind CSS con tema personalizado.
- **.env.local**: Variables de entorno (NEXTAUTH_SECRET, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET).

## Autenticación

La autenticación se implementa usando NextAuth.js con el proveedor de Twitch:

- **auth.js**: Exporta handlers, funciones de autenticación y callbacks.
- **src/app/api/auth/[...nextauth]/route.js**: Endpoint de API para autenticación.
- **src/context/AuthContext.jsx**: Proveedor de contexto para la sesión de usuario.
- **src/components/auth/LoginButton.jsx**: Botón para iniciar/cerrar sesión.
- **src/app/auth/signin/page.jsx**: Página de inicio de sesión personalizada.
- **src/app/auth/error/page.jsx**: Página de error de autenticación.

## Páginas principales

### Home (`src/app/page.js`)

Página de inicio que presenta la plataforma con:

- Descripción de servicios
- Secciones destacadas
- Eventos futuros
- Llamadas a la acción

### Tienda (`src/app/tienda/page.js`)

Muestra un listado de perfiles de profesionales con:

- Tarjetas con información básica
- Valoraciones
- Precios
- Enlaces a perfiles detallados

### Perfil detallado (`src/app/profiles/[id]/page.js`)

Muestra información detallada de un profesional:

- Galería de imágenes
- Información del profesional
- Sistema de valoraciones y reseñas
- Modal de contacto

## Componentes principales

### UI base (`src/components/ui/`)

- **button.jsx**: Componente de botón personalizado
- **card.jsx**: Tarjetas para mostrar información
- **sheet.jsx**: Panel lateral para menú móvil

### Perfil (`src/components/profile/`)

- **ProfileHeader.jsx**: Cabecera de perfil con información principal
- **ProfileGallery.jsx**: Galería de imágenes del profesional
- **ReviewCard.jsx**: Tarjeta para mostrar reseñas
- **ImagePreview.jsx**: Vista previa ampliada de imágenes
- **ContactModal.jsx**: Modal de contacto

### Navegación

- **navbar.jsx**: Barra de navegación con menú móvil y botones de autenticación

## API

La API sigue la estructura de rutas de Next.js:

### Perfiles (`src/app/api/profiles/`)

- **route.js**: GET (listar perfiles), POST (crear perfil)
- **[id]/route.js**: GET (obtener perfil), PUT (actualizar), DELETE (eliminar)

### Reseñas (`src/app/api/reviews/`)

- **route.js**: GET (listar reseñas por perfil), POST (crear reseña)

## Base de datos

Se utiliza PostgreSQL a través de la librería `pg`. Los modelos se encuentran en `src/lib/models/`:

- **profiles.js**: Gestiona los perfiles de profesionales
- **reviews.js**: Gestiona las reseñas de los usuarios

### Estructura de las tablas

#### Perfiles

```sql
CREATE TABLE IF NOT EXISTS profiles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price VARCHAR(50) NOT NULL,
  rating DECIMAL(3,1) NOT NULL,
  reviews INTEGER NOT NULL,
  reliability DECIMAL(3,2) NOT NULL,
  completed_orders INTEGER NOT NULL,
  images TEXT[] NOT NULL,
  badges TEXT[] NOT NULL
);
```

#### Reseñas

```sql
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  profile_id VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Estilos

Se utiliza Tailwind CSS con un tema personalizado definido en:

- **tailwind.config.mjs**: Configuración de colores y temas
- **src/app/globals.css**: Estilos globales y variables CSS

## Flujo de la aplicación

1. El usuario accede a la página principal donde ve información sobre los servicios
2. Navega a la página de tienda para ver los perfiles disponibles
3. Selecciona un perfil para ver más detalles
4. Puede iniciar sesión con Twitch para dejar reseñas
5. Puede contactar con el profesional a través del modal de contacto

## Configuración para desarrollo

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Crear archivo `.env.local` con las variables necesarias:

```
NEXTAUTH_SECRET=your_secret_key
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_CLIENT_SECRET=your_twitch_client_secret
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your_postgres_connection_string
```

4. Iniciar servidor de desarrollo: `npm run dev`
5. Acceder a http://localhost:3000

## Solución de problemas comunes

### Error de autenticación "MissingSecret"

Asegúrate de que la variable `NEXTAUTH_SECRET` esté correctamente definida en `.env.local` y que el servidor se haya reiniciado después de modificar las variables de entorno.

### Problemas con las credenciales de Twitch

Si has regenerado las credenciales de Twitch en el panel de desarrollador, actualiza `TWITCH_CLIENT_ID` y `TWITCH_CLIENT_SECRET` en `.env.local`.

### Error "Module not found" en rutas de importación

Verifica las rutas de importación. Para importaciones desde la raíz del proyecto fuera de `src`, usa rutas relativas ascendentes adecuadas (`../../../../../`).

## Consideraciones para producción

1. Generar un `NEXTAUTH_SECRET` seguro con `openssl rand -base64 32`
2. Configurar correctamente las URLs de callback en el panel de desarrollador de Twitch
3. Configurar variables de entorno en el proveedor de hosting
