const fs = require('fs');

let content = fs.readFileSync('src/data/all_recipes.json', 'utf-8');
let recipes = JSON.parse(content);

recipes.forEach(r => {
  // Replace newlines that are mid-sentence with space.
  // A simple heuristic: if a line ends with a period, it might be a paragraph end, but in this PDF it usually isn't unless it's the end of a thought.
  // Actually, replacing all `\n` with space is much better than having hard breaks mid-sentence.
  // Let's replace all `\n` with space, then replace double spaces with single space.
  // Then maybe we can split by ". " to create paragraphs.
  
  let text = r.instructions.replace(/\n/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();
  
  // Split by ". " to make paragraphs
  let sentences = text.split('. ');
  let paragraphs = [];
  let currentPara = [];
  
  for (let s of sentences) {
    if (s.trim().length > 0) {
      currentPara.push(s.trim());
      // Group every 2-3 sentences into a paragraph
      if (currentPara.length >= 2 || s.length > 150) {
        paragraphs.push(currentPara.join('. ') + '.');
        currentPara = [];
      }
    }
  }
  if (currentPara.length > 0) {
     let last = currentPara.join('. ');
     if (!last.endsWith('.')) last += '.';
     paragraphs.push(last);
  }
  
  // Join paragraphs with double newline
  r.instructions = paragraphs.join('\n\n');
});

const images = {
  "acaraj_": "/acaraje.png",
  "moqueca_de_peixe_fresco": "/moqueca.png",
  "vatap_de_galinha": "/vatapa.png",
  "feijoada": "/feijoada.png"
};

recipes.forEach(r => {
  if (images[r.id]) {
    r.image = images[r.id];
  }
  if (r.title.toLowerCase().includes('licor') || r.title.toLowerCase().includes('doce') || r.title.toLowerCase().includes('bolo') || r.title.toLowerCase().includes('canjica') || r.title.toLowerCase().includes('alua')) {
    r.category = "Sobremesa";
  } else if (r.title.toLowerCase().includes('moqueca') || r.title.toLowerCase().includes('vatap') || r.title.toLowerCase().includes('sarapatel') || r.title.toLowerCase().includes('feijoada')) {
    r.category = "Baiana";
  } else {
    r.category = "Africana";
  }
});

let tsContent = "import type { Recipe } from '../types';\n\nexport const recipes: Recipe[] = " + JSON.stringify(recipes, null, 2) + ";\n";

fs.writeFileSync('src/data/recipes.ts', tsContent);
console.log("Fixed recipes text format.");
