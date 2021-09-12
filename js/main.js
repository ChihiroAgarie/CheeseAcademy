'use strict';

{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const result_p = document.getElementById('result_p');
    const result_a = document.getElementById('result_a');
    const scoreLabel = document.querySelector('#result p:first-child');


    var cAudio = new Audio('sounds/Quiz-Correct_Answer01-mp3/Quiz-Correct_Answer01-1.mp3');
    var wAudio = new Audio('sounds/Quiz-Wrong_Buzzer01-mp3/Quiz-Wrong_Buzzer01-1.mp3');
    var pAudio = new Audio('sounds/決定、ボタン押下3.mp3');



    document.getElementById("container").style.visibility = "hidden";

    document.getElementById("clickBtn").onclick = function () {
        document.getElementById("container").style.visibility = "visible";
        pAudio.play();
    };

    const quizSet = [
        { q: '「モッツァレラ」の言葉の由来は？', c: ['引きちぎる', '伸びる', '溶ける', 'つまむ'] },
        { q: 'チーズの生産量が一番多い国は？', c: ['アメリカ', 'ドイツ', 'フランス', 'イタリア'] },
        { q: '世界中にチーズは何種類ある？', c: ['1,000種類', '50種類', '500種類', '100種類'] },
    ];
    let currentNum = 0;
    let isAnswered;
    let score = 0;

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    function checkAnswer(li) {
        if (isAnswered) {
            return;
        }
        isAnswered = true;

        if (li.textContent === quizSet[currentNum].c[0]) {
            li.classList.add('correct');
            cAudio.play();
            score++;
        } else {
            li.classList.add('wrong');
            wAudio.play();
        }

        btn.classList.remove('disabled');
    }

    function setQuiz() {
        isAnswered = false;

        question.textContent = quizSet[currentNum].q;

        while (choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }

        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            });
            choices.appendChild(li);
        });

        if (currentNum === quizSet.length - 1) {
            btn.textContent = '🐭 Done 🐭';
        }
    }

    setQuiz();

    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) {
            return;
        }
        btn.classList.add('disabled');

        if (currentNum === quizSet.length - 1) {
            // console.log(`Score:${score}/${quizSet.length}`);
            scoreLabel.textContent = `Score:${score}/${quizSet.length}`;
            result.classList.remove('hidden');

            if (scoreLabel.textContent === `Score:3/3`) {
                result_p.textContent = '君のチーズ愛はカンペキ❤️';
                result_a.textContent = 'チーズ職人になる';
                result_a.href = "../20210822_f_dev09/index.html"

            } else {
                result_p.textContent = '残念・・・出直してこい！';
                result_a.textContent = 'もう1回クイズする';
                result_a.onclick = function () {
                    document.getElementById("container").style.visibility = "visible";

                };
            }


        } else {
            currentNum++;
            setQuiz();
        }



    });
}
