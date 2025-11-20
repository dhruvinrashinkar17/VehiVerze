"use client"

import { Input } from "@vehiverze/ui/input"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Headphones, X, MessageCircle, Search } from "lucide-react"
import { useRouter } from "next/navigation"

export function ChatSupport() {
  const [isVisible, setIsVisible] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  if (!isVisible) return null

  const handleWhatsAppRedirect = () => {
    window.open("https://wa.me/919870947889?text=Hello%20Vehiverze%2C%20I%20need%20assistance%20with%20", "_blank")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsOpen(false)
    }
  }

  return (
    <>
      <div className="chat-support">
        <button onClick={() => setIsVisible(false)} className="close-button" aria-label="Close chat support">
          <X className="h-4 w-4" />
        </button>
        <div className="chat-container">
          <div className="chat-icon-wrapper">
            <Headphones className="chat-icon" />
          </div>
          <div className="chat-content">
            <h3 className="chat-title">Need Help Finding Something?</h3>
            <p className="chat-description">Our support team is here to assist you 24/7</p>
          </div>
          <div className="chat-buttons">
            <Button className="chat-button" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "Close" : "Start Chat"}
            </Button>
            <Button className="whatsapp-button" onClick={handleWhatsAppRedirect}>
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="chat-panel">
            <form onSubmit={handleSearch} className="search-form">
              <Input
                type="search"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <Button type="submit" className="search-button">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <div className="quick-links">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="/faq">Frequently Asked Questions</a>
                </li>
                <li>
                  <a href="/sell">Sell Your Vehicle</a>
                </li>
                <li>
                  <a href="/buy">Buy a Vehicle</a>
                </li>
                <li>
                  <a href="/scrap">Scrap Your Vehicle</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .chat-support {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 50;
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          padding: 1rem;
          max-width: 350px;
        }
        
        .close-button {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          padding: 0.25rem;
          border: none;
          background: transparent;
          cursor: pointer;
          color: #6b7280;
          transition: color 0.2s;
        }
        
        .close-button:hover {
          color: #1f2937;
        }
        
        .chat-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .chat-icon-wrapper {
          background-color: #10b981;
          padding: 0.75rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .chat-icon {
          color: white;
          width: 1.5rem;
          height: 1.5rem;
        }
        
        .chat-content {
          flex: 1;
        }
        
        .chat-title {
          font-weight: 600;
          margin: 0 0 0.25rem 0;
          color: #000;
        }
        
        .chat-description {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }
        
        .chat-buttons {
          display: flex;
          gap: 0.5rem;
          width: 100%;
        }
        
        .chat-button {
          flex: 1;
          background-color: #0054fc;
          color: white;
        }
        
        .whatsapp-button {
          flex: 1;
          background-color: #25D366;
          color: white;
        }
        
        .chat-panel {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }
        
        .search-form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .search-input {
          flex: 1;
        }
        
        .search-button {
          background-color: #10b981;
          color: white;
        }
        
        .quick-links h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #000;
        }
        
        .quick-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .quick-links li {
          margin-bottom: 0.5rem;
        }
        
        .quick-links a {
          color: #0356fc;
          text-decoration: none;
          font-size: 0.875rem;
        }
        
        .quick-links a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}


