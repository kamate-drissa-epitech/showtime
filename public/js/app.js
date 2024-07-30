const error = document.querySelector('.error');
const success = document.querySelector('.success');

setTimeout(function () {
  error.style.display = 'none';
}, 2000); 

setTimeout(function () {
    success.style.display = 'none';
  }, 2000); 

const pdf = new jsPDF()

console.log('hello');
console.log(pdf);
