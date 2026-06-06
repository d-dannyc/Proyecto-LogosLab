import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================================
// ABP PLANS — BANCO DE DATOS PRE-ESCRITOS PARA MODO DEMO/SIMULACIÓN
// ============================================================================

// Definimos los tipos directamente aquí para no importar archivos .tsx en el server
interface PdcDocumentServer {
  institucion: string;
  nivel: string;
  psp: string;
  practica: string;
  teoria: string;
  valoracion: string;
  produccion: string;
  explicacionNeuro?: string;
}

interface AbpPlanServer {
  id: string;
  materia: string;
  keywords: string[];
  temaProyecto: string;
  pdc: PdcDocumentServer;
  chatResponse: string;
  climaAdaptaciones: Record<string, string>;
}

// --- MATEMÁTICA ABP ---
const MATEMATICA_ABP: AbpPlanServer = {
  id: "abp-mat-001",
  materia: "Matemática",
  keywords: [
    "matematica", "matemáticas", "matematicas", "matemática",
    "math", "algebra", "álgebra", "geometria", "geometría",
    "aritmetica", "aritmética", "calculo", "cálculo",
    "trigonometria", "trigonometría", "ecuaciones", "funciones"
  ],
  temaProyecto: "Diseño de un Parque Ecológico con Geometría Aplicada",
  pdc: {
    institucion: "Unidad Educativa Fiscal \"Simón Bolívar\"",
    nivel: "Educación Secundaria Comunitaria Productiva — 3er Año — Área: Matemática",
    psp: "\"Fortalecemos la convivencia comunitaria diseñando espacios verdes saludables en nuestro barrio.\"",
    practica: `🔬 FASE EXPERIENCIAL — Medición del Territorio Real (40 min)\n\nIniciamos la sesión con un "Desafío de Arquitectos": los estudiantes salen al patio escolar organizados en equipos de 4-5 integrantes, cada equipo con una cinta métrica, cuerdas y estacas de madera.\n\nACTIVIDADES PRÁCTICAS ABP:\n1. Cada equipo mide un sector asignado del patio escolar (largo, ancho, diagonales) y registra las medidas en una "ficha de terreno" impresa.\n2. Identifican formas geométricas naturales en el espacio: rectángulos, triángulos formados por los caminos, semicírculos de los arcos.\n3. Usando cuerdas y estacas, demarcan sobre el terreno las zonas donde colocarían: área de juegos, jardín medicinal, sendero peatonal y zona de descanso.\n4. Cada equipo toma dibujos rápidos de su propuesta de distribución espacial.\n\nPREGUNTA GENERADORA: "Si el municipio les diera Bs. 50.000 para construir un parque en este terreno, ¿cómo calcularían cuántos metros cuadrados destinar a cada zona para maximizar el bienestar comunitario?"`,
    teoria: `📖 FASE CONCEPTUAL — Geometría Plana Aplicada al Diseño (35 min)\n\nA partir de los datos recolectados en el patio, sistematizamos los conceptos:\n\n• Perímetro de figuras regulares e irregulares: P = suma de todos los lados.\n• Área de rectángulos (A = b × h), triángulos (A = b × h / 2) y círculos (A = π × r²).\n• Concepto de ESCALA cartográfica: Relación entre la medida real y la medida en el plano. Escala 1:100 significa que 1 cm en el papel = 1 metro en la realidad.\n• Proporciones y porcentajes: Si el terreno mide 800 m², ¿qué porcentaje destinar a áreas verdes (mínimo 40% según normativa ambiental)?\n\nEJERCICIO GUIADO: Con los datos reales medidos, cada equipo calcula el perímetro total, el área total, la distribución porcentual y el plano a escala 1:50 en papel milimetrado.`,
    valoracion: `💭 FASE REFLEXIVA — Geometría, Comunidad y Vocación (20 min)\n\n• "¿Cómo cambia la calidad de vida de un barrio cuando tiene espacios verdes bien diseñados?"\n• "¿Sabían que en Bolivia, el 67% de los barrios periurbanos carecen de parques públicos planificados?"\n\nDESAFÍO VOCACIONAL: Identifican profesiones que usan geometría diariamente: Arquitecto, Ingeniero civil, Topógrafo, Diseñador de interiores, Urbanista.\n\nAUTOEVALUACIÓN con rúbrica de 3 preguntas (1-5).`,
    produccion: `🎨 FASE PRODUCTIVA — Plano del Parque Ecológico Ideal (30 min + tarea)\n\nCada equipo elabora un PLANO A ESCALA del "Parque Ecológico Ideal" en papelógrafo tamaño resma:\n\n1. PLANO GEOMÉTRICO (escala 1:50) con código de colores y leyenda.\n2. TABLA DE PRESUPUESTO ESTIMADO con costo por m² y presupuesto total.\n3. FICHA TÉCNICA del proyecto (nombre, ubicación, superficie, beneficiarios).\n\nEXPOSICIÓN: Cada equipo presenta su plano al curso en 3 minutos. Los mejores se exhiben en la feria escolar.`,
    explicacionNeuro: `🧠 Esta secuencia ABP activa: SISTEMA DOPAMÍNICO (manipulación tangible), MEMORIA ESPACIAL (escalas y planos), CORTEZA PREFRONTAL (planificación y presupuesto) y NEURONAS ESPEJO (trabajo cooperativo). El proyecto con SIGNIFICADO REAL genera "anclaje emocional del aprendizaje".`
  },
  chatResponse: `¡Excelente elección, profe! 🎯 He diseñado una planificación ABP completa para **Matemática** con un enfoque que hará que tus estudiantes *amen* la geometría.\n\n**🏗️ PROYECTO ABP: "Diseñamos un Parque Ecológico usando Geometría"**\n\nLos estudiantes se convertirán en **arquitectos comunitarios** que deben diseñar un parque ecológico real.\n\n✨ **Práctica:** Salen al patio a medir terrenos reales con cintas métricas y cuerdas.\n✨ **Teoría:** Fórmulas de perímetro, área y escala desde los datos que midieron.\n✨ **Valoración:** Reflexión sobre geometría y comunidad + descubrimiento vocacional.\n✨ **Producción:** Plano a escala en papelógrafo con tabla de presupuesto.\n\n*🧠 Nota Neurodidáctica:* La manipulación tangible libera dopamina sostenida. El proyecto con significado social genera "anclaje emocional del aprendizaje".\n\nHe cargado el PDC completo en tu Workspace. Haz clic en **Ir a PDC Express** para verlo, editarlo y exportarlo como PDF Ley 070. 📄`,
  climaAdaptaciones: {
    "Alegría": "El clima de alegría potenciará la fase práctica. Aprovecha la energía positiva para competencias amistosas entre equipos de medición.",
    "Tristeza": "Inicia con un momento de conexión grupal: \"¿Qué lugar de su barrio les trae paz?\" Canaliza la introspección hacia el diseño de un parque como espacio de sanación.",
    "Miedo": "Forma los equipos tú mismo, da instrucciones paso a paso y celebra cada medición correcta. El éxito progresivo reconstruirá la confianza.",
    "Ira": "Canaliza la energía en la actividad física de medir el patio. Transforma la intensidad emocional en intensidad productiva.",
    "Asco": "Redirige hacia el pensamiento crítico: \"¿No les da asco que nuestro barrio no tenga ni un parque?\" La indignación constructiva como motor del proyecto.",
    "Sorpresa": "Empieza con: \"¿Sabían que con solo 800 m² se puede crear un oasis para 200 familias?\" Mantén la sorpresa revelando fórmulas como \"superpoderes\"."
  }
};

