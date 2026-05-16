import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FiCheckCircle, FiArrowLeft, FiShield, FiFileText, FiBriefcase, 
  FiPieChart, FiTrendingUp, FiUserCheck, FiTarget, FiActivity, FiUsers 
} from 'react-icons/fi';

const serviceData = {
  'auditing': {
    title: 'Auditing & Assurance',
    icon: <FiShield />,
    description: 'We provide statutory audits, internal audits, tax audits, and management audits to ensure transparency, accuracy, and compliance with regulatory requirements. Our audit process is risk-based, focused on improving internal controls and enhancing business efficiency.',
    detailedSections: [
      {
        title: 'Statutory Audit (Companies Act, 2013):',
        content: "A mandatory audit for companies under the Companies Act, aimed at verifying the accuracy of financial statements and ensuring they present a true and fair view of the company's financial position.",
        icon: <FiCheckCircle />
      },
      {
        title: 'Tax Audit (Section 44AB of the Income Tax Act):',
        content: 'Conducted for businesses and professionals whose turnover exceeds specified thresholds. It ensures correct income computation, proper maintenance of books, and compliance with tax laws.',
        icon: <FiFileText />
      },
      {
        title: 'Internal & Management Audits:',
        content: 'These audits assess the effectiveness of internal controls, operational efficiencies, and risk management. They help management in strategic decision-making and identifying areas for process improvement.',
        icon: <FiTrendingUp />
      },
      {
        title: 'GST Audit & Certification:',
        content: 'Conducted to verify GST compliance, accuracy of returns, and correctness of input tax credit claims. Certification under GST rules may be required based on turnover thresholds or departmental scrutiny.',
        icon: <FiActivity />
      },
      {
        title: 'Banking & Financial Audits:',
        content: "Banks' Central Statutory Audits / Branch Statutory Audits / Concurrent Audits / Stock Audits to ensure compliance with RBI and other regulatory guidelines.",
        icon: <FiShield />
      }
    ]
  },
  'taxation': {
    title: 'Taxation Services',
    icon: <FiFileText />,
    description: 'Our comprehensive taxation services ensure accurate compliance, effective tax planning, and representation before tax authorities. We serve individuals, firms, and companies with expert guidance on direct and indirect taxes, minimizing risks and optimizing tax positions.',
    detailedSections: [
      {
        title: 'Income Tax Return Filing (ITR):',
        content: 'Preparation and filing of accurate income tax returns for individuals, businesses, and HNIs, while maximizing deductions and ensuring timely compliance.',
        icon: <FiUserCheck />
      },
      {
        title: 'TDS Compliance & Filing:',
        content: 'Assistance in TDS calculation, payment, return filing, and correction of defaults to avoid interest and penalties.',
        icon: <FiActivity />
      },
      {
        title: 'Tax Audit (Section 44AB):',
        content: 'Mandatory audit for entities exceeding specified turnover limits. Ensures proper books of accounts and compliance with the Income Tax Act.',
        icon: <FiShield />
      },
      {
        title: 'Advance Tax & Self-Assessment Tax:',
        content: 'Computation and payment planning of advance tax installments and final tax liabilities to avoid interest under sections 234B & 234C.',
        icon: <FiTrendingUp />
      },
      {
        title: 'GST Registration & Return Filing:',
        content: 'End-to-end GST compliance, including registration, filing GSTR-1, GSTR-3B, annual returns, and reconciliation with books.',
        icon: <FiCheckCircle />
      },
      {
        title: 'Representation Before Tax Authorities:',
        content: 'Assistance in responding to notices, scrutiny assessments, appeals, and other litigation matters before the Income Tax and GST departments.',
        icon: <FiTarget />
      }
    ]
  },
  'incorporation': {
    title: 'Company Incorporation & Advisory',
    icon: <FiBriefcase />,
    description: 'We provide complete support for business setup in India—from legal entity selection and registration to regulatory compliance. Whether you’re a startup, MSME, or foreign investor, we help launch your business with ease and confidence & our corporate advisory services focus on strategic financial and legal consulting to support business expansion, restructuring, compliance, and stakeholder value creation.',
    detailedSections: [
      {
        title: 'Private Limited / LLP / OPC Formation:',
        content: 'Incorporation of entities with all legal formalities, including DSC, DIN, PAN, TAN, and drafting of MoA & AoA.',
        icon: <FiBriefcase />
      },
      {
        title: 'Proprietorship & Partnership Registration:',
        content: 'Quick setup of unincorporated businesses with required registrations like MSME/Udyam, GST, and Shops & Establishment.',
        icon: <FiUserCheck />
      },
      {
        title: 'Startup India & MSME Registration:',
        content: 'Registration under Startup India for benefits and incentives. MSME/Udyam for easier loans, subsidies, and compliance relaxations.',
        icon: <FiTrendingUp />
      },
      {
        title: 'FEMA & RBI Compliance:',
        content: 'Regulatory support for foreign investments, outbound remittances, ECBs, and filings under FEMA regulations.',
        icon: <FiShield />
      },
      {
        title: 'Business Valuation & Fairness Opinion:',
        content: 'Accurate valuation of shares, businesses, or assets for investment, M&A, compliance, or litigation purposes.',
        icon: <FiPieChart />
      },
      {
        title: 'Mergers, Acquisitions & Restructuring:',
        content: 'Advisory on planning, structuring, and implementing business combinations, demergers, or hive-offs.',
        icon: <FiTarget />
      }
    ]
  },
  'advisory': {
    title: 'Financial Advisory Services',
    icon: <FiTrendingUp />,
    description: 'We assist individuals and businesses in making data-driven financial and investment decisions. Our solutions focus on wealth creation, capital allocation, and financial health, tailored to your risk profile and growth plans.',
    detailedSections: [
      {
        title: 'Budgeting & Financial Forecasting:',
        content: 'Preparation of detailed budgets, rolling forecasts, and variance analysis to support financial discipline and planning.',
        icon: <FiPieChart />
      },
      {
        title: 'Cash Flow & Working Capital Management:',
        content: 'Monitoring and optimizing inflows/outflows to maintain liquidity and meet short-term obligations effectively.',
        icon: <FiActivity />
      },
      {
        title: 'Debt Syndication & Loan Advisory:',
        content: 'Assistance in preparing project reports, CMA data, and securing business loans, overdrafts, and working capital finance.',
        icon: <FiBriefcase />
      },
      {
        title: 'Startup & Project Funding:',
        content: 'Advisory for raising equity or debt from investors, banks, or government grants, including pitch deck and financial modeling support.',
        icon: <FiTrendingUp />
      },
      {
        title: 'Investment Planning & Wealth Advisory:',
        content: 'Tailored strategies for mutual funds, bonds, insurance, SIPs, or equity investments for individuals or business owners.',
        icon: <FiTarget />
      },
      {
        title: 'Financial Risk Management:',
        content: 'Identification of market, credit, and operational risks with hedging or control mechanisms to reduce exposure.',
        icon: <FiShield />
      }
    ]
  },
  'compliance': {
    title: 'Regulation & Compliance',
    icon: <FiCheckCircle />,
    description: 'We offer a full suite of compliance services to ensure your business meets its obligations under corporate, tax, labor, and sector-specific laws. Our proactive approach helps you stay ahead of deadlines and avoid penalties.',
    detailedSections: [
      {
        title: 'ROC/MCA Compliance & Annual Filings:',
        content: 'Timely filing of forms like AOC-4, MGT-7, DIR-3 KYC, and resolutions to maintain good standing with the Registrar of Companies.',
        icon: <FiShield />
      },
      {
        title: 'GST Compliance & Filing:',
        content: 'Return filing (GSTR-1, GSTR-3B), input credit reconciliations, e-invoicing, and audit compliance under GST laws.',
        icon: <FiFileText />
      },
      {
        title: 'FEMA, FCRA and RBI Regulatory Compliance:',
        content: 'Assistance with filings, approvals, and reporting under FEMA and FCRA guidelines for cross-border and financial market transactions.',
        icon: <FiActivity />
      },
      {
        title: 'TDS, PF, ESI, and Labor Law Compliance:',
        content: 'Monthly deductions, payments, and returns under employee-related statutes including PF, ESI, and professional tax.',
        icon: <FiUsers />
      },
      {
        title: 'FSSAI, MSME, and Trade License Registration:',
        content: 'Sector-specific registrations to ensure lawful operation in food, manufacturing, or service industries.',
        icon: <FiCheckCircle />
      },
      {
        title: 'Contract Drafting & Review:',
        content: 'Preparation and vetting of legal agreements like NDAs, vendor contracts, employment letters, and lease deeds.',
        icon: <FiBriefcase />
      }
    ]
  },
  'accounting': {
    title: 'Accounting & Bookkeeping',
    icon: <FiPieChart />,
    description: 'We offer accurate, timely, and compliant accounting and bookkeeping services tailored to your business model. Our services ensure your books are always up to date, allowing informed financial decisions and smooth audits.',
    detailedSections: [
      {
        title: 'Preparation of Financial Statements:',
        content: 'Drafting of Profit & Loss Statements, Balance Sheets, and Cash Flow Reports as per Ind AS or applicable frameworks.',
        icon: <FiFileText />
      },
      {
        title: 'Payroll Processing & Accounting:',
        content: 'Salary computations, statutory deductions (PF/ESI/TDS), payslip generation, and payroll entries in the books.',
        icon: <FiUsers />
      },
      {
        title: 'Cloud-Based Accounting:',
        content: 'Setup and management of cloud accounting platforms like Tally, Zoho, and QuickBooks for real-time data access, automation, and accuracy.',
        icon: <FiActivity />
      },
      {
        title: 'Inventory & Fixed Asset Management:',
        content: 'Maintenance of stock registers, fixed asset registers, and periodic reconciliation to support reporting and audits.',
        icon: <FiTrendingUp />
      },
      {
        title: 'Bank & Account Reconciliations:',
        content: 'Monthly reconciliation of bank accounts, vendor and customer ledgers to ensure accurate financial reporting.',
        icon: <FiCheckCircle />
      }
    ]
  },
};

