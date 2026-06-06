import React, { useEffect, useState } from "react";
import { Sparkles, Key, Globe, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function SettingsScreen() {
  const [apiKeySet, setApiKeySet] = useState(false);
  const [showConfigAlert, setShowConfigAlert] = useState(false);

  useEffect(() => {
    // Check if Gemini is configured by making a quick API status call
    fetch("/api/gemini-status")
      .then(r => r.json())
      .then(d => setApiKeySet(d.configured))
      .catch(() => setApiKeySet(false));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      <header className="space-y-1">
        <h2 className="text-2xl font-bold font-sans text-primary select-none">Configuraciones de LogosLab</h2>
        <p className="text-sm text-on-surface-variant font-medium">Gestiona las llaves criptográficas de inteligencia y configuración del ecosistema.</p>
      </header>

      <div className="bg-surface rounded-3xl border border-outline-variant/30 p-6 custom-card-shadow space-y-6">
        
        {/* API STATUS SECTION */}
        <section className="space-y-3">
          <h3 className="text-md font-bold text-primary font-sans">Estatus del Copiloto Inteligente</h3>
          
          {apiKeySet ? (
            <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-3">
              <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-sm text-green-800">✅ Copiloto Totalmente Activo</h4>
                <p className="text-xs text-green-700 leading-relaxed mt-0.5">
                  La Llave Secreta de Inteligencia Artificial (GEMINI_API_KEY) está activa y configurada correctamente en el backend protegida de accesos externos. El Agente Orquestador está listo para recibir directivas didácticas.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-3">
              <Sparkles className="text-amber-600 flex-shrink-0 animate-pulse" size={24} />
              <div>
                <h4 className="font-bold text-sm text-amber-800">⚠️ Llave de Inteligencia Desatendida</h4>
                <p className="text-xs text-amber-700 leading-relaxed mt-0.5">
                  Las funciones inteligentes de autogeneración didáctica requieren configurar tu llave secreta. Ve al panel de <strong>Settings &gt; Secrets</strong> en la esquina del editor de Google AI Studio, y añade tu clave como <strong>GEMINI_API_KEY</strong>.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ECOSYSTEM RULES BRIEF */}
        <section className="border-t border-outline-variant/10 pt-6 space-y-3">
          <h3 className="text-md font-bold text-primary font-sans">Fundamento Operativo de LogosLab</h3>
          <div className="text-xs text-on-surface-variant leading-relaxed space-y-3">
            <p>
              Este laboratorio de neuroeducación se rige por la sintonía cognitiva "Pantalla-Cero". Recomienda no emplear dispositivos tecnológicos en los estudiantes durante los Momentos Metodológicos de Práctica y Producción, para forzar el anclaje sináptico kinestésico.
            </p>
            <p>
              Todas las llamadas conversacionales con el Agente Copiloto se procesan de forma cifrada en nuestros servidores de contenedores en la nube, garantizando que tus notas y planes curriculares de clase nunca sean visibles para entes externos.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