// --- FÍSICA ABP ---
const FISICA_ABP: AbpPlanServer = {
  id: "abp-fis-001",
  materia: "Física",
  keywords: [
    "fisica", "física", "physics", "termodinamica", "termodinámica",
    "mecanica", "mecánica", "optica", "óptica", "ondas",
    "electricidad", "magnetismo", "cinemática", "cinematica",
    "energia", "energía", "calor", "temperatura", "movimiento"
  ],
  temaProyecto: "Construcción de un Calentador Solar con Materiales Reciclados",
  pdc: {
    institucion: "Unidad Educativa Fiscal \"Elizardo Pérez\"",
    nivel: "Educación Secundaria Comunitaria Productiva — 4to Año — Área: Física",
    psp: "\"Cuidamos nuestra Madre Tierra promoviendo el uso de energías limpias y renovables en nuestra comunidad.\"",
    practica: `🔬 FASE EXPERIENCIAL — Laboratorio Solar en el Patio (45 min)\n\nIniciamos con un "Reto de Ingenieros Solares": construyen un calentador solar funcional con materiales reciclados.\n\nMATERIALES POR EQUIPO:\n— 2 botellas PET transparentes + 1 pintada de negro mate\n— 1 caja de cartón forrada con papel aluminio\n— Agua, termómetro, cronómetro\n\nPROTOCOLO:\n1. Configuración A: PET transparente con agua al sol.\n2. Configuración B: PET negra con agua al sol.\n3. Configuración C: PET negra dentro de caja con reflectores (efecto invernadero).\n\nRegistrar temperatura cada 5 min durante 25 min.\n\nPREGUNTA GENERADORA: "Si una familia rural no tiene gas ni electricidad, ¿podría usar este principio para calentar agua?"`,
    teoria: `📖 FASE CONCEPTUAL — Transferencia de Calor y Energía Solar (35 min)\n\nFORMAS DE TRANSFERENCIA DE CALOR:\n— RADIACIÓN: ~1000 W/m² en superficie terrestre.\n— ABSORCIÓN: Objetos oscuros absorben hasta 95% vs. claros ~30%.\n— CONDUCCIÓN: Calor del plástico al agua por contacto molecular.\n— CONVECCIÓN: Agua caliente sube, fría baja, distribuyendo el calor.\n\nEFECTO INVERNADERO a escala: La caja con aluminio atrapa la radiación infrarroja.\n\nCÁLCULOS: ΔT = T_final - T_inicial; Q = m × c × ΔT; Eficiencia η = (Q_útil / Q_solar) × 100%`,
    valoracion: `💭 FASE REFLEXIVA — Energía, Justicia Social y Vocación (20 min)\n\n• "En Bolivia, más de 300.000 familias rurales no tienen acceso a gas domiciliario."\n• Debate: "¿Es viable reemplazar el gas con energía solar en Bolivia?"\n\nDESAFÍO VOCACIONAL: Ingeniero en renovables, Físico investigador, Técnico solar, Ambientalista, Emprendedor de tecnología limpia.\n\nPost-it: "La profesión que más me interesa es _____ porque _____."`,
    produccion: `🎨 FASE PRODUCTIVA — Prototipo y Ficha Técnica (30 min + tarea)\n\n1. PROTOTIPO OPTIMIZADO: Más reflectores, superficies negras, sellado mejorado.\n2. INFORME DE LABORATORIO: Hipótesis, tabla de datos, gráfica Temperatura vs. Tiempo, cálculo de ΔT y Q.\n3. PROPUESTA COMUNITARIA: Plan de implementación con costos vs. gas anual.\n\nEXPOSICIÓN: 4 minutos por equipo. Los mejores prototipos van a la feria de ciencias.`,
    explicacionNeuro: `🧠 APRENDIZAJE KINESTÉSICO activa corteza motora + cerebelo. CURIOSIDAD EXPERIMENTAL genera bucle de dopamina anticipatoria. DATOS REALES > ficticios (sistema de relevancia personal). SIGNIFICADO SOCIAL genera empatía y motivación intrínseca.`
  },
  chatResponse: `¡Fantástico, profe! 🔥 He preparado una planificación ABP de **Física** que convertirá tu aula en un laboratorio de innovación.\n\n**☀️ PROYECTO ABP: "Construimos un Calentador Solar con Materiales Reciclados"**\n\nLos estudiantes se transforman en **ingenieros de energía renovable**.\n\n✨ **Práctica:** Construyen 3 configuraciones solares y miden temperatura cada 5 min durante 25 min.\n✨ **Teoría:** Radiación, conducción, convección y efecto invernadero desde sus datos reales.\n✨ **Valoración:** Debaten si Bolivia podría reemplazar gas con energía solar.\n✨ **Producción:** Prototipo optimizado + informe de laboratorio + propuesta comunitaria.\n\n*🧠 Nota Neurodidáctica:* Construir con las manos crea memorias procedimentales duraderas. La pregunta "¿cuál botella calentará más?" genera dopamina anticipatoria irresistible.\n\nHe cargado el PDC completo en tu Workspace. Haz clic en **Ir a PDC Express** para verlo y exportarlo. 📄`,
  climaAdaptaciones: {
    "Alegría": "Organiza una competencia: \"¿Qué equipo logra la mayor temperatura en 25 minutos?\" La euforia multiplicará la dopamina.",
    "Tristeza": "Conecta con el cuidado: \"Vamos a crear algo que ayude a familias sin gas.\" Construir con las manos es terapéutico.",
    "Miedo": "Explica cada paso antes de ejecutarlo, celebra cada medición exitosa. El éxito incremental reconstruye confianza.",
    "Ira": "Canaliza en la construcción física. \"¿No les indigna que haya familias sin gas mientras desperdiciamos el sol?\"",
    "Asco": "\"¿No les da asco que botemos miles de botellas PET al río mientras podríamos usarlas para calentar agua gratis?\"",
    "Sorpresa": "Lleva una botella pre-calentada: \"¿Cómo es posible que el sol calentó esto sin fuego?\" Mantén el factor WOW."
  }
};

