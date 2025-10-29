# Frontend del Sistema de Gestión Escolar (En Desarrollo)

Interfaz de usuario construida con Angular para interactuar con la [API REST del Sistema de Gestión Escolar](https://github.com/TU_USUARIO/proyecto-escuela-api). Permite a los administradores gestionar alumnos, profesores, carreras, materias y cursos.

---

## Estado del Proyecto
**Este proyecto está actualmente en desarrollo.** El objetivo es complementar la API backend con una interfaz moderna y funcional, demostrando buenas prácticas en el desarrollo frontend con Angular. La Fase 1 (Panel de Administración) está parcialmente implementada.

---

## Stack Tecnológico
Este proyecto está construido con:
* **Framework:** Angular 20+
* **Lenguaje:** TypeScript
* **UI Kit:** Angular Material
* **Estado:** RxJS
* **Build:** Angular CLI
* **Routing:** Angular Router

---

## Cómo Ejecutarlo Localmente

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/proyecto-escuela-ui.git](https://github.com/TU_USUARIO/proyecto-escuela-ui.git)
    cd proyecto-escuela-ui
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    * Crea un archivo llamado `.env` en la raíz del proyecto.
    * Añade la URL de tu API backend. Por ejemplo:
        ```env
        # .env
        API_URL=http://localhost:8080/api
        ```
    * *(Nota: Necesitarás configurar Angular para que lea este archivo `.env`. Puedes usar paquetes como `@ngx-env/builder` o configurar `angular.json` para reemplazar archivos de entorno)*. Alternativamente, puedes poner la URL directamente en tus servicios por ahora.

4.  **Ejecutar la aplicación (Servidor de Desarrollo):**
    ```bash
    npm start
    ```
    o
    ```bash
    ng serve
    ```
    Abre tu navegador en `http://localhost:4200/`.

5.  **Asegúrate de que el Backend esté Corriendo:** Esta aplicación necesita que la [API Backend](https://github.com/TU_USUARIO/proyecto-escuela-api) esté ejecutándose (probablemente en `http://localhost:8080`).

---

## Funcionalidades (Roadmap)

### Fase 1: Panel de Administración (En Progreso)
- [x] **Autenticación:** Pantalla de Login y redirección basada en token JWT.
- [x] **Layout Principal:** Menú lateral y barra superior para usuarios logueados.
- [x] **Gestión (CRUD) con Formularios en Dialog:**
    - [x] Carreras
    - [x] Alumnos
    - [x] Profesores
    - [x] Materias (Incluyendo asignación a carreras)
    - [x] Cursos
- [ ] **Gestión de Relaciones:**
    - [ ] Inscribir/Dar de baja alumnos en cursos.
- [ ] **Validaciones:** Mejorar validaciones en formularios.

### Fase 2: Portales de Usuario (Pendiente)
- [ ] **Dashboard Profesor:**
    - [ ] Ver sus cursos asignados.
    - [ ] Ver lista de alumnos por curso.
    - [ ] Asignar/Actualizar calificaciones.
- [ ] **Dashboard Alumno:**
    - [ ] Ver su horario.
    - [ ] Ver sus calificaciones.
- [ ] **Pruebas:** Añadir pruebas unitarias y e2e.

---

## 🔗 API Backend

Este es el frontend del sistema escolar. La **API REST (hecha en Spring Boot)** que consume se encuentra en un repositorio separado:
[Ver el repositorio del Backend (API)](https://github.com/TU_USUARIO/proyecto-escuela-api)
