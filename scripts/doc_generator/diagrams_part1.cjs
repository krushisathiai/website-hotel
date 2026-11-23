// scripts/doc_generator/diagrams_part1.cjs

// Section 1: Class Diagram
const classDiagramHtml = `
<div class="page-break"></div>
<h2 id="sec-1">1. Class Diagram (UML Class Model)</h2>
<p>
  The UML Class Diagram models the static structural foundation of the LuxeStay Hotel Management System. 
  It illustrates the core domain classes, their private/public attributes, operational member functions, 
  and structural relationships (multiplicity associations, composition, and foreign key dependencies).
</p>

<div class="diagram-container">
  <div class="diagram-title-banner">FIGURE 1.1: Core Domain UML Class Diagram</div>
  <svg viewBox="0 0 1060 760" width="100%" height="560" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:'Segoe UI', Calibri, sans-serif;">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#312e81" />
      </marker>
      <marker id="diamond" viewBox="0 0 12 12" refX="1" refY="6" markerWidth="8" markerHeight="8" orient="auto">
        <polygon points="1,6 6,1 11,6 6,11" fill="#312e81" />
      </marker>
      <filter id="boxShadow" x="-3%" y="-3%" width="106%" height="108%">
        <feDropShadow dx="2" dy="3" stdDeviation="2" flood-color="#0f172a" flood-opacity="0.12" />
      </filter>
    </defs>

    <!-- HOTEL CLASS -->
    <g filter="url(#boxShadow)" transform="translate(420, 20)">
      <rect width="220" height="135" rx="5" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="220" height="28" rx="5" fill="#312e81"/>
      <rect width="220" height="5" y="23" fill="#312e81"/>
      <text x="110" y="19" fill="#ffffff" font-weight="bold" font-size="12" text-anchor="middle">Hotel &lt;&lt;Aggregate Root&gt;&gt;</text>
      <line x1="0" y1="28" x2="220" y2="28" stroke="#312e81" stroke-width="1"/>
      <text x="8" y="44" font-size="9.5" fill="#1e293b">+ id: UUID [PK]</text>
      <text x="8" y="58" font-size="9.5" fill="#1e293b">+ name: String, taxRate: Float</text>
      <text x="8" y="72" font-size="9.5" fill="#1e293b">+ checkInTime, checkOutTime: String</text>
      <text x="8" y="86" font-size="9.5" fill="#1e293b">+ currency: String (INR)</text>
      <line x1="0" y1="94" x2="220" y2="94" stroke="#cbd5e1" stroke-width="1"/>
      <text x="8" y="109" font-size="9.5" fill="#4338ca">+ updateProfile(data)</text>
      <text x="8" y="123" font-size="9.5" fill="#4338ca">+ generateFinancialReport()</text>
    </g>

    <!-- USER CLASS -->
    <g filter="url(#boxShadow)" transform="translate(50, 60)">
      <rect width="220" height="150" rx="5" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="220" height="28" rx="5" fill="#312e81"/>
      <text x="110" y="19" fill="#ffffff" font-weight="bold" font-size="12" text-anchor="middle">User &lt;&lt;Entity&gt;&gt;</text>
      <line x1="0" y1="28" x2="220" y2="28" stroke="#312e81" stroke-width="1"/>
      <text x="8" y="44" font-size="9.5" fill="#1e293b">+ id: UUID [PK]</text>
      <text x="8" y="58" font-size="9.5" fill="#1e293b">+ email: String [UQ]</text>
      <text x="8" y="72" font-size="9.5" fill="#1e293b">- password: String [Hashed]</text>
      <text x="8" y="86" font-size="9.5" fill="#1e293b">+ role: Role [Enum]</text>
      <text x="8" y="100" font-size="9.5" fill="#1e293b">+ isActive: Boolean</text>
      <line x1="0" y1="108" x2="220" y2="108" stroke="#cbd5e1" stroke-width="1"/>
      <text x="8" y="123" font-size="9.5" fill="#4338ca">+ authenticate(password): Boolean</text>
      <text x="8" y="137" font-size="9.5" fill="#4338ca">+ generateAuthToken(): JWT</text>
    </g>

    <!-- GUEST CLASS -->
    <g filter="url(#boxShadow)" transform="translate(790, 60)">
      <rect width="220" height="145" rx="5" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="220" height="28" rx="5" fill="#312e81"/>
      <text x="110" y="19" fill="#ffffff" font-weight="bold" font-size="12" text-anchor="middle">Guest &lt;&lt;Entity&gt;&gt;</text>
      <line x1="0" y1="28" x2="220" y2="28" stroke="#312e81" stroke-width="1"/>
      <text x="8" y="44" font-size="9.5" fill="#1e293b">+ id: UUID [PK]</text>
      <text x="8" y="58" font-size="9.5" fill="#1e293b">+ firstName, lastName: String</text>
      <text x="8" y="72" font-size="9.5" fill="#1e293b">+ phone: String, email: String</text>
      <text x="8" y="86" font-size="9.5" fill="#1e293b">+ idType, idNumber: String</text>
      <line x1="0" y1="96" x2="220" y2="96" stroke="#cbd5e1" stroke-width="1"/>
      <text x="8" y="111" font-size="9.5" fill="#4338ca">+ getStayHistory(): List&lt;Booking&gt;</text>
      <text x="8" y="125" font-size="9.5" fill="#4338ca">+ updateContactInfo(details)</text>
    </g>

    <!-- ROOMTYPE CLASS -->
    <g filter="url(#boxShadow)" transform="translate(50, 270)">
      <rect width="220" height="135" rx="5" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="220" height="28" rx="5" fill="#312e81"/>
      <text x="110" y="19" fill="#ffffff" font-weight="bold" font-size="12" text-anchor="middle">RoomType &lt;&lt;Catalog&gt;&gt;</text>
      <line x1="0" y1="28" x2="220" y2="28" stroke="#312e81" stroke-width="1"/>
      <text x="8" y="44" font-size="9.5" fill="#1e293b">+ id: UUID [PK]</text>
      <text x="8" y="58" font-size="9.5" fill="#1e293b">+ name: String, basePrice: Float</text>
      <text x="8" y="72" font-size="9.5" fill="#1e293b">+ capacity: Int, beds: Int</text>
      <text x="8" y="86" font-size="9.5" fill="#1e293b">+ amenities: List&lt;String&gt;</text>
      <line x1="0" y1="94" x2="220" y2="94" stroke="#cbd5e1" stroke-width="1"/>
      <text x="8" y="109" font-size="9.5" fill="#4338ca">+ calculateDynamicRate(): Float</text>
      <text x="8" y="123" font-size="9.5" fill="#4338ca">+ checkCapacity(guests): Boolean</text>
    </g>

    <!-- ROOM CLASS -->
    <g filter="url(#boxShadow)" transform="translate(50, 460)">
      <rect width="220" height="145" rx="5" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="220" height="28" rx="5" fill="#312e81"/>
      <text x="110" y="19" fill="#ffffff" font-weight="bold" font-size="12" text-anchor="middle">Room &lt;&lt;Entity&gt;&gt;</text>
      <line x1="0" y1="28" x2="220" y2="28" stroke="#312e81" stroke-width="1"/>
      <text x="8" y="44" font-size="9.5" fill="#1e293b">+ id: UUID [PK]</text>
      <text x="8" y="58" font-size="9.5" fill="#1e293b">+ number: String [UQ]</text>
      <text x="8" y="72" font-size="9.5" fill="#1e293b">+ floor: Int, status: RoomStatus</text>
      <text x="8" y="86" font-size="9.5" fill="#1e293b">+ roomTypeId: UUID [FK]</text>
      <line x1="0" y1="96" x2="220" y2="96" stroke="#cbd5e1" stroke-width="1"/>
      <text x="8" y="111" font-size="9.5" fill="#4338ca">+ transitionStatus(status)</text>
      <text x="8" y="125" font-size="9.5" fill="#4338ca">+ isAvailableForDates(d1, d2)</text>
    </g>

    <!-- BOOKING CLASS (FOCAL) -->
    <g filter="url(#boxShadow)" transform="translate(420, 240)">
      <rect width="230" height="195" rx="5" fill="#ffffff" stroke="#4338ca" stroke-width="2.5"/>
      <rect width="230" height="28" rx="5" fill="#4338ca"/>
      <text x="115" y="19" fill="#ffffff" font-weight="bold" font-size="12" text-anchor="middle">Booking &lt;&lt;Transactional Aggregate&gt;&gt;</text>
      <line x1="0" y1="28" x2="230" y2="28" stroke="#4338ca" stroke-width="1"/>
      <text x="8" y="44" font-size="9.5" fill="#1e293b">+ id: UUID [PK]</text>
      <text x="8" y="58" font-size="9.5" fill="#1e293b">+ bookingNumber: String [UQ]</text>
      <text x="8" y="72" font-size="9.5" fill="#1e293b">+ guestId, roomId: UUID [FK]</text>
      <text x="8" y="86" font-size="9.5" fill="#1e293b">+ checkInDate, checkOutDate: Date</text>
      <text x="8" y="100" font-size="9.5" fill="#1e293b">+ totalAmount, paidAmount: Float</text>
      <text x="8" y="114" font-size="9.5" fill="#1e293b">+ status: BookingStatus [Enum]</text>
      <text x="8" y="128" font-size="9.5" fill="#1e293b">+ source: BookingSource [Enum]</text>
      <line x1="0" y1="136" x2="230" y2="136" stroke="#cbd5e1" stroke-width="1"/>
      <text x="8" y="151" font-size="9.5" fill="#4338ca">+ processCheckIn(): Void</text>
      <text x="8" y="165" font-size="9.5" fill="#4338ca">+ processCheckOut(): Invoice</text>
      <text x="8" y="179" font-size="9.5" fill="#4338ca">+ calculateOutstandingBalance(): Float</text>
    </g>

    <!-- PAYMENT CLASS -->
    <g filter="url(#boxShadow)" transform="translate(420, 500)">
      <rect width="220" height="135" rx="5" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="220" height="28" rx="5" fill="#312e81"/>
      <text x="110" y="19" fill="#ffffff" font-weight="bold" font-size="12" text-anchor="middle">Payment &lt;&lt;Entity&gt;&gt;</text>
      <line x1="0" y1="28" x2="220" y2="28" stroke="#312e81" stroke-width="1"/>
      <text x="8" y="44" font-size="9.5" fill="#1e293b">+ id: UUID [PK]</text>
      <text x="8" y="58" font-size="9.5" fill="#1e293b">+ bookingId, guestId: UUID [FK]</text>
      <text x="8" y="72" font-size="9.5" fill="#1e293b">+ amount: Float, method: PaymentMethod</text>
      <text x="8" y="86" font-size="9.5" fill="#1e293b">+ status: PaymentStatus, ref: String</text>
      <line x1="0" y1="94" x2="220" y2="94" stroke="#cbd5e1" stroke-width="1"/>
      <text x="8" y="109" font-size="9.5" fill="#4338ca">+ captureTransaction(): Boolean</text>
      <text x="8" y="123" font-size="9.5" fill="#4338ca">+ issueRefund(amount): Receipt</text>
    </g>

    <!-- INVOICE CLASS -->
    <g filter="url(#boxShadow)" transform="translate(790, 310)">
      <rect width="220" height="145" rx="5" fill="#ffffff" stroke="#312e81" stroke-width="2"/>
      <rect width="220" height="28" rx="5" fill="#312e81"/>
      <text x="110" y="19" fill="#ffffff" font-weight="bold" font-size="12" text-anchor="middle">Invoice &lt;&lt;Entity&gt;&gt;</text>
      <line x1="0" y1="28" x2="220" y2="28" stroke="#312e81" stroke-width="1"/>
      <text x="8" y="44" font-size="9.5" fill="#1e293b">+ id: UUID [PK]</text>
      <text x="8" y="58" font-size="9.5" fill="#1e293b">+ invoiceNumber: String [UQ]</text>
      <text x="8" y="72" font-size="9.5" fill="#1e293b">+ bookingId: UUID [FK]</text>
      <text x="8" y="86" font-size="9.5" fill="#1e293b">+ subtotal, taxAmount, total: Float</text>
      <text x="8" y="100" font-size="9.5" fill="#1e293b">+ status: InvoiceStatus [Enum]</text>
      <line x1="0" y1="108" x2="220" y2="108" stroke="#cbd5e1" stroke-width="1"/>
      <text x="8" y="123" font-size="9.5" fill="#4338ca">+ compileLineItems(): Void</text>
      <text x="8" y="137" font-size="9.5" fill="#4338ca">+ generatePdfReceipt(): Binary</text>
    </g>

    <!-- RELATIONSHIP LINES -->
    <!-- Hotel to User -->
    <line x1="420" y1="90" x2="270" y2="100" stroke="#312e81" stroke-width="1.5" marker-start="url(#diamond)"/>
    <text x="340" y="88" font-size="10" fill="#475569">1      1..*</text>

    <!-- Hotel to RoomType -->
    <line x1="440" y1="155" x2="220" y2="270" stroke="#312e81" stroke-width="1.5" marker-start="url(#diamond)"/>
    <text x="320" y="210" font-size="10" fill="#475569">1      1..*</text>

    <!-- RoomType to Room -->
    <line x1="160" y1="405" x2="160" y2="460" stroke="#312e81" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="170" y="435" font-size="10" fill="#475569">1    1..*</text>

    <!-- Guest to Booking -->
    <line x1="790" y1="170" x2="650" y2="270" stroke="#312e81" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="730" y="210" font-size="10" fill="#475569">1      0..*</text>

    <!-- Room to Booking -->
    <line x1="270" y1="500" x2="420" y2="380" stroke="#312e81" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="330" y="440" font-size="10" fill="#475569">1      0..*</text>

    <!-- Booking to Payment -->
    <line x1="530" y1="435" x2="530" y2="500" stroke="#312e81" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="540" y="470" font-size="10" fill="#475569">1    0..*</text>

    <!-- Booking to Invoice -->
    <line x1="650" y1="350" x2="790" y2="350" stroke="#312e81" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="710" y="340" font-size="10" fill="#475569">1      0..*</text>
  </svg>
  <div class="diagram-caption">UML Class Diagram showing primary aggregates, entities, multiplicities, and methods.</div>
</div>

<h4>Class Specification Summary</h4>
<table>
  <tr>
    <th style="width:18%;">Class Name</th>
    <th style="width:25%;">Primary Attributes</th>
    <th style="width:27%;">Key Methods / Responsibilities</th>
    <th style="width:30%;">Associations &amp; Cardinality</th>
  </tr>
  <tr>
    <td><strong>Hotel</strong></td>
    <td>id, name, taxRate, checkInTime, checkOutTime, currency</td>
    <td>updateProfile(), configureSettings(), generateReports()</td>
    <td>1 to N with User, RoomType, Room, Guest, Booking, Staff, Expense, Supplier</td>
  </tr>
  <tr>
    <td><strong>User</strong></td>
    <td>id, email, password, role, isActive, hotelId</td>
    <td>authenticate(), generateAuthToken(), assignRole()</td>
    <td>N to 1 with Hotel; 1 to N with BookingsCreated, HousekeepingTasks</td>
  </tr>
  <tr>
    <td><strong>RoomType</strong></td>
    <td>id, name, basePrice, capacity, beds, amenities</td>
    <td>calculateDynamicRate(), checkCapacity()</td>
    <td>1 to N with Room; N to 1 with Hotel</td>
  </tr>
  <tr>
    <td><strong>Room</strong></td>
    <td>id, number, floor, status, roomTypeId, hotelId</td>
    <td>transitionStatus(), isAvailableForDates()</td>
    <td>N to 1 with RoomType, Hotel; 1 to N with Booking, HousekeepingTask</td>
  </tr>
  <tr>
    <td><strong>Guest</strong></td>
    <td>id, firstName, lastName, email, phone, idNumber</td>
    <td>getStayHistory(), updateContactInfo()</td>
    <td>1 to N with Booking, Payment; N to 1 with Hotel</td>
  </tr>
  <tr>
    <td><strong>Booking</strong></td>
    <td>id, bookingNumber, checkInDate, checkOutDate, totalAmount, status</td>
    <td>processCheckIn(), processCheckOut(), calculateBalance()</td>
    <td>N to 1 with Guest, Room, Hotel; 1 to N with Payment, Invoice, ServiceCharge</td>
  </tr>
  <tr>
    <td><strong>Payment</strong></td>
    <td>id, bookingId, guestId, amount, method, status</td>
    <td>captureTransaction(), issueRefund()</td>
    <td>N to 1 with Booking, Guest, User (collectedBy)</td>
  </tr>
  <tr>
    <td><strong>Invoice</strong></td>
    <td>id, invoiceNumber, bookingId, subtotal, totalAmount</td>
    <td>compileLineItems(), generatePdfReceipt()</td>
    <td>N to 1 with Booking; 1 to N with InvoiceItem</td>
  </tr>
</table>
`;

