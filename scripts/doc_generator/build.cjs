// scripts/doc_generator/build.cjs

const fs = require('fs');
const path = require('path');

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

// Escape HTML for code block
const escapedPrismaSchema = prismaRawSchema
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

// Section 12: PostgreSQL / Prisma Schema
const prismaSchemaSectionHtml = `
<div class="page-break"></div>
<h2 id="sec-12">12. PostgreSQL / Prisma Production Schema</h2>
`;

const documentFooterHtml = `
<div class="page-break"></div>
<div class="footer-note">
  <p><strong>LuxeStay Hotel Management System</strong></p>
  <p>&copy; 2026 LuxeStay Hospitality Technologies.</p>
</div>
</body>
</html>
`;

const introductionHtml = `
<div class="page-break"></div>
<h2>Introduction</h2>
<ul>
  <li>The Hotel Management System is an intelligent application designed to help users manage hotel operations efficiently. It streamlines areas such as room bookings, billing, housekeeping, and staff management.</li>
  <li>The system uses modern web technologies to handle reservations, track room statuses, and provide a seamless experience for both guests and hotel staff. It ensures smooth day-to-day operations and improves decision-making.</li>
</ul>
`;

// Assemble the entire document to exactly match the reference PDF structure
const fullDocument = [
  headAndStyles,
  coverPage,
  introductionHtml,
  '<div class="page-break"></div><h2>Database Schema</h2><p style="text-align:center;">(Database Schema Diagram goes here)</p>',
  erDiagramHtml.replace('<h2>10. Entity Relationship (ER) Diagram</h2>', '<h2>ER- Diagram</h2>'),
  '<div class="page-break"></div><h2>UML Diagrams:-</h2>',
  useCaseDiagramHtml.replace('<h2>3. Use Case Diagram</h2>', '<h3>1. Use Case Diagram</h3>').replace('<div class="page-break"></div>', ''),
  classDiagramHtml.replace('<h2>1. Class Diagram (UML Class Model)</h2>', '<h3>2. Class Diagram</h3>').replace('<div class="page-break"></div>', '<div class="page-break"></div>\n'),
  activityDiagramHtml.replace('<h2>7. Activity Diagram</h2>', '<h3>3. Activity Diagram</h3>').replace('<div class="page-break"></div>', '<div class="page-break"></div>\n'),
  sequenceDiagramHtml.replace('<h2>4. Sequence Diagram</h2>', '<h3>4. Sequence Diagram</h3>').replace('<div class="page-break"></div>', '<div class="page-break"></div>\n'),
  deploymentDiagramHtml.replace('<h2>9. Deployment Diagram</h2>', '<h3>5. Deployment Diagram</h3>').replace('<div class="page-break"></div>', '<div class="page-break"></div>\n'),
  documentFooterHtml
].join('\n');

const outputPath = path.join(__dirname, '..', '..', 'Hotel_Management_System_Documentation.doc');
const outputHtmlPath = path.join(__dirname, '..', '..', 'Hotel_Management_System_Documentation.html');
fs.writeFileSync(outputPath, fullDocument, 'utf8');
fs.writeFileSync(outputHtmlPath, fullDocument, 'utf8');

console.log('Successfully generated complete Hotel_Management_System_Documentation.doc & html!');
console.log('File size in bytes:', Buffer.byteLength(fullDocument, 'utf8'));
console.log('File path:', outputPath);
