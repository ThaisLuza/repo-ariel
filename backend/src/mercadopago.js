import MercadoPago, { Preference } from "mercadopago";

const client = new MercadoPago({ accessToken: process.env.MP_ACCESS_TOKEN });
const APP_BASE_URL =
  process.env.APP_BASE_URL ||
  process.env.MP_WEBHOOK_URL?.replace("/api/webhook/payment", "");

// Planos disponíveis
const PLANS = {
  "first-step-start": {
    title: "Mentoria First Step - Plano START (2h)",
    unit_price: 389.47,
  },
  "first-step-essential": {
    title: "Mentoria First Step - Plano ESSENTIAL (5h)",
    unit_price: 657.15,
  },
  "first-step-master": {
    title: "Mentoria First Step - Plano MASTER (10h)",
    unit_price: 1255.67,
  },
  "urban-driver-start": {
    title: "Mentoria Urban Driver - Plano START (2h)",
    unit_price: 400.0,
  },
  "urban-driver-essential": {
    title: "Mentoria Urban Driver - Plano ESSENTIAL (5h)",
    unit_price: 800.0,
  },
  "urban-driver-master": {
    title: "Mentoria Urban Driver - Plano MASTER (10h)",
    unit_price: 1400.0,
  },
  "road-master-start": {
    title: "Mentoria Road Master - Plano START (2h)",
    unit_price: 500.0,
  },
  "road-master-essential": {
    title: "Mentoria Road Master - Plano ESSENTIAL (5h)",
    unit_price: 1150.0,
  },
  "road-master-master": {
    title: "Mentoria Road Master - Plano MASTER (10h)",
    unit_price: 2000.0,
  },
};

export async function createPaymentPreference({ name, email, phone, plan }) {
  const selectedPlan = PLANS[plan];

  if (!selectedPlan) {
    throw new Error("Plano inválido para cobrança");
  }

  const preference = new Preference(client);

  const response = await preference.create({
    body: {
      items: [
        {
          title: selectedPlan.title,
          quantity: 1,
          unit_price: selectedPlan.unit_price,
          currency_id: "BRL",
        },
      ],
      payer: {
        name,
        email,
        phone: phone
          ? { area_code: phone.slice(0, 2), number: phone.slice(2) }
          : undefined,
      },
      back_urls: {
        success: `${APP_BASE_URL}/payment/success`,
        failure: `${APP_BASE_URL}/payment/failure`,
        pending: `${APP_BASE_URL}/payment/failure`,
      },
      auto_return: "approved",
      notification_url: process.env.MP_WEBHOOK_URL,
      metadata: { customer_name: name, customer_phone: phone, plan_name: plan },
    },
  });

  return response;
}
