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

// Lazy init of Gemini API client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY es requerida para el funcionamiento del Agente Inteligente. Por favor, asegúrese de agregarla en Settings > Secrets.");
    }
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

// ------------------- API ROUTES -------------------

// 1. Generate a complete PDC plan based on class configuration
app.post("/api/generate-pdc", async (req, res) => {
  try {
    const { materia, tema, clima, detalles } = req.body;
    
    if (!materia || !tema) {
      return res.status(400).json({ error: "Materia y Tema son requeridos" });
    }

    const ai = getGeminiClient();
    
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

    const ai = getGeminiClient();

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
    ${messages.slice(0, -1).map(m => `${m.role === 'user' ? 'Profesor' : 'Copiloto'}: ${m.content}`).join("\n")}
    
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
    const ai = getGeminiClient();

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

// 4. Check if Gemini is configured (for UI status)
app.get("/api/gemini-status", (req, res) => {
  res.json({
    configured: !!process.env.GEMINI_API_KEY,
  });
});

// 5. Generate a Worksheet (Insumo)
app.post("/api/generate-insumo", async (req, res) => {
  try {
    const { materia, tema, nivel } = req.body;
    
    if (!materia || !tema) {
      return res.status(400).json({ error: "Materia y Tema son requeridos para generar el insumo" });
    }

    const ai = getGeminiClient();

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

// ------------------- VITE SERVER INTEGRATION -------------------

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
  });
}

startServer();
