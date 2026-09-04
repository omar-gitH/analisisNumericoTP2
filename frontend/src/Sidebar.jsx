import { useState } from 'react';
import './Sidebar.css';

function Sidebar() {
  const [seccionActiva, setSeccionActiva] = useState('teoria');

  const manejarClic = (seccion) => {
    setSeccionActiva(seccion);
  };

  return (
    <nav className="sidebar">
      <div className="brand">
        <div className="brand-mark">AN</div>
        <div>
          <strong>Análisis Numérico</strong>
          <small>Jacobi y Gauss-Seidel</small>
        </div>
      </div>

      <div className="nav-menu">
        <a 
          className={`nav-link ${seccionActiva === 'teoria' ? 'active' : ''}`} 
          href="#teoria"
          onClick={() => manejarClic('teoria')}
        >
          📘 Teoría
        </a>

        <a 
          className={`nav-link ${seccionActiva === 'practica' ? 'active' : ''}`} 
          href="#practica"
          onClick={() => manejarClic('practica')}
        >
          📝 Ejercicios
        </a>

        <a 
          className={`nav-link ${seccionActiva === 'calculadora' ? 'active' : ''}`} 
          href="#calculadora"
          onClick={() => manejarClic('calculadora')}
        >
          🧮 Calculadora
        </a>

        <a 
          className={`nav-link ${seccionActiva === 'quiz' ? 'active' : ''}`} 
          href="#quiz"
          onClick={() => manejarClic('quiz')}
        >
          🎯 Quiz
        </a>
      </div>
    </nav>
  );
}

export default Sidebar;
