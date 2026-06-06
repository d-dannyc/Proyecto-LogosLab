import React, { useState } from "react";
import { LessonPlan, PdcDocument } from "../types";
import { DEFAULT_LESSON_PLANS } from "../data";
import { 
  Search, 
  Filter, 
  Star, 
  Eye, 
  Copy, 
  CheckCircle,
  Loader2,
  Sparkles,
  Award
} from "lucide-react";

interface BancoCooperativoScreenProps {
  onLoadPlanIntoEditor: (plan: LessonPlan) => void;
}

export default function BancoCooperativoScreen({ onLoadPlanIntoEditor }: BancoCooperativoScreenProps) {
  const [plans, setPlans] = useState<LessonPlan[]>(DEFAULT_LESSON_PLANS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Clone loading simulation states
  const [cloningId, setCloningId] = useState<string | null>(null);

  const categories = ["Todas", "Matemáticas", "Literatura", "Historia", "Ciencias"];

  const filteredPlans = plans.filter(p => {
    const matchesCategory = activeCategory === "Todas" || p.materia.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = p.materia.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.autor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleClonePlan = (plan: LessonPlan) => {
    setCloningId(plan.id);
    
    setTimeout(() => {
      setPlans(prev => prev.map(p => p.id === plan.id ? { ...p, clonado: true } : p));
      setCloningId(null);
      
      // Auto-load into active PDC Express workspace
      onLoadPlanIntoEditor(plan);
      alert(`¡"${plan.titulo}" se ha clonado con éxito!\nLos contenidos han sido precargados en tu Workspace de PDC Express.`);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Search Header row mimicking Screen 2 */}
      <div className="no-print flex flex-col md:flex-row items-center justify-between gap-4 bg-surface p-4 rounded-3xl border border-outline-variant/30 custom-card-shadow">
        
        {/* Advanced search bar */}
        <div className="relative w-full max-w-xl flex items-center">
          <Search size={18} className="absolute left-4 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Buscar en el Banco Cooperativo por Materia o Tema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-10 py-3 bg-surface-container-low border border-outline-variant rounded-full focus:outline-none focus:border-action transition-colors text-primary font-medium"
            id="coop-search-input"
          />
          <button className="absolute right-4 text-on-surface-variant hover:text-action transition-colors">
            <Filter size={16} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full">
            <Sparkles size={14} className="text-action" />
            <span className="text-[10px] uppercase font-bold text-primary tracking-wider font-sans">
              Comunidad Activa boliviana
            </span>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <header className="space-y-2">
        <h2 className="text-3xl font-bold font-sans text-primary tracking-tight">Clases Exquisitas</h2>
        <p className="text-sm text-on-surface-variant max-w-2xl font-medium">
          Descubre, clona e integra secuencias didácticas completas y planes curriculares excepcionales creados por docentes de la comunidad.
        </p>
      </header>

      {/* Category Tags Selector */}
      <div className="flex flex-wrap gap-2 pb-2">
        {categories.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-5 py-2 rounded-full font-semibold text-xs border tracking-wide transition-all cursor-pointer
                ${isActive 
                  ? "bg-primary text-on-primary border-primary font-bold custom-card-shadow scale-105" 
                  : "bg-surface text-on-surface-variant border-outline-variant/40 hover:bg-surface-container-low"}
              `}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of Lesson Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((p) => (
          <div
            key={p.id}
            className="bg-surface rounded-3xl border border-outline-variant/30 p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-300 custom-card-shadow relative group"
          >
            <div>
              {/* Header inside Card */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container px-3 py-1 rounded-full uppercase">
                  {p.materia}
                </span>
                
                {/* Star rating */}
                <span className="flex items-center gap-1.5 text-axs font-bold text-on-surface-variant">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span>{p.rating.toFixed(1)}</span>
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-primary mb-2 line-clamp-1 group-hover:text-action transition-colors font-sans">
                {p.titulo}
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3 mb-6">
                {p.descripcion}
              </p>
            </div>

            {/* Author details & Cloning action bar */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {p.autorAvatar ? (
                  <img
                    src={p.autorAvatar}
                    alt={p.autor}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover border border-outline-variant"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-primary-container text-primary font-bold text-[10px] flex items-center justify-center">
                    {p.autor.charAt(0)}
                  </div>
                )}
                <span className="text-xs font-semibold text-on-surface-variant">
                  by {p.autor}
                </span>
              </div>

              {/* Action buttons inside Card footer */}
              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/10 text-[11px] text-on-surface-variant font-medium">
                <span className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>{p.views}</span>
                </span>

                {p.clonado ? (
                  <span className="text-green-600 font-bold flex items-center gap-1 animate-fade-in">
                    <CheckCircle size={14} />
                    <span>Clonado ✓</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleClonePlan(p)}
                    disabled={cloningId === p.id}
                    className="text-action hover:text-[#00bdae] font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer disabled:opacity-50"
                  >
                    {cloningId === p.id ? (
                      <>
                        <Loader2 size={12} className="animate-spin" />
                        <span>Clonando...</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Clonar</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredPlans.length === 0 && (
          <div className="col-span-full text-center py-12 bg-surface rounded-3xl border border-dashed border-outline-variant/40 custom-card-shadow">
            <p className="text-sm font-semibold text-on-surface-variant">
              No se encontraron planes pedagógicos para "{searchQuery}"
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("Todas"); }}
              className="mt-2 text-xs text-action font-bold hover:underline"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
