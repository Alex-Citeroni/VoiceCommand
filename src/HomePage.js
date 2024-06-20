import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { LogContext } from './LogContext';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faQuestionCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const prima = [
    "Impostare il frequenza di comunicazione Radio1 su 1295",
    "Impostare il frequenza di comunicazione VHF1 a 13375",
    "Impostare il frequenza di comunicazione Radio2 su 12110",
    "Impostare il frequenza di comunicazione VHF2 a 140000"
];

const secondo = [
    "Inverti canale di comunicazione (attiva/stdby)",
    "Inverti le frequenze radio (attiva/stdby)"
];

const terzo = [
    "Imposta il codice transponder a 7700",
    "Imposta il codice transponder a 5698"
];

const quarto = [
    "Imposta la tua altitudine barometrica a 6600",
    "Aumenta la tua altitudine barometrica",
    "Imposta l'altitudine barometrica del copilota a 8080",
    "Diminuisci l'altitudine barometrica del copilota"
];

const quinto = [
    "Visualizza Applicazione FLIGHT PLAN su display pilota",
    "Visualizza Applicazione RFI sul display principale del copilota",
    "Visualizza Applicazione DIGITAL MAP su display centrale",
    "Visualizza Layout Default 'PIPPO' su display centrale",
];

const sesto = [
    "Visualizza TCAS in overlay sul piano di volo",
    "Abilita RDR in overlay sul piano di volo",
    "Disabilita DMAP sovraimpresso sul piano il volo",
    "Mostra TCAS sovrimpresso al piano di volo"
];

const settimo = [
    "Aumenta la scala della mappa sul display principale pilota",
    "Rimpicciolisci la mappa su display principale copilota",
    "Ingrandisci la mappa sul display centrale",
    "Diminuisci la mappa sul display centrale"
];

const ottavo = [
    "Aumenta scala radar",
    "Riduci range del radar",
    "Imposta range del radar a 100 Nm",
    "Imposta range del radar a 5"
];

const nono = [
    "Visualizza lista degli USER WAYPOINT presenti in NAV Database"
];

const decimo = [
    "Inserisci un waypoint definito da te",
    "Apri pagina di setting per un nuovo USER WAYPOINT"
];

const delayOptions = [0, 200, 400, 600, 800];
const randomDelay = () => delayOptions[Math.floor(Math.random() * delayOptions.length)];

function getRandomPhrases() {
    const getRandomFromList = (list, maxCount) => {
        const shuffled = list.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, maxCount);
    };

    const phrases = [
        ...getRandomFromList(prima, 2),
        ...getRandomFromList(secondo, 2),
        ...getRandomFromList(terzo, 2),
        ...getRandomFromList(quarto, 2),
        ...getRandomFromList(quinto, 2),
        ...getRandomFromList(sesto, 2),
        ...getRandomFromList(settimo, 2),
        ...getRandomFromList(ottavo, 2),
        ...getRandomFromList(nono, 1),
        ...getRandomFromList(decimo, 2),
    ].sort(() => 0.5 - Math.random());

    return phrases.slice(0, 20);
}

function HomePage() {
    const [correct, setCorrect] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [doubt, setDoubt] = useState(false);
    const rPressedTimeRef = useRef(null);
    const [delay, setDelay] = useState(randomDelay());
    const [currentKey, setCurrentKey] = useState(null);
    const { setIsRPressed, logs, setLogs } = useContext(LogContext);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [phrases, setPhrases] = useState(getRandomPhrases());

    const handleKeyDown = useCallback((event) => {
        if (currentKey !== null) return; // Ignora se un altro tasto è già premuto

        if (!rPressedTimeRef.current) {
            setCurrentKey(event.key);
            rPressedTimeRef.current = Date.now();
            setIsRPressed(true);
            localStorage.setItem('isRPressed', true);
            setDelay(randomDelay());
        }
    }, [setIsRPressed, currentKey]);

    const handleKeyUp = useCallback((event) => {
        const releaseTime = Date.now();
        const pressDuration = (releaseTime - rPressedTimeRef.current) / 1000;

        setIsRPressed(false);
        localStorage.setItem('isRPressed', false);
        setCurrentKey(null);

        const formatDate = (date) => {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
            return `${hours}:${minutes}:${seconds}.${milliseconds}`;
        };

        const pressedTime = new Date(rPressedTimeRef.current);
        const releasedTime = new Date(releaseTime);

        const logEntry = `Date: ${pressedTime.toLocaleDateString()}, Key: ${event.key}, Pressed: ${formatDate(pressedTime)}, Released: ${formatDate(releasedTime)}, Duration: ${pressDuration.toFixed(2)} seconds, Delay: ${delay}ms\n`;
        const newLogs = [logEntry, ...logs];
        setLogs(newLogs);
        localStorage.setItem('logs', JSON.stringify(newLogs));

        rPressedTimeRef.current = null;

    }, [logs, setIsRPressed, setLogs, delay]);

    const handleMouseDown = useCallback((event) => {
        if (event.target.tagName === 'BUTTON') {
            return;
        }

        if (correct || doubt || wrong) {
            setCorrect(false);
            setDoubt(false);
            setWrong(false);
            return;
        }

        if (event.button === 0) {
            setCorrect(false);
            setDoubt(false);
            setWrong(false);
            // Tasto sinistro del mouse
            if (phraseIndex < 19) {
                setPhraseIndex(phraseIndex + 1);
            } else {
                setPhraseIndex(0);
                setPhrases(getRandomPhrases());
            }
        } else if (event.button === 2) {
            // Tasto destro del mouse
            const responses = ["correct", "doubt", "wrong"];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const randomDelayTime = randomDelay();

            setTimeout(() => {
                setCorrect(randomResponse === "correct");
                setDoubt(randomResponse === "doubt");
                setWrong(randomResponse === "wrong");
            }, randomDelayTime);
        }
    }, [phraseIndex, correct, doubt, wrong]);


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('mousedown', handleMouseDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('mousedown', handleMouseDown);
        };
    }, [handleKeyDown, handleKeyUp, handleMouseDown]);

    return (
        <div className="App" onContextMenu={(e) => e.preventDefault()}>
            <header className="App-header">
                {correct && (
                    <div className="alert positive">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        <p>Sto eseguendo</p>
                    </div>
                )}
                {doubt && (
                    <div className="alert doubt">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        <p>Chiedo Conferma</p>
                    </div>
                )}
                {wrong && (
                    <div className="alert negative">
                        <FontAwesomeIcon icon={faQuestionCircle} />
                        <p>Non ho capito</p>
                    </div>
                )}
            </header>
            <div className="phrase-display">
                <p>{phraseIndex < phrases.length ? phrases[phraseIndex] : "I COMANDI SONO FINITI"}</p>
            </div>
        </div>
    );
}

export default HomePage;
