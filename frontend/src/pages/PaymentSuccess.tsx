import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// ⚠️ Troque pelo número real com DDI (sem + ou espaços)
const WHATSAPP_NUMBER = "5554999999999";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const paymentId = params.get("payment_id");
  const status = params.get("status"); // "approved"
  const preferenceId = params.get("preference_id");

  useEffect(() => {
    if (status !== "approved") return;

    const message = encodeURIComponent(
      `Olá! Acabei de concluir meu pagamento (ID: ${paymentId}) e estou aguardando os próximos passos. 😊`,
    );

    // Redireciona para WhatsApp após 3s
    const timer = setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    }, 3000);

    return () => clearTimeout(timer);
  }, [status, paymentId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="rounded-2xl border border-border bg-card p-10 shadow-lg max-w-md w-full">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Pagamento confirmado!
        </h1>
        <p className="text-muted-foreground mb-6">
          Obrigado pela sua compra. Em instantes você receberá uma mensagem no
          WhatsApp e um e-mail de confirmação.
        </p>
        {paymentId && (
          <p className="text-sm text-muted-foreground mb-6">
            Pedido:{" "}
            <span className="font-mono font-semibold">#{paymentId}</span>
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          Abrindo WhatsApp automaticamente em 3 segundos…
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            `Olá! Acabei de realizar meu pagamento (ID: ${paymentId}).`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-xl bg-green-500 hover:bg-green-600 transition-colors text-white font-semibold px-6 py-3"
        >
          Abrir WhatsApp agora
        </a>
      </div>
    </div>
  );
}
