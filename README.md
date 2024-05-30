# Sistema de Gestión de Inventario

Este proyecto es un Sistema de Gestión de Inventario para una bodega, desarrollado con Laravel 11 para el backend y React con Bootstrap para el frontend. Permite a los usuarios gestionar productos, proveedores y transacciones de manera eficiente.

## Características

- Registro de todas las transacciones (entradas, salidas, ajustes).
- Consulta de la existencia de cualquier producto en cualquier momento.
- Trazabilidad de cada entrada al inventario, incluyendo el proveedor del producto.
- Registro de la fecha y hora de creación de las transacciones, así como el usuario que las realizó.
- Validación del número de UCC de cada caja para que no se repita y tenga 12 cifras.

## Prerrequisitos

- PHP 7.3 o superior
- Composer
- Node.js y npm
- MySQL Preferible XAMPP

## Instalación

Punto importante:
- Descargar e instalar XAMPP: 
https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.2.12/xampp-windows-x64-8.2.12-0-VS16-installer.exe
- Ejecutar XAMPP e inicializar el servicio de Apache y MySql.
- Entrar a http://localhost/phpmyadmin/ en el navegador
- Crear la base de datos en phpMyAdmin con nombre "inventory"
![imagen](https://github.com/demardev/Laravel-React_inventory_system/assets/127986092/db5eeb00-a436-41de-a4ac-b8fa10a4945b)
    
1. Clonar el repositorio:
    ```bash
    git clone https://github.com/demardev/Laravel-React_inventory_system.git
    cd Laravel-React_inventory_system
    ```

2. Configuración del backend (Laravel):

    a. Instalar dependencias:
    ```bash
    cd backend
    composer install
    ```
    
    b. Copiar `.env.example` a `.env` y actualizar las variables de entorno, especialmente la configuración de la base de datos:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
    Actualizando variables:
    >>backend/.env
    ![imagen](https://github.com/demardev/Laravel-React_inventory_system/assets/127986092/8961c09c-9b85-4ddf-88cf-b744d4cf28bc)
    Descomentar y configurar:
    ![imagen](https://github.com/demardev/Laravel-React_inventory_system/assets/127986092/00ad6e4d-307d-4951-8dfc-70e1eef0209a)

    c. Ejecutar las migraciones:
    ```bash
    php artisan migrate
    ```

    d. Agregar registros a la base de datos:
    ```bash
    php artisan db:seed
    ```

4. **Configuración del frontend (React):**

    a. Instalar dependencias:
    ```bash
    cd ../frontend
    npm install
    ```

5. **Ejecutar ambos servidores simultáneamente:**

    En el directorio raíz del proyecto, usar `concurrently` para iniciar ambos servidores:
    ```bash
    cd..
    npm start
    ```

## Uso

- Abre tu navegador y navega a `http://localhost:3000` para acceder al frontend.
- La API del backend estará disponible en `http://localhost:8000`.