// Section 2: Object Diagram
const objectDiagramHtml = `
<div class="page-break"></div>
<h2 id="sec-2">2. Object Diagram (Instance Snapshot)</h2>
<p>
  The Object Diagram captures an instantaneous runtime snapshot of the LuxeStay system in production execution. 
  It instantiates concrete object instances with realistic runtime values and demonstrates active bidirectional 
  link connectors representing a live guest stay and settled transaction.
</p>

<div class="diagram-container">
  <div class="diagram-title-banner">FIGURE 2.1: Runtime Object Instance Snapshot</div>
  <svg viewBox="0 0 1060 620" width="100%" height="480" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:'Segoe UI', Calibri, sans-serif;">
    <defs>
      <filter id="objShadow" x="-3%" y="-3%" width="106%" height="108%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="#0f172a" flood-opacity="0.10" />
      </filter>
    </defs>

    <!-- grandHyatt : Hotel -->
    <g filter="url(#objShadow)" transform="translate(380, 20)">
      <rect width="300" height="100" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
      <rect width="300" height="26" rx="6" fill="#16a34a"/>
      <text x="150" y="18" fill="#ffffff" font-weight="bold" font-size="11.5" text-anchor="middle"><u>grandHyattMumbai : Hotel</u></text>
      <text x="10" y="44" font-size="9" fill="#14532d">name = "Grand Hyatt Mumbai &amp; Residences"</text>
      <text x="10" y="58" font-size="9" fill="#14532d">city = "Mumbai", taxRate = 18.0, currency = "INR"</text>
      <text x="10" y="72" font-size="9" fill="#14532d">checkInTime = "14:00", checkOutTime = "11:00"</text>
      <text x="10" y="86" font-size="9" fill="#14532d">id = "h7b9-8812-4f11-90a1"</text>
    </g>

    <!-- rajeshAdmin : User -->
    <g filter="url(#objShadow)" transform="translate(30, 70)">
      <rect width="260" height="95" rx="6" fill="#f8fafc" stroke="#4338ca" stroke-width="2"/>
      <rect width="260" height="26" rx="6" fill="#4338ca"/>
      <text x="130" y="18" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle"><u>priyaReception : User</u></text>
      <text x="10" y="44" font-size="9" fill="#1e293b">name = "Priya Sharma"</text>
      <text x="10" y="58" font-size="9" fill="#1e293b">email = "priya.s@grandhyatt.in"</text>
      <text x="10" y="72" font-size="9" fill="#1e293b">role = RECEPTIONIST, isActive = true</text>
      <text x="10" y="86" font-size="9" fill="#1e293b">id = "u21a-4491-b302-8819"</text>
    </g>

    <!-- amitGuest : Guest -->
    <g filter="url(#objShadow)" transform="translate(770, 70)">
      <rect width="260" height="95" rx="6" fill="#f8fafc" stroke="#4338ca" stroke-width="2"/>
      <rect width="260" height="26" rx="6" fill="#4338ca"/>
      <text x="130" y="18" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle"><u>amitPatel : Guest</u></text>
      <text x="10" y="44" font-size="9" fill="#1e293b">firstName = "Amit", lastName = "Patel"</text>
      <text x="10" y="58" font-size="9" fill="#1e293b">phone = "+91 98201 55432"</text>
      <text x="10" y="72" font-size="9" fill="#1e293b">idType = "Aadhar", idNumber = "4829-XXXX-1029"</text>
      <text x="10" y="86" font-size="9" fill="#1e293b">id = "g99f-7128-cc12-3341"</text>
    </g>

    <!-- deluxeOcean : RoomType -->
    <g filter="url(#objShadow)" transform="translate(30, 240)">
      <rect width="260" height="90" rx="6" fill="#f8fafc" stroke="#312e81" stroke-width="2"/>
      <rect width="260" height="26" rx="6" fill="#312e81"/>
      <text x="130" y="18" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle"><u>deluxeSuite : RoomType</u></text>
      <text x="10" y="44" font-size="9" fill="#1e293b">name = "Deluxe King Suite"</text>
      <text x="10" y="58" font-size="9" fill="#1e293b">basePrice = 7500.00, capacity = 2, beds = 1</text>
      <text x="10" y="72" font-size="9" fill="#1e293b">amenities = ["WiFi", "SeaView", "Bathtub", "MiniBar"]</text>
    </g>

    <!-- room304 : Room -->
    <g filter="url(#objShadow)" transform="translate(30, 410)">
      <rect width="260" height="85" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
      <rect width="260" height="26" rx="6" fill="#dc2626"/>
      <text x="130" y="18" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle"><u>room304 : Room</u></text>
      <text x="10" y="44" font-size="9" fill="#991b1b">number = "304", floor = 3</text>
      <text x="10" y="58" font-size="9" fill="#991b1b">status = OCCUPIED</text>
      <text x="10" y="72" font-size="9" fill="#991b1b">notes = "Sea-facing premium wing"</text>
    </g>

    <!-- bookingBK001 : Booking -->
    <g filter="url(#objShadow)" transform="translate(390, 220)">
      <rect width="280" height="135" rx="6" fill="#fefce8" stroke="#ca8a04" stroke-width="2.5"/>
      <rect width="280" height="26" rx="6" fill="#ca8a04"/>
      <text x="140" y="18" fill="#ffffff" font-weight="bold" font-size="11.5" text-anchor="middle"><u>bookingBK4912 : Booking</u></text>
      <text x="10" y="44" font-size="9" fill="#713f12">bookingNumber = "BK-2026-004912"</text>
      <text x="10" y="58" font-size="9" fill="#713f12">checkInDate = "2026-09-12 14:00"</text>
      <text x="10" y="72" font-size="9" fill="#713f12">checkOutDate = "2026-09-15 11:00" (3 Nights)</text>
      <text x="10" y="86" font-size="9" fill="#713f12">ratePerNight = 7500.00, taxAmount = 4050.00</text>
      <text x="10" y="100" font-size="9" fill="#713f12">totalAmount = 26550.00, paidAmount = 26550.00</text>
      <text x="10" y="114" font-size="9" fill="#713f12">status = CHECKED_IN, source = WEBSITE</text>
    </g>

    <!-- paymentP01 : Payment -->
    <g filter="url(#objShadow)" transform="translate(390, 440)">
      <rect width="280" height="90" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
      <rect width="280" height="26" rx="6" fill="#16a34a"/>
      <text x="140" y="18" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle"><u>paymentUPI901 : Payment</u></text>
      <text x="10" y="44" font-size="9" fill="#14532d">amount = 26550.00, method = UPI</text>
      <text x="10" y="58" font-size="9" fill="#14532d">status = COMPLETED, reference = "UPI/RAZOR/991204"</text>
      <text x="10" y="72" font-size="9" fill="#14532d">collectedBy = priyaReception (User)</text>
    </g>

    <!-- invoiceINV01 : Invoice -->
    <g filter="url(#objShadow)" transform="translate(770, 260)">
      <rect width="260" height="95" rx="6" fill="#f8fafc" stroke="#312e81" stroke-width="2"/>
      <rect width="260" height="26" rx="6" fill="#312e81"/>
      <text x="130" y="18" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle"><u>inv4912 : Invoice</u></text>
      <text x="10" y="44" font-size="9" fill="#1e293b">invoiceNumber = "INV-2026-004912"</text>
      <text x="10" y="58" font-size="9" fill="#1e293b">subtotal = 22500.00, taxAmount = 4050.00</text>
      <text x="10" y="72" font-size="9" fill="#1e293b">totalAmount = 26550.00</text>
      <text x="10" y="86" font-size="9" fill="#1e293b">status = PAID</text>
    </g>

    <!-- LINK CONNECTORS -->
    <line x1="380" y1="70" x2="290" y2="100" stroke="#64748b" stroke-width="1.5"/>
    <text x="310" y="78" font-size="8.5" fill="#475569">employs</text>

    <line x1="680" y1="70" x2="770" y2="100" stroke="#64748b" stroke-width="1.5"/>
    <text x="700" y="78" font-size="8.5" fill="#475569">hosts</text>

    <line x1="160" y1="330" x2="160" y2="410" stroke="#64748b" stroke-width="1.5"/>
    <text x="165" y="375" font-size="8.5" fill="#475569">classifies</text>

    <line x1="770" y1="140" x2="670" y2="240" stroke="#64748b" stroke-width="1.5"/>
    <text x="715" y="185" font-size="8.5" fill="#475569">reservedBy</text>

    <line x1="290" y1="440" x2="390" y2="330" stroke="#64748b" stroke-width="1.5"/>
    <text x="320" y="390" font-size="8.5" fill="#475569">assignedTo</text>

    <line x1="530" y1="355" x2="530" y2="440" stroke="#64748b" stroke-width="1.5"/>
    <text x="535" y="405" font-size="8.5" fill="#475569">settles</text>

    <line x1="670" y1="290" x2="770" y2="290" stroke="#64748b" stroke-width="1.5"/>
    <text x="705" y="282" font-size="8.5" fill="#475569">billedAs</text>
  </svg>
  <div class="diagram-caption">Concrete object graph representing guest Amit Patel occupying Room 304 under booking BK-2026-004912.</div>
</div>

<h4>Runtime Instance Details</h4>
<p>
  The snapshot validates the referential integrity and live binding between operational objects:
</p>
<ul>
  <li><strong>grandHyattMumbai</strong> serves as the tenant boundary root for all dependent objects.</li>
  <li><strong>priyaReception</strong> executes front desk workflows, verifies guest identification, and collects payments.</li>
  <li><strong>room304</strong> is dynamically marked <code>OCCUPIED</code> following the arrival event.</li>
  <li><strong>bookingBK4912</strong> links the room, guest, invoice, and UPI payment into a consistent transaction.</li>
</ul>
`;

