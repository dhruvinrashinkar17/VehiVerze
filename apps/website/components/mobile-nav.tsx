"use client"

import { useState, useEffect } from "react"
import { X, Home, ShoppingCart, Car, Wrench, Info, User, Truck } from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-provider"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest(".mobile-nav-drawer") && !target.closest(".mobile-menu-button")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navigateTo = (path: string) => {
    router.push(path)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
          <button className="close-button" onClick={toggleMenu} aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="drawer-content">
          <button className="nav-item" onClick={() => navigateTo("/")}>
            <Home className="h-5 w-5" />
            <span>Home</span>
          </button>

          <button className="nav-item" onClick={() => navigateTo("/buy")}>
            <ShoppingCart className="h-5 w-5" />
            <span>Buy</span>
          </button>

          <button className="nav-item" onClick={() => navigateTo("/sell")}>
            <Car className="h-5 w-5" />
            <span>Sell</span>
          </button>

          <button className="nav-item" onClick={() => navigateTo("/garage-services")}>
            <Wrench className="h-5 w-5" />
            <span>Garage Services</span>
          </button>

          <button className="nav-item" onClick={() => navigateTo("/scrap")}>
            <Car className="h-5 w-5" />
            <span>Scrap Vehicle</span>
          </button>

          <button className="nav-item" onClick={() => navigateTo("/track-orders")}>
            <Truck className="h-5 w-5" />
            <span>Track Order</span>
          </button>

          <button className="nav-item" onClick={() => navigateTo("/blog")}>
            <Info className="h-5 w-5" />
            <span>Blog</span>
          </button>

          <button className="nav-item" onClick={() => navigateTo("/login")}>
            <User className="h-5 w-5" />
            <span>Login</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="mobile-nav-overlay" onClick={toggleMenu}></div>}

      {/* CSS styles for the mobile navigation */}
      <style jsx>{`
        .mobile-nav-drawer {
          position: fixed;
          top: 0;
          right: -280px;
          width: 280px;
          height: 100vh;
          background-color: white;
          z-index: 52;
          transition: right 0.3s ease;
          box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
        }
        
        .mobile-nav-drawer.open {
          right: 0;
        }
        
        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .close-button {
          background: none;
          border: none;
          color: #4b5563;
          cursor: pointer;
        }
        
        .drawer-content {
          display: flex;
          flex-direction: column;
          padding: 1rem 0;
          overflow-y: auto;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          color: #4b5563;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .nav-item:hover {
          background-color: #f3f4f6;
          color: #1a56db;
        }
        
        .mobile-nav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 51;
        }
        
        @media (min-width: 768px) {
          .mobile-nav-drawer, .mobile-nav-overlay {
            display: none;
          }
        }
      `}</style>
    </>
  )
}


