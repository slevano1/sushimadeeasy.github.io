$(document).ready(function() {
    //Create an array that contains the default items.
    var arr = ['steve carrel', 'oprah', 'chris tucker', 'dogs', 'lion', 'space', 'sushi', 'bernie sanders', 'bob ross', 'taekwondo', 'muy thai', 'panda', 'squirrel']

    //This start fuction will iterate the array of items and display them as button
    function start() {
        for (var i = 0; i < arr.length; i++) {
            var but = $("<button type='button' class='btn btn-info'>");
            but.html(arr[i]);
            $('#buttonBox').append(but);
        }
    }
    // this will invoke the start function
    start();

    //This will target the class btn and when its clicked it will invoke the gifs function
    $(document).on('click', '.btn', gifs);
    //Whenever the img elements are clicked, clicks function will invoke.
    $(document).on({
        mouseenter: stilloranimate,
        mouseleave: stilloranimate,
    }, "img");
    // This on click method will display user input as button
    $("#add").on('click', function() {
        var name = $('#inputBox').val().trim();
        var but = $("<button type='button' class='btn btn-info'>");
        but.html(name);
        $('#buttonBox').append(but)
    });
    
    //this function checks whether the gifs are still or animate and change the status of gifs
    function stilloranimate() {

        if ($(this).data('status') == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).data('status', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).data('status', 'still');
        }
    }

    //This function will use the button's text value and input them to the ajax to grab JSON and pick the infos we want and display the gifs.
    function gifs() {
        var animal = $(this).html();
        console.log(animal)
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            console.log(response)
            for (var i = 0; i < response.data.length; i++) {
                var divHolder = $('<span>');
                var rating = $('<h4> Rating: ' + response.data[i].rating + '</h4>');
                var imgStill = response.data[i].images.fixed_height_still.url;
                var imgAnimate = response.data[i].images.fixed_height.url;
                var img = $('<img class="rounded">');
                img.attr('src', imgStill);
                img.attr('data-still', imgStill);
                img.attr('data-animate', imgAnimate);
                img.attr('data-status', 'still');
                img.attr;
                divHolder.prepend(rating)
                divHolder.prepend(img)
                $('#imageHolder').prepend(divHolder)
            }


        })
    }

});
