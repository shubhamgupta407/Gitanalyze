import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ReportPage from './pages/ReportPage';
import ComparisonPage from './pages/ComparisonPage';

function App() {
  return (
    <div className="app-container flex" style={{ flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/report/:username" element={<ReportPage />} />
          <Route path="/sample" element={<ReportPage />} />
          <Route path="/compare" element={<ComparisonPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
