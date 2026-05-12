import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import OurLeaders from './pages/OurLeaders';
import OurBranches from './pages/OurBranches';
import Career from './pages/Career';
import FirmOverview from './pages/FirmOverview';
import Dashboard from './pages/admin/Dashboard';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token validity
      // dispatch(verifyToken());
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Products />} />
            <Route path="/services/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/our-leaders" element={<OurLeaders />} />
            <Route path="/our-branches" element={<OurBranches />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/career" element={<Career />} />
            <Route path="/firm-overview" element={<FirmOverview />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin">
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
