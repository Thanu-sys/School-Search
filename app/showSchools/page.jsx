// file: app/showSchools/page.jsx
'use client';
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockSchools = [
    {
      id: 1,
      name: "Delhi Public School",
      address: "123 Education Road, Sector 15",
      city: "New Delhi",
      state: "Delhi",
      contact: "9876543210",
      email_id: "info@dps.com",
      imageUrl: "https://placehold.co/400x300/3b82f6/white?text=DPS+Delhi"
    },
    {
      id: 2,
      name: "Modern High School",
      address: "456 Learning Street, Bandra West",
      city: "Mumbai",
      state: "Maharashtra", 
      contact: "8765432109",
      email_id: "admin@mhs.com",
      imageUrl: "https://placehold.co/400x300/ef4444/white?text=MHS+Mumbai"
    },
    {
      id: 3,
      name: "Bangalore International Academy",
      address: "789 Knowledge Park, Koramangala",
      city: "Bangalore",
      state: "Karnataka",
      contact: "7654321098",
      email_id: "contact@bia.edu",
      imageUrl: "https://placehold.co/400x300/10b981/white?text=BIA+Bangalore"
    }
  ];

  const fetchSchools = async () => {
    try {
      // Try to fetch from real API first
      const response = await fetch("/api/getSchools");
      if (response.ok) {
        const data = await response.json();
        setSchools(data);
      } else {
        // If API fails, use mock data for demo
        setSchools(mockSchools);
      }
    } catch (error) {
      console.error("Error fetching schools:", error);
      // Use mock data as fallback
      setSchools(mockSchools);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        padding: "2rem", 
        textAlign: "center",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ fontSize: "1.5rem", color: "#666" }}>Loading schools...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <div style={{ 
        background: "white", 
        padding: "2rem", 
        borderRadius: "12px", 
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        marginBottom: "2rem"
      }}>
        <h1 style={{ 
          textAlign: "center", 
          marginBottom: "1rem", 
          color: "#1f2937",
          fontSize: "2.5rem",
          fontWeight: "bold"
        }}>
          🏫 All Schools
        </h1>
        <p style={{ 
          textAlign: "center", 
          color: "#6b7280",
          fontSize: "1.1rem"
        }}>
          Browse through our complete directory of registered schools
        </p>
      </div>
      
      {/* Responsive Grid Layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "1.5rem"
      }}>
        {schools.map((school) => (
          <div key={school.id} style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
          }}
          >
            {/* School Image */}
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <img 
                src={school.imageUrl || "https://placehold.co/400x300/3b82f6/white?text=School+Image"} 
                alt={school.name}
                style={{ 
                  width: "100%", 
                  height: "200px", 
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "2px solid #f1f5f9"
                }}
                onError={(e) => {
                  e.target.src = "https://placehold.co/400x300/3b82f6/white?text=School+Image";
                }}
              />
            </div>

            {/* School Details */}
            <h3 style={{ 
              margin: "0.5rem 0", 
              color: "#1f2937",
              fontSize: "1.3rem",
              fontWeight: "600"
            }}>
              {school.name}
            </h3>
            
            <p style={{ margin: "0.5rem 0", color: "#6b7280" }}>
              <strong>📍 Address:</strong> {school.address}
            </p>
            
            <p style={{ margin: "0.5rem 0", color: "#6b7280" }}>
              <strong>🏙️ City:</strong> {school.city}, {school.state}
            </p>

            {school.contact && (
              <p style={{ margin: "0.5rem 0", color: "#6b7280" }}>
                <strong>📞 Contact:</strong> {school.contact}
              </p>
            )}

            {school.email_id && (
              <p style={{ margin: "0.5rem 0", color: "#6b7280" }}>
                <strong>📧 Email:</strong> {school.email_id}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Message if no schools are found */}
      {schools.length === 0 && (
        <div style={{ 
          textAlign: "center", 
          marginTop: "3rem",
          padding: "3rem",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🏫</div>
          <h3 style={{ color: "#374151", marginBottom: "1rem" }}>No Schools Found</h3>
          <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
            No schools have been added to the database yet.
          </p>
          <a href="/addSchool" style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            transition: "transform 0.2s"
          }}>
            ➕ Add First School
          </a>
        </div>
      )}
    </div>
  );
}