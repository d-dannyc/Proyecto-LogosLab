import { PdcDocument } from "./types";

// ============================================================================
// BANCO DE PLANIFICACIONES ABP PRE-ESCRITAS
// Metodología: Aprendizaje Basado en Proyectos (ABP)
// Estructura: Ley 070 — Práctica, Teoría, Valoración, Producción
// ============================================================================

export interface AbpPlan {
  id: string;
  materia: string;
  keywords: string[]; // Palabras clave para matching
  temaProyecto: string;
  descripcionProyecto: string;
  pdc: PdcDocument;
  chatResponse: string; // Respuesta formateada para el chat
  climaAdaptaciones: Record<string, string>; // Adaptaciones por clima emocional
}

// ---------------------------------------------------------------------------
// MATEMÁTICA — Proyecto ABP: "Diseñamos un Parque Ecológico usando Geometría"
// ---------------------------------------------------------------------------

const MATEMATICA_ABP: AbpPlan = {
  id: "abp-mat-001",
  materia: "Matemática",
  keywords: [
    "matematica", "matemáticas", "matematicas", "matemática",
    "math", "algebra", "álgebra", "geometria", "geometría",
    "aritmetica", "aritmética", "calculo", "cálculo",
    "trigonometria", "trigonometría", "ecuaciones", "funciones"
  ],
  temaProyecto: "Diseño de un Parque Ecológico con Geometría Aplicada",
  descripcionProyecto: "Los estudiantes aplican conceptos de geometría plana (perímetro, área, escala) para diseñar un parque ecológico comunitario, integrando matemáticas con conciencia ambiental y planificación urbana.",
  pdc: {
    institucion: "Unidad Educativa Fiscal \"Simón Bolívar\"",
    nivel: "Educación Secundaria Comunitaria Productiva — 3er Año — Área: Matemática",
    psp: "\"Fortalecemos la convivencia comunitaria diseñando espacios verdes saludables en nuestro barrio.\"",
    practica: `🔬 FASE EXPERIENCIAL — Medición del Territorio Real (40 min)

Iniciamos la sesión con un \"Desafío de Arquitectos\": los estudiantes salen al patio escolar organizados en equipos de 4-5 integrantes, cada equipo con una cinta métrica, cuerdas y estacas de madera.

ACTIVIDADES PRÁCTICAS ABP:
1. Cada equipo mide un sector asignado del patio escolar (largo, ancho, diagonales) y registra las medidas en una \"ficha de terreno\" impresa.
2. Identifican formas geométricas naturales en el espacio: rectángulos, triángulos formados por los caminos, semicírculos de los arcos.
3. Usando cuerdas y estacas, demarcan sobre el terreno las zonas donde colocarían: área de juegos, jardín medicinal, sendero peatonal y zona de descanso.
4. Cada equipo toma fotografías mentales (o dibujos rápidos) de su propuesta de distribución espacial.

PREGUNTA GENERADORA: \"Si el municipio les diera Bs. 50.000 para construir un parque en este terreno, ¿cómo calcularían cuántos metros cuadrados destinar a cada zona para maximizar el bienestar comunitario?\"

Reflexión grupal inicial: ¿Por qué la geometría es la herramienta fundamental que usan los arquitectos y urbanistas para transformar espacios?`,

    teoria: `📖 FASE CONCEPTUAL — Geometría Plana Aplicada al Diseño (35 min)

A partir de los datos recolectados en el patio, sistematizamos los conceptos matemáticos clave:

CONTENIDOS TEÓRICOS ABP:
• Perímetro de figuras regulares e irregulares: P = suma de todos los lados. Aplicación: calcular cuántos metros de cerca necesitamos para delimitar el parque.
• Área de rectángulos (A = b × h), triángulos (A = b × h / 2) y círculos (A = π × r²). Aplicación: calcular la superficie de cada zona del parque.
• Concepto de ESCALA cartográfica: Relación entre la medida real y la medida en el plano. Ejemplo: Escala 1:100 significa que 1 cm en el papel = 1 metro en la realidad.
• Proporciones y porcentajes: Si el terreno mide 800 m², ¿qué porcentaje destinar a áreas verdes (mínimo 40% según normativa ambiental)?

EJERCICIO GUIADO:
Con los datos reales medidos, cada equipo calcula:
a) El perímetro total del terreno asignado.
b) El área total disponible.
c) La distribución porcentual: 40% jardín, 25% senderos, 20% zona recreativa, 15% mobiliario.
d) El plano a escala 1:50 en papel milimetrado.

Se resuelven 3 problemas tipo en la pizarra con participación rotativa de los equipos, conectando cada fórmula con su aplicación real en el diseño del parque.`,

    valoracion: `💭 FASE REFLEXIVA — Geometría, Comunidad y Vocación (20 min)

REFLEXIÓN COMUNITARIA GUIADA:
• \"¿Cómo cambia la calidad de vida de un barrio cuando tiene espacios verdes bien diseñados? ¿Qué papel juega la matemática en esa transformación?\"
• \"¿Sabían que en Bolivia, el 67% de los barrios periurbanos carecen de parques públicos planificados? ¿Cómo podría la geometría ayudar a resolver este problema social?\"

DESAFÍO VOCACIONAL RELÁMPAGO (5 min):
Cada equipo identifica qué profesiones usan geometría diariamente:
— Arquitecto (diseño de edificios y espacios)
— Ingeniero civil (cálculo de estructuras)
— Topógrafo (medición de terrenos)
— Diseñador de interiores (distribución de espacios)
— Urbanista (planificación de ciudades)

Los estudiantes reflexionan individualmente: \"¿Cuál de estas profesiones me atrae más y por qué?\" Comparten en plenaria breve.

AUTOEVALUACIÓN: Cada estudiante completa una rúbrica de 3 preguntas:
1. ¿Pude calcular perímetros y áreas correctamente? (1-5)
2. ¿Entendí cómo la escala conecta el papel con la realidad? (1-5)
3. ¿Mi equipo colaboró eficazmente en las mediciones? (1-5)`,

    produccion: `🎨 FASE PRODUCTIVA — Plano del Parque Ecológico Ideal (30 min + tarea)

PRODUCTO TANGIBLE ABP:
Cada equipo elabora un PLANO A ESCALA del \"Parque Ecológico Ideal\" para su barrio en un papelógrafo tamaño resma, incluyendo:

1. PLANO GEOMÉTRICO (escala 1:50):
   — Formas geométricas rotuladas con sus medidas reales y a escala
   — Código de colores: verde (jardín), gris (senderos), amarillo (zona recreativa), azul (fuente/agua)
   — Leyenda con simbología y escala utilizada

2. TABLA DE PRESUPUESTO ESTIMADO:
   — Cálculo del costo por m² de césped (Bs. 15/m²), baldosa (Bs. 45/m²), bancas (Bs. 350 c/u)
   — Presupuesto total con operaciones visibles

3. FICHA TÉCNICA del proyecto (media página):
   — Nombre del parque
   — Ubicación propuesta
   — Superficie total y distribución porcentual
   — Beneficiarios estimados

EXPOSICIÓN: Cada equipo presenta su plano al curso en 3 minutos, defendiendo sus decisiones geométricas y presupuestarias. Los mejores planos se exhiben en la feria escolar de ciencias.`,

    explicacionNeuro: `🧠 FUNDAMENTACIÓN NEURODIDÁCTICA:
Esta secuencia ABP activa múltiples sistemas cerebrales simultáneamente:
— SISTEMA DOPAMÍNICO: La manipulación tangible (medir, demarcar, dibujar) libera dopamina sostenida, manteniendo la motivación durante toda la sesión.
— MEMORIA ESPACIAL (hipocampo): El trabajo con escalas y planos activa la memoria visuoespacial, consolidando el aprendizaje geométrico de forma duradera.
— CORTEZA PREFRONTAL: La planificación del presupuesto y distribución de zonas ejercita las funciones ejecutivas (planificación, toma de decisiones).
— NEURONAS ESPEJO: El trabajo cooperativo en equipos activa la empatía social y la comunicación, competencias transversales esenciales.
El proyecto tiene SIGNIFICADO REAL para el estudiante: no calcula áreas \"porque sí\", sino porque diseña algo útil para su comunidad. Esto genera lo que la neurociencia llama \"anclaje emocional del aprendizaje\".`
  },
  chatResponse: `¡Excelente elección, profe! 🎯 He diseñado una planificación ABP completa para **Matemática** con un enfoque que hará que tus estudiantes *amen* la geometría.

**🏗️ PROYECTO ABP: "Diseñamos un Parque Ecológico usando Geometría"**

Los estudiantes se convertirán en **arquitectos comunitarios** que deben diseñar un parque ecológico real para su barrio, aplicando perímetro, área, escala y proporciones.

✨ **Práctica:** Salen al patio escolar a medir terrenos reales con cintas métricas y cuerdas. Forman equipos de "arquitectos" que demarcan zonas del parque con estacas.

✨ **Teoría:** Sistematizamos fórmulas de perímetro, área y escala cartográfica directamente desde los datos que midieron. Cada fórmula tiene aplicación inmediata en el diseño.

✨ **Valoración:** Reflexionan sobre cómo la geometría transforma barrios y descubren profesiones que la usan: arquitectura, ingeniería civil, topografía, urbanismo.

✨ **Producción:** Cada equipo crea un plano a escala en papelógrafo con tabla de presupuesto estimado. ¡Los mejores van a la feria escolar!

*🧠 Nota Neurodidáctica:* La manipulación tangible (medir, demarcar, dibujar) libera dopamina sostenida. El proyecto con significado social genera "anclaje emocional del aprendizaje".

He cargado el PDC completo en tu Workspace. Haz clic en **Ir a PDC Express** para verlo, editarlo y exportarlo como PDF Ley 070. 📄`,
  climaAdaptaciones: {
    "Alegría": "El clima de alegría potenciará la fase práctica: aprovecha la energía positiva para que los equipos compitan amistosamente en quién mide con mayor precisión. La dopamina natural facilitará la asimilación de las fórmulas en la fase teórica.",
    "Tristeza": "En un clima de tristeza, te recomiendo iniciar la fase práctica con un momento de conexión grupal: \"¿Qué lugar de su barrio les trae paz?\". Luego canaliza la introspección hacia el diseño de un parque como espacio de sanación comunitaria. La geometría se vuelve un acto de cuidado.",
    "Miedo": "Cuando hay miedo en el aula, prioriza la seguridad emocional: forma los equipos tú mismo (evita que queden aislados), da instrucciones muy claras paso a paso, y celebra cada medición correcta en voz alta. El éxito progresivo en las mediciones reconstruirá la confianza.",
    "Ira": "La energía de la ira se canaliza perfectamente en la actividad física de medir el patio: deja que se muevan, estiren las cuerdas con fuerza, claven estacas. Transforma la intensidad emocional en intensidad productiva. En la fase teórica, usa problemas-reto competitivos entre equipos.",
    "Asco": "El asco puede redirigirse hacia el pensamiento crítico: \"¿No les da asco que nuestro barrio no tenga ni un parque decente?\" Usa la indignación constructiva como motor del proyecto. Los estudiantes diseñarán el parque con más pasión si sienten que están corrigiendo una injusticia urbana.",
    "Sorpresa": "¡El mejor clima para esta clase! Empieza con un dato sorprendente: \"¿Sabían que con solo 800 m² bien diseñados se puede crear un oasis verde para 200 familias?\" Mantén la sorpresa revelando progresivamente las fórmulas como \"superpoderes\" del arquitecto."
  }
};

