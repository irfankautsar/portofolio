/* Root */
function App() {
  return (
    <>
      <Navbar/>
      <Hero/>

      <MarqueeStrip items={[
        'Operations',
        'Community Engagement',
        'CSR Programs',
        'Power BI Analytics',
        'BNSP Certified Marketing',
        'General Affairs',
        'Documentation',
        'People-first',
      ]}/>

      <About/>
      <Experience/>

      <MarqueeStrip items={[
        'Selected Work — 2024 / 2025 / 2026',
        'PT Merak Chemicals Indonesia',
        '16 documented activities',
        'After Movie · Power BI Dashboard',
        'CSR · UMKM · Community',
      ]}/>

      <Work/>
      <Certifications/>
      <Skills/>
      <Education/>
      <Contact/>
      <Footer/>

      <div className="status-pill">
        <span className="live"/>
        <span>Available for opportunities</span>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
