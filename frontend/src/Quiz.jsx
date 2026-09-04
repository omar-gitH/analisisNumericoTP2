import { useEffect, useState } from 'react';
import './Quiz.css';

const QUESTION_TIME = 20;

const questions = [
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
];

function Quiz() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];
  const timedOut = started && !finished && selectedOption === null && timeLeft === 0;

  useEffect(() => {
    if (!started || finished || selectedOption !== null) {
      return undefined;
    }

    if (timeLeft === 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((remaining) => remaining - 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [started, finished, selectedOption, timeLeft]);

  const startQuiz = () => {
    setStarted(true);
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
    if (currentQuestion === questions.length - 1) {
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
            <li>{questions.length} preguntas de opción múltiple</li>
            <li>{QUESTION_TIME} segundos para responder cada pregunta</li>
            <li>Recibirás una explicación al responder</li>
          </ul>
        </div>
        <button className="quiz-primary-button" type="button" onClick={startQuiz}>
          Iniciar Quiz
        </button>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="quiz-result">
        <span className="quiz-result-icon" aria-hidden="true">🏆</span>
        <h2>¡Quiz terminado!</h2>
        <p className="quiz-score">
          Obtuviste <strong>{score} de {questions.length}</strong> respuestas correctas ({percentage}%).
        </p>
        <p>
          {percentage >= 70
            ? '¡Muy bien! Tienes una buena comprensión de los métodos iterativos.'
            : 'Repasa la teoría y vuelve a intentarlo para reforzar estos conceptos.'}
        </p>
        <button className="quiz-primary-button" type="button" onClick={startQuiz}>
          Intentar nuevamente
        </button>
      </div>
    );
  }

  const answered = selectedOption !== null || timedOut;

  return (
    <div className="quiz-game">
      <div className="quiz-header">
        <div>
          <span className="quiz-counter">Pregunta {currentQuestion + 1} de {questions.length}</span>
          <h2>{question.title}</h2>
        </div>
        <div className={`quiz-timer ${timeLeft <= 5 ? 'warning' : ''}`} aria-label={`Quedan ${timeLeft} segundos`}>
          <span aria-hidden="true">⏱</span> {timeLeft}s
        </div>
      </div>

      <div className="quiz-progress" aria-hidden="true">
        <span style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
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
            {currentQuestion === questions.length - 1 ? 'Ver resultado' : 'Siguiente pregunta'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
