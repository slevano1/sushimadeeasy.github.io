$(document).ready(function() {
    function restartdata() {
        $.ajax({
            url: 'https://opentdb.com/api.php?amount=10',
            method: 'GET'
        }).done(function(response) {
            console.log(response.results)
            data = response.results
        })
    }
    // var data = [{
    //     question: 'Q1',
    //     answer: 'A1',
    //     choices: ['A1', 'A2', 'A3', 'A4'],
    //     gif: 'https://media.giphy.com/media/925NvGmsdnMha/giphy.gif'
    // }, {
    //     question: 'Q2',
    //     answer: 'A2',
    //     choices: ['A1', 'A2', 'A3', 'A4'],
    //     gif: 'http://media0.giphy.com/media/TDRsDTGG8B8Ag/giphy.gif'
    // }, {
    //     question: 'Q3',
    //     answer: 'A3',
    //     choices: ['A1', 'A2', 'A3', 'A4'],
    //     gif: 'http://media0.giphy.com/media/WNfv2FgdLnsqI/giphy.gif'
    // }, {
    //     question: 'Q4',
    //     answer: 'A4',
    //     choices: ['A1', 'A2', 'A3', 'A4'],
    //     gif: 'http://media1.giphy.com/media/XHu6FjqEMPEwU/giphy.gif'
    // }];
    var q = 0;
    var points = 0;
    var currentAnswer;
    var timer = 30;
    var currentGify
    var list = [];
    $("#restart").hide();
    restartdata();

    function nextQuestion() {
        $("#restart").hide();
        $("#timeHeading").html("Time remaining: " + timer)
        startGame();
        $('.display-3').html("Trivial Trivia");
        $("#answers").html('');
        list = [];
        $('#question').html(data[q].question);
        $('#question').attr('answer', data[q].correct_answer);
        for (var i = 0; i < data[q].incorrect_answers.length; i++) {
            list.push(data[q].incorrect_answers[i])
            console.log(list)
        };
        list.push(data[q].correct_answer);
        list.sort(() => Math.random() * 2 - 1);
        console.log(list)
        for (var i = 0; i < list.length; i++) {
            $("#answers").append(`<li>${list[i]}</li>`)
        }

        currentQuestion = $('#question').html();
        currentAnswer = $('#question').attr('answer');
        console.log(currentAnswer);
        q++;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentAnswer + currentQuestion + "&api_key=dc6zaTOxFJmzC&limit=100";
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            currentGify = response.data[1].images.downsized_medium.url;
        })
        $('li').on('click', function() {

            if (this.innerHTML === currentAnswer) {

                $('.display-3').html(`<img src='${currentGify}' height='210'>`);
                points++;
                $("#question").html("You guessed right");
                $('#answers').html("The answer was " + currentAnswer);
                $("#score").html(points);
                cleartime();
                ended();
                if (q < data.length) {
                    setTimeout(timeout, 4000);
                }


            } else {
                $('#question').html("Wrong answer!!");
                $('#answers').html("The answer was " + currentAnswer);
                $('.display-3').html(`<img src='${currentGify}' height='210'>`);
                cleartime();
                ended();
                if (q < data.length) {
                    setTimeout(timeout, 4000);
                }
            }
        });
    }

    function ended() {
        if (q === data.length) {
            $("#restart").show();
            $('#question').html("GAME OVER");
            $('#answers').html("The answer was " + currentAnswer);
            $("#timeHeading").html("Please restart to play again");
        }
    }

    $('#start').on('click', function() {
        $('#start').hide();
        nextQuestion();
    }); //START button on start
    //------------------------------------------------------------------
    // Timer starts
    function startGame() {
        eachQuestion = setInterval(timeout, 30400); ///35 seconds between the question-30 seconds to solve&5secs to review
        timedecrease = setInterval(decrease, 1000);
    };

    function decrease() {
        timer--;
        $("#timeHeading").html("Time remaining: " + timer);
            // var queryURL = "http://api.giphy.com/v1/gifs/search?q="+currentAnswer+"&api_key=dc6zaTOxFJmzC&limit=100";
            // $.ajax({
            //     url:queryURL,
            //     method:'GET'
            // }).done(function(response){
            //     currentGify=response.data[1].images.downsized_medium.url;
            // })
        if ((timer == 0) && (q === data.length)) {
            cleartime();
            $('.display-3').html(`<img src='${currentGify}' height='210'>`);
            $('#question').html("GAME OVER");
            $('#answers').html("The answer was " + currentAnswer);
            $('#restart').show();
        } else if (timer == 0) {
            cleartime();
            $('#question').html("Time out!!");
            $('#answers').html("The answer was " + currentAnswer);
            $('.display-3').html(`<img src='${currentGify}' height='210'>`);
            setTimeout(timeout, 4000);
        }
    }

    function timeout() {
        timer = 30; //time allowed per question
        $('.display-3').html("Trivial Trivia");
        cleartime();
        nextQuestion();
    }

    function cleartime() {
        clearInterval(eachQuestion);
        clearInterval(timedecrease);
    }

    $("#restart").on('click', function() {
        q = 0;
        points = 0;
        timer = 30;
        restartdata();
        nextQuestion();
    })

});
