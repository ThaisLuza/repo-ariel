-- Tabela de pedidos / pagamentos
CREATE TABLE IF NOT EXISTS orders (
  id            SERIAL PRIMARY KEY,
  mp_payment_id VARCHAR(100) UNIQUE,          -- ID do pagamento no Mercado Pago
  mp_preference_id VARCHAR(100),              -- ID da preferência criada
  customer_name  VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(30),                  -- com DDI: 5554999999999
  plan_name      VARCHAR(100),                 -- ex: "Mentoria Premium"
  amount         NUMERIC(10,2) NOT NULL,
  currency       VARCHAR(10) DEFAULT 'BRL',
  status         VARCHAR(50) DEFAULT 'pending', -- pending | approved | rejected | cancelled
  whatsapp_sent  BOOLEAN DEFAULT FALSE,
  email_sent     BOOLEAN DEFAULT FALSE,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Índices úteis
CREATE INDEX IF NOT EXISTS idx_orders_mp_payment_id ON orders (mp_payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_status         ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_email          ON orders (customer_email);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Tabela de pré-diagnósticos enviados pelo formulário
CREATE TABLE IF NOT EXISTS pre_diagnostics (
  id                 SERIAL PRIMARY KEY,
  full_name          VARCHAR(255) NOT NULL,
  age                INTEGER,
  occupation         VARCHAR(255),
  whatsapp           VARCHAR(30) NOT NULL,
  main_goal          VARCHAR(120) NOT NULL,
  confidence_level   SMALLINT NOT NULL,
  challenge          TEXT,
  has_vehicle        BOOLEAN,
  vehicle_model      VARCHAR(255),
  preferred_shift    VARCHAR(20),
  email_sent         BOOLEAN DEFAULT FALSE,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pre_diagnostics_created_at ON pre_diagnostics (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pre_diagnostics_whatsapp   ON pre_diagnostics (whatsapp);

CREATE OR REPLACE TRIGGER pre_diagnostics_updated_at
  BEFORE UPDATE ON pre_diagnostics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
