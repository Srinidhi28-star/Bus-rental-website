const http       = require('http');
const fs         = require('fs');
const path       = require('path');
const nodemailer = require('nodemailer');

/* ============================================================
   SMTP CONFIGURATION — fill in your email credentials
   For Gmail: enable "App Passwords" at
   https://myaccount.google.com/apppasswords
   and use the generated 16-char password below.
   ============================================================ */
const SMTP_CONFIG = {
  host:     'smtp.gmail.com',   // or smtp.outlook.com, etc.
  port:     587,
  secure:   false,              // true for port 465
  auth: {
    user: 'mvaishalini59@gmail.com',
    pass: 'peip ueqp znzn eosl'
  }
};

const FROM_NAME  = 'DriveEase';
const FROM_EMAIL = SMTP_CONFIG.auth.user;/* ============================================================ */

const transporter = nodemailer.createTransport(SMTP_CONFIG);

// In-memory OTP store: { email -> { otp, expiry, name } }
const otpStore = {};

// Static file MIME types
const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon'
};

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(body)); }
      catch { reject(new Error('Invalid JSON')); }
    });
  });
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function handleSendOtp(req, res) {
  const { name, email } = await readBody(req);
  if (!name || !email) return sendJson(res, 400, { error: 'name and email required' });

  const otp    = generateOtp();
  const expiry = Date.now() + 2 * 60 * 1000; // 2 minutes
  otpStore[email.toLowerCase()] = { otp, expiry, name };

  try {
    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to:   email,
      subject: 'Your DriveEase Verification OTP',
      html: `
        <div style="font-family:'Segoe UI',sans-serif;max-width:480px;margin:auto;padding:32px;border-radius:12px;border:1px solid #e5e7eb;">
          <h2 style="color:#1a1a2e;margin-bottom:4px;">
            <span style="color:#f59e0b;">Drive</span>Ease — Email Verification
          </h2>
          <p style="color:#4b5563;">Hi <strong>${name}</strong>, use the OTP below to verify your account.</p>
          <div style="background:#f9fafb;border-radius:10px;padding:24px;text-align:center;margin:24px 0;">
            <span style="font-size:2.5rem;font-weight:800;letter-spacing:12px;color:#1a1a2e;">${otp}</span>
          </div>
          <p style="color:#6b7280;font-size:0.875rem;">This code expires in <strong>2 minutes</strong>. Do not share it with anyone.</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;">
          <p style="color:#9ca3af;font-size:0.75rem;">If you didn't request this, ignore this email.</p>
        </div>
      `
    });
    sendJson(res, 200, { success: true });
  } catch (err) {
    console.error('SMTP error:', err.message);
    sendJson(res, 500, { error: 'Failed to send email. Check SMTP config.' });
  }
}

async function handleVerifyOtp(req, res) {
  const { email, otp } = await readBody(req);
  if (!email || !otp) return sendJson(res, 400, { error: 'email and otp required' });

  const record = otpStore[email.toLowerCase()];
  if (!record)              return sendJson(res, 400, { error: 'No OTP found for this email.' });
  if (Date.now() > record.expiry) {
    delete otpStore[email.toLowerCase()];
    return sendJson(res, 400, { error: 'OTP has expired. Please resend.' });
  }
  if (record.otp !== otp)   return sendJson(res, 400, { error: 'Incorrect OTP.' });

  delete otpStore[email.toLowerCase()];
  sendJson(res, 200, { success: true });
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST' });
    return res.end();
  }

  // API routes
  if (req.method === 'POST' && req.url === '/api/send-otp') {
    try { await handleSendOtp(req, res); }
    catch (e) { sendJson(res, 500, { error: e.message }); }
    return;
  }
  if (req.method === 'POST' && req.url === '/api/verify-otp') {
    try { await handleVerifyOtp(req, res); }
    catch (e) { sendJson(res, 500, { error: e.message }); }
    return;
  }

  // Static file serving — strip query string before resolving path
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(__dirname, urlPath === '/' ? 'login.html' : urlPath);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });
});

server.listen(8080, () => console.log('DriveEase server running at http://localhost:8080'));
