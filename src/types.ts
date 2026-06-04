export interface Shade {
  id: string;
  name: string;
  hex: string;
  bgHex: string;
  description: string;
  longDescription: string;
}

export interface CartItem {
  id: string; // unique id combining target item + shade if applicable
  itemId: string; // 'starter-kit' or 'biab-formula'
  name: string;
  price: number;
  quantity: number;
  shade?: Shade;
  image: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  shade: string;
}

export type ActivePage = 'home' | 'pdp' | 'protocol' | 'quiz';
