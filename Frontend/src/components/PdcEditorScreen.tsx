import React, { useState, useEffect } from "react";
import { PdcDocument } from "../types";
import { 
  Save, 
  Printer, 
  CheckCircle, 
  HelpCircle, 
  Sparkles,
  BookOpen,
  ArrowRight
} from "lucide-react";

interface PdcEditorScreenProps {
  document: PdcDocument;
  onDocumentChange: (doc: PdcDocument) => void;
  onGoToOrquestador: () => void;
}

export default function PdcEditorScreen({ 
  document, 
  onDocumentChange,
  onGoToOrquestador 
}: PdcEditorScreenProps) {
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleFieldChange = (field: keyof PdcDocument, value: string) => {
    onDocumentChange({
      ...document,
      [field]: value
    });
  };

  const handleSaveDraft = () => {
    localStorage.setItem("logoslab_pdc_draft", JSON.stringify(document));
    setSaveStatus("¡Borrador guardado correctamente en almacenamiento local!");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleExportPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Top Contextual Header bar */}
      <div className="no-print flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface p-4 rounded-3xl border border-outline-variant/30 custom-card-shadow">
        <div>
          <h2 className="text-2xl font-bold text-primary font-sans">PDC Express Editor</h2>
          <p className="text-xs text-on-surface-variant font-medium">Ley 070 - Plan de Desarrollo Curricular Integrado</p>
        </div>
        
        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          <button
            onClick={handleSaveDraft}
            id="pdc-save-draft"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-primary border border-outline-variant hover:bg-surface-container bg-surface rounded-xl font-semibold text-sm transition-all cursor-pointer"
          >
            <Save size={16} />
            <span>Guardar Borrador</span>
          </button>
          
          <button
            onClick={handleExportPrint}
            id="pdc-export-pdf"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 bg-action hover:bg-[#00bdae] text-white rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Printer size={16} />
            <span>Exportar PDF Ultraligero</span>
          </button>
        </div>
      </div>

      {saveStatus && (
        <div className="no-print bg-green-50 text-green-700 p-3 px-4 rounded-2xl border border-green-100 flex items-center gap-2 text-xs font-semibold animate-fade-in shadow-sm">
          <CheckCircle size={16} className="text-green-600" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Main Document Workspace layout */}
      <div className="max-w-[900px] mx-auto space-y-6">
        
        {/* Helper Banner if fields are empty */}
        {!document.practica && (
          <div className="no-print bg-primary-container text-primary p-6 rounded-3xl border border-outline-variant/30 custom-card-shadow flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-bold flex items-center gap-1.5 font-sans">
                <Sparkles size={16} className="text-action" />
                Estás visualizando un lienzo libre
              </h4>
              <p className="text-xs text-on-primary-container leading-relaxed max-w-xl">
                ¿Prefieres que la IA lo formule por ti en segundos? Selecciona materia y tema en el Agente Orquestador para rellenar este documento automáticamente con fundamentos pedagógicos de neurodesarrollo.
              </p>
            </div>
            <button
              onClick={onGoToOrquestador}
              className="bg-action text-white hover:bg-[#00bdae] text-xs font-bold py-2 px-4 rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
            >
              Ir a Copiloto
            </button>
          </div>
        )}

        {/* Paper Document Container */}
        <div className="bg-surface rounded-3xl border border-outline-variant/30 p-6 md:p-10 custom-card-shadow print-card-border relative overflow-hidden">
          
          {/* Aesthetic Watermark for school style (No print-clutter, keeps it elegant and literal) */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />

          {/* Document Title Header (Perfect for printing) */}
          <div className="text-center pb-6 border-b border-outline-variant/20 mb-8 space-y-1">
            <h1 className="text-2xl font-bold font-sans tracking-tight text-primary uppercase">Plan de Desarrollo Curricular (PDC)</h1>
            <p className="text-xs font-semibold text-on-surface-variant tracking-wider uppercase">Modelo Socio-Comunitario Productivo — Educación Secundaria</p>
          </div>

          {/* 1. Header Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-outline-variant/20 mb-8">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Unidad Educativa</label>
              <input 
                type="text"
                placeholder="Nombre de la institución..."
                value={document.institucion}
                onChange={(e) => handleFieldChange("institucion", e.target.value)}
                className="w-full bg-transparent border-b border-outline-variant/30 p-1 text-sm font-semibold text-primary focus:outline-none focus:border-action transition-colors"
                id="doc-institucion"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Nivel / Año de Escolaridad</label>
              <input 
                type="text"
                placeholder="Nivel y año de estudios..."
                value={document.nivel}
                onChange={(e) => handleFieldChange("nivel", e.target.value)}
                className="w-full bg-transparent border-b border-outline-variant/30 p-1 text-sm font-semibold text-primary focus:outline-none focus:border-action transition-colors"
                id="doc-nivel"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider font-sans">Proyecto Socioproductivo (PSP)</label>
              <input 
                type="text"
                placeholder="Título del Proyecto Socioproductivo comunitario..."
                value={document.psp}
                onChange={(e) => handleFieldChange("psp", e.target.value)}
                className="w-full bg-transparent border-b border-outline-variant/30 p-1 text-sm text-primary focus:outline-none focus:border-action transition-colors"
                id="doc-psp"
              />
            </div>
          </div>

          {/* 2. Four Methodological Moments */}
          <div className="space-y-8">
            <h3 className="text-xs font-bold text-on-surface-variant tracking-widest uppercase mb-4 border-b border-outline-variant/10 pb-2">
              Momentos Metodológicos (Estructuración Didáctica)
            </h3>

            {/* Moment 1: Práctica */}
            <section className="flex gap-4 group">
              <div className="hidden sm:flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-sm text-primary custom-card-shadow group-focus-within:bg-action group-focus-within:text-white transition-colors">
                  1
                </div>
                <div className="w-0.5 h-full bg-outline-variant/20 group-last:hidden" />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <h4 className="text-md font-bold text-primary font-sans leading-none">Práctica</h4>
                  <p className="text-[10px] text-on-surface-variant font-semibold">ACTIVIDADES DESDE LA EXPERIENCIA Y EL CONTACTO DIRECTO</p>
                </div>
                <textarea
                  rows={4}
                  placeholder="Iniciamos organizando a los alumnos para experimentar o reflexionar a partir de su entorno..."
                  value={document.practica}
                  onChange={(e) => handleFieldChange("practica", e.target.value)}
                  className="w-full border border-outline-variant/40 rounded-2xl p-4 text-sm leading-relaxed focus:outline-none focus:border-action bg-surface-container-low/30 text-primary transition-all shadow-sm"
                  id="doc-practica"
                />
              </div>
            </section>

            {/* Moment 2: Teoría */}
            <section className="flex gap-4 group">
              <div className="hidden sm:flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-sm text-primary custom-card-shadow group-focus-within:bg-action group-focus-within:text-white transition-colors">
                  2
                </div>
                <div className="w-0.5 h-full bg-outline-variant/20 group-last:hidden" />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <h4 className="text-md font-bold text-primary font-sans leading-none">Teoría</h4>
                  <p className="text-[10px] text-on-surface-variant font-semibold">COMPRENSIÓN CRÍTICA Y CONCEPTUALIZACIÓN CIENTÍFICA</p>
                </div>
                <textarea
                  rows={4}
                  placeholder="Definimos los conceptos, analizamos esquemas o leemos material de referencia..."
                  value={document.teoria}
                  onChange={(e) => handleFieldChange("teoria", e.target.value)}
                  className="w-full border border-outline-variant/40 rounded-2xl p-4 text-sm leading-relaxed focus:outline-none focus:border-action bg-surface-container-low/30 text-primary transition-all shadow-sm"
                  id="doc-teoria"
                />
              </div>
            </section>

            {/* Moment 3: Valoración */}
            <section className="flex gap-4 group">
              <div className="hidden sm:flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-sm text-primary custom-card-shadow group-focus-within:bg-action group-focus-within:text-white transition-colors">
                  3
                </div>
                <div className="w-0.5 h-full bg-outline-variant/20 group-last:hidden" />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <h4 className="text-md font-bold text-primary font-sans leading-none">Valoración</h4>
                  <p className="text-[10px] text-on-surface-variant font-semibold">REFLEXIÓN ÉTICA, COMUNITARIA Y AUTOEVALUACIÓN</p>
                </div>
                <textarea
                  rows={4}
                  placeholder="Reflexionamos grupalmente sobre el impacto ético y pertinencia de lo aprendido..."
                  value={document.valoracion}
                  onChange={(e) => handleFieldChange("valoracion", e.target.value)}
                  className="w-full border border-outline-variant/40 rounded-2xl p-4 text-sm leading-relaxed focus:outline-none focus:border-action bg-surface-container-low/30 text-primary transition-all shadow-sm"
                  id="doc-valoracion"
                />
              </div>
            </section>

            {/* Moment 4: Producción */}
            <section className="flex gap-4 group">
              <div className="hidden sm:flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-sm text-primary custom-card-shadow group-focus-within:bg-action group-focus-within:text-white transition-colors">
                  4
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <h4 className="text-md font-bold text-primary font-sans leading-none">Producción</h4>
                  <p className="text-[10px] text-on-surface-variant font-semibold">ELABORACIÓN DE PRODUCTOS TANGIBLES O INTANGIBLES</p>
                </div>
                <textarea
                  rows={4}
                  placeholder="Diseñamos afiches, maquetas, soluciones prácticas o realizamos exposiciones..."
                  value={document.produccion}
                  onChange={(e) => handleFieldChange("produccion", e.target.value)}
                  className="w-full border border-outline-variant/40 rounded-2xl p-4 text-sm leading-relaxed focus:outline-none focus:border-action bg-surface-container-low/30 text-primary transition-all shadow-sm"
                  id="doc-produccion"
                />
              </div>
            </section>
          </div>

          {/* Neurodidactic Explanation Box */}
          {document.explicacionNeuro && (
            <div className="mt-8 pt-6 border-t border-outline-variant/20 space-y-3">
              <div className="flex items-center gap-2 text-action">
                <Sparkles size={18} />
                <h4 className="text-sm font-bold tracking-wide uppercase font-sans">Sustentación Neurodidáctica de la Secuencia</h4>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed italic bg-surface-container-low/40 p-4 rounded-2xl border border-outline-variant/10">
                {document.explicacionNeuro}
              </p>
            </div>
          )}
          
          {/* Print specific signature line */}
          <div className="hidden print-only mt-16 pt-8 border-t border-dashed border-outline/50 flex justify-around">
            <div className="text-center space-y-1">
              <div className="w-48 border-b border-black mx-auto" />
              <p className="text-xs">Firma del Planificador</p>
            </div>
            <div className="text-center space-y-1">
              <div className="w-48 border-b border-black mx-auto" />
              <p className="text-xs">Dirección Académica</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
