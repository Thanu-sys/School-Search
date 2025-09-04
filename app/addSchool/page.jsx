// file: app/addSchool/page.jsx
'use client';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Build multipart form data so we can upload a file
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email_id', data.email_id);
      if (data.imageUrl) formData.append('imageUrl', data.imageUrl);
      if (data.imageFile && data.imageFile[0]) {
        formData.append('imageFile', data.imageFile[0]);
      }

      const response = await fetch("/api/addSchool", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      if (response.ok) {
        alert('School added successfully! 🎉');
        reset();
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      alert('Error: Failed to connect to server');
    }
    setIsSubmitting(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'white',
          padding: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '600px'
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🏫 Add New School
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Fill in the details to register a new school
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* School Name */}
          <motion.div variants={itemVariants}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              School Name *
            </label>
            <input
              {...register("name", { required: "School name is required" })}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${errors.name ? '#ff4757' : '#ddd'}`,
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = errors.name ? '#ff4757' : '#ddd'}
              placeholder="Enter school name"
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: '#ff4757', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}
              >
                {errors.name.message}
              </motion.p>
            )}
          </motion.div>

          {/* Address */}
          <motion.div variants={itemVariants}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              Address *
            </label>
            <textarea
              {...register("address", { required: "Address is required" })}
              rows={3}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${errors.address ? '#ff4757' : '#ddd'}`,
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none',
                resize: 'vertical'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = errors.address ? '#ff4757' : '#ddd'}
              placeholder="Enter complete address"
            />
            {errors.address && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: '#ff4757', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}
              >
                {errors.address.message}
              </motion.p>
            )}
          </motion.div>

          {/* City and State Row */}
          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                City *
              </label>
              <input
                {...register("city", { required: "City is required" })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${errors.city ? '#ff4757' : '#ddd'}`,
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = errors.city ? '#ff4757' : '#ddd'}
                placeholder="Enter city"
              />
              {errors.city && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#ff4757', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}
                >
                  {errors.city.message}
                </motion.p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                State *
              </label>
              <input
                {...register("state", { required: "State is required" })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${errors.state ? '#ff4757' : '#ddd'}`,
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = errors.state ? '#ff4757' : '#ddd'}
                placeholder="Enter state"
              />
              {errors.state && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#ff4757', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}
                >
                  {errors.state.message}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Contact and Email Row */}
          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                Contact Number *
              </label>
              <input
                type="number"
                {...register("contact", { 
                  required: "Contact number is required",
                  minLength: { value: 10, message: "Must be 10 digits" },
                  maxLength: { value: 10, message: "Must be 10 digits" }
                })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${errors.contact ? '#ff4757' : '#ddd'}`,
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = errors.contact ? '#ff4757' : '#ddd'}
                placeholder="10-digit number"
              />
              {errors.contact && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#ff4757', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}
                >
                  {errors.contact.message}
                </motion.p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                Email Address *
              </label>
              <input
                type="email"
                {...register("email_id", { 
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${errors.email_id ? '#ff4757' : '#ddd'}`,
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = errors.email_id ? '#ff4757' : '#ddd'}
                placeholder="email@example.com"
              />
              {errors.email_id && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#ff4757', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}
                >
                  {errors.email_id.message}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Image URL */}
          <motion.div variants={itemVariants}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              Image URL
            </label>
            <input
              {...register("imageUrl")}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #ddd',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
              placeholder="https://example.com/school-image.jpg"
            />
          </motion.div>

          {/* OR Upload Image */}
          <motion.div variants={itemVariants}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              Upload Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              {...register('imageFile')}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid #ddd',
                borderRadius: '10px',
                background: '#fafafa'
              }}
            />
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              If both URL and upload are provided, the uploaded file will be used.
            </p>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginTop: '1rem' }}>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '15px 40px',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                transition: 'all 0.3s ease',
                width: '100%',
                maxWidth: '300px'
              }}
            >
              {isSubmitting ? 'Adding School...' : '➕ Add School'}
            </motion.button>
          </motion.div>
        </motion.form>
        {/* Force black text color for all inputs and placeholders on this page */}
        <style jsx global>{`
          input, textarea, select { color: #000 !important; }
          input::placeholder, textarea::placeholder { color: #000 !important; opacity: 1; }
        `}</style>
      </motion.div>
    </div>
  );
}