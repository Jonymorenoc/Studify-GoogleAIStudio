export enum Screen {
    Home = 'HOME',
    Grade = 'GRADE',
    Trimester = 'TRIMESTER',
    Exam = 'EXAM',
    Trajectory = 'TRAJECTORY',
}

export interface UserProgress {
    stars: number;
    completedExercises: { [key: number]: boolean };
}

export enum ExerciseType {
    Info,
    Reading,
    MultipleChoice,
    MultiSelect, // New type for selecting multiple correct answers
    WordBank, // New type for building sentences from words
    Matching,
    TrueFalse,
    DragDrop,
    Classification,
    SelfEvaluation,
    VerbTenses,
}

export interface MultipleChoiceOption {
    id: string;
    text: string;
}

export interface MatchingPair {
    id: string;
    item: string;
    match: string;
}

export interface ClassificationItem {
    id: string;
    text: string;
    category: string;
}

export interface VerbTenseItem {
    id: string;
    verb: string;
    time: 'Antes' | 'Actualmente' | 'Después';
}

export interface Exercise {
    id: number;
    title: string;
    category: string;
    type: ExerciseType;
    question?: string;
    description?: string;
    readingTextId?: number;
    emoji?: string; // For exercise-specific visuals
    options?: MultipleChoiceOption[];
    correctAnswer?: string;
    correctAnswers?: string[]; // For MultiSelect
    wordBank?: string[]; // For WordBank exercises
    pairs?: MatchingPair[];
    classificationItems?: ClassificationItem[];
    classificationCategories?: string[];
    verbTenseItems?: VerbTenseItem[];
    hint?: string;
}

export interface ReadingText {
    id: number;
    title: string;
    content: string;
}