import React, { useState } from "react";
import { NeuroDynamic } from "../types";
import { DEFAULT_NEURO_DYNAMICS } from "../data";
import { 
  Timer, 
  ArrowRight, 
  Sparkles, 
  X, 
  HelpCircle,
  Brain,
  Loader2,
  Check,
  Plus
} from "lucide-react";

export default function NeuroLabScreen() {
  const [dynamics, setDynamics] = useState<NeuroDynamic[]>(DEFAULT_NEURO_DYNAMICS);
  const [activeFilter, setActiveFilter] = useState<string>("Todas");
  const [selectedDynamic, setSelectedDynamic] = useState<NeuroDynamic | null>(null);
  
  // AI instant generator states
  const [generating, setGenerating] = useState(false);
  const [focusArea, setFocusArea] = useState<"Atención" | "Memoria" | "Colaboración">("Atención");
  const [aiSuccessMsg, setAiSuccessMsg] = useState(false);

  const filters = ["Todas", "Atención", "Memoria", "Colaboración"];

  const filteredDynamics = activeFilter === "Todas"
    ? dynamics
    : dynamics.filter(d => d.area === activeFilter);

  const handleGenerateDynamic = async () => {
    setGenerating(true);
    setAiSuccessMsg(false);

    try {
      const response = await fetch("/api/generate-neurodynamic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ focusArea })
      });

      if (!response.ok) {
        throw new Error("No se pudo conectar a la API de generación.");
      }

      const newDynamicData = await response.json();
      
      const newDynamic: NeuroDynamic = {
        id: `ai-${Date.now()}`,
        titulo: newDynamicData.titulo || "Dinámica Estructurada",
        area: newDynamicData.area || focusArea,
        duracion: newDynamicData.duracion || "4 min",
        tipoSugerido: newDynamicData.tipoSugerido || "Dinámica Cognitiva",
        explicacion: newDynamicData.explicacion || "Ejercicio de foco didáctico.",
        pasos: newDynamicData.pasos || ["Iniciar con una consigna", "Sincronizar el grupo", "Cierre reflexivo"],
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80"
      };

      setDynamics(prev => [newDynamic, ...prev]);
      setAiSuccessMsg(true);
      setSelectedDynamic(newDynamic); // Open the detail modal for the new dynamic!
    } catch (error) {
      console.error(error);
      alert("No se pudo autogenerar la dinámica. Verifique la API Key.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Page Header */}
      <header className="space-y-2">
        <h2 className="text-3xl font-bold font-sans text-primary tracking-tight">Laboratorio de Neurodidáctica</h2>
        <p className="text-sm text-on-surface-variant max-w-2xl font-medium">
          Explora dinámicas "Pantalla-Cero" y retos vocacionales diseñados para activar el foco, fijar mnemotecnias y motivar el trabajo físico e interactivo.
        </p>
      </header>

      {/* Control bar: Filters + AI Generator activation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/10 pb-4">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map(f => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`
                  px-5 py-2 rounded-full font-semibold text-xs border tracking-wide transition-all cursor-pointer
                  ${isActive 
                    ? "bg-primary text-on-primary border-primary custom-card-shadow scale-105" 
                    : "bg-surface text-on-surface-variant border-outline-variant/40 hover:bg-surface-container-low"}
                `}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* AI Quick trigger interface */}
        <div className="flex items-center gap-2 bg-surface p-2 rounded-2xl border border-outline-variant/30 custom-card-shadow">
          <span className="text-xs font-bold text-on-surface-variant pl-2">Innovar en:</span>
          <select
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value as any)}
            className="text-xs bg-surface-container-low border border-outline-variant rounded-xl p-1 px-2 focus:outline-none focus:border-action text-primary font-semibold"
          >
            <option value="Atención">Atención (Foco)</option>
            <option value="Memoria">Memoria (Retención)</option>
            <option value="Colaboración">Colaboración (Grupos)</option>
          </select>

          <button
            onClick={handleGenerateDynamic}
            disabled={generating}
            className="bg-action hover:bg-[#00bdae] text-on-primary px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {generating ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                <span>Creando...</span>
              </>
            ) : (
              <>
                <Sparkles size={12} className="text-white" />
                <span>Generar con IA</span>
              </>
            )}
          </button>
        </div>
      </div>

      {aiSuccessMsg && (
        <div className="bg-green-50 text-green-700 p-3 px-4 rounded-2xl border border-green-100 flex items-center gap-2 text-xs font-semibold animate-fade-in">
          <Check size={16} className="text-green-600" />
          <span>¡Nueva dinámica neurocognitiva incorporada al catálogo! Revisa los detalles abajo.</span>
        </div>
      )}

      {/* Grid of Dynamic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDynamics.map((dyn) => (
          <article 
            key={dyn.id}
            id={`dynamic-card-${dyn.id}`}
            className="bg-surface rounded-3xl border border-outline-variant/30 overflow-hidden flex flex-col justify-between custom-card-shadow hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group"
          >
            {/* Upper preview area (with mock/Unsplash imagery or stylish placeholder gradients) */}
            <div className="h-44 bg-surface-container-highest relative overflow-hidden">
              <img 
                src={dyn.imageUrl || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80"}
                alt={dyn.titulo}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
              />
              {/* Timing overlay */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm border border-outline-variant/10 text-xs font-bold text-primary">
                <Timer size={14} className="text-action" />
                <span>{dyn.duracion}</span>
              </div>
            </div>

            {/* Content area */}
            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold tracking-wider text-secondary uppercase bg-secondary/10 px-2.5 py-0.5 rounded-full">
                  {dyn.area} • {dyn.tipoSugerido}
                </span>
                
                <h3 className="text-lg font-bold text-primary group-hover:text-action transition-colors font-sans">
                  {dyn.titulo}
                </h3>
                
                <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                  {dyn.explicacion}
                </p>
              </div>

              <button
                onClick={() => setSelectedDynamic(dyn)}
                className="text-action hover:text-[#00bdae] font-bold text-xs self-start flex items-center gap-1 group/btn transition-colors cursor-pointer"
              >
                <span>Ver detalle</span>
                <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Dynamic Detail Modal Backdrop */}
      {selectedDynamic && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in no-print">
          <div className="bg-surface rounded-3xl max-w-xl w-full max-h-[85vh] overflow-hidden flex flex-col border border-outline-variant/30 custom-card-shadow mt-12 animate-slide-up">
            
            {/* Modal Header */}
            <header className="p-6 border-b border-outline-variant/20 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-action tracking-wider uppercase mb-1 block">
                  {selectedDynamic.area} — {selectedDynamic.tipoSugerido}
                </span>
                <h3 className="text-xl font-bold font-sans text-primary">{selectedDynamic.titulo}</h3>
              </div>
              <button
                onClick={() => setSelectedDynamic(null)}
                className="text-on-surface-variant hover:bg-surface-container p-2 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </header>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Overview block */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Concepto de Activación</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {selectedDynamic.explicacion}
                </p>
              </div>

              {/* Steps block */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                  <Brain size={14} className="text-action" />
                  Pasos de Aplicación (Secuencia Didáctica)
                </h4>
                <ol className="space-y-3">
                  {selectedDynamic.pasos.map((step, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-on-surface leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-primary-container text-primary font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Neuro explanation */}
              <div className="bg-[#f4f3f7] p-4 rounded-2xl border border-outline-variant/15 text-xs text-on-surface-variant space-y-1">
                <p className="font-semibold text-primary">🧠 ¿Por qué funciona en el cerebro?</p>
                <p className="leading-relaxed">
                  Esta dinámica suspende la atención pasiva para forzar una sincronización voluntaria e inmediata. Al retirar los dispositivos digitales, los alumnos entrenan su foco ejecutivo, lo que incrementa la liberación de endorfinas y prepara el neocórtex para codificar información compleja.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <footer className="p-4 border-t border-outline-variant/10 flex justify-end gap-2 bg-surface-container-low/20">
              <button
                onClick={() => setSelectedDynamic(null)}
                className="px-5 py-2 hover:bg-surface-container rounded-xl text-xs font-bold transition-all text-primary cursor-pointer border border-outline-variant/25"
              >
                Entendido, Cerrar
              </button>
            </footer>

          </div>
        </div>
      )}
    </div>
  );
}
