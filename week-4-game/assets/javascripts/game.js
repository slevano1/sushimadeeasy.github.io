var playerVar = [];
var enemiesVar = [];
var defenderVar = [];
var playerHp;
var defenderHp;

$(document).ready(function() {
    ///when images are clicked
    $(".image").on('click', function() {
        //This if statement checks to see whether the player character has been choosed or not.
        if (playerVar.length === 0) {
            playerVar.push($(this))
            $(".enemies").html($(".image"));
            $(".yourcharacter").html($(this));

            playerHp = playerVar[0].attr('hp');
            playerAp = playerVar[0].attr('ap');
            playerfixedAp = playerVar[0].attr('ap');
            $(".yourcharacter").find("p").html(playerHp);

            //This statement checks if the player char has been choosed and the defender has not been choosed and also makes sure that player is not picking the player character as enemies.
        } else if (playerVar.length === 1 && defenderVar.length === 0 && playerVar[0].attr('id') !== $(this).attr('id')) {

            $(".defender").html($(this));
            defenderVar.push($(this));
            defenderHp = defenderVar[0].attr('hp');
            defenderCp = defenderVar[0].attr('cp');
            $(".defender").find("p").html(defenderHp);
        }
    });
    //User can only click the button when the defender has been choosed.
    $("#atkbutton").on('click', function() {
        if (defenderVar.length === 1 && playerHp > 0) {
            playerAp = parseInt(playerAp) + parseInt(playerfixedAp)
            console.log(playerAp)
            defenderHp = defenderHp - playerAp;
            $(".defender").find("p").html(defenderHp);
            $('.status').find('h3').html("You attacked " + defenderVar[0].attr('id') + " for " + playerAp + " damage.")
            if (defenderHp <= 0) {
                defenderVar = [];
                $(".defender").html("");
                return alert("You have defeated the enemy. Please select the next defender!");
            }
            playerHp = playerHp - defenderCp;
            $(".yourcharacter").find("p").html(playerHp);


            if (playerHp <= 0) {
                //reset button will show
                $("#resetbutton").show();
                alert("You have lost. Please reset the game and try again");
            }

        }
        $('.status').find('h3').html("You attacked " + defenderVar[0].attr('id') + " for " + playerAp + " damage.<br>" + defenderVar[0].attr('id') + " attacked you back for " + defenderCp + " damage.")


    });
    // this will hide the reset button
    $("#resetbutton")
    //reset button will reload the page on click
    $("#resetbutton").on('click', function() {
        window.location.reload();
    });

});
