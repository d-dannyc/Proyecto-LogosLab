import { LessonPlan, NeuroDynamic, PdcDocument } from "./types";

export const EMOTIONAL_CLIMATES = [
  { label: "Alegría", icon: "😊", description: "Fomenta la dopamina, la curiosidad y la asimilación activa." },
  { label: "Tristeza", icon: "😢", description: "Requiere contención empática y enfoque reflexivo lento." },
  { label: "Miedo", icon: "😨", description: "Baja la receptividad; aconseja dinámicas de sintonía y seguridad." },
  { label: "Ira", icon: "😡", description: "Canaliza la energía acumulada mediante actividades físicas constructivas." },
  { label: "Asco", icon: "🤢", description: "Aprovecha el rechazo innato para debates éticos o desmitificaciones." },
  { label: "Sorpresa", icon: "😲", description: "El mayor disparador de la atención neurobiológica. ¡Momento Eureka!" }
];

export const DEFAULT_LESSON_PLANS: LessonPlan[] = [
  {
    id: "1",
    materia: "Matemáticas",
    rating: 4.9,
    titulo: "Introducción al Cálculo: Límites",
    descripcion: "Un enfoque intuitivo para entender los límites usando modelos visuales y ejemplos del mundo real antes de introducir definiciones formales.",
    autor: "Prof. Davis",
    autorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    views: "1.2k vistas",
    clonado: false
  },
  {
    id: "2",
    materia: "Literatura",
    rating: 4.8,
    titulo: "Análisis de Poesía Modernista",
    descripcion: "Una guía estructurada para deconstruir 'La Tierra Baldía' de Eliot enfatizando anotaciones colaborativas en grupo.",
    autor: "M. Santos",
    autorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    views: "840 vistas",
    clonado: false
  },
  {
    id: "3",
    materia: "Ciencias",
    rating: 5.0,
    titulo: "Laboratorio de Respiración Celular",
    descripcion: "Protocolo de experimento práctico usando materiales simples para demostrar la respiración aeróbica en levaduras.",
    autor: "Dr. Chen",
    autorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    views: "2.1k vistas",
    clonado: false
  },
  {
    id: "4",
    materia: "Historia",
    rating: 4.7,
    titulo: "Civilización Incaica y su Red Vial",
    descripcion: "Exploración de la ingeniería andina y el sistema de caminos (Qhapaq Ñan) utilizando mapas físicos y recreaciones en el aula.",
    autor: "Prof. Quispe",
    autorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    views: "620 vistas",
    clonado: false
  },
  {
    id: "5",
    materia: "Ciencias",
    rating: 4.9,
    titulo: "Física Acústica con Botellas de Vidrio",
    descripcion: "Demostración de resonancia acústica y escalas musicales soplando en botellas llenas de agua graduada.",
    autor: "Prof. Ramos",
    autorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    views: "1.5k vistas",
    clonado: false
  }
];

export const DEFAULT_NEURO_DYNAMICS: NeuroDynamic[] = [
  {
    id: "nd-1",
    titulo: "Debate Relámpago",
    area: "Atención",
    duracion: "5 min",
    tipoSugerido: "Activación",
    explicacion: "Los estudiantes tienen 3 minutos para preparar argumentos en parejas sobre un tema controversial inesperado y 2 minutos para exponerlos de forma oral sin apuntes.",
    pasos: [
      "Presentar una premisa controversial rápida (ej: 'El chocolate debería considerarse una verdura').",
      "Dar 3 minutos de cronómetro para que hablen en parejas y anoten ideas cortas.",
      "Asignar caras opuestas al debate a pares elegidos al azar.",
      "Conceder 60 segundos de reloj por pareja para refutar y contraargumentar ágilmente."
    ],
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "nd-2",
    titulo: "Mapa de Conceptos Ciego",
    area: "Memoria",
    duracion: "3 min",
    tipoSugerido: "Memoria Espacial",
    explicacion: "Consiste en reconstruir un mapa conceptual complejo o árbol genealógico en la pizarra de forma colaborativa, utilizando únicamente la memoria grupal y notas adhesivas físicas.",
    pasos: [
      "Mostrar una infografía o mapa conceptual densamente estructurado durante 45 segundos.",
      "Esconder la infografía por completo.",
      "Pasar por turnos rápidos a representantes del grupo para colocar notas adhesivas rotuladas en los lugares geométricos exactos.",
      "Revisar el mapa final juntos y corregir vacíos mnemónicos."
    ],
    imageUrl: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "nd-3",
    titulo: "El Puente Incompleto",
    area: "Colaboración",
    duracion: "4 min",
    tipoSugerido: "Reto Vocacional",
    explicacion: "Ejercicio práctico de resolución de problemas constructivos donde los alumnos deben alinearse o pasarse objetos físicos comunicándose exclusivamente con gestos para completar un puente simulado.",
    pasos: [
      "Agrupar a los estudiantes en filas de 6 a 8 integrantes en silencio absoluto.",
      "Colocar baldosas o aros espaciados representando un abismo infranqueable.",
      "Darles recursos escasos (como 3 hojas de periódico) que simulan los pilares móviles.",
      "Deben cruzar la totalidad de la hilera sin hablar, coordinando puramente por lenguaje de señas."
    ],
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
  }
];

export const DEFAULT_PDC: PdcDocument = {
  institucion: "Colegio Nacional San Simón",
  nivel: "Educación Secundaria Comunitaria Productiva - 4to Año",
  psp: "\"Cuidamos nuestra salud integral consumiendo alimentos ecológicos de nuestra de región.\"",
  practica: "Iniciamos la sesión organizando a los estudiantes en un círculo para conversar sobre los alimentos que consumen habitualmente en el recreo. Realizamos una lluvia de ideas sobre cuáles consideran saludables y cuáles no.",
  teoria: "Análisis de los grupos alimenticios según la pirámide nutricional. Lectura comprensiva del texto guía sobre los beneficios de las vitaminas y minerales presentes en las frutas de temporada de la región.",
  valoracion: "Reflexionamos críticamente sobre el impacto del consumo excesivo de comida chatarra en el rendimiento escolar y la salud a largo plazo. Valoramos la importancia de elegir productos locales y naturales.",
  produccion: "Elaboración de afiches informativos promoviendo el consumo de \"meriendas saludables\" para ser expuestos en los pasillos de la unidad educativa. Creación de un menú semanal sugerido para el curso."
};
