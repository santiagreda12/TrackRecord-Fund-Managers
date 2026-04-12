import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { TrendingUp, UserPlus } from 'lucide-react';
import ManagerList from './components/ManagerList';
import ManagerDetail from './components/ManagerDetail';
import SuggestModal from './components/SuggestModal';
import AdminSugerencias from './components/AdminSugerencias';
import CompareView from './components/CompareView';
import './index.css';

export const DataContext = createContext([]);

function AppContent({ managers, toggleCompare, compareList, setCompareList, limitReached, showSuggest, setShowSuggest }) {
  const location = useLocation();
  const isComparePage = location.pathname === '/comparar';

  return (
    <div className="container">
      <header>
        <Link to="/" className="logo">
          <img src="/managers/logo.png" alt="Logo" style={{height: '68px', width: 'auto', marginRight: '10px'}} />
          <span>Track Record Fund Managers</span>
        </Link>
        <nav className="flex gap-6" style={{alignItems: 'center'}}>
          <Link to="/" className="nav-link">Explorar</Link>
          <Link to="/comparar" className="nav-link" style={{position: 'relative'}}>
            Comparativa
            {compareList.length > 0 && (
              <span style={{
                position: 'absolute', top: '-8px', right: '-12px',
                background: 'var(--accent-primary)', color: 'white',
                fontSize: '0.7rem', width: '18px', height: '18px',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 10px rgba(99,102,241,0.5)'
              }}>
                {compareList.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setShowSuggest(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px', padding: '10px 20px',
              color: 'white', cursor: 'pointer', fontSize: '0.9rem',
              fontWeight: '500', transition: 'all 0.2s ease',
              marginLeft: '20px'
            }}
            className="hover-lift"
          >
            <UserPlus size={16} />
            Sugerir Gestor
          </button>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ManagerList toggleCompare={toggleCompare} compareList={compareList} />} />
          <Route path="/gestor/:id" element={<ManagerDetail />} />
          <Route path="/admin" element={<AdminSugerencias />} />
          <Route path="/comparar" element={<CompareView compareIds={compareList} toggleCompare={toggleCompare} setCompareIds={setCompareList} />} />
        </Routes>
      </main>

      {showSuggest && <SuggestModal onClose={() => setShowSuggest(false)} />}
      
      {compareList.length > 0 && !isComparePage && (
        <div className="animate-fade-in" style={{
          position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 1000, width: '100%', maxWidth: '500px', padding: '0 20px'
        }}>
          <div className="card" style={{
            background: 'rgba(15, 15, 15, 0.95)', 
            backdropFilter: 'blur(20px)',
            padding: '16px 24px',
            border: '1px solid var(--accent-primary)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(99,102,241,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderRadius: '24px'
          }}>
            <div className="flex items-center gap-4">
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(99,102,241,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)'
              }}>
                <TrendingUp size={18} />
              </div>
              <div>
                <div style={{fontSize: '0.95rem', fontWeight: '600', color: 'white'}}>Comparativa lista</div>
                <div style={{fontSize: '0.8rem', color: limitReached ? '#fca5a5' : 'var(--text-muted)', transition: 'color 0.3s'}}>
                  {compareList.length} gestor{compareList.length > 1 ? 'es' : ''} seleccionado{compareList.length > 1 ? 's' : ''} 
                  <span style={{fontWeight: limitReached ? 'bold' : 'normal'}}> (máx 4)</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setCompareList([])} style={{background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', padding: '0 8px'}}>Limpiar</button>
              <Link to="/comparar" style={{
                background: 'var(--accent-primary)', color: 'white', padding: '10px 24px', borderRadius: '15px',
                fontSize: '0.9rem', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
              }}>
                Comparar ahora
              </Link>
            </div>
          </div>
        </div>
      )}

      <footer style={{
        marginTop: '80px', padding: '40px 0', borderTop: '1px solid var(--border-color)',
        textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem'
      }}>
        <div style={{marginBottom: '12px'}}>
          © {new Date().getFullYear()} Track Record Fund Managers. Todos los derechos reservados.
        </div>
        <div style={{display: 'flex', justifyContent: 'center', gap: '20px'}}>
          <a href="mailto:laminenbo3@gmail.com" style={{color: 'var(--accent-primary)', textDecoration: 'none'}}>
            Contacto: laminenbo3@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuggest, setShowSuggest] = useState(false);
  const [compareList, setCompareList] = useState([]);

  const [limitReached, setLimitReached] = useState(false);

  const toggleCompare = (id) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length < 4) {
        setLimitReached(false);
        return [...prev, id];
      }
      setLimitReached(true);
      setTimeout(() => setLimitReached(false), 2000);
      return prev;
    });
  };

  useEffect(() => {
    fetch('http://localhost:3001/api/managers')
      .then(res => res.json())
      .then(data => {
        setManagers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data, ensure backend is running at :3001", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container mt-8 text-center text-white">Sincronizando valores del mercado (Scraping)...</div>;
  }

  return (
    <DataContext.Provider value={managers}>
      <Router>
        <AppContent 
          managers={managers} 
          toggleCompare={toggleCompare} 
          compareList={compareList} 
          setCompareList={setCompareList}
          limitReached={limitReached}
          showSuggest={showSuggest}
          setShowSuggest={setShowSuggest}
        />
      </Router>
    </DataContext.Provider>
  );
}

export default App;
