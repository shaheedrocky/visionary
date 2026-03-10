export function createVisionaryWelcomeEmail(name, clientURL) {
return `

<!DOCTYPE html>

<html>
<head>
<meta charset="UTF-8">
<title>Welcome to Visionary</title>
</head>

<body style="margin:0;padding:0;background:#0f172a;font-family:Segoe UI,Arial,sans-serif;">

<div style="max-width:600px;margin:auto;padding:30px;">

<!-- Card -->

<div style="
background:linear-gradient(135deg,#111827,#020617);
border-radius:16px;
padding:40px;
color:#e2e8f0;
box-shadow:0 10px 40px rgba(0,0,0,0.5);
">

<!-- Header -->

<div style="text-align:center;margin-bottom:30px;">
<h1 style="margin:0;font-size:28px;color:#ffffff;">Visionary ✨</h1>
<p style="margin-top:6px;color:#94a3b8;font-size:14px;">
Your AI creative workspace
</p>
</div>

<!-- Greeting -->

<h2 style="margin-bottom:10px;color:#ffffff;">Welcome ${name} 👋</h2>

<p style="color:#cbd5e1;font-size:15px;">
Thanks for joining <strong>Visionary</strong>.  
You can now start chatting with AI, generate images, and turn ideas into reality.
</p>

<!-- AI preview card -->

<div style="
background:#020617;
padding:20px;
border-radius:12px;
margin:25px 0;
">

<div style="
background:#1e293b;
padding:12px 16px;
border-radius:10px;
display:inline-block;
font-size:14px;
color:#e2e8f0;
margin-bottom:15px;
">
Create an image of a girl on a beach with ocean waves 🌊
</div>

<div style="display:flex;gap:10px;">
<div style="flex:1;height:80px;border-radius:10px;background:linear-gradient(135deg,#fb923c,#f43f5e);"></div>
<div style="flex:1;height:80px;border-radius:10px;background:linear-gradient(135deg,#38bdf8,#6366f1);"></div>
<div style="flex:1;height:80px;border-radius:10px;background:linear-gradient(135deg,#34d399,#06b6d4);"></div>
</div>

</div>

<!-- CTA -->

<div style="text-align:center;margin-top:30px;">
<a href="${clientURL}" style="
background:#6366f1;
color:#ffffff;
padding:14px 28px;
border-radius:8px;
text-decoration:none;
font-weight:600;
display:inline-block;
">
Open Your Dashboard
</a>
</div>

<!-- Footer -->

<p style="margin-top:35px;font-size:13px;color:#94a3b8;">
If you have any questions, our team is always here to help.
</p>

<p style="margin-top:20px;font-size:14px;">
— The Visionary Team
</p>

</div>

<!-- Bottom -->

<div style="text-align:center;font-size:12px;color:#64748b;margin-top:20px;">
© ${new Date().getFullYear()} Visionary AI. All rights reserved.
</div>

</div>

</body>
</html>
`;
}