// --- QUÍMICA ABP ---
const QUIMICA_ABP: AbpPlanServer = {
  id: "abp-qui-001",
  materia: "Química",
  keywords: [
    "quimica", "química", "chemistry", "reacciones", "elementos",
    "tabla periodica", "tabla periódica", "enlace", "enlaces",
    "acidos", "ácidos", "bases", "ph", "solucion", "solución",
    "compuestos", "molecula", "molécula", "atomo", "átomo",
    "organica", "orgánica", "inorganica", "inorgánica"
  ],
  temaProyecto: "Fabricación de Jabón Artesanal mediante Saponificación",
  pdc: {
    institucion: "Unidad Educativa Fiscal \"Warisata\"",
    nivel: "Educación Secundaria Comunitaria Productiva — 4to Año — Área: Química",
    psp: "\"Cuidamos nuestra salud integral promoviendo hábitos de higiene con productos naturales elaborados en nuestra región.\"",
    practica: `🔬 FASE EXPERIENCIAL — Laboratorio de Saponificación (50 min)\n\nIniciamos con el "Desafío de Químicos Emprendedores": fabrican jabón artesanal real.\n\n⚠️ SEGURIDAD: El NaOH lo maneja EXCLUSIVAMENTE el docente con guantes y lentes.\n\nMATERIALES: 250ml aceite vegetal usado, solución NaOH (preparada por docente), recipiente plástico, cuchara de madera, moldes, esencias naturales, colorante vegetal, guantes, tiras de pH.\n\nPROTOCOLO:\n1. Filtrar aceite usado.\n2. El docente vierte NaOH sobre el aceite.\n3. Revolver constantemente 15-20 min hasta "traza" (consistencia pudín).\n4. Añadir esencias y colorante, moldear.\n5. Medir pH: aceite (~7), NaOH (~14), jabón (~9-10).\n\nPREGUNTA GENERADORA: "Acabamos de transformar BASURA en un PRODUCTO DE HIGIENE. ¿Qué reacción química hizo esto posible?"`,
    teoria: `📖 FASE CONCEPTUAL — Reacciones Químicas y Ácido-Base (35 min)\n\nSAPONIFICACIÓN:\nGrasa + Base fuerte → Jabón + Glicerina\nC₃H₅(OOCR)₃ + 3 NaOH → 3 RCOONa + C₃H₅(OH)₃\n\nESCALA DE pH: Ácidos (<7), Neutro (=7), Bases (>7). Cada unidad = 10x diferencia en H⁺.\n\nTIPOS DE ENLACE:\n— Iónico: Na⁺ + COO⁻ (la sal del jabón)\n— Covalente polar: C-O y O-H en glicerol\n— Puentes de hidrógeno: interacción agua-jabón\n\nMOLÉCULA ANFIFÍLICA: Cabeza hidrofílica + Cola hidrofóbica → Formación de micelas → Acción detergente.`,
    valoracion: `💭 FASE REFLEXIVA — Química, Medio Ambiente y Vocación (20 min)\n\n• "1 litro de aceite usado contamina hasta 1.000 litros de agua."\n• Debate: "¿Deberían las escuelas enseñar a crear productos comercializables?"\n\nDESAFÍO VOCACIONAL: Ingeniero químico, Farmacéutico/Cosmetólogo, Químico ambiental, Emprendedor de productos naturales, Investigador en biotecnología.\n\nEscribe: "Si yo fuera _____, usaría la química para _____."`,
    produccion: `🎨 FASE PRODUCTIVA — Jabón Artesanal + Emprendimiento (30 min + tarea)\n\n1. JABÓN TERMINADO: 3-4 barras etiquetadas con nombre creativo, ingredientes, pH, peso.\n2. INFORME DE LABORATORIO: Ecuación balanceada, tabla de pH, cambios observados, molécula anfifílica.\n3. PLAN DE MICROEMPRENDIMIENTO: Costo por barra, precio de venta, mercado objetivo, argumento ecológico.\n\nEXPOSICIÓN: 4 minutos por equipo. Los jabones pueden venderse en la feria escolar.`,
    explicacionNeuro: `🧠 ESTÍMULO MULTISENSORIAL (tocar, oler, ver cambios de color) crea conexiones neuronales densas. PRODUCTO TANGIBLE CON VALOR activa el sistema de recompensa. TRANSFORMACIÓN VISIBLE genera "momento eureka" que se graba en memoria a largo plazo. EMPRENDIMIENTO activa corteza prefrontal y sensación de agencia.`
  },
  chatResponse: `¡Me encanta, profe! 🧪 He creado una planificación ABP de **Química** que combinará ciencia, emprendimiento y cuidado ambiental.\n\n**🧼 PROYECTO ABP: "Fabricamos Jabón Artesanal para Nuestra Comunidad"**\n\nLos estudiantes se convierten en **químicos emprendedores**.\n\n✨ **Práctica:** Laboratorio real de saponificación con aceite reciclado. Miden pH con papel tornasol.\n✨ **Teoría:** Ecuación de saponificación, escala ácido-base, tipos de enlace, moléculas anfifílicas.\n✨ **Valoración:** Contaminación por aceite usado + debate sobre emprendimiento educativo.\n✨ **Producción:** Jabones etiquetados + informe de laboratorio + "Plan de Negocio Relámpago".\n\n*🧠 Nota Neurodidáctica:* El estímulo multisensorial crea conexiones neuronales más densas que la lectura. Llevarse un jabón a casa activa el sistema de recompensa del cerebro.\n\nHe cargado el PDC completo en tu Workspace. Haz clic en **Ir a PDC Express** para verlo y exportarlo. 📄`,
  climaAdaptaciones: {
    "Alegría": "Aprovecha la energía para competir por el jabón más creativo. La dopamina hará que las fórmulas de pH se graben como recuerdos felices.",
    "Tristeza": "Enfoca como acto de cuidado: \"Vamos a crear algo con nuestras manos que cuide a nuestras familias.\" El proceso manual es meditativo.",
    "Miedo": "Explica las medidas de seguridad con transparencia. El éxito en producir jabón real restaurará la autoconfianza del grupo.",
    "Ira": "Revolver vigorosamente la mezcla durante 15 min es catártico. Dirige hacia la indignación ambiental como motor del emprendimiento.",
    "Asco": "¡Tu aliado! Muestra el aceite oscuro: \"¿Ven esta porquería? En 20 minutos será jabón perfumado.\" La repulsión se transforma en asombro.",
    "Sorpresa": "No reveles el producto final: \"Hoy transformaremos basura en algo que vale dinero\". Cada cambio de textura y olor es un shock sensorial."
  }
};

