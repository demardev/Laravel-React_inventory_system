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
- Dentro del programa debes añadir un producto y un proveedor
- Añadiendo Producto: (Ir a "Agregar producto")
    ![imagen](https://github.com/demardev/Laravel-React_inventory_system/assets/127986092/8a286643-2503-494c-91a3-3565a056405e)
- Añadiendo Proveedor: (Ir a "Agregar Proveedor")
    ![imagen](https://github.com/demardev/Laravel-React_inventory_system/assets/127986092/ebdcae84-2bf1-47da-95fd-434ef2432c8b)
- Crear una transacción: (Ir a "Agregar Transacción")
    ![imagen](https://github.com/demardev/Laravel-React_inventory_system/assets/127986092/75a66f1e-3b11-4426-9a30-85cb47f25b2f)
- Puedes seleccionar cualquiera de los productos que se han agregado.
    ![imagen](https://github.com/demardev/Laravel-React_inventory_system/assets/127986092/283b76e8-e63d-44ad-b54e-d4e430b7e849)
- Puedes seleccionar cualquier proveedor que se han agregado.
    ![imagen](https://github.com/demardev/Laravel-React_inventory_system/assets/127986092/956dd216-dd02-4cfa-b7fe-bd97568372ea)
- Puedes seleccionar una de las transacciones.
    ![imagen](https://github.com/demardev/Laravel-React_inventory_system/assets/127986092/956f0507-e354-406c-aa2a-73c291025bf9)
- Coloca la cantidad de articulos o cajas que se veran afectadas.
    ![imagen](https://github.com/demardev/Laravel-React_inventory_system/assets/127986092/3b6198bf-05de-48bd-8bc1-a8d839fe32d9)
- Guarda la transacción.
- Verificando la transacción: (Ir a "Transacciones")
    ![imagen](https://github.com/demardev/Laravel-React_inventory_system/assets/127986092/d53c4654-850f-4ca8-a681-cedfd50d866e)
- Buscando otras transacciones
    ![imagen](https://github.com/demardev/Laravel-React_inventory_system/assets/127986092/0f6ee825-91a0-40bd-b7df-ab5fca03fc8b)
- Comprobando existencias: (Ir a "Productos")
    ![imagen](https://github.com/demardev/Laravel-React_inventory_system/assets/127986092/b94230ae-2f4a-4b15-b304-b4afee726e20)
- Buscando Existencias de otros productos:
    ![imagen](https://github.com/demardev/Laravel-React_inventory_system/assets/127986092/a7862c8a-4720-435b-bfa9-ab5a98e206b7)

Nota: Solo se muestran los productos que tengan una transacción para poder tener la trazabilidad del proveedor asi como su UCC.

