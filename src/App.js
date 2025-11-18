import React, { useState, useEffect } from 'react';
import './App.css';

// Dados mock das medicações organizados por categoria
const mockMedications = [
  {
    id: 1,
    genericName: 'Apixaban',
    tradeNames: 'Eliquis',
    drugClass: 'Direct Oral Anticoagulant (DOAC)',
    category: 'Anticoagulants',
    recommendation: 'HOLD BEFORE SURGERY',
    rationale: 'Hold prior to surgery/sedation to minimize risk of bleeding. Bridging is generally not required for VTE prophylaxis in AF. Resume post-op when adequate hemostasis.',
    specialInstructions: 'Last dose ≥48 hours (2 days) before surgery (consider longer for major surgery, high bleed risk). Discuss with surgeon/anesthesiologist & cardiologist.',
    source: 'BC Surgical Perioperative Guidelines'
  },
  {
    id: 2,
    genericName: 'Warfarin',
    tradeNames: 'Coumadin, Marevan',
    drugClass: 'Vitamin K Antagonist',
    category: 'Anticoagulants',
    recommendation: 'HOLD BEFORE SURGERY',
    rationale: 'Hold prior to surgery to minimize bleeding risk. Requires INR monitoring and possible bridging therapy.',
    specialInstructions: 'Hold 5 days before surgery. Check INR day before surgery. Consider bridging with heparin.',
    source: 'BC Surgical Perioperative Guidelines'
  },
  {
    id: 3,
    genericName: 'Metformin',
    tradeNames: 'Glucophage, Glumetza',
    drugClass: 'Antidiabetic Agent',
    category: 'Diabetes',
    recommendation: 'HOLD ON DAY OF SURGERY',
    rationale: 'Hold on day of surgery to reduce the risk of lactic acidosis in the setting of reduced renal perfusion or contrast exposure.',
    specialInstructions: 'Hold on morning of surgery. Restart when eating and drinking normally and renal function is stable.',
    source: 'BC Surgical Perioperative Guidelines'
  },
  {
    id: 4,
    genericName: 'Insulin Glargine',
    tradeNames: 'Lantus, Basaglar',
    drugClass: 'Long-Acting Insulin',
    category: 'Diabetes',
    recommendation: 'CONTINUE',
    rationale: 'Basal insulin should generally be continued to prevent hyperglycemia.',
    specialInstructions: 'Continue usual dose. Monitor blood glucose closely perioperatively.',
    source: 'BC Surgical Perioperative Guidelines'
  },
  {
    id: 5,
    genericName: 'Lisinopril',
    tradeNames: 'Zestril, Prinivil',
    drugClass: 'ACE Inhibitor',
    category: 'Cardiovascular',
    recommendation: 'HOLD MORNING OF SURGERY',
    rationale: 'May cause intraoperative hypotension, especially with induction of anesthesia.',
    specialInstructions: 'Hold on morning of surgery. Restart postoperatively when BP is stable and adequate oral intake.',
    source: 'BC Surgical Perioperative Guidelines'
  },
  {
    id: 6,
    genericName: 'Amlodipine',
    tradeNames: 'Norvasc',
    drugClass: 'Calcium Channel Blocker',
    category: 'Cardiovascular',
    recommendation: 'CONTINUE',
    rationale: 'Generally safe to continue. Less association with intraoperative hypotension.',
    specialInstructions: 'Continue as usual. Monitor blood pressure.',
    source: 'BC Surgical Perioperative Guidelines'
  },
  {
    id: 7,
    genericName: 'Sertraline',
    tradeNames: 'Zoloft',
    drugClass: 'SSRI',
    category: 'Psychiatric',
    recommendation: 'CONTINUE',
    rationale: 'Generally continued to avoid withdrawal symptoms and maintain psychiatric stability.',
    specialInstructions: 'Continue as usual. Be aware of potential for serotonin syndrome with other medications.',
    source: 'BC Surgical Perioperative Guidelines'
  }
];