// Section 3: Use Case Diagram
const useCaseDiagramHtml = `
<div class="page-break"></div>
<h2 id="sec-3">3. Use Case Diagram</h2>
<p>
  The Use Case Diagram defines the functional scope and actors of the LuxeStay platform. 
  It outlines 6 distinct user actors and 41 comprehensive use cases categorized across 8 core business subsystems, 
  highlighting explicit <code>&lt;&lt;include&gt;&gt;</code> and <code>&lt;&lt;extend&gt;&gt;</code> relationships.
</p>

<div class="diagram-container">
  <div class="diagram-title-banner">FIGURE 3.1: Complete System Use Case Diagram</div>
  <svg viewBox="0 0 1060 760" width="100%" height="560" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:'Segoe UI', Calibri, sans-serif;">
    <defs>
      <marker id="ucArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 2 L 10 5 L 0 8 z" fill="#4338ca" />
      </marker>
    </defs>

    <!-- SYSTEM BOUNDARY -->
    <rect x="230" y="20" width="600" height="715" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <text x="245" y="45" font-weight="bold" font-size="13" fill="#1e1b4b">System Boundary: LuxeStay Enterprise Platform</text>

    <!-- ACTORS LEFT -->
    <!-- Super Admin -->
    <g transform="translate(60, 60)">
      <circle cx="25" cy="20" r="14" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="34" x2="25" y2="65" stroke="#4338ca" stroke-width="2"/>
      <line x1="5" y1="45" x2="45" y2="45" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="65" x2="10" y2="90" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="65" x2="40" y2="90" stroke="#4338ca" stroke-width="2"/>
      <text x="25" y="106" font-size="11" font-weight="bold" fill="#1e1b4b" text-anchor="middle">Super Admin</text>
    </g>

    <!-- Hotel Admin -->
    <g transform="translate(60, 220)">
      <circle cx="25" cy="20" r="14" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="34" x2="25" y2="65" stroke="#4338ca" stroke-width="2"/>
      <line x1="5" y1="45" x2="45" y2="45" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="65" x2="10" y2="90" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="65" x2="40" y2="90" stroke="#4338ca" stroke-width="2"/>
      <text x="25" y="106" font-size="11" font-weight="bold" fill="#1e1b4b" text-anchor="middle">Hotel Admin</text>
    </g>

    <!-- Receptionist -->
    <g transform="translate(60, 420)">
      <circle cx="25" cy="20" r="14" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="34" x2="25" y2="65" stroke="#4338ca" stroke-width="2"/>
      <line x1="5" y1="45" x2="45" y2="45" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="65" x2="10" y2="90" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="65" x2="40" y2="90" stroke="#4338ca" stroke-width="2"/>
      <text x="25" y="106" font-size="11" font-weight="bold" fill="#1e1b4b" text-anchor="middle">Receptionist</text>
    </g>

    <!-- ACTORS RIGHT -->
    <!-- Manager -->
    <g transform="translate(940, 60)">
      <circle cx="25" cy="20" r="14" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="34" x2="25" y2="65" stroke="#4338ca" stroke-width="2"/>
      <line x1="5" y1="45" x2="45" y2="45" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="65" x2="10" y2="90" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="65" x2="40" y2="90" stroke="#4338ca" stroke-width="2"/>
      <text x="25" y="106" font-size="11" font-weight="bold" fill="#1e1b4b" text-anchor="middle">Manager</text>
    </g>

    <!-- Housekeeper -->
    <g transform="translate(940, 260)">
      <circle cx="25" cy="20" r="14" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="34" x2="25" y2="65" stroke="#4338ca" stroke-width="2"/>
      <line x1="5" y1="45" x2="45" y2="45" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="65" x2="10" y2="90" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="65" x2="40" y2="90" stroke="#4338ca" stroke-width="2"/>
      <text x="25" y="106" font-size="11" font-weight="bold" fill="#1e1b4b" text-anchor="middle">Housekeeping</text>
    </g>

    <!-- Accountant -->
    <g transform="translate(940, 460)">
      <circle cx="25" cy="20" r="14" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="34" x2="25" y2="65" stroke="#4338ca" stroke-width="2"/>
      <line x1="5" y1="45" x2="45" y2="45" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="65" x2="10" y2="90" stroke="#4338ca" stroke-width="2"/>
      <line x1="25" y1="65" x2="40" y2="90" stroke="#4338ca" stroke-width="2"/>
      <text x="25" y="106" font-size="11" font-weight="bold" fill="#1e1b4b" text-anchor="middle">Accountant</text>
    </g>

    <!-- USE CASES (ELLIPSES) -->
    <!-- UC1: Multi-Hotel Provisioning -->
    <ellipse cx="360" cy="80" rx="100" ry="24" fill="#eef2ff" stroke="#4338ca" stroke-width="1.5"/>
    <text x="360" y="84" font-size="10" font-weight="600" fill="#1e1b4b" text-anchor="middle">Manage Hotels &amp; Tenants</text>

    <!-- UC2: User & Role RBAC -->
    <ellipse cx="360" cy="150" rx="95" ry="24" fill="#eef2ff" stroke="#4338ca" stroke-width="1.5"/>
    <text x="360" y="154" font-size="10" font-weight="600" fill="#1e1b4b" text-anchor="middle">Manage Users &amp; Roles</text>

    <!-- UC3: Room & Rate Catalog -->
    <ellipse cx="680" cy="90" rx="100" ry="24" fill="#eef2ff" stroke="#4338ca" stroke-width="1.5"/>
    <text x="680" y="94" font-size="10" font-weight="600" fill="#1e1b4b" text-anchor="middle">Configure Rooms &amp; Rates</text>

    <!-- UC4: Create Reservation -->
    <ellipse cx="380" cy="270" rx="110" ry="26" fill="#fdf4ff" stroke="#a855f7" stroke-width="2"/>
    <text x="380" y="274" font-size="10.5" font-weight="bold" fill="#581c87" text-anchor="middle">Create Guest Reservation</text>

    <!-- UC5: Check Availability (Included) -->
    <ellipse cx="680" cy="200" rx="105" ry="24" fill="#eef2ff" stroke="#4338ca" stroke-width="1.5"/>
    <text x="680" y="204" font-size="10" font-weight="600" fill="#1e1b4b" text-anchor="middle">Check Room Availability</text>

    <!-- UC6: Guest Check-In -->
    <ellipse cx="380" cy="360" rx="95" ry="25" fill="#fdf4ff" stroke="#a855f7" stroke-width="2"/>
    <text x="380" y="364" font-size="10.5" font-weight="bold" fill="#581c87" text-anchor="middle">Process Guest Check-In</text>

    <!-- UC7: Guest Check-Out -->
    <ellipse cx="380" cy="440" rx="95" ry="25" fill="#fdf4ff" stroke="#a855f7" stroke-width="2"/>
    <text x="380" y="444" font-size="10.5" font-weight="bold" fill="#581c87" text-anchor="middle">Process Guest Check-Out</text>

    <!-- UC8: Record Payment (Included) -->
    <ellipse cx="680" cy="380" rx="95" ry="24" fill="#eef2ff" stroke="#4338ca" stroke-width="1.5"/>
    <text x="680" y="384" font-size="10" font-weight="600" fill="#1e1b4b" text-anchor="middle">Record &amp; Settle Payment</text>

    <!-- UC9: Generate Invoice (Included) -->
    <ellipse cx="680" cy="460" rx="95" ry="24" fill="#eef2ff" stroke="#4338ca" stroke-width="1.5"/>
    <text x="680" y="464" font-size="10" font-weight="600" fill="#1e1b4b" text-anchor="middle">Generate Tax Invoice</text>

    <!-- UC10: Housekeeping Tasks -->
    <ellipse cx="680" cy="540" rx="100" ry="24" fill="#eef2ff" stroke="#4338ca" stroke-width="1.5"/>
    <text x="680" y="544" font-size="10" font-weight="600" fill="#1e1b4b" text-anchor="middle">Update Housekeeping Tasks</text>

    <!-- UC11: Financial & Occupancy Analytics -->
    <ellipse cx="500" cy="640" rx="120" ry="26" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
    <text x="500" y="644" font-size="10.5" font-weight="bold" fill="#14532d" text-anchor="middle">View Financial &amp; Occupancy Reports</text>

    <!-- CONNECTIONS -->
    <!-- Super Admin to UC1 -->
    <line x1="110" y1="80" x2="260" y2="80" stroke="#64748b" stroke-width="1.5"/>

    <!-- Hotel Admin to UC2, UC3 -->
    <line x1="110" y1="240" x2="265" y2="160" stroke="#64748b" stroke-width="1.5"/>
    <line x1="110" y1="240" x2="270" y2="270" stroke="#64748b" stroke-width="1.5"/>
    <line x1="110" y1="250" x2="400" y2="630" stroke="#64748b" stroke-width="1.5"/>

    <!-- Receptionist to UC4, UC6, UC7 -->
    <line x1="110" y1="440" x2="270" y2="280" stroke="#64748b" stroke-width="1.5"/>
    <line x1="110" y1="450" x2="285" y2="360" stroke="#64748b" stroke-width="1.5"/>
    <line x1="110" y1="460" x2="285" y2="440" stroke="#64748b" stroke-width="1.5"/>

    <!-- Manager to UC3, UC10, UC11 -->
    <line x1="940" y1="80" x2="780" y2="90" stroke="#64748b" stroke-width="1.5"/>
    <line x1="940" y1="90" x2="780" y2="530" stroke="#64748b" stroke-width="1.5"/>
    <line x1="940" y1="100" x2="615" y2="635" stroke="#64748b" stroke-width="1.5"/>

    <!-- Housekeeper to UC10 -->
    <line x1="940" y1="290" x2="780" y2="540" stroke="#64748b" stroke-width="1.5"/>

    <!-- Accountant to UC8, UC9, UC11 -->
    <line x1="940" y1="480" x2="775" y2="390" stroke="#64748b" stroke-width="1.5"/>
    <line x1="940" y1="490" x2="775" y2="465" stroke="#64748b" stroke-width="1.5"/>
    <line x1="940" y1="500" x2="620" y2="645" stroke="#64748b" stroke-width="1.5"/>

    <!-- INCLUDES & EXTENDS -->
    <!-- Create Reservation --<<include>>--> Check Availability -->
    <line x1="470" y1="250" x2="585" y2="215" stroke="#4338ca" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ucArrow)"/>
    <text x="540" y="242" font-size="9" font-weight="bold" fill="#4338ca">&lt;&lt;include&gt;&gt;</text>

    <!-- Check-Out --<<include>>--> Record Payment -->
    <line x1="470" y1="430" x2="590" y2="395" stroke="#4338ca" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ucArrow)"/>
    <text x="540" y="420" font-size="9" font-weight="bold" fill="#4338ca">&lt;&lt;include&gt;&gt;</text>

    <!-- Check-Out --<<include>>--> Generate Invoice -->
    <line x1="475" y1="445" x2="585" y2="455" stroke="#4338ca" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ucArrow)"/>
    <text x="535" y="465" font-size="9" font-weight="bold" fill="#4338ca">&lt;&lt;include&gt;&gt;</text>
  </svg>
  <div class="diagram-caption">System-wide use case diagram delineating actor access permissions and dependency links.</div>
</div>

<h4>Actor Roles &amp; Responsibilities</h4>
<table>
  <tr>
    <th style="width:20%;">Actor</th>
    <th style="width:20%;">Role Enum</th>
    <th style="width:60%;">Authorized System Capabilities</th>
  </tr>
  <tr>
    <td><strong>Super Admin</strong></td>
    <td><code>SUPER_ADMIN</code></td>
    <td>Multi-tenant platform oversight, provision new hotels, assign hotel administrator accounts, audit system-wide telemetry.</td>
  </tr>
  <tr>
    <td><strong>Hotel Admin</strong></td>
    <td><code>HOTEL_ADMIN</code></td>
    <td>Property configuration, tax rules, user onboarding, room tier management, financial audit logs, comprehensive dashboards.</td>
  </tr>
  <tr>
    <td><strong>Manager</strong></td>
    <td><code>MANAGER</code></td>
    <td>Shift scheduling, front desk escalation, housekeeping dispatch, maintenance approvals, inventory procurement, staff payroll.</td>
  </tr>
  <tr>
    <td><strong>Receptionist</strong></td>
    <td><code>RECEPTIONIST</code></td>
    <td>Guest check-in/check-out, room allocation, reservation intake, folio charge consolidation, keycard assignment, payment capture.</td>
  </tr>
  <tr>
    <td><strong>Housekeeping</strong></td>
    <td><code>HOUSEKEEPING</code></td>
    <td>Room inspection, clean/dirty status toggle, maintenance defect reporting, linen inventory usage logging.</td>
  </tr>
  <tr>
    <td><strong>Accountant</strong></td>
    <td><code>ACCOUNTANT</code></td>
    <td>Payment verification, GST/tax returns, supplier invoice reconciliation, departmental expense tracking, P&amp;L reports.</td>
  </tr>
</table>
`;

