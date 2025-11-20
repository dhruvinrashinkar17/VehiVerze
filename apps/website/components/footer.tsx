"use client"

export function Footer() {
  return (
    <>
      {/* 
      INTEGRATION: Using standard HTML elements with CSS for the footer
      - Preserves all original links, sections, and routing
      - Maintains the same structure and organization
      - Uses semantic HTML5 elements
      - Styling with CSS instead of utility classes
    */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-column company-info">
              <h2 className="footer-logo">Vehiverze</h2>
              <p className="footer-description">Your trusted partner for all vehicle-related needs.</p>

              <h3 className="footer-heading">Connect With Us</h3>
              <div className="social-links">
                {/* Preserving all original social links */}
                <a
                  href="https://www.facebook.com/profile.php?id=61572537437670"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="https://x.com/Vehiverze" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="sr-only">Twitter</span>
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/vehiverze/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.689-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="sr-only">YouTube</span>
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links - preserving all original links and routes */}
            <div className="footer-column">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <a href="/about" className="footer-link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="footer-link">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/careers" className="footer-link">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/blog" className="footer-link">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Services - preserving all original links and routes */}
            <div className="footer-column">
              <h3 className="footer-heading">Services</h3>
              <ul className="footer-links">
                <li>
                  <a href="/buy" className="footer-link">
                    Buy a Vehicle
                  </a>
                </li>
                <li>
                  <a href="/buy/cars" className="footer-link sub-link">
                    Cars
                  </a>
                </li>
                <li>
                  <a href="/buy/bikes" className="footer-link sub-link">
                    Bikes
                  </a>
                </li>
                <li>
                  <a href="/buy/commercial" className="footer-link sub-link">
                    Commercial Vehicles
                  </a>
                </li>
                <li>
                  <a href="/sell" className="footer-link">
                    Sell a Vehicle
                  </a>
                </li>
                <li>
                  <a href="/sell/instant-offers" className="footer-link sub-link">
                    Instant Offers
                  </a>
                </li>
                <li>
                  <a href="/sell/rc-transfer" className="footer-link sub-link">
                    RC Transfer
                  </a>
                </li>
                <li>
                  <a href="/garage-services" className="footer-link">
                    Garage Services
                  </a>
                </li>
                <li></li>
              </ul>
            </div>

            {/* Discover - preserving all original links and routes */}
            <div className="footer-column">
              <h3 className="footer-heading">Discover</h3>
              <ul className="footer-links">
                <li>
                  <a href="/vehicle-valuation" className="footer-link">
                    Vehicle Valuation
                  </a>
                </li>
                <li>
                  <a href="/challan" className="footer-link">
                    Check & Pay Challan
                  </a>
                </li>
                <li>
                  <a href="/vehicle-details" className="footer-link">
                    Check Vehicle Details
                  </a>
                </li>
                <li>
                  <a href="/new-vehicles" className="footer-link">
                    Explore New Vehicles
                  </a>
                </li>
                <li>
                  <a href="/scrap" className="footer-link">
                    Scrap Your Vehicle
                  </a>
                </li>
              </ul>

              <div className="additional-features">
                <h3 className="footer-heading additional-heading">Additional Features</h3>
                <ul className="footer-links">
                  <li>
                    <a href="/emi-calculator" className="footer-link">
                      EMI Calculator
                    </a>
                  </li>
                  <li>
                    <a href="/trade" className="footer-link">
                      Trade with Us
                    </a>
                  </li>
                  <li>
                    <a href="/partner" className="footer-link">
                      Become a Vehiverze Partner
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Help & Support + Legal - preserving all original links and routes */}
            <div className="footer-column">
              <h3 className="footer-heading">Help & Support</h3>
              <ul className="footer-links">
                <li>
                  <a href="/faq" className="footer-link">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="/how-it-works" className="footer-link">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="/security" className="footer-link">
                    Security & Safety
                  </a>
                </li>
                <li>
                  <a href="/inspection" className="footer-link">
                    Inspection Process
                  </a>
                </li>
                <li>
                  <a href="/rc-transfer-status" className="footer-link">
                    RC Transfer Status
                  </a>
                </li>
                <li>
                  <a href="/customer-support" className="footer-link">
                    Customer Support
                  </a>
                </li>
              </ul>

              <h3 className="footer-heading additional-heading">Legal & Policies</h3>
              <ul className="footer-links">
                <li>
                  <a href="/terms" className="footer-link">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="footer-link">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/cookie-policy" className="footer-link">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="/refund-cancellation" className="footer-link">
                    Refund & Cancellation
                  </a>
                </li>
                <li>
                  <a href="/disclaimer" className="footer-link">
                    Disclaimer
                  </a>
                </li>
                <li>
                  <a href="/sitemap" className="footer-link">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright - preserving dynamic year calculation */}
          <div className="copyright">
            <p>© {new Date().getFullYear()} Vehiverze. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* CSS styles for the footer */}
      <style jsx>{`
.site-footer {
  background-color: #f9fafb;
  color: #333;
  padding: 3rem 0;
  border-top: 1px solid #e5e7eb;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #000;
}

.footer-description {
  color: #4b5563;
  margin-bottom: 1.5rem;
}

.footer-heading {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #000;
}

.additional-heading {
  margin-top: 1.5rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  color: #4b5563;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #2b4ba9;
}

.sub-link {
  padding-left: 1rem;
  font-size: 0.875rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: #4b5563;
  transition: color 0.2s;
}

.social-link:hover {
  color: #2b4ba9;
}

.social-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.copyright {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  color: #6b7280;
}

.additional-features {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f9fafb;
}
`}</style>
    </>
  )
}