const SERVER_ABP_PLANS: AbpPlanServer[] = [MATEMATICA_ABP, FISICA_ABP, QUIMICA_ABP];

function findAbpPlanServer(materiaInput: string): AbpPlanServer | null {
  const normalized = materiaInput
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  for (const plan of SERVER_ABP_PLANS) {
    for (const keyword of plan.keywords) {
      const normalizedKeyword = keyword
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      if (normalized.includes(normalizedKeyword) || normalizedKeyword.includes(normalized)) {
        return plan;
      }
    }
  }
  return null;
}

function generateSimulatedConversationServer(
  userMessage: string,
  materia: string,
  tema: string,
  clima: string
): string {
  const lowerMsg = userMessage.toLowerCase();

  if (lowerMsg.includes("tiempo") || lowerMsg.includes("minuto") || lowerMsg.includes("duración") || lowerMsg.includes("duracion")) {
    return `¡Buena pregunta, profe! 🕐 La planificación ABP está pensada para una sesión de **80-90 minutos**:\n\n• **Práctica:** 40-50 min\n• **Teoría:** 30-35 min\n• **Valoración:** 15-20 min\n• **Producción:** 25-30 min + tarea\n\nSi solo tienes **45 min**, divídelo en 2 sesiones. ¿Te adapto el plan? 😊`;
  }

  if (lowerMsg.includes("material") || lowerMsg.includes("recurso") || lowerMsg.includes("necesito") || lowerMsg.includes("comprar")) {
    return `📦 Todo está diseñado con **materiales económicos y accesibles** (menos de Bs. 30 por equipo). Los estudiantes pueden traer reciclados de casa como tarea previa. ¿Necesitas la lista detallada con costos? 📋`;
  }

  if (lowerMsg.includes("evaluar") || lowerMsg.includes("evaluación") || lowerMsg.includes("evaluacion") || lowerMsg.includes("nota") || lowerMsg.includes("calificar")) {
    return `📊 **Evaluación ABP alineada a Ley 070:**\n\n• **Ser (20%):** Participación, respeto, autoevaluación.\n• **Saber (30%):** Comprensión de conceptos en el informe.\n• **Hacer (30%):** Calidad del producto y mediciones.\n• **Decidir (20%):** Conexión comunitaria y reflexión vocacional.\n\n*En ABP, el proceso importa tanto como el resultado.* 🎯`;
  }

  if (lowerMsg.includes("grupo") || lowerMsg.includes("equipo") || lowerMsg.includes("alumno") || lowerMsg.includes("estudiante")) {
    return `👥 Equipos de **4-5 integrantes** con roles: Coordinador/a, Secretario/a científico/a, Responsable de materiales, Portavoz, Controlador de calidad.\n\n💡 Mezcla niveles, evita "amigos inseparables" y rota roles entre proyectos. ¿Cuántos estudiantes tienes? 😊`;
  }

  if (lowerMsg.includes("adaptar") || lowerMsg.includes("modificar") || lowerMsg.includes("cambiar") || lowerMsg.includes("ajustar")) {
    return `✏️ ¡El plan es totalmente flexible! Puedo adaptarlo en:\n• **Duración:** 45 min o 2-3 sesiones.\n• **Nivel:** 1er-2do año o 5to-6to.\n• **Materiales:** Lo que tengas disponible.\n• **Contexto:** Tu PSP específico.\n• **Clima emocional:** Según el estado real del aula.\n\nDime qué cambiar. 🛠️`;
  }

  return `¡Gracias por tu mensaje, profe! 😊\n\nComo tu Copiloto Empático, te ayudo con:\n• 📋 Planificación ABP\n• 🧠 Neuroeducación\n• 📄 PDC Ley 070\n• 🎯 Activación vocacional\n• 🎭 Adaptación emocional\n\n${materia && tema ? `Estamos trabajando con **${materia}** sobre **"${tema}"** con clima **${clima}**.` : "Configura la materia y tema para orientación específica."}\n\n¿En qué aspecto profundizamos? 💬`;
}

