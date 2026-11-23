// scripts/doc_generator/diagrams_part2.cjs

// Section 6: State Diagram
const stateDiagramHtml = `
<div class="page-break"></div>
<h2 id="sec-6">6. State Diagram (Statecharts)</h2>
<p>
  State Machine Diagrams model the dynamic life cycle of the two core operational entities within LuxeStay: 
  <strong>Booking</strong> and <strong>Room</strong>. They define finite states, transitional trigger events, 
  guard conditions, and final termination states.
</p>

<h3>6.1 Booking Lifecycle Statechart</h3>
<div class="diagram-container">
  <div class="diagram-title-banner">FIGURE 6.1: Booking Lifecycle State Diagram</div>
  <svg viewBox="0 0 1060 420" width="100%" height="320" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:'Segoe UI', Calibri, sans-serif;">
    <defs>
      <marker id="smArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e1b4b" />
      </marker>
    </defs>

    <!-- INITIAL STATE -->
    <circle cx="50" cy="140" r="14" fill="#1e1b4b"/>
    <text x="50" y="175" font-size="9.5" font-weight="bold" fill="#1e1b4b" text-anchor="middle">Start</text>

    <!-- STATE: PENDING -->
    <rect x="130" y="115" width="130" height="50" rx="10" fill="#fefce8" stroke="#ca8a04" stroke-width="2"/>
    <text x="195" y="145" font-weight="bold" font-size="11" fill="#713f12" text-anchor="middle">PENDING</text>

    <!-- STATE: CONFIRMED -->
    <rect x="360" y="115" width="140" height="50" rx="10" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
    <text x="430" y="145" font-weight="bold" font-size="11" fill="#312e81" text-anchor="middle">CONFIRMED</text>

    <!-- STATE: CHECKED_IN -->
    <rect x="610" y="115" width="140" height="50" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
    <text x="680" y="145" font-weight="bold" font-size="11" fill="#14532d" text-anchor="middle">CHECKED_IN</text>

    <!-- STATE: CHECKED_OUT -->
    <rect x="850" y="115" width="140" height="50" rx="10" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
    <text x="920" y="145" font-weight="bold" font-size="11" fill="#0f172a" text-anchor="middle">CHECKED_OUT</text>

    <!-- FINAL STATE -->
    <circle cx="1025" cy="140" r="14" fill="#ffffff" stroke="#1e1b4b" stroke-width="2"/>
    <circle cx="1025" cy="140" r="8" fill="#1e1b4b"/>

    <!-- STATE: CANCELLED -->
    <rect x="360" y="280" width="140" height="50" rx="10" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
    <text x="430" y="310" font-weight="bold" font-size="11" fill="#991b1b" text-anchor="middle">CANCELLED</text>

    <!-- STATE: NO_SHOW -->
    <rect x="610" y="280" width="140" height="50" rx="10" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>
    <text x="680" y="310" font-weight="bold" font-size="11" fill="#9a3412" text-anchor="middle">NO_SHOW</text>

    <!-- TRANSITIONS -->
    <!-- Start -> PENDING -->
    <line x1="64" y1="140" x2="130" y2="140" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#smArrow)"/>
    <text x="97" y="132" font-size="8.5" fill="#475569" text-anchor="middle">Request</text>

    <!-- PENDING -> CONFIRMED -->
    <line x1="260" y1="140" x2="360" y2="140" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#smArrow)"/>
    <text x="310" y="132" font-size="8.5" fill="#475569" text-anchor="middle">[Advance Paid]</text>

    <!-- CONFIRMED -> CHECKED_IN -->
    <line x1="500" y1="140" x2="610" y2="140" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#smArrow)"/>
    <text x="555" y="132" font-size="8.5" fill="#475569" text-anchor="middle">Guest Arrives</text>

    <!-- CHECKED_IN -> CHECKED_OUT -->
    <line x1="750" y1="140" x2="850" y2="140" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#smArrow)"/>
    <text x="800" y="132" font-size="8.5" fill="#475569" text-anchor="middle">Bill Settled</text>

    <!-- CHECKED_OUT -> Final -->
    <line x1="990" y1="140" x2="1011" y2="140" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#smArrow)"/>

    <!-- PENDING -> CANCELLED -->
    <path d="M 195 165 L 195 305 L 360 305" fill="none" stroke="#dc2626" stroke-width="1.5" marker-end="url(#smArrow)"/>
    <text x="270" y="320" font-size="8.5" fill="#dc2626">Expired / Cancelled</text>

    <!-- CONFIRMED -> CANCELLED -->
    <line x1="430" y1="165" x2="430" y2="280" stroke="#dc2626" stroke-width="1.5" marker-end="url(#smArrow)"/>
    <text x="440" y="225" font-size="8.5" fill="#dc2626">Cancellation</text>

    <!-- CONFIRMED -> NO_SHOW -->
    <line x1="490" y1="165" x2="620" y2="280" stroke="#ea580c" stroke-width="1.5" marker-end="url(#smArrow)"/>
    <text x="575" y="225" font-size="8.5" fill="#ea580c">Late Arrival Expired</text>
  </svg>
</div>

<h3>6.2 Room Status Operational Statechart</h3>
<div class="diagram-container">
  <div class="diagram-title-banner">FIGURE 6.2: Room Status Operational State Diagram</div>
  <svg viewBox="0 0 1060 420" width="100%" height="320" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:'Segoe UI', Calibri, sans-serif;">
    <!-- AVAILABLE -->
    <rect x="70" y="115" width="140" height="50" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2.5"/>
    <text x="140" y="145" font-weight="bold" font-size="11.5" fill="#14532d" text-anchor="middle">AVAILABLE</text>

    <!-- RESERVED -->
    <rect x="360" y="50" width="140" height="50" rx="10" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
    <text x="430" y="80" font-weight="bold" font-size="11" fill="#312e81" text-anchor="middle">RESERVED</text>

    <!-- OCCUPIED -->
    <rect x="670" y="115" width="140" height="50" rx="10" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>
    <text x="740" y="145" font-weight="bold" font-size="11.5" fill="#991b1b" text-anchor="middle">OCCUPIED</text>

    <!-- CLEANING -->
    <rect x="360" y="210" width="140" height="50" rx="10" fill="#fefce8" stroke="#ca8a04" stroke-width="2"/>
    <text x="430" y="240" font-weight="bold" font-size="11" fill="#713f12" text-anchor="middle">CLEANING</text>

    <!-- MAINTENANCE -->
    <rect x="70" y="320" width="140" height="50" rx="10" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>
    <text x="140" y="350" font-weight="bold" font-size="11" fill="#9a3412" text-anchor="middle">MAINTENANCE</text>

    <!-- OUT_OF_SERVICE -->
    <rect x="360" y="320" width="140" height="50" rx="10" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
    <text x="430" y="350" font-weight="bold" font-size="11" fill="#0f172a" text-anchor="middle">OUT_OF_SERVICE</text>

    <!-- TRANSITIONS -->
    <!-- AVAILABLE -> RESERVED -->
    <path d="M 200 115 Q 280 75 360 75" fill="none" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#smArrow)"/>
    <text x="270" y="70" font-size="8.5" fill="#475569">Booking Confirmed</text>

    <!-- RESERVED -> OCCUPIED -->
    <path d="M 500 75 Q 580 75 670 115" fill="none" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#smArrow)"/>
    <text x="590" y="70" font-size="8.5" fill="#475569">Check-In</text>

    <!-- AVAILABLE -> OCCUPIED (Walk-in) -->
    <line x1="210" y1="140" x2="670" y2="140" stroke="#1e1b4b" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#smArrow)"/>
    <text x="430" y="132" font-size="8.5" fill="#475569" text-anchor="middle">Walk-In Immediate Check-In</text>

    <!-- OCCUPIED -> CLEANING -->
    <path d="M 680 165 Q 580 235 500 235" fill="none" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#smArrow)"/>
    <text x="600" y="215" font-size="8.5" fill="#475569">Check-Out</text>

    <!-- CLEANING -> AVAILABLE -->
    <path d="M 360 235 Q 260 235 190 165" fill="none" stroke="#16a34a" stroke-width="1.5" marker-end="url(#smArrow)"/>
    <text x="220" y="215" font-size="8.5" fill="#16a34a">Inspected &amp; Cleaned</text>

    <!-- AVAILABLE <-> MAINTENANCE -->
    <line x1="120" y1="165" x2="120" y2="320" stroke="#ea580c" stroke-width="1.5" marker-end="url(#smArrow)"/>
    <text x="50" y="240" font-size="8.5" fill="#ea580c">Defect Reported</text>

    <line x1="160" y1="320" x2="160" y2="165" stroke="#16a34a" stroke-width="1.5" marker-end="url(#smArrow)"/>
    <text x="170" y="240" font-size="8.5" fill="#16a34a">Repaired</text>
  </svg>
  <div class="diagram-caption">Room operational lifecycle showing transitions from booking to housekeeping handover.</div>
</div>
`;

