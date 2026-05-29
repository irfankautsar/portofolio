/* Root */
function App() {
  return (
    <>
      <Navbar/>
      <Hero/>

      <About/>
      <Experience/>

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
