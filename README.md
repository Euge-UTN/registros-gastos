# TP3: Aplicación de Control de Gastos

Es una aplicación en React para llevar un registro organizado de las finanzas personales de manera rápida y eficiente. Este sistema web interactivo tiene como objetivo centralizar la carga de los movimientos diarios, calcular los montos totales de forma automática y permitir un seguimiento claro del presupuesto según la categoría que se quiera revisar.

---

## Qué hace la aplicación

* **Gestión de gastos:** Permite al usuario registrar nuevos gastos, visualizar el listado completo en tiempo real, editar cualquier campo en caso de error y eliminar los registros que ya no necesite.
* **Cálculo de totales:** Procesa automáticamente los montos cargados y muestra la suma total acumulada en un panel de resumen.
* **Filtrado dinámico:** Incluye un selector por categorías que permite segmentar los gastos visualizados, facilitando el control y análisis del presupuesto.

---

## Cómo se ejecuta

Para poner en marcha el proyecto de manera local, debemos levantar tanto el servidor de datos (backend) como la interfaz de usuario (frontend). Para esto, es necesario abrir dos terminales separadas, ya que el sistema está dividido en dos capas independientes que corren en procesos distintos y deben comunicarse entre sí en tiempo real.

Los comandos que se ejecutan en la terminal dentro de la carpeta raíz son los siguientes:

1. `npm install`  
   (para descargar e instalar todas las dependencias necesarias del proyecto).
2. `npm run server`  
   (en la primera terminal, para iniciar el servidor local que procesa la lógica de datos y simula la base de datos donde se guardan los gastos. Esta consola debe quedar abierta para mantener el servicio activo).
3. `npm run dev`  
   (en una segunda terminal en paralelo, para iniciar el servidor de desarrollo de React que renderiza la interfaz visual).

Al tratarse de dos servicios de Node.js que funcionan en puertos diferentes de la computadora, no pueden compartir la misma consola; si se cierra o se corta la terminal del servidor, la pantalla de React se quedará sin conexión y no podrá procesar ninguna acción. Una vez que ambos procesos estén activos, se puede acceder a la aplicación ingresando en el navegador a la dirección local que indique la consola.

---

## Qué conceptos de React se utilizaron

* **Componentes funcionales y modularización:** La interfaz se dividió en secciones independientes para lograr un código limpio y ordenado, donde cada parte tiene una tarea específica:
  * `GastoForm`: Contiene el formulario encargado de la captura de datos. Se encarga de validar los campos e interactuar tanto con la creación de nuevos gastos como con la edición de registros existentes.
  * `GastoList`: Se encarga de renderizar la estructura general de la tabla o listado con todos los gastos cargados. Incluye el selector de categorías para filtrar lo que se muestra en pantalla y coordina la lista general.
  * `GastoItem`: Representa cada fila o tarjeta de gasto de forma individual dentro de la lista. Recibe la información de un único gasto como propiedad y maneja los botones específicos para activar su edición o eliminación.
  * `Resumen`: Un componente dedicado exclusivamente al procesamiento de los datos financieros. Recibe la lista de gastos y calcula automáticamente los montos totales para mostrarlos de forma clara al usuario.

* **Manejo de Estado (useState):** Se utilizó para almacenar y actualizar toda la información dinámica de la app, como el array con la lista de gastos, la categoría seleccionada en el filtro y el objeto que se está editando.

* **Pasaje de Propiedades (Props) y Estado Compartido:** Se emplearon para comunicar los componentes, permitiendo enviar datos y funciones controladoras (como agregar, editar o eliminar) desde el componente principal (App.jsx) hacia sus componentes hijos, manteniendo un flujo de datos unidireccional estructurado.

* **Renderizado dinámico de listas:** Uso de métodos de JavaScript (como .map() y .filter()) para recorrer los arrays de datos, filtrar los elementos según la selección del usuario y renderizarlos dinámicamente en la pantalla.