// Section 7: Activity Diagram
const activityDiagramHtml = `
<div class="page-break"></div>
<h2 id="sec-7">7. Activity Diagram</h2>
<p>
  The Activity Diagram captures the end-to-end operational workflow of a guest stay at LuxeStay. 
  It partitions activities across four primary swimlanes: <strong>Guest</strong>, <strong>Front Desk (Reception)</strong>, 
  <strong>Billing &amp; Management Core</strong>, and <strong>Housekeeping &amp; Operations</strong>.
</p>

<div class="diagram-container">
  <div class="diagram-title-banner">FIGURE 7.1: Comprehensive Guest Stay Activity Workflow</div>
  <svg viewBox="0 0 1060 840" width="100%" height="680" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:'Segoe UI', Calibri, sans-serif;">
    <defs>
      <marker id="actArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#312e81" />
      </marker>
    </defs>

    <!-- SWIMLANES -->
    <!-- Lane 1: Guest -->
    <rect x="20" y="20" width="240" height="790" fill="#ffffff" stroke="#cbd5e1"/>
    <rect x="20" y="20" width="240" height="30" fill="#312e81"/>
    <text x="140" y="40" fill="#ffffff" font-weight="bold" font-size="11.5" text-anchor="middle">Guest</text>

    <!-- Lane 2: Receptionist -->
    <rect x="260" y="20" width="260" height="790" fill="#ffffff" stroke="#cbd5e1"/>
    <rect x="260" y="20" width="260" height="30" fill="#4338ca"/>
    <text x="390" y="40" fill="#ffffff" font-weight="bold" font-size="11.5" text-anchor="middle">Front Desk Reception</text>

    <!-- Lane 3: System Core -->
    <rect x="520" y="20" width="280" height="790" fill="#ffffff" stroke="#cbd5e1"/>
    <rect x="520" y="20" width="280" height="30" fill="#312e81"/>
    <text x="660" y="40" fill="#ffffff" font-weight="bold" font-size="11.5" text-anchor="middle">Core Engine &amp; Billing</text>

    <!-- Lane 4: Housekeeping -->
    <rect x="800" y="20" width="240" height="790" fill="#ffffff" stroke="#cbd5e1"/>
    <rect x="800" y="20" width="240" height="30" fill="#16a34a"/>
    <text x="920" y="40" fill="#ffffff" font-weight="bold" font-size="11.5" text-anchor="middle">Housekeeping</text>

    <!-- START NODE -->
    <circle cx="140" cy="80" r="12" fill="#1e1b4b"/>
    <line x1="140" y1="92" x2="140" y2="120" stroke="#312e81" stroke-width="1.5" marker-end="url(#actArrow)"/>

    <!-- ACT 1: Guest Inquires / Arrives -->
    <rect x="60" y="120" width="160" height="42" rx="8" fill="#e0e7ff" stroke="#4338ca" stroke-width="1.5"/>
    <text x="140" y="145" font-size="10" font-weight="600" fill="#1e1b4b" text-anchor="middle">Request Room / Reservation</text>

    <line x1="220" y1="141" x2="310" y2="141" stroke="#312e81" stroke-width="1.5" marker-end="url(#actArrow)"/>

    <!-- ACT 2: Front Desk Verifies Guest -->
    <rect x="310" y="120" width="160" height="42" rx="8" fill="#e0e7ff" stroke="#4338ca" stroke-width="1.5"/>
    <text x="390" y="145" font-size="10" font-weight="600" fill="#1e1b4b" text-anchor="middle">Verify / Register Guest</text>

    <line x1="390" y1="162" x2="390" y2="195" stroke="#312e81" stroke-width="1.5" marker-end="url(#actArrow)"/>

    <!-- DECISION 1: Room Available? -->
    <polygon points="390,195 430,225 390,255 350,225" fill="#fefce8" stroke="#ca8a04" stroke-width="1.5"/>
    <text x="390" y="229" font-size="8.5" font-weight="bold" fill="#713f12" text-anchor="middle">Available?</text>

    <!-- Decision No -> Suggest Alternate -->
    <line x1="350" y1="225" x2="140" y2="225" stroke="#dc2626" stroke-width="1.5"/>
    <line x1="140" y1="225" x2="140" y2="162" stroke="#dc2626" stroke-width="1.5" marker-end="url(#actArrow)"/>
    <text x="240" y="218" font-size="8.5" fill="#dc2626">[No: Upgrade / Alt]</text>

    <!-- Decision Yes -> Check-in Engine -->
    <line x1="430" y1="225" x2="570" y2="225" stroke="#16a34a" stroke-width="1.5" marker-end="url(#actArrow)"/>
    <text x="480" y="218" font-size="8.5" fill="#16a34a">[Yes]</text>

    <!-- ACT 3: Lock Room & Create Booking -->
    <rect x="570" y="204" width="180" height="42" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
    <text x="660" y="229" font-size="10" font-weight="600" fill="#14532d" text-anchor="middle">Create Booking (CHECKED_IN)</text>

    <line x1="660" y1="246" x2="660" y2="280" stroke="#312e81" stroke-width="1.5" marker-end="url(#actArrow)"/>

    <!-- ACT 4: Issue Keycard & Welcome -->
    <rect x="310" y="280" width="160" height="42" rx="8" fill="#e0e7ff" stroke="#4338ca" stroke-width="1.5"/>
    <text x="390" y="305" font-size="10" font-weight="600" fill="#1e1b4b" text-anchor="middle">Issue Keycard &amp; Welcome</text>

    <line x1="570" y1="301" x2="470" y2="301" stroke="#312e81" stroke-width="1.5" marker-end="url(#actArrow)"/>
    <line x1="310" y1="301" x2="140" y2="301" stroke="#312e81" stroke-width="1.5" marker-end="url(#actArrow)"/>

    <!-- FORK BAR: In-Stay Services -->
    <rect x="60" y="360" width="690" height="6" rx="3" fill="#1e1b4b"/>

    <line x1="140" y1="301" x2="140" y2="360" stroke="#312e81" stroke-width="1.5"/>

    <!-- FORK 1: Enjoy Stay -->
    <line x1="140" y1="366" x2="140" y2="400" stroke="#312e81" stroke-width="1.5" marker-end="url(#actArrow)"/>
    <rect x="60" y="400" width="160" height="42" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="140" y="425" font-size="10" font-weight="600" fill="#1e1b4b" text-anchor="middle">Stay at Hotel</text>

    <!-- FORK 2: Restaurant / Services -->
    <line x1="660" y1="366" x2="660" y2="400" stroke="#312e81" stroke-width="1.5" marker-end="url(#actArrow)"/>
    <rect x="570" y="400" width="180" height="42" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="660" y="425" font-size="10" font-weight="600" fill="#1e1b4b" text-anchor="middle">Accumulate Folio Charges</text>

    <!-- JOIN BAR -->
    <rect x="60" y="480" width="690" height="6" rx="3" fill="#1e1b4b"/>
    <line x1="140" y1="442" x2="140" y2="480" stroke="#312e81" stroke-width="1.5"/>
    <line x1="660" y1="442" x2="660" y2="480" stroke="#312e81" stroke-width="1.5"/>

    <!-- ACT 5: Checkout Request -->
    <line x1="140" y1="486" x2="140" y2="520" stroke="#312e81" stroke-width="1.5" marker-end="url(#actArrow)"/>
    <rect x="60" y="520" width="160" height="42" rx="8" fill="#e0e7ff" stroke="#4338ca" stroke-width="1.5"/>
    <text x="140" y="545" font-size="10" font-weight="600" fill="#1e1b4b" text-anchor="middle">Initiate Checkout</text>

    <line x1="220" y1="541" x2="570" y2="541" stroke="#312e81" stroke-width="1.5" marker-end="url(#actArrow)"/>

    <!-- ACT 6: Generate Invoice & Calculate Total -->
    <rect x="570" y="520" width="180" height="42" rx="8" fill="#fefce8" stroke="#ca8a04" stroke-width="1.5"/>
    <text x="660" y="545" font-size="10" font-weight="600" fill="#713f12" text-anchor="middle">Generate Tax Invoice (GST 18%)</text>

    <line x1="660" y1="562" x2="660" y2="600" stroke="#312e81" stroke-width="1.5" marker-end="url(#actArrow)"/>

    <!-- ACT 7: Settle Payment -->
    <rect x="570" y="600" width="180" height="42" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
    <text x="660" y="625" font-size="10" font-weight="600" fill="#14532d" text-anchor="middle">Capture Final Payment</text>

    <line x1="660" y1="642" x2="660" y2="680" stroke="#312e81" stroke-width="1.5" marker-end="url(#actArrow)"/>

    <!-- ACT 8: Update Room to CLEANING -->
    <rect x="570" y="680" width="180" height="42" rx="8" fill="#e0e7ff" stroke="#4338ca" stroke-width="1.5"/>
    <text x="660" y="705" font-size="10" font-weight="600" fill="#1e1b4b" text-anchor="middle">Set Room = CLEANING</text>

    <line x1="750" y1="701" x2="840" y2="701" stroke="#16a34a" stroke-width="1.5" marker-end="url(#actArrow)"/>

    <!-- ACT 9: Dispatch Housekeeper -->
    <rect x="840" y="680" width="160" height="42" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
    <text x="920" y="705" font-size="10" font-weight="600" fill="#14532d" text-anchor="middle">Clean &amp; Inspect Room</text>

    <!-- END NODE -->
    <line x1="920" y1="722" x2="920" y2="760" stroke="#16a34a" stroke-width="1.5" marker-end="url(#actArrow)"/>
    <circle cx="920" cy="775" r="14" fill="#ffffff" stroke="#1e1b4b" stroke-width="2"/>
    <circle cx="920" cy="775" r="8" fill="#1e1b4b"/>
  </svg>
  <div class="diagram-caption">Complete activity diagram with swimlanes depicting end-to-end guest journey and staff collaboration.</div>
</div>
`;

