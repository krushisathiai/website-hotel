const fs = require('fs');
const path = require('path');
const HTMLtoDOCX = require('html-to-docx');

const { headAndStyles } = require('./styles.cjs');
const {
  classDiagramHtml,
  useCaseDiagramHtml,
  sequenceDiagramHtml
} = require('./diagrams_part1.cjs');

const {
  activityDiagramHtml,
  deploymentDiagramHtml,
  erDiagramHtml
} = require('./diagrams_part2.cjs');

const coverPage = `
<div class="cover-page">
  <div style="margin-bottom: 40px;">
    <!-- Logo placeholder -->
  </div>
  <div class="cover-title" style="color: #8b5cf6; font-size: 24pt;">“Hotel Management System &amp; Operations Assistant”</div>
  
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

const introHtml = `
<div class="page-break"></div>
<h2>Introduction</h2>
<ul>
  <li>
    <strong>Hotel Management System &amp; Operations Assistant</strong> is an intelligent application designed to help hoteliers and staff make better decisions and manage daily operations. It creates a digital representation of the hotel by analyzing areas such as bookings, rooms, housekeeping, and finances.
  </li>
  <li>
    The system uses modern web technologies and predictive analytics to understand past activities, manage current states, and provide personalized recommendations for guests. Staff can also perform operational workflows to understand the possible impact of their decisions before taking action.
  </li>
</ul>
`;

const dbSchemaHtml = `
<div class="page-break"></div>
<h2>Database Schema</h2>
<p>Hierarchical database schema showing tables and their respective columns.</p>
<div style="text-align: center;">
<svg viewBox="0 0 1060 400" width="100%" height="400" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:'Segoe UI', Calibri, sans-serif;">
  <!-- Root -->
  <rect x="430" y="20" width="200" height="40" rx="4" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
  <text x="530" y="45" font-weight="bold" font-size="12" fill="#1e1b4b" text-anchor="middle">HOTEL_DB</text>
  
  <!-- Lines -->
  <line x1="530" y1="60" x2="530" y2="100" stroke="#4338ca" stroke-width="2"/>
  <line x1="150" y1="100" x2="910" y2="100" stroke="#4338ca" stroke-width="2"/>
  
  <line x1="150" y1="100" x2="150" y2="140" stroke="#4338ca" stroke-width="2"/>
  <line x1="340" y1="100" x2="340" y2="140" stroke="#4338ca" stroke-width="2"/>
  <line x1="530" y1="100" x2="530" y2="140" stroke="#4338ca" stroke-width="2"/>
  <line x1="720" y1="100" x2="720" y2="140" stroke="#4338ca" stroke-width="2"/>
  <line x1="910" y1="100" x2="910" y2="140" stroke="#4338ca" stroke-width="2"/>

  <!-- User -->
  <rect x="70" y="140" width="160" height="150" rx="4" fill="#ffffff" stroke="#312e81" stroke-width="1.5"/>
  <rect x="70" y="140" width="160" height="24" rx="4" fill="#312e81"/>
  <text x="150" y="156" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">USER</text>
  <text x="80" y="180" font-size="9" fill="#1e293b">PK id (UUID)</text>
  <text x="80" y="195" font-size="9" fill="#1e293b">username (VARCHAR)</text>
  <text x="80" y="210" font-size="9" fill="#1e293b">email (VARCHAR)</text>
  <text x="80" y="225" font-size="9" fill="#1e293b">password (VARCHAR)</text>
  <text x="80" y="240" font-size="9" fill="#1e293b">role (VARCHAR)</text>
  <text x="80" y="255" font-size="9" fill="#1e293b">created_at (DATETIME)</text>

  <!-- Guest -->
  <rect x="260" y="140" width="160" height="150" rx="4" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
  <rect x="260" y="140" width="160" height="24" rx="4" fill="#16a34a"/>
  <text x="340" y="156" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">GUEST</text>
  <text x="270" y="180" font-size="9" fill="#1e293b">PK id (UUID)</text>
  <text x="270" y="195" font-size="9" fill="#1e293b">firstName (VARCHAR)</text>
  <text x="270" y="210" font-size="9" fill="#1e293b">lastName (VARCHAR)</text>
  <text x="270" y="225" font-size="9" fill="#1e293b">phone (VARCHAR)</text>
  <text x="270" y="240" font-size="9" fill="#1e293b">email (VARCHAR)</text>
  <text x="270" y="255" font-size="9" fill="#1e293b">created_at (DATETIME)</text>

  <!-- Room -->
  <rect x="450" y="140" width="160" height="150" rx="4" fill="#ffffff" stroke="#ca8a04" stroke-width="1.5"/>
  <rect x="450" y="140" width="160" height="24" rx="4" fill="#ca8a04"/>
  <text x="530" y="156" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">ROOM</text>
  <text x="460" y="180" font-size="9" fill="#1e293b">PK id (UUID)</text>
  <text x="460" y="195" font-size="9" fill="#1e293b">number (VARCHAR)</text>
  <text x="460" y="210" font-size="9" fill="#1e293b">floor (INT)</text>
  <text x="460" y="225" font-size="9" fill="#1e293b">status (VARCHAR)</text>
  <text x="460" y="240" font-size="9" fill="#1e293b">roomTypeId (UUID)</text>
  <text x="460" y="255" font-size="9" fill="#1e293b">created_at (DATETIME)</text>

  <!-- Booking -->
  <rect x="640" y="140" width="160" height="150" rx="4" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
  <rect x="640" y="140" width="160" height="24" rx="4" fill="#dc2626"/>
  <text x="720" y="156" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">BOOKING</text>
  <text x="650" y="180" font-size="9" fill="#1e293b">PK id (UUID)</text>
  <text x="650" y="195" font-size="9" fill="#1e293b">guestId (UUID)</text>
  <text x="650" y="210" font-size="9" fill="#1e293b">roomId (UUID)</text>
  <text x="650" y="225" font-size="9" fill="#1e293b">checkInDate (DATE)</text>
  <text x="650" y="240" font-size="9" fill="#1e293b">status (VARCHAR)</text>
  <text x="650" y="255" font-size="9" fill="#1e293b">created_at (DATETIME)</text>

  <!-- Payment -->
  <rect x="830" y="140" width="160" height="150" rx="4" fill="#ffffff" stroke="#a855f7" stroke-width="1.5"/>
  <rect x="830" y="140" width="160" height="24" rx="4" fill="#a855f7"/>
  <text x="910" y="156" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">PAYMENT</text>
  <text x="840" y="180" font-size="9" fill="#1e293b">PK id (UUID)</text>
  <text x="840" y="195" font-size="9" fill="#1e293b">bookingId (UUID)</text>
  <text x="840" y="210" font-size="9" fill="#1e293b">amount (DECIMAL)</text>
  <text x="840" y="225" font-size="9" fill="#1e293b">method (VARCHAR)</text>
  <text x="840" y="240" font-size="9" fill="#1e293b">status (VARCHAR)</text>
  <text x="840" y="255" font-size="9" fill="#1e293b">created_at (DATETIME)</text>