// ---------------------------------------------------------------------------
// FÍSICA — Proyecto ABP: "Construimos un Calentador Solar con Material Reciclado"
// ---------------------------------------------------------------------------

const FISICA_ABP: AbpPlan = {
  id: "abp-fis-001",
  materia: "Física",
  keywords: [
    "fisica", "física", "physics", "termodinamica", "termodinámica",
    "mecanica", "mecánica", "optica", "óptica", "ondas",
    "electricidad", "magnetismo", "cinemática", "cinematica",
    "energia", "energía", "calor", "temperatura", "movimiento"
  ],
  temaProyecto: "Construcción de un Calentador Solar con Materiales Reciclados",
  descripcionProyecto: "Los estudiantes construyen un calentador solar funcional usando botellas PET y materiales reciclados, aprendiendo transferencia de calor, efecto invernadero y energías renovables de forma experimental.",
  pdc: {
    institucion: "Unidad Educativa Fiscal \"Elizardo Pérez\"",
    nivel: "Educación Secundaria Comunitaria Productiva — 4to Año — Área: Física",
    psp: "\"Cuidamos nuestra Madre Tierra promoviendo el uso de energías limpias y renovables en nuestra comunidad.\"",
    practica: `🔬 FASE EXPERIENCIAL — Laboratorio Solar en el Patio (45 min)

Iniciamos con un \"Reto de Ingenieros Solares\": los estudiantes construyen un calentador solar funcional usando exclusivamente materiales reciclados.

MATERIALES POR EQUIPO (4-5 integrantes):
— 2 botellas PET de 2 litros (transparentes)
— 1 botella PET de 2 litros pintada de negro mate (con témpera o pintura spray)
— 1 caja de cartón forrada internamente con papel aluminio
— Agua del grifo (500 ml por botella)
— 1 termómetro de laboratorio (o digital económico)
— Reloj o cronómetro
— Cuaderno de registro

PROTOCOLO EXPERIMENTAL ABP:
1. MONTAJE (15 min): Cada equipo prepara 3 configuraciones:
   — Botella A: PET transparente con agua, expuesta al sol directamente.
   — Botella B: PET pintada de negro con agua, expuesta al sol directamente.
   — Botella C: PET negra con agua, dentro de la caja con reflectores de aluminio (efecto invernadero).

2. MEDICIÓN SISTEMÁTICA (25 min):
   — Registrar la temperatura inicial del agua en las 3 botellas.
   — Tomar mediciones cada 5 minutos durante 25 minutos (5 lecturas).
   — Completar la tabla de datos en el cuaderno:
     | Tiempo (min) | Botella A (°C) | Botella B (°C) | Botella C (°C) |

3. OBSERVACIÓN GUIADA (5 min):
   — ¿Cuál botella calentó más rápido? ¿Por qué?
   — ¿Qué diferencia hace el color negro? ¿Y la caja con aluminio?

PREGUNTA GENERADORA: "Si una familia rural no tiene gas ni electricidad, ¿podría usar este principio para calentar agua para bañarse? ¿Cuántas botellas necesitaría?"`,

    teoria: `📖 FASE CONCEPTUAL — Transferencia de Calor y Energía Solar (35 min)

A partir de los datos experimentales reales, construimos la teoría:

CONTENIDOS TEÓRICOS ABP:

1. FORMAS DE TRANSFERENCIA DE CALOR:
   — RADIACIÓN: La energía solar viaja como ondas electromagnéticas (no necesita medio material). El sol irradia ~1000 W/m² en la superficie terrestre.
   — ABSORCIÓN: Los objetos oscuros absorben más radiación (hasta 95%) que los claros (reflejan ~70%). Por eso la botella negra se calentó más.
   — CONDUCCIÓN: El calor se transfiere del plástico caliente al agua por contacto directo entre moléculas.
   — CONVECCIÓN: El agua caliente sube y la fría baja, creando corrientes que distribuyen el calor.

2. EFECTO INVERNADERO (a escala):
   — La caja con aluminio funciona como un invernadero: la radiación solar entra, se absorbe y se re-emite como infrarrojo, pero el plástico/cartón impide que escape. Resultado: mayor acumulación de calor.
   — Conexión con el cambio climático: el CO₂ atmosférico actúa como el plástico de nuestra caja.

3. CÁLCULOS APLICADOS:
   — Variación de temperatura: ΔT = T_final - T_inicial
   — Energía absorbida: Q = m × c × ΔT (donde c del agua = 4186 J/kg·°C)
   — Eficiencia del calentador: η = (Q_útil / Q_solar_incidente) × 100%

EJERCICIO CON DATOS REALES: Usando las mediciones del experimento, cada equipo calcula la energía total absorbida por su botella C y la eficiencia del sistema.`,

    valoracion: `💭 FASE REFLEXIVA — Energía, Justicia Social y Vocación (20 min)

REFLEXIÓN COMUNITARIA GUIADA:
• "En Bolivia, más de 300.000 familias rurales no tienen acceso a gas domiciliario. ¿Cómo podría un calentador solar como el nuestro mejorar su calidad de vida?"
• "¿Es justo que algunas comunidades paguen Bs. 200/mes en gas mientras el sol —que es gratuito— no se aprovecha? ¿Qué responsabilidad tenemos como futuros profesionales?"
• "El Artículo 33 de la Constitución Política del Estado establece el derecho a un medio ambiente saludable. ¿Nuestro proyecto contribuye a este derecho?"

DEBATE BREVE (7 min):
Dos equipos debaten: "¿Es viable reemplazar el gas domiciliario con energía solar en Bolivia?"
— Equipo A: Defiende la viabilidad (sol abundante, costo cero, cero contaminación)
— Equipo B: Señala limitaciones (días nublados, inversión inicial, cultura energética)

DESAFÍO VOCACIONAL RELÁMPAGO (5 min):
Profesiones que trabajan con energía solar y transferencia de calor:
— Ingeniero en energías renovables
— Físico investigador
— Técnico en instalaciones solares
— Ambientalista / Consultor ambiental
— Emprendedor de tecnología limpia

Cada estudiante escribe en un post-it: "La profesión que más me interesa de esta lista es _____ porque _____."

AUTOEVALUACIÓN:
1. ¿Puedo explicar las 3 formas de transferencia de calor con ejemplos? (1-5)
2. ¿Entendí por qué la botella negra en la caja calentó más? (1-5)
3. ¿Pude realizar las mediciones y cálculos con mi equipo? (1-5)`,

    produccion: `🎨 FASE PRODUCTIVA — Prototipo y Ficha Técnica (30 min + tarea)

PRODUCTO TANGIBLE ABP:
Cada equipo presenta su prototipo de calentador solar funcional acompañado de documentación científica:

1. PROTOTIPO OPTIMIZADO:
   — A partir de lo aprendido, cada equipo mejora su diseño original:
   — Agregar más reflectores de aluminio para concentrar radiación
   — Pintar todas las superficies receptoras de negro
   — Sellar la caja para maximizar el efecto invernadero
   — Conectar botellas en serie para mayor volumen de agua caliente

2. INFORME DE LABORATORIO (1 página):
   — Título del experimento
   — Hipótesis inicial del equipo
   — Tabla de datos con las 5 mediciones de las 3 botellas
   — Gráfica de Temperatura vs. Tiempo (3 curvas en un mismo eje)
   — Cálculo de ΔT y Q para la configuración más eficiente
   — Conclusiones: ¿Se confirmó la hipótesis?

3. PROPUESTA COMUNITARIA (media página):
   — "Plan de implementación de calentadores solares para [nombre del barrio]"
   — Materiales necesarios para escalar el prototipo
   — Costo estimado vs. costo del gas en 1 año
   — Beneficios ambientales cuantificados

EXPOSICIÓN: Cada equipo tiene 4 minutos para presentar su prototipo funcionando (si hay sol) y defender su informe. Los prototipos más eficientes se exhiben en la feria de ciencias como "tecnología social".`,

    explicacionNeuro: `🧠 FUNDAMENTACIÓN NEURODIDÁCTICA:
Esta secuencia ABP está diseñada para maximizar la retención y comprensión a través de:
— APRENDIZAJE KINESTÉSICO: Construir con las manos activa la corteza motora y el cerebelo, creando memorias procedimentales que duran más que las puramente verbales.
— CURIOSIDAD EXPERIMENTAL: La pregunta "¿cuál botella calentará más?" genera un bucle de dopamina anticipatoria. El cerebro se mantiene enganchado esperando el resultado cada 5 minutos.
— DATOS REALES > DATOS FICTICIOS: Calcular con números que ellos mismos midieron activa el sistema de relevancia personal del cerebro (corteza cingulada anterior). "Mis datos importan" = mayor retención.
— SIGNIFICADO SOCIAL: Conectar la física con familias sin gas genera empatía (activación de la ínsula) y motivación intrínseca. El estudiante no aprende transferencia de calor "para el examen", sino para resolver un problema real de su comunidad.
— CICLO COMPLETO DE BLOOM: La secuencia ABP recorre todos los niveles: recordar (fórmulas), comprender (conceptos), aplicar (cálculos), analizar (datos), evaluar (debate) y crear (prototipo).`
  },
  chatResponse: `¡Fantástico, profe! 🔥 He preparado una planificación ABP de **Física** que convertirá tu aula en un laboratorio de innovación.

**☀️ PROYECTO ABP: "Construimos un Calentador Solar con Materiales Reciclados"**

Los estudiantes se transforman en **ingenieros de energía renovable** que construyen un calentador solar funcional usando botellas PET y materiales reciclados.

✨ **Práctica:** Construyen 3 configuraciones solares (botella transparente, negra, y negra en caja reflectante) y miden la temperatura del agua cada 5 minutos durante 25 minutos. ¡Ciencia real en el patio!

✨ **Teoría:** Desde sus propios datos experimentales, descubren radiación, conducción, convección y el efecto invernadero. Calculan energía absorbida (Q = m·c·ΔT) con números que ellos midieron.

✨ **Valoración:** Debaten si Bolivia podría reemplazar el gas con energía solar. Descubren profesiones como ingeniero en renovables, consultor ambiental y emprendedor de tecnología limpia.

✨ **Producción:** Prototipo optimizado + informe de laboratorio con gráfica de Temperatura vs. Tiempo + propuesta comunitaria de implementación.

*🧠 Nota Neurodidáctica:* Construir con las manos activa la corteza motora + cerebelo, creando memorias procedimentales duraderas. La pregunta "¿cuál botella calentará más?" genera un bucle de dopamina anticipatoria irresistible.

He cargado el PDC completo en tu Workspace. Haz clic en **Ir a PDC Express** para verlo, editarlo y exportarlo como PDF Ley 070. 📄`,
  climaAdaptaciones: {
    "Alegría": "¡Perfecto! La alegría es combustible puro para la experimentación. Organiza una competencia amistosa: \"¿Qué equipo logra la mayor temperatura en 25 minutos?\" La euforia del descubrimiento multiplicará la dopamina y consolidará las fórmulas de transferencia de calor como un juego.",
    "Tristeza": "En un clima de tristeza, conecta el proyecto con el cuidado: \"Vamos a crear algo que ayude a familias que no tienen cómo calentar agua para sus hijos\". Transforma la melancolía en propósito social. El acto físico de construir con las manos es terapéutico y reconectará al grupo con la motivación.",
    "Miedo": "Cuando hay miedo, la experimentación debe sentirse segura: explica cada paso antes de ejecutarlo, usa solo agua tibia (nunca caliente), y celebra cada medición exitosa. El éxito incremental en las lecturas del termómetro reconstruirá la confianza. \"Cada grado que sube es un logro de tu equipo.\"",
    "Ira": "La ira tiene mucha energía útil: canalízala en la construcción física. Que corten, peguen, armen las cajas reflectantes con intensidad. Luego dirige esa pasión al debate: \"¿No les indigna que haya familias sin gas mientras desperdiciamos el sol?\" La ira justa es un motor pedagógico poderoso.",
    "Asco": "Usa el asco como detonante: \"¿No les da asco que botemos miles de botellas PET al río mientras podríamos usarlas para calentar agua gratis?\" El reciclaje como acto de dignidad ambiental. Los estudiantes construirán con más determinación si sienten que están transformando basura en tecnología.",
    "Sorpresa": "¡Empieza con magia! Lleva una botella negra pre-calentada al sol y pide a un voluntario que toque el agua: \"¿Cómo es posible que el sol calentó esto sin fuego?\" La sorpresa activa las neuronas de novedad. Mantén el factor WOW revelando cada medición como un \"resultado secreto\"."
  }
};

