"use client"

export function ServiceCards() {
  return (
    <>
      {/* 
        HTML/CSS Service Cards
        - Using semantic HTML5 elements
        - CSS Grid for responsive layout
        - Clean, maintainable structure
      */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>

          <div className="services-grid">
            {/* Garage Services Card */}
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" className="icon">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <h3 className="service-title">Garage Services</h3>
              <p className="service-description">Professional maintenance and repair services</p>

              <ul className="service-features">
                <li>Scheduled Maintenance</li>
                <li>Repairs & Diagnostics</li>
                <li>Body Work</li>
                <li>Performance Upgrades</li>
              </ul>

              <a href="/garage-services" className="service-link">
                Learn More
              </a>
            </div>

            {/* Insurance Services Card */}
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" className="icon">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="service-title">Insurance Services</h3>
              <p className="service-description">Comprehensive insurance solutions</p>

              <ul className="service-features">
                <li>All Vehicle Types</li>
                <li>Third Party & Comprehensive</li>
                <li>Quick Claims</li>
                <li>Renewal Services</li>
              </ul>

              <a href="/insurance-services" className="service-link">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Standard CSS styles */}
      <style jsx>{`
        /* Services section */
        .services-section {
          padding: 4rem 0;
          background-color: #f9fafb;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .section-title {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 3rem;
        }
        
        /* Services grid */
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        /* Service card */
        .service-card {
          background-color: #1e3a8a;
          color: white;
          border-radius: 0.5rem;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .service-icon {
          margin-bottom: 1.5rem;
        }
        
        .icon {
          width: 3rem;
          height: 3rem;
          stroke: currentColor;
          stroke-width: 2;
          fill: none;
        }
        
        .service-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .service-description {
          font-size: 1.125rem;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }
        
        /* Service features */
        .service-features {
          list-style-type: none;
          padding: 0;
          margin: 0 0 2rem 0;
        }
        
        .service-features li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .service-features li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 0.5rem;
          height: 0.5rem;
          background-color: #4ade80;
          border-radius: 50%;
        }
        
        /* Service link */
        .service-link {
          display: block;
          background-color: #4ade80;
          color: #1f2937;
          text-align: center;
          padding: 0.75rem;
          border-radius: 0.375rem;
          font-weight: 600;
          text-decoration: none;
          transition: background-color 0.2s;
          margin-top: auto;
        }
        
        .service-link:hover {
          background-color: #34d399;
        }
      `}</style>
    </>
  )
}


