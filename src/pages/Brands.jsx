import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BRANDS } from '../data/products.js';

const BRAND_DETAILS = [
  {
    name: 'OLIVER Pro Nutrition',
    tagline: 'Championship Purity & Precision Bio-Formulas',
    logo: '/assets/brands/oliver.svg',
    slug: 'OLIVER+Pro+Nutrition',
    origin: 'Flagship In-House Line',
    certifications: ['FSSAI Licensed', 'Labdoor Tested', 'Informed Sport'],
    desc: 'Engineered specifically for peak athletic hypertrophy, explosive energy, and zero gastrointestinal distress using cross-flow microfiltered isolates.'
  },
  {
    name: 'Optimum Nutrition',
    tagline: 'The World Benchmark in Gold Standard Whey',
    logo: '/assets/brands/optimum-nutrition.svg',
    slug: 'Optimum+Nutrition',
    origin: 'Downers Grove, Illinois, USA',
    certifications: ['Informed Choice', 'GPN Importer Code', 'Banned Substance Tested'],
    desc: 'For more than 35 years, ON has set the gold standard in sports nutrition. 100% genuine with Glanbia security holographic seals.'
  },
  {
    name: 'MuscleTech',
    tagline: 'Clinically Dosed Nitro-Tech & Performance Research',
    logo: '/assets/brands/muscletech.svg',
    slug: 'MuscleTech',
    origin: 'Oakville, Ontario, Canada',
    certifications: ['Iovate Official Importer', 'HPLC Tested', 'cGMP Certified'],
    desc: 'Pioneers in high-potency muscle mass gainers, Nitro-Tech whey, and thermogenic pre-workout formulations backed by university clinical trials.'
  },
  {
    name: 'Dymatize',
    tagline: 'Hydrolyzed 100% Whey Isolate Pioneers',
    logo: '/assets/brands/dymatize.svg',
    slug: 'Dymatize',
    origin: 'Dallas, Texas, USA',
    certifications: ['Informed Choice', 'Bell Chem Seal', 'Gluten Free'],
    desc: 'Famous worldwide for ISO-100 Hydrolyzed Whey with ultra-rapid digestion, award-winning gourmet flavoring, and zero carb profiles.'
  },
  {
    name: 'Myprotein',
    tagline: 'Europe’s No. 1 Sports Nutrition Brand',
    logo: '/assets/brands/myprotein.svg',
    slug: 'Myprotein',
    origin: 'Manchester, United Kingdom',
    certifications: ['Labdoor Grade A', 'FSSAI Certified', 'ISO 9001'],
    desc: 'Exceptional purity and high-grade grass-fed whey at accessible value. Trusted by millions of strength athletes across 70 countries.'
  },
  {
    name: 'Cellucor',
    tagline: 'America’s #1 Pre-Workout Ignition Brand',
    logo: '/assets/brands/cellucor.svg',
    slug: 'Cellucor',
    origin: 'Austin, Texas, USA',
    certifications: ['Nutrabolt Importer', 'Carnitine & TeaCrine Licensed'],
    desc: 'Makers of C4 Original Pre-Workout with explosive energy, muscular pumps, and laser focus matrix for relentless gym sessions.'
  },
  {
    name: 'MuscleBlaze',
    tagline: 'Biozyme Clinical Protein & Indian Athlete Nutrition',
    logo: '/assets/brands/muscleblaze.svg',
    slug: 'MuscleBlaze',
    origin: 'Gurugram, Haryana, India',
    certifications: ['US Patent Biozyme', 'Labdoor USA Certified', 'FSSAI Verified'],
    desc: 'Clinically proven 50% higher protein absorption and 60% higher BCAA absorption customized for Indian athlete dietary profiles.'
  },
  {
    name: 'GNC',
    tagline: 'Live Well Global Nutrition & Micronutrient Authority',
    logo: '/assets/brands/gnc.svg',
    slug: 'GNC',
    origin: 'Pittsburgh, Pennsylvania, USA',
    certifications: ['Guardian Healthcare Importer', 'USP Verified Ingredients'],
    desc: 'World leader in sports vitamins, mega-potency omega-3 fish oils, joint health matrices, and clean protein powders.'
  },
  {
    name: 'Universal Nutrition',
    tagline: 'Hardcore Bodybuilding & Animal Pak Heritage',
    logo: '/assets/brands/universal.svg',
    slug: 'Universal+Nutrition',
    origin: 'New Brunswick, New Jersey, USA',
    certifications: ['Universal Authentic Seal', 'Animal Verified'],
    desc: 'Iron sport heritage since 1977. Dedicated to no-nonsense, potent sports nutrition for serious powerlifters and heavy bodybuilders.'
  },
  {
    name: 'Rule 1',
    tagline: 'Rule 1 Proteins — Better Input, Better Output',
    logo: '/assets/brands/rule1.svg',
    slug: 'Rule+1',
    origin: 'Aurora, Illinois, USA',
    certifications: ['Pure WPI & WPH', 'Informed Choice Certified'],
    desc: 'Ultra-pure isolate formulations manufactured in state-of-the-art cGMP facilities with zero amino spiking or gums.'
  }
];

export default function Brands() {
  return (
    <div className="brands-page-wrapper">
      <div className="category-hero brands-hero">
        <div className="container category-hero-content">
          <nav className="breadcrumbs light">
            <Link to="/">Home</Link>
            <span>&gt;</span>
            <span className="current">Certified Supplement Brands</span>
          </nav>
          <span className="category-pre-badge">
            <Award size={15} /> DIRECT BRAND IMPORTER DISTRIBUTIONS
          </span>
          <h1 className="category-title">CERTIFIED GLOBAL BRANDS</h1>
          <p className="category-desc">
            At OLIVER SUPPLEMENT SHOP, every brand is sourced through official brand authorized importers. 100% genuine holographic seals, scratch verification codes, and complete batch traceability.
          </p>
        </div>
      </div>

      <div className="container section-pad">
        <div className="brands-detailed-grid">
          {BRAND_DETAILS.map((brand) => (
            <div key={brand.name} className="brand-detailed-card">
              <div className="brand-card-top-row">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="brand-logo-full" 
                />
                <span className="brand-origin-badge">{brand.origin}</span>
              </div>

              <div className="brand-card-info-wrap">
                <h3 className="brand-name-title">{brand.name}</h3>
                <p className="brand-tagline-text">{brand.tagline}</p>
                <p className="brand-desc-text">{brand.desc}</p>

                <div className="brand-certs-list">
                  {brand.certifications.map((cert, idx) => (
                    <span key={idx} className="brand-cert-pill">
                      <CheckCircle2 size={12} /> {cert}
                    </span>
                  ))}
                </div>

                <div className="brand-card-action">
                  <Link to={`/shop?brand=${brand.slug}`} className="btn-primary brand-shop-link">
                    SHOP {brand.name.toUpperCase()} PRODUCTS <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

