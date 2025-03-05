# Proyecto de Landing Page en React

Este proyecto consiste en una **Landing Page** interactiva para una tienda de donas. La página está construida con **React** utilizando **Next.js** para la estructuración y optimización de las rutas y el renderizado del lado del servidor. Se implementaron animaciones con **Framer Motion** y se utilizó **Tailwind CSS** para un diseño moderno y responsivo.

## Características principales:
- Diseño responsivo y estilizado con **Tailwind CSS**.
- Uso de componentes de **React** para estructurar la página (Navbar, Footer, etc.).
- Animaciones en la entrada de elementos utilizando **Framer Motion**.
- Funcionalidades interactivas con eventos en **JSX** (por ejemplo, `onClick`).
- Renderizado condicional de contenido según el estado de la aplicación.
- Manejo de estados utilizando el hook **useState**.
- Instalación de **Google Fonts** y **Bootstrap Icons** para una mejor experiencia visual.

## Tecnologías Usadas
- **Next.js**: Framework basado en React para la creación de aplicaciones web con renderizado del lado del servidor y optimización automática.
- **React**: Librería de JavaScript para construir interfaces de usuario interactivas.
- **Tailwind CSS**: Framework de CSS de bajo nivel que permite construir interfaces rápidamente con clases utilitarias.
- **Framer Motion**: Biblioteca para animaciones y transiciones fluidas.
- **Google Fonts**: Fuentes personalizadas para mejorar la tipografía de la página.
- **Bootstrap Icons**: Iconos listos para usar que mejoran la estética y la usabilidad.

Ejecución del Proyecto
Para iniciar el servidor de desarrollo, ejecuta el siguiente comando:

npm run dev
# o
yarn dev

Esto abrirá el servidor en http://localhost:3000, donde podrás ver el resultado en tu navegador.

Estructura del Proyecto
La estructura básica del proyecto es la siguiente:


Uso de Tailwind CSS
Se instaló Tailwind CSS para la gestión de los estilos. Puedes personalizar el diseño mediante clases de Tailwind directamente en los componentes de React. Asegúrate de que el archivo globals.css esté configurado correctamente para incluir las directivas de Tailwind:

/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

Uso de Google Fonts
Se utilizaron fuentes personalizadas con el siguiente enlace de Google Fonts en el archivo _document.js para optimizar la carga de las fuentes:

<link
  href="https://fonts.googleapis.com/css2?family=Pacifico&family=Lilita+One&display=swap"
  rel="stylesheet"
/>

Animaciones con Framer Motion
Se implementaron animaciones en los componentes con Framer Motion para hacer la página más atractiva. Un ejemplo de animación de entrada de un componente:


<motion.div 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 0.5 }}
>
  <img src="/donut-4.png" alt="Donut" />
</motion.div>

Alumna: Ponce Virginia Alejandra