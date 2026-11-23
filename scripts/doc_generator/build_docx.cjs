// scripts/doc_generator/build_docx.cjs

const fs = require('fs');
const path = require('path');
const HTMLtoDOCX = require('html-to-docx');

const { headAndStyles, coverPage, tableOfContents } = require('./styles.cjs');
const {
  classDiagramHtml,
  objectDiagramHtml,
  useCaseDiagramHtml,
  sequenceDiagramHtml,
  collaborationDiagramHtml
} = require('./diagrams_part1.cjs');

const {
  stateDiagramHtml,
  activityDiagramHtml,
  componentDiagramHtml,
  deploymentDiagramHtml,
  erDiagramHtml,
  architectureOverviewHtml
} = require('./diagrams_part2.cjs');

const { dataDictionaryHtml } = require('./data_dictionary.cjs');

// Read actual schema.prisma
const prismaSchemaPath = path.join(__dirname, '..', '..', 'backend', 'prisma', 'schema.prisma');
let prismaRawSchema = '';
try {
  prismaRawSchema = fs.readFileSync(prismaSchemaPath, 'utf8');
} catch (e) {
  console.error('Failed to read schema.prisma:', e);
}

const escapedPrismaSchema = prismaRawSchema
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const prismaSchemaSectionHtml = `
<div class="page-break"></div>
<h2 id="sec-12">12. PostgreSQL / Prisma Production Schema</h2>
<p>
  Below is the complete, authentic Prisma ORM schema (<code>schema.prisma</code>) defining the physical data 
  structures, UUID keys, multi-tenant relational bindings, cascade delete rules, and composite performance indexes.
</p>

<h3>12.1 PostgreSQL Enumerations Reference</h3>
<table>
  <tr>
    <th>Enum Identifier</th>
    <th>Permitted Enumerated Values</th>
  </tr>
  <tr>
    <td><strong>Role</strong></td>
    <td><code>SUPER_ADMIN</code>, <code>HOTEL_ADMIN</code>, <code>MANAGER</code>, <code>RECEPTIONIST</code>, <code>HOUSEKEEPING</code>, <code>ACCOUNTANT</code>, <code>STAFF</code></td>
  </tr>
  <tr>
    <td><strong>RoomStatus</strong></td>
    <td><code>AVAILABLE</code>, <code>OCCUPIED</code>, <code>RESERVED</code>, <code>CLEANING</code>, <code>MAINTENANCE</code>, <code>OUT_OF_SERVICE</code></td>
  </tr>
  <tr>
    <td><strong>BookingStatus</strong></td>
    <td><code>PENDING</code>, <code>CONFIRMED</code>, <code>CHECKED_IN</code>, <code>CHECKED_OUT</code>, <code>CANCELLED</code>, <code>NO_SHOW</code></td>
  </tr>
  <tr>
    <td><strong>BookingSource</strong></td>
    <td><code>WALK_IN</code>, <code>WEBSITE</code>, <code>PHONE</code>, <code>TRAVEL_AGENT</code>, <code>OTA</code>, <code>OTHER</code></td>
  </tr>
  <tr>
    <td><strong>PaymentMethod</strong></td>
    <td><code>CASH</code>, <code>CARD</code>, <code>UPI</code>, <code>BANK_TRANSFER</code>, <code>OTHER</code></td>
  </tr>
  <tr>
    <td><strong>PaymentStatus</strong></td>
    <td><code>COMPLETED</code>, <code>PENDING</code>, <code>REFUNDED</code>, <code>FAILED</code></td>
  </tr>
  <tr>
    <td><strong>InvoiceStatus</strong></td>
    <td><code>PAID</code>, <code>UNPAID</code>, <code>PARTIAL</code>, <code>CANCELLED</code></td>
  </tr>
  <tr>
    <td><strong>ExpenseCategory</strong></td>
    <td><code>ELECTRICITY</code>, <code>WATER</code>, <code>SALARY</code>, <code>MAINTENANCE</code>, <code>FOOD</code>, <code>SUPPLIES</code>, <code>MARKETING</code>, <code>RENT</code>, <code>INSURANCE</code>, <code>OTHER</code></td>
  </tr>
  <tr>
    <td><strong>HousekeepingStatus</strong></td>
    <td><code>PENDING</code>, <code>IN_PROGRESS</code>, <code>COMPLETED</code>, <code>INSPECTION</code></td>
  </tr>
  <tr>
    <td><strong>MaintenanceStatus</strong></td>
    <td><code>OPEN</code>, <code>IN_PROGRESS</code>, <code>RESOLVED</code>, <code>CLOSED</code></td>
  </tr>
  <tr>
    <td><strong>Priority</strong></td>
    <td><code>LOW</code>, <code>MEDIUM</code>, <code>HIGH</code>, <code>URGENT</code></td>
  </tr>
  <tr>
    <td><strong>InventoryTxnType</strong></td>
    <td><code>STOCK_IN</code>, <code>STOCK_OUT</code>, <code>ADJUSTMENT</code></td>
  </tr>
</table>

<h3>12.2 Production Prisma Schema Listing (Verbatim)</h3>
<pre><code>${escapedPrismaSchema}</code></pre>
`;

