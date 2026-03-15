import MercadoPago, { Payment } from "mercadopago";
import { saveOrder, updateOrderStatus } from "./db.js";
import { sendWhatsApp } from "./whatsapp.js";
import { sendEmail } from "./email.js";

const client = new MercadoPago({ accessToken: process.env.MP_ACCESS_TOKEN });

export async function handleWebhook(req, res) {
  try {
    const body = JSON.parse(req.body.toString());

    // Mercado Pago envia type = "payment" quando um pagamento é processado
    if (body.type !== "payment") {
      console.log(`Webhook ignorado - tipo: ${body.type}`);
      return res.sendStatus(200);
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      console.log("Webhook recebido sem ID de pagamento");
      return res.sendStatus(200);
    }

    console.log(`Processando webhook de pagamento: ${paymentId}`);

    // Busca os detalhes do pagamento na API do MP
    const paymentApi = new Payment(client);
    const payment = await paymentApi.get({ id: paymentId });

    const { status, payer, metadata, transaction_amount, description } =
      payment;

    const customerName =
      metadata?.customer_name || payer?.first_name || "Cliente";
    const customerEmail = payer?.email;
    // Prioriza metadata (enviado pelo frontend), depois tenta payer.phone
    let customerPhone = metadata?.customer_phone;
    if (!customerPhone && payer?.phone) {
      const areaCode = payer.phone.area_code || "";
      const number = payer.phone.number || "";
      customerPhone = areaCode + number;
    }
    const planName = metadata?.plan_name || description || "Plano";

    console.log(
      `Pagamento ${paymentId}: ${status} - ${customerName} (${customerEmail})`,
    );

    // Salva / atualiza no banco
    const order = await saveOrder({
      mpPaymentId: String(paymentId),
      mpPreferenceId: payment.preference_id,
      customerName,
      customerEmail,
      customerPhone,
      planName,
      amount: transaction_amount,
      status,
    });

    // Só dispara notificações se o pagamento foi aprovado
    if (status === "approved") {
      await updateOrderStatus(order.id, "approved");

      // Mensagem WhatsApp
      if (customerPhone) {
        try {
          await sendWhatsApp({
            phone: customerPhone,
            name: customerName,
            plan: planName,
            orderId: order.id,
          });
          await updateOrderStatus(order.id, "approved", { whatsappSent: true });
        } catch (whatsappErr) {
          console.error(
            `Erro ao enviar WhatsApp para ${customerPhone}:`,
            whatsappErr.message,
          );
          // Continua mesmo com erro de WhatsApp
        }
      }

      // E-mail de confirmação
      if (customerEmail) {
        try {
          await sendEmail({
            to: customerEmail,
            name: customerName,
            plan: planName,
            amount: transaction_amount,
            orderId: order.id,
          });
          await updateOrderStatus(order.id, "approved", { emailSent: true });
        } catch (emailErr) {
          console.error(
            `Erro ao enviar e-mail para ${customerEmail}:`,
            emailErr.message,
          );
          // Continua mesmo com erro de e-mail
        }
      }
    } else {
      console.log(`Pagamento ${paymentId} não aprovado - status: ${status}`);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro no webhook:", err);
    res.sendStatus(500);
  }
}
