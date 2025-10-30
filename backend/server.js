const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// ==========================
// SAMPLE IN-MEMORY DATABASE
// ==========================
let students = [
  { id: 1, name: "John Doe", program: "BSIT", year_level: "4th Year" },
  { id: 2, name: "Jane Smith", program: "BSBA", year_level: "3rd Year" },
];

let feeCategories = [
  { id: 1, name: "Tuition Fees" },
  { id: 2, name: "Miscellaneous" },
  { id: 3, name: "Midterm" },
  { id: 4, name: "Final" },
];

let payments = [
  {
    id: 1,
    student_id: 1,
    amount: 2000,
    purpose: "Midterm",
    mode_of_payment: "GCASH",
    status: "Paid",
    date_paid: "2025-10-29",
  },
];

let transactionLogs = [];

// ==========================
// ROUTES
// ==========================

// ✅ Home route
app.get("/", (req, res) => {
  res.json({ message: "School Accounting Management API is running" });
});

// ==========================
// 🎓 STUDENTS
// ==========================

// Get all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// Get one student
app.get("/api/students/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

// ==========================
// 💰 PAYMENTS
// ==========================

// Get all payments
app.get("/api/payments", (req, res) => {
  res.json(payments);
});

// Get single payment
app.get("/api/payments/:id", (req, res) => {
  const payment = payments.find((p) => p.id === parseInt(req.params.id));
  if (!payment) return res.status(404).json({ message: "Payment not found" });
  res.json(payment);
});

// Add payment
app.post("/api/payments", (req, res) => {
  const newPayment = {
    id: payments.length + 1,
    ...req.body,
  };
  payments.push(newPayment);

  transactionLogs.push({
    action: "ADD_PAYMENT",
    details: newPayment,
    date: new Date().toISOString(),
  });

  res
    .status(201)
    .json({ message: "Payment added successfully", data: newPayment });
});

// Update payment
app.put("/api/payments/:id", (req, res) => {
  const payment = payments.find((p) => p.id === parseInt(req.params.id));
  if (!payment) return res.status(404).json({ message: "Payment not found" });

  Object.assign(payment, req.body);

  transactionLogs.push({
    action: "UPDATE_PAYMENT",
    details: payment,
    date: new Date().toISOString(),
  });

  res.json({ message: "Payment updated successfully", data: payment });
});

// Delete payment
app.delete("/api/payments/:id", (req, res) => {
  const index = payments.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: "Payment not found" });

  const deleted = payments.splice(index, 1)[0];
  transactionLogs.push({
    action: "DELETE_PAYMENT",
    details: deleted,
    date: new Date().toISOString(),
  });

  res.json({ message: "Payment deleted successfully" });
});

// ==========================
// 🧾 FEE CATEGORIES
// ==========================

// Get all fee categories
app.get("/api/fees", (req, res) => {
  res.json(feeCategories);
});

// Add new category
app.post("/api/fees", (req, res) => {
  const newFee = {
    id: feeCategories.length + 1,
    ...req.body,
  };
  feeCategories.push(newFee);
  res.status(201).json({ message: "Fee category added", data: newFee });
});

// Delete fee category
app.delete("/api/fees/:id", (req, res) => {
  const index = feeCategories.findIndex(
    (f) => f.id === parseInt(req.params.id)
  );
  if (index === -1)
    return res.status(404).json({ message: "Category not found" });

  feeCategories.splice(index, 1);
  res.json({ message: "Fee category deleted" });
});

// ==========================
// 🧾 TRANSACTION LOGS
// ==========================

// Get all logs
app.get("/api/logs", (req, res) => {
  res.json(transactionLogs);
});

// Clear logs
app.delete("/api/logs", (req, res) => {
  transactionLogs = [];
  res.json({ message: "All logs cleared" });
});

// ==========================
// SERVER START
// ==========================
app.listen(3001, () => {
  console.log("✅ Server running on port 3001");
});
