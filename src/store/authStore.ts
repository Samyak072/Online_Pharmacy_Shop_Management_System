import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // TODO: Implement actual authentication
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      role: 'user',
    };
    set({ user: mockUser, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));