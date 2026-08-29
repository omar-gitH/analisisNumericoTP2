import { useState } from 'react';
import './Sidebar.css'; // Asegúrate de importar tus estilos

function Sidebar() {
  // El estado guarda el nombre del enlace seleccionado (por defecto vacío o el inicial)
  const [seccionActiva, setSeccionActiva] = useState('');

  const manejarClic = (seccion) => {
    setSeccionActiva(seccion);
  };

  return (
    <nav className="sidebar">
      {/* Enlace 1: Práctica */}
      <a 
        className={`nav-link ${seccionActiva === 'practica' ? 'activo' : ''}`} 
        href="#practica"
        onClick={() => manejarClic('practica')}
      >
        Práctica
      </a>

      {/* Enlace 2: Otro ejemplo para que veas cómo alternan */}
      <a 
        className={`nav-link ${seccionActiva === 'teoria' ? 'activo' : ''}`} 
        href="#teoria"
        onClick={() => manejarClic('teoria')}
      >
        Teoría
      </a>
    </nav>
  );
}

export default Sidebar;

