const fs = require('fs');
const file = 'c:/Users/pomar/analisisNumericoTP2/frontend/src/Quiz.jsx';
let content = fs.readFileSync(file, 'utf8');

// Step 1: Remove the 6 complicated questions.
// I'll just use string replacement on the exact blocks from the original file.
const blocksToRemove = [
  `  {
    title: 'Pregunta final',
    question: 'Si un sistema no es diagonalmente dominante, ¿significa que Jacobi y Gauss-Seidel necesariamente no convergen?',
    options: [
      'Sí, nunca convergen.',
      'No, podrían converger igualmente.',
      'Sí, pero solamente Gauss-Seidel.',
      'No se pueden aplicar nunca.',
    ],
    answer: 1,
    explanation: 'La diagonal dominante es una condición suficiente, pero no necesaria: los métodos pueden converger aunque no se cumpla.',
  },`,
  `  {
    title: 'Métodos Estacionarios',
    question: 'Un método iterativo estacionario es aquel que...',
    options: [
      'Mantiene constantes los valores de X.',
      'Se aplica sólo en computadoras estáticas.',
      'Utiliza la misma matriz de iteración T en cada paso.',
      'Da un error constante en cada iteración.',
    ],
    answer: 2,
    explanation: 'Los métodos de Jacobi y Gauss-Seidel son estacionarios porque la forma en que se calcula la siguiente iteración no varía de paso a paso.',
  },`,
  `  {
    title: 'El error ideal',
    question: '¿Qué pasa si el criterio de paro exige un error exactamente igual a 0?',
    options: [
      'Se obtiene la solución perfecta rápidamente.',
      'El método podría no detenerse nunca o requerir infinitas iteraciones.',
      'El sistema se vuelve inestable.',
      'El vector inicial no importa.',
    ],
    answer: 1,
    explanation: 'Dado que los métodos iterativos aproximan (y por el error de redondeo de la máquina), buscar error cero estricto suele provocar un ciclo infinito.',
  },`,
  `  {
    title: 'Matriz definida positiva',
    question: 'Si una matriz simétrica es definida positiva, ¿está garantizada la convergencia del método de Gauss-Seidel?',
    options: [
      'Sí, es un teorema matemático comprobado.',
      'No, solo converge si es diagonalmente dominante.',
      'No se aplica a matrices simétricas.',
      'Solo si el vector inicial es de puros ceros.',
    ],
    answer: 0,
    explanation: 'Existe un teorema que asegura que Gauss-Seidel convergerá para cualquier valor inicial si la matriz es simétrica y definida positiva.',
  },`,
  `  {
    title: 'Norma infinito',
    question: '¿Qué significa calcular el error con la "norma infinito"?',
    options: [
      'Tomar la diferencia que tienda a infinito.',
      'Tomar el máximo valor absoluto de las diferencias entre las componentes.',
      'Sumar todos los errores hasta el infinito.',
      'Dividir por un número infinitamente grande.',
    ],
    answer: 1,
    explanation: 'La norma infinito de un vector es el máximo de los valores absolutos de sus componentes.',
  },`,
  `  {
    title: 'Convergencia cruzada',
    question: '¿Es posible que el método de Jacobi converja y el de Gauss-Seidel no?',
    options: [
      'No, Gauss-Seidel siempre converge si Jacobi lo hace.',
      'Sí, existen sistemas particulares donde Jacobi converge y Gauss-Seidel diverge.',
      'Sí, ocurre la mayoría de las veces.',
      'Ambos siempre hacen exactamente lo mismo.',
    ],
    answer: 1,
    explanation: 'Aunque Gauss-Seidel suele ser superior, hay matrices raras donde el radio espectral de Gauss-Seidel es > 1 y el de Jacobi < 1.',
  },`
];

for (const block of blocksToRemove) {
  content = content.replace(block + '\r\n', '');
  content = content.replace(block + '\n', '');
}

// Step 2: Update remaining titles and add (opción múltiple) to question texts.
// We can use a regex that matches question: '...' and title: '...'
content = content.replace(/title:\s*'([^']+)',/g, "title: '$1 (opción múltiple)',");
content = content.replace(/question:\s*'([^']+)',/g, (match, q) => {
  if (!q.endsWith('(opción múltiple)')) {
    return `question: '${q} (opción múltiple)',`;
  }
  return match;
});