const ProductDetails = () => {
  const { id } = useParams();
  const service = serviceData[id] || serviceData['auditing'];

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Header Section */}
      <section style={{ padding: '60px 24px', background: '#f8f9fa', borderBottom: '1px solid #eee' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0056b3', textDecoration: 'none', fontWeight: 600, marginBottom: '32px' }}>
            <FiArrowLeft /> All Services
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ width: '64px', height: '64px', background: '#0a2540', color: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
              {service.icon}
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0a2540' }}>{service.title}</h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '80px' }} className="responsive-grid">
            
            {/* Left Column: Details */}
            <div>
              <p style={{ fontSize: '20px', color: '#444', lineHeight: 1.7, marginBottom: '48px', fontStyle: 'italic' }}>
                {service.description}
              </p>

              {service.detailedSections ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                  {service.detailedSections.map((section, i) => (
                    <div key={i} style={{ 
                      padding: '30px', 
                      background: '#fff', 
                      borderRadius: '12px', 
                      border: '1px solid #eee',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                    >
                      <div style={{ color: '#0056b3', marginBottom: '16px', fontSize: '24px' }}>{section.icon}</div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0a2540', marginBottom: '12px' }}>{section.title}</h3>
                      <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6 }}>{section.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {service.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                      <FiCheckCircle style={{ color: '#0056b3', flexShrink: 0 }} size={24} />
                      <span style={{ fontSize: '17px', color: '#0a2540', fontWeight: 600 }}>{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Inquiry Form */}
            <div>
              <div style={{ background: '#0a2540', padding: '40px', borderRadius: '16px', color: '#fff' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px' }}>Enquire About {service.title}</h2>
                <p style={{ opacity: 0.8, marginBottom: '32px', fontSize: '14px' }}>
                  Need expert guidance? Fill out the form and our tax specialists will contact you.
                </p>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <input type="text" placeholder="Full Name" style={{ padding: '14px', borderRadius: '6px', border: 'none', outline: 'none', fontSize: '14px' }} />
                  <input type="email" placeholder="Email Address" style={{ padding: '14px', borderRadius: '6px', border: 'none', outline: 'none', fontSize: '14px' }} />
                  <input type="tel" placeholder="Phone Number" style={{ padding: '14px', borderRadius: '6px', border: 'none', outline: 'none', fontSize: '14px' }} />
                  <textarea placeholder="Your Message" rows="4" style={{ padding: '14px', borderRadius: '6px', border: 'none', outline: 'none', fontSize: '14px', resize: 'none' }}></textarea>
                  <button style={{ padding: '16px', background: '#00a8ff', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', marginTop: '10px' }}>
                    Send Message
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 992px) {
          .responsive-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
