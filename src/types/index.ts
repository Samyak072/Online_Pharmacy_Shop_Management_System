export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'tablets' | 'syrups' | 'supplements';
  brand: string;
  image: string;
  stock: number;
}

export interface CartItem {
  medicineId: string;
  quantity: number;
  medicine: Medicine;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed';
  createdAt: string;
}