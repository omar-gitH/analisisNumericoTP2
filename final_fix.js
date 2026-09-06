const fs = require('fs');
const file = 'c:/Users/pomar/analisisNumericoTP2/frontend/src/Quiz.jsx';
let content = fs.readFileSync(file, 'utf8');

// Remove any occurrence of ' (opción múltiple)' and ' (selección múltiple)' from everywhere (titles, questions, etc.)
// Also remove it if it fell onto a new line
content = content.replace(/\s*\(\s*opción\s+múltiple\s*\)/gi, '');
content = content.replace(/\s*\(\s*selección\s+múltiple\s*\)/gi, '');

// Now, we specifically add ' (opción múltiple)' back to the question strings of the multi-choice questions.
// The multi-choice questions can be identified by `answer: [`
// Let's use a replacer function on the whole question block.
// We will use a regex that handles commas after explanation, or any trailing spaces.
const blockRegex = /\{\s*title:[\s\S]*?explanation:[\s\S]*?\}/g;

content = content.replace(blockRegex, (match) => {
  if (match.includes('answer: [')) {
    // It's a multi-choice question.
    // We need to add ' (opción múltiple)' at the end of the question string.
    // The question string looks like: question: '¿...?',
    return match.replace(/(question:\s*'[^']+)'/, "$1 (opción múltiple)'");
  }
  return match;
});

fs.writeFileSync(file, content);
console.log('Final fix applied successfully.');
