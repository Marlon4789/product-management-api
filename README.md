# ProductAPI - Gestión de Productos con Spring Boot

![Estado del Proyecto](https://img.shields.io/badge/Status-Completo-lightgrey?logo=github&logoColor=black)
![Java](https://img.shields.io/badge/Java-17-lightgrey?logo=java&logoColor=orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.0-lightgrey?logo=spring&logoColor=green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-lightgrey?logo=postgresql&logoColor=blue)
![Frontend](https://img.shields.io/badge/HTML%2CCSS%2CJS-lightgrey?logo=html5&logoColor=orange)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-lightgrey?logo=bootstrap&logoColor=purple)
---

### 🌐 Demo Online

La aplicación está desplegada en **Railway** y puedes probarla directamente en tu navegador:

[**Acceder a ProductAPI**](https://productapi-abc123.up.railway.app)

> Aquí podrás ver el dashboard interactivo, realizar operaciones CRUD y explorar la API REST.

---

## **Descripción del proyecto**

**ProductAPI** es una API REST para la gestión de productos, desarrollada con **Spring Boot**, que permite realizar operaciones de **CRUD** (Crear, Leer, Actualizar y Eliminar) sobre productos.  
Incluye un **dashboard interactivo** para visualizar, filtrar y administrar productos de manera rápida y dinámica, con buena experiencia de usuario (UI/UX).

Este proyecto está pensado tanto para **aprendizaje** como para mostrar capacidades de desarrollo backend y frontend integradas.

---

## **Características principales**

- CRUD completo de productos:
    - Crear nuevos productos
    - Listar todos los productos con paginación
    - Actualizar información de productos existentes
    - Eliminar productos
- Dashboard interactivo con:
    - Interfaz clara y amigable
    - Paginación y filtrado de productos
    - Estilos responsivos con CSS y Bootstrap
- Manejo de excepciones y errores
- Configuración segura de base de datos con PostgreSQL
- Separación de capas (Arquitectura en capas):
    - **Controller** → gestión de endpoints
    - **Service** → lógica de negocio
    - **Repository** → acceso a datos
    - **DTOs** → transferencia de datos entre capas
    - **Exception Handling** → manejo global de errores
- Integración de frontend y backend sin recargar la página (AJAX + JavaScript)

---

## **Tecnologías utilizadas**

| Capa | Tecnología |
|------|------------|
| Backend | Java 17, Spring Boot 3.2, Spring Data JPA, Hibernate |
| Base de datos | PostgreSQL 15 |
| Frontend | HTML, CSS, JavaScript, Bootstrap |
| Herramientas | Git, GitHub, Maven, Visual Studio Code / IntelliJ |
| Arquitectura | API REST, arquitectura en capas, DTOs, manejo de excepciones |

---

## **Estructura del proyecto**

```text
productapi/
│
├─ src/main/java/com/learnigJava/productapi/
│   ├─ controller/        → Endpoints REST
│   ├─ service/           → Lógica de negocio
│   ├─ repository/        → Acceso a base de datos
│   ├─ model/             → Entidades JPA
│   ├─ dto/               → Data Transfer Objects
│   ├─ exception/         → Manejo de errores
│   └─ config/            → Configuraciones generales
│
├─ src/main/resources/
│   ├─ static/
│   │   ├─ css/           → Estilos
│   │   ├─ js/            → Scripts frontend
│   │   └─ index.html     → Dashboard principal
│   └─ application.properties → Configuración de Spring Boot y BD
│
└─ pom.xml                → Dependencias y plugins Maven
```
---
### Buenas prácticas aplicadas

- Separación clara de responsabilidades (Controller, Service, Repository)

- Uso de DTOs para no exponer entidades directamente

- Manejo de errores centralizado con GlobalExceptionHandler

- Configuración de propiedades sensibles en application.properties

- Frontend dinámico sin recargar la página (AJAX + Fetch API)

- Código modular y comentado, fácil de mantener y escalar

## **Cómo ejecutar el proyecto**

### Prerrequisitos

- Java 17 o superior
- Maven
- PostgreSQL
- Git

### Pasos

1. Clonar el repositorio:

```bash
git clone https://github.com/TU_USUARIO/productapi.git
cd productapi
```
2. Configurar la base de datos en application.properties:
```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/productdb
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_PASSWORD
```
3. Ejecutar la aplicación:
```bash
mvn spring-boot:run
```

4. Acceder al dashboard:
```bash
http://localhost:8080
```
---
### Licencia

Este proyecto está bajo la licencia MIT.