// Utility: simulate processing delay
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================================
// Lazy init of Gemini API client
// ============================================================================

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null; // Return null instead of throwing — enables demo mode
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

function isGeminiConfigured(): boolean {
  return !!process.env.GEMINI_API_KEY;
}

// ============================================================================
// API ROUTES
// ============================================================================

// 1. Generate a complete PDC plan based on class configuration
app.post("/api/generate-pdc", async (req, res) => {
  try {
    const { materia, tema, clima, detalles } = req.body;
    
    if (!materia || !tema) {
      return res.status(400).json({ error: "Materia y Tema son requeridos" });
    }

    // ── MODO DEMO: Use pre-written ABP plans ──
    if (!isGeminiConfigured()) {
      const plan = findAbpPlanServer(materia);
      
      // Simulate processing delay for realistic feel
      await delay(2200);

      if (plan) {
        return res.json(plan.pdc);
      } else {
        // No matching plan — return a generic response indicating demo mode
        return res.json({
          institucion: "Unidad Educativa Fiscal — Modo Demostración",
          nivel: `Educación Secundaria Comunitaria Productiva — Área: ${materia}`,
          psp: "\"Fortalecemos las capacidades productivas y cognitivas de nuestra comunidad educativa.\"",
          practica: `⚠️ MODO DEMOSTRACIÓN\n\nActualmente LogosLab tiene planificaciones ABP pre-diseñadas para las siguientes materias:\n\n📐 MATEMÁTICA — "Diseñamos un Parque Ecológico usando Geometría"\n⚡ FÍSICA — "Construimos un Calentador Solar con Material Reciclado"\n🧪 QUÍMICA — "Fabricamos Jabón Artesanal para Nuestra Comunidad"\n\nPor favor selecciona una de estas materias en el Agente Orquestador para ver la planificación ABP completa.\n\nPara generar planificaciones personalizadas de cualquier materia, se requiere la conexión con el modelo de IA (GEMINI_API_KEY).`,
          teoria: `En la versión completa de LogosLab, el Agente IA generará automáticamente los contenidos teóricos alineados al tema "${tema}" de la materia "${materia}", estructurados según la Ley 070.`,
          valoracion: `La reflexión comunitaria y el desafío vocacional se personalizarán según el clima emocional "${clima}" y las características específicas de tu grupo.`,
          produccion: `Los productos tangibles e intangibles serán diseñados automáticamente por la IA, adaptados al área (cuantitativa vs. humanística) y al contexto boliviano.`,
          explicacionNeuro: `🧠 La fundamentación neurodidáctica se generará automáticamente, explicando por qué la secuencia didáctica propuesta beneficia al cerebro del estudiante.`
        });
      }
    }

    // ── MODO PRODUCCIÓN: Use Gemini API ──
    const ai = getGeminiClient()!;
    
    const systemPrompt = `Eres un "Copiloto Empático", un mentor didáctico experto en neuroeducación y la Ley 070 de Educación de Bolivia (Plan de Desarrollo Curricular - PDC).
    Debes estructurar una propuesta didáctica de alta calidad basándote en los 4 Momentos Metodológicos:
    1. Práctica (Actividades desde la experiencia, contacto directo o experimentación)
    2. Teoría (Comprensión, definición de conceptos, análisis crítico de fuentes)
    3. Valoración (Reflexión crítica, ética, comunitaria y autoevaluación)
    4. Producción (Elaboración de productos tangibles como afiches, maquetas, o intangibles como propuestas de solución)

    Además, debes considerar técnicas de Neurodidáctica y el clima emocional seleccionado: "${clima || 'Alegría'}" para maximizar la curiosidad y la dopamina en el aula, evitando sobrecarga cognitiva.

    IMPORTANTE: Debes responder ESTRICTAMENTE en formato JSON plano con las siguientes claves:
    - institucion: Nombre sugerido de escuela (puedes inventar uno apropiado)
    - nivel: Nivel formativo adecuado sugerido
    - psp: Un Proyecto Socioproductivo relacionado con el tema y la comunidad/salud/ecología
    - practica: El texto a colocar en la sección Práctica
    - teoria: El texto a colocar en la sección Teoría
    - valoracion: El texto a colocar en la sección Valoración
    - produccion: El texto a colocar en la sección Producción
    - explicacionNeuro: Una breve nota explicando por qué esta secuencia didáctica beneficia al cerebro del estudiante basándose en la neuroeducación.

    No agregues introducciones, explicaciones de Markdown fuera del JSON, ni bloques de código de markdown. Debes responder SOLO el objeto JSON.`;

    const prompt = `Por favor genera un plan detallado de desarrollo curricular para:
    Materia: ${materia}
    Tema: ${tema}
    Clima emocional del aula deseado: ${clima || 'No especificado'}
    Detalles adicionales propuestos por el usuario: ${detalles || 'Ninguno'}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            institucion: { type: Type.STRING },
            nivel: { type: Type.STRING },
            psp: { type: Type.STRING },
            practica: { type: Type.STRING },
            teoria: { type: Type.STRING },
            valoracion: { type: Type.STRING },
            produccion: { type: Type.STRING },
            explicacionNeuro: { type: Type.STRING }
          },
          required: ["institucion", "nivel", "psp", "practica", "teoria", "valoracion", "produccion", "explicacionNeuro"]
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No se pudo obtener una respuesta del modelo.");
    }

    const data = JSON.parse(textOutput.trim());
    res.json(data);
  } catch (error: any) {
    console.error("Error generating PDC:", error);
    res.status(500).json({ error: error.message || "Error al generar planificación didáctica" });
  }
});

// 2. Chat interface conversation
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, materia, tema, clima } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Faltan los mensajes de chat" });
    }

    // ── MODO DEMO: Use simulated conversation ──
    if (!isGeminiConfigured()) {
      const lastUserMessage = messages[messages.length - 1]?.content || "";
      
      // Simulate processing delay
      await delay(1500);

      const simulatedResponse = generateSimulatedConversationServer(
        lastUserMessage,
        materia || "",
        tema || "",
        clima || "Alegría"
      );

      return res.json({ response: simulatedResponse });
    }

    // ── MODO PRODUCCIÓN: Use Gemini API ──
    const ai = getGeminiClient()!;

    const systemPrompt = `Eres el "Copiloto Empático", un consejero y mentor para profesores de secundaria. Tu objetivo es ayudar al profesor a estructurar ideas de clases interesantes y neurodidácticas.
    Mantén un tono cálido, alentador, profesional y práctico. Evita usar jerga clínica robótica. Usa listas scannables si la respuesta es larga.
    Si el docente tiene configurado:
    - Materia: ${materia || 'No especificada'}
    - Tema: ${tema || 'No especificado'}
    - Clima emocional del aula: ${clima || 'No especificado'}
    Alinea tus consejos con estos parámetros de forma sutil, recordándole por qué es clave en el aprendizaje.`;

    // Map conversation list for simple send
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    // If there is context or earlier history, we can join them or provide a composite prompt
    const contextPrompt = `Historial de conversación:
    ${messages.slice(0, -1).map((m: any) => `${m.role === 'user' ? 'Profesor' : 'Copiloto'}: ${m.content}`).join("\n")}
    
    Profesor actual: ${lastUserMessage}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contextPrompt,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    res.json({ response: response.text });
  } catch (error: any) {
    console.error("Error in chat api:", error);
    res.status(500).json({ error: error.message || "Error en el chat inteligente" });
  }
});

