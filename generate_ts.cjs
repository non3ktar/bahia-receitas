const fs = require('fs');

const recipes = JSON.parse(fs.readFileSync('src/data/all_recipes.json', 'utf-8'));

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
  // Assign basic categories
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
