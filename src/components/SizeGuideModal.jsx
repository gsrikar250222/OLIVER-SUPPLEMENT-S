import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  const [unit, setUnit] = useState('in'); // 'in' or 'cm'
  const [activeTab, setActiveTab] = useState('tops'); // 'tops', 'bottoms', 'womens'

  if (!isOpen) return null;

  const tables = {
    tops: {
      headers: ['Size', 'Chest', 'Length', 'Shoulder Width', 'Sleeve Length'],
      rows: unit === 'in' ? [
        ['S', '38 - 40', '28.0', '19.5', '8.5'],
        ['M', '40 - 42', '29.0', '20.5', '9.0'],
        ['L', '42 - 44', '30.0', '21.5', '9.5'],
        ['XL', '44 - 46', '31.0', '22.5', '10.0'],
        ['XXL', '46 - 48', '32.0', '23.5', '10.5']
      ] : [
        ['S', '96 - 101', '71.0', '49.5', '21.5'],
        ['M', '101 - 106', '73.5', '52.0', '23.0'],
        ['L', '106 - 112', '76.0', '54.5', '24.0'],
        ['XL', '112 - 117', '78.5', '57.0', '25.5'],
        ['XXL', '117 - 122', '81.0', '59.5', '26.5']
      ]
    },
    bottoms: {
      headers: ['Size', 'Waist (Relaxed)', 'Waist (Stretched)', 'Inseam', 'Thigh'],
      rows: unit === 'in' ? [
        ['S', '28 - 30', '34.0', '29.0', '23.0'],
        ['M', '30 - 32', '36.0', '29.5', '24.0'],
        ['L', '32 - 34', '38.0', '30.0', '25.5'],
        ['XL', '34 - 36', '40.0', '30.5', '27.0'],
        ['XXL', '36 - 38', '42.0', '31.0', '28.5']
      ] : [
        ['S', '71 - 76', '86.0', '73.5', '58.5'],
        ['M', '76 - 81', '91.5', '75.0', '61.0'],
        ['L', '81 - 86', '96.5', '76.0', '64.5'],
        ['XL', '86 - 91', '101.5', '77.5', '68.5'],
        ['XXL', '91 - 96', '106.5', '79.0', '72.0']
      ]
    },
    womens: {
      headers: ['Size', 'Bust', 'Underbust', 'Waist', 'Hips'],
      rows: unit === 'in' ? [
        ['S', '32 - 34', '28 - 29', '25 - 27', '35 - 37'],
        ['M', '34 - 36', '30 - 31', '27 - 29', '37 - 39'],
        ['L', '36 - 38', '32 - 33', '29 - 31', '39 - 41'],
        ['XL', '38 - 40', '34 - 35', '31 - 33', '41 - 43']
      ] : [
        ['S', '81 - 86', '71 - 74', '63 - 68', '89 - 94'],
        ['M', '86 - 91', '76 - 79', '68 - 74', '94 - 99'],
        ['L', '91 - 96', '81 - 84', '74 - 79', '99 - 104'],
        ['XL', '96 - 101', '86 - 89', '79 - 84', '104 - 109']
      ]
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="size-guide-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-card-header">
          <div className="modal-card-title">
            <Ruler size={22} />
            <span>REPVAULT OFFICIAL ATHLETIC SIZE GUIDE</span>
          </div>
          <button className="modal-close-icon" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-card-body">
          {/* Category Tabs & Unit Switch */}
          <div className="size-guide-controls">
            <div className="size-tabs">
              <button 
                className={`size-tab ${activeTab === 'tops' ? 'active' : ''}`}
                onClick={() => setActiveTab('tops')}
              >
                Tops & Hoodies
              </button>
              <button 
                className={`size-tab ${activeTab === 'bottoms' ? 'active' : ''}`}
                onClick={() => setActiveTab('bottoms')}
              >
                Joggers & Shorts
              </button>
              <button 
                className={`size-tab ${activeTab === 'womens' ? 'active' : ''}`}
                onClick={() => setActiveTab('womens')}
              >
                Women's Activewear
              </button>
            </div>

            <div className="unit-toggle">
              <button 
                className={`unit-btn ${unit === 'in' ? 'active' : ''}`}
                onClick={() => setUnit('in')}
              >
                INCHES
              </button>
              <button 
                className={`unit-btn ${unit === 'cm' ? 'active' : ''}`}
                onClick={() => setUnit('cm')}
              >
                CM
              </button>
            </div>
          </div>

          {/* Size Table */}
          <div className="table-responsive">
            <table className="size-table">
              <thead>
                <tr>
                  {tables[activeTab].headers.map((h, i) => (
                    <th key={i}>{h} ({unit})</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tables[activeTab].rows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'even' : ''}>
                    {row.map((cell, cidx) => (
                      <td key={cidx} className={cidx === 0 ? 'size-label-cell' : ''}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fit Tip */}
          <div className="fit-tip-box">
            <strong>FIT GUIDANCE:</strong>
            <p>
              • <strong>Oversized Collection:</strong> Intended for a relaxed, drop-shoulder drape. Choose your standard size for the boxy look or size down for a standard regular fit.
              <br/>
              • <strong>Compression Line:</strong> True second-skin high-pressure fit. If you prefer moderate compression or are between sizes, we recommend sizing up.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

