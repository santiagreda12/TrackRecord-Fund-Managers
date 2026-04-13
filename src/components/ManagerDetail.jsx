import React, { useMemo, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Target, Activity, BarChart, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DataContext } from '../App';

const ManagerDetail = () => {
  const managersData = useContext(DataContext);
  const { id } = useParams();
  const manager = useMemo(() => managersData.find(m => m.id === id), [id, managersData]);
  const [timeRange, setTimeRange] = useState('1A');

  if (!manager) return <div className="container mt-8 text-center">Gestor no encontrado</div>;

  return (
    <div className="animate-fade-in pb-12">
      <Link to="/" className="flex items-center gap-2 mb-8" style={{color: 'var(--text-muted)', display: 'inline-flex', marginTop: '20px'}}>
        <ArrowLeft size={20} />
        <span>Volver al directorio</span>
      </Link>

      <div className="hero-gestor card" style={{padding: '32px', marginBottom: '40px', background: 'radial-gradient(ellipse at top left, rgba(51,102,255,0.06), transparent)'}}>
        <img 
          src={manager.image} 
          alt={manager.name} 
          style={{
            objectPosition: manager.imagePosition || 'center'
          }}
        />
        <div className="hero-info">
          <h1>{manager.name}</h1>
          <div className="flex items-center gap-4 mb-4" style={{color: 'var(--text-muted)'}}>
            <div className="flex items-center gap-2"><Building2 size={18} /> <span>{manager.entity}</span></div>
            <div className="flex items-center gap-2"><MapPin size={18} /> <span>{manager.country}</span></div>
            <div className="flex items-center gap-2"><Target size={18} /> <span style={{color: 'var(--accent-gold)'}}>{manager.style}</span></div>
          </div>
          <p style={{marginBottom: '16px'}}>{manager.description}</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
            {(manager.tags || []).map(tag => (
              <span key={tag} style={{
                fontSize: '0.78rem',
                padding: '4px 12px',
                borderRadius: '20px',
                fontWeight: '500',
                background: tag === 'Value' ? 'rgba(59,130,246,0.15)' :
                            tag === 'Growth' ? 'rgba(16,185,129,0.15)' :
                            tag === 'Alternativo' || tag === 'Mixto Flexible' ? 'rgba(139,92,246,0.15)' :
                            tag === 'Crédito' || tag === 'Renta Fija' || tag === 'High Yield' || tag === 'Bonos' ? 'rgba(245,158,11,0.15)' :
                            tag === 'España' || tag === 'Francia' ? 'rgba(239,68,68,0.12)' :
                            tag === 'Tecnología' || tag === 'Crypto' ? 'rgba(99,102,241,0.15)' :
                            'rgba(255,255,255,0.05)',
                color: tag === 'Value' ? '#60a5fa' :
                       tag === 'Growth' ? '#34d399' :
                       tag === 'Alternativo' || tag === 'Mixto Flexible' ? '#a78bfa' :
                       tag === 'Crédito' || tag === 'Renta Fija' || tag === 'High Yield' || tag === 'Bonos' ? '#fbbf24' :
                       tag === 'España' || tag === 'Francia' ? '#f87171' :
                       tag === 'Tecnología' || tag === 'Crypto' ? '#818cf8' :
                       'var(--text-muted)',
                border: '1px solid',
                borderColor: tag === 'Value' ? 'rgba(59,130,246,0.25)' :
                             tag === 'Growth' ? 'rgba(16,185,129,0.25)' :
                             tag === 'Alternativo' || tag === 'Mixto Flexible' ? 'rgba(139,92,246,0.25)' :
                             tag === 'Crédito' || tag === 'Renta Fija' || tag === 'High Yield' || tag === 'Bonos' ? 'rgba(245,158,11,0.25)' :
                             tag === 'España' || tag === 'Francia' ? 'rgba(239,68,68,0.2)' :
                             tag === 'Tecnología' || tag === 'Crypto' ? 'rgba(99,102,241,0.25)' :
                             'rgba(255,255,255,0.1)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="fund-list">
        {manager.funds.map((fund) => {
          // Determinar colores del gráfico basado en retorno YTD (simulando Financial Hub)
          // Cobas test will use an overarching positive/negative variable. We just simulate red for demonstration like the screenshot, or green if ytd > 20
          // Filtrado de datos por periodo
          const getFilteredData = () => {
            if (!fund.history || fund.history.length === 0) return [];
            
            const currentYear = new Date().getFullYear().toString();
            switch(timeRange) {
              case '1M': return fund.history.slice(-21);
              case '3M': return fund.history.slice(-63);
              case '6M': return fund.history.slice(-126);
              case 'YTD': return fund.history.filter(d => d.date.startsWith(currentYear));
              case '1A': return fund.history.slice(-252);
              case '5A': return fund.history.slice(-1260);
              case 'MAX': return fund.history;
              default: return fund.history.slice(-252);
            }
          };
          const chartData = getFilteredData();
          const periodRanges = ['1M', '3M', '6M', 'YTD', '1A', '5A', 'MAX'];

          // Cálculos dinámicos de rentabilidad
          let periodReturnPct = 0;
          let periodReturnAbs = 0;
          let isNegative = false;
          let currentNav = fund.nav;
          let latestDate = "No dates";

          if (chartData.length > 0) {
            const startNav = chartData[0].nav;
            const endNav = chartData[chartData.length - 1].nav;
            currentNav = endNav; // El nav de ese bloque
            latestDate = chartData[chartData.length - 1].date;
            periodReturnAbs = endNav - startNav;
            periodReturnPct = (periodReturnAbs / startNav) * 100;
            isNegative = periodReturnAbs < 0;
          }

          const strokeColor = isNegative ? '#ef4444' : '#10b981';
          const bgGradient = isNegative ? 'colorNavRed' : 'colorNavGreen';
          
          const returnColorStr = isNegative ? '#ef4444' : '#10b981';
          const returnBgStr = isNegative ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)';
          const returnSign = isNegative ? '' : '+';

          return (
            <div key={fund.id} className="mb-16">
              {/* === HEADER FIEL A FINANCIAL HUB === */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div style={{width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 'bold', fontSize: '1.2rem'}}>
                    {manager.entity.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 style={{fontSize: '1.8rem', margin: '0 0 4px 0'}}>{fund.name}</h2>
                    <div style={{fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <span style={{background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem'}}>{fund.tvSymbol || fund.yfSymbol || "Sin ISIN"}</span>
                      <span>•</span>
                      <span>{fund.category}</span>
                    </div>
                  </div>
                </div>
                
                <div style={{textAlign: 'right'}}>
                  <div style={{fontSize: '2.2rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px'}}>
                    {currentNav.toFixed(4)} €
                    <span style={{fontSize: '1rem', background: returnBgStr, color: returnColorStr, padding: '4px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px'}}>
                      <Activity size={14} /> {returnSign}{periodReturnPct.toFixed(2)}%
                    </span>
                  </div>
                  <div style={{fontSize: '0.85rem', color: returnColorStr, marginTop: '4px'}}>
                    {returnSign}{periodReturnAbs.toFixed(4)} € • {latestDate.split('-').reverse().join('/')}
                  </div>
                </div>
              </div>


              {/* === GRID PRINCIPAL === */}
              <div className="flex gap-6 flex-wrap">
                
                {/* Columna Izquierda (Gráfica y Listas) */}
                <div style={{flex: '1 1 65%', minWidth: '400px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
                  
                  {/* Tarjeta de Gráfica */}
                  <div style={{background: 'rgba(26,26,26,0.95)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden'}}>
                    <div className="flex justify-between items-center p-5" style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                      <div className="flex items-center gap-3">
                        <Activity size={18} color="var(--text-muted)" />
                        <span style={{fontWeight: '600', fontSize: '1.1rem'}}>Valor Liquidativo (NAV)</span>
                        <span style={{fontSize: '0.8rem', background: returnBgStr, color: returnColorStr, padding: '4px 8px', borderRadius: '20px'}}>
                          {returnSign}{periodReturnPct.toFixed(2)}% ({timeRange})
                        </span>
                      </div>
                      
                      <div className="flex" style={{fontSize: '0.8rem', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', padding: '2px'}}>
                        {periodRanges.map(range => (
                          <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            style={{
                              padding: '4px 12px', 
                              background: timeRange === range ? 'rgba(255,255,255,0.1)' : 'transparent',
                              color: timeRange === range ? 'white' : 'var(--text-muted)', 
                              border: 'none', 
                              borderRadius: '4px', 
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{height: '350px', padding: '24px'}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorNavRed" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorNavGreen" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="transparent" vertical={false} />
                          <XAxis 
                            dataKey="date" 
                            stroke="rgba(255,255,255,0.3)" 
                            tick={{fontSize: 11, fill: 'rgba(255,255,255,0.5)'}}
                            tickFormatter={(val) => {
                              const d = new Date(val);
                              return isNaN(d) ? val : `${d.getDate()} ${(d.toLocaleString('es-ES', {month: 'short'}))}`;
                            }}
                            minTickGap={20}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis 
                            domain={['auto', 'auto']} 
                            stroke="rgba(255,255,255,0.3)" 
                            tick={{fontSize: 11, fill: 'rgba(255,255,255,0.5)'}}
                            tickFormatter={(val) => `${val.toFixed(2)} €`}
                            width={50}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip 
                            contentStyle={{background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: 'white'}}
                            itemStyle={{color: 'white'}}
                            formatter={(value) => [`${value.toFixed(4)} €`, 'NAV']}
                            labelStyle={{color: 'var(--text-muted)', marginBottom: '4px'}}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="nav" 
                            stroke={strokeColor} 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill={`url(#${bgGradient})`}
                            activeDot={{r: 6, fill: strokeColor, stroke: '#1a1a1a', strokeWidth: 2}}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Tarjeta de Rentabilidad y Posiciones Inferior */}
                  <div style={{background: 'rgba(26,26,26,0.95)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px'}}>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2"><BarChart size={18} color="var(--text-muted)"/> <span style={{fontWeight: '600', fontSize: '1.1rem'}}>Posiciones del fondo</span></div>
                      
                      {/* Removed sorting buttons per user request */}
                    </div>

                    <div className="flex flex-col gap-4">
                      {fund.topPositions.map(pos => (
                        <div key={pos.ticker} className="flex justify-between items-center" style={{padding: '12px 16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px'}}>
                          <div className="flex flex-col">
                            <span style={{fontWeight: '500'}}>{pos.name} <span style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>({pos.ticker})</span></span>
                            <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{pos.sector}</span>
                          </div>
                          <div style={{fontWeight: '600'}}>{pos.percentage}%</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Columna Derecha (Info del Fondo) */}
                <div style={{flex: '1 1 30%', minWidth: '300px'}}>
                  <div style={{background: 'rgba(26,26,26,0.95)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', position: 'sticky', top: '24px'}}>
                    <div className="flex items-center gap-2 mb-6" style={{borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px'}}>
                      <Info size={18} color="var(--text-muted)" />
                      <span style={{fontWeight: '600', fontSize: '1.1rem'}}>Información del Fondo</span>
                    </div>

                    <div className="flex flex-col gap-6" style={{fontSize: '0.95rem'}}>
                      <div>
                        <div style={{color: 'var(--text-muted)', marginBottom: '4px', fontSize: '0.85rem'}}>Nombre</div>
                        <div style={{fontWeight: '500'}}>{fund.name}</div>
                      </div>
                      
                      <div>
                        <div style={{color: 'var(--text-muted)', marginBottom: '6px', fontSize: '0.85rem'}}>ISIN</div>
                        <div style={{background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '6px', textAlign: 'center', fontFamily: 'monospace', letterSpacing: '1px', border: '1px solid rgba(255,255,255,0.05)'}}>
                          {fund.tvSymbol || fund.yfSymbol || "N/A"}
                        </div>
                      </div>

                      <div>
                        <div style={{color: 'var(--text-muted)', marginBottom: '4px', fontSize: '0.85rem'}}>Gestora</div>
                        <div style={{fontWeight: '500'}}>{manager.entity}</div>
                      </div>

                      <div>
                        <div style={{color: 'var(--text-muted)', marginBottom: '4px', fontSize: '0.85rem'}}>Categoría Morningstar</div>
                        <div style={{fontWeight: '500'}}>{fund.category}</div>
                      </div>

                      <div>
                        <div style={{color: 'var(--text-muted)', marginBottom: '4px', fontSize: '0.85rem'}}>Divisa Base</div>
                        <div style={{fontWeight: '500'}}>EUR</div>
                      </div>

                      <div style={{borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px'}}>
                        <div style={{color: 'var(--text-muted)', marginBottom: '4px', fontSize: '0.85rem'}}>Patrimonio Clase</div>
                        <div style={{fontWeight: '500'}}>{fund.aum}</div>
                      </div>

                      <div>
                        <div style={{color: 'var(--text-muted)', marginBottom: '4px', fontSize: '0.85rem'}}>Tamaño Real Fondo</div>
                        <div style={{fontWeight: '500'}}>{(parseFloat(fund.aum) * 2).toFixed(0)}M €</div> {/* Simulación  */}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManagerDetail;
