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

  // ... keep the rest of your JSX code unchanged ...
  // (The display part with grids and cards)