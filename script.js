let daysWorkedPerWeek   = parseFloat(localStorage.getItem('daysPerWeek'))   || 5;
let hoursWorkedPerDay   = parseFloat(localStorage.getItem('hoursPerDay'))   || 8;
let weeksWorkedPerAnnum = parseFloat(localStorage.getItem('weeksPerAnnum')) || 52;

document.getElementById('setting-hoursperday').value = hoursWorkedPerDay;
document.getElementById('setting-daysperweek').value = daysWorkedPerWeek;
document.getElementById('setting-weeksperannum').value = weeksWorkedPerAnnum;

function getHoursPerAnnum() {
    return weeksWorkedPerAnnum * hoursWorkedPerDay * daysWorkedPerWeek;
}




//update hr income to yearly income & vice versa 

document.getElementById('hrincome').addEventListener('input', function() {
    const hrIncome = parseFloat(this.value);
    if (!isNaN(hrIncome) && hrIncome > 0) {
        document.getElementById('yrincome').value = parseFloat((hrIncome * getHoursPerAnnum()).toFixed(2));
    } else {
        document.getElementById('yrincome').value = '';
    }
});

document.getElementById('yrincome').addEventListener('input', function() {
    const yrIncome = parseFloat(this.value);
    if (!isNaN(yrIncome) && yrIncome > 0) {
        document.getElementById('hrincome').value = parseFloat((yrIncome / getHoursPerAnnum()).toFixed(2));
    } else {
        document.getElementById('hrincome').value = '';
    }
});


//update work settings values && recalculate 

document.getElementById('setting-hoursperday').addEventListener('input', function() {
    const i = parseFloat(this.value);
    if (!isNaN(i) && i > 0 && i <= 24) {
        hoursWorkedPerDay = i; 
        localStorage.setItem('hoursPerDay', i);
        recalculate();
    }  
    else if(!isNaN(i) && i > 24){
        document.getElementById('setting-hoursperday').value = 24;
        hoursWorkedPerDay = 24; 
        localStorage.setItem('hoursPerDay', 24);
        recalculate();
    }
})

document.getElementById('setting-daysperweek').addEventListener('input', function() {
    const i = parseFloat(this.value);
    if (!isNaN(i) && i > 0 && i <= 8 ) {
        daysWorkedPerWeek = i; 
        localStorage.setItem('daysPerWeek', i);
        recalculate();
    } 
    else if(!isNaN(i) && i > 7){
        document.getElementById('setting-daysperweek').value = 7;
        daysWorkedPerWeek = 7; 
        localStorage.setItem('daysPerWeek', 7);
        recalculate();
    } 
})

document.getElementById('setting-weeksperannum').addEventListener('input', function() {
    const i = parseFloat(this.value);
    if (!isNaN(i) && i > 0 && i <= 52) {
        weeksWorkedPerAnnum = i; 
        localStorage.setItem('weeksPerAnnum', i);
        recalculate(); 
    }
    else if(!isNaN(i) && i > 52){
        document.getElementById('setting-weeksperannum').value = 52;
        weeksWorkedPerAnnum = 52; 
        localStorage.setItem('weeksPerAnnum', 52);
        recalculate();
    }  
})







//calucalte button 
document.getElementById('calculate-btn').addEventListener('click', function() {
    const hrIncome = parseFloat(document.getElementById('hrincome').value);
    const cost     = parseFloat(document.getElementById('cost').value);

    let valid = true;

    if (isNaN(hrIncome) || hrIncome <= 0) { 
        setError('hrincome', 'Please enter a valid income.'); 
        valid = false; 
    } else {
        clearError('hrincome');
    }

    if (isNaN(cost) || cost <= 0) {
        setError('cost', 'Please enter a valid price.');
        valid = false; 
    } else {
        clearError('cost');
    }

    if (!valid) 
        return;
    recalculate();
});

//calculate numbers then update to resutls 
function recalculate() {
    const hrIncome = parseFloat(document.getElementById('hrincome').value);
    const cost     = parseFloat(document.getElementById('cost').value);
    if (isNaN(hrIncome) || hrIncome <= 0 || isNaN(cost) || cost <= 0) return;

    const hours = cost / hrIncome;
    const days  = hours / hoursWorkedPerDay;
    const weeks = days  / daysWorkedPerWeek;

    document.getElementById('result-hours').textContent = parseFloat(hours.toFixed(1));
    document.getElementById('result-days').textContent  = parseFloat(days.toFixed(1));
    document.getElementById('result-weeks').textContent = parseFloat(weeks.toFixed(2));

    const yearsRow = document.getElementById('years-row');
    if (weeks >= 52) {
        const years = weeks / weeksWorkedPerAnnum;
        document.getElementById('result-years').textContent = parseFloat(years.toFixed(2));
        yearsRow.classList.remove('hidden');
    } else {
        yearsRow.classList.add('hidden');
    }
}





// open close settings pop up menu 
document.getElementById('settings-btn').addEventListener('click', function() {
    document.getElementById('modal-overlay').classList.add('open');
});

document.getElementById('modal-close').addEventListener('click', function() {
    document.getElementById('modal-overlay').classList.remove('open');
});

document.getElementById('modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('open');
    }
});




function setError(inputId, message) {
    document.getElementById(inputId).classList.add('invalid');
    document.getElementById('error-' + inputId).textContent = message;
}
function clearError(inputId){
    document.getElementById(inputId).classList.remove('invalid');
    document.getElementById('error-' + inputId).textContent = '';
}