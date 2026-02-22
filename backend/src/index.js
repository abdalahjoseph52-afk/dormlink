require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./config/supabase');

// Import routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const hostelRoutes = require('./routes/hostelRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const studentRoutes = require('./routes/studentRoutes');
const hostRoutes    = require('./routes/hostRoutes');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://dormlink-nine.vercel.app',
  ],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/host',    hostRoutes);
app.use('/api/hostels', hostelRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);


// Test routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to DormLink API', status: 'Server is running', version: '1.0.0' });
});

app.get('/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase.from('universities').select('*');
    if (error) throw error;
    res.json({ message: 'Database connected!', universities: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`DormLink server running on port ${PORT}`);
  console.log('JWT_SECRET loaded:', !!process.env.JWT_SECRET);
  console.log('SUPABASE_URL loaded:', !!process.env.SUPABASE_URL);
});
