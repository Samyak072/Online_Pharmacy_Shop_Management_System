import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Medicine } from '../types';

const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    description: 'Pain relief and fever reduction',
    price: 5.99,
    category: 'tablets',
    brand: 'HealthCare',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    stock: 100
  },
  {
    id: '2',
    name: 'Vitamin C Syrup',
    description: 'Immunity booster',
    price: 12.99,
    category: 'syrups',
    brand: 'VitaHealth',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400',
    stock: 50
  },
  {
    id: '3',
    name: 'Omega-3 Fish Oil',
    description: 'Heart and brain health supplement',
    price: 24.99,
    category: 'supplements',
    brand: 'NutriLife',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=400',
    stock: 75
  },
  {
    id: '4',
    name: 'Aspirin 300mg',
    description: 'Pain relief and blood thinner',
    price: 4.99,
    category: 'tablets',
    brand: 'HealthCare',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    stock: 150
  },
  {
    id: '5',
    name: 'Multivitamin Syrup',
    description: 'Complete nutritional supplement',
    price: 15.99,
    category: 'syrups',
    brand: 'VitaHealth',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400',
    stock: 30
  }
];

export default function Medicines() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  
  const { addItem, items } = useCartStore();

  const filteredMedicines = useMemo(() => {
    return mockMedicines.filter((medicine) => {
      const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
      const matchesPrice = medicine.price >= priceRange[0] && medicine.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, priceRange]);

  const handleAddToCart = (medicine: Medicine) => {
    addItem(medicine);
  };

  const isInCart = (medicineId: string) => {
    return items.some(item => item.medicineId === medicineId);
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search medicines..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="tablets">Tablets</option>
              <option value="syrups">Syrups</option>
              <option value="supplements">Supplements</option>
            </select>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100"
            >
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range (${priceRange[0]} - ${priceRange[1]})
                </label>
                <div className="flex gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map((medicine) => (
          <div key={medicine.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src={medicine.image}
              alt={medicine.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{medicine.name}</h3>
                <span className="bg-emerald-100 text-emerald-800 text-sm px-2 py-1 rounded">
                  {medicine.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{medicine.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${medicine.price.toFixed(2)}</span>
                <button
                  onClick={() => handleAddToCart(medicine)}
                  className={`px-4 py-2 rounded-lg ${
                    isInCart(medicine.id)
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                  disabled={isInCart(medicine.id)}
                >
                  {isInCart(medicine.id) ? 'In Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMedicines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No medicines found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}