// 3. Generate a Neurodidactic Dynamic instantly using Gemini
app.post("/api/generate-neurodynamic", async (req, res) => {
  try {
    const { focusArea } = req.body; // 'Atención', 'Memoria', 'Colaboración', o general

    // ── MODO DEMO: Return a pre-written dynamic ──
    if (!isGeminiConfigured()) {
      await delay(1500);
      return res.json({
        titulo: "La Cadena de Enigmas",
        area: focusArea || "Atención",
        duracion: "4 min",
        tipoSugerido: "Activación Cognitiva",
        explicacion: "Los estudiantes forman un círculo. El docente susurra una pregunta académica al primer estudiante, quien debe responder en voz baja al siguiente añadiendo una pista. La cadena continúa hasta el último, quien revela la respuesta final en voz alta. Se compara con la respuesta original para medir la 'distorsión cognitiva' del grupo.",
        pasos: [
          "Formar un círculo con todos los estudiantes de pie.",
          "El docente susurra al primer estudiante una pregunta del tema actual (ej: '¿Cuál es la fórmula del área del círculo?').",
          "Cada estudiante susurra al siguiente: la pregunta + su respuesta + una pista adicional.",
          "El último estudiante dice en voz alta lo que recibió. El grupo compara con el original y analiza dónde se 'rompió' la cadena."
        ]
      });
    }

    const ai = getGeminiClient()!;

    const systemPrompt = `Eres un experto en Neurodidáctica aplicada al aula "Pantalla-Cero" (sin tecnología digital).
    Debes inventar una dinámica de clase cooperativa/física innovadora de alta calidad.
    Devuelve un objeto JSON con:
    - titulo: Nombre elegante pero descriptivo de la dinámica
    - area: El área ("Atención", "Memoria", o "Colaboración")
    - duracion: Duración de la dinámica (ej: "6 min")
    - tipoSugerido: "Activación", "Memoria Espacial", "Reto Vocacional" u otro adecuado
    - explicacion: Descripción corta, motivadora sobre en qué consiste (máx 2 párrafos)
    - pasos: Lista de 3 o 4 pasos prácticos para que el profesor la aplique inmediatamente.

    No incluyas markdown fuera del JSON. Devuelve sólo el objeto JSON válido.`;

    const prompt = `Genera una dinámica de clase para el área de neurofoco: ${focusArea || 'Cualquiera'}.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titulo: { type: Type.STRING },
            area: { type: Type.STRING },
            duracion: { type: Type.STRING },
            tipoSugerido: { type: Type.STRING },
            explicacion: { type: Type.STRING },
            pasos: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["titulo", "area", "duracion", "tipoSugerido", "explicacion", "pasos"]
        }
      }
    });

    const data = JSON.parse(response.text?.trim() || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Error generating dynamic:", error);
    res.status(500).json({ error: error.message || "Error al formular dinámica didáctica" });
  }
});

// 4. Check if Gemini is configured (for UI status) + demo mode flag
app.get("/api/gemini-status", (req, res) => {
  res.json({
    configured: isGeminiConfigured(),
    demoMode: !isGeminiConfigured(),
    availableAbpSubjects: !isGeminiConfigured()
      ? SERVER_ABP_PLANS.map(p => ({ materia: p.materia, tema: p.temaProyecto }))
      : []
  });
});

// 5. Generate a Worksheet (Insumo)
app.post("/api/generate-insumo", async (req, res) => {
  try {
    const { materia, tema, nivel } = req.body;
    
    if (!materia || !tema) {
      return res.status(400).json({ error: "Materia y Tema son requeridos para generar el insumo" });
    }

    // ── MODO DEMO: Return pre-written insumo ──
    if (!isGeminiConfigured()) {
      await delay(1800);

      const plan = findAbpPlanServer(materia);
      if (plan && plan.materia === "Matemática") {
        return res.json({
          tituloFicha: "🏗️ Taller de Maestría: Geometría para Arquitectos Comunitarios",
          seccionConcepto: "REPASO TEÓRICO:\n• Perímetro = suma de todos los lados de una figura.\n• Área del rectángulo: A = base × altura\n• Área del triángulo: A = (base × altura) / 2\n• Área del círculo: A = π × r²\n• Escala cartográfica: 1:100 significa 1 cm = 1 m real.\n\nEjemplo: Un terreno rectangular mide 40m × 20m. Su perímetro es 120m y su área es 800 m².",
          actividades: [
            "Un jardín comunitario tiene forma rectangular de 15m × 8m con un sendero circular de radio 2m en el centro. Calcula: a) El perímetro del jardín. b) El área total del jardín. c) El área del sendero circular. d) El área de césped disponible (jardín - sendero).",
            "Dibuja a escala 1:200 un terreno de forma de 'L' compuesto por dos rectángulos: uno de 30m × 10m y otro de 10m × 20m unidos por un lado. Calcula el área total y el perímetro del terreno completo.",
            "Una plaza necesita Bs. 25/m² de césped y Bs. 60/m² de baldosa. Si la plaza mide 500 m² y el 60% será césped, ¿cuál es el presupuesto total? ¿Cuánto se ahorra si se reduce la baldosa al 30%?",
            "DESAFÍO EXTRA: Diseña en la cuadrícula de abajo un parque de exactamente 200 m² que contenga al menos 1 rectángulo, 1 triángulo y 1 semicírculo. Calcula el área de cada figura y demuestra que suman 200 m²."
          ],
          retoVocacional: "🎯 RETO VOCACIONAL: Imagina que eres URBANISTA de tu municipio. Te han pedido diseñar un espacio verde para 150 familias en un terreno de 1.200 m². Escribe en 3 líneas: ¿Qué porcentaje destinarías a juegos infantiles, jardín medicinal y zona de descanso? ¿Por qué? Un urbanista real toma estas decisiones matemáticas todos los días."
        });
      } else if (plan && plan.materia === "Física") {
        return res.json({
          tituloFicha: "☀️ Taller de Maestría: Energía Solar y Transferencia de Calor",
          seccionConcepto: "REPASO TEÓRICO:\n• Radiación solar: ~1000 W/m² en la superficie terrestre.\n• Objetos oscuros absorben hasta 95% de la radiación; claros reflejan ~70%.\n• Variación de temperatura: ΔT = T_final - T_inicial\n• Energía absorbida: Q = m × c × ΔT (c del agua = 4186 J/kg·°C)\n• Eficiencia: η = (Q_útil / Q_incidente) × 100%\n\nEjemplo: Si 0.5 kg de agua pasa de 20°C a 45°C → Q = 0.5 × 4186 × 25 = 52.325 J",
          actividades: [
            "Una botella negra con 500 ml de agua (0.5 kg) se expone al sol durante 30 minutos. La temperatura sube de 22°C a 48°C. Calcula: a) ΔT. b) La energía Q absorbida. c) Si el sol irradia 1000 W/m² y la botella tiene 0.04 m² de superficie expuesta, ¿cuánta energía solar incidió en 30 min? d) La eficiencia η del calentador.",
            "Completa la tabla con los datos de tu experimento y dibuja la gráfica Temperatura vs. Tiempo para las 3 botellas en un mismo eje cartesiano. ¿Qué forma tienen las curvas? ¿Cuál tiene mayor pendiente y por qué?",
            "Si quisieras calentar 20 litros de agua (para una ducha) de 15°C a 40°C usando calentadores solares de botella: a) ¿Cuánta energía Q necesitas? b) Si cada botella genera 52 kJ en 30 min, ¿cuántas botellas necesitas? c) ¿Es viable para una familia rural?"
          ],
          retoVocacional: "🎯 RETO VOCACIONAL: Imagina que eres INGENIERO/A EN ENERGÍAS RENOVABLES. Una comunidad del altiplano boliviano (a 4.000 m.s.n.m.) te pide diseñar un sistema solar para calentar agua. ¿Qué ventaja tiene la altitud para la radiación solar? ¿Qué desventaja tiene el frío nocturno? Escribe tu propuesta técnica en 4 líneas."
        });
      } else if (plan && plan.materia === "Química") {
        return res.json({
          tituloFicha: "🧪 Taller de Maestría: Reacciones Químicas y Saponificación",
          seccionConcepto: "REPASO TEÓRICO:\n• Saponificación: Grasa + Base fuerte → Jabón + Glicerina\n• Ecuación: C₃H₅(OOCR)₃ + 3 NaOH → 3 RCOONa + C₃H₅(OH)₃\n• Escala de pH: Ácido (0-6), Neutro (7), Base (8-14).\n• Cada unidad de pH = 10× diferencia en concentración de H⁺.\n• Molécula anfifílica: cabeza hidrofílica + cola hidrofóbica → micelas.\n\nEjemplo: NaOH tiene pH 14 (muy básico). El jabón resultante tiene pH 9-10 (ligeramente básico, seguro para piel).",
          actividades: [
            "Clasifica las siguientes sustancias como ÁCIDO, BASE o NEUTRO y ordénalas de menor a mayor pH: vinagre (pH 3), jabón artesanal (pH 9.5), agua pura (pH 7), jugo de limón (pH 2), bicarbonato (pH 8.5), NaOH (pH 14), leche (pH 6.5).",
            "Balancea la ecuación de saponificación del ácido palmítico:\n C₃H₅(OOCC₁₅H₃₁)₃ + ___ NaOH → ___ C₁₅H₃₁COONa + ___ C₃H₅(OH)₃\n¿Cuántos moles de NaOH se necesitan por cada mol de triglicérido?",
            "Dibuja la molécula anfifílica del jabón señalando: a) La cabeza hidrofílica (COO⁻Na⁺). b) La cola hidrofóbica (cadena de carbono). c) Explica con un dibujo cómo 6-8 moléculas de jabón rodean una gota de grasa formando una MICELA."
          ],
          retoVocacional: "🎯 RETO VOCACIONAL: Imagina que eres QUÍMICO/A AMBIENTAL. Una fábrica de tu ciudad vierte 500 litros diarios de aceite usado al río. Si 1 litro contamina 1.000 litros de agua, ¿cuántos litros de agua se contaminan por día? Propón en 3 líneas una solución que use la saponificación para transformar ese residuo en un producto comercializable."
        });
      }

      // Generic fallback for unknown subjects
      return res.json({
        tituloFicha: `📋 Ficha de Trabajo: ${tema || materia} — Modo Demostración`,
        seccionConcepto: `En el modo de demostración, LogosLab tiene fichas de trabajo pre-diseñadas para:\n📐 Matemática\n⚡ Física\n🧪 Química\n\nSelecciona una de estas materias para ver la ficha ABP completa. Con la IA conectada, se generarán fichas personalizadas para cualquier materia y tema.`,
        actividades: [
          "Para ver ejercicios prácticos específicos, selecciona Matemática, Física o Química como materia.",
          "Con la versión completa de LogosLab (IA conectada), se generarán actividades personalizadas para cualquier tema."
        ],
        retoVocacional: "El Reto Vocacional se generará automáticamente cuando la IA esté conectada, adaptado al área y tema específico."
      });
    }

    const ai = getGeminiClient()!;

    const systemPrompt = `Eres un experto generador de "Insumos Didácticos" y evaluaciones formativas (fichas de trabajo de 1 página) para estudiantes de educación secundaria boliviana (Ley 070).
    Debes estructurar una ficha de trabajo atractiva e inteligente que el profesor pueda entregar directamente a los estudiantes para imprimir/fotocopiar.

    Reglas de generación:
    1. Si la materia es CUANTITATIVA (Matemáticas, Física, Química, etc.): Genera un "Breve repaso teórico/fórmula" y luego "3 a 4 Ejercicios Prácticos" desafiantes pero accesibles.
    2. Si la materia es SOCIAL/HUMANIDADES/CIENCIAS (Literatura, Historia, Biología, Filosofía, etc.): Genera una "Breve lectura inferencial intrigante" (1 párrafo) y luego "2 a 3 Preguntas de Juicio Crítico".
    3. En TODOS los casos, añade al final un "Reto Vocacional Relámpago" (una pequeña actividad conectada a cómo aplicar esto en una profesión real, sin usar pantallas).

    IMPORTANTE: Responde ESTRICTAMENTE en formato JSON con las siguientes claves:
    - tituloFicha: Un título motivador (ej. "Taller de Maestría: [Tema]").
    - seccionConcepto: El texto de la lectura inferencial o repaso teórico/fórmulas.
    - actividades: Un array de strings, donde cada string es un ejercicio, problema o pregunta de análisis crítico.
    - retoVocacional: El texto explicativo del Reto Vocacional Relámpago (ej. "Imagina que eres ingeniero ambiental...").
    
    No agregues texto en markdown fuera del JSON. Devuelve SOLO el objeto JSON.`;

    const prompt = `Por favor genera la ficha de trabajo/insumo para:
    Materia: ${materia}
    Tema: ${tema}
    Nivel (opcional): ${nivel || 'No especificado'}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tituloFicha: { type: Type.STRING },
            seccionConcepto: { type: Type.STRING },
            actividades: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            retoVocacional: { type: Type.STRING }
          },
          required: ["tituloFicha", "seccionConcepto", "actividades", "retoVocacional"]
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No se pudo obtener una respuesta del modelo.");
    }

    const data = JSON.parse(textOutput.trim());
    res.json(data);
  } catch (error: any) {
    console.error("Error generating insumo:", error);
    res.status(500).json({ error: error.message || "Error al generar insumo didáctico" });
  }
});

// ============================================================================
// VITE SERVER INTEGRATION
// ============================================================================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LogosLab dev server running on http://localhost:${PORT}`);
    if (!isGeminiConfigured()) {
      console.log(`⚡ MODO DEMO activado — Planificaciones ABP pre-escritas para: Matemática, Física, Química`);
      console.log(`   Para usar IA real, configure GEMINI_API_KEY en el archivo .env`);
    } else {
      console.log(`✅ Gemini AI conectada — Modo producción`);
    }
  });
}

startServer();
