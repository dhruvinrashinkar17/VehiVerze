"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Button } from "@vehiverze/ui/button";
import { Upload, Download, AlertCircle, Loader2 } from "lucide-react";
import { useDeviceType } from "@/lib/device-detection";
import { useRef } from "react";
import { useAuthContext } from "@/components/auth-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const _deviceType = useDeviceType();
  const pathname = usePathname();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isStaff, isLoading, roleError, isAuthenticated } = useAuthContext();

  // Redirect to login if not authenticated or not staff
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    } else if (!isLoading && isAuthenticated && !isStaff && roleError) {
      // User is authenticated but not staff - show error, then redirect
      const timeout = setTimeout(() => {
        router.push("/login");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, isAuthenticated, isStaff, roleError, router]);

  const isProductsSection = pathname.startsWith("/admin/products");

  const handleImportCSV = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target?.result as string;
        console.log("CSV Data:", csvData);
        alert("CSV file imported successfully!");
      };
      reader.readAsText(file);
    } else {
      alert("Please select a valid CSV file");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleExportExcel = () => {
    const sampleData = [
      ["Vehicle", "Type", "Brand", "Base Price", "Max Price", "Status"],
      ["Honda Activa", "2 Wheeler", "Honda", "75000", "85000", "Active"],
      [
        "Maruti Swift",
        "4 Wheeler - Cars",
        "Maruti",
        "550000",
        "750000",
        "Active",
      ],
    ];
    const csvContent = sampleData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `products_export_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Show error state if not staff
  if (roleError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4 p-8 max-w-md text-center">
          <div className="p-3 rounded-full bg-destructive/10">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Access Denied
          </h2>
          <p className="text-muted-foreground">{roleError}</p>
          <p className="text-sm text-muted-foreground">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-background overflow-hidden">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed sm:relative inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out sm:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {isProductsSection && (
          <div className="border-b border-border bg-card/30 px-4 sm:px-6 py-3 flex-shrink-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="text-xs sm:text-sm font-semibold text-muted-foreground">
                Data Management
              </h2>
              <div className="flex w-full sm:w-auto items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleImportCSV}
                  className="flex-1 sm:flex-none h-8 bg-transparent text-xs sm:text-sm transition-smooth"
                >
                  <Upload className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
                  <span className="truncate">Import CSV</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportExcel}
                  className="flex-1 sm:flex-none h-8 bg-transparent text-xs sm:text-sm transition-smooth"
                >
                  <Download className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
                  <span className="truncate">Export Excel</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-auto p-4 sm:p-6 space-y-6 bg-gradient-to-br from-background via-background to-accent/10">
          {children}
        </main>
      </div>
    </div>
  );
}
