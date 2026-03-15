import { motion } from "framer-motion";
import mentoriaImg from "@/assets/mentoria.jpg";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-electric font-heading font-semibold text-sm tracking-widest uppercase mb-3">
              Sobre a AHEAD
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Você à frente.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A AHEAD Consultoria e Negócios nasceu de uma visão clara: organizações e indivíduos só alcançam resultados exponenciais quando colocam o comportamento humano como pilar estratégico.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Fundada sobre os pilares da <strong className="text-navy">Gestão, Psicologia, Geriatria e Inteligência em Trânsito</strong>, nossa consultoria é focada em transformar desafios complexos em processos de alta performance.
            </p>

            <div className="bg-secondary/80 rounded-2xl p-6 mb-6">
              <h3 className="font-heading font-bold text-navy text-lg mb-2">Nossa Filosofia</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Não acreditamos em soluções genéricas ou paliativas. Nossa atuação é baseada em <strong className="text-navy">Engenharia Comportamental</strong>: analisamos, diagnosticamos e estruturamos o desenvolvimento humano para mitigar riscos, reduzir custos operacionais e elevar o padrão de entrega.
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed italic border-l-4 border-electric pl-4">
              "A AHEAD é a sua parceira para eliminar a imprevisibilidade. Nosso compromisso é elevar o seu nível de prontidão para que você esteja sempre um passo à frente."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src={mentoriaImg}
              alt="Mentoria AHEAD em ação"
              className="rounded-2xl shadow-card w-full object-cover aspect-video"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;