// Step 3: Add the 6 new multi-select questions
const newQuestions = `
  {
    title: 'Características de Jacobi (selección múltiple)',
    question: 'Lo que caracteriza al método de Jacobi es: (opción múltiple)',
    options: [
      'Requiere un vector de valores iniciales.',
      'Utiliza los valores recién calculados de inmediato.',
      'Calcula todas las nuevas aproximaciones basándose únicamente en la iteración anterior.',
      'Encuentra la respuesta exacta en el primer paso.'
    ],
    answer: [0, 2],
    explanation: 'El método de Jacobi necesita un vector inicial para arrancar y, a diferencia de Gauss-Seidel, calcula todas las incógnitas de una iteración usando exclusivamente los datos de la iteración pasada.'
  },
  {
    title: 'Características de Gauss-Seidel (selección múltiple)',
    question: 'Al utilizar el método de Gauss-Seidel, podemos afirmar que: (opción múltiple)',
    options: [
      'Se aprovecha la información "fresca" o más reciente en cada paso.',
      'Suele converger en menos iteraciones que Jacobi.',
      'No requiere ningún criterio de paro.',
      'Funciona perfectamente aunque haya ceros en la diagonal principal.'
    ],
    answer: [0, 1],
    explanation: 'Gauss-Seidel incorpora cada nueva aproximación apenas se calcula, lo que generalmente acelera la convergencia comparado con Jacobi.'
  },
  {
    title: 'El rol de la dominancia diagonal (selección múltiple)',
    question: 'Una matriz estrictamente diagonalmente dominante es importante porque: (opción múltiple)',
    options: [
      'Garantiza que ambos métodos (Jacobi y Gauss-Seidel) van a converger.',
      'Es una condición suficiente pero no absolutamente necesaria para la convergencia.',
      'Es el único tipo de matriz que existe en la vida real.',
      'Significa que todos los elementos de la matriz son ceros.'
    ],
    answer: [0, 1],
    explanation: 'La dominancia diagonal es la condición suficiente clásica para asegurar la convergencia, aunque algunos sistemas pueden converger incluso si no la cumplen.'
  },
  {
    title: 'Vectores y Tolerancia (selección múltiple)',
    question: 'Sobre el vector inicial y la tolerancia, ¿qué enunciados son correctos? (opción múltiple)',
    options: [
      'El vector inicial sirve como punto de partida para el ciclo iterativo.',
      'La tolerancia nos dice cuándo detener el algoritmo si el error es suficientemente pequeño.',
      'La tolerancia siempre debe ser cero absoluto.',
      'El vector inicial debe ser exactamente la solución correcta.'
    ],
    answer: [0, 1],
    explanation: 'Todo método iterativo requiere un punto de inicio (vector inicial) y un criterio para detenerse basado en un error máximo permitido (tolerancia).'
  },
  {
    title: 'El proceso iterativo (selección múltiple)',
    question: 'Durante la ejecución de un método iterativo para resolver Ax = b: (opción múltiple)',
    options: [
      'En cada iteración nos acercamos más a la solución (si el método converge).',
      'Se repite un conjunto de cálculos matemáticos utilizando los resultados anteriores.',
      'Solo se utiliza la matriz A, ignorando por completo el vector b.',
      'La cantidad de incógnitas cambia en cada iteración.'
    ],
    answer: [0, 1],
    explanation: 'Iterar significa repetir un proceso; en este caso, se usan las soluciones previas para calcular nuevas aproximaciones progresivamente más exactas.'
  },
  {
    title: 'Problemas al resolver (selección múltiple)',
    question: '¿Qué nos impide resolver un sistema directamente con estos métodos sin modificarlo? (opción múltiple)',
    options: [
      'Tener un coeficiente igual a 0 en la diagonal principal.',
      'Que el sistema sea no lineal (estos métodos son para sistemas lineales).',
      'Usar un vector inicial de puros unos.',
      'Tener términos independientes (el vector b) con valores negativos.'
    ],
    answer: [0, 1],
    explanation: 'Si hay un 0 en la diagonal, el algoritmo intenta dividir por 0 y falla (requiere reordenar filas). Además, Jacobi y Gauss-Seidel están diseñados para sistemas lineales (Ax=b).'
  }
];`;

content = content.replace('];\r\n\r\n// Cantidad', '],\r\n' + newQuestions + '\r\n// Cantidad');
content = content.replace('];\n\n// Cantidad', '],\n' + newQuestions + '\n// Cantidad');

