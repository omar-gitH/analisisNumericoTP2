import Formula from './Formula';

const Teoria = () => {
  const copyToClipboard = (text) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Prompt copiado al portapapeles');
      }).catch(() => {
        alert('No se pudo copiar el prompt');
      });
    } else {
      try {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        alert('Prompt copiado al portapapeles');
      } catch {
        alert('No se pudo copiar el prompt');
      }
    }
  };

  return (
    <div className="teoria-container" style={{ padding: '10px 20px', lineHeight: '1.7', color: '#334155' }}>
      
      <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
        Los métodos iterativos buscan resolver un sistema de ecuaciones mediante aproximaciones sucesivas. 
        <strong> Se comienza con una estimación inicial y, en cada iteración, se obtiene una aproximación mejor </strong> 
        hasta que el resultado alcanza la precisión que necesitamos.
        A diferencia de los <strong>métodos directos</strong>, 
        que siguen un procedimiento definido para obtener la solución en una cantidad finita de pasos, 
        los métodos iterativos refinan progresivamente una solución aproximada hasta alcanzar un resultado suficientemente preciso. 
        </p>

      <div style={{ backgroundColor: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '15px 20px', borderRadius: '0 8px 8px 0', marginBottom: '30px' }}>
        <h4 style={{ color: '#0369a1', marginTop: 0 }}> ¿Por qué usar métodos iterativos?</h4>
        <p style={{ margin: 0 }}>
          En el mundo real (como en simulaciones de fluidos o problemas de redes), las matrices suelen tener miles de ecuaciones pero están llenas de ceros (<strong>matrices dispersas</strong>). 
          Los métodos iterativos como Jacobi y Gauss-Seidel son ideales porque no modifican la matriz original y ahorran muchísima memoria RAM.
        </p>
      </div>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a' }}>1. Matriz Diagonalmente Dominante</h3>
      <p> Para que un método iterativo converja hacia la solución del sistema y no se aleje de ella (divergencia), 
        es importante que la matriz del sistema cumpla ciertas condiciones. Una de las más utilizadas es que la matriz sea
        <strong> diagonalmente dominante</strong>, es decir, que en cada fila el valor absoluto del elemento de la diagonal principal 
        sea mayor que la suma de los valores absolutos de los demás elementos de esa fila. 
      </p>
      
      <div style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '20px', borderRadius: '12px', textAlign: 'center', margin: '20px 0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#475569' }}>Fórmula de Dominancia Diagonal por Filas</p>
        <Formula display>{String.raw`|a_{ii}| \geq \sum_{j \neq i} |a_{ij}|`}</Formula>
        <p style={{ margin: '15px 0 0 0', fontSize: '0.95rem' }}>
          <strong>En lenguaje simple:</strong> El número que está en la diagonal de una fila debe ser más "pesado" (en valor absoluto) que la suma de todos los demás números de esa misma fila juntos.
        </p>
      </div>

      <p style={{ fontStyle: 'italic', color: '#64748b' }}>
        <strong>Nota de cátedra:</strong> Esta condición es <em>suficiente pero no necesaria</em>. Es decir, si se cumple, el éxito está asegurado al 100%. Pero si no se cumple, ¡el método aún podría funcionar de pura suerte!
      </p>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a', marginTop: '40px' }}>2. El Método de Jacobi (Actualización Simultánea)</h3>
      <p>
        En el método de Jacobi, se despeja la variable principal de cada ecuación. Durante cada iteración, se calcula un <strong>nuevo conjunto de valores </strong> 
        utilizando exclusivamente los valores de la <strong>iteración anterior</strong>.
      </p>
      <ul style={{ paddingLeft: '20px', color: '#475569' }}>
        <li><strong>Ventaja:</strong> Es extremadamente fácil de paralelizar en computadoras modernas (usando placas de video / GPUs),
         ya que el cálculo de cada variable no depende de las demás en la misma iteración.</li>
        <li><strong>Desventaja:</strong> Suele converger más lento que otros métodos.</li>
      </ul>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a', marginTop: '40px' }}>3. El Método de Gauss-Seidel (Actualización Sucesiva)</h3>
      <p>
        Gauss-Seidel es una variante del método de Jacobi que utiliza los valores actualizados durante la misma iteración. En lugar de esperar a que termine toda la ronda para actualizar los valores, 
        <strong> Gauss-Seidel usa los valores nuevos inmediatamente</strong> apenas son calculados.
      </p>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        <div style={{ flex: 1, background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <strong>Cómo piensa Jacobi:</strong><br/>
          "Calculo cada variable usando únicamente los valores de la iteración anterior"
        </div>
        <div style={{ flex: 1, background: '#f0fdf4', padding: '15px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
          <strong>Cómo piensa Gauss-Seidel:</strong><br/>
          "Como ya acabo de calcular una nueva variable que es más exacta, voy a usarla inmediatamente para calcular la otra variable."
        </div>
      </div>
      <p style={{ marginTop: '20px' }}>
        Al retroalimentar el sistema con la información más fresca al instante, Gauss-Seidel generalmente 
        <strong> alcanza la convergencia en menos iteraciones que Jacobi</strong>.
      </p>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a', marginTop: '40px' }}>Concepto de Convergencia</h3>
      <p>
        Un método iterativo converge cuando la sucesión de vectores de aproximación <Formula>{String.raw`x^{(k)}`}</Formula> se acerca a la solución exacta <Formula>x</Formula> del sistema conforme aumenta <Formula>k</Formula>.
        En la práctica se verifica que la diferencia entre iteraciones sucesivas decrece y tiende a cero bajo la norma elegida.
      </p>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a', marginTop: '30px' }}>Concepto de Error y Tolerancia</h3>
      <p>
        En los métodos iterativos, el <strong>error verdadero</strong> sería la diferencia entre la aproximación obtenida y la solución exacta. 
        Como normalmente no conocemos esa solución, en la práctica utilizamos la <strong>diferencia entre dos iteraciones sucesivas</strong> como una medida del cambio producido:
      </p>
      <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <Formula display>{String.raw`\lVert x^{(k)} - x^{(k-1)} \rVert_2 = \sqrt{\sum_{i=1}^{n} \left(x_i^{(k)} - x_i^{(k-1)}\right)^2}`}</Formula>
      </div>
      <p>
        La <strong>tolerancia</strong> es un umbral pequeño que usamos para decidir que el error es suficientemente pequeño y podemos detener las iteraciones. Por ejemplo, si la norma euclídea es menor que la tolerancia elegida, se considera que el método ha convergido.
      </p>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a', marginTop: '30px' }}>Criterio de Parada</h3>
      <p>
        Los criterios de parada más comunes son:
      </p>
      <ul style={{ paddingLeft: '20px', color: '#475569' }}>
        <li><strong>Máximo de iteraciones:</strong> detener tras un número prefijado de iteraciones.</li>
        <li><strong>Tolerancia sobre la norma:</strong> detener cuando la norma euclídea de la diferencia entre iteraciones sea menor que la tolerancia (p. ej. <Formula>{String.raw`\lVert x^{(k)} - x^{(k-1)} \rVert_2 < \text{tolerancia}`}</Formula>).</li>
        <li><strong>Combinado:</strong> detener cuando se cumple la tolerancia o se alcanza el máximo de iteraciones.</li>
      </ul>

      <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a', marginTop: '30px' }}>Comparativa: Jacobi vs Gauss–Seidel</h3>
      <div style={{ overflowX: 'auto', marginTop: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #e2e8f0' }}>Característica</th>
              <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #e2e8f0' }}>Jacobi</th>
              <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #e2e8f0' }}>Gauss–Seidel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Actualización</td>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Simultánea: usa únicamente la iteración anterior</td>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Inmediata: usa valores nuevos dentro de la misma iteración</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Convergencia típica</td>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Más lenta; puede requerir más iteraciones</td>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Suele converger más rápido</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Paralelización</td>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Fácil de paralelizar (cada variable independiente)</td>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Menos paralelizable por dependencia en la misma iteración</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Uso práctico</td>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Útil cuando se dispone de recursos paralelos</td>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Preferido cuando se busca rapidez en pocas iteraciones</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{ borderTop: '2px solid #e2e8f0', paddingTop: '20px', color: '#0f172a', marginTop: '30px' }}>Bibliografía para aprender y estudiar</h3>

      <div style={{ display: 'grid', gap: '20px', marginTop: '15px' }}>
        <div style={{ background: '#fff', border: '1px solid #e6eef8', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ marginTop: 0 }}>Prompts para ChatGPT</h4>
          <p style={{ margin: '8px 0' }}>Usa los botones "Copiar" para pegar el prompt en ChatGPT.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <strong>Prompt 1 — Fundamentos</strong>
              <pre style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', whiteSpace: 'pre-wrap' }}>
"Explicame desde cero los métodos iterativos para resolver sistemas de ecuaciones lineales, enfocándote en los métodos de Jacobi y Gauss-Seidel. Explicá con lenguaje sencillo qué problema resuelven, qué significa una iteración, qué es un vector inicial, cómo se despejan las incógnitas y qué significa que un método converja. Utilizá ejemplos numéricos sencillos y explicá cada paso sin asumir conocimientos avanzados."
              </pre>
              <button onClick={() => copyToClipboard("Explicame desde cero los métodos iterativos para resolver sistemas de ecuaciones lineales, enfocándote en los métodos de Jacobi y Gauss-Seidel. Explicá con lenguaje sencillo qué problema resuelven, qué significa una iteración, qué es un vector inicial, cómo se despejan las incógnitas y qué significa que un método converja. Utilizá ejemplos numéricos sencillos y explicá cada paso sin asumir conocimientos avanzados.")}>Copiar Prompt 1</button>
            </div>

            <div>
              <strong>Prompt 2 — Jacobi vs. Gauss-Seidel</strong>
              <pre style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', whiteSpace: 'pre-wrap' }}>
"Explicame detalladamente el método de Jacobi y el método de Gauss-Seidel para resolver sistemas de ecuaciones lineales. Mostrá las fórmulas generales, explicá cómo se obtiene cada nueva aproximación y resolvé un mismo sistema mediante ambos métodos para poder compararlos. En particular, explicá claramente la diferencia entre utilizar valores de la iteración anterior (Jacobi) y utilizar inmediatamente los valores recién calculados (Gauss-Seidel). Incluí un ejemplo paso a paso."
              </pre>
              <button onClick={() => copyToClipboard("Explicame detalladamente el método de Jacobi y el método de Gauss-Seidel para resolver sistemas de ecuaciones lineales. Mostrá las fórmulas generales, explicá cómo se obtiene cada nueva aproximación y resolvé un mismo sistema mediante ambos métodos para poder compararlos. En particular, explicá claramente la diferencia entre utilizar valores de la iteración anterior (Jacobi) y utilizar inmediatamente los valores recién calculados (Gauss-Seidel). Incluí un ejemplo paso a paso.")}>Copiar Prompt 2</button>
            </div>

            <div>
              <strong>Prompt 3 — Convergencia, error y criterio de parada</strong>
              <pre style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', whiteSpace: 'pre-wrap' }}>
"Explicame cómo se determina si los métodos de Jacobi y Gauss-Seidel convergen y cuándo se deben detener las iteraciones. Explicá el concepto de matriz diagonalmente dominante y cómo verificarlo en un sistema de ecuaciones. Luego explicá los criterios de error absoluto, error relativo y norma de la diferencia entre dos vectores consecutivos, incluyendo la norma euclídea y la norma infinito o máxima diferencia. Mostrá ejemplos numéricos y explicá qué significa cada resultado y cómo se utiliza para decidir cuándo detener el método."
              </pre>
              <button onClick={() => copyToClipboard("Explicame cómo se determina si los métodos de Jacobi y Gauss-Seidel convergen y cuándo se deben detener las iteraciones. Explicá el concepto de matriz diagonalmente dominante y cómo verificarlo en un sistema de ecuaciones. Luego explicá los criterios de error absoluto, error relativo y norma de la diferencia entre dos vectores consecutivos, incluyendo la norma euclídea y la norma infinito o máxima diferencia. Mostrá ejemplos numéricos y explicá qué significa cada resultado y cómo se utiliza para decidir cuándo detener el método.")}>Copiar Prompt 3</button>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e6eef8', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ marginTop: 0 }}>Apuntes de la cátedra (descargar)</h4>
          <p>Descarga el material de la cátedra desde Google Drive:</p>
          <a href="https://drive.google.com/drive/folders/1hsWmyCdzLgghACGVOFelK_XCbIPKI1Vm?usp=sharing" target="_blank" rel="noopener noreferrer">
            <button>Abrir Apuntes (Google Drive)</button>
          </a>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e6eef8', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ marginTop: 0 }}>Videos</h4>
          <p>Ver videos relacionados en YouTube:</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="https://www.youtube.com/watch?v=7Dqf9vird1w&list=PLa7M6OpJPy83bhLK-83Ti1gwh7ijh-b3D" target="_blank" rel="noopener noreferrer"><button>Playlist explicativa</button></a>
            <a href="https://www.youtube.com/watch?v=iRdy1VgOTRk" target="_blank" rel="noopener noreferrer"><button>Video: Ejemplo práctico</button></a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Teoria;
