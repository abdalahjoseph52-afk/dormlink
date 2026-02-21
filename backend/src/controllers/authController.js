const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ─────────────────────────────────────────
// REGISTER
// ─────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone, role } = req.body;

    // 1. Validate required fields
    if (!email || !password || !first_name || !last_name || !role) {
      return res.status(400).json({
        error: 'Please provide email, password, first name, last name, and role'
      });
    }

    // 2. Only allow valid roles on registration
    if (!['student', 'host'].includes(role)) {
      return res.status(400).json({
        error: 'Role must be either student or host'
      });
    }

    // 3. Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // 4. Hash the password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 5. Save user to database
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{
        email,
        password_hash,
        first_name,
        last_name,
        phone: phone || null,
        role
      }])
      .select()
      .single();

    if (error) throw error;

    // 6. Generate token
    const token = generateToken(newUser);

    // 7. Return user data (never return the password)
    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        role: newUser.role,
        phone: newUser.phone
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// ─────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt for:', email);
    console.log('Password received:', password);

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single();

    console.log('User found:', user ? 'YES' : 'NO');
    console.log('DB error:', error);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!user.is_active) {
      return res.status(403).json({ error: 'Your account has been suspended' });
    }

    console.log('Hash from DB:', user.password_hash);

    const isMatch = await bcrypt.compare(password, user.password_hash);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        phone: user.phone,
        is_verified: user.is_verified
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};
// ─────────────────────────────────────────
// GET CURRENT USER (Me)
// ─────────────────────────────────────────
const getMe = async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, phone, role, is_verified, profile_image, created_at')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });

  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { register, login, getMe };