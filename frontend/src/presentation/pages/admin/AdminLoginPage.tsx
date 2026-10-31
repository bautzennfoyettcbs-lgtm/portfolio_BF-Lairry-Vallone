import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../../infrastructure/adapters/api/HttpApiClient";
import { Shield, Lock, Mail, ArrowLeft } from "lucide-react";

interface AdminLoginProps {
  onNavigate: (page: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("bautzennfoyettcbs@gmail.com");
  const [password, setPassword] = useState("BautzenDev2026!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.login({ email, password });
      login(res.token, res.user);
      onNavigate("admin_dashboard");
    } catch (err: any) {
      setError(err.message || "Identifiants invalides");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
        
        {/* Navigation retour */}
        <button
          onClick={() => onNavigate("home")}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-brand-orange transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au site public</span>
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 text-brand-orange flex items-center justify-center mx-auto border border-brand-orange/40 shadow-glow">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white">Espace Administratif</h2>
          <p className="text-xs text-slate-400">
            Plateforme privée de gestion du contenu et des projets
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Email Administrateur
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-orange"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-orange"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-300">
            💡 Identifiants par défaut pré-remplis pour la démonstration (configurables dans le fichier <code>.env</code> et la BDD PostgreSQL).
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs shadow-glow transition-all hover:scale-[1.02]"
          >
            {loading ? "Connexion..." : "Se connecter au Back-Office"}
          </button>
        </form>

      </div>
    </div>
  );
};