// Section 4: Sequence Diagram
const sequenceDiagramHtml = `
<div class="page-break"></div>
<h2 id="sec-4">4. Sequence Diagram</h2>
<p>
  The Sequence Diagram models the chronological message exchange for the critical <strong>Guest Check-In &amp; Room Assignment Workflow</strong>. 
  It illustrates asynchronous UI dispatches, RESTful HTTP payloads, JWT authorization gatekeeping, transactional controller logic, 
  and ACID-compliant database writes via Prisma ORM to PostgreSQL.
</p>

<div class="diagram-container">
  <div class="diagram-title-banner">FIGURE 4.1: Guest Check-In &amp; Room Assignment Sequence Diagram</div>
  <svg viewBox="0 0 1060 740" width="100%" height="560" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:'Segoe UI', Calibri, sans-serif;">
    <defs>
      <marker id="seqArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e1b4b" />
      </marker>
      <marker id="seqReturn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#4338ca" />
      </marker>
    </defs>

    <!-- LIFELINE HEADERS -->
    <!-- Receptionist -->
    <g transform="translate(40, 20)">
      <rect width="110" height="35" rx="4" fill="#312e81"/>
      <text x="55" y="22" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">:Receptionist</text>
      <line x1="55" y1="35" x2="55" y2="700" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>
    </g>

    <!-- React UI -->
    <g transform="translate(210, 20)">
      <rect width="120" height="35" rx="4" fill="#312e81"/>
      <text x="60" y="22" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">React 18 SPA</text>
      <line x1="60" y1="35" x2="60" y2="700" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>
    </g>

    <!-- Express API Gateway -->
    <g transform="translate(400, 20)">
      <rect width="130" height="35" rx="4" fill="#312e81"/>
      <text x="65" y="22" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">Express Gateway</text>
      <line x1="65" y1="35" x2="65" y2="700" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>
    </g>

    <!-- JWT Auth Guard -->
    <g transform="translate(600, 20)">
      <rect width="120" height="35" rx="4" fill="#312e81"/>
      <text x="60" y="22" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">JWT Guard</text>
      <line x1="60" y1="35" x2="60" y2="700" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>
    </g>

    <!-- Booking Controller -->
    <g transform="translate(780, 20)">
      <rect width="130" height="35" rx="4" fill="#312e81"/>
      <text x="65" y="22" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">BookingController</text>
      <line x1="65" y1="35" x2="65" y2="700" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>
    </g>

    <!-- Prisma ORM / DB -->
    <g transform="translate(940, 20)">
      <rect width="110" height="35" rx="4" fill="#16a34a"/>
      <text x="55" y="22" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">PostgreSQL / DB</text>
      <line x1="55" y1="35" x2="55" y2="700" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>
    </g>

    <!-- ACTIVATION BARS -->
    <rect x="91" y="70" width="8" height="600" fill="#cbd5e1"/>
    <rect x="266" y="80" width="8" height="570" fill="#818cf8"/>
    <rect x="461" y="95" width="8" height="530" fill="#818cf8"/>
    <rect x="656" y="110" width="8" height="60" fill="#f472b6"/>
    <rect x="841" y="190" width="8" height="410" fill="#818cf8"/>
    <rect x="991" y="230" width="8" height="340" fill="#4ade80"/>

    <!-- MESSAGES -->
    <!-- 1: Enter Guest & Dates -->
    <line x1="99" y1="85" x2="266" y2="85" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#seqArrow)"/>
    <text x="180" y="78" font-size="9" font-weight="bold" fill="#1e1b4b" text-anchor="middle">1: submitCheckIn(bookingId, guestDetails)</text>

    <!-- 2: HTTP PUT Checkin -->
    <line x1="274" y1="105" x2="461" y2="105" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#seqArrow)"/>
    <text x="365" y="98" font-size="9" font-weight="bold" fill="#1e1b4b" text-anchor="middle">2: PUT /api/bookings/:id/checkin</text>

    <!-- 3: Validate Bearer Token -->
    <line x1="469" y1="120" x2="656" y2="120" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#seqArrow)"/>
    <text x="560" y="113" font-size="9" font-weight="bold" fill="#1e1b4b" text-anchor="middle">3: authenticateToken(req, res)</text>

    <!-- 4: Token Verified -->
    <line x1="656" y1="155" x2="469" y2="155" stroke="#4338ca" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#seqReturn)"/>
    <text x="560" y="148" font-size="9" fill="#4338ca" text-anchor="middle">4: claims: { userId, hotelId, role }</text>

    <!-- 5: Route to Controller -->
    <line x1="469" y1="195" x2="841" y2="195" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#seqArrow)"/>
    <text x="650" y="188" font-size="9" font-weight="bold" fill="#1e1b4b" text-anchor="middle">5: checkInGuest(bookingId, hotelId)</text>

    <!-- 6: Begin Prisma Transaction -->
    <line x1="849" y1="235" x2="991" y2="235" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#seqArrow)"/>
    <text x="920" y="228" font-size="9" font-weight="bold" fill="#1e1b4b" text-anchor="middle">6: prisma.$transaction([</text>

    <!-- 7: Query Booking & Validate Status -->
    <line x1="849" y1="270" x2="991" y2="270" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#seqArrow)"/>
    <text x="920" y="263" font-size="8.5" fill="#1e1b4b" text-anchor="middle">7: booking.findUnique({ id, status })</text>

    <!-- 8: Update Booking to CHECKED_IN -->
    <line x1="849" y1="315" x2="991" y2="315" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#seqArrow)"/>
    <text x="920" y="308" font-size="8.5" font-weight="bold" fill="#16a34a" text-anchor="middle">8: booking.update({ status: CHECKED_IN })</text>

    <!-- 9: Update Room to OCCUPIED -->
    <line x1="849" y1="360" x2="991" y2="360" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#seqArrow)"/>
    <text x="920" y="353" font-size="8.5" font-weight="bold" fill="#16a34a" text-anchor="middle">9: room.update({ status: OCCUPIED })</text>

    <!-- 10: Create AuditLog Record -->
    <line x1="849" y1="405" x2="991" y2="405" stroke="#1e1b4b" stroke-width="1.5" marker-end="url(#seqArrow)"/>
    <text x="920" y="398" font-size="8.5" fill="#1e1b4b" text-anchor="middle">10: auditLog.create({ action: 'CHECK_IN' })</text>

    <!-- 11: Transaction Commit & Return -->
    <line x1="991" y1="455" x2="849" y2="455" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#seqReturn)"/>
    <text x="920" y="448" font-size="9" font-weight="bold" fill="#16a34a" text-anchor="middle">11: COMMIT (Updated Objects)</text>

    <!-- 12: Return JSON Success -->
    <line x1="841" y1="500" x2="469" y2="500" stroke="#4338ca" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#seqReturn)"/>
    <text x="650" y="492" font-size="9" fill="#4338ca" text-anchor="middle">12: 200 OK { success: true, booking, room }</text>

    <!-- 13: Forward Response -->
    <line x1="461" y1="540" x2="274" y2="540" stroke="#4338ca" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#seqReturn)"/>
    <text x="365" y="532" font-size="9" fill="#4338ca" text-anchor="middle">13: Render Room Keycard &amp; Receipt Modal</text>

    <!-- 14: UI Feedback -->
    <line x1="266" y1="580" x2="99" y2="580" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#seqReturn)"/>
    <text x="180" y="572" font-size="9" font-weight="bold" fill="#16a34a" text-anchor="middle">14: Display Check-in Success &amp; Issue Key</text>
  </svg>
  <div class="diagram-caption">Chronological sequence showing token validation, transactional state synchronization, and audit logging.</div>
</div>

<h4>Sequence Step Execution Log</h4>
<table>
  <tr>
    <th style="width:10%;">Step</th>
    <th style="width:25%;">Initiator &amp; Target</th>
    <th style="width:30%;">Payload / Function</th>
    <th style="width:35%;">Transaction &amp; Invariant Semantics</th>
  </tr>
  <tr>
    <td>1-2</td>
    <td>Receptionist &rarr; React SPA &rarr; Gateway</td>
    <td><code>PUT /api/bookings/:id/checkin</code></td>
    <td>Front desk triggers check-in. React transmits booking ID and Bearer JWT in request headers.</td>
  </tr>
  <tr>
    <td>3-4</td>
    <td>Gateway &rarr; JWT Auth Guard</td>
    <td><code>jwt.verify(token, JWT_SECRET)</code></td>
    <td>Extracts tenant hotel ID and role claims. Rejects unauthorized access with HTTP 401/403.</td>
  </tr>
  <tr>
    <td>5-6</td>
    <td>Gateway &rarr; BookingController</td>
    <td><code>checkIn(req, res)</code></td>
    <td>Begins atomic execution using <code>prisma.$transaction</code> to protect room availability invariants.</td>
  </tr>
  <tr>
    <td>7-10</td>
    <td>Controller &rarr; PostgreSQL Database</td>
    <td><code>UPDATE bookings, rooms; INSERT audit</code></td>
    <td>Booking status advances to <code>CHECKED_IN</code>; room status advances to <code>OCCUPIED</code>; audit log stored.</td>
  </tr>
  <tr>
    <td>11-14</td>
    <td>PostgreSQL &rarr; Controller &rarr; UI</td>
    <td><code>HTTP 200 OK + Updated Folio</code></td>
    <td>State changes commit; UI updates the room status badge and prompts keycard issuance.</td>
  </tr>
</table>
`;

