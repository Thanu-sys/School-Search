// file: app/showSchools/page.jsx
'use client';
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  // Curated quotes about education/learning
  const quotes = [
    'Education is the most powerful weapon which you can use to change the world. — Nelson Mandela',
    'The beautiful thing about learning is that no one can take it away from you. — B.B. King',
    'The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt',
    'Learning is a treasure that will follow its owner everywhere. — Chinese Proverb',
    'A good education is a foundation for a better future. — Elizabeth Warren'
  ];
  const quote = quotes[new Date().getDate() % quotes.length];

  // Function to fetch schools from the API
  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/getSchools");
      if (!response.ok) {
        throw new Error('Failed to fetch schools');
      }
      const data = await response.json();
      setSchools(data);
    } catch (error) {
      console.error("Error fetching schools:", error);
      alert('Failed to load schools. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch schools when the page loads
  useEffect(() => {
    fetchSchools();
  }, []);

  // Generate random rating for demo purposes
  const getRandomRating = () => {
    return (Math.random() * 2 + 3).toFixed(1); // Rating between 3.0 and 5.0
  };

  // Generate random board for demo purposes
  const getRandomBoard = () => {
    const boards = ['CBSE', 'ICSE', 'State Board'];
    return boards[Math.floor(Math.random() * boards.length)];
  };

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ 
          textAlign: "center", 
          marginBottom: "0.75rem", 
          color: "#1e293b",
          fontSize: "2.25rem",
          fontWeight: "bold"
        }}>
          🏫 Schools Directory
        </h1>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <p style={{
            display: 'inline-block',
            margin: 0,
            padding: '0.5rem 1rem',
            color: '#475569',
            backgroundColor: '#f1f5f9',
            borderRadius: '9999px',
            fontStyle: 'italic',
            fontSize: '0.95rem'
          }}>{quote}</p>
        </div>
        
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <div style={{ 
              display: "inline-block",
              width: "40px",
              height: "40px",
              border: "4px solid #f3f4f6",
              borderTop: "4px solid #3b82f6",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }}></div>
            <p style={{ marginTop: "1rem", color: "#6b7280" }}>Loading schools...</p>
          </div>
        ) : (
          <>
            {/* Responsive Grid Layout */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2rem",
              justifyItems: "center"
            }}>
              {schools.map((school) => (
                <div key={school.id} style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "0",
                  width: "100%",
                  maxWidth: "350px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  backgroundColor: "white",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                }}
                >
                  {/* School Image */}
                  <div style={{ position: "relative" }}>
                    <img 
                      src={school.imageUrl || ""} 
                      alt={school.name}
                      style={{ 
                        width: "100%", 
                        height: "200px", 
                        objectFit: "cover"
                      }}
                    />
                  </div>

                  {/* School Details */}
                  <div style={{ padding: "1rem 1.25rem 1.25rem 1.25rem" }}>
                    {/* School Name */}
                    <h3 style={{ 
                      margin: "0 0 0.5rem 0", 
                      color: "#1f2937",
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      lineHeight: "1.3"
                    }}>
                      {school.name}
                    </h3>
                    
                    {/* City */}
                    <p style={{ 
                      margin: "0 0 0.25rem 0", 
                      color: "#64748b",
                      fontSize: "14px"
                    }}>
                      {school.city}
                    </p>

                    {/* Address */}
                    <p style={{ 
                      margin: 0, 
                      color: "#94a3b8",
                      fontSize: "13px"
                    }}>
                      {school.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message if no schools are found */}
            {schools.length === 0 && (
              <div style={{ 
                textAlign: "center", 
                marginTop: "3rem",
                padding: "3rem 2rem",
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
              }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🏫</div>
                <p style={{ fontSize: "1.25rem", color: "#374151", margin: "0 0 0.5rem 0" }}>
                  No schools found in the database.
                </p>
                <p style={{ color: "#6b7280", margin: 0 }}>
                  Add some schools using the "Add New School" page!
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}