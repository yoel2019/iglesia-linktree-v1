'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase';

export default function ChangePasswordPage() {
  const sb = supabaseBrowser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    sb.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });
  }, [sb]);

  async function savePassword() {
    setError('');
    setMessage('');
    if (newPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setSaving(true);
    const { error: updateError } = await sb.auth.updateUser({ password: newPassword });
    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setNewPassword('');
    setConfirmPassword('');
    setMessage('Contraseña actualizada correctamente. Ya puedes entrar con correo y contraseña.');
  }

  if (loading) {
    return <main className="login"><div className="login-card">Cargando…</div></main>;
  }

  if (!user) {
    return (
      <main className="login">
        <div className="login-card">
          <h1>Sesión requerida</h1>
          <p className="muted">Primero entra al panel de administración con tu método de autenticación actual.</p>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => router.push('/admin')}>
            Ir a administración
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="login">
      <div className="login-card">
        <h1>Crear contraseña</h1>
        <p className="muted">Establece una contraseña para esta cuenta. No necesitas usar el correo de recuperación.</p>

        <div className="field">
          <label>Nueva contraseña</label>
          <input
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            type="password"
            autoComplete="new-password"
            minLength={8}
          />
        </div>

        <div className="field">
          <label>Confirmar contraseña</label>
          <input
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            type="password"
            autoComplete="new-password"
            minLength={8}
            onKeyDown={e => { if (e.key === 'Enter') savePassword(); }}
          />
        </div>

        <button
          className="btn btn-primary"
          style={{ width: '100%' }}
          onClick={savePassword}
          disabled={saving || !newPassword || !confirmPassword}
        >
          {saving ? 'Guardando…' : 'Guardar contraseña'}
        </button>

        {message && <p className="success">{message}</p>}
        {error && <p>{error}</p>}

        <button className="btn btn-secondary" style={{ width: '100%', marginTop: 10 }} onClick={() => router.push('/admin')}>
          Volver al panel
        </button>
      </div>
    </main>
  );
}
