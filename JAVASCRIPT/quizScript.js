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


//generate random question ID
let questionsID = [];
while(questionsID.length < 4){
    let r = Math.floor(Math.random() * 14);
    if(questionsID.indexOf(r) === -1) questionsID.push(r);
}

qnlist = [];
optionA = [];
optionB = [];
optionC = [];
optionD = [];
correctAnsID= [];

async function load(){
     const response = await fetch("https://script.google.com/macros/s/AKfycbwcgiHEdPE_p3QH9iO-Tc10cfa7aXPkzt_glau1Zy-y_fKghIU4pItEdM-DGlEJYrXu/exec");

    const allQuestions = await response.json();

    for(let ID of questionsID){
        for(let question of allQuestions){
            if(question.ID === ID){
                qnlist.push(`${question.Question}`);
                optionA.push(`${question.Option_A}`);
                optionB.push(`${question.Option_B}`);
                optionC.push(`${question.Option_C}`);
                optionD.push(`${question.Option_D}`);
                correctAnsID.push(`${question.Correct_Option}`);
            }
        }
    }
    arr = [qnlist, optionA, optionB, optionC, optionD];
    return arr;
}

quizIndex = 0;

load().then((data) =>{
    console.log(data);
})

attemptButton.addEventListener("click", () => {
    instructions.classList.add('hidden');
    quizBg.classList.add('hidden');
    attemptButton.classList.add('hidden');
    quiz.classList.remove('hidden');
    (quiz.children[0]).children[0].innerText = qnlist[quizIndex];
})


options.forEach(option => handleOptionInput(option));

function handleOptionInput(option){
    option.addEventListener('click', () => {
        option.classList.add('selected');
        selectedIndex = 65 + options.indexOf(option);
        // remove other selections when one is selected
        options.forEach(option => {
            if (options.indexOf(option) !== selectedIndex && option.classList.contains('selected'))
                option.classList.remove('selected');
        })
    })
}

submitBtn.addEventListener('click', () => {
    options.forEach(option => option.style.pointerEvents = 'none');
    if (selectedIndex != -1) {
        if (selectedIndex === correctAnsID) {
            options[selectedIndex].classList.add('correctChoice');
        }
        else {
            options[selectedIndex].classList.add('wrongChoice');
            options[correctAnsID].classList.add('correctChoice');
        }
        explainedAns.classList.remove('hidden');
        nextQnBtn.classList.remove('hidden');
        exitBtn.classList.remove('hidden');
    }
})

