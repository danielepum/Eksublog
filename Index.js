 <script>
    'use strict';

(function() {
    // focus on input when window loads
    var utmeInput = document.querySelector('#utme-input');
    utmeInput.focus();

    // get utme aggregate
    var getUtmeAgg = function getUtmeAgg() {
        // get utme score
        var utmeScore = parseInt(utmeInput.value, 10);
        // calculate utme aggregate
        return parseFloat((utmeScore / 400 * 60));
    };

    // get waec aggregate
    var getWaecAgg = function getWaecAgg() {
        var grades = Array.from(document.querySelectorAll('.waec-grades'));
        return grades.map(function(grade) {
            return parseFloat(grade.value);
        }).reduce(function(grade, sum) {
            grade += sum;
            return grade;
        }, 0);
    };

    // get total aggregate
    var totalAgg = function totalAgg(utme, waec) {
        return parseFloat(utme + waec).toFixed(2);
    };

    // display counting score
    var showScore = function showScore() {
        var innerCircle = document.querySelector('#inner-circle');

        var utme = getUtmeAgg();
        var waec = getWaecAgg();

        var score = totalAgg(utme, waec);
        var i = 0.00;

        var increment = setInterval(function() {
            i += 1.23;
            innerCircle.innerHTML = i.toFixed(2);
            if (i >= score) {
                innerCircle.innerHTML = score;
                clearInterval(increment);
            }
        }, 25);
    };

    (function() {
        // get flipping cards
        var front = document.querySelector('#front');
        var back = document.querySelector('#back');

        // get forms
        var details = document.querySelector('#details');
        var result = document.querySelector('#result');

        // listen for submit events on details form
        details.addEventListener('submit', function(e) {
            e.preventDefault();

            // show result
            front.classList.add('at-back');
            back.classList.remove('at-back');
            result.firstElementChild.focus();
            showScore();
        });

        // listen for submit event on result form
        result.addEventListener('submit', function(e) {
            e.preventDefault();

            details.reset();
            utmeInput.focus();
            back.classList.add('at-back');
            front.classList.remove('at-back');
        });
    })();
})();
  </script>
