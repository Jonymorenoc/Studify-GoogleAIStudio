import React, { useState, useEffect, useMemo, createContext, useContext, useCallback } from 'react';
import { exercises as allExercises, readingTexts } from './constants';
import { Screen, UserProgress, Exercise, ExerciseType, ReadingText, MultipleChoiceOption, MatchingPair, ClassificationItem, VerbTenseItem } from './types';

// --- ICONS ---
// FIX: Changed Icon from const arrow function to function declaration.
function Icon({ children, className = '' }) { return <div className={`inline-block ${className}`}>{children}</div>; }
const StarIcon = ({ className = '' }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></Icon>;
const BookOpenIcon = ({ className = '' }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></Icon>;
const ArrowLeftIcon = ({ className = '' }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></Icon>;
const ArrowRightIcon = ({ className = '' }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></Icon>;
const LightbulbIcon = ({ className = '' }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></Icon>;
const LockIcon = ({ className = '' }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></Icon>;
const BookIcon = ({ className = '' }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-book"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v2H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 17Z"></path></svg></Icon>;
const GraduationCapIcon = ({ className = '' }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-graduation-cap"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg></Icon>;
const TrophyIcon = ({ className = '' }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trophy"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21-.19.08-.44.15-.73.23-.29.08-.6.16-.9.23-.3.07-.59.12-.8.12H8c-.21 0-.5-.05-.8-.12-.3-.07-.6-.15-.9-.23-.29-.08-.54-.15-.73-.23-.5-.23-.97-.66-.97-1.21V14.66c0-.13.03-.26.09-.37l.81-1.51c.09-.17.2-.34.34-.5.14-.16.32-.3.5-.41.18-.11.39-.19.6-.23.21-.04.43-.06.65-.06h.1c.22 0 .44.02.65.06.21.04.42.12.6.23.18.11.36.25.5.41.14.16.25.33.34.5l.81 1.51c.06.11.09.24.09.37z"></path></svg></Icon>;

// --- UI COMPONENTS ---
// FIX: Changed Button from const arrow function to function declaration.
function Button({ children, onClick, className = '', variant = 'primary', disabled = false }) {
    const baseClasses = "w-full text-center font-bold py-3 px-4 rounded-xl shadow-md transition-transform transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variants = {
        primary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
        secondary: 'bg-purple-100 text-purple-800 border border-purple-300 hover:bg-purple-200 focus:ring-purple-400',
    };
    const disabledClasses = 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none';
    return <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${disabled ? disabledClasses : variants[variant]} ${className}`}>{children}</button>;
}

// FIX: Changed Card from const arrow function to function declaration.
function Card({ children, className = '', onClick = null }) {
    const cursorClass = onClick ? 'cursor-pointer' : '';
    return <div onClick={onClick} className={`bg-white rounded-2xl shadow-lg p-6 w-full text-gray-900 ${className} ${cursorClass}`}>{children}</div>;
}

const EmojiDisplay = ({ emoji }) => {
    if (!emoji) return null;
    return (
        <div className="flex justify-center items-center my-2 h-28 md:h-32">
            <span className="text-7xl">{emoji}</span>
        </div>
    );
};

// --- SCREENS & LOGIC ---

const AppContext = createContext({
    setScreen: (screen: Screen) => {},
    userProgress: { stars: 0, completedExercises: {} },
    completeExercise: (exerciseId: number) => {},
});

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const MultipleChoiceComponent = ({ exercise, onCorrect, onIncorrect }) => {
    const [selected, setSelected] = useState(null);
    const [status, setStatus] = useState('idle');
    const options = useMemo(() => shuffleArray(exercise.options), [exercise.id]);

    const handleCheck = () => {
        if (!exercise.correctAnswer) { // For self-evaluation
            onCorrect();
            return;
        }
        if (selected === exercise.correctAnswer) {
            setStatus('correct');
            onCorrect();
        } else {
            setStatus('incorrect');
            onIncorrect();
        }
    };
    
    const getOptionClass = (optionId) => {
        if (status === 'correct' && selected === optionId) return 'border-green-500 bg-green-50 text-green-800 ring-2 ring-green-500';
        if (status === 'incorrect' && selected === optionId) return 'border-red-500 bg-red-50 text-red-800 ring-2 ring-red-500';
        if (selected === optionId) return 'border-purple-500 bg-purple-50 ring-2 ring-purple-500';
        return 'border-gray-300 bg-white hover:bg-gray-100';
    }

    return (
        <div className="space-y-4">
            <p className="text-gray-800 text-lg font-medium">{exercise.question}</p>
            <div className="space-y-3">
                {options.map(option => (
                    <div key={option.id} onClick={() => status !== 'correct' && setSelected(option.id)}
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${getOptionClass(option.id)}`}>
                        {option.text}
                    </div>
                ))}
            </div>
            <Button onClick={handleCheck} disabled={!selected || status === 'correct'} >
                Verificar Respuesta
            </Button>
        </div>
    );
};

const MultiSelectComponent = ({ exercise, onCorrect, onIncorrect }) => {
    const [selected, setSelected] = useState([]);
    const [status, setStatus] = useState('idle');

    const toggleSelection = (optionId) => {
        if (status === 'correct') return;
        const newSelected = selected.includes(optionId)
            ? selected.filter(id => id !== optionId)
            : [...selected, optionId];
        setSelected(newSelected);
    };

    const handleCheck = () => {
        const correctAnswers = exercise.correctAnswers || [];
        const isCorrect = selected.length === correctAnswers.length && correctAnswers.every(id => selected.includes(id)) && selected.every(id => correctAnswers.includes(id));
        
        if (isCorrect) {
            setStatus('correct');
            onCorrect();
        } else {
            setStatus('incorrect');
            onIncorrect();
        }
    };
    
    const getOptionClass = (optionId) => {
        const isSelected = selected.includes(optionId);
        if (status === 'correct' && isSelected) return 'border-green-500 bg-green-50 text-green-800 ring-2 ring-green-500';
        if (status === 'incorrect' && isSelected) return 'border-red-500 bg-red-50 text-red-800 ring-2 ring-red-500';
        if (isSelected) return 'border-purple-500 bg-purple-50 ring-2 ring-purple-500';
        return 'border-gray-300 bg-white hover:bg-gray-100';
    };

    return (
        <div className="space-y-4">
            <p className="text-gray-800 text-lg font-medium">{exercise.question}</p>
            <div className="space-y-3">
                {exercise.options.map(option => (
                    <div key={option.id} onClick={() => toggleSelection(option.id)}
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${getOptionClass(option.id)}`}>
                        {option.text}
                    </div>
                ))}
            </div>
            <Button onClick={handleCheck} disabled={selected.length === 0 || status === 'correct'}>
                Verificar
            </Button>
        </div>
    );
};

const WordBankComponent = ({ exercise, onCorrect, onIncorrect }) => {
    const [answers, setAnswers] = useState([]);
    const wordBank = useMemo(() => shuffleArray(exercise.wordBank), [exercise.id]);
    const requiredAnswers = exercise.correctAnswers.length;

    const handleWordClick = (word) => {
        if (answers.length < requiredAnswers) {
            setAnswers([...answers, word]);
        }
    };
    
    const reset = () => setAnswers([]);
    
    const handleCheck = () => {
        const isCorrect = JSON.stringify(answers.sort()) === JSON.stringify(exercise.correctAnswers.sort());
        if (isCorrect) {
            onCorrect();
        } else {
            onIncorrect();
            reset();
        }
    };

    const questionText = exercise.description.split('______').reduce((prev, current, i) => {
        return prev.concat(
            <span key={`span-${i}`}>{current}</span>,
            i < requiredAnswers ? <span key={`blank-${i}`} className="inline-block text-center w-32 bg-purple-100 text-purple-800 font-bold rounded-md px-2 py-1 mx-1">{answers[i] || '...'}</span> : null
        );
    }, []);

    return (
        <div className="space-y-6 text-center">
            <p className="text-gray-800 text-lg font-medium">{exercise.question}</p>
            <div className="p-4 bg-gray-100 rounded-lg text-lg text-gray-800 min-h-[6rem] flex items-center justify-center flex-wrap">
                {questionText}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                {wordBank.map((word, i) => (
                    <button key={i} onClick={() => handleWordClick(word)}
                        disabled={answers.length >= requiredAnswers}
                        className="bg-white border-2 border-gray-300 text-gray-800 rounded-lg px-4 py-2 font-semibold hover:bg-purple-50 hover:border-purple-400 disabled:bg-gray-200 disabled:text-gray-400">
                        {word}
                    </button>
                ))}
            </div>
            <div className="flex gap-4">
                <Button onClick={reset} variant="secondary" disabled={answers.length === 0}>Reiniciar</Button>
                <Button onClick={handleCheck} disabled={answers.length < requiredAnswers}>Verificar</Button>
            </div>
        </div>
    );
};


const MatchingComponent = ({ exercise, onCorrect, onIncorrect }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [correctPairs, setCorrectPairs] = useState([]);
    const [incorrectAttempts, setIncorrectAttempts] = useState(0);

    const items = useMemo(() => shuffleArray(exercise.pairs.map(p => ({ id: p.id, text: p.item }))), [exercise.id]);
    const matches = useMemo(() => shuffleArray(exercise.pairs.map(p => ({ id: p.id, text: p.match }))), [exercise.id]);

    useEffect(() => {
        if (selectedItem && selectedMatch) {
            if (selectedItem.id === selectedMatch.id) {
                const newCorrectPairs = [...correctPairs, selectedItem.id];
                setCorrectPairs(newCorrectPairs);
                if (newCorrectPairs.length === exercise.pairs.length) {
                    onCorrect();
                }
            } else {
                setIncorrectAttempts(incorrectAttempts + 1);
            }
            setSelectedItem(null);
            setSelectedMatch(null);
        }
    }, [selectedItem, selectedMatch, correctPairs, exercise.pairs.length, onCorrect]);

    const isCorrect = (id) => correctPairs.includes(id);
    const isSelected = (item) => selectedItem?.id === item.id || selectedMatch?.id === item.id;

    const getItemClass = (item, isMatchCol = false) => {
        if (isCorrect(item.id)) return 'bg-green-100 text-green-800 border-green-300';
        if (isSelected(item)) return 'bg-purple-100 border-purple-400 ring-2 ring-purple-400 text-purple-900';
        const isSelectedFromThisCol = isMatchCol ? selectedMatch : selectedItem;
        if (isSelectedFromThisCol) return 'bg-gray-100 text-gray-400 border-gray-200';
        return 'bg-white hover:bg-purple-50 border-gray-300 text-gray-800';
    }

    return (
        <div className="space-y-4">
            <p className="text-gray-800 text-lg font-medium">{exercise.question}</p>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    {items.map(item => (
                        <button key={item.id} onClick={() => !isCorrect(item.id) && setSelectedItem(item)}
                            disabled={isCorrect(item.id) || !!selectedItem}
                            className={`p-3 w-full text-left rounded-lg border-2 transition ${getItemClass(item)}`}>
                            {item.text}
                        </button>
                    ))}
                </div>
                <div className="space-y-2">
                     {matches.map(match => (
                        <button key={match.id} onClick={() => !isCorrect(match.id) && setSelectedMatch(match)}
                             disabled={isCorrect(match.id) || !!selectedMatch}
                             className={`p-3 w-full text-left rounded-lg border-2 transition ${getItemClass(match, true)}`}>
                            {match.text}
                        </button>
                    ))}
                </div>
            </div>
            {incorrectAttempts > 0 && correctPairs.length < exercise.pairs.length && <p className="text-red-600 text-center">Algunas parejas no son correctas. ¡Sigue intentando!</p>}
        </div>
    );
};

const ClassificationComponent = ({ exercise, onCorrect, onIncorrect }) => {
    const [answers, setAnswers] = useState({}); // { itemId: 'category' }
    
    const handleSelect = (itemId, category) => {
        setAnswers(prev => ({ ...prev, [itemId]: category }));
    };

    useEffect(() => {
        const allAnswered = Object.keys(answers).length === exercise.classificationItems.length;
        if (allAnswered) {
            const allCorrect = exercise.classificationItems.every(item => answers[item.id] === item.category);
            if (allCorrect) {
                onCorrect();
            } else {
                onIncorrect();
            }
        }
    }, [answers, exercise, onCorrect, onIncorrect]);
    
    return (
        <div className="space-y-4">
            <p className="text-gray-800 text-lg font-medium">{exercise.question}</p>
            <div className="space-y-6">
                {exercise.classificationItems.map(item => {
                    const selectedCategory = answers[item.id];
                    const isAnswered = !!selectedCategory;
                    const isCorrect = isAnswered && selectedCategory === item.category;

                    return (
                        <div key={item.id} className={`p-4 rounded-lg border-2 transition ${isCorrect ? 'border-green-300 bg-green-50' : isAnswered ? 'border-red-300 bg-red-50' : 'bg-white'}`}>
                            <p className="font-semibold text-gray-800 mb-3">{item.text}</p>
                            <div className="flex justify-center gap-3">
                                {exercise.classificationCategories.map(cat => {
                                    const isSelectedCat = selectedCategory === cat;
                                    return (
                                        <button 
                                            key={cat}
                                            onClick={() => handleSelect(item.id, cat)}
                                            disabled={isCorrect}
                                            className={`px-4 py-1 text-sm font-semibold rounded-full border-2 transition
                                                ${isCorrect && isSelectedCat ? 'bg-green-500 text-white border-green-500' : 
                                                isAnswered && !isCorrect && isSelectedCat ? 'bg-red-500 text-white border-red-500' : 
                                                'bg-white text-purple-700 border-purple-300 hover:bg-purple-100 disabled:bg-gray-200 disabled:text-gray-400'}`}
                                        >
                                            {cat}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const VerbTensesComponent = ({ exercise, onCorrect, onIncorrect }) => {
    const [answers, setAnswers] = useState({}); // { itemId: 'time' }

    const handleSelect = (itemId, time) => {
        setAnswers(prev => ({ ...prev, [itemId]: time }));
    };

    useEffect(() => {
        const allAnswered = Object.keys(answers).length === exercise.verbTenseItems.length;
         if (allAnswered) {
            const allCorrect = exercise.verbTenseItems.every(item => answers[item.id] === item.time);
            if (allCorrect) {
                onCorrect();
            } else {
                onIncorrect();
            }
        }
    }, [answers, exercise, onCorrect, onIncorrect]);

    const categories = ['Antes', 'Actualmente', 'Después'];

    return (
         <div className="space-y-4">
            <p className="text-gray-800 text-lg font-medium">{exercise.question}</p>
            <p className="text-gray-700 text-center p-3 bg-gray-100 rounded-lg italic">"{exercise.description}"</p>
            <div className="space-y-6">
                {exercise.verbTenseItems.map(item => {
                    const selectedTime = answers[item.id];
                    const isAnswered = !!selectedTime;
                    const isCorrect = isAnswered && selectedTime === item.time;
                    return (
                        <div key={item.id} className={`p-4 rounded-lg border-2 ${isCorrect ? 'border-green-300 bg-green-50' : isAnswered ? 'border-red-300 bg-red-50' : 'bg-white'}`}>
                            <p className="font-semibold text-gray-800 mb-3 text-center text-xl text-purple-800">"{item.verb}"</p>
                            <div className="flex justify-center gap-3">
                                {categories.map(cat => {
                                    const isSelectedCat = selectedTime === cat;
                                    return (
                                        <button 
                                            key={cat}
                                            onClick={() => handleSelect(item.id, cat)}
                                            disabled={isCorrect}
                                            className={`px-4 py-1 text-sm font-semibold rounded-full border-2 transition
                                                ${isCorrect && isSelectedCat ? 'bg-green-500 text-white border-green-500' : 
                                                isAnswered && !isCorrect && isSelectedCat ? 'bg-red-500 text-white border-red-500' : 
                                                'bg-white text-purple-700 border-purple-300 hover:bg-purple-100 disabled:bg-gray-200 disabled:text-gray-400'}`}
                                        >
                                            {cat}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
         </div>
    );
};


const ReadingModal = ({ text, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
        <Card className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">{text.title}</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{text.content}</p>
            <Button onClick={onClose} className="mt-6">Cerrar</Button>
        </Card>
    </div>
);


const FeedbackAnimation = ({ show, correct }) => {
    if (!show) return null;
    if (correct) {
        return (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10 rounded-2xl">
                <span className="text-7xl animate-tada">🎉</span>
                <p className="text-green-600 font-bold text-2xl mt-4">+3 ⭐ ¡Genial!</p>
            </div>
        )
    }
    return (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10 rounded-2xl">
            <span className="text-7xl animate-shake">😟</span>
            <p className="text-red-600 font-bold text-2xl mt-4">¡Inténtalo de nuevo!</p>
        </div>
    );
};


const TrajectoryScreen = () => {
    const { setScreen, userProgress, completeExercise } = useContext(AppContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showReadingIntro, setShowReadingIntro] = useState(false);
    const [showReadingModal, setShowReadingModal] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [feedback, setFeedback] = useState({ show: false, correct: false });
    const completedSet = useMemo(() => new Set(Object.keys(userProgress.completedExercises).map(Number)), [userProgress.completedExercises]);

    const currentExercise = allExercises[currentIndex];
    const totalExercises = allExercises.length;
    const progressPercent = (completedSet.size / (totalExercises - 2)) * 100; // Exclude intro/outro
    
    useEffect(() => {
        const exercise = allExercises[currentIndex];
        
        if (exercise.type === ExerciseType.Reading) {
            setShowReadingIntro(true);
        } else {
            setShowReadingIntro(false);
        }
    }, [currentIndex]);
    
    const handleNext = useCallback(() => {
        if (currentIndex < totalExercises - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowHint(false);
        } else {
            setScreen(Screen.Exam);
        }
    }, [currentIndex, totalExercises, setScreen]);
    
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setShowHint(false);
        }
    };

    const handleCorrect = useCallback(() => {
        setFeedback({ show: true, correct: true });
        if (!completedSet.has(currentExercise.id)) {
            completeExercise(currentExercise.id);
        }
        setTimeout(() => {
            setFeedback({ show: false, correct: false });
            handleNext();
        }, 2000);
    }, [completedSet, completeExercise, currentExercise.id, handleNext]);

    const handleIncorrect = () => {
        setFeedback({ show: true, correct: false });
        setTimeout(() => {
            setFeedback({ show: false, correct: false });
        }, 1500);
    };

    const renderExercise = () => {
        switch (currentExercise.type) {
            case ExerciseType.MultipleChoice:
            case ExerciseType.SelfEvaluation:
                 return <MultipleChoiceComponent exercise={currentExercise} onCorrect={handleCorrect} onIncorrect={handleIncorrect} />;
            case ExerciseType.MultiSelect:
                return <MultiSelectComponent exercise={currentExercise} onCorrect={handleCorrect} onIncorrect={handleIncorrect} />;
            case ExerciseType.WordBank:
                return <WordBankComponent exercise={currentExercise} onCorrect={handleCorrect} onIncorrect={handleIncorrect} />;
            case ExerciseType.Matching:
                return <MatchingComponent exercise={currentExercise} onCorrect={handleCorrect} onIncorrect={handleIncorrect} />;
            case ExerciseType.Classification:
                return <ClassificationComponent exercise={currentExercise} onCorrect={handleCorrect} onIncorrect={handleIncorrect} />;
            case ExerciseType.VerbTenses:
                return <VerbTensesComponent exercise={currentExercise} onCorrect={handleCorrect} onIncorrect={handleIncorrect} />;
            case ExerciseType.TrueFalse:
                 return <MultipleChoiceComponent exercise={{ ...currentExercise, options: [{id: 'true', text: 'Verdadero'}, {id: 'false', text: 'Falso'}]}} onCorrect={handleCorrect} onIncorrect={handleIncorrect} />;
            case ExerciseType.Info:
                return (
                    <div className="text-center space-y-4">
                        <EmojiDisplay emoji={currentExercise.emoji} />
                        <p className="text-2xl font-bold text-purple-800">{currentExercise.title}</p>
                        <p className="text-lg text-gray-700">{currentExercise.description}</p>
                        <Button onClick={handleNext}>{currentIndex >= totalExercises - 2 ? "Finalizar" : "Comenzar"}</Button>
                    </div>
                );
            default:
                return <div className="text-center"><p>Próximamente...</p><Button onClick={handleNext}>Siguiente</Button></div>;
        }
    };

    if (showReadingIntro) {
        const readingText = readingTexts.find(rt => rt.id === currentExercise.readingTextId);
        return (
            <div className="p-4 md:p-8 min-h-screen flex flex-col justify-center items-center bg-purple-50">
                <Card className="max-w-2xl">
                     <div className="flex items-center text-purple-700 mb-4">
                        <BookOpenIcon className="w-8 h-8 mr-2"/>
                        <h2 className="text-2xl font-bold">LEE el siguiente texto</h2>
                    </div>
                    <EmojiDisplay emoji={currentExercise.emoji} />
                    <p className="text-gray-700 mb-6 whitespace-pre-line leading-relaxed">{readingText.content}</p>
                    <Button onClick={handleNext}>Ya he terminado de leer</Button>
                </Card>
            </div>
        )
    }

    const currentReadingText = readingTexts.find(rt => rt.id === currentExercise.readingTextId);

    return (
        <div className="p-4 md:p-8 min-h-screen bg-purple-50">
             {showReadingModal && currentReadingText && <ReadingModal text={currentReadingText} onClose={() => setShowReadingModal(false)} />}
            <div className="max-w-4xl mx-auto">
                <header className="flex items-center justify-between mb-4">
                    <button onClick={() => setScreen(Screen.Exam)} className="flex items-center text-purple-700 hover:text-purple-900 font-semibold">
                        <ArrowLeftIcon className="w-5 h-5 mr-1" /> Volver al examen
                    </button>
                </header>
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-purple-900">Lengua Trayecto 1</h1>
                    <p className="text-gray-700">Manifestaciones artísticas: mitos y leyendas</p>
                </div>

                <Card className="mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-lg text-gray-800">Ejercicio {currentExercise.id} de {totalExercises - 2}</p>
                            <p className="text-gray-700">{completedSet.size} completados</p>
                        </div>
                        <div className="flex items-center text-yellow-500 font-bold text-2xl">
                            <StarIcon className="w-8 h-8 mr-2 fill-current" />
                            {userProgress.stars}
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                </Card>

                <Card className="relative overflow-hidden">
                    <FeedbackAnimation show={feedback.show} correct={feedback.correct} />
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start">
                             <div className="bg-purple-600 text-white w-10 h-10 flex items-center justify-center rounded-lg font-bold text-xl mr-4">{currentExercise.id}</div>
                             <div>
                                 <h2 className="text-xl font-bold text-gray-900">{currentExercise.title}</h2>
                                 <p className="text-purple-700 font-medium">{currentExercise.category}</p>
                             </div>
                        </div>
                        {currentReadingText && (
                            <button onClick={() => setShowReadingModal(true)} className="flex items-center text-sm font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full hover:bg-purple-200">
                                <BookOpenIcon className="w-4 h-4 mr-1"/> Volver a leer
                            </button>
                        )}
                    </div>

                    <div className="my-6 h-px bg-gray-200"></div>
                    
                    <EmojiDisplay emoji={currentExercise.emoji} />

                    {renderExercise()}

                    {currentExercise.hint && (
                        <div className="mt-6">
                            <button onClick={() => setShowHint(!showHint)} className="flex items-center text-sm font-semibold text-purple-700">
                                <LightbulbIcon className="w-4 h-4 mr-1" /> {showHint ? 'Ocultar pista' : 'Ver pista'}
                            </button>
                            {showHint && <p className="mt-2 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg">{currentExercise.hint}</p>}
                        </div>
                    )}

                </Card>

                <footer className="flex justify-between items-center mt-6">
                    <button onClick={handlePrev} disabled={currentIndex === 0} className="p-3 rounded-full bg-white text-gray-800 shadow-md hover:bg-gray-100 hover:text-purple-800 disabled:opacity-50 disabled:cursor-not-allowed">
                        <ArrowLeftIcon />
                    </button>
                     <button onClick={handleNext} disabled={currentIndex === totalExercises - 1 || currentExercise.type === ExerciseType.Info}
                        className="font-bold py-3 px-8 rounded-xl shadow-md transition-transform transform hover:scale-105 bg-purple-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Siguiente <ArrowRightIcon className="inline"/>
                    </button>
                </footer>
            </div>
        </div>
    );
};

const HomeScreen = () => {
    const { setScreen } = useContext(AppContext);
    return (
        <div className="p-6 md:p-10 text-center">
            <h2 className="text-lg text-purple-700 font-semibold mb-6">¡Aprende jugando y diviértete!</h2>
            <Card className="max-w-2xl mx-auto mb-10 text-left">
                <h1 className="text-3xl font-extrabold text-purple-900 mb-2">¡BIENVENIDO A TU AVENTURA DE APRENDIZAJE! ✨</h1>
                <p className="text-gray-700 mb-6">Completa ejercicios divertidos, gana estrellas y sigue tu progreso</p>
                <div className="flex space-x-4">
                    <div className="flex-1 text-center p-3 bg-orange-100 text-orange-800 font-semibold rounded-lg flex items-center justify-center">
                        <StarIcon className="w-5 h-5 mr-2"/> Gana estrellas
                    </div>
                     <div className="flex-1 text-center p-3 bg-green-100 text-green-800 font-semibold rounded-lg flex items-center justify-center">
                        <TrophyIcon className="w-5 h-5 mr-2" /> Sigue tu progreso
                    </div>
                </div>
            </Card>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Selecciona tu grado</h3>
            <Card onClick={() => setScreen(Screen.Trimester)} className="max-w-2xl mx-auto text-left hover:ring-2 hover:ring-purple-400 transition">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="text-2xl font-bold text-purple-900">Tercero de Primaria</h4>
                        <p className="text-gray-700">Exámenes trimestrales disponibles</p>
                        <div className="flex space-x-2 mt-4">
                            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Lengua</span>
                            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Matemáticas</span>
                            <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">Ciencias</span>
                            <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">English</span>
                        </div>
                    </div>
                    <GraduationCapIcon className="w-16 h-16 text-purple-200" />
                </div>
            </Card>
        </div>
    );
};

const TrimesterScreen = () => {
    const { setScreen } = useContext(AppContext);
    return (
        <div className="p-6 md:p-10">
            <button onClick={() => setScreen(Screen.Home)} className="flex items-center text-purple-700 hover:text-purple-900 font-semibold mb-6">
                <ArrowLeftIcon className="w-5 h-5 mr-1" /> Volver a inicio
            </button>
            <div className="text-center mb-8">
                 <h1 className="text-4xl font-extrabold text-purple-900">Tercero de Primaria</h1>
                 <p className="text-gray-700 text-lg">Selecciona el trimestre para comenzar</p>
            </div>
            <div className="max-w-2xl mx-auto space-y-4">
                <Card onClick={() => setScreen(Screen.Exam)} className="hover:ring-2 hover:ring-purple-400 transition flex items-start space-x-6">
                    <div className="bg-purple-600 text-white w-12 h-12 flex items-center justify-center rounded-lg font-bold text-2xl">1</div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Primer Trimestre</h2>
                        <p className="text-gray-700">5 exámenes disponibles</p>
                        <p className="mt-2 text-green-700 bg-green-100 px-2 py-0.5 rounded-full inline-block text-sm font-semibold">✓ Disponible</p>
                    </div>
                </Card>
                 <Card className="flex items-start space-x-6 bg-gray-100 text-gray-600">
                    <div className="bg-gray-300 text-white w-12 h-12 flex items-center justify-center rounded-lg font-bold text-2xl">2</div>
                    <div>
                        <h2 className="text-xl font-bold">Segundo Trimestre</h2>
                        <p>Próximamente</p>
                        <p className="mt-2 flex items-center text-sm"><LockIcon className="w-4 h-4 mr-1"/> Bloqueado</p>
                    </div>
                </Card>
                 <Card className="flex items-start space-x-6 bg-gray-100 text-gray-600">
                    <div className="bg-gray-300 text-white w-12 h-12 flex items-center justify-center rounded-lg font-bold text-2xl">3</div>
                    <div>
                        <h2 className="text-xl font-bold">Tercer Trimestre</h2>
                        <p>Próximamente</p>
                        <p className="mt-2 flex items-center text-sm"><LockIcon className="w-4 h-4 mr-1"/> Bloqueado</p>
                    </div>
                </Card>
            </div>
        </div>
    )
};

const ExamScreen = () => {
    const { setScreen } = useContext(AppContext);
    const exams = [
        { title: "Examen de Lengua", subject: "Trayecto 1: Mitos y leyendas", progress: 0, locked: false, tag: "SPA", icon: <BookIcon /> },
        { title: "Phonology (Phonics and vocabulary)", subject: "Blocked", progress: 0, locked: true, tag: "ENG", icon: <BookIcon /> },
        { title: "Matemáticas", subject: "Blocked", progress: 0, locked: true, tag: "SPA", icon: <BookIcon /> },
    ];
    return (
        <div className="p-6 md:p-10">
            <button onClick={() => setScreen(Screen.Trimester)} className="flex items-center text-purple-700 hover:text-purple-900 font-semibold mb-6">
                <ArrowLeftIcon className="w-5 h-5 mr-1" /> Volver al grado
            </button>
            <div className="text-center mb-8">
                 <h1 className="text-4xl font-extrabold text-purple-900">Exámenes Trimestrales</h1>
                 <p className="text-gray-700 text-lg">Primer Trimestre - Selecciona un examen</p>
            </div>
            <div className="max-w-2xl mx-auto space-y-4">
                {exams.map((exam, i) => (
                    <Card key={i} onClick={() => !exam.locked && setScreen(Screen.Trajectory)}
                        className={`${exam.locked ? 'bg-gray-100 text-gray-600' : 'hover:ring-2 hover:ring-purple-400 transition'}`}>
                        <div className="flex items-center">
                            <div className={`p-3 rounded-lg mr-4 ${exam.locked ? 'bg-gray-300' : 'bg-purple-100 text-purple-700'}`}>{exam.icon}</div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-baseline">
                                    <h2 className={`text-xl font-bold ${exam.locked ? '' : 'text-gray-900'}`}>{exam.title}</h2>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${exam.locked ? 'bg-gray-300' : 'bg-purple-100 text-purple-800'}`}>{exam.tag}</span>
                                </div>
                                <p className="text-sm">{exam.locked ? <span className="flex items-center"><LockIcon className="w-3 h-3 mr-1"/> Bloqueado</span> : exam.subject}</p>
                                {!exam.locked && <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className="bg-green-500 h-1.5 rounded-full" style={{width: `${exam.progress}%`}}></div></div>}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default function App() {
    const [screen, setScreen] = useState(Screen.Home);
    const [userProgress, setUserProgress] = useState({ stars: 0, completedExercises: {} });

    const completeExercise = useCallback((exerciseId) => {
        setUserProgress(prev => {
            if (prev.completedExercises[exerciseId]) return prev;
            return {
                stars: prev.stars + 3,
                completedExercises: { ...prev.completedExercises, [exerciseId]: true }
            }
        });
    }, []);

    const contextValue = useMemo(() => ({ setScreen, userProgress, completeExercise }), [userProgress, completeExercise]);

    const renderScreen = () => {
        switch (screen) {
            case Screen.Home: return <HomeScreen />;
            case Screen.Trimester: return <TrimesterScreen />;
            case Screen.Exam: return <ExamScreen />;
            case Screen.Trajectory: return <TrajectoryScreen />;
            default: return <HomeScreen />;
        }
    }

    return (
        <AppContext.Provider value={contextValue}>
            <main className="bg-gray-50 min-h-screen text-gray-900">
                {renderScreen()}
            </main>
        </AppContext.Provider>
    );
}