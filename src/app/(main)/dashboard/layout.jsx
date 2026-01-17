import React from 'react'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: "Dashboard",
  description: "Build your professional developer portfolio in minutes with BuildFolio.",
};

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={10}
        toastOptions={{
          duration: 3500,
          style: {
            background: "#ffffff",
            color: "#1e293b",
            borderRadius: "8px",
            padding: "14px 18px",
            fontSize: "14px",
            fontWeight: "500",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            maxWidth: "380px",
            lineHeight: "1.5",
          },
          success: {
            iconTheme: {
              primary: "#059669",        // emerald-600
              secondary: "#ffffff",
            },
            style: {
              borderLeft: "3px solid #059669",
              background: "#f0fdf4",    // emerald-50
              border: "1px solid #d1fae5", // emerald-200
            },
          },
          error: {
            iconTheme: {
              primary: "#dc2626",        // red-600
              secondary: "#ffffff",
            },
            style: {
              borderLeft: "3px solid #dc2626",
              background: "#fef2f2",    // red-50
              border: "1px solid #fecaca", // red-200
            },
          },
          loading: {
            iconTheme: {
              primary: "#2563eb",        // blue-600
              secondary: "#ffffff",
            },
            style: {
              borderLeft: "3px solid #2563eb",
              background: "#eff6ff",    // blue-50
              border: "1px solid #bfdbfe", // blue-200
            },
          },
          blank: {
            style: {
              borderLeft: "3px solid #64748b",
              background: "#f8fafc",    // slate-50
              border: "1px solid #e2e8f0", // slate-200
            },
          },
        }}
      />
      {children}
    </div>
  )
}