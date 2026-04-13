import React, { useContext, useMemo, useState } from 'react';
import { DataContext } from '../App';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Filter, X } from 'lucide-react';

const TrendingStocks = () => {
  const managers = useContext(DataContext);
  const [sectorFilter, setSectorFilter] = useState('Todos');
  const [minManagers, setMinManagers] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { trendingStocks, sectors } = useMemo(() => {
    const stockMap = {};

    managers.forEach(manager => {
      if (manager.funds) {
        manager.funds.forEach(fund => {
          if (fund.topPositions) {
            fund.topPositions.forEach(pos => {
              if (!stockMap[pos.ticker]) {
                stockMap[pos.ticker] = {
                  ticker: pos.ticker,
                  name: pos.name,
                  sector: pos.sector,
                  managers: []
                };
              }
              const hasManager = stockMap[pos.ticker].managers.find(m => m.id === manager.id);
              if (!hasManager) {
                stockMap[pos.ticker].managers.push({
                  id: manager.id,
                  name: manager.name,
                  entity: manager.entity,
                  image: manager.image,
                });
              }
            });
          }
        });
      }
    });

    const all = Object.values(stockMap).sort((a, b) => b.managers.length - a.managers.length);
    const sectorSet = new Set(all.map(s => s.sector).filter(Boolean));
    return { trendingStocks: all, sectors: ['Todos', ...Array.from(sectorSet).sort()] };
  }, [managers]);

  const filtered = useMemo(() => {
    return trendingStocks.filter(stock => {
      const matchesSector = sectorFilter === 'Todos' || stock.sector === sectorFilter;
      const matchesManagers = stock.managers.length >= minManagers;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || stock.ticker.toLowerCase().includes(q) || stock.name.toLowerCase().includes(q);
      return matchesSector && matchesManagers && matchesSearch;
    }).slice(0, 60);
  }, [trendingStocks, sectorFilter, minManagers, searchQuery]);

  const hasActiveFilters = sectorFilter !== 'Todos' || minManagers > 1 || searchQuery !== '';

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <TrendingUp color="var(--accent-primary)" size={36} />
          Acciones en Tendencia
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Descubre cuáles son las posiciones más repetidas en las carteras de los mejores gestores.
        </p>
      </div>

      {/* Filtros */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '20px 24px',
        marginBottom: '32px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem' }}>
          <Filter size={16} />
          Filtros
        </div>

        {/* Búsqueda */}
        <input
          type="text"
          placeholder="Buscar ticker o empresa..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '8px 14px',
            color: 'var(--text-main)',
            fontSize: '0.9rem',
            outline: 'none',
            width: '220px',
          }}
        />

        {/* Sector */}
        <select
          value={sectorFilter}
          onChange={e => setSectorFilter(e.target.value)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '8px 14px',
            color: 'var(--text-main)',
            fontSize: '0.9rem',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          {sectors.map(s => <option key={s} value={s} style={{ background: '#1a1a2e' }}>{s}</option>)}
        </select>

        {/* Mínimo de gestores */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Mín. gestores:</span>
          {[1, 2, 3, 4].map(n => (
            <button
              key={n}
              onClick={() => setMinManagers(n)}
              style={{
                width: '34px', height: '34px',
                borderRadius: '50%',
                border: '1px solid',
                borderColor: minManagers === n ? 'var(--accent-primary)' : 'var(--border)',
                background: minManagers === n ? 'rgba(51,102,255,0.2)' : 'transparent',
                color: minManagers === n ? 'var(--accent-primary)' : 'var(--text-muted)',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.2s',
              }}
            >{n}+</button>
          ))}
        </div>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={() => { setSectorFilter('Todos'); setMinManagers(1); setSearchQuery(''); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '10px', padding: '8px 14px',
              color: '#f87171', fontSize: '0.85rem', cursor: 'pointer', marginLeft: 'auto'
            }}
          >
            <X size={14} /> Limpiar filtros
          </button>
        )}

        {/* Contador */}
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: hasActiveFilters ? '0' : 'auto' }}>
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid */}
      <div className="grid">
        {filtered.map((stock) => (
          <div key={stock.ticker} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="card-content" style={{ flexGrow: 1 }}>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-main)' }}>{stock.ticker}</h2>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{stock.name}</div>
                </div>
                <div style={{
                  background: stock.managers.length >= 3 ? 'rgba(16,185,129,0.15)' : 'rgba(51,102,255,0.1)',
                  color: stock.managers.length >= 3 ? '#34d399' : 'var(--accent-primary)',
                  padding: '6px 12px', borderRadius: '20px', fontWeight: '600',
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}>
                  <Users size={16} />
                  {stock.managers.length} {stock.managers.length === 1 ? 'Gestor' : 'Gestores'}
                </div>
              </div>

              {stock.sector && (
                <div className="tag mb-4">{stock.sector}</div>
              )}

              <div style={{ marginTop: '16px' }}>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  En cartera de:
                </h3>
                <div className="flex flex-col gap-2">
                  {stock.managers.map(m => (
                    <Link key={m.id} to={`/gestor/${m.id}`} className="hover-lift" style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '8px', background: 'rgba(255,255,255,0.03)',
                      borderRadius: '8px', textDecoration: 'none', color: 'var(--text-main)'
                    }}>
                      <img src={m.image} alt={m.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>{m.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{m.entity}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '60px' }}>
          <TrendingUp size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
          <p>No se encontraron acciones con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  );
};

export default TrendingStocks;
