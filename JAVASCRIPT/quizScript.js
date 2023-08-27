attemptButton = document.getElementById('attempt-button')
instructions = document.getElementById('instruct')
quizBg = document.getElementById('quizBg')

attemptButton.addEventListener("click", ()=>{
    instructions.innerHTML = '';
    quizBg.style.display = 'none';
    attemptButton.style.display = 'none';
})
