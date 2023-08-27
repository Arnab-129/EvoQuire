attemptButton = document.getElementById('attempt-button')
instructions = document.getElementById('instruct')
quizBg = document.getElementById('quizBg')
quizQuestions = document.getElementById('quiz-questions')
submitBtn = document.getElementById('answer-submit')
options = Array.from(document.getElementById('answers').children)


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

