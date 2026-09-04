import { useEffect, useState, useRef } from 'react';
import './Quiz.css';

const QUESTION_TIME = 30;

const questionBank = [
  // Preguntas originales (fijas)
  {
    title: 'Para empezar',
    question: '¿Qué caracteriza a un método iterativo?',
    options: [
      'Obtiene la solución exacta en un número fijo de operaciones.',
      'Calcula sucesivas aproximaciones a la solución.',
      'Solo puede utilizarse con matrices 2×2.',
      'No necesita un valor inicial.',
    ],
    answer: 1,
    explanation: 'Partimos de una aproximación inicial y la vamos mejorando mediante iteraciones.',
  },
  {
    title: 'Vector inicial',
    question: '¿Para qué necesitamos un vector inicial X⁽⁰⁾?',
    options: [
      'Para representar la solución exacta.',
      'Para poder comenzar el proceso iterativo.',
      'Para calcular la matriz de coeficientes.',
      'Para determinar la tolerancia.',
    ],
    answer: 1,
    explanation: 'Los métodos iterativos necesitan valores iniciales, llamados vector arrancador, para comenzar.',
  },
  {
    title: 'La diferencia clave',
    question: 'En Jacobi, para calcular la nueva aproximación, ¿qué valores utilizamos?',
    options: [
      'Los valores recién calculados en la misma iteración.',
      'Los valores de la iteración anterior.',
      'Los valores exactos de la solución.',
      'Solo el vector inicial.',
    ],
    answer: 1,
    explanation: 'Jacobi utiliza todos los valores de la iteración anterior para calcular la siguiente.',
  },
  {
    title: 'Gauss-Seidel',
    question: '¿Qué cambia en Gauss-Seidel respecto de Jacobi?',
    options: [
      'No necesita vector inicial.',
      'Utiliza los valores recién calculados en la misma iteración.',
      'No necesita criterio de paro.',
      'Siempre obtiene la solución exacta en una iteración.',
    ],
    answer: 1,
    explanation: 'Gauss-Seidel incorpora inmediatamente los valores recién calculados dentro de la misma iteración.',
  },
  {
    title: 'Diagonal dominante',
    question: 'Dada la matriz A = [[5, 1, 1], [2, 8, 1], [1, 2, 6]], ¿es diagonalmente dominante?',
    options: ['Sí', 'No', 'Solo la primera fila', 'No se puede determinar.'],
    answer: 0,
    explanation: 'En cada fila, el valor absoluto de la diagonal supera la suma de los valores absolutos restantes: 5 > 1 + 1, 8 > 2 + 1 y 6 > 1 + 2.',
  },
  {
    title: '¿Cuándo paramos?',
    question: '¿Cuándo podemos detener las iteraciones?',
    options: [
      'Cuando hacemos exactamente 3 iteraciones.',
      'Cuando obtenemos valores que parecen correctos.',
      'Cuando se cumple el criterio de paro establecido.',
      'Nunca, porque los métodos iterativos continúan indefinidamente.',
    ],
    answer: 2,
    explanation: 'El criterio de paro permite decidir cuándo dos aproximaciones consecutivas están suficientemente cerca.',
  },
  {
    title: 'Criterio de convergencia',
    question: '¿Qué indica que un método iterativo está convergiendo?',
    options: [
      'Que las aproximaciones sucesivas se acercan entre sí.',
      'Que el método siempre termina después de una iteración.',
      'Que la matriz tiene necesariamente tamaño 2×2.',
      'Que no hace falta comparar aproximaciones.',
    ],
    answer: 0,
    explanation: 'La convergencia se observa cuando las aproximaciones sucesivas se acercan a la solución y la diferencia entre ellas disminuye.',
  },
  {
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
  },
  
  // Nuevas preguntas (para el pool aleatorio)
  {
    title: 'Velocidad de convergencia',
    question: '¿Cuál de los siguientes métodos suele requerir menos iteraciones para converger si la matriz es diagonalmente dominante?',
    options: [
      'El método de Jacobi.',
      'El método de Gauss-Seidel.',
      'Ambos requieren exactamente la misma cantidad.',
      'Depende del vector de términos independientes.',
    ],
    answer: 1,
    explanation: 'Al utilizar valores actualizados inmediatamente, Gauss-Seidel suele converger más rápido que Jacobi.',
  },
  {
    title: 'Concepto de Tolerancia',
    question: '¿Qué representa el término de "tolerancia" en un método numérico?',
    options: [
      'El máximo error permitido para aceptar una solución como válida.',
      'La cantidad máxima de iteraciones permitidas.',
      'El valor exacto que se busca.',
      'La velocidad de cálculo de la computadora.',
    ],
    answer: 0,
    explanation: 'La tolerancia establece el umbral del error; si la diferencia entre iteraciones es menor a la tolerancia, nos detenemos.',
  },
  {
    title: 'Cálculo de error',
    question: '¿Cómo se calcula típicamente el error relativo en la iteración "k"?',
    options: [
      'Como la suma de las componentes del vector X.',
      'Como la norma de X^(k) menos X^(k-1), dividida por la norma de X^(k).',
      'Como la multiplicación de las matrices.',
      'Restando el número de iteraciones totales a la iteración k.',
    ],
    answer: 1,
    explanation: 'El error relativo es la diferencia entre el valor actual y el anterior (norma de la diferencia), normalizado dividiendo por la norma actual.',
  },
  {
    title: 'Condición de la diagonal',
    question: '¿Qué ocurre con los métodos iterativos si el elemento en la diagonal principal a_{ii} es cero?',
    options: [
      'El método termina y da la solución exacta.',
      'Se asume que la variable es cero.',
      'No se pueden aplicar sin antes reorganizar las filas (intercambio).',
      'Se omite ese cálculo.',
    ],
    answer: 2,
    explanation: 'Como se divide por a_{ii} para despejar cada incógnita, si es cero se produce una división por cero, por lo que hay que pivotear.',
  },
  {
    title: 'Actualización en Jacobi',
    question: 'En el método de Jacobi, todas las incógnitas se actualizan...',
    options: [
      'Una por una y se usan de inmediato.',
      'Simultáneamente, al finalizar el cálculo de toda la iteración.',
      'Sólo en las filas impares.',
      'En orden inverso (desde la n hasta la 1).',
    ],
    answer: 1,
    explanation: 'Las nuevas aproximaciones no se utilizan hasta que no se haya calculado todo el vector de la siguiente iteración.',
  },
  {
    title: 'Información fresca',
    question: '¿Por qué se dice que Gauss-Seidel usa información "más fresca"?',
    options: [
      'Porque fue inventado después que Jacobi.',
      'Porque requiere matrices con números menores.',
      'Porque incorpora los componentes ya calculados en la misma iteración.',
      'Porque siempre usa el vector inicial en todos los cálculos.',
    ],
    answer: 2,
    explanation: 'A medida que calcula un nuevo x_i, lo utiliza inmediatamente para calcular x_{i+1}, usando los datos más recientes.',
  },
  {
    title: 'Evaluación de dominancia',
    question: 'Para la fila [1, 4, 1] (diagonal en el 1), ¿se cumple la dominancia diagonal estricta?',
    options: [
      'Sí, porque 1 es positivo.',
      'Sí, la suma de los otros es 5.',
      'No, porque |1| no es mayor que |4| + |1|.',
      'No, porque la matriz no es 3x3.',
    ],
    answer: 2,
    explanation: 'El valor de la diagonal |1| = 1, la suma de los demás es |4| + |1| = 5. Como 1 no es mayor que 5, no se cumple.',
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    title: 'El término independiente',
    question: '¿Qué papel juega el vector de términos independientes (b) en estos métodos?',
    options: [
      'No se usa en absoluto.',
      'Solo se usa en la primera iteración.',
      'Es parte constante de la ecuación de actualización en cada paso.',
      'Determina el número de iteraciones.',
    ],
    answer: 2,
    explanation: 'Al despejar x_i de Ax = b, el coeficiente b_i es siempre un término sumado/restado constante en cada iteración.',
  },
  {
    title: 'Ecuación base',
    question: 'Si la ecuación matricial es Ax = b, ¿qué se debe hacer para aplicar Jacobi?',
    options: [
      'Invertir la matriz A.',
      'Despejar la incógnita x_i de cada i-ésima ecuación.',
      'Multiplicar A por b.',
      'Eliminar las variables dependientes.',
    ],
    answer: 1,
    explanation: 'Para construir las ecuaciones de iteración, en la primera fila se despeja x_1, en la segunda x_2, y así sucesivamente.',
  },
  {
    title: 'Radio Espectral',
    question: 'Para garantizar que el error tienda a cero, el radio espectral de la matriz de iteración debe ser...',
    options: [
      'Mayor a 1',
      'Exactamente 0',
      'Menor a 1',
      'Igual a infinito',
    ],
    answer: 2,
    explanation: 'El radio espectral (el máximo valor absoluto de sus autovalores) de la matriz de iteración debe ser estrictamente menor que 1 para que haya convergencia.',
  }
];

