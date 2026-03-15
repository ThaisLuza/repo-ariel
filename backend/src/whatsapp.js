import axios from "axios";

const BASE_URL = process.env.EVOLUTION_API_URL;
const API_KEY = process.env.EVOLUTION_API_KEY;
const INSTANCE = process.env.EVOLUTION_INSTANCE;

/**
 * phone: número com DDI e DDD, somente dígitos. Ex: 5554999991234
 */
export async function sendWhatsApp({ phone, name, plan, orderId }) {
  // Limpa o número — garante apenas dígitos
  const cleanPhone = String(phone).replace(/\D/g, "");

  // Validação: número deve ter pelo menos 11 dígitos (DDI + DDD + número)
  if (!cleanPhone || cleanPhone.length < 11) {
    console.error(
      `WhatsApp inválido: ${phone} (${cleanPhone}). Esperado: DDI + DDD + número (ex: 5554999991234)`,
    );
    throw new Error(`Número de WhatsApp inválido: ${cleanPhone}`);
  }

  const message =
    `✅ *Pagamento confirmado!*\n\n` +
    `Olá, *${name}*! 🎉\n\n` +
    `Seu pagamento do plano *${plan}* foi aprovado com sucesso.\n` +
    `Pedido: #${orderId}\n\n` +
    `Em breve nossa equipe entrará em contato para dar os próximos passos.\n\n` +
    `Qualquer dúvida, é só responder aqui.\n\n` +
    `_AHEAD Drive & Safety_ 🚗`;

  try {
    await axios.post(
      `${BASE_URL}/message/sendText/${INSTANCE}`,
      { number: cleanPhone, text: message },
      { headers: { apikey: API_KEY } },
    );
    console.log(`WhatsApp enviado para ${cleanPhone}`);
  } catch (err) {
    console.error(
      "Erro ao enviar WhatsApp:",
      err?.response?.data || err.message,
    );
    throw err;
  }
}
