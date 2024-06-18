document.addEventListener('DOMContentLoaded', () => {
    const uniqueNumber = generateUniqueDigitNumber();
    let attempt = 1;
    let correct = false;

    const form = document.getElementById('guess-form');
    const userInput = document.getElementById('user-input');
    const gameInfo = document.getElementById('game-info');
    const resultDiv = document.getElementById('result');
    const exitBtn = document.getElementById('exit-btn');

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

            if (cp === 4) {
                correct = true;
                resultDiv.innerHTML = `<div class="alert alert-success">Anda benar! Setelah percobaan ke-${attempt}</div>`;
            } else {
                resultDiv.innerHTML += `
                    <div class="alert alert-warning">
                        Percobaan ke-${attempt}: ${input}<br>
                        Jumlah angka benar di posisi benar: ${cp}, Jumlah angka benar di posisi salah: ${cdwp}
                    </div>
                `;
                attempt++;
            }
        }
    });

    exitBtn.addEventListener('click', function() {
        alert(`Wah payah, menyerah nih? Jawaban yang benar adalah ${uniqueNumber}`);
        location.reload();
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
});