// Step 4: Update React component to handle multiple selection
// Find the state variables
content = content.replace(/const \[selectedOption, setSelectedOption\] = useState\(null\);/, 
  `const [selectedOptions, setSelectedOptions] = useState([]);\n  const [isAnswered, setIsAnswered] = useState(false);`);

// Update timedOut logic
content = content.replace(/const timedOut = started && !finished && selectedOption === null && timeLeft === 0;/,
  `const timedOut = started && !finished && !isAnswered && timeLeft === 0;`);

// Update useEffect for timer
content = content.replace(/if \(!started \|\| finished \|\| selectedOption !== null \|\| timeLeft <= 0\)/,
  `if (!started || finished || isAnswered || timeLeft <= 0)`);
content = content.replace(/\}, \[started, finished, selectedOption, timeLeft\]\);/,
  `}, [started, finished, isAnswered, timeLeft]);`);

// Update resets in startQuiz and cancelQuiz and nextQuestion
content = content.replace(/setSelectedOption\(null\);/g, 
  `setSelectedOptions([]);\n    setIsAnswered(false);`);

// Update selectOption function
content = content.replace(/const selectOption = \(optionIndex\) => {[\s\S]*?  };/,
  `const selectOption = (optionIndex) => {
    if (isAnswered || timedOut) return;

    if (Array.isArray(question.answer)) {
      const newSelection = selectedOptions.includes(optionIndex)
        ? selectedOptions.filter(i => i !== optionIndex)
        : [...selectedOptions, optionIndex];
      setSelectedOptions(newSelection);
    } else {
      setSelectedOptions([optionIndex]);
      setIsAnswered(true);
      if (optionIndex === question.answer) {
        setScore((currentScore) => currentScore + 1);
      }
    }
  };

  const submitMultiAnswer = () => {
    if (isAnswered || timedOut) return;
    setIsAnswered(true);
    const correct = [...question.answer].sort();
    const user = [...selectedOptions].sort();
    if (JSON.stringify(correct) === JSON.stringify(user)) {
      setScore((s) => s + 1);
    }
  };`);

// Update getOptionClassName function
content = content.replace(/const getOptionClassName = \(optionIndex\) => {[\s\S]*?  };/,
  `const getOptionClassName = (optionIndex) => {
    if (!isAnswered && !timedOut) {
      return selectedOptions.includes(optionIndex) ? 'quiz-option selected' : 'quiz-option';
    }

    const isCorrectAnswer = Array.isArray(question.answer)
      ? question.answer.includes(optionIndex)
      : optionIndex === question.answer;
    
    const isSelected = selectedOptions.includes(optionIndex);

    if (isCorrectAnswer) {
      return 'quiz-option correct';
    }

    if (isSelected) {
      return 'quiz-option incorrect';
    }

    return 'quiz-option muted';
  };`);

// Update answered variable
content = content.replace(/const answered = selectedOption !== null \|\| timedOut;/,
  `const answered = isAnswered || timedOut;
  const isSuccess = () => {
    if (Array.isArray(question.answer)) {
      const correct = [...question.answer].sort();
      const user = [...selectedOptions].sort();
      return JSON.stringify(correct) === JSON.stringify(user);
    }
    return selectedOptions[0] === question.answer;
  };`);

// Update feedback check
content = content.replace(/\{answered && \([\s\S]*?<div className={`quiz-feedback \$\{selectedOption === question\.answer \? 'success' : 'error'\}`\}[\s\S]*?<strong>\{timedOut \? 'Se acabó el tiempo\.' : selectedOption === question\.answer \? '¡Correcto!' : 'Respuesta incorrecta\.'\}<\/strong>/,
  `{answered && (
        <div className={\`quiz-feedback \${isSuccess() ? 'success' : 'error'}\`}>
          <strong>{timedOut ? 'Se acabó el tiempo.' : isSuccess() ? '¡Correcto!' : 'Respuesta incorrecta.'}</strong>`);

// Update Quiz options div to inject confirm button for multi-select
content = content.replace(/<\/div>\s*\{answered && \(/,
  `</div>
      
      {!answered && Array.isArray(question.answer) && (
        <button 
          className="quiz-primary-button" 
          type="button" 
          onClick={submitMultiAnswer}
          disabled={selectedOptions.length === 0}
          style={{ marginTop: '15px' }}
        >
          Confirmar Respuesta
        </button>
      )}

      {answered && (`);

fs.writeFileSync(file, content);
console.log("Done");