const documentFooterHtml = `
<div class="page-break"></div>
<div class="footer-note">
  <p><strong>LuxeStay Hotel Management System &bull; Enterprise Technical Specification Document</strong></p>
  <p>&copy; 2026 LuxeStay Hospitality Technologies. Authored from production source code, controllers, and Prisma schema.</p>
</div>
`;

// Body HTML for docx conversion
const rawBodyHtml = [
  coverPage,
  tableOfContents,
  classDiagramHtml,
  objectDiagramHtml,
  useCaseDiagramHtml,
  sequenceDiagramHtml,
  collaborationDiagramHtml,
  stateDiagramHtml,
  activityDiagramHtml,
  componentDiagramHtml,
  deploymentDiagramHtml,
  erDiagramHtml,
  dataDictionaryHtml,
  prismaSchemaSectionHtml,
  architectureOverviewHtml,
  documentFooterHtml
].join('\n');

async function buildAll() {
  console.log('Generating files...');

  // 1. Generate HTML version for browser preview & print
  const fullHtml = headAndStyles + rawBodyHtml + '\n</body>\n</html>';
  const htmlPath = path.join(__dirname, '..', '..', 'Hotel_Management_System_Documentation.html');
  fs.writeFileSync(htmlPath, fullHtml, 'utf8');
  console.log('1. Generated Hotel_Management_System_Documentation.html (Full SVG + CSS)');

  // 2. Keep the Word-compatible .doc file
  const docPath = path.join(__dirname, '..', '..', 'Hotel_Management_System_Documentation.doc');
  fs.writeFileSync(docPath, fullHtml, 'utf8');
  console.log('2. Updated Hotel_Management_System_Documentation.doc (Word HTML format)');

  // 3. Clean HTML for docx converter (remove SVGs and style widths that break xmlbuilder2)
  console.log('Preparing clean HTML for native .docx conversion...');
  let cleanDocxHtml = rawBodyHtml
    .replace(/<svg[\s\S]*?<\/svg>/gi, '<p><em>[Visual UML Diagram - See accompanying diagram table below or open HTML version for full vector graphic]</em></p>')
    .replace(/style="[^"]*width:[^"]*"/gi, '')
    .replace(/style='[^']*width:[^']*'/gi, '');

  try {
    const docxBuffer = await HTMLtoDOCX(cleanDocxHtml, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true,
      title: 'LuxeStay Hotel Management System Documentation',
      description: 'Complete Architecture, UML & Schema Specification'
    });
    const docxPath = path.join(__dirname, '..', '..', 'Hotel_Management_System_Documentation.docx');
    fs.writeFileSync(docxPath, docxBuffer);
    console.log('3. Successfully generated Hotel_Management_System_Documentation.docx! Size:', docxBuffer.length);
  } catch (err) {
    console.error('Error generating docx:', err);
  }
}

buildAll().catch(console.error);