</svg>
</div>
`;

const umlDiagramsHeader = `
<div class="page-break"></div>
<h2>UML Diagrams:-</h2>
`;

const rawBodyHtml = [
  coverPage,
  introHtml,
  dbSchemaHtml,
  erDiagramHtml.replace('<h2>10. Entity Relationship (ER) Diagram</h2>', '<h2>ER- Diagram</h2>'),
  umlDiagramsHeader,
  useCaseDiagramHtml.replace(/<h2[^>]*>.*<\/h2>/, '<h3>1. Use Case Diagram</h3>'),
  classDiagramHtml.replace(/<h2[^>]*>.*<\/h2>/, '<h3>2. Class Diagram</h3>'),
  activityDiagramHtml.replace(/<h2[^>]*>.*<\/h2>/, '<h3>3. Activity Diagram</h3>'),
  sequenceDiagramHtml.replace(/<h2[^>]*>.*<\/h2>/, '<h3>4. Sequence Diagram</h3>'),
  deploymentDiagramHtml.replace(/<h2[^>]*>.*<\/h2>/, '<h3>5. Deployment Diagram</h3>')
].join('\n');

async function buildAll() {
  console.log('Generating Proper Diagrams files...');

  const fullHtml = headAndStyles + rawBodyHtml + '\n</body>\n</html>';
  const htmlPath = path.join(__dirname, '..', '..', 'Proper_Diagrams_Digital_Twin_Style.html');
  fs.writeFileSync(htmlPath, fullHtml, 'utf8');
  console.log('1. Generated Proper_Diagrams_Digital_Twin_Style.html');

  let cleanDocxHtml = rawBodyHtml
    .replace(/<svg[\s\S]*?<\/svg>/gi, '<p><em>[Visual UML Diagram - See HTML version for full vector graphic]</em></p>')
    .replace(/style="[^"]*width:[^"]*"/gi, '')
    .replace(/style='[^']*width:[^']*'/gi, '');

  try {
    const docxBuffer = await HTMLtoDOCX(cleanDocxHtml, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true,
      title: 'Proper Diagrams Documentation',
      description: 'Diagrams as requested'
    });
    const docxPath = path.join(__dirname, '..', '..', 'Proper_Diagrams_Digital_Twin_Style.docx');
    fs.writeFileSync(docxPath, docxBuffer);
    console.log('2. Successfully generated Proper_Diagrams_Digital_Twin_Style.docx');
  } catch (err) {
    console.error('Error generating docx:', err);
  }
}

buildAll().catch(console.error);
