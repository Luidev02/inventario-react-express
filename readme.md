# 📦 Sistema de Inventario

Este es un sistema de inventario diseñado para la gestión de activos, usuarios, departamentos y mantenimientos dentro de una empresa.

## 🚀 Características Principales
- **Gestión de usuarios** con roles diferenciados (Admin, Operario, Supervisor)
- **Administración de activos** con información detallada y escaneo QR
- **Mantenimiento y soporte técnico** con registro de historial
- **Reportes avanzados** con filtros y exportación
- **Interfaz moderna** con React + Tailwind CSS
- **API externa** para la gestión de soporte
- **Registro de cambios (Audit Log)**

## 📂 Estructura de Rutas

### 🔑 **Autenticación**
- `/login` → Ingreso al sistema (roles: Admin, Operario, Supervisor)

### 📊 **Dashboard**
- `/dashboard` → Estadísticas y últimas modificaciones

### 🏢 **Gestión de Departamentos**
- `/dashboard/departamentos` → Listado de departamentos
- `/dashboard/departamentos/nuevo` → Crear un nuevo departamento
- `/dashboard/departamentos/:id` → Ver y actualizar información del departamento

### 👔 **Gestión de Cargos**
- `/dashboard/cargos` → Listado de cargos
- `/dashboard/cargos/nuevo` → Crear un nuevo cargo
- `/dashboard/cargos/:id` → Ver y actualizar información del cargo

### 👥 **Gestión de Usuarios**
- `/dashboard/usuarios` → Listado de usuarios
- `/dashboard/usuarios/nuevo` → Crear un nuevo usuario
- `/dashboard/usuarios/:id` → Ver usuario (incluye historial de activos asignados)

### 📦 **Gestión de Activos**
- `/dashboard/activos` → Listado de activos (con filtros, buscador, lector QR)
- `/dashboard/activos/nuevo` → Crear un nuevo activo
- `/dashboard/activos/:id` → Ver información del activo (QR, documentos, historial, usuario a cargo)
- `/dashboard/activos/:id/actualizar` → Actualizar información del activo

### 🛠 **Gestión de Mantenimientos**
- `/dashboard/mantenimientos` → Listado de mantenimientos (filtros, QR)
- `/dashboard/mantenimientos/nuevo` → Crear un nuevo mantenimiento
- `/dashboard/mantenimientos/:id` → Ver y actualizar información del mantenimiento

### 🔧 **Gestión de Soporte**
- `/dashboard/soportes` → Listado de soportes (filtros, QR)
- `/dashboard/soportes/nuevo` → Crear un nuevo soporte (API externa soportada)
- `/dashboard/soportes/:id` → Ver información del soporte y finalizarlo

### 📈 **Reportes**
- `/dashboard/reportes` → Panel de reportes
- `/dashboard/reportes/inventario` → Reporte del inventario con filtros
- `/dashboard/reportes/usuarios` → Reporte de usuarios con filtros
- `/dashboard/reportes/mantenimientos` → Reporte de mantenimientos con filtros

## 🔒 **Roles y Permisos**
- **Admin:** Acceso total a todas las secciones
- **Operario:** Gestión de activos, mantenimientos y soporte
- **Supervisor:** Acceso a reportes y estadísticas, sin modificar datos

## ⚙️ **Futuras Mejoras**
- **Notificaciones automáticas** para mantenimientos pendientes
- **Soporte multi-empresa**
- **Exportación de reportes en Excel y PDF**

## 📌 **Tecnologías Utilizadas**
- **Frontend:** React + Tailwind CSS
- **Backend:** Express.js + MySQL
- **Autenticación:** JWT 
- **Contenedores:** Docker
- **Base de Datos:** MySQL con ORM Sequelize

---
