document.addEventListener('DOMContentLoaded', () => {
    const question = document.getElementById('question');
    const countryName = document.getElementById('country-name');
    const answerOptions = document.getElementById('answer-options');
    const submitAnswer = document.getElementById('submit-answer');
    const result = document.getElementById('result');
    const scoreDisplay = document.getElementById('score');
    const triesDisplay = document.getElementById('tries');
    const restartGame = document.getElementById('restart-game');

    let correctCapital = '';
    let score = 0;
    let tries = 20;

    function fetchCountries() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                setupGame(data);
            })
            .catch(error => console.error('Error fetching countries:', error));
        }
    }