// Section 8: Component Diagram
const componentDiagramHtml = `
<div class="page-break"></div>
<h2 id="sec-8">8. Component Diagram</h2>
<p>
  The Component Diagram depicts the high-level structural modularity of the LuxeStay system. 
  It illustrates modular boundaries, provided and required interfaces, and runtime dependencies across 
  the Client, API Gateway, Application Controllers, ORM, and Persistent Database layers.
</p>

<div class="diagram-container">
  <div class="diagram-title-banner">FIGURE 8.1: System Component Architecture Diagram</div>
  <svg viewBox="0 0 1060 620" width="100%" height="480" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:'Segoe UI', Calibri, sans-serif;">
    <defs>
      <filter id="compShadow" x="-3%" y="-3%" width="106%" height="108%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="#0f172a" flood-opacity="0.10" />
      </filter>
    </defs>

    <!-- PACKAGE: CLIENT TIER -->
    <rect x="30" y="30" width="270" height="550" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-dasharray="4,4"/>
    <text x="45" y="55" font-weight="bold" font-size="11.5" fill="#312e81">&lt;&lt;tier&gt;&gt; Presentation Tier (React 18 + Vite)</text>

    <!-- COMP: SPA App -->
    <g filter="url(#compShadow)" transform="translate(50, 75)">
      <rect width="230" height="75" rx="4" fill="#f8fafc" stroke="#4338ca" stroke-width="2"/>
      <rect x="-10" y="12" width="20" height="10" fill="#ffffff" stroke="#4338ca" stroke-width="1.5"/>
      <rect x="-10" y="32" width="20" height="10" fill="#ffffff" stroke="#4338ca" stroke-width="1.5"/>
      <text x="115" y="28" font-size="10.5" font-weight="bold" fill="#1e1b4b" text-anchor="middle">&lt;&lt;component&gt;&gt; AppShell &amp; Router</text>
      <text x="115" y="46" font-size="9" fill="#64748b" text-anchor="middle">React Router v6 | 17 Pages</text>
      <text x="115" y="60" font-size="9" fill="#4338ca" text-anchor="middle">Dark Glassmorphic UI</text>
    </g>

    <!-- COMP: AuthContext -->
    <g filter="url(#compShadow)" transform="translate(50, 185)">
      <rect width="230" height="75" rx="4" fill="#f8fafc" stroke="#4338ca" stroke-width="2"/>
      <rect x="-10" y="12" width="20" height="10" fill="#ffffff" stroke="#4338ca" stroke-width="1.5"/>
      <rect x="-10" y="32" width="20" height="10" fill="#ffffff" stroke="#4338ca" stroke-width="1.5"/>
      <text x="115" y="28" font-size="10.5" font-weight="bold" fill="#1e1b4b" text-anchor="middle">&lt;&lt;component&gt;&gt; AuthContext</text>
      <text x="115" y="46" font-size="9" fill="#64748b" text-anchor="middle">JWT Token Storage &amp; RBAC</text>
      <text x="115" y="60" font-size="9" fill="#4338ca" text-anchor="middle">Auto-refresh &amp; State Guard</text>
    </g>

    <!-- COMP: Axios Client -->
    <g filter="url(#compShadow)" transform="translate(50, 295)">
      <rect width="230" height="75" rx="4" fill="#f8fafc" stroke="#4338ca" stroke-width="2"/>
      <rect x="-10" y="12" width="20" height="10" fill="#ffffff" stroke="#4338ca" stroke-width="1.5"/>
      <rect x="-10" y="32" width="20" height="10" fill="#ffffff" stroke="#4338ca" stroke-width="1.5"/>
      <text x="115" y="28" font-size="10.5" font-weight="bold" fill="#1e1b4b" text-anchor="middle">&lt;&lt;component&gt;&gt; ApiService (Axios)</text>
      <text x="115" y="46" font-size="9" fill="#64748b" text-anchor="middle">HTTP Interceptors</text>
      <text x="115" y="60" font-size="9" fill="#4338ca" text-anchor="middle">Bearer Token Injection</text>
    </g>

    <!-- PACKAGE: BACKEND API TIER -->
    <rect x="360" y="30" width="350" height="550" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-dasharray="4,4"/>
    <text x="375" y="55" font-weight="bold" font-size="11.5" fill="#312e81">&lt;&lt;tier&gt;&gt; Application API Tier (Node.js + Express)</text>

    <!-- COMP: Express Gateway & Middleware -->
    <g filter="url(#compShadow)" transform="translate(380, 75)">
      <rect width="310" height="85" rx="4" fill="#f8fafc" stroke="#312e81" stroke-width="2"/>
      <rect x="-10" y="15" width="20" height="12" fill="#ffffff" stroke="#312e81" stroke-width="1.5"/>
      <rect x="-10" y="40" width="20" height="12" fill="#ffffff" stroke="#312e81" stroke-width="1.5"/>
      <text x="155" y="28" font-size="10.5" font-weight="bold" fill="#1e1b4b" text-anchor="middle">&lt;&lt;component&gt;&gt; Express Gateway</text>
      <text x="155" y="48" font-size="9" fill="#64748b" text-anchor="middle">CORS | Morgan | RateLimiter</text>
      <text x="155" y="64" font-size="9" fill="#4338ca" text-anchor="middle">JWT Auth Guard &amp; Role Gatekeeper</text>
    </g>

    <!-- COMP: Core Domain Controllers -->
    <g filter="url(#compShadow)" transform="translate(380, 200)">
      <rect width="310" height="160" rx="4" fill="#f8fafc" stroke="#312e81" stroke-width="2"/>
      <rect x="-10" y="25" width="20" height="14" fill="#ffffff" stroke="#312e81" stroke-width="1.5"/>
      <rect x="-10" y="70" width="20" height="14" fill="#ffffff" stroke="#312e81" stroke-width="1.5"/>
      <text x="155" y="28" font-size="10.5" font-weight="bold" fill="#1e1b4b" text-anchor="middle">&lt;&lt;component&gt;&gt; Domain Controllers (15)</text>
      <text x="15" y="52" font-size="9" fill="#1e293b">&bull; AuthController &amp; UserController</text>
      <text x="15" y="68" font-size="9" fill="#1e293b">&bull; BookingController &amp; RoomController</text>
      <text x="15" y="84" font-size="9" fill="#1e293b">&bull; BillingController &amp; ExpenseController</text>
      <text x="15" y="100" font-size="9" fill="#1e293b">&bull; HousekeepingController &amp; Maintenance</text>
      <text x="15" y="116" font-size="9" fill="#1e293b">&bull; RestaurantController &amp; InventoryController</text>
      <text x="15" y="132" font-size="9" fill="#1e293b">&bull; Reports &amp; Analytics Aggregator</text>
    </g>

    <!-- COMP: Notification Service -->
    <g filter="url(#compShadow)" transform="translate(380, 400)">
      <rect width="310" height="70" rx="4" fill="#f8fafc" stroke="#312e81" stroke-width="2"/>
      <rect x="-10" y="12" width="20" height="10" fill="#ffffff" stroke="#312e81" stroke-width="1.5"/>
      <rect x="-10" y="32" width="20" height="10" fill="#ffffff" stroke="#312e81" stroke-width="1.5"/>
      <text x="155" y="28" font-size="10.5" font-weight="bold" fill="#1e1b4b" text-anchor="middle">&lt;&lt;component&gt;&gt; Notification &amp; Audit Service</text>
      <text x="155" y="46" font-size="9" fill="#64748b" text-anchor="middle">In-App Alerts | Audit Trails</text>
    </g>

    <!-- PACKAGE: DATA & ORM TIER -->
    <rect x="760" y="30" width="270" height="550" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-dasharray="4,4"/>
    <text x="775" y="55" font-weight="bold" font-size="11.5" fill="#16a34a">&lt;&lt;tier&gt;&gt; Data Tier (Prisma + PostgreSQL)</text>

    <!-- COMP: Prisma ORM -->
    <g filter="url(#compShadow)" transform="translate(780, 100)">
      <rect width="230" height="95" rx="4" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
      <rect x="-10" y="16" width="20" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
      <rect x="-10" y="45" width="20" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
      <text x="115" y="28" font-size="10.5" font-weight="bold" fill="#14532d" text-anchor="middle">&lt;&lt;component&gt;&gt; Prisma ORM Client</text>
      <text x="115" y="48" font-size="9" fill="#16a34a" text-anchor="middle">Type-safe Query Builder</text>
      <text x="115" y="64" font-size="9" fill="#14532d" text-anchor="middle">Interactive Transactions ($transaction)</text>
      <text x="115" y="80" font-size="9" fill="#14532d" text-anchor="middle">Connection Pooling Engine</text>
    </g>

    <!-- COMP: PostgreSQL Database -->
    <g filter="url(#compShadow)" transform="translate(780, 260)">
      <rect width="230" height="110" rx="4" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
      <rect x="-10" y="20" width="20" height="14" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
      <rect x="-10" y="55" width="20" height="14" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
      <text x="115" y="28" font-size="10.5" font-weight="bold" fill="#14532d" text-anchor="middle">&lt;&lt;component&gt;&gt; PostgreSQL 15 DB</text>
      <text x="115" y="48" font-size="9" fill="#16a34a" text-anchor="middle">25 Relational Tables</text>
      <text x="115" y="64" font-size="9" fill="#14532d" text-anchor="middle">Multi-Tenant Tenant UUID Keys</text>
      <text x="115" y="80" font-size="9" fill="#14532d" text-anchor="middle">B-Tree Indexes &amp; Foreign Keys</text>
      <text x="115" y="96" font-size="9" fill="#14532d" text-anchor="middle">ACID Transaction Isolation</text>
    </g>

    <!-- CONNECTORS -->
    <line x1="280" y1="330" x2="380" y2="120" stroke="#4338ca" stroke-width="1.5" marker-end="url(#compShadow)"/>
    <text x="310" y="210" font-size="9" fill="#4338ca">HTTPS / JSON</text>

    <line x1="535" y1="160" x2="535" y2="200" stroke="#312e81" stroke-width="1.5"/>

    <line x1="690" y1="280" x2="780" y2="150" stroke="#16a34a" stroke-width="1.5"/>
    <text x="715" y="200" font-size="9" fill="#16a34a">Prisma API</text>

    <line x1="895" y1="195" x2="895" y2="260" stroke="#16a34a" stroke-width="1.5"/>
    <text x="905" y="235" font-size="9" fill="#16a34a">TCP 5432</text>
  </svg>
  <div class="diagram-caption">Component model showing presentation, application, data access, and persistence modules.</div>
</div>
`;

