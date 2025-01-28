import { Category } from '../types/Category';

export const pageTitle = (type: Category) => {
  if (type === Category.phones) return 'Mobile Phones';
  if (type === Category.tablets) return 'Tablets';
  return 'Accessories';
};
