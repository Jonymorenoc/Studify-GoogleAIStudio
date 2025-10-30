import { Exercise, ReadingText, ExerciseType } from './types';

export const readingTexts: ReadingText[] = [
    {
        id: 1,
        title: "La Llorona en Xochimilco",
        content: `Durante el Día de Muertos, los canales de Xochimilco se llenan de trajineras decoradas con flores de cempasúchil. La leyenda cuenta que una mujer vestida de blanco aparece llorando entre las aguas. La puesta en escena "La Llorona en Xochimilco" cumple treinta años de presentar la leyenda de La Llorona, o Cihuacóatl, en náhuatl, y aviva la temporada de celebraciones por el Día de Muertos en la Ciudad de México. Este año, la producción consta de 36 funciones que conjugan música original, danza prehispánica, teatro, luz y sonido sobre un escenario montado en medio de la Laguna de Tlílac.`
    },
    {
        id: 2,
        title: "El mito del Sol y la Luna",
        content: `Cuentan que al principio de los tiempos, los dioses se reunieron en Teotihuacán para decidir quién alumbraría al mundo. Dos dioses se ofrecieron: el soberbio Tecuciztécatl y el humilde Nanahuatzin. Ambos debían arrojarse a una hoguera sagrada. Tecuciztécatl, a pesar de su valentía, retrocedió ante el fuego. Nanahuatzin, en cambio, se lanzó sin dudarlo, convirtiéndose en el Sol. Avergonzado, Tecuciztécatl se arrojó después y se transformó en la Luna. Para que el Sol se moviera, los demás dioses se sacrificaron. Por eso, el mito explica no solo el origen de los astros, sino también el valor del sacrificio.`
    }
];

