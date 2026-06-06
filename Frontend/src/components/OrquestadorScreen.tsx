import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, PdcDocument } from "../types";
import { EMOTIONAL_CLIMATES } from "../data";
import { 
  Sparkles, 
  Send, 
  Brain, 
  User, 
  ArrowRight, 
  Loader2, 
  FileCheck,
  AlertCircle
} from "lucide-react";

interface OrquestadorScreenProps {
  onPdcGenerated: (doc: PdcDocument) => void;
  materia: string;
  setMateria: (m: string) => void;
  tema: string;
  setTema: (t: string) => void;
  clima: string;
  setClima: (c: string) => void;
}

export default function OrquestadorScreen({
  onPdcGenerated,
  materia,
  setMateria,
  tema,
  setTema,
  clima,
  setClima
}: OrquestadorScreenProps) {
  const [detalles, setDetalles] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "¡Hola! Soy tu Copiloto Empático. Estoy aquí para ayudarte a estructurar tu próxima clase con bases de neuroeducación y alineada a los requerimientos oficiales. Configura los parámetros iniciales de tu clase abajo y cuéntame tus metas.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadingSteps = [
    "Activando neuronas espejo...",
    "Estructurando propuesta didáctica por Ley 070...",
    "Formulando actividades lúdicas para Práctica...",
    "Definiendo conceptos claves para Teoría...",
    "Calculando asimilación de dopamina según clima emocional...",
    "Enlazando con el Proyecto Socioproductivo (PSP)...",
    "Generando plan final en formato Workspace..."
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingSteps.length);
      }, 2500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleStartPlanificacion = async () => {
    if (!materia.trim()) {
      setErrorStatus("Por favor especifica la Materia.");
      return;
    }
    if (!tema.trim()) {
      setErrorStatus("Por favor especifica el Tema.");
      return;
    }

    setErrorStatus(null);
    setLoading(true);

    // Add user parameter summary as a message
    const cleanClima = clima || "Alegría";
    const userMessageContent = `Quiero planificar para la materia de **${materia}** con el tema **"${tema}"**. El clima emocional escogido es **${cleanClima}**. ${detalles ? `Detalles adicionales: ${detalles}` : ""}`;
    
    const userMessageObj: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userMessageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessageObj]);

    try {
      const response = await fetch("/api/generate-pdc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materia,
          tema,
          clima: cleanClima,
          detalles
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Fallo en la comunicación con el servidor.");
      }

      const generatedPlan: PdcDocument = await response.json();

      // Add assistant response showing success
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: `¡Listo! He formulado un Plan de Desarrollo Curricular (PDC) con neuroenfoque adaptado para el tema de **"${tema}"**. 

Unidad Académica sugerida: **${generatedPlan.institucion}**
PSP formulado: ${generatedPlan.psp}

✨ **Práctica:** ${generatedPlan.practica.substring(0, 150)}...
✨ **Teoría:** ${generatedPlan.teoria.substring(0, 150)}...

*Nota Neurofisiológica:* ${generatedPlan.explicacionNeuro || "Adaptada para incentivar la receptividad."}

He cargado este borrador en tu sistema. Haz clic abajo en **Ir a PDC Express** para verlo completo, editarlo y exportarlo en formato PDF de Ley 070.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
      onPdcGenerated(generatedPlan);
      setDetalles("");
    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || "Error al procesar la planificación. Por favor verifica las credenciales.");
      
      setMessages((prev) => [...prev, {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: `Lo siento, experimentamos un inconveniente al generar la planificación. Por favor, asegúrese de que el servidor tenga la clave secreta \`GEMINI_API_KEY\` configurada en el panel de Secrets de AI Studio.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!detalles.trim()) return;

    setErrorStatus(null);
    const textEntry = detalles;
    setDetalles("");

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textEntry,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          materia,
          tema,
          clima
        })
      });

      if (!response.ok) {
        throw new Error("Error en el chat inteligente.");
      }

      const resData = await response.json();

      setMessages((prev) => [...prev, {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: resData.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [...prev, {
        id: `assistant-err-${Date.now()}`,
        role: "assistant",
        content: `Disculpa, no pude procesar tu mensaje. Detalles: ${err.message || 'Error de conexión'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] animate-fade-in max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-primary font-sans">Agente Orquestador</h2>
        <p className="text-sm text-on-surface-variant font-medium">Asistencia empática para estructurar tu próximo plan didáctico.</p>
      </div>

      {/* Main Chat Box Container */}
      <div className="flex-1 bg-surface rounded-3xl border border-outline-variant/30 custom-card-shadow flex flex-col overflow-hidden relative">
        
        {/* Alerts for API Configuration Error */}
        {errorStatus && (
          <div className="bg-red-50 text-red-700 p-3 px-4 border-b border-red-100 flex items-center gap-2 text-sm font-semibold">
            <AlertCircle size={16} />
            <span>{errorStatus}</span>
          </div>
        )}

        {/* Scrollable messages zone */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.map((msg) => {
            const isAsst = msg.role === "assistant";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isAsst ? "mr-auto" : "ml-auto flex-row-reverse"}`}
              >
                {/* Avatar Icon */}
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center custom-card-shadow
                  ${isAsst ? "bg-primary-container text-action" : "bg-action text-white"}
                `}>
                  {isAsst ? <Brain size={18} /> : <User size={18} />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1">
                  <div className={`
                    p-4 rounded-3xl text-sm leading-relaxed whitespace-pre-wrap
                    ${isAsst 
                      ? "bg-surface-container-low text-primary border border-outline-variant/20 rounded-tl-sm" 
                      : "bg-[#e7defe] text-primary rounded-tr-sm"}
                  `}>
                    {/* Raw simple markdown bold replacement for beauty */}
                    {msg.content.split("\n").map((line, lIdx) => {
                      // basic replaces for ** bolding
                      let processed = line;
                      const parts = [];
                      const boldRegex = /\*\*(.*?)\*\*/g;
                      let lastIndex = 0;
                      let match;

                      while ((match = boldRegex.exec(processed)) !== null) {
                        if (match.index > lastIndex) {
                          parts.push(processed.substring(lastIndex, match.index));
                        }
                        parts.push(<strong key={match.index} className="font-bold text-primary">{match[1]}</strong>);
                        lastIndex = boldRegex.lastIndex;
                      }
                      if (lastIndex < processed.length) {
                        parts.push(processed.substring(lastIndex));
                      }

                      return (
                        <p key={lIdx} className={line ? "mb-2" : "mb-4"}>
                          {parts.length > 0 ? parts : line}
                        </p>
                      );
                    })}

                    {/* Show PDC config inputs inside the initial chat message context */}
                    {msg.id === "welcome" && (
                      <div className="mt-4 border border-outline-variant/30 rounded-2xl p-4 bg-surface custom-card-shadow space-y-4 no-print text-[13px] text-primary">
                        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                          📋 Configuración Inicial del Plan
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-semibold block mb-1">Materia / Área Académica</label>
                            <input
                              type="text"
                              required
                              placeholder="Ej. Matemáticas, Literatura, Biología..."
                              value={materia}
                              onChange={(e) => setMateria(e.target.value)}
                              className="w-full text-xs px-3 py-2 border border-outline-variant bg-surface-container-low rounded-xl focus:outline-none focus:border-action transition-colors text-primary"
                            />
                          </div>

                          <div>
                            <label className="font-semibold block mb-1">Tema Específico de Clase</label>
                            <input
                              type="text"
                              required
                              placeholder="Ej. Ecuaciones, Análisis Lírico, Mitosis..."
                              value={tema}
                              onChange={(e) => setTema(e.target.value)}
                              className="w-full text-xs px-3 py-2 border border-outline-variant bg-surface-container-low rounded-xl focus:outline-none focus:border-action transition-colors text-primary"
                            />
                          </div>
                        </div>

                        {/* Emotional climate selector */}
                        <div>
                          <label className="font-semibold block mb-1">Clima Emocional Deseado en el Aula</label>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {EMOTIONAL_CLIMATES.map((mood) => {
                              const isSelected = clima === mood.label;
                              return (
                                <button
                                  key={mood.label}
                                  type="button"
                                  onClick={() => setClima(mood.label)}
                                  title={mood.description}
                                  className={`
                                    flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all cursor-pointer font-medium
                                    ${isSelected 
                                      ? "bg-primary-container text-primary border-action font-semibold scale-105 shadow-sm" 
                                      : "border-outline-variant text-on-surface-variant bg-surface hover:bg-surface-container-low"}
                                  `}
                                >
                                  <span>{mood.icon}</span>
                                  <span>{mood.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Timestamp */}
                  <span className={`text-[10px] text-on-surface-variant block ${isAsst ? "text-left pl-1" : "text-right pr-1"}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Chat Loader element */}
          {loading && (
            <div className="flex gap-3 max-w-[80%] mr-auto">
              <div className="w-10 h-10 rounded-full bg-primary-container text-action flex items-center justify-center flex-shrink-0 animate-pulse">
                <Brain size={18} />
              </div>
              <div className="bg-surface-container-low text-primary border border-outline-variant/20 p-4 rounded-3xl rounded-tl-sm flex items-center gap-3 text-sm font-medium">
                <Loader2 size={18} className="animate-spin text-action" />
                <span>{loadingSteps[loadingStep]}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Setup and general submit area */}
        <div className="p-4 border-t border-outline-variant/30 bg-surface-container-low/40 no-print">
          <div className="relative flex items-center max-w-4xl mx-auto gap-2">
            <textarea
              placeholder={materia && tema ? "Añade detalles del grupo (ej: 'alumnos kinestésicos', '45 minutos') o escribe aquí..." : "Completa la materia y el tema en la caja de arriba primero..."}
              rows={1}
              value={detalles}
              onChange={(e) => setDetalles(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (materia && tema) {
                    handleSendMessage();
                  } else {
                    setErrorStatus("Escribe Materia y Tema en el formulario inicial.");
                  }
                }
              }}
              className="w-full border border-outline-variant/40 rounded-2xl pl-4 pr-12 py-3.5 text-sm outline-none focus:border-action transition-colors resize-none bg-surface custom-card-shadow text-primary"
            />
            
            <button
              id="chat-send-btn"
              onClick={materia && tema ? handleSendMessage : () => setErrorStatus("Completa Materia y Tema primero.")}
              className="absolute right-2 top-1.5 bg-[#00d2c4] text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#00bdae] active:scale-95 transition-all cursor-pointer"
            >
              <Send size={16} />
            </button>
          </div>

          {/* Quick planning Action Trigger */}
          <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
            <button
              id="orquestador-launch-pdc"
              onClick={handleStartPlanificacion}
              disabled={loading}
              className="bg-action text-white font-bold text-sm py-3 px-8 rounded-xl hover:bg-[#00bdae] active:scale-[0.98] transition-all custom-card-shadow flex items-center gap-2 group cursor-pointer disabled:opacity-50"
            >
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
              <span>Iniciar Planificación con IA</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
