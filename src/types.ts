export interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients?: string[];
  instructions: string;
  image?: string;
  category: 'Africana' | 'Baiana' | 'Sobremesa' | 'Outros';
}
