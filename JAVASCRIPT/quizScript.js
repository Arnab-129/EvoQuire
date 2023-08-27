attemptButton = document.getElementById('attempt-button')
instructions = document.getElementById('instruct')
quizBg = document.getElementById('quizBg')
quizQuestions = document.getElementById('quiz-questions')
submitBtn = document.getElementById('answer-submit')
options = Array.from(document.getElementById('answers').children)
correctAnsID = 2
selectedIndex = -1
explainedAns = document.getElementById('explanation')

attemptButton.addEventListener("click", ()=>{
    instructions.innerHTML = '';
    quizBg.style.display = 'none';
    attemptButton.style.display = 'none';
    quizQuestions.style.display = 'block';
})

options.forEach(option => 
    option.addEventListener('click', ()=>{
        option.classList.add('selected');
        selectedIndex = options.indexOf(option) ;
        // remove other selections when one is selected
        options.forEach(option => {
            if(options.indexOf(option)!==selectedIndex && option.classList.contains('selected'))
                option.classList.remove('selected');
        })
    })
)

submitBtn.addEventListener('click', ()=>{
    if(selectedIndex === -1){
        console.log('Please select an answer first!');
    }
    else{
        if(selectedIndex === correctAnsID){
            options[selectedIndex].classList.add('correctChoice');
        }
        else{
            options[selectedIndex].classList.add('wrongChoice');
            options[correctAnsID].classList.add('correctChoice');
        }
        explainedAns.style.display = 'block';
    }
})