// Section 9: Deployment Diagram
const deploymentDiagramHtml = `
<div class="page-break"></div>
<h2 id="sec-9">9. Deployment Diagram</h2>
<p>
  The Deployment Diagram specifies the physical and virtual deployment topology of LuxeStay. 
  It illustrates client hardware nodes, global CDN distribution, SSL-terminated application servers, 
  and managed high-availability PostgreSQL clusters in cloud environments.
</p>

<div class="diagram-container">
  <div class="diagram-title-banner">FIGURE 9.1: Physical &amp; Cloud Deployment Topology</div>
  <svg viewBox="0 0 1060 620" width="100%" height="480" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:'Segoe UI', Calibri, sans-serif;">
    <!-- NODE 1: CLIENT HARDWARE -->
    <g transform="translate(30, 80)">
      <!-- 3D Node Box -->
      <polygon points="0,20 180,20 200,0 20,0" fill="#e0e7ff" stroke="#312e81" stroke-width="1.5"/>
      <polygon points="180,20 200,0 200,320 180,340" fill="#c7d2fe" stroke="#312e81" stroke-width="1.5"/>
      <rect x="0" y="20" width="180" height="320" rx="2" fill="#f8fafc" stroke="#312e81" stroke-width="1.5"/>
      <text x="90" y="44" font-weight="bold" font-size="11" fill="#1e1b4b" text-anchor="middle">&lt;&lt;device&gt;&gt;</text>
      <text x="90" y="60" font-weight="bold" font-size="11" fill="#1e1b4b" text-anchor="middle">Client Terminal</text>

      <rect x="15" y="80" width="150" height="85" rx="4" fill="#ffffff" stroke="#4338ca" stroke-width="1.5"/>
      <text x="90" y="102" font-size="10" font-weight="bold" fill="#312e81" text-anchor="middle">&lt;&lt;execution env&gt;&gt;</text>
      <text x="90" y="118" font-size="9" fill="#1e293b" text-anchor="middle">Chrome / Edge / Safari</text>
      <text x="90" y="134" font-size="9" fill="#64748b" text-anchor="middle">Desktop / Tablet / POS</text>

      <rect x="15" y="180" width="150" height="90" rx="4" fill="#eef2ff" stroke="#4338ca" stroke-width="1.5"/>
      <text x="90" y="202" font-size="10" font-weight="bold" fill="#4338ca" text-anchor="middle">&lt;&lt;artifact&gt;&gt;</text>
      <text x="90" y="218" font-size="9" fill="#1e293b" text-anchor="middle">React 18 SPA Bundle</text>
      <text x="90" y="234" font-size="9" fill="#64748b" text-anchor="middle">HTML5 / CSS3 / ES2024</text>
      <text x="90" y="250" font-size="8.5" fill="#4338ca" text-anchor="middle">LocalStorage (Auth Token)</text>
    </g>

    <!-- NODE 2: CDN / EDGE -->
    <g transform="translate(290, 80)">
      <polygon points="0,20 180,20 200,0 20,0" fill="#e0e7ff" stroke="#312e81" stroke-width="1.5"/>
      <polygon points="180,20 200,0 200,320 180,340" fill="#c7d2fe" stroke="#312e81" stroke-width="1.5"/>
      <rect x="0" y="20" width="180" height="320" rx="2" fill="#f8fafc" stroke="#312e81" stroke-width="1.5"/>
      <text x="90" y="44" font-weight="bold" font-size="11" fill="#1e1b4b" text-anchor="middle">&lt;&lt;cloud edge&gt;&gt;</text>
      <text x="90" y="60" font-weight="bold" font-size="11" fill="#1e1b4b" text-anchor="middle">Vercel / Cloudflare CDN</text>

      <rect x="15" y="80" width="150" height="100" rx="4" fill="#ffffff" stroke="#4338ca" stroke-width="1.5"/>
      <text x="90" y="102" font-size="10" font-weight="bold" fill="#312e81" text-anchor="middle">&lt;&lt;infrastructure&gt;&gt;</text>
      <text x="90" y="118" font-size="9" fill="#1e293b" text-anchor="middle">Global Anycast Network</text>
      <text x="90" y="134" font-size="9" fill="#64748b" text-anchor="middle">Automatic SSL (TLS 1.3)</text>
      <text x="90" y="150" font-size="9" fill="#16a34a" text-anchor="middle">Gzip / Brotli Compression</text>
    </g>

    <!-- NODE 3: BACKEND SERVER CONTAINER -->
    <g transform="translate(540, 50)">
      <polygon points="0,20 220,20 240,0 20,0" fill="#e0e7ff" stroke="#312e81" stroke-width="1.5"/>
      <polygon points="220,20 240,0 240,360 220,380" fill="#c7d2fe" stroke="#312e81" stroke-width="1.5"/>
      <rect x="0" y="20" width="220" height="360" rx="2" fill="#f8fafc" stroke="#312e81" stroke-width="1.5"/>
      <text x="110" y="44" font-weight="bold" font-size="11" fill="#1e1b4b" text-anchor="middle">&lt;&lt;container&gt;&gt;</text>
      <text x="110" y="60" font-weight="bold" font-size="11" fill="#1e1b4b" text-anchor="middle">Ubuntu Linux / Docker</text>

      <rect x="15" y="80" width="190" height="110" rx="4" fill="#ffffff" stroke="#312e81" stroke-width="1.5"/>
      <text x="110" y="100" font-size="10" font-weight="bold" fill="#312e81" text-anchor="middle">&lt;&lt;runtime&gt;&gt;</text>
      <text x="110" y="116" font-size="9" fill="#1e293b" text-anchor="middle">Node.js v20+ LTS</text>
      <text x="110" y="132" font-size="9" fill="#4338ca" text-anchor="middle">Express REST Application</text>
      <text x="110" y="148" font-size="9" fill="#64748b" text-anchor="middle">PM2 Cluster (Port 5000)</text>
      <text x="110" y="164" font-size="8.5" fill="#16a34a" text-anchor="middle">Health Check /metrics</text>

      <rect x="15" y="210" width="190" height="85" rx="4" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
      <text x="110" y="230" font-size="10" font-weight="bold" fill="#14532d" text-anchor="middle">&lt;&lt;data adapter&gt;&gt;</text>
      <text x="110" y="246" font-size="9" fill="#14532d" text-anchor="middle">Prisma Engine binary</text>
      <text x="110" y="262" font-size="9" fill="#16a34a" text-anchor="middle">Connection Pooler (20 Conns)</text>
    </g>

    <!-- NODE 4: MANAGED DATABASE -->
    <g transform="translate(820, 80)">
      <polygon points="0,20 200,20 220,0 20,0" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
      <polygon points="200,20 220,0 220,320 200,340" fill="#bbf7d0" stroke="#16a34a" stroke-width="1.5"/>
      <rect x="0" y="20" width="200" height="320" rx="2" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
      <text x="100" y="44" font-weight="bold" font-size="11" fill="#14532d" text-anchor="middle">&lt;&lt;cloud database&gt;&gt;</text>
      <text x="100" y="60" font-weight="bold" font-size="11" fill="#14532d" text-anchor="middle">Managed PostgreSQL 15</text>

      <rect x="15" y="80" width="170" height="110" rx="4" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
      <text x="100" y="102" font-size="10" font-weight="bold" fill="#14532d" text-anchor="middle">&lt;&lt;database engine&gt;&gt;</text>
      <text x="100" y="118" font-size="9" fill="#14532d" text-anchor="middle">Supabase / Neon / RDS</text>
      <text x="100" y="134" font-size="9" fill="#16a34a" text-anchor="middle">25 Multi-Tenant Tables</text>
      <text x="100" y="150" font-size="9" fill="#64748b" text-anchor="middle">Point-In-Time Backups</text>
      <text x="100" y="166" font-size="8.5" fill="#14532d" text-anchor="middle">AES-256 Encryption at Rest</text>
    </g>

    <!-- NETWORK LINKS -->
    <!-- Client <-> CDN -->
    <line x1="200" y1="180" x2="290" y2="180" stroke="#312e81" stroke-width="2"/>
    <text x="245" y="170" font-size="8.5" font-weight="bold" fill="#312e81" text-anchor="middle">HTTPS / 443</text>

    <!-- Client <-> Server (API) -->
    <path d="M 180 280 Q 360 380 540 280" fill="none" stroke="#4338ca" stroke-width="2"/>
    <text x="360" y="365" font-size="8.5" font-weight="bold" fill="#4338ca" text-anchor="middle">HTTPS / TLS 1.3 (REST API)</text>

    <!-- Server <-> PostgreSQL -->
    <line x1="760" y1="220" x2="820" y2="220" stroke="#16a34a" stroke-width="2"/>
    <text x="790" y="210" font-size="8.5" font-weight="bold" fill="#14532d" text-anchor="middle">TCP 5432</text>
  </svg>
  <div class="diagram-caption">Physical nodes, execution environments, network protocols, and encryption boundaries.</div>
</div>
`;

