const fs = require('fs');
const file = 'c:/Users/pomar/analisisNumericoTP2/frontend/src/Quiz.jsx';
let content = fs.readFileSync(file, 'utf8');

// Remove ' (selección múltiple)' or ' (opción múltiple)' from the title strings
content = content.replace(/title:\s*'([^']+?)\s*\((?:selección|opción)\s+múltiple\)'/g, "title: '$1'");

fs.writeFileSync(file, content);
console.log('Titles cleaned successfully.');
