require('dotenv').config();
const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function createAdmin() {
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
  console.log('KEY exists:', !!process.env.SUPABASE_ANON_KEY);

  const password = 'admin123';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Delete existing admin
  await supabase
    .from('users')
    .delete()
    .eq('email', 'admin@dormlink.com');

  // Insert fresh admin
  const { data, error } = await supabase
    .from('users')
    .insert([{
      email: 'admin@dormlink.com',
      password_hash: hash,
      first_name: 'DormLink',
      last_name: 'Admin',
      phone: '0700000000',
      role: 'admin',
      is_verified: true,
      is_active: true
    }])
    .select()
    .single();

  if (error) {
    console.error('❌ Error:', error.message);
  } else {
    console.log('✅ Admin created successfully!');
    console.log('Email: admin@dormlink.com');
    console.log('Password: admin123');
  }

  process.exit();
}

createAdmin();