// Section 10: ER Diagram
const erDiagramHtml = `
<div class="page-break"></div>
<h2 id="sec-10">10. Entity Relationship (ER) Diagram</h2>
<p>
  The ER Diagram illustrates the complete relational database schema for LuxeStay, depicting all primary entities, 
  primary keys (PK), foreign keys (FK), relationship connectors, and cardinality constraints. 
  Every entity is strictly partitioned by <code>hotelId</code> for enterprise multi-tenancy.
</p>

<div class="diagram-container">
  <div class="diagram-title-banner">FIGURE 10.1: Entity-Relationship Diagram (Relational Core)</div>
  <svg viewBox="0 0 1060 760" width="100%" height="560" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:'Segoe UI', Calibri, sans-serif;">
    <defs>
      <marker id="crowFoot" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M 0 0 L 10 6 L 0 12 M 10 0 L 10 12" fill="none" stroke="#312e81" stroke-width="1.5"/>
      </marker>
    </defs>

    <!-- ENTITY: HOTEL -->
    <g transform="translate(420, 20)">
      <rect width="220" height="130" rx="4" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="220" height="24" rx="4" fill="#312e81"/>
      <text x="110" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">HOTEL</text>
      <text x="10" y="40" font-size="9" font-weight="bold" fill="#dc2626">PK  id: UUID</text>
      <text x="10" y="54" font-size="9" fill="#1e293b">    name: VARCHAR(255)</text>
      <text x="10" y="68" font-size="9" fill="#1e293b">    taxRate: FLOAT (18%)</text>
      <text x="10" y="82" font-size="9" fill="#1e293b">    checkInTime, checkOutTime</text>
      <text x="10" y="96" font-size="9" fill="#1e293b">    currency: VARCHAR (INR)</text>
      <text x="10" y="110" font-size="9" fill="#64748b">    createdAt, updatedAt</text>
    </g>

    <!-- ENTITY: USER -->
    <g transform="translate(40, 50)">
      <rect width="210" height="130" rx="4" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="210" height="24" rx="4" fill="#312e81"/>
      <text x="105" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">USER</text>
      <text x="10" y="40" font-size="9" font-weight="bold" fill="#dc2626">PK  id: UUID</text>
      <text x="10" y="54" font-size="9" font-weight="bold" fill="#4338ca">FK  hotelId: UUID</text>
      <text x="10" y="68" font-size="9" fill="#1e293b">    email: VARCHAR [UQ]</text>
      <text x="10" y="82" font-size="9" fill="#1e293b">    password: VARCHAR</text>
      <text x="10" y="96" font-size="9" fill="#1e293b">    role: Role [Enum]</text>
      <text x="10" y="110" font-size="9" fill="#1e293b">    isActive: BOOLEAN</text>
    </g>

    <!-- ENTITY: GUEST -->
    <g transform="translate(800, 50)">
      <rect width="210" height="130" rx="4" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="210" height="24" rx="4" fill="#312e81"/>
      <text x="105" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">GUEST</text>
      <text x="10" y="40" font-size="9" font-weight="bold" fill="#dc2626">PK  id: UUID</text>
      <text x="10" y="54" font-size="9" font-weight="bold" fill="#4338ca">FK  hotelId: UUID</text>
      <text x="10" y="68" font-size="9" fill="#1e293b">    firstName, lastName</text>
      <text x="10" y="82" font-size="9" fill="#1e293b">    email, phone: VARCHAR</text>
      <text x="10" y="96" font-size="9" fill="#1e293b">    idType, idNumber: VARCHAR</text>
      <text x="10" y="110" font-size="9" fill="#64748b">    createdAt, updatedAt</text>
    </g>

    <!-- ENTITY: ROOM_TYPE -->
    <g transform="translate(40, 240)">
      <rect width="210" height="120" rx="4" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="210" height="24" rx="4" fill="#312e81"/>
      <text x="105" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">ROOM_TYPE</text>
      <text x="10" y="40" font-size="9" font-weight="bold" fill="#dc2626">PK  id: UUID</text>
      <text x="10" y="54" font-size="9" font-weight="bold" fill="#4338ca">FK  hotelId: UUID</text>
      <text x="10" y="68" font-size="9" fill="#1e293b">    name: VARCHAR</text>
      <text x="10" y="82" font-size="9" fill="#1e293b">    basePrice: FLOAT</text>
      <text x="10" y="96" font-size="9" fill="#1e293b">    capacity, beds: INT</text>
    </g>

    <!-- ENTITY: ROOM -->
    <g transform="translate(40, 420)">
      <rect width="210" height="135" rx="4" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="210" height="24" rx="4" fill="#312e81"/>
      <text x="105" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">ROOM</text>
      <text x="10" y="40" font-size="9" font-weight="bold" fill="#dc2626">PK  id: UUID</text>
      <text x="10" y="54" font-size="9" font-weight="bold" fill="#4338ca">FK  hotelId: UUID</text>
      <text x="10" y="68" font-size="9" font-weight="bold" fill="#4338ca">FK  roomTypeId: UUID</text>
      <text x="10" y="82" font-size="9" fill="#1e293b">    number: VARCHAR</text>
      <text x="10" y="96" font-size="9" fill="#1e293b">    floor: INT</text>
      <text x="10" y="110" font-size="9" fill="#1e293b">    status: RoomStatus</text>
    </g>

    <!-- ENTITY: BOOKING (CENTRAL) -->
    <g transform="translate(420, 220)">
      <rect width="230" height="185" rx="4" fill="#fdf4ff" stroke="#a855f7" stroke-width="2.5"/>
      <rect width="230" height="24" rx="4" fill="#a855f7"/>
      <text x="115" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">BOOKING</text>
      <text x="10" y="40" font-size="9" font-weight="bold" fill="#dc2626">PK  id: UUID</text>
      <text x="10" y="54" font-size="9" font-weight="bold" fill="#4338ca">FK  hotelId: UUID</text>
      <text x="10" y="68" font-size="9" font-weight="bold" fill="#4338ca">FK  guestId: UUID</text>
      <text x="10" y="82" font-size="9" font-weight="bold" fill="#4338ca">FK  roomId: UUID</text>
      <text x="10" y="96" font-size="9" font-weight="bold" fill="#4338ca">FK  createdById: UUID</text>
      <text x="10" y="110" font-size="9" fill="#1e293b">    bookingNumber: VARCHAR [UQ]</text>
      <text x="10" y="124" font-size="9" fill="#1e293b">    checkInDate, checkOutDate</text>
      <text x="10" y="138" font-size="9" fill="#1e293b">    totalAmount, paidAmount: FLOAT</text>
      <text x="10" y="152" font-size="9" fill="#1e293b">    status: BookingStatus</text>
      <text x="10" y="166" font-size="9" fill="#1e293b">    source: BookingSource</text>
    </g>

    <!-- ENTITY: PAYMENT -->
    <g transform="translate(420, 480)">
      <rect width="220" height="135" rx="4" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="220" height="24" rx="4" fill="#312e81"/>
      <text x="110" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">PAYMENT</text>
      <text x="10" y="40" font-size="9" font-weight="bold" fill="#dc2626">PK  id: UUID</text>
      <text x="10" y="54" font-size="9" font-weight="bold" fill="#4338ca">FK  bookingId: UUID</text>
      <text x="10" y="68" font-size="9" font-weight="bold" fill="#4338ca">FK  guestId: UUID</text>
      <text x="10" y="82" font-size="9" font-weight="bold" fill="#4338ca">FK  collectedById: UUID</text>
      <text x="10" y="96" font-size="9" fill="#1e293b">    amount: FLOAT</text>
      <text x="10" y="110" font-size="9" fill="#1e293b">    method: PaymentMethod</text>
      <text x="10" y="124" font-size="9" fill="#1e293b">    status: PaymentStatus</text>
    </g>

    <!-- ENTITY: INVOICE -->
    <g transform="translate(800, 240)">
      <rect width="210" height="130" rx="4" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="210" height="24" rx="4" fill="#312e81"/>
      <text x="105" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">INVOICE</text>
      <text x="10" y="40" font-size="9" font-weight="bold" fill="#dc2626">PK  id: UUID</text>
      <text x="10" y="54" font-size="9" font-weight="bold" fill="#4338ca">FK  bookingId: UUID</text>
      <text x="10" y="68" font-size="9" fill="#1e293b">    invoiceNumber: VARCHAR [UQ]</text>
      <text x="10" y="82" font-size="9" fill="#1e293b">    subtotal, taxAmount: FLOAT</text>
      <text x="10" y="96" font-size="9" fill="#1e293b">    totalAmount: FLOAT</text>
      <text x="10" y="110" font-size="9" fill="#1e293b">    status: InvoiceStatus</text>
    </g>

    <!-- ENTITY: INVOICE_ITEM -->
    <g transform="translate(800, 440)">
      <rect width="210" height="115" rx="4" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="210" height="24" rx="4" fill="#312e81"/>
      <text x="105" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">INVOICE_ITEM</text>
      <text x="10" y="40" font-size="9" font-weight="bold" fill="#dc2626">PK  id: UUID</text>
      <text x="10" y="54" font-size="9" font-weight="bold" fill="#4338ca">FK  invoiceId: UUID (Cascade)</text>
      <text x="10" y="68" font-size="9" fill="#1e293b">    description: VARCHAR</text>
      <text x="10" y="82" font-size="9" fill="#1e293b">    quantity: INT, unitPrice: FLOAT</text>
      <text x="10" y="96" font-size="9" fill="#1e293b">    amount: FLOAT</text>
    </g>

    <!-- RELATIONSHIP CONNECTORS (CROW FOOT) -->
    <!-- Hotel -> RoomType -->
    <line x1="420" y1="120" x2="250" y2="250" stroke="#312e81" stroke-width="1.5" marker-end="url(#crowFoot)"/>

    <!-- RoomType -> Room -->
    <line x1="145" y1="360" x2="145" y2="420" stroke="#312e81" stroke-width="1.5" marker-end="url(#crowFoot)"/>

    <!-- Guest -> Booking -->
    <line x1="800" y1="150" x2="650" y2="250" stroke="#312e81" stroke-width="1.5" marker-end="url(#crowFoot)"/>

    <!-- Room -> Booking -->
    <line x1="250" y1="460" x2="420" y2="350" stroke="#312e81" stroke-width="1.5" marker-end="url(#crowFoot)"/>

    <!-- Booking -> Payment -->
    <line x1="530" y1="405" x2="530" y2="480" stroke="#312e81" stroke-width="1.5" marker-end="url(#crowFoot)"/>

    <!-- Booking -> Invoice -->
    <line x1="650" y1="310" x2="800" y2="310" stroke="#312e81" stroke-width="1.5" marker-end="url(#crowFoot)"/>

    <!-- Invoice -> InvoiceItem -->
    <line x1="905" y1="370" x2="905" y2="440" stroke="#312e81" stroke-width="1.5" marker-end="url(#crowFoot)"/>
  </svg>
  <div class="diagram-caption">Relational Entity-Relationship Diagram depicting core entities, PKs, FKs, and cascade bindings.</div>
</div>
`;

