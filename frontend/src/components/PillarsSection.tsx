import { motion } from "framer-motion";
import { Brain, Shield, Car } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    number: "01",
    title: "Inteligência Emocional",
    subtitle: "Para exames e trânsito real",
    desc: "Gestão de ansiedade e controle emocional. Mantenha o foco e a calma, eliminando o nervosismo que causa erros na condução.",
  },
  {
    icon: Shield,
    number: "02",
    title: "Direção Defensiva",
    subtitle: "Aplicada ao dia a dia",
    desc: "Aprenda a ler o trânsito com antecedência, antecipando riscos e garantindo uma condução segura e consciente.",
  },
  {
    icon: Car,
    number: "03",
    title: "Domínio Técnico do Veículo",
    subtitle: "Mecânica preventiva e controle",
    desc: "Do domínio do pedal à ultrapassagem, mentoria focada em eliminar vícios e garantir a precisão de movimentos.",
  },
];

const PillarsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-electric font-heading font-semibold text-sm tracking-widest uppercase mb-3">
            Formação Cognitiva e Prática
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Os 3 Pilares da Mentoria AHEAD
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto italic">
            Aprovação com técnica e segurança emocional.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow group"
            >
              <span className="absolute top-6 right-6 text-5xl font-extrabold text-electric/10 font-heading group-hover:text-electric/20 transition-colors">
                {p.number}
              </span>
              <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center mb-6">
                <p.icon className="w-7 h-7 text-electric" />
              </div>
              <h3 className="text-xl font-bold mb-1">{p.title}</h3>
              <p className="text-electric text-sm font-medium mb-3">{p.subtitle}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground text-sm mt-10 max-w-xl mx-auto"
        >
          Prepare-se para conquistar sua CNH com uma metodologia que vai além do exame. Desenvolva a confiança necessária para passar na prova e, mais importante, para dirigir com excelência pelo resto da vida.
        </motion.p>
      </div>
    </section>
  );
};

export default PillarsSection;