# 🦸‍♂️ Proyecto Sprint 5 - Gestor de Superhéroes (Frontend + Backend)

## 📌 Descripción

Aplicación fullstack que permite gestionar una base de datos de superhéroes. Se pueden **crear**, **leer**, **editar** y **eliminar** héroes mediante una interfaz moderna y fácil de usar.  
Incluye alertas de confirmación, notificaciones visuales, navegación entre páginas y validaciones de formularios.

---

## 🧰 Tecnologías utilizadas

### 🔙 Backend (Node.js + Express + MongoDB)

- **Node.js**: Entorno de ejecución de JavaScript.
- **Express**: Framework para crear APIs RESTful.
- **MongoDB**: Base de datos NoSQL.
- **Mongoose**: Modelado de datos para MongoDB.
- **EJS** *(en versiones anteriores)*: Motor de plantillas para SSR.
- **dotenv**: Variables de entorno.
- **Morgan**: Logging de peticiones.
- **CORS**: Habilitación de solicitudes cross-origin.

### 🔮 Frontend (React + Vite)

- **React**: Librería para crear interfaces de usuario.
- **Vite**: Empaquetador rápido para desarrollo de proyectos frontend.
- **TailwindCSS**: Framework de estilos utilitario.
- **React Router DOM**: Ruteo con páginas dinámicas.
- **Axios**: Cliente HTTP para hacer peticiones a la API.
- **SweetAlert2**: Alertas modernas para confirmaciones.
- **react-toastify**: Notificaciones visuales.
- **Context API**: Manejo de estado global.

---

## 🔄 Funcionalidades implementadas

- 🧾 **Listado de superhéroes**
- 🔍 **Vista detallada de cada superhéroe**
- ➕ **Creación de nuevos héroes**
- ✏️ **Edición de héroes existentes**
- 🗑️ **Eliminación con confirmación (SweetAlert2)**
- ✅ **Formularios controlados con validación**
- 🔔 **Notificaciones visuales (react-toastify)**
- 🔗 **Navegación programática entre vistas**
- ♻️ **Consumo de API REST desde MockAPI o backend propio**
- 📦 **Organización modular por componentes, hooks y contextos**

---

## 🧭 Rutas definidas

| Ruta               | Descripción                                      |
|--------------------|--------------------------------------------------|
| `/`                | Página de bienvenida                             |
| `/heroes`          | Listado general de superhéroes                   |
| `/heroes/:id`      | Detalle de un superhéroe                         |
| `/heroes/create`   | Formulario para crear nuevo superhéroe           |
| `/heroes/:id/edit` | Formulario para editar un superhéroe existente   |
| `*`                | Página 404                                       |

---
## 📦 Instalar dependencias
npm install

## ▶️ Ejecutar frontend
npm run dev

## 🌐 Demo
💡 Link Netlify:

## 🧑‍💻 Autor
Nombre: Virginia Alejandra Ponce