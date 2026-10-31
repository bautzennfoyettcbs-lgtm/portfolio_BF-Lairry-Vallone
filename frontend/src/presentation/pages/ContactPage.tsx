import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { api } from "../../infrastructure/adapters/api/HttpApiClient";
import { ArrowLeft, Send, Phone, Mail, MapPin, CheckCircle, Clock } from "lucide-react";

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.sendContact(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'envoi du message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        
        {/* Navigation retour */}
        <button
          onClick={() => onNavigate("home")}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-brand-orange transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </button>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold border border-brand-orange/30">
            <span>Contact & Prise de Rendez-vous</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Travaillons <span className="text-gradient">Ensemble</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl">
            Vous avez un projet web, une application mobile ou besoin d'un audit en Clean Architecture ? Envoyez-moi un message ou contactez-moi directement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Info & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
              <h3 className="text-lg font-bold text-white">Coordonnées Directes</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Localisation</span>
                    <span className="text-slate-300">Bafoussam, Ouest, Cameroun</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">(Disponible en Remote mondial)</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Téléphone / Appels</span>
                    <a href="tel:+237697480153" className="text-slate-200 hover:text-brand-orange block font-mono">
                      +237 697 480 153
                    </a>
                    <a href="tel:+237654399609" className="text-slate-200 hover:text-brand-orange block font-mono">
                      +237 654 399 609
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Courriel Professionnel</span>
                    <a href="mailto:bautzennfoyettcbs@gmail.com" className="text-slate-200 hover:text-brand-orange break-all">
                      bautzennfoyettcbs@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Délai de Réponse</span>
                    <span className="text-slate-300">Moins de 12 heures</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Pill */}
              <div className="pt-2">
                <a
                  href="https://wa.me/237697480153"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-transform hover:scale-105 shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>Ouvrir la discussion WhatsApp (+237)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
              <h3 className="text-lg font-bold text-white">Formulaire de Contact</h3>

              {success ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-white text-base">Message envoyé avec succès !</h4>
                  <p className="text-xs text-slate-300">
                    Merci pour votre message. Bautzen vous répondra dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-3 px-4 py-2 rounded-xl bg-slate-900 text-xs font-bold text-white hover:bg-slate-800"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Votre Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Alexandre Dubois"
                        className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Adresse Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nom@entreprise.com"
                        className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Téléphone (Optionnel)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+237 ... ou international"
                        className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Sujet de votre demande *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Ex: Projet Web / Recrutement"
                        className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Votre Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Décrivez brièvement votre besoin, vos objectifs et vos délais..."
                      className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-orange resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs shadow-glow flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? "Envoi en cours..." : "Envoyer mon message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

