import Formula from './Formula';

const Practica = () => {
  return (
    <div className="teoria-container" style={{ padding: '10px 20px', lineHeight: '1.7', color: '#334155' }}>
      
      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '30px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ marginTop: 0, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
          Ejercicios Resueltos Paso a Paso
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
      <p>Con el vector inicial <Formula>{String.raw`x^{(0)} = [0, 0, 0]^T`}</Formula></p>
      <p><strong>Objetivo:</strong> Verificar la convergencia y realizar 3 iteraciones por Jacobi y Gauss-Seidel.</p>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a', marginTop: '40px' }}>
        Paso 1: Verificación de la Convergencia
      </h3>
      <p>
        Para asegurar la convergencia, la matriz de coeficientes debe ser diagonalmente dominante. 
        Comprobamos que el elemento de la diagonal sea mayor o igual a la suma de los valores absolutos del resto de la fila:
      </p>
      <ul style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '20px 40px', borderRadius: '8px' }}>
        <li><strong>Fila 1:</strong> <Formula>{String.raw`|3| \geq |1| + |1| \Rightarrow 3 \geq 2`}</Formula> &nbsp;&nbsp;<span style={{ color: '#166534', fontWeight: 'bold' }}>✓ Cumple</span></li>
        <li><strong>Fila 2:</strong> <Formula>{String.raw`|5| \geq |2| + |1| \Rightarrow 5 \geq 3`}</Formula> &nbsp;&nbsp;<span style={{ color: '#166534', fontWeight: 'bold' }}>✓ Cumple</span></li>
        <li><strong>Fila 3:</strong> <Formula>{String.raw`|3| \geq |-1| + |1| \Rightarrow 3 \geq 2`}</Formula> &nbsp;&nbsp;<span style={{ color: '#166534', fontWeight: 'bold' }}>✓ Cumple</span></li>
      </ul>
      <p>Al ser diagonalmente dominante, tenemos garantía total de que los métodos van a converger.</p>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a', marginTop: '40px' }}>
        Paso 2: Resolución por Método de Jacobi
      </h3>
      <p>
        Despejamos cada variable (<code>x</code>, <code>y</code>, <code>z</code>) de su respectiva ecuación:
      </p>
      <div style={{ background: '#eff6ff', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <Formula display>{String.raw`\begin{aligned} x^{(k)} &= \frac{1}{3}\left[4 - y^{(k-1)} - z^{(k-1)}\right] \\ y^{(k)} &= \frac{1}{5}\left[-1 - 2x^{(k-1)} - z^{(k-1)}\right] \\ z^{(k)} &= \frac{1}{3}\left[4 + x^{(k-1)} - y^{(k-1)}\right] \end{aligned}`}</Formula>
      </div>

      <h4>Iteración 1 (k=1)</h4>
      <p>Sustituimos <code>x=0, y=0, z=0</code> (del vector inicial):</p>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><Formula>{String.raw`x^{(1)} = \frac{1}{3}[4 - 0 - 0] = \frac{4}{3} \approx 1.3333`}</Formula></li>
        <li><Formula>{String.raw`y^{(1)} = \frac{1}{5}[-1 - 2(0) - 0] = -\frac{1}{5} = -0.2000`}</Formula></li>
        <li><Formula>{String.raw`z^{(1)} = \frac{1}{3}[4 - 0 - 0] = \frac{4}{3} \approx 1.3333`}</Formula></li>
      </ul>

      <h4>Iteración 2 (k=2)</h4>
      <p>Sustituimos <code>x=4/3, y=-1/5, z=4/3</code>:</p>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><Formula>{String.raw`x^{(2)} = \frac{1}{3}\left[4 - \left(-\frac{1}{5}\right) - \frac{4}{3}\right] = 0.9555`}</Formula></li>
        <li><Formula>{String.raw`y^{(2)} = \frac{1}{5}\left[-1 - 2\left(\frac{4}{3}\right) - \frac{4}{3}\right] = -1.0000`}</Formula></li>
        <li><Formula>{String.raw`z^{(2)} = \frac{1}{3}\left[4 + \frac{4}{3} - \left(-\frac{1}{5}\right)\right] = 1.8444`}</Formula></li>
      </ul>

      <h4>Iteración 3 (k=3)</h4>
      <p>Sustituimos los resultados de <code>k=2</code>:</p>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><Formula>{String.raw`x^{(3)} = \frac{1}{3}[4 - (-1) - 1.84] = 1.053`}</Formula></li>
        <li><Formula>{String.raw`y^{(3)} = \frac{1}{5}[-1 - 2(0.95) - 1.84] = -0.948`}</Formula></li>
        <li><Formula>{String.raw`z^{(3)} = \frac{1}{3}[4 + 0.95 - (-1)] = 1.983`}</Formula></li>
      </ul>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a', marginTop: '40px' }}>
        Paso 3: Resolución por Método de Gauss-Seidel
      </h3>
      <p>
        Las ecuaciones son las mismas, pero utilizamos el valor <strong>recién calculado</strong> inmediatamente. Observa los superíndices:
      </p>
      <div style={{ background: '#fdf4ff', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <Formula display>{String.raw`\begin{aligned} x^{(k)} &= \frac{1}{3}\left[4 - y^{(k-1)} - z^{(k-1)}\right] \\ y^{(k)} &= \frac{1}{5}\left[-1 - 2x^{(k)} - z^{(k-1)}\right] \quad \text{(usa la nueva }x\text{)} \\ z^{(k)} &= \frac{1}{3}\left[4 + x^{(k)} - y^{(k)}\right] \quad \text{(usa las nuevas }x\text{ e }y\text{)} \end{aligned}`}</Formula>
      </div>

      <h4>Iteración 1 (k=1)</h4>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><Formula>{String.raw`x^{(1)} = \frac{1}{3}[4 - 0 - 0] = \mathbf{1.3333}`}</Formula></li>
        <li><Formula>{String.raw`y^{(1)} = \frac{1}{5}[-1 - 2(1.3333) - 0] = \mathbf{-0.7333}`}</Formula></li>
        <li><Formula>{String.raw`z^{(1)} = \frac{1}{3}[4 + 1.3333 - (-0.7333)] = \mathbf{2.0222}`}</Formula></li>
      </ul>
      <p><em>(Nota: Los valores difieren ligeramente del PDF original porque allí se utilizan fracciones redondeadas prematuramente, pero la esencia del algoritmo es esta actualización en cascada).</em></p>

      <h4>Iteración 2 (k=2)</h4>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><Formula>{String.raw`x^{(2)} = \frac{1}{3}[4 - (-0.7333) - 2.0222] = \mathbf{0.9037}`}</Formula></li>
        <li><Formula>{String.raw`y^{(2)} = \frac{1}{5}[-1 - 2(0.9037) - 2.0222] = \mathbf{-0.9659}`}</Formula></li>
        <li><Formula>{String.raw`z^{(2)} = \frac{1}{3}[4 + 0.9037 - (-0.9659)] = \mathbf{1.9565}`}</Formula></li>
      </ul>

      <h4>Iteración 3 (k=3)</h4>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><Formula>{String.raw`x^{(3)} = \frac{1}{3}[4 - (-0.9659) - 1.9565] = \mathbf{1.0031}`}</Formula></li>
        <li><Formula>{String.raw`y^{(3)} = \frac{1}{5}[-1 - 2(1.0031) - 1.9565] = \mathbf{-0.9925}`}</Formula></li>
        <li><Formula>{String.raw`z^{(3)} = \frac{1}{3}[4 + 1.0031 - (-0.9925)] = \mathbf{1.9985}`}</Formula></li>
      </ul>

      <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '15px', borderRadius: '8px', marginTop: '30px' }}>
        <strong>Conclusión del Ejercicio:</strong><br/>
        La solución exacta del sistema es <Formula>{String.raw`x=1,\ y=-1,\ z=2`}</Formula>. Como se puede observar en los cálculos detallados, en tan solo 3 iteraciones el método de Gauss-Seidel logra valores sumamente cercanos a la respuesta real <Formula>{String.raw`(1.003,\ -0.992,\ 1.998)`}</Formula>, demostrando ser significativamente más rápido que Jacobi.
      </div>
    </div>
  );
};

export default Practica;
