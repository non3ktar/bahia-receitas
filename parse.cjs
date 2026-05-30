const fs = require('fs');

const text = fs.readFileSync('/home/sergio/Downloads/livro/livro.txt', 'utf-8');
const lines = text.split('\n');

const recipes = [];
let currentRecipe = null;
let capture = false;

// List of exact titles from the index
const titles = [
  "Acaçá", "Acarajé", "Arroz de Aussá", "Efó", "Carurú", "Ecurú", "Xim-xim", "Bolas de Inhame", "Bobó de Inhame", "Feijão de azeite (humulucú)", "Alua", "Dengue", "Ebó", "Latipá ou amori", "Abará", "Aberém", "Massa", "Ipétê", "A'do", "Olubó", "Eguédé", "Efún-oguédê", "Eran-patêrê", "Feijão de leite", "Moqueca de peixe fresco", "Moqueca de xaréu", "Moqueca de ovos", "Escaldado de peixe fresco", "Frigideira de camarões", "Peixe sem espinha", "Empadas de camarões", "Arroz de forno", "Mocotó", "Sarapatel", "Peru cheio", "Galinha de molho pardo", "Galinha de molho branco", "Feijoada", "Leitoa assada", "Vatapá de galinha", "Maniçoba", "Canjica de milho verde", "Doce ambrosia", "Doce de caju", "Bolo da Bahia", "Bolo delicioso", "Bolo inglês", "Bolachinas de goma", "Pastéis", "Licor de banana", "Licor de cacau", "Licor de araçá", "Licor de groselha", "Licor de umbu ou imbú", "Licor de jenipapo"
].map(t => t.toLowerCase().trim());

for (let i = 0; i < lines.length; i++) {
  let line = lines[i].trim();
  if (line === '' || line.match(/^\d+$/) || line.includes('MANUEL QUERINO') || line.includes('A ARTE CULINÁRIA NA BAHIA')) {
    continue;
  }

  const lineLower = line.toLowerCase();
  
  // Check if line matches a title
  const matchedTitle = titles.find(t => lineLower === t || lineLower === t + " (*)");
  
  if (matchedTitle) {
    if (currentRecipe) {
      recipes.push(currentRecipe);
    }
    currentRecipe = {
      id: matchedTitle.replace(/[\W_]+/g, "_"),
      title: line,
      instructions: "",
      category: "Geral"
    };
  } else if (currentRecipe && line.length > 0) {
    // If it's the start of the index, stop
    if (line === "ÍNDICE" || line === "ÍNDICE REMISSO") {
      recipes.push(currentRecipe);
      currentRecipe = null;
      break;
    }
    currentRecipe.instructions += line + "\n";
  }
}
if (currentRecipe) {
    recipes.push(currentRecipe);
}

// Write the recipes to a JSON file
fs.writeFileSync('/home/sergio/Downloads/livro/bahia-receitas/src/data/all_recipes.json', JSON.stringify(recipes, null, 2));
console.log("Extracted " + recipes.length + " recipes.");
