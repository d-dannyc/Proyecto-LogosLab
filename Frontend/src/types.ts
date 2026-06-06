export type AppTab = 'dashboard' | 'orquestador' | 'pdc' | 'neuro' | 'banco' | 'insumos' | 'ajustes';

export interface PdcDocument {
  institucion: string;
  nivel: string;
  psp: string;
  practica: string;
  teoria: string;
  valoracion: string;
  produccion: string;
  explicacionNeuro?: string;
}

export interface InsumoDocument {
  tituloFicha: string;
  seccionConcepto: string;
  actividades: string[];
  retoVocacional: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface LessonPlan {
  id: string;
  materia: string;
  rating: number;
  titulo: string;
  descripcion: string;
  autor: string;
  autorAvatar?: string;
  views: string;
  clonado?: boolean;
}

export interface NeuroDynamic {
  id: string;
  titulo: string;
  area: 'Atención' | 'Memoria' | 'Colaboración';
  duracion: string;
  tipoSugerido: string;
  explicacion: string;
  pasos: string[];
  imageUrl?: string;
}
