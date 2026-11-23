// scripts/doc_generator/data_dictionary.cjs

const dataDictionaryHtml = `
<div class="page-break"></div>
<h2 id="sec-11">11. Comprehensive Data Dictionary (25 Entities)</h2>
<p>
  This Data Dictionary provides complete physical column specifications for all 25 relational models in the 
  LuxeStay PostgreSQL database. It specifies column names, storage data types, nullability, primary/foreign key 
  constraints, default values, and operational descriptions.
</p>

<!-- 1. HOTEL -->
<h3>11.1 Model: Hotel (Multi-Tenant Aggregate Root)</h3>
<table>
  <tr>
    <th style="width:20%;">Column Name</th>
    <th style="width:16%;">Data Type</th>
    <th style="width:18%;">Constraints</th>
    <th style="width:16%;">Default</th>
    <th style="width:30%;">Description</th>
  </tr>
  <tr><td><code>id</code></td><td>UUID</td><td><span class="badge badge-pk">PK</span></td><td>uuid()</td><td>Unique identifier for the hotel entity.</td></tr>
  <tr><td><code>name</code></td><td>VARCHAR(255)</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Official commercial name of the hotel property.</td></tr>
  <tr><td><code>logo</code></td><td>TEXT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>URL to the branded corporate logo.</td></tr>
  <tr><td><code>address</code></td><td>TEXT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Physical street address.</td></tr>
  <tr><td><code>city</code></td><td>VARCHAR(100)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Municipality / City location.</td></tr>
  <tr><td><code>state</code></td><td>VARCHAR(100)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Provincial or state administrative region.</td></tr>
  <tr><td><code>country</code></td><td>VARCHAR(100)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Country name.</td></tr>
  <tr><td><code>zipCode</code></td><td>VARCHAR(20)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Postal code.</td></tr>
  <tr><td><code>phone</code></td><td>VARCHAR(30)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Primary front desk contact phone number.</td></tr>
  <tr><td><code>email</code></td><td>VARCHAR(255)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Official correspondence email.</td></tr>
  <tr><td><code>website</code></td><td>VARCHAR(255)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Public website URL.</td></tr>
  <tr><td><code>taxId</code></td><td>VARCHAR(50)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Government GSTIN / VAT tax identification.</td></tr>
  <tr><td><code>taxRate</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>18.0</td><td>Standard Goods &amp; Services Tax rate percentage.</td></tr>
  <tr><td><code>checkInTime</code></td><td>VARCHAR(10)</td><td><span class="badge badge-req">NOT NULL</span></td><td>"14:00"</td><td>Standard daily guest check-in time.</td></tr>
  <tr><td><code>checkOutTime</code></td><td>VARCHAR(10)</td><td><span class="badge badge-req">NOT NULL</span></td><td>"11:00"</td><td>Standard daily guest departure cutoff time.</td></tr>
  <tr><td><code>currency</code></td><td>VARCHAR(10)</td><td><span class="badge badge-req">NOT NULL</span></td><td>"INR"</td><td>Base operational transaction currency.</td></tr>
  <tr><td><code>timezone</code></td><td>VARCHAR(50)</td><td><span class="badge badge-req">NOT NULL</span></td><td>"Asia/Kolkata"</td><td>Operating time zone for scheduling.</td></tr>
  <tr><td><code>createdAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Record creation audit timestamp.</td></tr>
  <tr><td><code>updatedAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>auto</td><td>Record last modification timestamp.</td></tr>
</table>

<!-- 2. USER -->
<h3>11.2 Model: User (System Authentication &amp; RBAC)</h3>
<table>
  <tr>
    <th style="width:20%;">Column Name</th>
    <th style="width:16%;">Data Type</th>
    <th style="width:18%;">Constraints</th>
    <th style="width:16%;">Default</th>
    <th style="width:30%;">Description</th>
  </tr>
  <tr><td><code>id</code></td><td>UUID</td><td><span class="badge badge-pk">PK</span></td><td>uuid()</td><td>Unique account identifier.</td></tr>
  <tr><td><code>email</code></td><td>VARCHAR(255)</td><td><span class="badge badge-req">NOT NULL</span>, <span class="badge badge-pk">UNIQUE</span></td><td>-</td><td>Corporate login email and username.</td></tr>
  <tr><td><code>password</code></td><td>VARCHAR(255)</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Bcrypt cryptographic password hash (12 rounds).</td></tr>
  <tr><td><code>name</code></td><td>VARCHAR(255)</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Full legal name of staff member.</td></tr>
  <tr><td><code>phone</code></td><td>VARCHAR(30)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Mobile phone number.</td></tr>
  <tr><td><code>avatar</code></td><td>TEXT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Profile picture avatar image URL.</td></tr>
  <tr><td><code>role</code></td><td>ENUM</td><td><span class="badge badge-enum">Role</span></td><td>RECEPTIONIST</td><td>Authorization role governing system permissions.</td></tr>
  <tr><td><code>isActive</code></td><td>BOOLEAN</td><td><span class="badge badge-req">NOT NULL</span></td><td>true</td><td>Flag indicating if account can authenticate.</td></tr>
  <tr><td><code>lastLogin</code></td><td>TIMESTAMP</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Timestamp of most recent successful session.</td></tr>
  <tr><td><code>hotelId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Hotel(id)</span></td><td>-</td><td>Associated hotel property for tenancy boundary.</td></tr>
  <tr><td><code>createdAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Account creation date.</td></tr>
  <tr><td><code>updatedAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>auto</td><td>Last profile update date.</td></tr>
</table>

<!-- 3. ROOM_TYPE -->
<h3>11.3 Model: RoomType (Room Category &amp; Pricing)</h3>
<table>
  <tr>
    <th style="width:20%;">Column Name</th>
    <th style="width:16%;">Data Type</th>
    <th style="width:18%;">Constraints</th>
    <th style="width:16%;">Default</th>
    <th style="width:30%;">Description</th>
  </tr>
  <tr><td><code>id</code></td><td>UUID</td><td><span class="badge badge-pk">PK</span></td><td>uuid()</td><td>Primary key identifier.</td></tr>
  <tr><td><code>name</code></td><td>VARCHAR(100)</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Room class name (e.g. Deluxe Suite, Presidential).</td></tr>
  <tr><td><code>description</code></td><td>TEXT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Marketing description of room amenities and view.</td></tr>
  <tr><td><code>basePrice</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Base rate per night before taxes and seasonal surge.</td></tr>
  <tr><td><code>capacity</code></td><td>INT</td><td><span class="badge badge-req">NOT NULL</span></td><td>2</td><td>Maximum permitted adult occupants.</td></tr>
  <tr><td><code>beds</code></td><td>INT</td><td><span class="badge badge-req">NOT NULL</span></td><td>1</td><td>Number of physical beds configured.</td></tr>
  <tr><td><code>amenities</code></td><td>TEXT[]</td><td><span class="badge badge-req">ARRAY</span></td><td>[]</td><td>Array of amenities (WiFi, MiniBar, Jacuzzi).</td></tr>
  <tr><td><code>images</code></td><td>TEXT[]</td><td><span class="badge badge-req">ARRAY</span></td><td>[]</td><td>Array of gallery photo URLs.</td></tr>
  <tr><td><code>isActive</code></td><td>BOOLEAN</td><td><span class="badge badge-req">NOT NULL</span></td><td>true</td><td>Availability flag for reservation search.</td></tr>
  <tr><td><code>hotelId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Hotel(id)</span></td><td>-</td><td>Parent hotel property foreign key.</td></tr>
  <tr><td><code>createdAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Catalog entry creation timestamp.</td></tr>
  <tr><td><code>updatedAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>auto</td><td>Catalog entry modification timestamp.</td></tr>
</table>

<!-- 4. ROOM -->
<h3>11.4 Model: Room (Physical Inventory)</h3>
<table>
  <tr>
    <th style="width:20%;">Column Name</th>
    <th style="width:16%;">Data Type</th>
    <th style="width:18%;">Constraints</th>
    <th style="width:16%;">Default</th>
    <th style="width:30%;">Description</th>
  </tr>
  <tr><td><code>id</code></td><td>UUID</td><td><span class="badge badge-pk">PK</span></td><td>uuid()</td><td>Unique room identifier.</td></tr>
  <tr><td><code>number</code></td><td>VARCHAR(50)</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Physical door number (e.g. "101", "Penthouse A").</td></tr>
  <tr><td><code>floor</code></td><td>INT</td><td><span class="badge badge-req">NOT NULL</span></td><td>1</td><td>Building floor number.</td></tr>
  <tr><td><code>status</code></td><td>ENUM</td><td><span class="badge badge-enum">RoomStatus</span></td><td>AVAILABLE</td><td>Operational status (AVAILABLE, OCCUPIED, etc.).</td></tr>
  <tr><td><code>roomTypeId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; RoomType(id)</span></td><td>-</td><td>Associated room tier specification.</td></tr>
  <tr><td><code>hotelId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Hotel(id)</span></td><td>-</td><td>Tenancy hotel identifier.</td></tr>
  <tr><td><code>notes</code></td><td>TEXT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Internal housekeeping or maintenance notes.</td></tr>
  <tr><td><code>createdAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Room registration date.</td></tr>
  <tr><td><code>updatedAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>auto</td><td>Room state change date.</td></tr>
</table>

<!-- 5. GUEST -->
<h3>11.5 Model: Guest (Customer Registry)</h3>
<table>
  <tr>
    <th style="width:20%;">Column Name</th>
    <th style="width:16%;">Data Type</th>
    <th style="width:18%;">Constraints</th>
    <th style="width:16%;">Default</th>
    <th style="width:30%;">Description</th>
  </tr>
  <tr><td><code>id</code></td><td>UUID</td><td><span class="badge badge-pk">PK</span></td><td>uuid()</td><td>Unique guest identifier.</td></tr>
  <tr><td><code>firstName</code></td><td>VARCHAR(100)</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Guest first / given name.</td></tr>
  <tr><td><code>lastName</code></td><td>VARCHAR(100)</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Guest surname / family name.</td></tr>
  <tr><td><code>email</code></td><td>VARCHAR(255)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Guest personal email address.</td></tr>
  <tr><td><code>phone</code></td><td>VARCHAR(30)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Mobile telephone number.</td></tr>
  <tr><td><code>address</code></td><td>TEXT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Residential permanent street address.</td></tr>
  <tr><td><code>city</code></td><td>VARCHAR(100)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>City of residence.</td></tr>
  <tr><td><code>country</code></td><td>VARCHAR(100)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Country of nationality.</td></tr>
  <tr><td><code>idType</code></td><td>VARCHAR(50)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Identity document type (Passport, Aadhar, DL).</td></tr>
  <tr><td><code>idNumber</code></td><td>VARCHAR(100)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Identity verification document number.</td></tr>
  <tr><td><code>dateOfBirth</code></td><td>DATE</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Date of birth.</td></tr>
  <tr><td><code>notes</code></td><td>TEXT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>VIP preferences, dietary, or allergy notes.</td></tr>
  <tr><td><code>hotelId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Hotel(id)</span></td><td>-</td><td>Hotel tenant identifier.</td></tr>
  <tr><td><code>createdAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Guest profile creation date.</td></tr>
  <tr><td><code>updatedAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>auto</td><td>Last profile edit date.</td></tr>
</table>

<!-- 6. BOOKING -->
<h3>11.6 Model: Booking (Transactional Reservation)</h3>
<table>
  <tr>
    <th style="width:20%;">Column Name</th>
    <th style="width:16%;">Data Type</th>
    <th style="width:18%;">Constraints</th>
    <th style="width:16%;">Default</th>
    <th style="width:30%;">Description</th>
  </tr>
  <tr><td><code>id</code></td><td>UUID</td><td><span class="badge badge-pk">PK</span></td><td>uuid()</td><td>Unique booking identifier.</td></tr>
  <tr><td><code>bookingNumber</code></td><td>VARCHAR(50)</td><td><span class="badge badge-req">NOT NULL</span>, <span class="badge badge-pk">UNIQUE</span></td><td>-</td><td>Human-readable reservation reference (e.g. BK-2026-0001).</td></tr>
  <tr><td><code>guestId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Guest(id)</span></td><td>-</td><td>Associated guest primary key.</td></tr>
  <tr><td><code>roomId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Room(id)</span></td><td>-</td><td>Assigned physical room primary key.</td></tr>
  <tr><td><code>hotelId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Hotel(id)</span></td><td>-</td><td>Hotel property tenant key.</td></tr>
  <tr><td><code>checkInDate</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Scheduled arrival date and time.</td></tr>
  <tr><td><code>checkOutDate</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Scheduled departure date and time.</td></tr>
  <tr><td><code>actualCheckIn</code></td><td>TIMESTAMP</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Real-world check-in timestamp.</td></tr>
  <tr><td><code>actualCheckOut</code></td><td>TIMESTAMP</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Real-world checkout timestamp.</td></tr>
  <tr><td><code>adults</code></td><td>INT</td><td><span class="badge badge-req">NOT NULL</span></td><td>1</td><td>Number of registered adult guests.</td></tr>
  <tr><td><code>children</code></td><td>INT</td><td><span class="badge badge-req">NOT NULL</span></td><td>0</td><td>Number of registered minor guests.</td></tr>
  <tr><td><code>ratePerNight</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Agreed rate per night at reservation creation.</td></tr>
  <tr><td><code>discount</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>0.0</td><td>Promotional deduction or concession amount.</td></tr>
  <tr><td><code>taxAmount</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>0.0</td><td>Calculated GST/VAT tax on total room charge.</td></tr>
  <tr><td><code>totalAmount</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Gross payable folio amount.</td></tr>
  <tr><td><code>paidAmount</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>0.0</td><td>Cumulative payments collected against this booking.</td></tr>
  <tr><td><code>status</code></td><td>ENUM</td><td><span class="badge badge-enum">BookingStatus</span></td><td>CONFIRMED</td><td>Booking lifecycle status.</td></tr>
  <tr><td><code>source</code></td><td>ENUM</td><td><span class="badge badge-enum">BookingSource</span></td><td>WALK_IN</td><td>Acquisition channel (WALK_IN, WEBSITE, OTA).</td></tr>
  <tr><td><code>specialRequests</code></td><td>TEXT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Guest preferences (e.g. high floor, extra bed).</td></tr>
  <tr><td><code>createdById</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; User(id)</span></td><td>-</td><td>Staff member who processed the reservation.</td></tr>
  <tr><td><code>createdAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Reservation entry creation timestamp.</td></tr>
  <tr><td><code>updatedAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>auto</td><td>Reservation record modification timestamp.</td></tr>
</table>

<!-- 7. PAYMENT -->
<h3>11.7 Model: Payment (Financial Transaction)</h3>
<table>
  <tr>
    <th style="width:20%;">Column Name</th>
    <th style="width:16%;">Data Type</th>
    <th style="width:18%;">Constraints</th>
    <th style="width:16%;">Default</th>
    <th style="width:30%;">Description</th>
  </tr>
  <tr><td><code>id</code></td><td>UUID</td><td><span class="badge badge-pk">PK</span></td><td>uuid()</td><td>Unique payment transaction identifier.</td></tr>
  <tr><td><code>bookingId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Booking(id)</span></td><td>-</td><td>Target reservation folio identifier.</td></tr>
  <tr><td><code>guestId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Guest(id)</span></td><td>-</td><td>Payer guest identifier.</td></tr>
  <tr><td><code>amount</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Monetary transaction amount in base currency.</td></tr>
  <tr><td><code>method</code></td><td>ENUM</td><td><span class="badge badge-enum">PaymentMethod</span></td><td>CASH</td><td>Method of settlement (CASH, CARD, UPI, etc.).</td></tr>
  <tr><td><code>status</code></td><td>ENUM</td><td><span class="badge badge-enum">PaymentStatus</span></td><td>COMPLETED</td><td>Transaction state (COMPLETED, REFUNDED, etc.).</td></tr>
  <tr><td><code>reference</code></td><td>VARCHAR(100)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>External gateway transaction reference / UTR ID.</td></tr>
  <tr><td><code>notes</code></td><td>TEXT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Payment cashier notes or audit comments.</td></tr>
  <tr><td><code>collectedById</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; User(id)</span></td><td>-</td><td>Staff cashier who processed the receipt.</td></tr>
  <tr><td><code>createdAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Payment settlement timestamp.</td></tr>
  <tr><td><code>updatedAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>auto</td><td>Last status adjustment timestamp.</td></tr>
</table>

<!-- 8. INVOICE -->
<h3>11.8 Model: Invoice (Tax Folio)</h3>
<table>
  <tr>
    <th style="width:20%;">Column Name</th>
    <th style="width:16%;">Data Type</th>
    <th style="width:18%;">Constraints</th>
    <th style="width:16%;">Default</th>
    <th style="width:30%;">Description</th>
  </tr>
  <tr><td><code>id</code></td><td>UUID</td><td><span class="badge badge-pk">PK</span></td><td>uuid()</td><td>Primary key identifier.</td></tr>
  <tr><td><code>invoiceNumber</code></td><td>VARCHAR(50)</td><td><span class="badge badge-req">NOT NULL</span>, <span class="badge badge-pk">UNIQUE</span></td><td>-</td><td>Legal tax invoice serial number (e.g. INV-2026-001).</td></tr>
  <tr><td><code>bookingId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Booking(id)</span></td><td>-</td><td>Linked booking folio.</td></tr>
  <tr><td><code>subtotal</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Sum of room and service charges before tax.</td></tr>
  <tr><td><code>taxAmount</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Consolidated GST tax amount.</td></tr>
  <tr><td><code>discount</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>0.0</td><td>Total discount applied.</td></tr>
  <tr><td><code>totalAmount</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Net payable legal invoice sum.</td></tr>
  <tr><td><code>status</code></td><td>ENUM</td><td><span class="badge badge-enum">InvoiceStatus</span></td><td>UNPAID</td><td>Settlement state (PAID, UNPAID, PARTIAL, CANCELLED).</td></tr>
  <tr><td><code>notes</code></td><td>TEXT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Tax invoice footer terms and conditions.</td></tr>
  <tr><td><code>createdAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Invoice generation timestamp.</td></tr>
  <tr><td><code>updatedAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>auto</td><td>Invoice reconciliation timestamp.</td></tr>
</table>

<!-- 9. INVOICE_ITEM -->
<h3>11.9 Model: InvoiceItem (Line Items)</h3>
<table>
  <tr>
    <th style="width:20%;">Column Name</th>
    <th style="width:16%;">Data Type</th>
    <th style="width:18%;">Constraints</th>
    <th style="width:16%;">Default</th>
    <th style="width:30%;">Description</th>
  </tr>
  <tr><td><code>id</code></td><td>UUID</td><td><span class="badge badge-pk">PK</span></td><td>uuid()</td><td>Primary key identifier.</td></tr>
  <tr><td><code>invoiceId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Invoice(id)</span></td><td>-</td><td>Parent invoice foreign key with CASCADE delete.</td></tr>
  <tr><td><code>description</code></td><td>VARCHAR(255)</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Itemized description (e.g. Room Charge - 3 Nights).</td></tr>
  <tr><td><code>quantity</code></td><td>INT</td><td><span class="badge badge-req">NOT NULL</span></td><td>1</td><td>Billed quantity.</td></tr>
  <tr><td><code>unitPrice</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Unit price per line item.</td></tr>
  <tr><td><code>amount</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Extended total amount (quantity &times; unitPrice).</td></tr>
  <tr><td><code>createdAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Line item entry timestamp.</td></tr>
</table>

<!-- 10. SERVICE -->
<h3>11.10 Model: Service (Hotel Offerings Catalog)</h3>
<table>
  <tr>
    <th style="width:20%;">Column Name</th>
    <th style="width:16%;">Data Type</th>
    <th style="width:18%;">Constraints</th>
    <th style="width:16%;">Default</th>
    <th style="width:30%;">Description</th>
  </tr>
  <tr><td><code>id</code></td><td>UUID</td><td><span class="badge badge-pk">PK</span></td><td>uuid()</td><td>Unique service identifier.</td></tr>
  <tr><td><code>name</code></td><td>VARCHAR(100)</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Name of amenity (e.g. Airport Transfer, Spa).</td></tr>
  <tr><td><code>description</code></td><td>TEXT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Detailed scope of service.</td></tr>
  <tr><td><code>price</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Standard service fee.</td></tr>
  <tr><td><code>taxRate</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>18.0</td><td>Applicable GST rate on this service.</td></tr>
  <tr><td><code>isActive</code></td><td>BOOLEAN</td><td><span class="badge badge-req">NOT NULL</span></td><td>true</td><td>Active offering flag.</td></tr>
  <tr><td><code>hotelId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Hotel(id)</span></td><td>-</td><td>Tenancy foreign key.</td></tr>
  <tr><td><code>createdAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Registration date.</td></tr>
  <tr><td><code>updatedAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>auto</td><td>Price adjustment date.</td></tr>
</table>

<!-- 11. SERVICE_CHARGE -->
<h3>11.11 Model: ServiceCharge (Guest Service Consumption)</h3>
<table>
  <tr>
    <th style="width:20%;">Column Name</th>
    <th style="width:16%;">Data Type</th>
    <th style="width:18%;">Constraints</th>
    <th style="width:16%;">Default</th>
    <th style="width:30%;">Description</th>
  </tr>
  <tr><td><code>id</code></td><td>UUID</td><td><span class="badge badge-pk">PK</span></td><td>uuid()</td><td>Primary key.</td></tr>
  <tr><td><code>serviceId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Service(id)</span></td><td>-</td><td>Consumed service foreign key.</td></tr>
  <tr><td><code>bookingId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Booking(id)</span></td><td>-</td><td>Debited reservation folio.</td></tr>
  <tr><td><code>quantity</code></td><td>INT</td><td><span class="badge badge-req">NOT NULL</span></td><td>1</td><td>Number of units consumed.</td></tr>
  <tr><td><code>amount</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Total charge posted to room bill.</td></tr>
  <tr><td><code>notes</code></td><td>TEXT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Delivery or service notes.</td></tr>
  <tr><td><code>createdAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Time charge was posted.</td></tr>
</table>

<!-- 12. EXPENSE -->
<h3>11.12 Model: Expense (Operating Expenditures)</h3>
<table>
  <tr>
    <th style="width:20%;">Column Name</th>
    <th style="width:16%;">Data Type</th>
    <th style="width:18%;">Constraints</th>
    <th style="width:16%;">Default</th>
    <th style="width:30%;">Description</th>
  </tr>
  <tr><td><code>id</code></td><td>UUID</td><td><span class="badge badge-pk">PK</span></td><td>uuid()</td><td>Primary key identifier.</td></tr>
  <tr><td><code>category</code></td><td>ENUM</td><td><span class="badge badge-enum">ExpenseCategory</span></td><td>OTHER</td><td>Classification (ELECTRICITY, SALARY, FOOD, etc.).</td></tr>
  <tr><td><code>description</code></td><td>VARCHAR(255)</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Purpose of expenditure.</td></tr>
  <tr><td><code>amount</code></td><td>FLOAT</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Monetary disbursement amount.</td></tr>
  <tr><td><code>date</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Financial expenditure date.</td></tr>
  <tr><td><code>vendor</code></td><td>VARCHAR(100)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Payee merchant or supplier name.</td></tr>
  <tr><td><code>paymentMethod</code></td><td>ENUM</td><td><span class="badge badge-enum">PaymentMethod</span></td><td>CASH</td><td>Disbursement payment method.</td></tr>
  <tr><td><code>notes</code></td><td>TEXT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Accounting ledger voucher notes.</td></tr>
  <tr><td><code>hotelId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Hotel(id)</span></td><td>-</td><td>Hotel tenant foreign key.</td></tr>
  <tr><td><code>createdAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Record timestamp.</td></tr>
  <tr><td><code>updatedAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>auto</td><td>Adjustment timestamp.</td></tr>
</table>

<!-- 13. HOUSEKEEPING_TASK -->
<h3>11.13 Model: HousekeepingTask (Cleaning Operations)</h3>
<table>
  <tr>
    <th style="width:20%;">Column Name</th>
    <th style="width:16%;">Data Type</th>
    <th style="width:18%;">Constraints</th>
    <th style="width:16%;">Default</th>
    <th style="width:30%;">Description</th>
  </tr>
  <tr><td><code>id</code></td><td>UUID</td><td><span class="badge badge-pk">PK</span></td><td>uuid()</td><td>Primary key identifier.</td></tr>
  <tr><td><code>roomId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Room(id)</span></td><td>-</td><td>Target room requiring cleaning/inspection.</td></tr>
  <tr><td><code>assignedToId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; User(id)</span></td><td>-</td><td>Assigned housekeeper staff member.</td></tr>
  <tr><td><code>task</code></td><td>VARCHAR(255)</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Cleaning task title (e.g. Full Turnover, Linen Change).</td></tr>
  <tr><td><code>priority</code></td><td>ENUM</td><td><span class="badge badge-enum">Priority</span></td><td>MEDIUM</td><td>Urgency (LOW, MEDIUM, HIGH, URGENT).</td></tr>
  <tr><td><code>status</code></td><td>ENUM</td><td><span class="badge badge-enum">HousekeepingStatus</span></td><td>PENDING</td><td>Status (PENDING, IN_PROGRESS, COMPLETED, INSPECTION).</td></tr>
  <tr><td><code>notes</code></td><td>TEXT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Staff observations and checklist remarks.</td></tr>
  <tr><td><code>completedAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Task completion timestamp.</td></tr>
  <tr><td><code>createdAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Task creation date.</td></tr>
  <tr><td><code>updatedAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>auto</td><td>Task status modification date.</td></tr>
</table>

<!-- 14. MAINTENANCE_TICKET -->
<h3>11.14 Model: MaintenanceTicket (Facilities Management)</h3>
<table>
  <tr>
    <th style="width:20%;">Column Name</th>
    <th style="width:16%;">Data Type</th>
    <th style="width:18%;">Constraints</th>
    <th style="width:16%;">Default</th>
    <th style="width:30%;">Description</th>
  </tr>
  <tr><td><code>id</code></td><td>UUID</td><td><span class="badge badge-pk">PK</span></td><td>uuid()</td><td>Primary key identifier.</td></tr>
  <tr><td><code>roomId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Room(id)</span></td><td>-</td><td>Defective room location (or NULL for common areas).</td></tr>
  <tr><td><code>issue</code></td><td>VARCHAR(255)</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Defect headline (e.g. AC cooling leak, Door lock error).</td></tr>
  <tr><td><code>description</code></td><td>TEXT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Engineering diagnostic breakdown.</td></tr>
  <tr><td><code>priority</code></td><td>ENUM</td><td><span class="badge badge-enum">Priority</span></td><td>MEDIUM</td><td>Urgency rating.</td></tr>
  <tr><td><code>assignedToId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; User(id)</span></td><td>-</td><td>Assigned technician or maintenance staff.</td></tr>
  <tr><td><code>status</code></td><td>ENUM</td><td><span class="badge badge-enum">MaintenanceStatus</span></td><td>OPEN</td><td>Status (OPEN, IN_PROGRESS, RESOLVED, CLOSED).</td></tr>
  <tr><td><code>completedAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Resolution timestamp.</td></tr>
  <tr><td><code>createdAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Incident report date.</td></tr>
  <tr><td><code>updatedAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>auto</td><td>Repair update date.</td></tr>
</table>

<!-- 15. STAFF -->
<h3>11.15 Model: Staff (Human Resource Profiles)</h3>
<table>
  <tr>
    <th style="width:20%;">Column Name</th>
    <th style="width:16%;">Data Type</th>
    <th style="width:18%;">Constraints</th>
    <th style="width:16%;">Default</th>
    <th style="width:30%;">Description</th>
  </tr>
  <tr><td><code>id</code></td><td>UUID</td><td><span class="badge badge-pk">PK</span></td><td>uuid()</td><td>Staff profile primary key.</td></tr>
  <tr><td><code>name</code></td><td>VARCHAR(255)</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Employee full legal name.</td></tr>
  <tr><td><code>email</code></td><td>VARCHAR(255)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Official staff email address.</td></tr>
  <tr><td><code>phone</code></td><td>VARCHAR(30)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Contact telephone number.</td></tr>
  <tr><td><code>department</code></td><td>VARCHAR(100)</td><td><span class="badge badge-req">NOT NULL</span></td><td>-</td><td>Department (Front Desk, Food &amp; Beverage, Security).</td></tr>
  <tr><td><code>position</code></td><td>VARCHAR(100)</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Official job designation title.</td></tr>
  <tr><td><code>salary</code></td><td>FLOAT</td><td><span class="badge badge-opt">NULLABLE</span></td><td>-</td><td>Monthly contractual compensation.</td></tr>
  <tr><td><code>joinDate</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Date of employment onboarding.</td></tr>
  <tr><td><code>isActive</code></td><td>BOOLEAN</td><td><span class="badge badge-req">NOT NULL</span></td><td>true</td><td>Active employment status flag.</td></tr>
  <tr><td><code>hotelId</code></td><td>UUID</td><td><span class="badge badge-fk">FK &rarr; Hotel(id)</span></td><td>-</td><td>Hotel tenant foreign key.</td></tr>
  <tr><td><code>createdAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>now()</td><td>Record timestamp.</td></tr>
  <tr><td><code>updatedAt</code></td><td>TIMESTAMP</td><td><span class="badge badge-req">NOT NULL</span></td><td>auto</td><td>Profile modification timestamp.</td></tr>
</table>

<!-- 16-25 SUMMARY TABLE -->
<h3>11.16 Models 16 through 25: Inventory, Restaurant &amp; Governance</h3>
<table>
  <tr>
    <th style="width:18%;">Model Name</th>
    <th style="width:30%;">Primary &amp; Foreign Keys</th>
    <th style="width:22%;">Key Attributes</th>
    <th style="width:30%;">Operational Role &amp; Purpose</th>
  </tr>
  <tr>
    <td><strong>InventoryItem</strong></td>
    <td>PK: <code>id</code> (UUID)<br>FK: <code>hotelId</code>, <code>supplierId</code></td>
    <td>name, category, quantity, unit, minStock, purchasePrice</td>
    <td>Tracks hotel physical amenities, linens, and consumable stocks.</td>
  </tr>
  <tr>
    <td><strong>InventoryTransaction</strong></td>
    <td>PK: <code>id</code> (UUID)<br>FK: <code>itemId</code></td>
    <td>type (STOCK_IN, STOCK_OUT), quantity, notes</td>
    <td>Audit trail of inventory movements and consumption.</td>
  </tr>
  <tr>
    <td><strong>Supplier</strong></td>
    <td>PK: <code>id</code> (UUID)<br>FK: <code>hotelId</code></td>
    <td>name, contact, email, phone, address</td>
    <td>Vendor directory for procurement and supply replenishment.</td>
  </tr>
  <tr>
    <td><strong>RestaurantTable</strong></td>
    <td>PK: <code>id</code> (UUID)<br>FK: <code>hotelId</code></td>
    <td>number, capacity, status (available, occupied)</td>
    <td>Manages physical dining tables in the hotel restaurant.</td>
  </tr>
  <tr>
    <td><strong>MenuCategory</strong></td>
    <td>PK: <code>id</code> (UUID)<br>FK: <code>hotelId</code></td>
    <td>name (Starters, Main Course, Beverages)</td>
    <td>Hierarchical grouping for restaurant food and beverage items.</td>
  </tr>
  <tr>
    <td><strong>MenuItem</strong></td>
    <td>PK: <code>id</code> (UUID)<br>FK: <code>categoryId</code></td>
    <td>name, price, isAvailable, image</td>
    <td>Individual dishes and drinks available on the menu.</td>
  </tr>
  <tr>
    <td><strong>RestaurantOrder</strong></td>
    <td>PK: <code>id</code> (UUID)<br>FK: <code>tableId</code>, <code>bookingId</code></td>
    <td>roomCharge, status (pending, served, paid), total</td>
    <td>Table orders with support for charging directly to room bill.</td>
  </tr>
  <tr>
    <td><strong>RestaurantOrderItem</strong></td>
    <td>PK: <code>id</code> (UUID)<br>FK: <code>orderId</code>, <code>itemId</code></td>
    <td>quantity, price</td>
    <td>Line items within a restaurant dining order.</td>
  </tr>
  <tr>
    <td><strong>Notification</strong></td>
    <td>PK: <code>id</code> (UUID)<br>FK: <code>userId</code></td>
    <td>title, message, type (info, success, warning), isRead</td>
    <td>In-app alert delivery system for staff task dispatching.</td>
  </tr>
  <tr>
    <td><strong>AuditLog</strong></td>
    <td>PK: <code>id</code> (UUID)<br>FK: <code>userId</code></td>
    <td>action, entity, entityId, metadata (JSON), ipAddress</td>
    <td>Tamper-proof compliance log of all data mutation operations.</td>
  </tr>
</table>
`;

module.exports = {
  dataDictionaryHtml
};
