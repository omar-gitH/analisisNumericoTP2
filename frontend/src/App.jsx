import './App.css';
import Sidebar from './Sidebar';
import Teoria from './Teoria';
import Practica from './Practica';
import Calculadora from './Calculadora';

function App() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <section id="teoria" className="section-card">
          <span className="section-tag">Teoría</span>
          <Teoria />
        </section>

        <section id="practica" className="section-card">
          <span className="section-tag">Práctica (Ejercicios)</span>
          <Practica />
        </section>

        <section id="calculadora" className="section-card">
          <span className="section-tag">Calculadora</span>
          <Calculadora />
        </section>
      </main>
    </div>
  );
}

export default App;
