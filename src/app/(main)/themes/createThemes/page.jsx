'use client';
import ThemeForm from "@/components/forms/CreateTheme";
import { defaultTheme } from "../../../../../features/portfolio/portfolioSlice";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Page() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          toast.error("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        toast.error("An error occurred while fetching user");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);
const saveTheme = async (data) => {
  try {
    if (!userId) {
      toast.error("User ID not found!");
      return;
    }

    const payload = {
      name: data.name,
      userId,
      colors: {
        light: data.light,
        dark: data.dark
      }
    };

    console.log("Sending payload:", payload); // Debug log

    const res = await fetch("/api/themes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseData = await res.json();
    
    if (!res.ok) {
      console.error("API Error:", responseData);
      toast.error(responseData.message || "Failed to save theme");
      return;
    }

    toast.success("Theme saved successfully!");
    return responseData;
    
  } catch (error) {
    console.error("Network Error:", error);
    toast.error(error.message || "Network error occurred");
  }
};


  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2 size={25} className="animate-spin" />
        </div>
      ) : (
        <ThemeForm defaultValues={defaultTheme} onSubmit={saveTheme} />
      )}
    </>
  );
}
