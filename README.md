# Delifood B2B - Sistema Express de Gestión de Pedidos 🍕📦

¡Bienvenido al MVP de **Delifood B2B**! Esta es una aplicación Fullstack diseñada para optimizar y agilizar la cadena de suministro entre restaurantes y proveedores de productos gourmet. El sistema permite registrar pedidos en tiempo real y gestionar sus estados mediante un control de flujo eficiente.

## 🚀 Características del Proyecto (Requerimientos)

- **RF1 - Autenticación Simulada:** Control de acceso con roles diferenciados para el sistema.
  - **Cliente:** Acceso a un panel para levantar órdenes de compra.
  - **Administrador:** Acceso a un panel global para el control y cambio de estados.
- **RF2 - Gestión de Pedidos en Memoria:** Creación, lectura y actualización del estado de los pedidos utilizando estructuras de datos dinámicas (`ArrayList`) en la memoria RAM del servidor (sin necesidad de base de datos externa).
- **Control de Concurrencia (CORS):** Conexión segura configurada entre el servidor de desarrollo del Frontend y la API de Spring Boot.

## 🛠️ Tecnologías Utilizadas

### Backend
- **Java 21**
- **Spring Boot 4.x** (Spring Web, Spring Boot DevTools)
- **Apache Tomcat** (Servidor embebido en el puerto 8080)

### Frontend
- **HTML5 & JavaScript Moderno (Async/Await & Fetch API)**
- **Bootstrap 5** (Diseño responsivo y componentes de interfaz)
- **FontAwesome 4.7** (Iconografía)

---

## 💻 Cómo Ejecutar el Proyecto Localmente

Sigue estos pasos en orden para levantar la aplicación en tu computadora:

### 1. Levantar el Backend (Servidor)
1. Abre el proyecto backend en tu IDE de preferencia (VS Code, STS o IntelliJ).
2. Busca el archivo principal `SistemaExpressDeGestionDePedidosApplication.java`.
3. Haz clic derecho y selecciona **Run As > Spring Boot App** (o presiona el botón de *Play*).
4. El servidor iniciará correctamente en el puerto `http://localhost:8080`.

### 2. Abrir el Frontend (Interfaz)
1. Ve a la carpeta `frontend/` en tu Visual Studio Code.
2. Haz clic derecho sobre el archivo `index.html`.
3. Selecciona **Open with Live Server** (se ejecutará usualmente en el puerto `5500`).

---

## 🔑 Cuentas de Prueba

Para interactuar con los diferentes paneles del sistema, utiliza las siguientes credenciales en la pantalla de inicio de sesión:

| Rol | Usuario | Contraseña |
| :--- | :--- | :--- |
| **Cliente** | `cliente` | `123` |
| **Administrador** | `admin` | `123` |

---
*Proyecto desarrollado como parte del Taller Fullstack - Formato MVP Express.*