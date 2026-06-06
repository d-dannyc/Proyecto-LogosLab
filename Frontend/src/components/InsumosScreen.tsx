import React, { useState } from "react";
import { InsumoDocument } from "../types";
import { 
  FilePlus2, 
  Printer, 
  Sparkles, 
  ArrowRight,
  Brain,
  Loader2,
  AlertCircle
} from "lucide-react";

interface InsumosScreenProps {
  materia: string;
  tema: string;
  nivel: string;
  onGoToOrquestador: () => void;
}

export default function InsumosScreen({ materia, tema, nivel, onGoToOrquestador }: InsumosScreenProps) {
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [insumo, setInsumo] = useState<InsumoDocument | null>(null);

  const handleGenerateInsumo = async () => {
    if (!materia || !tema) {
      setErrorStatus("Necesitas configurar una Materia y un Tema en el Agente Orquestador antes de generar insumos.");
      return;
    }
    
    setErrorStatus(null);
    setLoading(true);

    try {
      const response = await fetch("/api/generate-insumo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ materia, tema, nivel })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "No se pudo generar la ficha didáctica.");
      }

      const generatedInsumo: InsumoDocument = await response.json();
      setInsumo(generatedInsumo);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || "Error al conectar con la IA. Revisa la llave API.");
    } finally {
      setLoading(false);
    }
  };

  const handleExportPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header bar */}
      <div className="no-print flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface p-4 rounded-3xl border border-outline-variant/30 custom-card-shadow">
        <div>
          <h2 className="text-2xl font-bold text-primary font-sans flex items-center gap-2">
            <FilePlus2 className="text-blue-600" size={24} />
            Generador de Insumos
          </h2>
          <p className="text-xs text-on-surface-variant font-medium">Hoja de trabajo instantánea de 1 página</p>
        </div>
        
        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          {insumo && (
            <button
              onClick={handleExportPrint}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Printer size={16} />
              <span>Imprimir Ficha</span>
            </button>
          )}
        </div>
      </div>

      {/* Control / Helper Banner */}
      <div className="no-print bg-blue-50 text-blue-900 p-6 rounded-3xl border border-blue-100 custom-card-shadow flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-bold flex items-center gap-1.5 font-sans">
            <Sparkles size={16} className="text-blue-600" />
            Contexto Activo de Clase
          </h4>
          <p className="text-xs text-blue-800/80 leading-relaxed max-w-xl">
            {materia && tema 
              ? `Generando para: ${materia} — "${tema}". El asistente IA creará una ficha de trabajo adecuada a tu disciplina (ejercicios para exactas, juicios críticos para humanidades) y le incluirá un reto vocacional.`
              : "No tienes una clase activa. Ve al Agente Orquestador para definir tu materia y tema."}
          </p>
        </div>
        
        {(!materia || !tema) ? (
          <button
            onClick={onGoToOrquestador}
            className="bg-action text-white hover:bg-[#00bdae] text-xs font-bold py-2 px-4 rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            Ir a Copiloto
          </button>
        ) : (
          <button
            onClick={handleGenerateInsumo}
            disabled={loading}
            className="bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold py-2 px-5 rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Generando...</span>
              </>
            ) : (
              <>
                <Brain size={14} />
                <span>Generar Ficha IA</span>
              </>
            )}
          </button>
        )}
      </div>

      {errorStatus && (
        <div className="no-print bg-red-50 text-red-700 p-3 px-4 rounded-2xl border border-red-100 flex items-center gap-2 text-xs font-semibold animate-fade-in shadow-sm">
          <AlertCircle size={16} className="text-red-600" />
          <span>{errorStatus}</span>
        </div>
      )}

      {/* Printable Area */}
      {insumo && (
        <div className="bg-surface rounded-3xl border border-outline-variant/30 p-6 md:p-10 custom-card-shadow print-card-border mx-auto max-w-[800px] min-h-[1050px] bg-white text-black print-insumo-page space-y-6">
          
          {/* Ficha Header (Standard School Format) */}
          <div className="border-b-2 border-black pb-4 mb-6">
            <h1 className="text-2xl font-bold font-sans text-center mb-4 uppercase tracking-wider">
              {insumo.tituloFicha}
            </h1>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm font-semibold mt-6">
              <div className="flex gap-2 border-b border-gray-400 pb-1">
                <span className="text-gray-600 uppercase text-xs w-24">Estudiante:</span>
                <span className="flex-1"></span>
              </div>
              <div className="flex gap-2 border-b border-gray-400 pb-1">
                <span className="text-gray-600 uppercase text-xs w-16">Fecha:</span>
                <span className="flex-1"></span>
              </div>
              <div className="flex gap-2 border-b border-gray-400 pb-1">
                <span className="text-gray-600 uppercase text-xs w-24">Materia:</span>
                <span className="flex-1">{materia}</span>
              </div>
              <div className="flex gap-2 border-b border-gray-400 pb-1">
                <span className="text-gray-600 uppercase text-xs w-16">Curso:</span>
                <span className="flex-1">{nivel || "________________"}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Concept / Reading */}
          <section className="space-y-3 pb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 bg-gray-100 p-2 rounded inline-block">1. Base Analítica</h2>
            <div className="text-[15px] leading-relaxed text-gray-900 space-y-3 p-1">
              {insumo.seccionConcepto.split('\n').map((paragraph, idx) => (
                 <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Section 2: Activities */}
          <section className="space-y-3 pb-4 flex-1">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 bg-gray-100 p-2 rounded inline-block">2. Práctica Formativa</h2>
            <ol className="list-decimal pl-6 space-y-8 mt-4 text-[15px] text-gray-900">
              {insumo.actividades.map((act, idx) => (
                <li key={idx} className="pl-2">
                  <div className="font-medium mb-3">{act}</div>
                  {/* Space for the student to write answers */}
                  <div className="space-y-6 mt-4 opacity-50">
                    <hr className="border-gray-300" />
                    <hr className="border-gray-300" />
                    <hr className="border-gray-300" />
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Section 3: Reto Vocacional */}
          <section className="mt-8 pt-6 border-t-2 border-black border-dashed">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 bg-gray-100 p-2 rounded inline-block mb-3">
              3. Reto Vocacional Relámpago
            </h2>
            <div className="text-[14px] font-medium leading-relaxed italic text-gray-800 p-4 border border-gray-300 rounded-lg bg-gray-50">
              {insumo.retoVocacional}
            </div>
          </section>
          
          <div className="text-center text-[10px] text-gray-400 font-bold uppercase pt-8">
            Generado por LogosLab - Herramientas Didácticas
          </div>

        </div>
      )}
    </div>
  );
}
