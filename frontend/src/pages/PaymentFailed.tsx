import { useSearchParams, Link } from "react-router-dom";

export default function PaymentFailed() {
  const [params] = useSearchParams();
  const status = params.get("status"); // "rejected" | "pending"

  const isPending = status === "pending" || status === null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="rounded-2xl border border-border bg-card p-10 shadow-lg max-w-md w-full">
        <div className="text-5xl mb-4">{isPending ? "⏳" : "❌"}</div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {isPending ? "Pagamento pendente" : "Pagamento recusado"}
        </h1>
        <p className="text-muted-foreground mb-6">
          {isPending
            ? "Seu pagamento está sendo processado. Você receberá uma confirmação por e-mail assim que aprovado."
            : "Não conseguimos processar seu pagamento. Verifique os dados do cartão e tente novamente."}
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="rounded-xl bg-primary hover:opacity-90 transition-opacity text-primary-foreground font-semibold px-6 py-3"
          >
            Voltar para o início
          </Link>
          {!isPending && (
            <Link
              to="/#programas"
              className="rounded-xl border border-border hover:bg-accent transition-colors text-foreground font-semibold px-6 py-3"
            >
              Tentar novamente
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
