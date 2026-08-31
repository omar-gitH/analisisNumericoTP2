import React from 'react';

const Teoria = () => {
  return (
    <div className="teoria-container" style={{ padding: '10px 20px', lineHeight: '1.7', color: '#334155' }}>
      
      <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
        Los métodos iterativos son herramientas poderosas para resolver sistemas de ecuaciones lineales muy grandes. 
        A diferencia de la eliminación gaussiana clásica que encuentra la solución exacta en un número finito de pasos, 
        <strong>estos métodos parten de una conjetura inicial y la mejoran progresivamente</strong> hasta alcanzar un nivel de precisión deseado.
      </p>

      <div style={{ backgroundColor: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '15px 20px', borderRadius: '0 8px 8px 0', marginBottom: '30px' }}>
        <h4 style={{ color: '#0369a1', marginTop: 0 }}>🧠 ¿Por qué usar métodos iterativos?</h4>
        <p style={{ margin: 0 }}>
          En el mundo real (como en simulaciones de fluidos o problemas de redes), las matrices suelen tener miles de ecuaciones pero están llenas de ceros (<strong>matrices dispersas</strong>). 
          Los métodos iterativos como Jacobi y Gauss-Seidel son ideales porque no modifican la matriz original y ahorran muchísima memoria RAM.
        </p>
      </div>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a' }}>1. La Condición de Oro: Matriz Diagonalmente Dominante</h3>
      <p>
        Para que un método iterativo funcione y no se aleje de la respuesta correcta (divergencia), necesitamos que la matriz del sistema esté bien balanceada. 
        Esto se garantiza cuando la matriz es <strong>diagonalmente dominante</strong>.
      </p>
      
      <div style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '20px', borderRadius: '12px', textAlign: 'center', margin: '20px 0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#475569' }}>Fórmula de Dominancia Diagonal por Filas</p>
        <code style={{ fontSize: '1.2rem', color: '#1d4ed8', background: '#eff6ff', padding: '5px 15px', borderRadius: '6px' }}>
          |a<sub>ii</sub>| &ge; &sum; |a<sub>ij</sub>| &nbsp;&nbsp;<span style={{ fontSize: '0.9rem', color: '#64748b' }}>(para j &ne; i)</span>
        </code>
        <p style={{ margin: '15px 0 0 0', fontSize: '0.95rem' }}>
          <strong>En lenguaje simple:</strong> El número que está en la diagonal de una fila debe ser más "pesado" (en valor absoluto) que la suma de todos los demás números de esa misma fila juntos.
        </p>
      </div>

      <p style={{ fontStyle: 'italic', color: '#64748b' }}>
        <strong>Nota de cátedra:</strong> Esta condición es <em>suficiente pero no necesaria</em>. Es decir, si se cumple, el éxito está asegurado al 100%. Pero si no se cumple, ¡el método aún podría funcionar de pura suerte!
      </p>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a', marginTop: '40px' }}>2. El Método de Jacobi (Actualización Simultánea)</h3>
      <p>
        En el método de Jacobi, se despeja la variable principal de cada ecuación. Durante cada iteración, se calcula un <strong>nuevo conjunto de valores</strong> 
        utilizando exclusivamente los valores de la <strong>iteración anterior</strong>.
      </p>
      <ul style={{ paddingLeft: '20px', color: '#475569' }}>
        <li>💡 <strong>Ventaja:</strong> Es extremadamente fácil de paralelizar en computadoras modernas (usando placas de video / GPUs), ya que el cálculo de cada variable no depende de las demás en la misma iteración.</li>
        <li>🐢 <strong>Desventaja:</strong> Suele converger más lento que otros métodos.</li>
      </ul>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a', marginTop: '40px' }}>3. El Método de Gauss-Seidel (Actualización Sucesiva)</h3>
      <p>
        Gauss-Seidel es una mejora directa e inteligente sobre Jacobi. En lugar de esperar a que termine toda la ronda para actualizar los valores, 
        <strong>Gauss-Seidel usa los valores nuevos inmediatamente</strong> apenas son calculados.
      </p>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        <div style={{ flex: 1, background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <strong>Cómo piensa Jacobi:</strong><br/>
          "Calculo <code>y</code> usando la <code>x</code> vieja."
        </div>
        <div style={{ flex: 1, background: '#f0fdf4', padding: '15px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
          <strong>Cómo piensa Gauss-Seidel:</strong><br/>
          "Como ya acabo de calcular una nueva <code>x</code> que es más exacta, voy a usarla ya mismo para calcular <code>y</code>."
        </div>
      </div>
      <p style={{ marginTop: '20px' }}>
        Al retroalimentar el sistema con la información más fresca al instante, Gauss-Seidel generalmente <strong>converge al resultado mucho más rápido</strong> y en menos iteraciones.
      </p>

    </div>
  );
};

export default Teoria;