// ---------------------------------------------------------------------------
// QUÍMICA — Proyecto ABP: "Fabricamos Jabón Artesanal para Nuestra Comunidad"
// ---------------------------------------------------------------------------

const QUIMICA_ABP: AbpPlan = {
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
  descripcionProyecto: "Los estudiantes fabrican jabón artesanal a partir de aceite vegetal usado, aprendiendo reacciones químicas (saponificación), propiedades ácido-base, pH y emprendimiento sostenible.",
  pdc: {
    institucion: "Unidad Educativa Fiscal \"Warisata\"",
    nivel: "Educación Secundaria Comunitaria Productiva — 4to Año — Área: Química",
    psp: "\"Cuidamos nuestra salud integral promoviendo hábitos de higiene con productos naturales elaborados en nuestra región.\"",
    practica: `🔬 FASE EXPERIENCIAL — Laboratorio de Saponificación (50 min)

Iniciamos con el \"Desafío de Químicos Emprendedores\": los estudiantes fabrican jabón artesanal real usando aceite vegetal reciclado.

⚠️ NOTA DE SEGURIDAD: El manejo del hidróxido de sodio (NaOH) lo realiza EXCLUSIVAMENTE el docente con guantes y lentes de protección. Los estudiantes manipulan solo los ingredientes seguros y el producto final.

MATERIALES POR EQUIPO (4-5 integrantes):
— 250 ml de aceite vegetal usado (filtrado, recolectado de sus casas la clase anterior)
— Solución de NaOH preparada por el docente (80g NaOH en 100ml agua destilada)
— 1 recipiente de plástico resistente para mezclar
— Cuchara de madera para revolver
— Moldes de silicona o vasos de plástico (para dar forma al jabón)
— Esencias naturales opcionales: lavanda, manzanilla, romero (hierbas secas del mercado)
— Colorante vegetal natural (cúrcuma = amarillo, remolacha = rojo)
— Guantes de látex y lentes de seguridad (para todos)
— Tiras de papel tornasol o pH-metro

PROTOCOLO EXPERIMENTAL ABP:
1. PREPARACIÓN (10 min):
   — Cada equipo filtra su aceite usado con un colador y tela para eliminar residuos.
   — El docente prepara la solución de NaOH (¡solo el docente!) y la distribuye en recipientes rotulados.
   — Los estudiantes colocan sus equipos de protección.

2. REACCIÓN DE SAPONIFICACIÓN (20 min):
   — El docente vierte la solución de NaOH sobre el aceite en cada recipiente.
   — Los estudiantes revuelven constantemente con la cuchara de madera en la misma dirección durante 15-20 minutos.
   — Observan los cambios: la mezcla pasa de líquida a cremosa (\"traza\").
   — Añaden esencias naturales y colorante vegetal cuando alcanza consistencia de pudín.

3. MOLDEO Y MEDICIÓN DE pH (15 min):
   — Vierten la mezcla en los moldes.
   — Con tiras de pH, miden la alcalinidad de: el aceite (pH ~7), la solución NaOH (pH ~14), y la mezcla jabonosa (pH ~9-10).
   — Registran resultados en la ficha de laboratorio.

4. REGISTRO DE OBSERVACIONES (5 min):
   — ¿Qué cambios físicos observaron (color, textura, temperatura)?
   — ¿Hubo liberación de calor? (reacción exotérmica)
   — ¿Qué olor tiene el producto final?

PREGUNTA GENERADORA: \"Acabamos de transformar BASURA (aceite usado) en un PRODUCTO DE HIGIENE (jabón). ¿Qué tipo de reacción química hizo posible esta transformación? ¿Podríamos vender estos jabones?\"

NOTA: Los jabones necesitan 24-48 horas de curado. Se retirarán de los moldes en la próxima clase.`,

    teoria: `📖 FASE CONCEPTUAL — Reacciones Químicas y Ácido-Base (35 min)

Desde la experiencia directa de fabricar jabón, sistematizamos la teoría química:

CONTENIDOS TEÓRICOS ABP:

1. LA REACCIÓN DE SAPONIFICACIÓN:
   — Ecuación general: Grasa/Aceite + Base fuerte → Jabón + Glicerina
   — Ecuación química específica:
     C₃H₅(OOCR)₃ + 3 NaOH → 3 RCOONa + C₃H₅(OH)₃
     (Triglicérido) + (Hidróxido de sodio) → (Jabón) + (Glicerol)
   — Es una reacción de HIDRÓLISIS ALCALINA: la base \"rompe\" los enlaces éster del triglicérido.

2. PROPIEDADES ÁCIDO-BASE:
   — ÁCIDOS: pH < 7. Ejemplos: vinagre (pH 3), jugo de limón (pH 2).
   — BASES/ÁLCALIS: pH > 7. Ejemplos: NaOH (pH 14), jabón (pH 9-10), bicarbonato (pH 8.5).
   — NEUTRO: pH = 7. Ejemplo: agua pura.
   — La escala de pH va de 0 a 14. Cada unidad representa una diferencia de 10x en concentración de iones H⁺.

3. TIPOS DE ENLACES en la reacción:
   — ENLACE IÓNICO: El Na⁺ del NaOH se une al grupo carboxilato (COO⁻) formando la sal que es el jabón.
   — ENLACE COVALENTE: Los enlaces C-O y O-H en el glicerol son covalentes polares.
   — PUENTES DE HIDRÓGENO: Explican por qué el jabón puede interactuar tanto con agua (polar) como con grasa (no polar) → ACCIÓN DETERGENTE.

4. ¿CÓMO LIMPIA EL JABÓN? (Concepto de molécula anfifílica):
   — La molécula de jabón tiene una \"cabeza\" hidrofílica (ama el agua) y una \"cola\" hidrofóbica (ama la grasa).
   — En el lavado, las colas se \"clavan\" en la grasa/suciedad y las cabezas se agarran del agua → formando MICELAS que arrastran la suciedad.

EJERCICIOS APLICADOS:
a) Balancear la ecuación de saponificación del ácido esteárico con NaOH.
b) Si usamos 250 ml de aceite (densidad 0.92 g/ml), ¿cuántos gramos de NaOH necesitamos? (Cálculo estequiométrico simplificado)
c) El jabón que fabricamos tiene pH 9.5. ¿Es ácido, neutro o básico? ¿Es seguro para la piel? (pH ideal para piel: 5.5-7)`,

    valoracion: `💭 FASE REFLEXIVA — Química, Medio Ambiente y Vocación (20 min)

REFLEXIÓN COMUNITARIA GUIADA:
• "1 litro de aceite usado contamina hasta 1.000 litros de agua. En Bolivia se desechan miles de litros diariamente por los desagües. ¿Cuánta agua estamos contaminando como sociedad?"
• "Hoy transformamos un contaminante (aceite usado) en un producto de higiene (jabón). ¿Qué otros residuos podrían transformarse con conocimiento químico?"
• "Las grandes fábricas de jabón usan procesos industriales similares al nuestro pero a gran escala. ¿Un microemprendimiento artesanal puede competir? ¿Qué ventajas tiene?"

DEBATE ÉTICO (7 min):
"¿Deberían las unidades educativas enseñar a los estudiantes a crear productos comercializables como parte del currículo?"
— A favor: desarrolla el emprendimiento, conecta la teoría con la realidad económica.
— En contra: la educación no debería reducirse a producir mercancías.

DESAFÍO VOCACIONAL RELÁMPAGO (5 min):
Profesiones que usan la química de saponificación y ácido-base:
— Ingeniero químico industrial
— Farmacéutico / Cosmetólogo
— Químico ambiental (tratamiento de aguas)
— Emprendedor de productos naturales
— Investigador en biotecnología

Cada estudiante escribe: "Si yo fuera _____, usaría la química para _____."

AUTOEVALUACIÓN:
1. ¿Puedo explicar qué es la saponificación con mis palabras? (1-5)
2. ¿Entendí la diferencia entre ácido, base y neutro en la escala de pH? (1-5)
3. ¿Participé activamente en la fabricación del jabón con mi equipo? (1-5)`,

    produccion: `🎨 FASE PRODUCTIVA — Jabón Artesanal + Emprendimiento (30 min + tarea)

PRODUCTO TANGIBLE ABP:
Cada equipo presenta sus jabones artesanales (desmoldados en la siguiente clase) junto con documentación científica y comercial:

1. JABÓN ARTESANAL TERMINADO:
   — 3-4 barras de jabón desmoldadas y curadas (24-48h)
   — Etiqueta artesanal diseñada por el equipo con:
     • Nombre creativo del producto (ej: "JabónVerde", "EcoLimpio Boliviano")
     • Ingredientes listados
     • pH indicado
     • Peso neto aproximado
     • "Hecho por estudiantes de [nombre del colegio]"

2. INFORME DE LABORATORIO (1 página):
   — Ecuación de saponificación balanceada
   — Tabla de mediciones de pH (aceite, NaOH, jabón)
   — Descripción de cambios observados (color, textura, temperatura)
   — Conclusión: ¿Se completó la reacción? ¿El jabón es seguro (pH)?
   — Dibujo de la molécula anfifílica del jabón explicando su acción limpiadora

3. PLAN DE MICROEMPRENDIMIENTO (media página):
   — "Plan de Negocio Relámpago" para vender jabón artesanal ecológico:
   — Costo de producción por barra (materiales + tiempo)
   — Precio de venta sugerido
   — Mercado objetivo (vecinos, feria escolar, mercado local)
   — Argumento de venta: \"Jabón ecológico que recicla aceite y protege nuestros ríos\"

EXPOSICIÓN: Cada equipo presenta su jabón, informe y plan de negocio en 4 minutos. Se evalúa: calidad del jabón, precisión del informe y creatividad del emprendimiento. Los jabones pueden venderse en la feria escolar como actividad de recaudación.`,

    explicacionNeuro: `🧠 FUNDAMENTACIÓN NEURODIDÁCTICA:
Esta secuencia ABP de Química activa los sentidos de forma multimodal:
— ESTÍMULO MULTISENSORIAL: Tocar la textura cremosa, oler las esencias, ver los cambios de color. La corteza sensorial múltiple se activa simultáneamente, creando conexiones neuronales más densas y duraderas que la simple lectura.
— PRODUCTO TANGIBLE CON VALOR REAL: El cerebro del adolescente necesita sentir que su esfuerzo produce algo útil. Llevarse un jabón a casa activa el sistema de recompensa (núcleo accumbens) y genera orgullo → motivación intrínseca para la química.
— TRANSFORMACIÓN VISIBLE: Ver cómo un líquido aceitoso se convierte en jabón sólido es un "momento eureka" que activa la red de saliencia cerebral. La sorpresa de la transformación química graba la reacción en la memoria a largo plazo.
— EMPRENDIMIENTO Y AUTONOMÍA: Planificar un micro-negocio activa la corteza prefrontal dorsolateral (planificación, cálculo de costos) y genera sensación de agencia: "Yo puedo crear valor económico con la ciencia." Esto es crucial para la activación vocacional.
— SEGURIDAD EMOCIONAL: La supervisión clara del docente con el NaOH, combinada con la autonomía en las fases seguras, crea un equilibrio entre desafío y seguridad que la neurociencia llama "zona de desarrollo proximal emocional".`
  },
  chatResponse: `¡Me encanta, profe! 🧪 He creado una planificación ABP de **Química** que combinará ciencia, emprendimiento y cuidado ambiental.

**🧼 PROYECTO ABP: "Fabricamos Jabón Artesanal para Nuestra Comunidad"**

Los estudiantes se convierten en **químicos emprendedores** que transforman aceite vegetal usado (¡basura!) en jabón artesanal ecológico mediante saponificación.

✨ **Práctica:** Laboratorio real de saponificación: mezclan aceite reciclado con NaOH (supervisado por el docente), observan la reacción exotérmica, añaden esencias naturales y moldean sus jabones. Miden pH con papel tornasol.

✨ **Teoría:** Desde su propia experiencia, descubren: ecuación de saponificación, escala ácido-base (pH), tipos de enlace (iónico, covalente) y cómo las moléculas anfifílicas del jabón atrapan la grasa.

✨ **Valoración:** Debaten sobre contaminación por aceite usado (1L contamina 1.000L de agua) y si el emprendimiento estudiantil debería ser parte del currículo. Descubren profesiones: ingeniero químico, farmacéutico, químico ambiental.

✨ **Producción:** Jabones etiquetados con marca propia + informe de laboratorio + "Plan de Negocio Relámpago" con costos y precio de venta.

*🧠 Nota Neurodidáctica:* El estímulo multisensorial (tocar, oler, ver la transformación) crea conexiones neuronales más densas que la lectura. Llevarse un jabón a casa activa el sistema de recompensa del cerebro.

He cargado el PDC completo en tu Workspace. Haz clic en **Ir a PDC Express** para verlo, editarlo y exportarlo como PDF Ley 070. 📄`,
  climaAdaptaciones: {
    "Alegría": "¡La alegría es el ingrediente secreto! Aprovecha la energía positiva para que los equipos compitan por el jabón más creativo (nombre, aroma, color). La dopamina natural hará que las fórmulas de pH y saponificación se graben como recuerdos felices.",
    "Tristeza": "En un clima de tristeza, enfoca el proyecto como un acto de cuidado: \"Vamos a crear algo con nuestras manos que cuide la higiene de nuestras familias\". El proceso manual de revolver y moldear es meditativo y reconfortante. La transformación del aceite sucio en jabón limpio es una metáfora poderosa de renovación.",
    "Miedo": "Cuando hay miedo, la transparencia es clave: explica detalladamente las medidas de seguridad con el NaOH, demuestra que tú manejas lo peligroso y ellos lo seguro. El éxito en producir un jabón real restaurará la autoconfianza del grupo. \"Si pudieron fabricar jabón, pueden con cualquier desafío de química.\"",
    "Ira": "La ira se canaliza en la acción física: revolver vigorosamente la mezcla durante 15 minutos es catártico. Dirige la intensidad hacia la indignación ambiental: \"¿No les da rabia que contaminen nuestros ríos con aceite usado?\" La ira justa como motor del emprendimiento ecológico.",
    "Asco": "¡El asco es tu aliado en esta clase! Empieza mostrando el aceite oscuro y oloroso: \"¿Ven esta porquería? En 20 minutos será jabón perfumado.\" La repulsión inicial se transforma en asombro. Es la lección más poderosa: la química puede transformar lo repugnante en algo útil y bello.",
    "Sorpresa": "¡La clase ideal para sorprender! No reveles que van a hacer jabón: empieza diciendo \"Hoy vamos a transformar basura en un producto que vale dinero\" y deja que descubran qué es. El momento eureka cuando la mezcla líquida se espesa es mágico. Cada cambio de textura y olor es un shock sensorial que graba la reacción en la memoria."
  }
};


