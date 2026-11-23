// scripts/doc_generator/styles.cjs

const headAndStyles = `
<html xmlns:o='urn:schemas-microsoft-com:office:office'
      xmlns:w='urn:schemas-microsoft-com:office:word'
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<meta name="ProgId" content="Word.Document">
<meta name="Generator" content="Microsoft Word 15">
<meta name="Originator" content="Microsoft Word 15">
<title>LuxeStay Hotel Management System - Complete Engineering & UML Documentation</title>
<!--[if gte mso 9]>
<xml>
<o:DocumentProperties>
  <o:Title>LuxeStay Hotel Management System - Architecture & UML Specification</o:Title>
  <o:Author>LuxeStay Enterprise Engineering Team</o:Author>
  <o:Company>LuxeStay Hospitality Solutions</o:Company>
  <o:Version>2.0</o:Version>
</o:DocumentProperties>
<w:WordDocument>
  <w:View>Print</w:View>
  <w:Zoom>100</w:Zoom>
  <w:DoNotOptimizeForBrowser/>
</w:WordDocument>
</xml>
<![endif]-->
<style>
  @page {
    size: A4;
    margin: 1.0in;
  }
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 12pt;
    color: #000000;
    line-height: 1.5;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
    text-align: center;
  }
  h1 {
    font-size: 24pt;
    color: #000000;
    margin-top: 24pt;
    margin-bottom: 12pt;
    font-weight: normal;
  }
  h2 {
    font-size: 18pt;
    color: #000000;
    margin-top: 24pt;
    margin-bottom: 12pt;
    font-weight: normal;
    page-break-after: avoid;
    text-align: center;
  }
  h3 {
    font-size: 14pt;
    color: #000000;
    margin-top: 18pt;
    margin-bottom: 10pt;
    font-weight: normal;
    text-align: left;
  }
  p, li {
    font-size: 12pt;
    text-align: justify;
    margin: 0 0 10pt 0;
  }
  .cover-page {
    text-align: center;
    page-break-after: always;
    padding-top: 40pt;
  }
  .cover-title {
    font-size: 20pt;
    font-weight: normal;
    color: #7030a0; /* Matching the purple title in the PDF */
    margin-bottom: 40pt;
  }
  .cover-section {
    margin-top: 40pt;
  }
  .cover-text {
    font-size: 14pt;
    margin-bottom: 8pt;
  }
  .cover-college {
    margin-top: 60pt;
    font-size: 16pt;
    font-weight: bold;
  }
  .cover-year-title {
    margin-top: 40pt;
    font-size: 14pt;
    font-weight: bold;
    text-decoration: underline;
  }
  .cover-year {
    font-size: 14pt;
    margin-top: 8pt;
  }
  .page-break {
    page-break-before: always;
    mso-break-type: page-break;
  }
  .toc-box {
    text-align: left;
    margin: 20pt;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 15pt 0;
    font-size: 11pt;
  }
  table, th, td {
    border: 1px solid #000000;
  }
  th, td {
    padding: 8pt;
    text-align: left;
  }
  .diagram-container {
    text-align: center;
    margin: 20pt 0;
  }
  .diagram-title-banner {
    display: none;
  }
  .code-container {
    text-align: left;
    background-color: #f8f9fa;
    padding: 10pt;
    border: 1px solid #dee2e6;
    font-family: 'Courier New', Courier, monospace;
    font-size: 10pt;
    white-space: pre-wrap;
  }
</style>
</head>
<body>
`;

const coverPage = `
<div class="cover-page">
  <div style="margin-bottom: 40px;">
    <!-- Logo placeholder -->
  </div>
  <div class="cover-title">“Hotel Management System – Project Documentation”</div>
  
  <div class="cover-section">
    <div class="cover-text">Submitted By</div>
    <div class="cover-text" style="font-weight: bold;">[Student Name 1]</div>
    <div class="cover-text" style="font-weight: bold;">[Student Name 2]</div>
  </div>

  <div class="cover-section">
    <div class="cover-text">Guided By</div>
    <div class="cover-text" style="font-weight: bold;">[Guide Name 1]</div>
    <div class="cover-text" style="font-weight: bold;">[Guide Name 2]</div>
  </div>

  <div class="cover-college">
    [College Name]<br>
    [College Location]
  </div>

  <div class="cover-year-title">ACADEMIC-YEAR</div>
  <div class="cover-year">2026-2027</div>
</div>
`;

