const Footer = () => {
  return (
    <footer className="bg-navy py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-heading font-extrabold text-xl text-primary-foreground">
              AHEAD<span className="text-electric">.</span>
            </p>
            <p className="text-primary-foreground/60 text-sm mt-1">
              Consultoria e Negócios
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-primary-foreground/60">
            <a
              href="https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10202025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground transition-colors"
            >
              Resolução nº 1.020/2025
            </a>
            <a
              href="https://publicacoeslegais.detran.rs.gov.br/portaria-detran-rs-n-99-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground transition-colors"
            >
              Portaria DETRAN/RS 099/2026
            </a>
            <a
              href="https://publicacoeslegais.detran.rs.gov.br/portaria-detran-rs-n-100-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground transition-colors"
            >
              Portaria DETRAN/RS 100/2026
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} AHEAD Consultoria e Negócios. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;