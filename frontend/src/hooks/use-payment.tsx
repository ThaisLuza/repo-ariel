import { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

interface PaymentInput {
  name: string;
  email: string;
  phone: string; // somente dígitos com DDI: 5554999991234
  plan: string;
}

// Valida telefone com DDI (ex: 5554999991234)
function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 11; // Mínimo: DDI (2) + DDD (2) + número (7)
}

interface CreatePaymentResponse {
  checkoutUrl: string;
}

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startPayment(data: PaymentInput) {
    setLoading(true);
    setError(null);

    try {
      // Validação do telefone
      if (data.phone && !validatePhone(data.phone)) {
        throw new Error(
          "Telefone inválido. Use formato com DDI (ex: 5554999991234)",
        );
      }

      // Limpa o telefone para enviar apenas dígitos
      const cleanedPhone = data.phone.replace(/\D/g, "");

      const { data: response } = await axios.post<CreatePaymentResponse>(
        `${BACKEND_URL}/api/create-payment`,
        { ...data, phone: cleanedPhone },
      );

      const { checkoutUrl } = response;
      // Redireciona para o checkout do Mercado Pago
      window.location.href = checkoutUrl;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(
          e.response?.data?.error ||
            e.response?.data?.message ||
            e.message ||
            "Erro ao criar pagamento",
        );
      } else {
        setError(e instanceof Error ? e.message : "Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  }

  return { startPayment, loading, error };
}