export const exercises: Exercise[] = [
    {
        id: 1,
        type: ExerciseType.Info,
        title: "¡Comienza la aventura!",
        category: "Introducción",
        description: "En esta aventura conocerás mitos y leyendas que forman parte de nuestra cultura.",
        emoji: "🚀"
    },
    {
        id: 2,
        type: ExerciseType.Reading,
        readingTextId: 1,
        title: "Lectura: La Llorona",
        category: "Comprensión lectora",
        description: "Prepárate para leer una famosa leyenda mexicana.",
        emoji: "📖"
    },
    {
        id: 3,
        type: ExerciseType.MultipleChoice,
        readingTextId: 1,
        title: "Comprensión Lectora",
        category: "Comprensión",
        question: "¿De qué trata principalmente el texto?",
        options: [
            { id: 'a', text: "Una leyenda del Día de Muertos en los canales de Xochimilco" },
            { id: 'b', text: "Un mito sobre el origen de las flores de cempasúchil" },
            { id: 'c', text: "Un relato sobre una boda tradicional en trajinera" },
            { id: 'd', text: "Una historia sobre cómo se construyeron los canales" }
        ],
        correctAnswer: 'a',
        hint: "El texto menciona un lugar, una celebración y un personaje legendario."
    },
    {
        id: 4,
        type: ExerciseType.MultipleChoice,
        readingTextId: 1,
        title: "Idea Principal",
        category: "Comprensión",
        question: "¿Cuál es la idea principal del evento de La Llorona en Xochimilco?",
        options: [
            { id: 'a', text: "Preservar una tradición cultural del Día de Muertos" },
            { id: 'b', text: "Generar ingresos vendiendo flores de cempasúchil en trajineras" },
            { id: 'c', text: "Atraer turistas extranjeros a los canales de Xochimilco" },
            { id: 'd', text: "Competir con otras leyendas mexicanas más famosas" }
        ],
        correctAnswer: 'a',
        hint: "Piensa en el propósito de mantener viva una leyenda a través de un espectáculo."
    },
    {
        id: 5,
        type: ExerciseType.MultiSelect,
        readingTextId: 1,
        title: "Elementos Únicos",
        category: "Análisis",
        question: "Según el texto, ¿qué elementos hacen único al espectáculo de La Llorona? (Selecciona todos los correctos)",
        options: [
            { id: 'a', text: "Música original" },
            { id: 'b', text: "Danza prehispánica" },
            { id: 'c', text: "Actores famosos" },
            { id: 'd', text: "Un escenario en una laguna" },
            { id: 'e', text: "Fuegos artificiales" }
        ],
        correctAnswers: ['a', 'b', 'd'],
        hint: "Busca en la última parte del texto donde describe la producción."
    },
    {
        id: 6,
        type: ExerciseType.Matching,
        title: "Fuentes de historias",
        category: "Investigación",
        question: "Relaciona cada lugar con el tipo de historias que podrías encontrar allí.",
        emoji: "🔍",
        pairs: [
            { id: 'a', item: "Biblioteca", match: "Libros de mitos y leyendas" },
            { id: 'b', item: "Museo de Antropología", match: "Relatos prehispánicos y códices" },
            { id: 'c', item: "Conversación con abuelos", match: "Tradición oral y anécdotas familiares" },
            { id: 'd', item: "Festival de Día de Muertos", match: "Representaciones de leyendas locales" }
        ],
        hint: "Piensa qué tipo de información o relatos guarda cada uno de esos lugares o personas."
    },
    {
        id: 7,
        type: ExerciseType.Reading,
        readingTextId: 2,
        title: "Lectura: El Sol y la Luna",
        category: "Mitología",
        description: "Ahora leerás un mito sobre la creación del Sol y la Luna.",
        emoji: "🌞🌜"
    },
    {
        id: 8,
        type: ExerciseType.WordBank,
        readingTextId: 2,
        title: "Resumen del Mito",
        category: "Síntesis",
        question: "Completa el resumen del mito usando las palabras del banco.",
        description: "En ______, el humilde ______ se convirtió en el Sol, mientras que el soberbio ______ se transformó en la Luna.",
        wordBank: ["Teotihuacán", "Nanahuatzin", "Xochimilco", "Tecuciztécatl", "Cihuacóatl"],
        correctAnswers: ["Teotihuacán", "Nanahuatzin", "Tecuciztécatl"],
        hint: "Recuerda el nombre de los dos dioses y el lugar donde se reunieron."
    },
    {
        id: 9,
        type: ExerciseType.Classification,
        title: "Clasificación: Mito o Leyenda",
        category: "Tipos de narraciones",
        question: "Clasifica cada título como Mito o Leyenda.",
        classificationCategories: ["Leyenda", "Mito"],
        classificationItems: [
            { id: 'a', text: "El Charro Negro", category: "Leyenda" },
            { id: 'b', text: "El callejón del beso", category: "Leyenda" },
            { id: 'c', text: "Xochiquetzal", category: "Mito" },
            { id: 'd', text: "El águila y la serpiente", category: "Mito" },
        ],
        hint: "Los mitos explican el origen del mundo o de los dioses, mientras que las leyendas son relatos populares sobre lugares o personajes."
    },
    {
        id: 10,
        type: ExerciseType.WordBank,
        title: "Crea tu propio mito",
        category: "Escritura creativa",
        question: "Arma la idea para un mito con las opciones.",
        description: "Un ______ que vive en ______ usa su poder para crear ______.",
        wordBank: ["colibrí", "el eco", "un jaguar", "el lago", "la montaña", "el arcoíris"],
        correctAnswers: ["colibrí", "el lago", "el eco"], // Example answer
        emoji: "✍️",
        hint: "¡No hay una sola respuesta correcta! Elige los elementos que más te gusten para tu historia."
    },
    {
        id: 11,
        type: ExerciseType.MultiSelect,
        title: "Describe tu personaje",
        category: "Creación de personajes",
        question: "Elige 3 adjetivos que describan al colibrí de la historia anterior.",
        options: [
            { id: 'a', text: "Rápido" },
            { id: 'b', text: "Colorido" },
            { id: 'c', text: "Lento" },
            { id: 'd', text: "Mágico" },
            { id: 'e', text: "Gris" }
        ],
        correctAnswers: ['a', 'b', 'd'], // Example answer, no strict validation
        hint: "Piensa en cómo son los colibríes y qué los hace especiales."
    },
    {
        id: 12,
        type: ExerciseType.MultipleChoice,
        title: "Lenguaje visual y sonoro",
        category: "Análisis de medios",
        question: "Si quisieras representar una escena de misterio en una leyenda, ¿qué usarías?",
        options: [
            { id: 'a', text: "Música alegre y luces brillantes" },
            { id: 'b', text: "Sonidos de la naturaleza y colores cálidos" },
            { id: 'c', text: "Música de suspenso, sombras y niebla" },
            { id: 'd', text: "Silencio total y una imagen estática" }
        ],
        correctAnswer: 'c',
        hint: "Piensa en las películas de misterio. ¿Cómo logran crear esa atmósfera?"
    },
    {
        id: 13,
        type: ExerciseType.WordBank,
        title: "El ajolote",
        category: "Conciencia ambiental",
        emoji: "🦎",
        question: "Forma un mensaje para proteger al ajolote.",
        description: "______ el hogar del ______ para conservarlo.",
        wordBank: ["Destruye", "Cuida", "contaminado", "ajolote"],
        correctAnswers: ["Cuida", "ajolote"],
        hint: "Elige las palabras que suenen a una acción positiva."
    },
    {
        id: 14,
        type: ExerciseType.MultiSelect,
        title: "Observa La Catrina",
        category: "Interpretación de arte",
        question: "De los siguientes, ¿qué elementos visuales son típicos de La Catrina? Elige todos los que apliquen.",
        emoji: "💀",
        options: [
            { id: 'a', text: "Sombrero elegante con flores" },
            { id: 'b', text: "Ropa deportiva" },
            { id: 'c', text: "Maquillaje de calavera" },
            { id: 'd', text: "Vestido largo y antiguo" },
        ],
        correctAnswers: ['a', 'c', 'd'],
        hint: "Recuerda la imagen de la Catrina que es famosa en el Día de Muertos."
    },
    {
        id: 15,
        type: ExerciseType.MultipleChoice,
        title: "Canción La Llorona",
        category: "Análisis musical",
        question: "¿Qué emoción principal transmite la canción de 'La Llorona'?",
        options: [
            { id: 'a', text: "Alegría y fiesta" },
            { id: 'b', text: "Tristeza y lamento" },
            { id: 'c', text: "Misterio y suspenso" },
            { id: 'd', text: "Enojo y furia" },
        ],
        correctAnswer: 'b',
        hint: "Piensa en la leyenda de la mujer que llora por sus hijos."
    },
    {
        id: 16,
        type: ExerciseType.MultipleChoice,
        title: "Narración oral familiar",
        category: "Tradición oral",
        question: "Cuando un familiar te cuenta una historia antigua, ¿qué está compartiendo contigo?",
        options: [
            { id: 'a', text: "Una noticia del periódico" },
            { id: 'b', text: "Una tarea de la escuela" },
            { id: 'c', text: "Parte de la tradición y cultura familiar" },
            { id: 'd', text: "La sinopsis de una película" }
        ],
        correctAnswer: 'c',
        hint: "¡Las historias de nuestros abuelos son tesoros culturales!"
    },
    {
        id: 17,
        type: ExerciseType.TrueFalse,
        title: "Verdadero o Falso",
        category: "Conceptos",
        question: "¿Los mitos siempre cuentan historias sobre personajes y eventos reales?",
        correctAnswer: 'false',
        hint: "Recuerda que los mitos intentan explicar el origen del mundo y los dioses, que son elementos fantásticos."
    },
    {
        id: 18,
        type: ExerciseType.DragDrop,
        title: "Pasos para crear una narración",
        category: "Proceso narrativo",
        question: "Ordena los pasos para crear una buena narración.",
        options: [
            { id: 'a', text: "1. Elegir un tema cultural" },
            { id: 'b', text: "2. Seleccionar ideas clave" },
            { id: 'c', text: "3. Crear una narrativa clara" },
            { id: 'd', text: "4. Adaptar a la audiencia" }
        ],
        correctAnswer: 'a,b,c,d', // Placeholder for drag-drop logic
        hint: "Todo comienza con una gran idea."
    },
    {
        id: 19,
        type: ExerciseType.MultipleChoice,
        title: "Representación Escénica",
        category: "Planificación",
        question: "Si vas a contar una leyenda a niños más pequeños, ¿qué es lo más importante a considerar?",
        options: [
            { id: 'a', text: "Usar palabras muy complicadas" },
            { id: 'b', text: "Hacer la historia muy larga y detallada" },
            { id: 'c', text: "Usar un lenguaje sencillo y muchos gestos" },
            { id: 'd', text: "No usar imágenes ni sonidos" }
        ],
        correctAnswer: 'c',
        hint: "Piensa en cómo captar la atención de un público infantil."
    },
    {
        id: 20,
        type: ExerciseType.SelfEvaluation,
        title: "Autoevaluación",
        category: "Expresión oral",
        question: "Cuando cuentas una historia, ¿cómo calificarías tu pronunciación del 1 al 5?",
        description: "1=Necesito mejorar mucho, 5=Es excelente. ¡Sé honesto!",
        options: [ { id: '1', text: "1" }, { id: '2', text: "2" }, { id: '3', text: "3" }, { id: '4', text: "4" }, { id: '5', text: "5" } ],
        hint: "No hay respuesta incorrecta. El objetivo es reflexionar para mejorar."
    },
    {
        id: 21,
        type: ExerciseType.MultipleChoice,
        title: "Preservando historias",
        category: "Reflexión",
        question: "¿Por qué es importante preservar los mitos y leyendas?",
        options: [
            { id: 'a', text: "Porque nos conectan con nuestra historia y cultura" },
            { id: 'b', text: "Porque son obligatorias en los exámenes" },
            { id: 'c', text: "Porque son más divertidas que los videojuegos" },
            { id: 'd', text: "Porque no hay nada más que leer" }
        ],
        correctAnswer: 'a',
        hint: "Piensa en qué nos enseñan estas historias sobre quiénes somos y de dónde venimos."
    },
    {
        id: 22,
        type: ExerciseType.VerbTenses,
        title: "Verbos y Tiempos",
        category: "Gramática",
        question: "Clasifica los verbos del texto según el tiempo.",
        description: "Mi nombre es Roberto, nací en Acapulco pero ahora vivo en la ciudad. Mi papá trabaja mucho. Mis hermanos y yo cambiaremos de escuela. Los veré pronto y viviremos nuevas aventuras.",
        verbTenseItems: [
            { id: 'a', verb: "nací", time: "Antes" },
            { id: 'b', verb: "vivo", time: "Actualmente" },
            { id: 'c', verb: "trabaja", time: "Actualmente" },
            { id: 'd', verb: "cambiaremos", time: "Después" },
            { id: 'e', verb: "veré", time: "Después" },
            { id: 'f', verb: "viviremos", time: "Después" },
        ],
        hint: "Fíjate en las terminaciones de los verbos. Los que hablan de lo que ya pasó, lo de ahora y lo que pasará."
    },
    {
        id: 23,
        type: ExerciseType.Info,
        title: "¡Recorrido completado!",
        category: "Final",
        description: "¡Felicidades! Has ganado la medalla de 'Narrador de Leyendas' 🏅. ¡Sigue aprendiendo!",
        emoji: "🏆"
    }
];