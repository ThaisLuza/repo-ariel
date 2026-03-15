import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePayment } from "@/hooks/use-payment";
import { toast } from "sonner";

const programs = [
  {
    icon: GraduationCap,
    title: "Mentoria First Step",
    subtitle: "Primeira Habilitação B",
    tagline: "Do nervosismo à aprovação: a jornada AHEAD começa aqui.",
    desc: "Focamos em controle emocional, legislação aplicada e a técnica precisa para você conquistar sua liberdade com segurança e calma.",
    plans: [
      {
        name: "START",
        hours: "2h",
        price: "R$ 389,47",
        highlight: false,
        desc: "Foco em ajustes de precisão e foco emocional.",
        paymentPlanId: "first-step-start",
      },
      {
        name: "ESSENTIAL",
        hours: "5h",
        price: "R$ 657,15",
        highlight: true,
        desc: "Domínio do veículo e aperfeiçoamento de Normas de Circulação.",
        paymentPlanId: "first-step-essential",
      },
      {
        name: "MASTER",
        hours: "10h",
        price: "R$ 1.255,67",
        highlight: false,
        desc: "Foco em autonomia. Equilíbrio ideal entre técnica e controle emocional. Segurança total.",
        paymentPlanId: "first-step-master",
      },
    ],
    installment: "3x sem juros no cartão ou até 6x com juros",
    note: "Após a CNH, você estará apto para nossa Mentoria Urbana.",
  },
  {
    icon: MapPin,
    title: "Mentoria Urban Driver",
    subtitle: "Aperfeiçoamento Urbano",
    tagline: "Domine a selva de pedra.",
    desc: "Desenvolva agilidade em cruzamentos, confiança em estacionamentos e a capacidade de antecipar erros de terceiros. A segurança que você precisa para encarar o trânsito diário de frente.",
    plans: [
      {
        name: "START",
        hours: "2h",
        price: "R$ 400,00",
        highlight: false,
        desc: "Checklist de Inspeção Veicular + Avaliação de Perfil de Condução.",
        paymentPlanId: "urban-driver-start",
      },
      {
        name: "ESSENTIAL",
        hours: "5h",
        price: "R$ 800,00",
        highlight: true,
        desc: "Mentoria de Gestão de Estresse no Trânsito + Dicas de Direção Econômica.",
        paymentPlanId: "urban-driver-essential",
      },
      {
        name: "MASTER",
        hours: "10h",
        price: "R$ 1.400,00",
        highlight: false,
        desc: "Protocolo de Segurança + Mentoria Comportamental para CNH.",
        paymentPlanId: "urban-driver-master",
      },
    ],
    installment: "Até 6x sem juros no cartão",
    note: null,
  },
  {
    icon: Mountain,
    title: "Mentoria Road Master",
    subtitle: "Especialização Rodoviária",
    tagline: "Autoridade em rodovias: prepare seu veículo e sua mente.",
    desc: "Treinamento de alta performance focado em gestão de velocidade, mecânica preventiva para longas distâncias e técnicas avançadas de ultrapassagem. A estrada não terá segredos para você.",
    plans: [
      {
        name: "START",
        hours: "2h",
        price: "R$ 500,00",
        highlight: false,
        desc: "Blindagem Emocional — Mantenha o foco e a calma, eliminando o nervosismo.",
        paymentPlanId: "road-master-start",
      },
      {
        name: "ESSENTIAL",
        hours: "5h",
        price: "R$ 1.150,00",
        highlight: true,
        desc: "Direção com Propósito — Leia o trânsito com antecedência, antecipando riscos.",
        paymentPlanId: "road-master-essential",
      },
      {
        name: "MASTER",
        hours: "10h",
        price: "R$ 2.000,00",
        highlight: false,
        desc: "Técnica Refinada — Domínio do pedal à ultrapassagem + planejamento de percurso.",
        paymentPlanId: "road-master-master",
      },
    ],
    installment: "Até 6x sem juros no cartão",
    note: null,
  },
];