// ============================================================================
// COLECCIÓN COMPLETA Y FUNCIONES DE BÚSQUEDA
// ============================================================================

export const ABP_PLANS: AbpPlan[] = [MATEMATICA_ABP, FISICA_ABP, QUIMICA_ABP];

/**
 * Busca la planificación ABP que coincida con la materia ingresada.
 * Normaliza el texto y busca por keywords.
 */
export function findAbpPlan(materiaInput: string): AbpPlan | null {
  const normalized = materiaInput
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quita tildes
    .trim();

  for (const plan of ABP_PLANS) {
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

/**
 * Genera la respuesta completa del chat incluyendo adaptación emocional.
 */
export function generateSimulatedChatResponse(plan: AbpPlan, clima: string): string {
  const adaptacion = plan.climaAdaptaciones[clima];
  let response = plan.chatResponse;

  if (adaptacion) {
    response += `\n\n🎭 **Adaptación para clima "${clima}":**\n${adaptacion}`;
  }

  return response;
}

/**
 * Genera una respuesta conversacional simulada para mensajes de chat general.
 */
export function generateSimulatedConversation(
  userMessage: string,
  materia: string,
  tema: string,
  clima: string
): string {
  const lowerMsg = userMessage.toLowerCase();
  const plan = findAbpPlan(materia);

  // Respuestas contextualizadas según el tipo de pregunta
  if (lowerMsg.includes("tiempo") || lowerMsg.includes("minuto") || lowerMsg.includes("duración") || lowerMsg.includes("duracion")) {
    return `¡Buena pregunta, profe! 🕐 La planificación ABP que diseñé está pensada para una sesión de **80-90 minutos** distribuidos así:

• **Práctica (fase experiencial):** 40-50 minutos — es la fase más larga porque el aprendizaje activo requiere tiempo de manipulación.
• **Teoría (fase conceptual):** 30-35 minutos — sistematizamos los conceptos desde la experiencia vivida.
• **Valoración (fase reflexiva):** 15-20 minutos — reflexión comunitaria + desafío vocacional.
• **Producción (fase productiva):** 25-30 minutos en clase + tarea para completar.

Si solo tienes **45 minutos**, te recomiendo dividir en 2 sesiones: Sesión 1 (Práctica + inicio de Teoría) y Sesión 2 (Teoría + Valoración + Producción). ¿Te adapto el plan para 2 sesiones? 😊`;
  }

  if (lowerMsg.includes("material") || lowerMsg.includes("recurso") || lowerMsg.includes("necesito") || lowerMsg.includes("comprar")) {
    if (plan) {
      return `📦 **Materiales para el proyecto ABP de ${plan.materia}:**

Todo está diseñado con **materiales económicos y accesibles** en Bolivia:

• La mayoría son reciclados o de bajo costo (menos de Bs. 30 por equipo).
• Los materiales especializados (termómetros, pH-metros) pueden compartirse entre equipos.
• Los estudiantes pueden traer materiales de casa (botellas PET, aceite usado, etc.) como tarea previa.

💡 **Tip:** Una semana antes de la clase, pide a los estudiantes que recolecten los materiales reciclados. Esto genera expectativa y los involucra desde antes de la sesión.

¿Necesitas que detalle la lista específica de materiales con costos estimados? 📋`;
    }
  }

  if (lowerMsg.includes("evaluar") || lowerMsg.includes("evaluación") || lowerMsg.includes("evaluacion") || lowerMsg.includes("nota") || lowerMsg.includes("calificar")) {
    return `📊 **Evaluación ABP alineada a Ley 070:**

La evaluación en ABP es **integral y procesual**, no solo sumativa. Te sugiero este esquema:

**Ser (actitudes — 20%):**
• Participación activa en el equipo
• Respeto en el debate y la reflexión comunitaria
• Autoevaluación honesta (rúbrica individual)

**Saber (conocimientos — 30%):**
• Comprensión de conceptos teóricos (verificada en el informe)
• Corrección en cálculos y aplicación de fórmulas

**Hacer (habilidades — 30%):**
• Calidad del producto tangible (plano/prototipo/jabón)
• Precisión en las mediciones experimentales
• Presentación oral del proyecto

**Decidir (valores — 20%):**
• Conexión del proyecto con la realidad comunitaria
• Reflexión vocacional (post-it de profesiones)
• Propuesta de impacto social

*Nota: En ABP, el proceso importa tanto como el resultado. Un equipo que falló en su prototipo pero documentó bien el error también aprendió.* 🎯`;
  }

  if (lowerMsg.includes("grupo") || lowerMsg.includes("equipo") || lowerMsg.includes("alumno") || lowerMsg.includes("estudiante") || lowerMsg.includes("curso")) {
    return `👥 **Organización de equipos para ABP:**

Te recomiendo equipos de **4-5 integrantes** con roles asignados:

🔹 **Coordinador/a:** Organiza al equipo, gestiona el tiempo.
🔹 **Secretario/a científico/a:** Registra datos y observaciones.
🔹 **Responsable de materiales:** Cuida los instrumentos y la limpieza.
🔹 **Portavoz:** Presenta los resultados al curso.
🔹 **Controlador de calidad:** Verifica que los cálculos y el producto estén correctos.

💡 **Tips de neurociencia para formar equipos:**
• Mezcla estudiantes de diferentes niveles (andamiaje entre pares).
• Evita juntar a los "amigos inseparables" — la diversidad genera mejor aprendizaje.
• Rota los roles en cada proyecto ABP para que todos desarrollen todas las competencias.

¿Cuántos estudiantes tienes en el curso? Te puedo sugerir una distribución óptima. 😊`;
  }

  if (lowerMsg.includes("adaptar") || lowerMsg.includes("modificar") || lowerMsg.includes("cambiar") || lowerMsg.includes("ajustar")) {
    return `✏️ **¡Por supuesto!** El plan ABP es completamente flexible.

Puedo ayudarte a adaptarlo en varios aspectos:
• **Duración:** Comprimir en 45 min o extender a 2-3 sesiones.
• **Nivel de dificultad:** Simplificar para 1er-2do año o complejizar para 5to-6to.
• **Materiales:** Sustituir por lo que tengas disponible en tu unidad educativa.
• **Contexto local:** Ajustar el PSP al proyecto socioproductivo específico de tu colegio.
• **Clima emocional:** Reformular las dinámicas según el estado anímico real del aula.

Dime qué aspectos necesitas cambiar y te genero una versión adaptada. 🛠️`;
  }

  // Respuesta genérica empática
  return `¡Gracias por tu mensaje, profe! 😊 

Entiendo tu consulta sobre "${userMessage.substring(0, 60)}${userMessage.length > 60 ? '...' : ''}". 

Como tu Copiloto Empático, estoy aquí para apoyarte en todo lo relacionado con:
• 📋 Planificación didáctica ABP (Aprendizaje Basado en Proyectos)
• 🧠 Estrategias de neuroeducación para el aula
• 📄 Estructuración del PDC según Ley 070
• 🎯 Activación vocacional de tus estudiantes
• 🎭 Adaptación emocional de la clase

${materia && tema ? `Actualmente estamos trabajando con **${materia}** sobre el tema **"${tema}"** con clima emocional **${clima}**.` : 'Configura la materia y el tema arriba para que pueda darte orientación más específica.'}

¿En qué aspecto específico necesitas que profundice? 💬`;
}

// Quick-select chips data para el frontend
export const ABP_QUICK_SUBJECTS = [
  {
    materia: "Matemática",
    tema: "Geometría Aplicada — Diseño de Parque Ecológico",
    icon: "📐",
    color: "bg-blue-50 border-blue-300 text-blue-800 hover:bg-blue-100",
    colorActive: "bg-blue-600 border-blue-600 text-white"
  },
  {
    materia: "Física",
    tema: "Transferencia de Calor — Calentador Solar Reciclado",
    icon: "⚡",
    color: "bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100",
    colorActive: "bg-amber-600 border-amber-600 text-white"
  },
  {
    materia: "Química",
    tema: "Reacciones Químicas — Fabricación de Jabón Artesanal",
    icon: "🧪",
    color: "bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100",
    colorActive: "bg-emerald-600 border-emerald-600 text-white"
  }
];
