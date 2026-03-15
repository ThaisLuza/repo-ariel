import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [confidenceLevel, setConfidenceLevel] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const vehicleOption = String(formData.get("veiculo") || "");

    const payload = {
      fullName: String(formData.get("nome") || "").trim(),
      age: formData.get("idade") ? Number(formData.get("idade")) : null,
      occupation: String(formData.get("ocupacao") || "").trim() || null,
      whatsapp: String(formData.get("whatsapp") || "").trim(),
      mainGoal: String(formData.get("objetivo") || "").trim(),
      confidenceLevel: Number(formData.get("confianca")),
      challenge: String(formData.get("desafio") || "").trim() || null,
      hasVehicle:
        vehicleOption === "Sim" ? true : vehicleOption === "Não" ? false : null,
      vehicleModel: String(formData.get("modelo") || "").trim() || null,
      preferredShift: String(formData.get("turno") || "").trim() || null,
    };

    try {
      await axios.post(`${BACKEND_URL}/api/pre-diagnostic`, payload);

      toast.success(
        "Pré-diagnóstico enviado com sucesso! Entraremos em contato via WhatsApp em até 24h.",
      );
      form.reset();
      setConfidenceLevel(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error ||
            error.message ||
            "Erro ao enviar formulário. Tente novamente.",
        );
      } else {
        toast.error("Erro ao enviar formulário. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-24 bg-background">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-electric font-heading font-semibold text-sm tracking-widest uppercase mb-3">
            Pré-Diagnóstico
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Solicitar Diagnóstico de Habilidade
          </h2>
          <p className="text-muted-foreground">
            Preencha o formulário e nossa equipe desenhará a estratégia de
            mentoria mais eficiente para o seu caso.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl shadow-card p-8 md:p-10 space-y-6"
        >
          {/* Bloco 1 */}
          <h3 className="text-lg font-bold text-navy">Identificação</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" required placeholder="Seu nome" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idade">Idade</Label>
              <Input id="idade" required type="number" placeholder="Ex: 25" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ocupacao">Ocupação</Label>
              <Input id="ocupacao" placeholder="Sua ocupação" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input id="whatsapp" required placeholder="(51) 99999-9999" />
            </div>
          </div>

          {/* Bloco 2 */}
          <h3 className="text-lg font-bold text-navy pt-4">Sua Necessidade</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Qual é o seu principal objetivo?</Label>
              <div className="flex flex-wrap gap-3">
                {[
                  "Primeira Habilitação",
                  "Aperfeiçoamento Urbano",
                  "Especialização Rodoviária",
                ].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-border hover:border-electric cursor-pointer transition-colors text-sm"
                  >
                    <input
                      type="radio"
                      name="objetivo"
                      value={opt}
                      required
                      className="accent-electric"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Nível de confiança ao volante (1-5)</Label>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <label
                    key={n}
                    className={`flex items-center justify-center w-12 h-12 rounded-2xl border cursor-pointer transition-colors font-heading font-bold ${
                      confidenceLevel === n
                        ? "border-electric bg-electric/10 text-electric"
                        : "border-border hover:border-electric"
                    }`}
                  >
                    <input
                      type="radio"
                      name="confianca"
                      value={n}
                      required
                      className="sr-only"
                      checked={confidenceLevel === n}
                      onChange={() => setConfidenceLevel(n)}
                    />
                    {n}
                  </label>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                1 = Insegurança total / 5 = Segurança plena
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="desafio">Maior desafio ou medo ao dirigir</Label>
              <Textarea
                id="desafio"
                placeholder="Conte-nos sobre seu maior desafio..."
                rows={3}
              />
            </div>
          </div>

          {/* Bloco 3 */}
          <h3 className="text-lg font-bold text-navy pt-4">
            Veículo & Disponibilidade
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Possui veículo próprio?</Label>
              <div className="flex gap-4">
                {["Sim", "Não"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="veiculo"
                      value={opt}
                      className="accent-electric"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="modelo">Modelo/Ano do veículo</Label>
              <Input id="modelo" placeholder="Ex: Onix 2023" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Turno de preferência</Label>
            <div className="flex gap-3">
              {["Manhã", "Tarde", "Noite"].map((t) => (
                <label
                  key={t}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-border hover:border-electric cursor-pointer transition-colors text-sm"
                >
                  <input
                    type="radio"
                    name="turno"
                    value={t}
                    className="accent-electric"
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          <Button
            variant="hero"
            size="lg"
            className="w-full text-base py-6"
            type="submit"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar Pré-Diagnóstico"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
