import { useState } from 'react';
import { recipes } from './data/recipes';
import type { Recipe } from './types';
import { BookOpen, Search, Utensils, Info, List, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showIndex, setShowIndex] = useState(false);

  const filteredRecipes = recipes.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-parchment-100 text-ink-900 pb-16">
      {/* Sticky Header / Navigation */}
      <header className="sticky top-0 z-10 glass-panel border-b border-parchment-300">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <BookOpen className="w-6 h-6 text-parchment-700 hidden md:block" />
            <h2 className="text-xl font-display font-bold text-ink-900 tracking-tight hidden sm:block">
              Receitas Baianas
            </h2>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-parchment-600" />
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white/60 border border-parchment-300 rounded-full focus:outline-none focus:ring-2 focus:ring-parchment-600 transition-all font-sans text-sm shadow-inner"
              />
            </div>
            <button 
              onClick={() => setShowIndex(true)}
              className="p-2 rounded-full hover:bg-parchment-200 transition-colors"
              title="Índice Completo"
            >
              <List className="w-5 h-5 text-parchment-700" />
            </button>
            <button 
              onClick={() => setShowInfo(true)}
              className="p-2 rounded-full hover:bg-parchment-200 transition-colors"
              title="Sobre a obra"
            >
              <Info className="w-5 h-5 text-parchment-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero / Cover Section */}
      <section className="max-w-4xl mx-auto px-4 mt-6 md:mt-10 mb-12">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-parchment-200 h-[28rem] group">
          {/* Background Images Composition */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            <img src="/acaraje.png" alt="Acarajé" className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply" />
            <img src="/moqueca.png" alt="Moqueca" className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply" />
            <img src="/feijoada.png" alt="Feijoada" className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply" />
            <img src="/vatapa.png" alt="Vatapá" className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply" />
          </div>
          <div className="absolute inset-0 bg-parchment-100/40 backdrop-blur-[1px]"></div>
          
          {/* Cover Text Box */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
             <div className="bg-parchment-50/90 backdrop-blur-md p-8 md:p-12 rounded-xl border border-parchment-300 shadow-2xl max-w-lg transform hover:scale-[1.02] transition-transform duration-500">
                <ChefHat className="w-12 h-12 text-parchment-800 mx-auto mb-6 opacity-80" />
                <h1 className="text-4xl md:text-6xl font-display font-bold text-ink-900 mb-6 tracking-tight leading-tight">
                  A Arte Culinária<br/>na Bahia
                </h1>
                <div className="w-24 h-px bg-parchment-600 mx-auto mb-6"></div>
                <p className="text-xl md:text-2xl text-ink-800 font-serif italic mb-3">por Manuel Querino</p>
                <p className="text-xs md:text-sm text-parchment-700 tracking-widest uppercase font-bold">1928 — {recipes.length} Receitas Clássicas</p>
             </div>
          </div>
        </div>
      </section>

      {/* Main Content - Recipes List */}
      <main className="max-w-4xl mx-auto px-4">
        {searchTerm && (
          <div className="mb-6 text-parchment-700 font-serif italic text-lg">
            Resultados para "{searchTerm}": {filteredRecipes.length} encontradas
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredRecipes.map((recipe, index) => (
              <motion.div 
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white/70 border border-parchment-300 rounded-xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer group hover:bg-parchment-50 flex flex-col h-full"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-parchment-600 mb-4 flex items-center justify-between">
                  <span>{recipe.category}</span>
                  <Utensils className="w-4 h-4 text-parchment-400 group-hover:text-parchment-600 transition-colors" />
                </div>
                
                <h2 className="text-2xl font-display font-bold text-ink-900 mb-4 group-hover:text-ink-800 leading-tight">
                  {recipe.title}
                </h2>
                
                <div className="w-12 h-px bg-parchment-300 mb-4 group-hover:bg-parchment-500 transition-colors"></div>
                
                <div className="flex-grow">
                  {recipe.description ? (
                    <p className="text-ink-700 line-clamp-4 text-sm leading-relaxed font-serif text-justify">{recipe.description}</p>
                  ) : (
                    <p className="text-ink-600/70 line-clamp-4 text-sm leading-relaxed italic font-serif text-justify">
                      Acesse para ver os detalhes tradicionais e o modo de preparo de {recipe.title.toLowerCase()}.
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-20 bg-white/40 border border-parchment-300 rounded-2xl">
            <Utensils className="w-16 h-16 text-parchment-400 mx-auto mb-4 opacity-50" />
            <p className="text-xl font-serif text-ink-700">Nenhuma receita encontrada para "{searchTerm}".</p>
          </div>
        )}
      </main>

      {/* Recipe Modal (No Image Layout) */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm"
            onClick={() => setSelectedRecipe(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-parchment-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl border-4 border-parchment-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 md:p-14">
                <div className="text-sm font-bold uppercase tracking-widest text-parchment-600 mb-6 text-center">
                  ❧ {selectedRecipe.category} ☙
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-ink-900 mb-8 pb-8 border-b border-parchment-300 text-center leading-tight">
                  {selectedRecipe.title}
                </h2>
                
                <div className="prose prose-stone mx-auto max-w-none">
                  <div className="text-ink-800 leading-[2.2] space-y-6 text-lg font-serif text-justify">
                    {selectedRecipe.instructions.split('\n\n').map((paragraph, i) => (
                      <p 
                        key={i} 
                        className={i === 0 ? "first-letter:text-7xl first-letter:font-bold first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:-mt-2 first-letter:text-parchment-800 first-line:uppercase first-line:tracking-widest" : "indent-8"}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-14 pt-8 border-t border-parchment-300 flex justify-center">
                  <button 
                    onClick={() => setSelectedRecipe(null)}
                    className="px-8 py-3 bg-transparent border border-ink-900 text-ink-900 rounded-full font-bold hover:bg-ink-900 hover:text-parchment-100 transition-colors uppercase tracking-widest text-xs"
                  >
                    Fechar Receita
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Index Modal */}
      <AnimatePresence>
        {showIndex && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm"
            onClick={() => setShowIndex(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-parchment-50 w-full max-w-3xl h-[85vh] flex flex-col rounded-xl shadow-2xl border-4 border-parchment-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-parchment-300 flex justify-between items-center bg-parchment-100">
                <h2 className="text-2xl font-display font-bold text-ink-900 flex items-center gap-3">
                  <List className="w-6 h-6 text-parchment-700" /> Índice Completo
                </h2>
                <button 
                  onClick={() => setShowIndex(false)}
                  className="px-4 py-2 text-xs uppercase tracking-widest font-bold border border-parchment-400 text-ink-900 rounded-full hover:bg-parchment-200 transition-colors"
                >
                  Fechar
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10">
                {Array.from(new Set(recipes.map(r => r.category))).sort().map(category => (
                  <div key={category}>
                    <h3 className="text-2xl font-display font-bold text-ink-900 mb-6 border-b-2 border-parchment-300 pb-2">
                      {category}
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                      {recipes.filter(r => r.category === category).sort((a,b) => a.title.localeCompare(b.title)).map(recipe => (
                        <li key={recipe.id}>
                          <button 
                            onClick={() => {
                              setSelectedRecipe(recipe);
                              setShowIndex(false);
                            }}
                            className="text-left w-full hover:text-parchment-800 hover:bg-parchment-200 px-3 py-2 rounded-lg transition-colors text-ink-700 text-sm font-serif group flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-parchment-400 group-hover:bg-parchment-600 transition-colors"></span>
                            {recipe.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm"
            onClick={() => setShowInfo(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-parchment-50 w-full max-w-lg p-10 rounded-xl shadow-2xl border-4 border-parchment-200 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <BookOpen className="w-16 h-16 text-parchment-800 mx-auto mb-6" />
              <h2 className="text-3xl font-display font-bold text-ink-900 mb-2">A Arte Culinária na Bahia</h2>
              <p className="text-parchment-700 italic mb-8 font-serif">por Manuel Querino</p>
              
              <div className="text-ink-800 space-y-5 text-left text-sm leading-relaxed mb-10 font-serif">
                <p>
                  Este aplicativo é uma adaptação digital e local-first do clássico livro <strong>"A Arte Culinária na Bahia"</strong>, escrito pelo historiador, antropólogo e artista baiano Manuel Querino (1851–1923).
                </p>
                <p>
                  A obra é um registro histórico inestimável que documentou, de forma pioneira, as contribuições africanas para a culinária baiana e brasileira, resgatando as tradições e processos genuínos.
                </p>
                <p>
                  <em>As {recipes.length} receitas aqui contidas mantêm as orientações e descrições originais da edição clássica.</em>
                </p>
              </div>

              <button 
                onClick={() => setShowInfo(false)}
                className="px-8 py-3 border border-ink-900 text-ink-900 rounded-full font-bold hover:bg-ink-900 hover:text-parchment-100 transition-colors uppercase tracking-widest text-xs"
              >
                Voltar às Receitas
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