// Cantidad de preguntas por cuestionario
const QUESTIONS_PER_QUIZ = 8;

function Quiz() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [finished, setFinished] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const question = quizQuestions[currentQuestion];
  const timedOut = started && !finished && selectedOption === null && timeLeft === 0;

  useEffect(() => {
    // Si no ha empezado, o ya terminó, o hay una opción seleccionada, o el tiempo se acabó: detenemos el reloj
    if (!started || finished || selectedOption !== null || timeLeft <= 0) {
      return undefined;
    }

    // Classic React timer: Se ejecuta cada vez que cambia timeLeft y espera 1 segundo
    const timerId = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [started, finished, selectedOption, timeLeft]);

  const startQuiz = (mode) => {
    let selectedQuestions = [];
    if (mode === 'random') {
      const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
      selectedQuestions = shuffled.slice(0, QUESTIONS_PER_QUIZ);
    } else {
      // Fixed quiz toma siempre las primeras 8 preguntas originales
      selectedQuestions = questionBank.slice(0, QUESTIONS_PER_QUIZ);
    }
    
    setQuizQuestions(selectedQuestions);
    setStarted(true);
    setFinished(false);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setTimeLeft(QUESTION_TIME);
  };

  const cancelQuiz = () => {
    setStarted(false);
    setFinished(false);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setTimeLeft(QUESTION_TIME);
  };

  const selectOption = (optionIndex) => {
    if (selectedOption !== null || timedOut) {
      return;
    }

    setSelectedOption(optionIndex);
    if (optionIndex === question.answer) {
      setScore((currentScore) => currentScore + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion === quizQuestions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentQuestion((questionIndex) => questionIndex + 1);
    setSelectedOption(null);
    setTimeLeft(QUESTION_TIME);
  };

  const getOptionClassName = (optionIndex) => {
    if (selectedOption === null && !timedOut) {
      return 'quiz-option';
    }

    if (optionIndex === question.answer) {
      return 'quiz-option correct';
    }

    if (optionIndex === selectedOption) {
      return 'quiz-option incorrect';
    }

    return 'quiz-option muted';
  };

  if (!started) {
    return (
      <div className="quiz-intro">
        <div>
          <h2>Quiz de métodos iterativos</h2>
          <p>
            Pon a prueba tus conocimientos sobre Jacobi, Gauss-Seidel y los criterios
            de convergencia.
          </p>
          <ul>
            <li>{QUESTIONS_PER_QUIZ} preguntas de opción múltiple</li>
            <li>{QUESTION_TIME} segundos para responder cada pregunta</li>
            <li>Recibirás una explicación al responder</li>
          </ul>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          <button className="quiz-primary-button" type="button" onClick={() => startQuiz('fixed')} style={{ flex: '1 1 auto' }}>
            Cuestionario Fijo
          </button>
          <button className="quiz-primary-button" type="button" onClick={() => startQuiz('random')} style={{ flex: '1 1 auto', background: '#3b82f6' }}>
            Cuestionario Aleatorio
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / quizQuestions.length) * 100);

    return (
      <div className="quiz-result">
        <span className="quiz-result-icon" aria-hidden="true">🏆</span>
        <h2>¡Quiz terminado!</h2>
        <p className="quiz-score">
          Obtuviste <strong>{score} de {quizQuestions.length}</strong> respuestas correctas ({percentage}%).
        </p>
        <p>
          {percentage >= 70
            ? '¡Muy bien! Tienes una buena comprensión de los métodos iterativos.'
            : 'Repasa la teoría y vuelve a intentarlo para reforzar estos conceptos.'}
        </p>
        <button className="quiz-primary-button" type="button" onClick={() => setStarted(false)}>
          Volver al inicio
        </button>
      </div>
    );
  }

  const answered = selectedOption !== null || timedOut;

  return (
    <div className="quiz-game">
      <div className="quiz-header">
        <div>
          <span className="quiz-counter">Pregunta {currentQuestion + 1} de {quizQuestions.length}</span>
          <h2>{question.title}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flex: '0 0 auto' }}>
          <div className={`quiz-timer-container ${timeLeft <= 5 ? 'critical' : timeLeft <= 15 ? 'warning' : ''}`}>
            <div className="quiz-timer-text" aria-label={`Quedan ${timeLeft} segundos`}>
              <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  {/* Aguja de las horas */}
                  <line x1="12" y1="12" x2="12" y2="8" strokeWidth="3" />
                  {/* Aguja de los segundos animada */}
                  <line 
                    x1="12" y1="12" x2="12" y2="4" 
                    style={{ 
                      transform: `rotate(${((30 - timeLeft) / 30) * 360}deg)`, 
                      transformOrigin: '12px 12px',
                      transition: 'transform 1s linear'
                    }} 
                  />
                </svg>
              </span>
              <span style={{ fontSize: '1.4em', minWidth: '3ch', textAlign: 'left' }}>{timeLeft}s</span>
            </div>
            <div className="quiz-timer-bar-bg">
              <div 
                className="quiz-timer-bar-fill" 
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={cancelQuiz}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              background: '#fee2e2',
              color: '#ef4444',
              border: '1px solid #fca5a5',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background 0.2s',
              width: '100%',
            }}
            onMouseOver={(e) => (e.target.style.background = '#fecaca')}
            onMouseOut={(e) => (e.target.style.background = '#fee2e2')}
          >
            Cancelar
          </button>
        </div>
      </div>

      <div className="quiz-progress" aria-hidden="true">
        <span style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }} />
      </div>

      <p className="quiz-question">{question.question}</p>

      <div className="quiz-options" role="group" aria-label="Opciones de respuesta">
        {question.options.map((option, index) => (
          <button
            className={getOptionClassName(index)}
            type="button"
            key={option}
            onClick={() => selectOption(index)}
            disabled={answered}
          >
            <span className="quiz-option-letter">{String.fromCharCode(65 + index)}</span>
            <span>{option}</span>
          </button>
        ))}
      </div>

      {answered && (
        <div className={`quiz-feedback ${selectedOption === question.answer ? 'success' : 'error'}`}>
          <strong>{timedOut ? 'Se acabó el tiempo.' : selectedOption === question.answer ? '¡Correcto!' : 'Respuesta incorrecta.'}</strong>
          <p>{question.explanation}</p>
          <button className="quiz-next-button" type="button" onClick={nextQuestion}>
            {currentQuestion === quizQuestions.length - 1 ? 'Ver resultado' : 'Siguiente pregunta'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;

