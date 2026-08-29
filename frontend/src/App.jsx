import './App.css';
import BarraLateral from './barra_lateral';

function App() {
  return (
    <div className="app-shell">
      <BarraLateral />

      <main className="main-content">
        <section id="teoria" className="section-card">
          <span className="section-tag">Teoría</span>
          <h1>Teoría</h1>
          <p>
            Aquí se desarrollará la explicación de los métodos de Jacobi y
            Gauss-Seidel, incluyendo convergencia, condiciones de aplicación y
            fundamentos matemáticos.
          </p>
        </section>

        <section id="practica" className="section-card">
          <span className="section-tag">Práctica</span>
          <h2>Práctica</h2>
          <p>
            En esta sección se incluirán ejercicios, ejemplos numéricos y
            herramientas para resolver sistemas lineales de forma interactiva.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
