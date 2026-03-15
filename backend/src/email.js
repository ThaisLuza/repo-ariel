import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({ to, name, plan, amount, orderId }) {
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background:#f4f4f4; margin:0; padding:0; }
    .container { max-width:580px; margin:40px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,.08); }
    .header { background:#1a1a2e; color:#fff; padding:32px 40px; }
    .header h1 { margin:0; font-size:22px; font-weight:700; letter-spacing:1px; }
    .header p  { margin:6px 0 0; font-size:13px; opacity:.7; }
    .body { padding:32px 40px; color:#333; }
    .body h2 { margin-top:0; font-size:20px; color:#1a1a2e; }
    .info-box { background:#f8f9fa; border-left:4px solid #e63946; border-radius:8px; padding:16px 20px; margin:20px 0; }
    .info-box p { margin:6px 0; font-size:14px; }
    .info-box strong { color:#1a1a2e; }
    .footer { background:#f8f9fa; padding:20px 40px; text-align:center; font-size:12px; color:#999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AHEAD Drive & Safety</h1>
      <p>Confirmação de Pagamento</p>
    </div>
    <div class="body">
      <h2>Parabéns, ${name}! 🎉</h2>
      <p>Seu pagamento foi <strong>confirmado com sucesso</strong>. Estamos muito felizes em ter você conosco!</p>

      <div class="info-box">
        <p><strong>Pedido:</strong> #${orderId}</p>
        <p><strong>Plano:</strong> ${plan}</p>
        <p><strong>Valor:</strong> ${formatted}</p>
        <p><strong>Status:</strong> ✅ Aprovado</p>
      </div>

      <p>Nossa equipe entrará em contato em breve pelo WhatsApp para alinhar os próximos passos da sua mentoria.</p>
      <p>Se tiver qualquer dúvida, responda este e-mail ou nos chame no WhatsApp.</p>
      <p style="margin-top:32px;">Com gratidão,<br/><strong>Equipe AHEAD Drive & Safety</strong></p>
    </div>
    <div class="footer">© ${new Date().getFullYear()} AHEAD Consultoria e Negócios — Todos os direitos reservados</div>
  </div>
</body>
</html>`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `✅ Pagamento confirmado – ${plan} | AHEAD Drive & Safety`,
    html,
  });

  console.log(`E-mail enviado para ${to}`);
}

export async function sendPreDiagnosticEmail({ data, leadId }) {
  const to = process.env.PRE_DIAGNOSTIC_EMAIL_TO || process.env.EMAIL_FROM;

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background:#f4f4f4; margin:0; padding:0; }
    .container { max-width:620px; margin:30px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,.08); }
    .header { background:#1a1a2e; color:#fff; padding:24px 28px; }
    .header h1 { margin:0; font-size:20px; }
    .body { padding:24px 28px; color:#333; }
    .row { padding:10px 0; border-bottom:1px solid #eee; }
    .label { color:#666; font-size:12px; text-transform:uppercase; letter-spacing:.4px; }
    .value { color:#1a1a2e; font-size:15px; margin-top:4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Novo Pré-Diagnóstico #${leadId}</h1>
    </div>
    <div class="body">
      <div class="row"><div class="label">Nome</div><div class="value">${data.fullName}</div></div>
      <div class="row"><div class="label">Idade</div><div class="value">${data.age || "Não informado"}</div></div>
      <div class="row"><div class="label">Ocupação</div><div class="value">${data.occupation || "Não informado"}</div></div>
      <div class="row"><div class="label">WhatsApp</div><div class="value">${data.whatsapp}</div></div>
      <div class="row"><div class="label">Objetivo principal</div><div class="value">${data.mainGoal}</div></div>
      <div class="row"><div class="label">Nível de confiança</div><div class="value">${data.confidenceLevel}</div></div>
      <div class="row"><div class="label">Maior desafio</div><div class="value">${data.challenge || "Não informado"}</div></div>
      <div class="row"><div class="label">Possui veículo</div><div class="value">${data.hasVehicle === null ? "Não informado" : data.hasVehicle ? "Sim" : "Não"}</div></div>
      <div class="row"><div class="label">Modelo/Ano</div><div class="value">${data.vehicleModel || "Não informado"}</div></div>
      <div class="row"><div class="label">Turno preferido</div><div class="value">${data.preferredShift || "Não informado"}</div></div>
    </div>
  </div>
</body>
</html>`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `📩 Novo Pré-Diagnóstico #${leadId} - ${data.fullName}`,
    html,
  });

  console.log(`Pré-diagnóstico enviado por e-mail para ${to}`);
}
