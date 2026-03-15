#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# setup.sh — Configura o projeto pela primeira vez
# Uso: chmod +x setup.sh && ./setup.sh
# ─────────────────────────────────────────────────────────────────────────────

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   AHEAD Drive & Safety — Setup Docker    ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}\n"

# 1. Verifica dependências
command -v docker >/dev/null 2>&1 || { echo -e "${RED}Docker não encontrado. Instale em https://docs.docker.com/get-docker/${NC}"; exit 1; }
command -v docker compose version >/dev/null 2>&1 || { echo -e "${RED}Docker Compose não encontrado.${NC}"; exit 1; }
echo -e "${GREEN}✓ Docker e Docker Compose detectados${NC}"

# 2. Cria .env se não existir
if [ ! -f .env ]; then
  cp .env.example .env
  echo -e "${YELLOW}⚠  Arquivo .env criado a partir do .env.example${NC}"
  echo -e "${YELLOW}   Edite o .env com suas credenciais antes de continuar!${NC}"
  echo ""
  read -p "Pressione ENTER após editar o .env para continuar..."
else
  echo -e "${GREEN}✓ .env já existe${NC}"
fi

# 3. Copia arquivos frontend para o repositório
echo -e "\n${YELLOW}Copiando arquivos do frontend...${NC}"

mkdir -p src/hooks src/pages

[ -f frontend-snippet/usePayment.ts ] && cp frontend-snippet/usePayment.ts src/hooks/usePayment.ts && echo "  ✓ src/hooks/usePayment.ts"
[ -f frontend-snippet/PaymentSuccess.tsx ] && cp frontend-snippet/PaymentSuccess.tsx src/pages/PaymentSuccess.tsx && echo "  ✓ src/pages/PaymentSuccess.tsx"
[ -f frontend-snippet/PaymentFailed.tsx ] && cp frontend-snippet/PaymentFailed.tsx src/pages/PaymentFailed.tsx && echo "  ✓ src/pages/PaymentFailed.tsx"

echo -e "${YELLOW}⚠  Lembre-se de adicionar as rotas no App.tsx (veja frontend-snippet/App.tsx.example)${NC}"

# 4. Sobe os containers
echo -e "\n${YELLOW}Iniciando containers Docker...${NC}"
docker compose up -d --build

echo -e "\n${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║            ✅ Setup concluído!           ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "  🌐 Frontend:      http://localhost"
echo -e "  🔧 Backend API:   http://localhost:3000"
echo -e "  📱 Evolution API: http://localhost:8080"
echo -e "  🗄  PostgreSQL:   localhost:5432"
echo ""
echo -e "${YELLOW}Próximos passos:${NC}"
echo -e "  1. Acesse http://localhost:8080 e conecte seu WhatsApp (QR Code)"
echo -e "  2. Configure o webhook no Mercado Pago apontando para MP_WEBHOOK_URL"
echo -e "  3. Adicione as rotas de pagamento no src/App.tsx"
echo -e "  4. Veja o DOCKER_README.md para detalhes completos"
