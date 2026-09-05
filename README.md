# Análisis Numérico - Trabajo Práctico 2 (Jacobi y Gauss-Seidel)

¡Bienvenido al proyecto interactivo para el aprendizaje y resolución de sistemas de ecuaciones lineales mediante métodos iterativos! Esta aplicación fue diseñada como una herramienta educativa e interactiva para explorar los métodos de **Jacobi** y **Gauss-Seidel**.

## 📖 ¿Qué hace esta página?
Esta plataforma web proporciona un entorno completo donde estudiantes y entusiastas del Análisis Numérico pueden:
1. **Aprender la teoría**: Comprender los fundamentos de los métodos iterativos, la importancia de la dominancia diagonal y las fórmulas matemáticas subyacentes.
2. **Resolver sistemas reales (Calculadora)**: Una potente calculadora interactiva que permite ingresar sistemas de ecuaciones de hasta 5x5 para visualizar cómo convergen paso a paso.
3. **Ponerse a prueba (Quiz)**: Un desafío de preguntas teóricas y prácticas contrarreloj para asentar los conocimientos.

## ⚙️ ¿Cómo funciona?

### 1. Sección de Teoría y Fórmulas
La página cuenta con una sección dedicada a la teoría matemática. Utiliza **KaTeX** para renderizar fórmulas matemáticas avanzadas directamente en el navegador de manera nítida. Aquí se explica paso a paso de dónde salen las fórmulas de iteración de Jacobi y Gauss-Seidel a partir de la descomposición de matrices (L, D, U).

### 2. Calculadora Iterativa
La calculadora es el núcleo funcional del proyecto:
- **Flexibilidad**: Permite configurar el tamaño del sistema desde $2 \times 2$ hasta $5 \times 5$.
- **Criterios de Parada**: El usuario puede decidir si detener el algoritmo por:
  - Una cantidad fija de iteraciones ($k$).
  - Una tolerancia de error definida (Norma Euclídea).
  - Ambas restricciones al mismo tiempo (lo que ocurra primero).
- **Protección**: La matriz evalúa automáticamente la *dominancia diagonal* (condición suficiente para garantizar la convergencia) y aplica medidas de seguridad. Si el sistema diverge en modo de tolerancia, el sistema corta automáticamente al alcanzar las 1000 iteraciones para proteger el navegador y el dispositivo.
- **Validación Estricta**: No se permiten errores tipográficos; las celdas de las matrices están sanitizadas para evitar el ingreso de letras o números fraccionarios inválidos, asegurando que los cálculos siempre se realicen sobre coeficientes enteros precisos.
- **Análisis Comparativo**: Muestra simultáneamente los resultados de Jacobi y Gauss-Seidel para comprobar empíricamente cuál de los dos converge más rápido. Las iteraciones se agrupan en un panel con *scroll* para evitar que interfaces muy largas afecten la experiencia del usuario.

### 3. Modo Práctica (Quiz)
Una sección de gamificación donde el usuario responde preguntas de opción múltiple:
- Interfaz dinámica con un reloj interactivo (cuenta regresiva).
- Barra visual que decrece y cambia de color a rojo (modo crítico) cuando queda poco tiempo.
- *Feedback* instantáneo al seleccionar una opción.

## 🛠️ Tecnologías y Construcción
Este proyecto está desarrollado bajo el ecosistema de JavaScript moderno y construido para ser fluido y adaptable (*responsive*):
- **React.js**: Framework principal para crear componentes reactivos, manejar el estado de la calculadora y lograr transiciones instantáneas sin recargar la página.
- **Vite**: Herramienta de construcción (bundler) ultrarrápida.
- **CSS3 Vanilla**: Estilización a medida sin depender fuertemente de librerías externas para lograr un diseño "Glassmorphism" limpio y profesional.
- **KaTeX**: Motor de renderizado matemático (a través de `react-katex`) rápido y confiable.

## 🚀 Guía de Instalación (Para Principiantes)

Si nunca has usado React o no tienes conocimientos de programación web, ¡no te preocupes! Sigue estos pasos exactos para ver el proyecto funcionando en tu computadora:

### Paso 1: Instalar Node.js
Para que la página pueda construirse localmente, necesitas un entorno llamado Node.js.
1. Entra a [nodejs.org](https://nodejs.org/).
2. Descarga la versión **LTS** (Recomendada para la mayoría de los usuarios).
3. Instálalo como cualquier otro programa (dando siempre a "Siguiente").

### Paso 2: Descargar (Clonar) este proyecto
Necesitas tener los archivos del proyecto en tu computadora. Puedes hacerlo de dos formas:
- **Opción A (Git)**: Si tienes Git instalado, abre una terminal o línea de comandos y ejecuta:
  ```bash
  git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
  ```
  *(Asegúrate de cambiar la URL por la de tu repositorio).*
- **Opción B (ZIP)**: Ve al botón verde que dice **"Code"** en la parte superior derecha de GitHub, selecciona **"Download ZIP"** y descomprime el archivo en una carpeta de tu computadora.

### Paso 3: Abrir la consola en la carpeta correcta
1. Abre tu terminal (Símbolo del sistema, PowerShell o la terminal de VS Code).
2. Tienes que "navegar" hasta donde está el código de la página. Escribe `cd` seguido de la ruta hacia la carpeta `frontend`. Por ejemplo:
   ```bash
   cd ruta/a/tu/carpeta/analisisNumericoTP2/frontend
   ```

### Paso 4: Instalar las dependencias
React y las herramientas matemáticas usan paquetes adicionales que deben descargarse. En la consola (asegurándote de que estás dentro de la carpeta `frontend`), escribe el siguiente comando y presiona Enter:
```bash
npm install
```
*Espera un par de minutos a que se descargue todo. Verás que se crea una carpeta llamada `node_modules`.*

### Paso 5: ¡Ejecutar el proyecto!
Una vez que terminó la instalación, escribe:
```bash
npm run dev
```
La consola te mostrará un mensaje indicando que el servidor local está activo. Además, verás un enlace que generalmente es `http://localhost:5173`. 
- Mantén pulsada la tecla `Ctrl` y haz clic en ese enlace, o cópialo y pégalo en tu navegador (Chrome, Edge, Firefox).

¡Listo! Ya puedes disfrutar e interactuar con el simulador de Análisis Numérico de forma local.

---
*Desarrollado para la materia de Análisis Numérico.*
