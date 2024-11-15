import { create } from 'zustand';
import { CartItem, Medicine } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (medicine: Medicine) => void;
  removeItem: (medicineId: string) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  addItem: (medicine: Medicine) => {
    const items = get().items;
    const existingItem = items.find(item => item.medicineId === medicine.id);
    
    if (existingItem) {
      const updatedItems = items.map(item =>
        item.medicineId === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      set({ items: updatedItems });
    } else {
      set({ items: [...items, { medicineId: medicine.id, quantity: 1, medicine }] });
    }
    
    set(state => ({
      total: state.items.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0)
    }));
  },
  removeItem: (medicineId: string) => {
    set(state => ({
      items: state.items.filter(item => item.medicineId !== medicineId),
      total: state.items
        .filter(item => item.medicineId !== medicineId)
        .reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0)
    }));
  },
  updateQuantity: (medicineId: string, quantity: number) => {
    set(state => ({
      items: state.items.map(item =>
        item.medicineId === medicineId ? { ...item, quantity } : item
      ),
      total: state.items
        .map(item => item.medicineId === medicineId ? { ...item, quantity } : item)
        .reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0)
    }));
  },
  clearCart: () => set({ items: [], total: 0 }),
}));