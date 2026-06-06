import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import DashboardScreen from "./components/DashboardScreen";
import OrquestadorScreen from "./components/OrquestadorScreen";
import PdcEditorScreen from "./components/PdcEditorScreen";
import NeuroLabScreen from "./components/NeuroLabScreen";
import BancoCooperativoScreen from "./components/BancoCooperativoScreen";
import SettingsScreen from "./components/SettingsScreen";
import InsumosScreen from "./components/InsumosScreen";
import { AppTab, PdcDocument, LessonPlan } from "./types";
import { DEFAULT_PDC } from "./data";
import { Sparkles, Brain } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("dashboard");
  
  // Shared class parameters
  const [materia, setMateria] = useState("");
  const [tema, setTema] = useState("");
  const [clima, setClima] = useState("Alegría");

  // PDC Document active state - loads local draft if exists, else defaults
  const [pdcDocument, setPdcDocument] = useState<PdcDocument>(() => {
    try {
      const saved = localStorage.getItem("logoslab_pdc_draft");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("No se pudo cargar el borrador anterior", e);
    }
    return DEFAULT_PDC;
  });

  // Handler for loading a community plan into the editor
  const handleLoadPlanIntoEditor = (plan: LessonPlan) => {
    const updatedDoc: PdcDocument = {
      institucion: "Colegio de la Comunidad",
      nivel: `Secundaria Comunitaria Productiva - Área ${plan.materia}`,
      psp: '"Cuidamos nuestra salud integral consumiendo alimentos ecológicos de nuestra región."',
      practica: `Iniciamos la sesión proponiendo un reto experimental enfocado en: "${plan.titulo}". Dividimos a los alumnos en equipos para formular aserciones hipotéticas sin apuntes.`,
      teoria: `Analizamos de forma sistemática y crítica la base teórica: ${plan.descripcion}. Profundizamos junto al Prof. Davis/Equipo en los conceptos primordiales del tema.`,
      valoracion: `Reflexionamos comunitariamente sobre cómo el dominio de "${plan.titulo}" empodera vocacionalmente a los miembros del grupo y mejora el pensamiento analítico.`,
      produccion: `Los estudiantes elaboran un informe de laboratorio simplificado o infografía física plegable para divulgar los resultados conceptuales en la feria científica.`,
      explicacionNeuro: `Basado en el diseño curador del plan "${plan.titulo}". Se apoya en el andamiaje progresivo para liberar estímulos acetilcolínicos y dopamínicos persistentes.`
    };

    setPdcDocument(updatedDoc);
    setMateria(plan.materia);
    setTema(plan.titulo);
    
    // Automatically switch to the Curriculum editor tab after cloning so the user enters editor mode
    setTimeout(() => {
      setActiveTab("pdc");
    }, 1400);
  };

  // Switch to the Copilot Orquestador and focus input
  const triggerGeneratePlanWorkflow = () => {
    setActiveTab("orquestador");
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardScreen 
            setActiveTab={setActiveTab} 
            onGeneratePlanClick={triggerGeneratePlanWorkflow} 
          />
        );
      case "orquestador":
        return (
          <OrquestadorScreen
            materia={materia}
            setMateria={setMateria}
            tema={tema}
            setTema={setTema}
            clima={clima}
            setClima={setClima}
            onPdcGenerated={(generatedDoc) => {
              setPdcDocument(generatedDoc);
              // Shift immediately to the Curriculum workspace to see the generated document!
              setActiveTab("pdc");
            }}
          />
        );
      case "pdc":
        return (
          <PdcEditorScreen
            document={pdcDocument}
            onDocumentChange={setPdcDocument}
            onGoToOrquestador={triggerGeneratePlanWorkflow}
          />
        );
      case "neuro":
        return <NeuroLabScreen />;
      case "banco":
        return (
          <BancoCooperativoScreen 
            onLoadPlanIntoEditor={handleLoadPlanIntoEditor} 
          />
        );
      case "insumos":
        return (
          <InsumosScreen 
            materia={materia}
            tema={tema}
            nivel={pdcDocument.nivel}
            onGoToOrquestador={triggerGeneratePlanWorkflow}
          />
        );
      case "ajustes":
        return <SettingsScreen />;
      default:
        return (
          <DashboardScreen 
            setActiveTab={setActiveTab} 
            onGeneratePlanClick={triggerGeneratePlanWorkflow} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      
      {/* Reusable Sidebar Navigation layout */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onGeneratePlanClick={triggerGeneratePlanWorkflow}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 md:pl-72 min-h-screen">
        
        {/* Subtle decorative top indicator for design excellence */}
        <div className="no-print hidden md:flex items-center justify-between mb-6 border-b border-outline-variant/15 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest font-sans">
              WORKSPACE ACTIVO — SECUNDARIA BOLIVIA
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <span className="bg-primary/5 px-2.5 py-1 rounded-lg border border-outline-variant/20 flex items-center gap-1">
              <Brain size={12} className="text-action" />
              <span>Neurofoco: On</span>
            </span>
            <span className="bg-primary-container text-primary px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold tracking-wider">
              Ley 070
            </span>
          </div>
        </div>

        {/* Dynamic Screen View Injection */}
        <div className="max-w-6xl mx-auto">
          {renderActiveScreen()}
        </div>
      </main>
    </div>
  );
}
