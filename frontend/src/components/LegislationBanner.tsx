import { motion } from "framer-motion";
import { Scale, ExternalLink } from "lucide-react";

const links = [
  {
    label: "Resolução nº 1.020/2025 — CONTRAN",
    url: "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10202025.pdf",
  },
  {
    label: "Portaria DETRAN/RS N.º 099/2026",
    url: "https://publicacoeslegais.detran.rs.gov.br/portaria-detran-rs-n-99-2026",
  },
  {
    label: "Portaria DETRAN/RS N.º 100/2026",
    url: "https://publicacoeslegais.detran.rs.gov.br/portaria-detran-rs-n-100-2026",
  },
];

const LegislationBanner = () => {
  return (
    <section className="py-12 bg-navy">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Scale className="w-5 h-5 text-electric" />
            <p className="text-electric font-heading font-semibold text-sm tracking-widest uppercase">
              Conformidade Legal
            </p>
          </div>
          <p className="text-primary-foreground/70 text-sm max-w-2xl mx-auto">
            Serviço em conformidade com o novo regramento federal da CNH do Brasil, alinhado às legislações estaduais vigentes.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {links.map((link) => (
            <motion.a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-primary-foreground/20 text-primary-foreground/80 hover:text-primary-foreground hover:border-electric/50 hover:bg-electric/10 transition-all text-sm"
            >
              {link.label}
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegislationBanner;