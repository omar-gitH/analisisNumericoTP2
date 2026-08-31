import React from 'react';

const Practica = () => {
  return (
    <div className="teoria-container" style={{ padding: '10px 20px', lineHeight: '1.7', color: '#334155' }}>
      
      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '30px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ marginTop: 0, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>📝</span> Ejercicios Resueltos Paso a Paso
        </h2>
        <p style={{ color: '#475569', margin: '0 0 15px 0' }}>
          A continuación, desarrollamos a todo lujo de detalle el problema planteado en el PDF, desglosando las fórmulas algebraicas utilizadas para ambos métodos.
        </p>
      </div>

      <h3 style={{ color: '#0f172a' }}>Problema Planteado</h3>
      <p>Dado el siguiente sistema de ecuaciones lineales:</p>
      <pre style={{ background: '#f8fafc', borderLeft: '4px solid #94a3b8', padding: '15px', borderRadius: '4px', fontSize: '1.1rem' }}>
        3x +  y +  z =  4{'\n'}
        2x + 5y +  z = -1{'\n'}
        -x +  y + 3z =  4
      </pre>
      <p>Con el vector inicial <code>x<sup>(0)</sup> = [0, 0, 0]<sup>T</sup></code></p>
      <p><strong>Objetivo:</strong> Verificar la convergencia y realizar 3 iteraciones por Jacobi y Gauss-Seidel.</p>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a', marginTop: '40px' }}>
        Paso 1: Verificación de la Convergencia
      </h3>
      <p>
        Para asegurar la convergencia, la matriz de coeficientes debe ser diagonalmente dominante. 
        Comprobamos que el elemento de la diagonal sea mayor o igual a la suma de los valores absolutos del resto de la fila:
      </p>
      <ul style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '20px 40px', borderRadius: '8px' }}>
        <li><strong>Fila 1:</strong> |3| &ge; |1| + |1| &rarr; 3 &ge; 2 &nbsp;&nbsp;<span style={{ color: '#166534', fontWeight: 'bold' }}>✓ Cumple</span></li>
        <li><strong>Fila 2:</strong> |5| &ge; |2| + |1| &rarr; 5 &ge; 3 &nbsp;&nbsp;<span style={{ color: '#166534', fontWeight: 'bold' }}>✓ Cumple</span></li>
        <li><strong>Fila 3:</strong> |3| &ge; |-1| + |1| &rarr; 3 &ge; 2 &nbsp;&nbsp;<span style={{ color: '#166534', fontWeight: 'bold' }}>✓ Cumple</span></li>
      </ul>
      <p>Al ser diagonalmente dominante, tenemos garantía total de que los métodos van a converger.</p>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a', marginTop: '40px' }}>
        Paso 2: Resolución por Método de Jacobi
      </h3>
      <p>
        Despejamos cada variable (<code>x</code>, <code>y</code>, <code>z</code>) de su respectiva ecuación:
      </p>
      <div style={{ background: '#eff6ff', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '1.1rem', marginBottom: '20px' }}>
        x<sup>(k)</sup> = 1/3 [ 4 - y<sup>(k-1)</sup> - z<sup>(k-1)</sup> ]<br/><br/>
        y<sup>(k)</sup> = 1/5 [-1 - 2x<sup>(k-1)</sup> - z<sup>(k-1)</sup> ]<br/><br/>
        z<sup>(k)</sup> = 1/3 [ 4 - (-x<sup>(k-1)</sup>) - y<sup>(k-1)</sup> ]
      </div>

      <h4>Iteración 1 (k=1)</h4>
      <p>Sustituimos <code>x=0, y=0, z=0</code> (del vector inicial):</p>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><code>x<sup>(1)</sup> = 1/3 [4 - (0) - (0)] = 4/3 &asymp; 1.3333</code></li>
        <li><code>y<sup>(1)</sup> = 1/5 [-1 - 2(0) - (0)] = -1/5 = -0.2000</code></li>
        <li><code>z<sup>(1)</sup> = 1/3 [4 - (0) - (0)] = 4/3 &asymp; 1.3333</code></li>
      </ul>

      <h4>Iteración 2 (k=2)</h4>
      <p>Sustituimos <code>x=4/3, y=-1/5, z=4/3</code>:</p>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><code>x<sup>(2)</sup> = 1/3 [4 - (-1/5) - (4/3)] = 0.9555</code></li>
        <li><code>y<sup>(2)</sup> = 1/5 [-1 - 2(4/3) - (4/3)] = -1.0000</code></li>
        <li><code>z<sup>(2)</sup> = 1/3 [4 + (4/3) - (-1/5)] = 1.8444</code></li>
      </ul>

      <h4>Iteración 3 (k=3)</h4>
      <p>Sustituimos los resultados de <code>k=2</code>:</p>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><code>x<sup>(3)</sup> = 1/3 [4 - (-1) - 1.84] = 1.053</code></li>
        <li><code>y<sup>(3)</sup> = 1/5 [-1 - 2(0.95) - 1.84] = -0.948</code></li>
        <li><code>z<sup>(3)</sup> = 1/3 [4 + 0.95 - (-1)] = 1.983</code></li>
      </ul>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a', marginTop: '40px' }}>
        Paso 3: Resolución por Método de Gauss-Seidel
      </h3>
      <p>
        Las ecuaciones son las mismas, pero utilizamos el valor <strong>recién calculado</strong> inmediatamente. Observa los superíndices:
      </p>
      <div style={{ background: '#fdf4ff', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '1.1rem', marginBottom: '20px' }}>
        x<sup>(k)</sup> = 1/3 [ 4 - y<sup>(k-1)</sup> - z<sup>(k-1)</sup> ]<br/><br/>
        y<sup>(k)</sup> = 1/5 [-1 - 2x<sup>(k)</sup> - z<sup>(k-1)</sup> ] &nbsp;&nbsp;&nbsp;&nbsp;&lt;-- Usa la nueva X<br/><br/>
        z<sup>(k)</sup> = 1/3 [ 4 - (-x<sup>(k)</sup>) - y<sup>(k)</sup> ] &nbsp;&nbsp;&nbsp;&nbsp;&lt;-- Usa la nueva X e Y
      </div>

      <h4>Iteración 1 (k=1)</h4>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><code>x<sup>(1)</sup> = 1/3 [4 - (0) - (0)] = <strong>1.3333</strong></code></li>
        <li><code>y<sup>(1)</sup> = 1/5 [-1 - 2(<strong>1.3333</strong>) - (0)] = <strong>-0.7333</strong></code></li>
        <li><code>z<sup>(1)</sup> = 1/3 [4 + <strong>1.3333</strong> - (<strong>-0.7333</strong>)] = <strong>2.0222</strong></code></li>
      </ul>
      <p><em>(Nota: Los valores difieren ligeramente del PDF original porque allí se utilizan fracciones redondeadas prematuramente, pero la esencia del algoritmo es esta actualización en cascada).</em></p>

      <h4>Iteración 2 (k=2)</h4>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><code>x<sup>(2)</sup> = 1/3 [4 - (-0.7333) - (2.0222)] = <strong>0.9037</strong></code></li>
        <li><code>y<sup>(2)</sup> = 1/5 [-1 - 2(0.9037) - 2.0222] = <strong>-0.9659</strong></code></li>
        <li><code>z<sup>(2)</sup> = 1/3 [4 + 0.9037 - (-0.9659)] = <strong>1.9565</strong></code></li>
      </ul>

      <h4>Iteración 3 (k=3)</h4>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><code>x<sup>(3)</sup> = 1/3 [4 - (-0.9659) - 1.9565] = <strong>1.0031</strong></code></li>
        <li><code>y<sup>(3)</sup> = 1/5 [-1 - 2(1.0031) - 1.9565] = <strong>-0.9925</strong></code></li>
        <li><code>z<sup>(3)</sup> = 1/3 [4 + 1.0031 - (-0.9925)] = <strong>1.9985</strong></code></li>
      </ul>

      <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '15px', borderRadius: '8px', marginTop: '30px' }}>
        <strong>🏁 Conclusión del Ejercicio:</strong><br/>
        La solución exacta del sistema es <code>x=1, y=-1, z=2</code>. Como se puede observar en los cálculos detallados, en tan solo 3 iteraciones el método de Gauss-Seidel logra valores sumamente cercanos a la respuesta real (1.003, -0.992, 1.998), demostrando ser significativamente más rápido que Jacobi.
      </div>
    </div>
  );
};

export default Practica;