// Section 13: Architecture Overview
const architectureOverviewHtml = `
<div class="page-break"></div>
<h2 id="sec-13">13. Architecture Overview</h2>
<p>
  LuxeStay is engineered according to the <strong>4-Tier Clean Layered Architecture</strong>. 
  This architectural paradigm guarantees strict separation of concerns, loose coupling, deterministic testability, 
  and independent scalability across the presentation, application, data access, and database tiers.
</p>

<div class="diagram-container">
  <div class="diagram-title-banner">FIGURE 13.1: 4-Tier Enterprise Architecture Blueprint</div>
  <svg viewBox="0 0 1060 620" width="100%" height="480" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:'Segoe UI', Calibri, sans-serif;">
    <!-- TIER 1: PRESENTATION -->
    <g transform="translate(40, 20)">
      <rect width="980" height="95" rx="6" fill="#eef2ff" stroke="#4338ca" stroke-width="2"/>
      <rect width="980" height="24" rx="6" fill="#4338ca"/>
      <text x="490" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">TIER 1: PRESENTATION LAYER (React 18 SPA + Vite)</text>
      <text x="20" y="44" font-size="9" fill="#1e1b4b">&bull; <strong>Pages:</strong> Dashboard, Bookings, Rooms, FrontDesk, Billing, Housekeeping, Restaurant, Inventory, Expenses, Reports, Settings</text>
      <text x="20" y="60" font-size="9" fill="#1e1b4b">&bull; <strong>Shared Components:</strong> Sidebar (Collapsible), Header (Glassmorphic), DataTables (Sorting &amp; Pagination), Modals, Stat Cards</text>
      <text x="20" y="76" font-size="9" fill="#1e1b4b">&bull; <strong>Design &amp; Libraries:</strong> Vanilla CSS Custom Tokens (#09090b Dark Luxury), Recharts Data Viz, Lucide-React SVG Icons, Axios Interceptor</text>
    </g>

    <!-- TIER 2: APPLICATION & API GATEWAY -->
    <g transform="translate(40, 140)">
      <rect width="980" height="135" rx="6" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="980" height="24" rx="6" fill="#312e81"/>
      <text x="490" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">TIER 2: APPLICATION &amp; REST API GATEWAY (Node.js + Express.js)</text>
      <text x="20" y="44" font-size="9" fill="#1e1b4b">&bull; <strong>Security &amp; Gateways:</strong> JWT Bearer Authentication, Password Hashing (bcrypt 12 rounds), Role-Based Access Control (7 Roles)</text>
      <text x="20" y="60" font-size="9" fill="#1e1b4b">&bull; <strong>Cross-Cutting Middleware:</strong> CORS Whitelist, Morgan Logging, Global Async Error Boundary, Request Input Sanitization</text>
      <text x="20" y="76" font-size="9" fill="#1e1b4b">&bull; <strong>15 REST Domain Controllers:</strong> authController, bookingController, roomController, billingController, guestController, housekeepingController, etc.</text>
      <text x="20" y="92" font-size="9" fill="#1e1b4b">&bull; <strong>Business Rules:</strong> Dynamic Room Pricing Engine, Automated Invoice Tax Consolidation (GST 18%), Multi-Tenant UUID Partitioning</text>
      <text x="20" y="108" font-size="9" fill="#1e1b4b">&bull; <strong>Services:</strong> Notification Dispatcher, Comprehensive Audit Log Publisher, Report Aggregator</text>
    </g>

    <!-- TIER 3: DATA ACCESS & ORM -->
    <g transform="translate(40, 300)">
      <rect width="980" height="100" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
      <rect width="980" height="24" rx="6" fill="#16a34a"/>
      <text x="490" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">TIER 3: DATA ACCESS LAYER (Prisma ORM Client)</text>
      <text x="20" y="44" font-size="9" fill="#14532d">&bull; <strong>Type-Safe Query Construction:</strong> Auto-generated TypeScript definitions, typed relations, strict model validation</text>
      <text x="20" y="60" font-size="9" fill="#14532d">&bull; <strong>Concurrency &amp; Transactions:</strong> Interactive Prisma <code>$transaction</code> for atomicity in reservation bookings and billing settlements</text>
      <text x="20" y="76" font-size="9" fill="#14532d">&bull; <strong>Connection Pool Management:</strong> Connection pooling configuration, keep-alive monitoring, lazy connection initialization</text>
    </g>

    <!-- TIER 4: PERSISTENCE & DATABASE -->
    <g transform="translate(40, 425)">
      <rect width="980" height="105" rx="6" fill="#f8fafc" stroke="#0f172a" stroke-width="2"/>
      <rect width="980" height="24" rx="6" fill="#0f172a"/>
      <text x="490" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">TIER 4: RELATIONAL DATABASE PERSISTENCE (PostgreSQL 15)</text>
      <text x="20" y="44" font-size="9" fill="#1e293b">&bull; <strong>Schema Architecture:</strong> 25 normalized entity tables, 12 enumeration types, foreign keys with referential constraints</text>
      <text x="20" y="60" font-size="9" fill="#1e293b">&bull; <strong>Performance Optimization:</strong> Composite B-Tree indexes on <code>(hotelId, status)</code>, <code>(bookingNumber)</code>, <code>(checkInDate, checkOutDate)</code></text>
      <text x="20" y="76" font-size="9" fill="#1e293b">&bull; <strong>Enterprise Tenancy:</strong> Hard foreign key partitioning on every transactional table to enforce zero-leak multi-tenant boundaries</text>
      <text x="20" y="92" font-size="9" fill="#1e293b">&bull; <strong>Disaster Recovery:</strong> Point-in-time recovery (PITR), automated hourly WAL backups, encryption at rest (AES-256)</text>
    </g>

    <!-- INTER-TIER CONNECTORS -->
    <line x1="530" y1="115" x2="530" y2="140" stroke="#4338ca" stroke-width="2"/>
    <line x1="530" y1="275" x2="530" y2="300" stroke="#312e81" stroke-width="2"/>
    <line x1="530" y1="400" x2="530" y2="425" stroke="#16a34a" stroke-width="2"/>
  </svg>
  <div class="diagram-caption">Enterprise 4-Tier clean layered architecture model showing inter-tier contracts and security boundaries.</div>
</div>

<h4>Architectural Invariants &amp; Security Principles</h4>
<table>
  <tr>
    <th style="width:25%;">Security Dimension</th>
    <th style="width:35%;">Implementation Mechanism</th>
    <th style="width:40%;">Guaranteed Business Outcome</th>
  </tr>
  <tr>
    <td><strong>Authentication</strong></td>
    <td>JSON Web Tokens (JWT) signed with SHA-256 secret keys, stored in secure client memory.</td>
    <td>Stateless session validation with 24-hour expiration and immediate revocation capability.</td>
  </tr>
  <tr>
    <td><strong>Password Hashing</strong></td>
    <td><code>bcryptjs</code> with 12 adaptive hashing rounds and salt generation.</td>
    <td>Cryptographic defense against rainbow table and brute-force database breach attacks.</td>
  </tr>
  <tr>
    <td><strong>Tenant Isolation</strong></td>
    <td>Mandatory <code>hotelId</code> filtering across all Prisma queries injected via middleware claims.</td>
    <td>Guarantees zero cross-tenant data leakage in shared database infrastructure.</td>
  </tr>
  <tr>
    <td><strong>Concurrency Control</strong></td>
    <td>Prisma <code>$transaction</code> API with repeatable read isolation levels.</td>
    <td>Prevents race conditions, double-booking of rooms, and folio payment discrepancies.</td>
  </tr>
  <tr>
    <td><strong>Audit Traceability</strong></td>
    <td>Asynchronous write to <code>AuditLog</code> table on every write/update mutation.</td>
    <td>Immutable record of user actions, timestamps, affected entities, and IP addresses.</td>
  </tr>
</table>
`;

module.exports = {
  stateDiagramHtml,
  activityDiagramHtml,
  componentDiagramHtml,
  deploymentDiagramHtml,
  erDiagramHtml,
  architectureOverviewHtml
};
