import {
    useState,
    useEffect,
    useRef
} from "react"

function useWordGame() {

    const STARTING_TIME = 10;
    const [text, setText] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
    const [isTimeRunning, setIsTimeRunning] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const textBoxRef = useRef(null);

    function startGame() {
        setIsTimeRunning(true);
        setTimeRemaining(STARTING_TIME);
        setText("");
        textBoxRef.current.disabled = false;
        textBoxRef.current.focus();
    }

    function endGame() {
        setIsTimeRunning(false);
        setWordCount(calculateWordCount(text));
    }

    function handleChange(e) {
        const {
            value
        } = e.target;
        setText(value);
    }

    function calculateWordCount(text) {
        const wordArray = text.trim().split(" ");
        return wordArray.filter((word) => word !== "").length;
    }

    useEffect(() => {
        if (isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining((time) => time - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            endGame();
        }
    }, [timeRemaining, isTimeRunning]);

    return {
        handleChange,
        text,
        isTimeRunning,
        textBoxRef,
        timeRemaining,
        startGame,
        endGame,
        wordCount
    }
}

export default useWordGame