const tableOfContents = `
<div class="page-break"></div>
<h2>Table of Contents</h2>
<p>This technical design manual provides exhaustive architectural, modeling, and database specifications for the LuxeStay Hotel Management System.</p>

<div class="toc-box">
  <div class="toc-row">
    <span class="toc-num">1.</span>
    <span class="toc-text">Class Diagram (UML Class Model)</span>
    <span class="toc-desc">25 Entities, Attributes, Methods &amp; Relationships</span>
  </div>
  <div class="toc-row">
    <span class="toc-num">2.</span>
    <span class="toc-text">Object Diagram (Instance Snapshot)</span>
    <span class="toc-desc">Concrete Runtime Snapshot with Real Data Links</span>
  </div>
  <div class="toc-row">
    <span class="toc-num">3.</span>
    <span class="toc-text">Use Case Diagram</span>
    <span class="toc-desc">6 Actors, System Boundary, 41 Use Cases &amp; Relations</span>
  </div>
  <div class="toc-row">
    <span class="toc-num">4.</span>
    <span class="toc-text">Sequence Diagram</span>
    <span class="toc-desc">End-to-End Guest Reservation &amp; Check-In Flow</span>
  </div>
  <div class="toc-row">
    <span class="toc-num">5.</span>
    <span class="toc-text">Collaboration Diagram</span>
    <span class="toc-desc">Communication Paths &amp; Numbered Message Exchanges</span>
  </div>
  <div class="toc-row">
    <span class="toc-num">6.</span>
    <span class="toc-text">State Diagram (Statecharts)</span>
    <span class="toc-desc">Booking Lifecycle &amp; Room Operational Status States</span>
  </div>
  <div class="toc-row">
    <span class="toc-num">7.</span>
    <span class="toc-text">Activity Diagram</span>
    <span class="toc-desc">Complete Guest Stay Business Workflow &amp; Decisions</span>
  </div>
  <div class="toc-row">
    <span class="toc-num">8.</span>
    <span class="toc-text">Component Diagram</span>
    <span class="toc-desc">UI Modules, API Controllers, Middleware &amp; ORM Components</span>
  </div>
  <div class="toc-row">
    <span class="toc-num">9.</span>
    <span class="toc-text">Deployment Diagram</span>
    <span class="toc-desc">Hardware Nodes, CDN, Containerized Cloud Servers &amp; DB</span>
  </div>
  <div class="toc-row">
    <span class="toc-num">10.</span>
    <span class="toc-text">Entity Relationship (ER) Diagram</span>
    <span class="toc-desc">Relational Entity Mapping, Cardinalities &amp; Foreign Keys</span>
  </div>
  <div class="toc-row">
    <span class="toc-num">11.</span>
    <span class="toc-text">Comprehensive Data Dictionary</span>
    <span class="toc-desc">Full Column Specifications for all 25 Database Tables</span>
  </div>
  <div class="toc-row">
    <span class="toc-num">12.</span>
    <span class="toc-text">PostgreSQL / Prisma Production Schema</span>
    <span class="toc-desc">Verbatim schema.prisma Listing with Enums &amp; Indexes</span>
  </div>
  <div class="toc-row">
    <span class="toc-num">13.</span>
    <span class="toc-text">Architecture Overview</span>
    <span class="toc-desc">4-Tier Enterprise Architecture, Security &amp; Data Pipeline</span>
  </div>
</div>
`;

module.exports = {
  headAndStyles,
  coverPage,
  tableOfContents
};
