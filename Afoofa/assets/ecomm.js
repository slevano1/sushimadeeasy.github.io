 $('#submitText').on('click', function(){
    $('.card-colums').html('');
    // Get input from value entered and submitted on search bar
    var textEntered = $('#enterText').val();
      
    // Construct the request for Walmart
    // Set url variable for Walmart
    var urlWalmart = 'https://cryptic-headland-94862.herokuapp.com/http://api.walmartlabs.com/v1/search?apiKey=bnyxt2x6nya6s3h7fvt52d26&query=' + textEntered;

    // Set url variable for Ebay
    var urlEbay = 'https://cryptic-headland-94862.herokuapp.com/http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=SushantS-canadian-PRD-8132041a0-dac71dfb&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&keywords=' + textEntered + '&paginationInput.entriesPerPage=10&sortOrder=CountryAscending'; 
    // Starts Ajax call to Walmart to pull data
    $.ajax({
    url: urlWalmart
    }).done(function(data) {
    console.log('data', data);
    
    for (i = 0; i < data.items.length; i++) {
            var productURL = data.items[i].productUrl;
            
            var button = ("<button type='button' class='btn btn-info'>Learn more</button>");

            var cardDiv = $("<div class='card'>");
            
            var itemImg = $("<img class='card-img-top'>");
                itemImg.attr('src', data.items[i].largeImage);

            var motherDiv = cardDiv.append(itemImg)

            var reviewpic = "<img src="+data.items[i].customerRatingImage+">";
            var cardBody = $("<div class='card-body'>");
            var title = ("<a id='dataurl' href='" + productURL + "'target=_blank><h4 class='card-title'>" + data.items[i].name + "</h4></a><p class='card-text'>" + reviewpic + "</p><p class='card-text text-danger price'>$" + data.items[i].salePrice + "</p><a id='dataurl' href='" + productURL + "'target=_blank>" + button + "</a>");
            

            var childDiv = cardBody.append(title);

            var finalDiv = motherDiv.append(childDiv);

            $('.card-colums').append(finalDiv);
                
           // var p = $("<p>").text("Price: $" + data.items[i].salePrice);
            
           //  var description = $("<p class='anything'>").text("" + data.items[i].name);

           //  var numbReviews = $("<p class='reviews'>").text("" + data.items[i].numReviews);

           //  var reviewpic = $("<p>").html("<img src="+data.items[i].customerRatingImage+">");

           //  var itemImg = $("<img class='sweet'>");
 
           //  itemImg.attr("src", data.items[i].largeImage);
           //  // Appending the paragraph and image tag to the animalDiv
           //  //if function incase reviews are unidentified
           //  if(data.items[i].numReviews == null){
           //      numbReviews = $("<p>").text("No reviews yet");
           //      reviewpic = $("<p>").text("Be the first to leave a review");
           //  }
           //  //Appending the items on our page
           //  $('#pics').prepend(p);
           //  $('#pics').prepend(numbReviews);
           //  $('#pics').prepend(reviewpic);
           //  $('#pics').prepend(description);
           //  $('#pics').prepend(itemImg);
        }
    })


        // Construct the request for Ebay
        // Starts Ajaxx call to Ebay to pull results
        $.ajax({
            url: urlEbay, 
            success: function(result){
        
        var eBayReturnObj = JSON.parse(result);
        //Select the item from JSON and set it to variable
        var results = eBayReturnObj.findItemsByKeywordsResponse[0].searchResult[0].item || [];

            for (var i = 0; i < results.length; i++) {
                var item = results[0];
                var titleEbay = item.title[0];
                var pic = item.galleryURL[0];
                var viewitem = item.viewItemURL[0];
                var price = item.sellingStatus[0].currentPrice[0].__value__;

                var cardDiv = $("<div class='card'>");

                var button = ("<button type='button' class='btn btn-info'>Learn more</button>");
            
                var itemImg = $("<img class='card-img-top'>");
                    itemImg.attr('src', pic);

                var motherDiv = cardDiv.append(itemImg)

                var cardBody = $("<div class='card-body'>");
                var title = ("<a id='dataurl' href='" + viewitem + "'target=_blank><h4 class='card-title'>" + titleEbay + "</h4></a><p class='card-text text-danger price'>$" + price + "</p><a id='dataurl' href='" + viewitem + "'target=_blank>" + button + "</a>");
                
                var childDiv = cardBody.append(title);

                var finalDiv = motherDiv.append(childDiv);

                

                // var picDiv = $("<div>");
                // var p = $("<p>").text("Price: $" + price); 
                // var description = $("<p class='anything'>").text(title);
                // var itemImg = $("<img>");
                // itemImg.attr("src", pic);
                
                if (null != title && null != viewitem) {
                    //Appending the items on our page
                    $('.card-colums').append(finalDiv);
                    }
                }
            }
        
        })

//         //Select the item from JSON and set it to variable
//         var results = JSON.parse(result).findItemsByKeywordsResponse[0].searchResult[0].item[0];
//         for (var j = 0; j < results.length; j++) {
//           var product     = results[j];
//           var title    = product.title;
//           var pic      = product.galleryURL;
//           var viewitem = product.viewItemURL;
//           var price = product.sellingStatus.currentPrice._value_;

//             var picDiv = $("<div");
//             var p = $("<p class='price'>").text("Price: $" + price); 
//             var description = $("<p class='anything'>").text(title);
//             var itemImg = $("<img>");
//             itemImg.attr("src", pic);

//         if (null != title && null != viewitem) {
//             //Appending the items on our page
//             $('#pics').prepend(p);
//             $('#pics').prepend(description);
//             $('#pics').prepend(itemImg);
//         }
//     }
// }

        // // Construct the request for Ebay
        // // Starts Ajaxx call to Ebay to pull results
        // $.ajax({
        //     url: urlEbay, 
        //     success: function(result){
        
        // //Select the item from JSON and set it to variable
        // var results = JSON.parse(result).findItemsByKeywordsResponse[0].searchResult[0].item[0];
            
        // var html = [];
        
        // for (var j = 0; j < results.length; j++) {
        //   var item     = results[j];
        //   var title    = item.title;
        //   var pic      = item.galleryURL;
        //   var viewitem = item.viewItemURL;
        //   var price = item.sellingStatus.currentPrice._value_;
        //   if (null != title && null != viewitem) {
        //     html.push('<div class="card" style="width: 20rem;">' + '<a href="' + viewitem + '" target="_blank"><img class="card-img-top" src="' + pic + '" alt="Card image cap"></a>' 
        //     + '<div class="card-body"><p class="card-text">' + title + '<br>' + 'Price: $' + price);
        //     html.push('</p></div></div>');
        //     document.getElementById("pics").innerHTML = html.join("");
        //     }
        //   }
        // }              
                
                    //Appending the items on our page
                    // $('#pics').append(p);
                    // $('#pics').prepend(description);
                    // $('#pics').prepend(itemImg);
                   
    // })



   

           return false;

})