// file: app/page.tsx (Professional School Search with Sidebar)
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'];
  const boards = ['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE', 'Cambridge'];
  const featuredSchools = [
    { id: 1, name: 'Delhi Public School', city: 'New Delhi', rating: 4.5 },
    { id: 2, name: 'Modern High School', city: 'Mumbai', rating: 4.3 },
    { id: 3, name: 'Bangalore International', city: 'Bangalore', rating: 4.7 }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to showSchools page with search filters
    window.location.href = `/showSchools?search=${searchTerm}&city=${selectedCity}&board=${selectedBoard}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: 'Arial, sans-serif',
      display: 'flex'
    }}>
      
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '280px',
          background: 'white',
          padding: '2rem 1.5rem',
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 1000
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            🏫 EduFind
          </div>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Find Your Perfect School</p>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { href: '/', label: '🔍 Search Schools', active: true },
            { href: '/showSchools', label: '📊 Browse All Schools' },
            { href: '/addSchool', label: '➕ Add New School' },
            { href: '#', label: '⭐ Featured Schools' },
            { href: '#', label: '📞 Contact Us' },
            { href: '#', label: 'ℹ️ About' }
          ].map((item, index) => (
            <Link key={index} href={item.href} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ x: 5 }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: item.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: item.active ? 'white' : '#333',
                  fontWeight: item.active ? '600' : '400',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Quick Stats */}
        <div style={{ 
          marginTop: '2rem', 
          padding: '1.5rem', 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: '12px',
          color: 'white'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>📊 Quick Stats</h4>
          <div style={{ fontSize: '0.9rem' }}>
            <div>10,000+ Schools</div>
            <div>50+ Cities</div>
            <div>5,000+ Reviews</div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={{ 
        marginLeft: '280px', 
        padding: '2rem', 
        width: 'calc(100% - 280px)',
        minHeight: '100vh'
      }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '15px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            marginBottom: '2rem'
          }}
        >
          <h1 style={{ 
            fontSize: '2.8rem', 
            fontWeight: 'bold', 
            color: '#2d3748', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Find the Right School for Your Child
          </h1>
          <p style={{ color: '#718096', fontSize: '1.2rem', lineHeight: '1.6' }}>
            Discover the perfect educational environment with our comprehensive school search platform
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ 
            background: 'white', 
            padding: '2.5rem', 
            borderRadius: '15px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            marginBottom: '2rem'
          }}
        >
          <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Main Search Bar */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '600', color: '#2d3748', fontSize: '1.1rem' }}>
                Search Schools by Name, Location, or Features
              </label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter school name, location, or keywords..."
                  style={{
                    flex: 1,
                    padding: '16px 20px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '16px 32px',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  🔍 Search
                </motion.button>
              </div>
            </div>

            {/* Quick Filters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#2d3748' }}>
                  Choose City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#2d3748' }}>
                  Education Board
                </label>
                <select
                  value={selectedBoard}
                  onChange={(e) => setSelectedBoard(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">All Boards</option>
                  {boards.map(board => (
                    <option key={board} value={board}>{board}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Featured Schools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '15px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)' 
          }}
        >
          <h2 style={{ color: '#2d3748', marginBottom: '1.5rem', fontSize: '1.5rem' }}>⭐ Featured Schools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {featuredSchools.map(school => (
              <motion.div
                key={school.id}
                whileHover={{ y: -5 }}
                style={{
                  padding: '1.5rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                <h3 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>{school.name}</h3>
                <p style={{ color: '#718096', marginBottom: '1rem' }}>{school.city}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#f59e0b' }}>⭐</span>
                  <span style={{ color: '#2d3748', fontWeight: '600' }}>{school.rating}</span>
                  <span style={{ color: '#718096' }}>/5.0</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}
        >
          {[
            { number: '10,000+', label: 'Schools Listed' },
            { number: '50+', label: 'Cities Covered' },
            { number: '5,000+', label: 'Parent Reviews' },
            { number: '100%', label: 'Verified Information' }
          ].map((stat, index) => (
            <div key={index} style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '1.5rem',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{stat.number}</div>
              <div style={{ fontSize: '0.9rem' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}