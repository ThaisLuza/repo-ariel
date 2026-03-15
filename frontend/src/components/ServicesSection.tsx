import { motion } from "framer-motion";
import { Building2, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 bg-secondary/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-electric font-heading font-semibold text-sm tracking-widest uppercase mb-3">
            Serviços
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Dois braços, um propósito
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Porque, na AHEAD, acreditamos que quando as pessoas evoluem, o negócio acontece.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* PARA EMPRESAS */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl shadow-card p-8 md:p-10 flex flex-col"
          >
            <div className="w-14 h-14 rounded-xl bg-navy/10 flex items-center justify-center mb-6">
              <Building2 className="w-7 h-7 text-navy" />
            </div>
            <h3 className="text-2xl font-extrabold text-navy mb-2">Para Empresas</h3>
            <p className="text-electric font-heading font-semibold text-sm mb-4">
              DHO — Desenvolvimento Humano e Organizacional
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
              Estruturamos a gestão de pessoas para que a cultura seja o motor da sua lucratividade, protegendo o seu capital humano e reduzindo passivos.
            </p>
            <Button variant="heroOutline" size="lg" className="w-full" disabled>
              Em Breve
            </Button>
          </motion.div>

          {/* PARA VOCÊ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl shadow-card p-8 md:p-10 flex flex-col border-2 border-electric/20"
          >
            <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center mb-6">
              <User className="w-7 h-7 text-electric" />
            </div>
            <h3 className="text-2xl font-extrabold text-navy mb-2">Para Você</h3>
            <p className="text-electric font-heading font-semibold text-sm mb-4">
              AHEAD Drive & Safety
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
              Transformamos condutores em especialistas em segurança e inteligência viária, através de uma mentoria técnica que prioriza a vida e a autonomia.
            </p>
            <Button variant="hero" size="lg" className="w-full" asChild>
              <a href="#programas" className="inline-flex items-center gap-2">
                Conhecer Programas
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;