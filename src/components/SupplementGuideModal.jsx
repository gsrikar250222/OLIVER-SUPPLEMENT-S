import React, { useState } from 'react';
import { X, Calculator, ShieldCheck, Clock, Zap, Check } from 'lucide-react';

export default function SupplementGuideModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('calculator');
  const [weightKg, setWeightKg] = useState(70);
  const [activityLevel, setActivityLevel] = useState('hypertrophy');

  if (!isOpen) return null;

  // Calculate recommended daily protein
  const multipliers = {
    sedentary: 1.0,
    endurance: 1.4,
    hypertrophy: 2.0,
    athlete: 2.2
  };
  const targetProtein = Math.round(weightKg * (multipliers[activityLevel] || 2.0));
  const wheyScoops = Math.round(targetProtein * 0.4 / 25); // ~40% from shakes, 25g/scoop

  return (
    <div className="modal-overlay active" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog guide-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="guide-modal-title">
            <span className="guide-badge">ATHLETE INTELLIGENCE</span>
            <h3>SPORTS NUTRITION & DOSAGE GUIDE</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close Guide">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="guide-tabs">
          <button 
            className={`guide-tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            <Calculator size={16} /> Daily Protein Calculator
          </button>
          <button 
            className={`guide-tab-btn ${activeTab === 'timing' ? 'active' : ''}`}
            onClick={() => setActiveTab('timing')}
          >
            <Clock size={16} /> Optimal Timing Matrix
          </button>
          <button 
            className={`guide-tab-btn ${activeTab === 'authenticity' ? 'active' : ''}`}
            onClick={() => setActiveTab('authenticity')}
          >
            <ShieldCheck size={16} /> 100% Authenticity Seal
          </button>
        </div>

        <div className="modal-body guide-modal-body">
          {activeTab === 'calculator' && (
            <div className="calc-content">
              <p className="guide-lead-text">
                Calculate your precise daily macronutrient protein targets based on clinical sports science (ISSN standards).
              </p>

              <div className="calc-form-grid">
                <div className="calc-field">
                  <label>Your Body Weight: <strong className="highlight-val">{weightKg} kg</strong> ({Math.round(weightKg * 2.204)} lbs)</label>
                  <input 
                    type="range" 
                    min="45" 
                    max="140" 
                    value={weightKg} 
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="calc-slider"
                  />
                  <div className="slider-markers">
                    <span>45 kg</span>
                    <span>70 kg</span>
                    <span>100 kg</span>
                    <span>140 kg</span>
                  </div>
                </div>

                <div className="calc-field">
                  <label>Training Goal / Activity Level</label>
                  <div className="goal-options-grid">
                    {[
                      { id: 'sedentary', label: 'Maintenance / General Health', mult: '1.0g / kg' },
                      { id: 'endurance', label: 'Endurance & Cardio Training', mult: '1.4g / kg' },
                      { id: 'hypertrophy', label: 'Muscle Building & Hypertrophy', mult: '2.0g / kg' },
                      { id: 'athlete', label: 'Heavy Strength & Contest Prep', mult: '2.2g / kg' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        className={`goal-btn ${activityLevel === g.id ? 'active' : ''}`}
                        onClick={() => setActivityLevel(g.id)}
                      >
                        <span className="goal-title">{g.label}</span>
                        <span className="goal-mult">{g.mult}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result Card */}
              <div className="calc-result-box">
                <div className="result-metric">
                  <span className="metric-label">Target Daily Protein</span>
                  <span className="metric-value">{targetProtein}g</span>
                  <span className="metric-sub">per day</span>
                </div>
                <div className="result-divider"></div>
                <div className="result-metric">
                  <span className="metric-label">Suggested Oliver Whey</span>
                  <span className="metric-value">{wheyScoops} Scoops</span>
                  <span className="metric-sub">({wheyScoops * 25}g protein, remainder whole foods)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timing' && (
            <div className="timing-matrix">
              <div className="timing-card">
                <div className="timing-badge morning">MORNING (FASTED)</div>
                <h4>Metabolic Primer</h4>
                <p>Consume 1 scoop Oliver Whey Isolate + Multivitamin + Fish Oil to halt overnight muscle breakdown and ignite cellular recovery.</p>
              </div>

              <div className="timing-card">
                <div className="timing-badge pre">20-30 MINS PRE-WORKOUT</div>
                <h4>Ignition & Muscle Pump</h4>
                <p>Take 1 scoop Oliver Pre-Workout (with Citrulline Malate + Beta-Alanine) + 3-5g Creatine Monohydrate with 300ml cold water.</p>
              </div>

              <div className="timing-card">
                <div className="timing-badge intra">INTRA-WORKOUT</div>
                <h4>Anabolic Hydration</h4>
                <p>Sip 1 scoop Fermented BCAA/EAA mixed with cold water to delay neuromuscular fatigue and sustain muscle glycogen.</p>
              </div>

              <div className="timing-card">
                <div className="timing-badge post">0-45 MINS POST-WORKOUT</div>
                <h4>Anabolic Window Synthesis</h4>
                <p>Slam 1-2 scoops Oliver Gold Whey / Hydrolyzed Isolate with fast-digesting carbs for rapid glycogen replenishment and protein synthesis.</p>
              </div>

              <div className="timing-card">
                <div className="timing-badge night">BEFORE BED</div>
                <h4>Sustained Sleep Repair</h4>
                <p>Take ZMA + Magnesium Glycinate or Casein to support deep REM sleep recovery and natural testosterone production.</p>
              </div>
            </div>
          )}

          {activeTab === 'authenticity' && (
            <div className="authenticity-guide">
              <div className="auth-hero">
                <ShieldCheck size={44} className="auth-shield-icon" />
                <h4>100% GENUINE AUTHENTICITY PROTOCOL</h4>
                <p>At OLIVER SUPPLEMENT SHOP, counterfeit supplements do not exist. We import directly through official brand authorized importers with verifiable scratch codes.</p>
              </div>

              <div className="auth-steps-list">
                <div className="auth-step-item">
                  <div className="step-num">01</div>
                  <div>
                    <h5>Official Brand Importer Seal</h5>
                    <p>Every tub features the authorized Indian importer holographic sticker (GMC, Bright Commodities, Glanbia Performance Nutrition, etc.).</p>
                  </div>
                </div>

                <div className="auth-step-item">
                  <div className="step-num">02</div>
                  <div>
                    <h5>Scratch & Verify QR Code</h5>
                    <p>Scratch off the unique security seal and scan or SMS the unique 16-digit serial key to verify directly on the brand's official global portal.</p>
                  </div>
                </div>

                <div className="auth-step-item">
                  <div className="step-num">03</div>
                  <div>
                    <h5>GST Tax Invoice With Batch Number</h5>
                    <p>Every order ships with a full GST invoice detailing the manufacturer batch number, manufacturing date, and expiry date matching your container.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose} style={{ width: '100%' }}>
            UNDERSTOOD &mdash; RETURN TO SHOPPING
          </button>
        </div>
      </div>
    </div>
  );
}

