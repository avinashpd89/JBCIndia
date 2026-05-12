import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiBarChart2, FiUsers, FiShoppingBag, FiDollarSign } from 'react-icons/fi';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'admin') {
      navigate('/');
      toast.error('Unauthorized access');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, statsRes] = await Promise.all([
          api.get('/products?limit=10'),
          api.get('/admin/stats'),
        ]);

        setProducts(productsRes.data.products || []);
        setStats(statsRes.data || stats);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const StatCard = ({ icon, label, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="text-4xl text-amber-700 opacity-20">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your jewelry store</p>
          </div>
          <Link
            to="/admin/products/add"
            className="flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition font-semibold"
          >
            <FiPlus size={20} />
            Add Product
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={<FiShoppingBag />}
            label="Total Products"
            value={stats.totalProducts}
          />
          <StatCard
            icon={<FiBarChart2 />}
            label="Total Orders"
            value={stats.totalOrders}
          />
          <StatCard
            icon={<FiDollarSign />}
            label="Total Revenue"
            value={`₹${stats.totalRevenue?.toLocaleString('en-IN') || 0}`}
          />
          <StatCard
            icon={<FiUsers />}
            label="Total Customers"
            value={stats.totalCustomers}
          />
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Recent Products</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
              </div>
            </div>
          ) : products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-gray-900 font-medium">{product.name}</td>
                      <td className="px-6 py-4 text-gray-600">{product.category}</td>
                      <td className="px-6 py-4 text-gray-900 font-semibold">
                        ₹{product.price}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            product.stock > 0
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.stock || 0} units
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-3">
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <FiEdit2 size={18} />
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No products found. Start by adding your first product.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
