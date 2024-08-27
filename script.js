document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    const restartBtn = document.getElementById("restart-btn");

    // Emojis usados para o jogo
    const emojis = [
        '🐶', '🐶',
        '🐱', '🐱',
        '🐭', '🐭',
        '🐹', '🐹',
        '🐰', '🐰',
        '🦊', '🦊',
        '🐻', '🐻',
        '🐼', '🐼'
    ];

    let selected = [];
    let matchedPairs = 0;

    // Embaralhar os emojis
    function shuffle(array) {
        return array.sort(() => 0.5 - Math.random());
    }

    // Criar a grade de cartas
    function createGrid() {
        const shuffledEmojis = shuffle(emojis);
        shuffledEmojis.forEach((emoji, index) => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.dataset.emoji = emoji;
            gridItem.dataset.index = index;
            gridItem.addEventListener('click', () => flipCard(gridItem));
            grid.appendChild(gridItem);
        });
    }

    // Virar a carta
    function flipCard(gridItem) {
        if (selected.length < 2 && !gridItem.classList.contains('flipped')) {
            gridItem.textContent = gridItem.dataset.emoji;
            gridItem.classList.add('flipped');
            selected.push(gridItem);

            if (selected.length === 2) {
                checkForMatch();
            }
        }
    }

    // Verificar se houve correspondência
    function checkForMatch() {
        const [first, second] = selected;
        if (first.dataset.emoji === second.dataset.emoji) {
            matchedPairs++;
            selected = [];
            if (matchedPairs === emojis.length / 2) {
                setTimeout(() => alert("Parabéns! Você encontrou todos os pares!"), 500);
            }
        } else {
            setTimeout(() => {
                first.textContent = '';
                second.textContent = '';
                first.classList.remove('flipped');
                second.classList.remove('flipped');
                selected = [];
            }, 1000);
        }
    }

    // Reiniciar o jogo
    function resetGame() {
        grid.innerHTML = '';
        matchedPairs = 0;
        selected = [];
        createGrid();
    }

    restartBtn.addEventListener('click', resetGame);

    createGrid();
});