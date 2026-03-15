import pg from "pg";
const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function saveOrder({
  mpPaymentId,
  mpPreferenceId,
  customerName,
  customerEmail,
  customerPhone,
  planName,
  amount,
  status,
}) {
  const { rows } = await pool.query(
    `INSERT INTO orders
       (mp_payment_id, mp_preference_id, customer_name, customer_email,
        customer_phone, plan_name, amount, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     ON CONFLICT (mp_payment_id) DO UPDATE
       SET status = EXCLUDED.status, updated_at = NOW()
     RETURNING *`,
    [
      mpPaymentId,
      mpPreferenceId,
      customerName,
      customerEmail,
      customerPhone,
      planName,
      amount,
      status,
    ],
  );
  return rows[0];
}

export async function updateOrderStatus(id, status, flags = {}) {
  const setParts = ["status = $2"];
  const values = [id, status];
  let idx = 3;

  if (flags.whatsappSent !== undefined) {
    setParts.push(`whatsapp_sent = $${idx++}`);
    values.push(flags.whatsappSent);
  }
  if (flags.emailSent !== undefined) {
    setParts.push(`email_sent = $${idx++}`);
    values.push(flags.emailSent);
  }

  await pool.query(
    `UPDATE orders SET ${setParts.join(", ")} WHERE id = $1`,
    values,
  );
}

export async function savePreDiagnostic({
  fullName,
  age,
  occupation,
  whatsapp,
  mainGoal,
  confidenceLevel,
  challenge,
  hasVehicle,
  vehicleModel,
  preferredShift,
}) {
  const { rows } = await pool.query(
    `INSERT INTO pre_diagnostics
      (full_name, age, occupation, whatsapp, main_goal, confidence_level,
       challenge, has_vehicle, vehicle_model, preferred_shift)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING *`,
    [
      fullName,
      age,
      occupation,
      whatsapp,
      mainGoal,
      confidenceLevel,
      challenge,
      hasVehicle,
      vehicleModel,
      preferredShift,
    ],
  );

  return rows[0];
}

export async function markPreDiagnosticEmailSent(id) {
  await pool.query(
    `UPDATE pre_diagnostics
      SET email_sent = TRUE
     WHERE id = $1`,
    [id],
  );
}
