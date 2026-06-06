import React from "react";
import { AppTab } from "../types";
import logosLabLogo from "../assets/LogusLab.jpeg";
import {
  Home,
  BookOpen,
  Landmark,
  Brain,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  Menu,
  X
} from "lucide-react";

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onGeneratePlanClick: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onGeneratePlanClick }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = [
    { id: "dashboard", label: "Inicio", icon: Home },
    { id: "pdc", label: "PDC Express", icon: BookOpen },
    { id: "insumos", label: "Fichas Didácticas", icon: BookOpen },
    { id: "banco", label: "Comunidad", icon: Landmark },
    { id: "neuro", label: "Neuro Lab", icon: Brain },
    { id: "ajustes", label: "Ajustes", icon: Settings },
  ] as const;

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center w-full px-4 h-16 bg-surface border-b border-outline-variant/30 sticky top-0 z-40 custom-card-shadow no-print">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
          <img src={logosLabLogo} alt="LogosLab" className="w-9 h-9 rounded-lg object-cover custom-card-shadow" />
          <h1 className="font-bold text-lg text-primary tracking-tight">LogosLab</h1>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-on-surface-variant p-2 rounded-lg hover:bg-surface-container transition-colors"
          id="mobile-menu-btn"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar background overlay for mobile */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/45 z-40 transition-opacity no-print"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-surface border-r border-outline-variant/30 flex flex-col h-full z-50 transition-transform duration-300 no-print
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {/* Brand Header */}
        <div className="p-6 border-b border-outline-variant/20 flex items-center gap-3">
          <img src={logosLabLogo} alt="LogosLab" className="w-11 h-11 rounded-xl object-cover custom-card-shadow" />
          <div>
            <h1 className="font-bold text-lg text-primary tracking-tight leading-tight">LogosLab</h1>
            <p className="text-xs text-on-surface-variant font-medium">Asistente Pedagógico</p>
          </div>
        </div>

        {/* Generate Plan CTA Button */}
        <div className="p-4">
          <button
            id="sidebar-generate-plan"
            onClick={() => {
              setMobileOpen(false);
              onGeneratePlanClick();
            }}
            className="w-full bg-action text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#00bdae] active:scale-[0.98] transition-all custom-card-shadow flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Sparkles size={18} className="group-hover:animate-bounce" />
            <span>Planificar Clase</span>
          </button>
        </div>

        {/* Primary Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all active:translate-x-1 cursor-pointer
                  ${isActive
                    ? "bg-primary text-white font-bold shadow-md"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"}
                `}
              >
                <IconComponent size={20} className={isActive ? "text-action stroke-[2.5px]" : "stroke-[2px]"} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Support/Logout links */}
        <div className="p-4 border-t border-outline-variant/20 space-y-1">
          <button
            onClick={() => {
              setActiveTab("dashboard");
              alert("¿Necesitas ayuda? Visita nuestro canal de mentorías o consulta al Copiloto Empático en la pantalla de inicio.");
              setMobileOpen(false);
            }}
            id="nav-help"
            className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-low hover:text-primary rounded-xl font-medium text-sm transition-all cursor-pointer"
          >
            <HelpCircle size={18} />
            <span>Ayuda</span>
          </button>
          <button
            onClick={() => {
              if (confirm("¿Estás seguro de que deseas salir del ecosistema de planificación?")) {
                alert("Has cerrado sesión en LogosLab. ¡Vuelve pronto!");
              }
            }}
            id="nav-logout"
            className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-low hover:text-red-600 rounded-xl font-medium text-sm transition-all cursor-pointer"
          >
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}
