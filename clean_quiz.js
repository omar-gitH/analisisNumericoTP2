const fs = require('fs');
const file = 'c:/Users/pomar/analisisNumericoTP2/frontend/src/Quiz.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix the syntax error:
content = content.replace(/}\r?\n\],\r?\n\r?\n\s*\{/, '},\n  {');
content = content.replace(/}\r?\n\],\r?\n\s*\{/, '},\n  {'); // Just in case there's only one newline

// 2. Remove ' (opción múltiple)' from single choice questions.
// A regex to match a whole question block:
const questionRegex = /\{\s*title:[\s\S]*?explanation:\s*'[^']*'\s*\}/g;

content = content.replace(questionRegex, (match) => {
  // Check if answer is an array
  if (match.includes('answer: [')) {
    // Keep ' (selección múltiple)' or ' (opción múltiple)' as the user requested:
    // the user wants the text "(opcion multiple)" in the question. Let's make sure it's exactly that or similar.
    return match; 
  }
  
  // It's single choice, remove ' (opción múltiple)' and ' (selección múltiple)' just in case
  let newMatch = match.replace(/ \(opción múltiple\)/g, '');
  newMatch = newMatch.replace(/ \(selección múltiple\)/g, '');
  return newMatch;
});

fs.writeFileSync(file, content);
console.log('Quiz cleaned successfully.');
