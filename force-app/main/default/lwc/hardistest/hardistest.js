import { LightningElement } from 'lwc';

export default class Hardistest extends LightningElement {
    minNumber = 1;
    maxNumber = 100;
    targetNumber = 0;
    userGuess = '';
    attempts = 0;
    gameStarted = false;
    gameWon = false;
    feedbackMessage = '';
    feedbackClass = '';

    get isSubmitDisabled() {
        return !this.gameStarted || !this.userGuess || this.gameWon;
    }

    get isInputDisabled() {
        return !this.gameStarted || this.gameWon;
    }

    connectedCallback() {
        // Initialize game when component loads
        this.startNewGame();
    }

    startNewGame() {
        // Generate random number between minNumber and maxNumber
        this.targetNumber = Math.floor(Math.random() * (this.maxNumber - this.minNumber + 1)) + this.minNumber;
        this.userGuess = '';
        this.attempts = 0;
        this.gameStarted = true;
        this.gameWon = false;
        this.feedbackMessage = '';
        this.feedbackClass = '';
    }

    handleGuessChange(event) {
        this.userGuess = event.target.value;
    }

    handleSubmitGuess() {
        if (!this.userGuess || this.gameWon) {
            return;
        }

        const guess = parseInt(this.userGuess, 10);
        
        // Validate guess is within range
        if (guess < this.minNumber || guess > this.maxNumber) {
            this.feedbackMessage = `Please enter a number between ${this.minNumber} and ${this.maxNumber}`;
            this.feedbackClass = 'slds-text-color_error';
            return;
        }

        this.attempts++;

        // Check if guess is correct
        if (guess === this.targetNumber) {
            this.gameWon = true;
            this.feedbackMessage = '🎉 Congratulations! You guessed it!';
            this.feedbackClass = 'slds-text-color_success';
        } else if (guess < this.targetNumber) {
            this.feedbackMessage = '📈 Too low! Try a higher number.';
            this.feedbackClass = 'slds-text-color_warning';
        } else {
            this.feedbackMessage = '📉 Too high! Try a lower number.';
            this.feedbackClass = 'slds-text-color_warning';
        }
    }
}