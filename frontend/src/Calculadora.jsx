import React, { useState } from 'react';
import './Calculadora.css'; 

const Calculadora = () => {
  const [size, setSize] = useState(3);
  const [A, setA] = useState(Array(3).fill(0).map(() => Array(3).fill(0)));
  const [B, setB] = useState(Array(3).fill(0));
  const [X0, setX0] = useState(Array(3).fill(0));
  const [iterations, setIterations] = useState(3);
  const [method, setMethod] = useState('ambos'); // 'ambos', 'jacobi', 'gauss'
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    if (newSize >= 2 && newSize <= 5) {
      setSize(newSize);
      setA(Array(newSize).fill(0).map(() => Array(newSize).fill(0)));
      setB(Array(newSize).fill(0));
      setX0(Array(newSize).fill(0));
      setResults(null);
      setError('');
    }
  };

  const updateA = (row, col, value) => {
    const newA = [...A];
    newA[row][col] = value;
    setA(newA);
  };

  const updateB = (row, value) => {
    const newB = [...B];
    newB[row] = value;
    setB(newB);
  };

  const updateX0 = (row, value) => {
    const newX0 = [...X0];
    newX0[row] = value;
    setX0(newX0);
  };

  const checkDiagonalDominance = () => {
    for (let i = 0; i < size; i++) {
      let sum = 0;
      for (let j = 0; j < size; j++) {
        if (i !== j) sum += Math.abs(parseFloat(A[i][j]) || 0);
      }
      if (Math.abs(parseFloat(A[i][i]) || 0) < sum) {
        return false;
      }
    }
    return true;
  };

  const solve = () => {
    setError('');
    const isDominant = checkDiagonalDominance();
    
    let jacobiSteps = [];
    let gaussSeidelSteps = [];

    // Verificamos división por cero antes de iterar
    for (let i = 0; i < size; i++) {
      if ((parseFloat(A[i][i]) || 0) === 0) {
        setError('Error: Un elemento en la diagonal principal es cero. Reordena las filas para evitar la división por cero.');
        return;
      }
    }

    if (method === 'ambos' || method === 'jacobi') {
      let currentX_J = X0.map(val => parseFloat(val) || 0);
      for (let k = 1; k <= iterations; k++) {
        let nextX_J = Array(size).fill(0);
        for (let i = 0; i < size; i++) {
          let sum = parseFloat(B[i]) || 0;
          for (let j = 0; j < size; j++) {
            if (i !== j) {
              sum -= (parseFloat(A[i][j]) || 0) * currentX_J[j];
            }
          }
          nextX_J[i] = sum / (parseFloat(A[i][i]) || 0);
        }
        jacobiSteps.push([...nextX_J]);
        currentX_J = [...nextX_J];
      }
    }

    if (method === 'ambos' || method === 'gauss') {
      let currentX_GS = X0.map(val => parseFloat(val) || 0);
      for (let k = 1; k <= iterations; k++) {
        let nextX_GS = [...currentX_GS];
        for (let i = 0; i < size; i++) {
          let sum = parseFloat(B[i]) || 0;
          for (let j = 0; j < size; j++) {
            if (i !== j) {
              sum -= (parseFloat(A[i][j]) || 0) * nextX_GS[j];
            }
          }
          nextX_GS[i] = sum / (parseFloat(A[i][i]) || 0);
        }
        gaussSeidelSteps.push([...nextX_GS]);
        currentX_GS = [...nextX_GS];
      }
    }

    setResults({
      isDominant,
      jacobiSteps,
      gaussSeidelSteps,
      methodUsed: method
    });
  };

  const handleKeyDown = (e, currentSection, i, j) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let nextId = null;

      if (currentSection === 'A') {
        if (j < size - 1) {
          nextId = `cell-A-${i}-${j + 1}`;
        } else if (i < size - 1) {
          nextId = `cell-A-${i + 1}-0`;
        } else {
          nextId = `cell-B-0`;
        }
      } else if (currentSection === 'B') {
        if (i < size - 1) {
          nextId = `cell-B-${i + 1}`;
        } else {
          nextId = `cell-X0-0`;
        }
      } else if (currentSection === 'X0') {
        if (i < size - 1) {
          nextId = `cell-X0-${i + 1}`;
        } else {
          solve(); // Si está en la última celda, resuelve
          return;
        }
      }

      if (nextId) {
        const nextElement = document.getElementById(nextId);
        if (nextElement) {
          nextElement.focus();
          nextElement.select(); // Opcional: selecciona el texto de la siguiente celda
        }
      }
    }
  };

  const loadExample = () => {
    setSize(3);
    setA([
      [3, 1, 1],
      [2, 5, 1],
      [-1, 1, 3]
    ]);
    setB([4, -1, 4]);
    setX0([0, 0, 0]);
    setIterations(3);
    setMethod('ambos');
    setResults(null);
    setError('');
  };

  return (
    <div className="practica-container">
      
      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '30px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ marginTop: 0, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>💻</span> Calculadora Iterativa
        </h2>
        <p style={{ color: '#475569', margin: '0 0 15px 0' }}>
          Configura y resuelve el sistema. <strong>¡Tip de usabilidad!</strong> Puedes desplazarte ágilmente por todas las celdas usando la tecla <code>Enter</code>. Al llegar a la última, el sistema se resolverá solo.
        </p>
      </div>
      
      <div className="controls" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        <label>
          <strong>Tamaño del sistema: </strong> 
          <input type="number" min="2" max="5" value={size} onChange={handleSizeChange} style={{marginLeft: '10px'}}/>
        </label>
        
        <label>
          <strong>Método: </strong>
          <select value={method} onChange={(e) => setMethod(e.target.value)} style={{marginLeft: '10px', padding: '5px'}}>
            <option value="ambos">Comparar Ambos (Jacobi y Gauss-Seidel)</option>
            <option value="jacobi">Solo Jacobi</option>
            <option value="gauss">Solo Gauss-Seidel</option>
          </select>
        </label>

        <button onClick={loadExample} style={{ backgroundColor: '#28a745' }}>Cargar Ejemplo del Apunte</button>
      </div>

      {error && <div className="error-message" style={{color: 'red', fontWeight: 'bold'}}>{error}</div>}

      <div className="matrices-input" style={{ backgroundColor: '#fdfdfd', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <div className="matrix-column-wrapper">
          <h3 style={{marginTop: 0, color: '#334155'}}>Matriz A</h3>
          <div className="matrix-bracket">
            {A.map((row, i) => (
              <div key={`row-${i}`} className="matrix-row">
                {row.map((val, j) => (
                  <input 
                    id={`cell-A-${i}-${j}`}
                    key={`cell-${i}-${j}`} 
                    type="text" 
                    value={A[i][j]} 
                    onChange={(e) => updateA(i, j, e.target.value)} 
                    onKeyDown={(e) => handleKeyDown(e, 'A', i, j)}
                    style={{width: '65px', padding: '8px', textAlign: 'center', fontWeight: 'bold', color: '#1e293b'}}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="matrix-column-wrapper" style={{ display: 'flex', justifyContent: 'center', fontSize: '2rem', color: '#94a3b8', padding: '0 10px', marginTop: '40px' }}>
          =
        </div>

        <div className="matrix-column-wrapper">
          <h3 style={{marginTop: 0, color: '#334155'}}>Vector B</h3>
          <div className="matrix-bracket">
            {B.map((val, i) => (
              <div key={`b-${i}`} className="matrix-row">
                <input 
                  id={`cell-B-${i}`}
                  type="text" 
                  value={B[i]} 
                  onChange={(e) => updateB(i, e.target.value)} 
                  onKeyDown={(e) => handleKeyDown(e, 'B', i)}
                  style={{width: '65px', padding: '8px', textAlign: 'center', fontWeight: 'bold', color: '#1e293b'}}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="matrix-column-wrapper" style={{ borderLeft: '2px dashed #cbd5e1', paddingLeft: '30px', marginLeft: '10px' }}>
          <h3 style={{marginTop: 0, color: '#334155'}}>Inicial X<sup>(0)</sup></h3>
          <div className="matrix-bracket">
            {X0.map((val, i) => (
              <div key={`x0-${i}`} className="matrix-row">
                <input 
                  id={`cell-X0-${i}`}
                  type="text" 
                  value={X0[i]} 
                  onChange={(e) => updateX0(i, e.target.value)} 
                  onKeyDown={(e) => handleKeyDown(e, 'X0', i)}
                  style={{width: '65px', padding: '8px', textAlign: 'center', fontWeight: 'bold', color: '#1e293b'}}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="solve-controls" style={{marginTop: '20px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '20px'}}>
        <label>
          <strong>Número de Iteraciones (k):</strong>
          <input type="number" min="1" max="100" value={iterations} onChange={(e) => setIterations(parseInt(e.target.value) || 1)} style={{marginLeft: '10px', width: '80px', padding: '5px'}}/>
        </label>
        <button onClick={solve} style={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold' }}>Resolver Sistema</button>
      </div>

      {results && (
        <div className="results-container" style={{marginTop: '30px'}}>
          <h3 style={{ borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>Resultados del Análisis</h3>
          <p style={{ fontSize: '16px' }}>
            <strong>Convergencia:</strong> {' '}
            {results.isDominant ? (
              <span style={{color: '#155724', backgroundColor: '#d4edda', padding: '4px 8px', borderRadius: '4px'}}>La matriz ES diagonalmente dominante (Convergencia Garantizada).</span>
            ) : (
              <span style={{color: '#856404', backgroundColor: '#fff3cd', padding: '4px 8px', borderRadius: '4px'}}>La matriz NO es diagonalmente dominante (Convergencia No Garantizada).</span>
            )}
          </p>

          <div style={{display: 'flex', gap: '40px', flexWrap: 'wrap', marginTop: '20px'}}>
            
            {(results.methodUsed === 'ambos' || results.methodUsed === 'jacobi') && (
              <div className="method-results" style={{ flex: 1, minWidth: '300px' }}>
                <h4 style={{ color: '#0056b3' }}>Método de Jacobi</h4>
                {results.jacobiSteps.map((step, index) => (
                  <div key={`jacobi-${index}`} style={{marginBottom: '15px', padding: '15px', backgroundColor: '#fdfdfd', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                    <strong style={{ display: 'block', marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>Iteración k = {index + 1}</strong>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {step.map((val, i) => {
                        const varName = ['x', 'y', 'z', 'w', 'v'][i] || `x_{${i+1}}`;
                        return <div key={`j-val-${i}`}><code>{varName} = {val.toFixed(6)}</code></div>;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(results.methodUsed === 'ambos' || results.methodUsed === 'gauss') && (
              <div className="method-results" style={{ flex: 1, minWidth: '300px' }}>
                <h4 style={{ color: '#0056b3' }}>Método de Gauss-Seidel</h4>
                {results.gaussSeidelSteps.map((step, index) => (
                  <div key={`gs-${index}`} style={{marginBottom: '15px', padding: '15px', backgroundColor: '#fdfdfd', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                    <strong style={{ display: 'block', marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>Iteración k = {index + 1}</strong>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {step.map((val, i) => {
                        const varName = ['x', 'y', 'z', 'w', 'v'][i] || `x_{${i+1}}`;
                        return <div key={`gs-val-${i}`}><code>{varName} = {val.toFixed(6)}</code></div>;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculadora;
