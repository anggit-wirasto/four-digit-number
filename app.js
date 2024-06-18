document.addEventListener('DOMContentLoaded', () => {
    let uniqueNumber = generateUniqueDigitNumber();
    let attempt = 1;

    const form = document.getElementById('guess-form');
    const userInput = document.getElementById('user-input');
    const gameInfo = document.getElementById('game-info');
    const resultTableBody = document.querySelector('#result tbody');
    const exitBtn = document.getElementById('exit-btn');
    const numberButtons = document.querySelectorAll('.number-buttons button');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const input = userInput.value;

        const [isValid, message] = checkUniqueDigits(input);
        if (!isValid) {
            gameInfo.classList.replace('alert-info', 'alert-danger');
            gameInfo.innerText = message;
        } else {
            gameInfo.classList.replace('alert-danger', 'alert-info');
            gameInfo.innerText = "Input diterima: " + input;

            const [cp, cdwp, wd] = compareNumbers(uniqueNumber, input);

            const newRow = `
                <tr>
                    <td>${attempt}</td>
                    <td>${input}</td>
                    <td>${cp}</td>
                    <td>${cdwp}</td>
                </tr>
            `;
            resultTableBody.insertAdjacentHTML('afterbegin', newRow);

            if (cp === 4) {
                showSuccessMessage(input, attempt);
            } else {
                attempt++;
            }

            // Kosongkan input setelah submit
            userInput.value = '';
        }
    });

    exitBtn.addEventListener('click', function() {
        alert(`Wah payah, menyerah nih? Jawaban yang benar adalah ${uniqueNumber}`);
        location.reload();
    });

    numberButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-outline-secondary')) {
                this.classList.remove('btn-outline-secondary');
                this.classList.add('btn-success');
            } else if (this.classList.contains('btn-success')) {
                this.classList.remove('btn-success');
                this.classList.add('btn-danger');
            } else {
                this.classList.remove('btn-danger');
                this.classList.add('btn-outline-secondary');
            }
        });
    });

    function generateUniqueDigitNumber() {
        const digits = Array.from({ length: 9 }, (_, i) => i + 1);
        shuffleArray(digits);
        return digits.slice(0, 4).join('');
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function checkUniqueDigits(number) {
        if (number.length !== 4) {
            return [false, "Input harus terdiri dari 4 digit angka."];
        }
        if (!/^\d+$/.test(number)) {
            return [false, "Input harus berupa angka."];
        }
        if (new Set(number).size !== 4) {
            return [false, "Setiap digit harus unik dan tidak boleh berulang."];
        }
        return [true, "Input valid."];
    }

    function compareNumbers(uniqueNumber, userInput) {
        let correctPosition = 0;
        let correctDigitWrongPosition = 0;
        let wrongDigit = 0;

        for (let i = 0; i < 4; i++) {
            if (userInput[i] === uniqueNumber[i]) {
                correctPosition += 1;
            } else if (uniqueNumber.includes(userInput[i])) {
                correctDigitWrongPosition += 1;
            } else {
                wrongDigit += 1;
            }
        }

        return [correctPosition, correctDigitWrongPosition, wrongDigit];
    }

    function showSuccessMessage(input, attempt) {
        form.innerHTML = `
            <div class="result-div">Anda benar! Percobaan ke-${attempt}: ${input}</div>
            <button type="button" id="restart-btn" class="btn btn-success btn-block">Mulai Game Baru</button>
        `;

        document.getElementById('restart-btn').addEventListener('click', function() {
            location.reload();
        });
    }
});
