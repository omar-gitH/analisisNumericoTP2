import { useState, useEffect } from 'react';
import './Sidebar.css';

function Sidebar() {
  const [seccionActiva, setSeccionActiva] = useState('teoria');

  useEffect(() => {
    const sections = ['teoria', 'practica', 'calculadora', 'quiz']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Si la sección cruza la mitad de la pantalla, la marcamos como activa
          if (entry.isIntersecting) {
            setSeccionActiva(entry.target.id);
          }
        });
      },
      {
        // Se activa cuando el elemento está en la mitad vertical de la pantalla
        rootMargin: '-50% 0px -50% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      // Si el usuario llega al final absoluto de la página, forzamos la última sección
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 5) {
        setSeccionActiva('quiz');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Solo aplica para pantallas móviles donde el menú es desplazable horizontalmente
    if (window.innerWidth <= 768) {
      const activeLink = document.querySelector('.nav-link.active');
      const navMenu = document.querySelector('.nav-menu');
      
      if (activeLink && navMenu) {
        const navRect = navMenu.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        
        // Calcula la posición para centrar el elemento activo en la barra
        const offset = linkRect.left + navMenu.scrollLeft - navRect.left - (navRect.width / 2) + (linkRect.width / 2);
        
        navMenu.scrollTo({
          left: offset,
          behavior: 'smooth'
        });
      }
    }
  }, [seccionActiva]);

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