// Extrair categorias únicas
const categories = ['All', ...new Set(mockMedications.map(med => med.category))];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMed, setSelectedMed] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredMeds, setFilteredMeds] = useState(mockMedications);
  const [searchType, setSearchType] = useState('all'); // 'all', 'generic', 'brand', 'class'

  // Filtro avançado
  useEffect(() => {
    let results = mockMedications;

    // Filtro por categoria
    if (selectedCategory !== 'All') {
      results = results.filter(med => med.category === selectedCategory);
    }

    // Filtro por busca
    if (searchTerm) {
      results = results.filter(med => {
        const searchLower = searchTerm.toLowerCase();
        
        switch (searchType) {
          case 'generic':
            return med.genericName.toLowerCase().includes(searchLower);
          case 'brand':
            return med.tradeNames.toLowerCase().includes(searchLower);
          case 'class':
            return med.drugClass.toLowerCase().includes(searchLower);
          case 'all':
          default:
            return (
              med.genericName.toLowerCase().includes(searchLower) ||
              med.tradeNames.toLowerCase().includes(searchLower) ||
              med.drugClass.toLowerCase().includes(searchLower) ||
              med.category.toLowerCase().includes(searchLower)
            );
        }
      });
    }

    setFilteredMeds(results);
  }, [searchTerm, selectedCategory, searchType]);

  const getRecommendationColor = (rec) => {
    if (rec.includes('HOLD') || rec.includes('STOP')) return '#fef3c7';
    if (rec.includes('CONTINUE')) return '#d1fae5';
    if (rec.includes('DISCUSS')) return '#dbeafe';
    return '#f3f4f6';
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSearchType('all');
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <h1>BC Perioperative Medication Manager</h1>
        <p>For Healthcare Professionals in British Columbia</p>
      </header>

      {/* Disclaimer */}
      <div className="disclaimer">
        <h3>⚠️ IMPORTANT DISCLAIMER</h3>
        <p>
          This tool is intended for use by qualified healthcare professionals within British Columbia only. 
          The recommendations provided are based on general guidelines and must not replace individual clinical judgment.
        </p>
      </div>

      {/* Main Content */}
      <div className="main-container">
        {/* Search Sidebar */}
        <div className="search-sidebar">
          {/* Filtros Avançados */}
          <div className="filters-section">
            <h3>Filters</h3>
            
            {/* Seletor de Tipo de Busca */}
              {/* <div className="search-type-selector">
                <label>Search In:</label>
                <select 
                  value={searchType} 
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="all">All Fields</option>
                  <option value="generic">Generic Name</option>
                  <option value="brand">Brand Names</option>
                  <option value="class">Drug Class</option>
                </select>
              </div> */}

            {/* Barra de Busca */}
            <div className="search-box">
              <input
                type="text"
                placeholder={`Search by generic or brand name...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtro de Categorias */}
            <div className="category-filters">
              <label>Category:</label>
              <div className="category-buttons">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== 'All') && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear All Filters
              </button>
            )}
          </div>

          {/* Contador de Resultados */}
          <div className="results-count">
            {filteredMeds.length} medication{filteredMeds.length !== 1 ? 's' : ''} found
            {(searchTerm || selectedCategory !== 'All') && ' (filtered)'}
          </div>

          {/* Lista de Medicamentos */}
          <div className="medication-list">
            {filteredMeds.length > 0 ? (
              filteredMeds.map(med => (
                <div
                  key={med.id}
                  className={`med-item ${selectedMed?.id === med.id ? 'selected' : ''}`}
                  onClick={() => setSelectedMed(med)}
                >
                  <div className="med-name">{med.genericName}</div>
                  <div className="med-brand">{med.tradeNames}</div>
                  <div className="med-category">{med.category}</div>
                  <div 
                    className="med-recommendation"
                    style={{ backgroundColor: getRecommendationColor(med.recommendation) }}
                  >
                    {med.recommendation}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                No medications found. Try adjusting your filters.
              </div>
            )}
          </div>
        </div>

        {/* Medication Details */}
        <div className="details-panel">
          {selectedMed ? (
            <div className="medication-details">
              <div className="med-header">
                <h2>{selectedMed.genericName}</h2>
                <span className="category-badge">{selectedMed.category}</span>
              </div>
              
              <p className="brand-names"><strong>Brand Names:</strong> {selectedMed.tradeNames}</p>
              <p className="drug-class"><strong>Class:</strong> {selectedMed.drugClass}</p>
              
              <div 
                className="recommendation-box"
                style={{ backgroundColor: getRecommendationColor(selectedMed.recommendation) }}
              >
                <h3>RECOMMENDATION</h3>
                <p>{selectedMed.recommendation}</p>
              </div>

              <div className="info-section">
                <h4>Rationale & Literature Summary</h4>
                <p>{selectedMed.rationale}</p>
              </div>

              <div className="info-section">
                <h4>Special Instructions / Timing</h4>
                <p>{selectedMed.specialInstructions}</p>
              </div>

              <div className="info-section">
                <h4>Source</h4>
                <p>{selectedMed.source}</p>
              </div>

              <button className="feedback-btn">
                📋 Flag this Recommendation
              </button>
            </div>
          ) : (
            <div className="welcome-message">
              <h3>Welcome to BC Medication Manager</h3>
              <p>Select a medication from the list to view recommendations</p>
              
              <div className="quick-stats">
                <div className="stat">
                  <div className="stat-number">{mockMedications.length}</div>
                  <div className="stat-label">Total Medications</div>
                </div>
                <div className="stat">
                  <div className="stat-number">{categories.length - 1}</div>
                  <div className="stat-label">Categories</div>
                </div>
              </div>

              <div className="feature-list">
                <div>🔍 <strong>Advanced Search:</strong> Search by generic name, brand name, or drug class</div>
                <div>📁 <strong>Categories:</strong> Filter by Anticoagulants, Diabetes, Cardiovascular, etc.</div>
                <div>📋 <strong>Detailed Recommendations:</strong> Evidence-based perioperative guidance</div>
                <div>⚡ <strong>Fast Navigation:</strong> Find information quickly during consultations</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;