// api/waitlist.js
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, target_brand, target_size } = req.body || {};

    // Strict Input Validation
    if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 100) {
      return res.status(400).json({ error: 'A valid email address under 100 characters is required.' });
    }

    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
      return res.status(400).json({ error: 'A valid name under 100 characters is required.' });
    }

    if (!target_brand || typeof target_brand !== 'string' || target_brand.trim().length === 0 || target_brand.length > 100) {
      return res.status(400).json({ error: 'A target brand selection is required.' });
    }

    if (!target_size || typeof target_size !== 'string' || target_size.trim().length === 0 || target_size.length > 100) {
      return res.status(400).json({ error: 'A target size selection is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanBrand = target_brand.trim();
    const cleanSize = target_size.trim();

    const DB_ID = 'f5d9abbb-8d6c-4f80-bccb-594b48d91cbf';

    // Check for duplicate email
    const readRes = await fetch(`https://app.baget.ai/api/public/databases/${DB_ID}/rows`);
    if (!readRes.ok) {
      console.error('Failed to query database for duplicates');
      return res.status(500).json({ error: 'Internal database verification error' });
    }

    const { rows } = await readRes.json();
    const isDuplicate = rows && rows.some(row => row.data && row.data.email && row.data.email.toLowerCase().trim() === cleanEmail);

    if (isDuplicate) {
      return res.status(400).json({ error: 'This email is already registered on our waitlist.' });
    }

    // Insert into Baget DB
    const insertRes = await fetch(`https://app.baget.ai/api/public/databases/${DB_ID}/rows`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          email: cleanEmail,
          name: cleanName,
          target_brand: cleanBrand,
          target_size: cleanSize
        }
      })
    });

    if (!insertRes.ok) {
      const errText = await insertRes.text();
      console.error('Failed to write to database:', errText);
      return res.status(500).json({ error: 'Database insertion failed' });
    }

    console.log(`[Success Log] Waitlist entry registered successfully: ${cleanEmail} (${cleanName})`);

    return res.status(201).json({
      success: true,
      message: 'Welcome to the mill. Sizing profile and early-access spot locked.'
    });

  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
