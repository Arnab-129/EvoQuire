attemptButton = document.getElementById('attempt-button');
instructions = document.getElementById('instruct');
quizBg = document.getElementById('quizBg');
quiz = document.getElementById('quiz');
submitBtn = document.getElementById('answer-submit');
options = Array.from(document.getElementById('answers').children);
correctAnsID = 2;
selectedIndex = -1;
explainedAns = document.getElementById('explanation');
nextQnBtn = document.getElementById('next-question');
exitBtn = document.getElementById('exit');
quizDialogBox = document.getElementById('inquiz');
quizDialog = document.getElementById('dialog');
score = 0;

//generate random question ID
let questionsID = [];
while (questionsID.length < 3) {
    let r = Math.floor(Math.random() * 14);
    if (questionsID.indexOf(r) === -1) questionsID.push(r);
}

qnlist = [];
optionA = [];
optionB = [];
optionC = [];
optionD = [];
correctAnsID = [];
explanation = [];
IPCRule = [];
quizIndex = 0;


async function load() {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwcgiHEdPE_p3QH9iO-Tc10cfa7aXPkzt_glau1Zy-y_fKghIU4pItEdM-DGlEJYrXu/exec");

    const allQuestions = await response.json();

    for (let ID of questionsID) {
        for (let question of allQuestions) {
            if (question.ID === ID) {
                qnlist.push(`${question.Question}`);
                optionA.push(`${question.Option_A}`);
                optionB.push(`${question.Option_B}`);
                optionC.push(`${question.Option_C}`);
                optionD.push(`${question.Option_D}`);
                correctAnsID.push(`${question.Correct_Option}`);
                explanation.push(`${question.Additional_Information}`);
                IPCRule.push(`${question.IPC_Rule}`);
            }
        }
    }
}


async function main() {
    await load();

    attemptButton.addEventListener("click", () => {
        if (quizIndex === 0) {
            instructions.classList.add('hidden');
            quizBg.classList.add('hidden');
            attemptButton.classList.add('hidden');
        }
        quiz.classList.remove('hidden');
        (quiz.children[0]).children[0].innerText = 'Q.' + (quizIndex + 1) + ' ' + qnlist[quizIndex];
        dialog.innerText = 'Time for a cool question, do your awesome best!';
        dialog.style.fontWeight = '400'
        quizDialogBox.classList.remove('hidden');
        
        updateOptions();
    })


    options.forEach(option => handleOptionInput(option));

    function handleOptionInput(option) {
        option.addEventListener('click', () => {
            option.classList.add('selected');
            selectedIndex = options.indexOf(option);
            // remove other selections when one is selected
            options.forEach(option => {
                if (options.indexOf(option) !== selectedIndex && option.classList.contains('selected'))
                    option.classList.remove('selected');
            })
        })
    }

    submitBtn.addEventListener('click', () => {
        if (selectedIndex != -1) {
            submitBtn.classList.add('hidden');
            options.forEach(option => option.style.pointerEvents = 'none');
            correctAnsIDParsed = (correctAnsID[quizIndex]).charCodeAt() - 65;
            if (selectedIndex === correctAnsIDParsed) {
                options[selectedIndex].classList.add('correctChoice');
                dialog.innerText = "You've got it spot on—legal brilliance at its best!";
                score ++;
            }
            else {
                options[selectedIndex].classList.add('wrongChoice');
                options[correctAnsIDParsed].classList.add('correctChoice');
                dialog.innerText = "Oh no, looks like it wasn't the correct one. It's okay, learn from your mistakes!";
            }
            details = document.createElement('p');
            details.style.fontSize = '30px';
            details.innerText = explanation[quizIndex] + '\n\n' + IPCRule[quizIndex];
            explainedAns.appendChild(details);
            explainedAns.classList.remove('hidden');
            nextQnBtn.classList.remove('hidden');
            exitBtn.classList.remove('hidden');
        }
    })

    nextQnBtn.addEventListener('click', () => {
        quizIndex++;
        // console.log(quizIndex);
        if(quizIndex >= 3){
            quiz.classList.add('hidden');
            result = document.getElementById('result')
            result.innerText = 'Well done for completing this quiz, we hope you leant a lot! Your score is: ' + score;
            document.querySelector('.resultDiv').classList.remove('hidden');
            quizDialogBox.classList.add('hidden');
            return;
        }  
        submitBtn.classList.remove('hidden');
        options[selectedIndex].classList.remove('wrongChoice', 'selected', 'correctChoice');
        options[correctAnsIDParsed].classList.remove('correctChoice');
        (quiz.children[0]).children[0].innerText = 'Q.' + (quizIndex + 1) + ' ' + qnlist[quizIndex];
        dialog.innerText = 'Time for a cool question, do your awesome best!';
        dialog.style.fontWeight = '400'
        quizDialogBox.classList.remove('hidden');
        updateOptions();
        selectedIndex = -1;
        explainedAns.removeChild(details);
        explainedAns.classList.add('hidden');
        nextQnBtn.classList.add('hidden');
        exitBtn.classList.add('hidden'); 
    })

    exitBtn.addEventListener('click', () => {
        location.href = 'index.html';
    })

    function updateOptions(){
        options[0].innerText = '(A) ' + optionA[quizIndex];
        options[1].innerText = '(B) ' + optionB[quizIndex];
        options[2].innerText = '(C) ' + optionC[quizIndex];
        options[3].innerText = '(D) ' + optionD[quizIndex];
        options.forEach(option => option.style.pointerEvents = 'auto');
    }
}

main();
