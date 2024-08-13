document.addEventListener('DOMContentLoaded', () => {
    const questions = document.getElementById('question');
    const countryName = document.getElementById('countries');
    const answers = document.getElementById('answer');
    const submitAnswer = document.getElementById('submit');
    const result = document.getElementById('result');
    const scoreDisplay = document.getElementById('score');
    const triesDisplay = document.getElementById('tries');
    const restartGame = document.getElementById('restart');

    let correctCapital = '';
    let score = 0;
    let tries = 20;

    function fetchCountries() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                gameStart(data);
            })
            .catch(error => console.error('Error fetching countries:', error));
        }
        function gameStart(countries) {
            const randomCountry = Math.floor(Math.random() * countries.length);
            const selectedCountry = countries[randomCountry];
    
            countryName.textContent = selectedCountry.name.common;
            correctCapital = selectedCountry.capital ? selectedCountry.capital[0] : '';
    
            const options = createOptions(countries, correctCapital);
            answers.innerHTML = '';
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                answers.appendChild(optionElement);
            });
    
            answers.value = '';
        }
    
        function createOptions(countries, correctCapital) {
            const options = new Set();
            options.add(correctCapital);
    
            while (options.size < 3) {
                const randomCountry = countries[Math.floor(Math.random() * countries.length)];
                const capital = randomCountry.capital ? randomCountry.capital[0] : '';
                if (capital) {
                    options.add(capital);
                }
            }
    
            return Array.from(options).sort(() => Math.random() - 0.5);
        }
        function checkGameStatus() {
            if (score >= 10) {
                result.textContent = 'You are a winner!';
                result.style.color = 'green';
                endGame();
            } else if (tries <= 0) {
                result.textContent = 'Sorry, but you lost!';
                result.style.color = 'red';
                endGame();
            }
        }
    
        function endGame() {
            submitAnswer.disabled = true;
            answers.disabled = true;
            restartGame.style.display = 'block';
        }
    
        submitAnswer.addEventListener('click', () => {
            const selectedAnswer = answers.value;
            if (selectedAnswer === correctCapital) {
                result.textContent = 'Correct!';
                result.style.color = 'green';
                score++;
            } else {
                result.textContent = `Wrong! The correct answer is ${correctCapital}.`;
                result.style.color = 'red';
                score--;
            }
    
            scoreDisplay.textContent = score;
            tries--;
            triesDisplay.textContent = tries;
    
            checkGameStatus();
    
            if (tries > 0 && score < 10) {
                setTimeout(() => {
                    result.textContent = '';
                    fetchCountries();
                }, 1000);
            }
        });
    
        restartGame.addEventListener('click', () => {
            score = 0;
            tries = 20;
            scoreDisplay.textContent = score;
            triesDisplay.textContent = tries;
            result.textContent = '';
            submitAnswer.disabled = false;
            answers.disabled = false;
            restartGame.style.display = 'none';
            fetchCountries();
        });
    
        fetchCountries();
    });
    