const ProgramsSection = () => {
  const { startPayment, loading, error } = usePayment();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedPlanName, setSelectedPlanName] = useState<string>("");

  const handleSelectPlan = (planId: string, planName: string) => {
    setSelectedPlanId(planId);
    setSelectedPlanName(planName);
    setIsPaymentModalOpen(true);
    toast.info("Preencha seus dados para continuar com o pagamento.");
  };

  const handlePayment = async () => {
    if (!selectedPlanId) {
      toast.error("Selecione um plano para efetuar o pagamento.");
      return;
    }

    if (!name.trim() || !email.trim()) {
      toast.error("Preencha nome e e-mail para efetuar o pagamento.");
      return;
    }

    await startPayment({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      plan: selectedPlanId,
    });
  };

  return (
    <section id="programas" className="py-24 bg-secondary/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-electric font-heading font-semibold text-sm tracking-widest uppercase mb-3">
            Programas de Mentoria
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Escolha seu nível de evolução
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada programa é desenhado com base em Engenharia Comportamental para
            transformar sua relação com o volante.
          </p>
        </motion.div>

        <div className="space-y-16">
          {programs.map((prog, idx) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-card rounded-2xl shadow-card overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center shrink-0">
                    <prog.icon className="w-6 h-6 text-electric" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">
                      {prog.title}
                    </h3>
                    <p className="text-electric font-medium text-sm">
                      {prog.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-lg font-heading font-semibold text-navy mb-2 italic">
                  {prog.tagline}
                </p>
                <p className="text-muted-foreground mb-8 max-w-2xl">
                  {prog.desc}
                </p>

                {/* Plans grid */}
                <div id="planos" className="grid md:grid-cols-3 gap-4">
                  {prog.plans.map((plan) => (
                    <div
                      key={plan.name}
                      className={`rounded-2xl p-6 border-2 transition-all flex flex-col ${
                        selectedPlanId === plan.paymentPlanId
                          ? "border-green-500 bg-green-50/40 shadow-card-hover"
                          : plan.highlight
                            ? "border-electric bg-electric/5 shadow-card-hover"
                            : "border-border hover:border-electric/30"
                      }`}
                    >
                      {plan.highlight && (
                        <span className="inline-block text-xs font-heading font-bold text-electric uppercase tracking-wider mb-2">
                          Recomendado
                        </span>
                      )}
                      <h4 className="font-heading font-bold text-lg mb-1">
                        Plano {plan.name}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-2">
                        {plan.hours} de mentoria
                      </p>
                      <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                        {plan.desc}
                      </p>
                      <p className="text-2xl font-extrabold text-navy mb-4">
                        {plan.price}
                      </p>
                      <Button
                        variant={plan.highlight ? "hero" : "heroOutline"}
                        className={`w-full mt-auto ${
                          selectedPlanId === plan.paymentPlanId
                            ? "border-green-600 bg-green-600 text-white hover:bg-green-700"
                            : ""
                        }`}
                        onClick={() =>
                          handleSelectPlan(
                            plan.paymentPlanId,
                            `${prog.title} - Plano ${plan.name}`,
                          )
                        }
                        disabled={loading}
                      >
                        Selecionar Plano
                      </Button>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  {prog.installment}**
                </p>
                {prog.note && (
                  <p className="text-xs text-electric/80 mt-2 italic">
                    {prog.note}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Para reserva de planos com mais de 10h aula, contate-nos via
                  WhatsApp.
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {isPaymentModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setIsPaymentModalOpen(false)}
          >
            <div
              className="w-full max-w-xl rounded-2xl bg-card border border-border p-6 md:p-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold">Dados para pagamento</h3>
                  {selectedPlanName && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Plano selecionado:{" "}
                      <span className="font-semibold text-foreground">
                        {selectedPlanName}
                      </span>
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground text-xl leading-none"
                  onClick={() => setIsPaymentModalOpen(false)}
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-name">Nome completo</Label>
                  <Input
                    id="payment-name"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-email">E-mail</Label>
                  <Input
                    id="payment-email"
                    type="email"
                    placeholder="voce@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-phone">WhatsApp (opcional)</Label>
                  <Input
                    id="payment-phone"
                    placeholder="5554999991234"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsPaymentModalOpen(false)}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  variant="hero"
                  className="border-green-600 bg-green-600 text-white hover:bg-green-700"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? "Redirecionando..." : "Efetuar pagamento"}
                </Button>
              </div>

              {error && (
                <p className="text-sm text-destructive mt-4">{error}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgramsSection;
