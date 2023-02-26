'use strict';

const watch = document.querySelector('#watch');
const startStopBtn = document.querySelector('#start-stop__btn');
const startResetButton = document.querySelector('#submit-reset__btn');
const input = document.querySelector('#input');
const result = document.querySelector('#result');

let ms = 0;
let timer;


const startWatch = () => {
    watch.classList.remove('paused');
    clearInterval(timer);
    timer = setInterval(()=> {
        ms +=10;
        let dateTimer = new Date(ms);
        watch.innerHTML = 
        ('0' + dateTimer.getUTCMinutes()).slice(-2) +':'+
        ('0' + dateTimer.getUTCSeconds()).slice(-2) +':'+
        ('0' + dateTimer.getUTCMilliseconds()).slice(-3,-1);
    }, 10);
};

const stopWatch = () => {
     watch.classList.add('paused');
     clearInterval(timer);
};

const resetWatch = () => {
    watch.classList.remove('paused');
    clearInterval(timer);
    ms = 0;
    watch.innerHTML ='00:00:00';

};

const heartBeatRate = (number) => {
   number *= 6;
   result.textContent = `${number} bpm`;

}

document.addEventListener('click', e => {
    const targetEl =e.target;
    if(targetEl.closest('.start-button')){
       startWatch();
       startStopBtn.classList.add('stop-button');
       startStopBtn.classList.remove('start-button');
       startStopBtn.textContent = 'stop';
      
        

    } else if (targetEl.closest('.stop-button')) {
        stopWatch();
        startStopBtn.classList.add('start-button');
        startStopBtn.classList.remove('stop-button');
        startStopBtn.textContent = 'start';
    } 
    if(targetEl.closest('.reset-button')) {
        resetWatch();
        startStopBtn.classList.add('start-button');
        startStopBtn.classList.remove('stop-button');
        startStopBtn.textContent = 'start';
    }

    if(targetEl.closest('#submit-reset__btn') && !targetEl.closest('._reset') ) {
         let rate  = input.value; 
         if(!rate)  return input.placeholder = 'Enter number';    
         startResetButton.classList.add('_reset');
         startResetButton.textContent = 'reset';
         input.classList.toggle('_active');
         result.classList.toggle('_active');
         heartBeatRate(rate);
         if(rate)  input.placeholder = ''; 
        
    } else if(targetEl.closest('._reset')) {
        startResetButton.classList.remove('_reset');
        startResetButton.textContent = 'submit';
        input.classList.toggle('_active');
        result.classList.toggle('_active');
        input.value = '';
        
       
    }

});


