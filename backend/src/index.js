import express from "express";
import cors from "cors";
import { createPaymentPreference } from "./mercadopago.js";
import { handleWebhook } from "./webhook.js";
import { savePreDiagnostic, markPreDiagnosticEmailSent } from "./db.js";
import { sendPreDiagnosticEmail } from "./email.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
  }),
);

// Webhook do Mercado Pago precisa do body RAW para validar assinatura
app.post(
  "/api/webhook/payment",
  express.raw({ type: "application/json" }),
  handleWebhook,
);

app.use(express.json());

// Cria preferência de pagamento MP e retorna o link de checkout
app.post("/api/create-payment", async (req, res) => {
  try {
    const { name, email, phone, plan } = req.body;

    if (!name || !email || !plan) {
      return res
        .status(400)
        .json({ error: "name, email e plan são obrigatórios" });
    }

    // Validação de telefone (se fornecido)
    if (phone) {
      const cleanPhone = String(phone).replace(/\D/g, "");
      if (cleanPhone.length < 11) {
        return res.status(400).json({
          error:
            "Telefone inválido. Formato esperado: DDI + DDD + número (ex: 5554999991234)",
        });
      }
    }

    const preference = await createPaymentPreference({
      name,
      email,
      phone,
      plan,
    });
    res.json({
      checkoutUrl: preference.init_point,
      preferenceId: preference.id,
    });
  } catch (err) {
    console.error("Erro ao criar pagamento:", err);
    res.status(500).json({ error: "Erro ao criar preferência de pagamento" });
  }
});

app.post("/api/pre-diagnostic", async (req, res) => {
  try {
    const {
      fullName,
      age,
      occupation,
      whatsapp,
      mainGoal,
      confidenceLevel,
      challenge,
      hasVehicle,
      vehicleModel,
      preferredShift,
    } = req.body;

    if (!fullName || !whatsapp || !mainGoal || !confidenceLevel) {
      return res.status(400).json({
        error:
          "fullName, whatsapp, mainGoal e confidenceLevel são obrigatórios",
      });
    }

    const savedLead = await savePreDiagnostic({
      fullName: String(fullName).trim(),
      age: age ? Number(age) : null,
      occupation: occupation ? String(occupation).trim() : null,
      whatsapp: String(whatsapp).replace(/\D/g, ""),
      mainGoal: String(mainGoal).trim(),
      confidenceLevel: Number(confidenceLevel),
      challenge: challenge ? String(challenge).trim() : null,
      hasVehicle:
        hasVehicle === undefined || hasVehicle === null
          ? null
          : Boolean(hasVehicle),
      vehicleModel: vehicleModel ? String(vehicleModel).trim() : null,
      preferredShift: preferredShift ? String(preferredShift).trim() : null,
    });

    await sendPreDiagnosticEmail({
      leadId: savedLead.id,
      data: {
        fullName: savedLead.full_name,
        age: savedLead.age,
        occupation: savedLead.occupation,
        whatsapp: savedLead.whatsapp,
        mainGoal: savedLead.main_goal,
        confidenceLevel: savedLead.confidence_level,
        challenge: savedLead.challenge,
        hasVehicle: savedLead.has_vehicle,
        vehicleModel: savedLead.vehicle_model,
        preferredShift: savedLead.preferred_shift,
      },
    });

    await markPreDiagnosticEmailSent(savedLead.id);

    res.status(201).json({
      message: "Pré-diagnóstico recebido com sucesso",
      id: savedLead.id,
    });
  } catch (err) {
    console.error("Erro ao receber pré-diagnóstico:", err);
    res.status(500).json({ error: "Erro ao enviar pré-diagnóstico" });
  }
});

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