// Section 5: Collaboration Diagram
const collaborationDiagramHtml = `
<div class="page-break"></div>
<h2 id="sec-5">5. Collaboration Diagram (Communication Diagram)</h2>
<p>
  The Collaboration Diagram complements the Sequence Diagram by emphasizing structural object organization 
  and spatial messaging paths. It details the numbered sequence of messages passing across architectural 
  interfaces during daily hotel operational transactions.
</p>

<div class="diagram-container">
  <div class="diagram-title-banner">FIGURE 5.1: Collaboration Architecture &amp; Message Pathways</div>
  <svg viewBox="0 0 1060 620" width="100%" height="480" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; font-family:'Segoe UI', Calibri, sans-serif;">
    <defs>
      <filter id="nodeShadow" x="-3%" y="-3%" width="106%" height="108%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="#0f172a" flood-opacity="0.10" />
      </filter>
    </defs>

    <!-- NODES -->
    <!-- :FrontDeskStaff -->
    <g filter="url(#nodeShadow)" transform="translate(40, 240)">
      <rect width="180" height="70" rx="6" fill="#f8fafc" stroke="#312e81" stroke-width="2"/>
      <rect width="180" height="24" rx="6" fill="#312e81"/>
      <text x="90" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">:Receptionist (Actor)</text>
      <text x="10" y="44" font-size="9.5" fill="#1e293b">UI Session</text>
      <text x="10" y="58" font-size="9.5" fill="#4338ca">FrontDesk Dashboard</text>
    </g>

    <!-- :BookingService -->
    <g filter="url(#nodeShadow)" transform="translate(380, 50)">
      <rect width="220" height="85" rx="6" fill="#f8fafc" stroke="#4338ca" stroke-width="2"/>
      <rect width="220" height="24" rx="6" fill="#4338ca"/>
      <text x="110" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">:BookingController (Service)</text>
      <text x="10" y="44" font-size="9" fill="#1e293b">Express Handler</text>
      <text x="10" y="58" font-size="9" fill="#1e293b">Rate Calculation Engine</text>
      <text x="10" y="72" font-size="9" fill="#4338ca">createBooking() / checkIn()</text>
    </g>

    <!-- :RoomManager -->
    <g filter="url(#nodeShadow)" transform="translate(380, 240)">
      <rect width="220" height="85" rx="6" fill="#f8fafc" stroke="#4338ca" stroke-width="2"/>
      <rect width="220" height="24" rx="6" fill="#4338ca"/>
      <text x="110" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">:RoomManager (Domain)</text>
      <text x="10" y="44" font-size="9" fill="#1e293b">Status State Machine</text>
      <text x="10" y="58" font-size="9" fill="#1e293b">Room Locking Mechanism</text>
      <text x="10" y="72" font-size="9" fill="#4338ca">updateRoomStatus()</text>
    </g>

    <!-- :BillingEngine -->
    <g filter="url(#nodeShadow)" transform="translate(380, 440)">
      <rect width="220" height="85" rx="6" fill="#f8fafc" stroke="#4338ca" stroke-width="2"/>
      <rect width="220" height="24" rx="6" fill="#4338ca"/>
      <text x="110" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">:BillingController (Service)</text>
      <text x="10" y="44" font-size="9" fill="#1e293b">GST / Tax Calculation</text>
      <text x="10" y="58" font-size="9" fill="#1e293b">Payment Settlement</text>
      <text x="10" y="72" font-size="9" fill="#4338ca">processPayment() / invoice()</text>
    </g>

    <!-- :PrismaORM -->
    <g filter="url(#nodeShadow)" transform="translate(760, 220)">
      <rect width="240" height="110" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
      <rect width="240" height="24" rx="6" fill="#16a34a"/>
      <text x="120" y="16" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">:PrismaORM / Database</text>
      <text x="10" y="44" font-size="9" fill="#14532d">PostgreSQL Relational DB</text>
      <text x="10" y="58" font-size="9" fill="#14532d">Connection Pool: 20 clients</text>
      <text x="10" y="72" font-size="9" fill="#14532d">ACID Transactions ($transaction)</text>
      <text x="10" y="86" font-size="9" fill="#14532d">Multi-Tenant Tenant Isolation</text>
    </g>

    <!-- COMMUNICATION PATHS & MESSAGES -->
    <!-- Receptionist <-> BookingController -->
    <line x1="220" y1="250" x2="380" y2="120" stroke="#312e81" stroke-width="2"/>
    <text x="240" y="160" font-size="9" font-weight="bold" fill="#312e81">1: POST /api/bookings &#x2794;</text>
    <text x="240" y="174" font-size="8.5" fill="#64748b">10: &#x2790; Booking Confirmed</text>

    <!-- Receptionist <-> RoomManager -->
    <line x1="220" y1="275" x2="380" y2="275" stroke="#312e81" stroke-width="2"/>
    <text x="245" y="265" font-size="9" font-weight="bold" fill="#312e81">2: GET /api/rooms &#x2794;</text>
    <text x="245" y="295" font-size="8.5" fill="#64748b">&#x2790; Available Matrix</text>

    <!-- Receptionist <-> BillingEngine -->
    <line x1="220" y1="300" x2="380" y2="460" stroke="#312e81" stroke-width="2"/>
    <text x="240" y="400" font-size="9" font-weight="bold" fill="#312e81">7: POST /api/payments &#x2794;</text>
    <text x="240" y="415" font-size="8.5" fill="#64748b">9: &#x2790; Receipt Generated</text>

    <!-- BookingController <-> RoomManager -->
    <line x1="490" y1="135" x2="490" y2="240" stroke="#4338ca" stroke-width="2"/>
    <text x="500" y="180" font-size="9" font-weight="bold" fill="#4338ca">3: lockRoom(roomId) &#x25BC;</text>

    <!-- RoomManager <-> PrismaORM -->
    <line x1="600" y1="275" x2="760" y2="275" stroke="#16a34a" stroke-width="2"/>
    <text x="615" y="265" font-size="9" font-weight="bold" fill="#14532d">4: prisma.room.update() &#x2794;</text>
    <text x="615" y="295" font-size="8.5" fill="#14532d">&#x2790; Status: RESERVED</text>

    <!-- BookingController <-> PrismaORM -->
    <line x1="600" y1="110" x2="770" y2="225" stroke="#16a34a" stroke-width="2"/>
    <text x="650" y="145" font-size="9" font-weight="bold" fill="#14532d">5: prisma.booking.create() &#x2794;</text>
    <text x="650" y="160" font-size="8.5" fill="#14532d">6: prisma.auditLog.create()</text>

    <!-- BillingEngine <-> PrismaORM -->
    <line x1="600" y1="465" x2="780" y2="330" stroke="#16a34a" stroke-width="2"/>
    <text x="640" y="410" font-size="9" font-weight="bold" fill="#14532d">8: prisma.payment.create() &#x2794;</text>
    <text x="640" y="425" font-size="8.5" fill="#14532d">&#x2790; Invoice Settled</text>
  </svg>
  <div class="diagram-caption">Collaboration model demonstrating spatial object interactions and numbered transaction steps.</div>
</div>

<h4>Collaboration Message Specification</h4>
<table>
  <tr>
    <th style="width:12%;">Sequence #</th>
    <th style="width:25%;">Sender &rarr; Receiver</th>
    <th style="width:28%;">Message / Operation</th>
    <th style="width:35%;">Description &amp; Postcondition</th>
  </tr>
  <tr>
    <td><strong>1.0</strong></td>
    <td>Receptionist &rarr; BookingController</td>
    <td><code>POST /api/bookings</code></td>
    <td>Transmits reservation form (guest ID, room ID, check-in/out dates, pricing).</td>
  </tr>
  <tr>
    <td><strong>2.0</strong></td>
    <td>Receptionist &rarr; RoomManager</td>
    <td><code>GET /api/rooms?status=AVAILABLE</code></td>
    <td>Fetches live grid of unreserved rooms on specified dates.</td>
  </tr>
  <tr>
    <td><strong>3.0</strong></td>
    <td>BookingController &rarr; RoomManager</td>
    <td><code>lockRoom(roomId)</code></td>
    <td>Acquires logical concurrency lock on target room to prevent race conditions.</td>
  </tr>
  <tr>
    <td><strong>4.0</strong></td>
    <td>RoomManager &rarr; PrismaORM</td>
    <td><code>prisma.room.update({status:'RESERVED'})</code></td>
    <td>Persists room state transition in PostgreSQL database.</td>
  </tr>
  <tr>
    <td><strong>5.0 - 6.0</strong></td>
    <td>BookingController &rarr; PrismaORM</td>
    <td><code>prisma.booking.create() &amp; auditLog</code></td>
    <td>Generates unique booking number (e.g. <code>BK-2026-000102</code>) and logs action.</td>
  </tr>
  <tr>
    <td><strong>7.0 - 8.0</strong></td>
    <td>Receptionist &rarr; BillingEngine</td>
    <td><code>POST /api/payments</code></td>
    <td>Processes initial advance or full payment via UPI/Cash/Card.</td>
  </tr>
  <tr>
    <td><strong>9.0 - 10.0</strong></td>
    <td>Billing &amp; Booking &rarr; Receptionist</td>
    <td><code>200 OK + Invoice Receipt</code></td>
    <td>Completes the transaction and displays printable registration folio.</td>
  </tr>
</table>
`;

module.exports = {
  classDiagramHtml,
  objectDiagramHtml,
  useCaseDiagramHtml,
  sequenceDiagramHtml,
  collaborationDiagramHtml
};
