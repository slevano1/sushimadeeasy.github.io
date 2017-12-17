$(document).ready(function() {
    var config = {
        apiKey: "AIzaSyCWJm5Ly_1e0_tlqWtBldbEm0JgXEh0A-Y",
        authDomain: "codersbay-bbe5c.firebaseapp.com",
        databaseURL: "https://codersbay-bbe5c.firebaseio.com",
        projectId: "codersbay-bbe5c",
        storageBucket: "codersbay-bbe5c.appspot.com",
        messagingSenderId: "90435835650"
    };
    firebase.initializeApp(config);

    var i = 0;
    var database = firebase.database();
    var date;
    $('#submit').on('click', function() {
        event.preventDefault();
        var name = $('#trainName').val().trim();
        var destination = $('#destination').val().trim();
        date = $('#firstTrain').val().trim();
        var frequency = $('#frequency').val().trim();

        // minAway and nextArrival will be re-evaluated when the page is loaded based on the variables from firebase
        //====================================================================================================
        // if ((moment().format("X"))< (moment(date,'hh:mm').format("X"))) {

        //     var minAway = moment(date,'hh:mm').diff(moment(), "minutes");
        //     nextArrival= moment(date,'hh:mm').format("hh:mm a")
        // } else {
        //     var minAway = frequency - ((moment().diff(moment(date, 'hh:mm'), "minutes"))%frequency);

        //     nextArrival = moment().add(minAway, 'minutes').format("hh:mm a");
        // }
        //====================================================================================================

        $('#trainName').val("");
        $('#destination').val("");
        $('#frequency').val("");
        $('#firstTrain').val("");

        database.ref().push({
            name: name,
            //shortcut to set up the firebase variables if they have same variable names and keys.
            destination,
            date,
            frequency,
        });
    });

    // Initialize Firebase

    database.ref().on('child_added', function(snapshot) {
        console.log(snapshot.val())
            //if the first train time is bigger than the current time
        if ((moment().format("X")) < (moment(snapshot.val().date, 'hh:mm').format("X"))) {
            //minaway is difference from the first train time minus the current time
            minAway = moment(snapshot.val().date, 'hh:mm').diff(moment(), "minutes");
            //nextArrival is of course when the first train time since the current time is less.
            nextArrival = moment(snapshot.val().date, 'hh:mm').format("hh:mm a")

        } else {
            //minaway is frequency - (difference between the current time and the first traintime and the its remainder)
            minAway = snapshot.val().frequency - ((moment().diff(moment(snapshot.val().date, 'hh:mm'), "minutes")) % snapshot.val().frequency);
            //next arrival is the current time + minAway
            nextArrival = moment().add(minAway, 'minutes').format("hh:mm a");
        };

        var a = $('<tr id=' + i + '>');
        a.append("<td>" + snapshot.val().name + "</td>");
        a.append("<td>" + snapshot.val().destination + "</td>");
        a.append("<td>" + snapshot.val().frequency + "</td>");
        a.append("<td>" + nextArrival + "</td>");
        a.append("<td>" + minAway + "</td>");
        a.append("<td>" + snapshot.val().date + "</td>");
        $('.table').append(a)
        i++;
    });

    setInterval(function() {
        window.location.reload(1);
    }, 100000);
});
