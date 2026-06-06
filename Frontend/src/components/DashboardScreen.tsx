import React from "react";
import { AppTab } from "../types";
import { 
  MessageSquare, 
  FileSpreadsheet, 
  BrainCircuit, 
  Sparkles, 
  FilePlus2, 
  BookMarked 
} from "lucide-react";

interface DashboardScreenProps {
  setActiveTab: (tab: AppTab) => void;
  onGeneratePlanClick: () => void;
}

export default function DashboardScreen({ setActiveTab, onGeneratePlanClick }: DashboardScreenProps) {
  
  const modules = [
    {
      id: "orquestador",
      title: "Agente Orquestador",
      desc: "Asistente empático entrenado en neuroeducación para ayudarte a estructurar tus ideas rápidas y planificar clases.",
      icon: MessageSquare,
      colorBg: "bg-primary-container",
      iconColor: "text-action",
      badge: "Inmediato - IA",
      actionText: "Iniciar Copiloto"
    },
    {
      id: "pdc",
      title: "Workspace PDC Express",
      desc: "Planificación de documentos ágil adaptada a la Ley 070. Genera borradores de inmediato y exporta a formato oficial.",
      icon: FileSpreadsheet,
      colorBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      badge: "Ley 070 boliviana",
      actionText: "Abrir Workspace"
    },
    {
      id: "neuro",
      title: "Laboratorio Neurodidáctica",
      desc: "Explora dinámicas cooperativas y de activación basadas en neurociencia 'Pantalla-Cero' para captar atención real sin pantallas.",
      icon: BrainCircuit,
      colorBg: "bg-amber-50",
      iconColor: "text-amber-600",
      badge: "Cero-Pantalla",
      actionText: "Ver Dinámicas"
    },
    {
      id: "insumos", // Generador de insumos can open custom generation tab or start an applet prompt
      title: "Generador de Insumos",
      desc: "Crea rúbricas, cuestionarios, talleres y materiales de evaluación instantáneos a partir del tema activo de tu clase.",
      icon: FilePlus2,
      colorBg: "bg-blue-50",
      iconColor: "text-blue-600",
      badge: "Generador de Fichas",
      actionText: "Comenzar con IA",
      isCustomAction: false
    },
    {
      id: "banco",
      title: "Banco Cooperativo",
      desc: "Visita y clona planes curriculares excepcionales calificados por otros profesores de la comunidad académica.",
      icon: BookMarked,
      colorBg: "bg-purple-50",
      iconColor: "text-purple-600",
      badge: "Compartido",
      actionText: "Explorar Repositorio"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Editorial Welcome Header */}
      <header className="space-y-2">
        <h2 className="text-3xl md:text-4px font-bold font-sans text-primary tracking-tight leading-none">
          Hola, Profe. ¿Qué vamos a transformar hoy?
        </h2>
        <p className="text-body-lg text-on-surface-variant max-w-2xl font-medium">
          Selecciona un módulo inteligente para comenzar a estructurar o potenciar tu aula de clase.
        </p>
      </header>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod, index) => {
          const Icon = mod.icon;
          // Span 2 columns for the second card (PDC Express) to balance the grid look as in the mockup
          const isLarge = mod.id === "pdc";
          return (
            <div
              key={mod.id}
              onClick={() => {
                if (mod.isCustomAction) {
                  // Prompt direct plan generation
                  onGeneratePlanClick();
                } else {
                  setActiveTab(mod.id as AppTab);
                }
              }}
              id={`card-module-${mod.id}`}
              className={`
                bg-surface rounded-3xl border border-outline-variant/30 p-6 flex flex-col justify-between 
                custom-card-shadow hover:shadow-xl active:scale-[0.99] transition-all-default duration-300 hover:-translate-y-1 cursor-pointer group
                ${isLarge ? "md:col-span-2" : ""}
              `}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  {/* Icon Badge container */}
                  <div className={`p-3 rounded-2xl ${mod.colorBg} transition-all group-hover:scale-110`}>
                    <Icon size={24} className={`${mod.iconColor}`} />
                  </div>
                  {/* Level / Area label */}
                  <span className="text-[10px] font-bold tracking-widest text-on-surface-variant bg-surface-container px-3 py-1 rounded-full uppercase">
                    {mod.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-primary group-hover:text-action transition-colors mb-2 font-sans">
                  {mod.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                  {mod.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-action group-hover:underline flex items-center gap-1">
                  {mod.actionText}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
                
                {mod.id === "orquestador" && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-action opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-action"></span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hero Tip banner */}
      <footer className="bg-gradient-to-r from-primary to-[#2e264a] text-white rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 custom-card-shadow">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#ffffff20] px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles size={14} className="text-action" />
            <span>Asistente Pedagógico Activo</span>
          </div>
          <h4 className="text-lg font-bold font-sans">Planifica un Momento Metodológico con Neurofoco</h4>
          <p className="text-sm text-[#cac5cd] max-w-2xl leading-relaxed">
            Nuestros algoritmos están calibrados para proponer dinámicas de clase que no utilicen pantallas. Al alternar atención concentrada con retos corporales cortos de 3-5 minutos, mantienes al grupo motivado y receptivo.
          </p>
        </div>
        <button
          onClick={onGeneratePlanClick}
          className="bg-action hover:bg-[#00bdae] text-on-primary font-semibold py-3 px-6 rounded-xl transition-all shadow-md active:scale-[0.98] whitespace-nowrap cursor-pointer"
        >
          Planificar Ahora
        </button>
      </footer>
    </div>
  );
}
