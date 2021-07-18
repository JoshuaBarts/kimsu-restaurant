$(document).ready(function() {
    $("#order").hide();
    $("#thankyou").hide();
    $(".progress").hide();
    /* Add items on menu */
    $("#menu").append(jajjangmyeon);
    $("#menu").append(koreanRamen);
    $("#menu").append(kalguksu).append(`<hr>`);
    $("#menu").append(bibimbap);
    $("#menu").append(jjamppong);
    $("#menu").append(bulgogi).append(`<hr>`);
    $("#menu").append(fried_rice);
    $("#menu").append(spicy_bibimbap);
    $("#menu").append(tangsuyuk).append(`<hr>`);
    $("#menu").append(soju);
    $("#menu").append(milk);
    $("#menu").append(energy);
    
    var money = [];
    var items = [];
    /* functions when user orders an item */
    $("#tangsuyuk").click(function(){
      $("#welcome").hide();
      $("#menu").hide();
      var price = 6.99;
      orderTimer(price);
      items.push(tangsuyuk);
      $("#item").hide().append(tangsuyuk).fadeIn("slow");
      $(".card").css('margin-left', '16px');
      $("#item").append('<hr>');
      $("#item button").css('text-decoration', 'line-through');
      $("#order").fadeIn("slow");
    });
    $("#spicy_bibimbap").click(function(){
      $("#welcome").hide();
      $("#menu").hide();
      var price = 7.99;
      orderTimer(price);
      items.push(spicy_bibimbap);
      $("#item").hide().append(spicy_bibimbap).fadeIn("slow");
      $(".card").css('margin-left', '16px');
      $("#item").append('<hr>');
      $("#item button").css('text-decoration', 'line-through');
      $("#order").fadeIn("slow");
    });
    $("#fried_rice").click(function(){
      $("#welcome").hide();
      $("#menu").hide();
      var price = 8.99;
      orderTimer(price);
      items.push(fried_rice);
      $("#item").hide().append(fried_rice).fadeIn("slow");
      $(".card").css('margin-left', '16px');
      $("#item").append('<hr>');
      $("#item button").css('text-decoration', 'line-through');
      $("#order").fadeIn("slow");
    });
    $("#bulgogi").click(function(){
      $("#welcome").hide();
      $("#menu").hide();
      var price = 8.99;
      orderTimer(price);
      items.push(bulgogi);
      $("#item").hide().append(bulgogi).fadeIn("slow");
      $(".card").css('margin-left', '16px');
      $("#item").append('<hr>');
      $("#item button").css('text-decoration', 'line-through');
      $("#order").fadeIn("slow");
    });
    $("#jjampong").click(function(){
      $("#welcome").hide();
      $("#menu").hide();
      var price = 6.99;
      orderTimer(price);
      items.push(jjamppong);
      $("#item").hide().append(jjamppong).fadeIn("slow");
      $(".card").css('margin-left', '16px');
      $("#item").append('<hr>');
      $("#item button").css('text-decoration', 'line-through');
      $("#order").fadeIn("slow");
    });
    $("#kalguksu").click(function(){
      $("#welcome").hide();
      $("#menu").hide();
      var price = 6.50;
      orderTimer(price);
      items.push(kalguksu);
      $("#item").hide().append(kalguksu).fadeIn("slow");
      $(".card").css('margin-left', '16px');
      $("#item").append('<hr>');
      $("#item button").css('text-decoration', 'line-through');
      $("#order").fadeIn("slow");
    });
    $("#bibimbap").click(function(){
      $("#welcome").hide();
      $("#menu").hide();
      var price = 8.99;
      orderTimer(price);
      items.push(bibimbap);
      $("#item").hide().append(bibimbap).fadeIn("slow");
      $(".card").css('margin-left', '16px');
      $("#item").append('<hr>');
      $("#item button").css('text-decoration', 'line-through');
      $("#order").fadeIn("slow");
    });
    $("#koreanRamen").click(function(){
      $("#welcome").hide();
      $("#menu").hide();
      var price = 7.99;
      orderTimer(price);
      items.push(koreanRamen);
      $("#item").hide().append(koreanRamen).fadeIn("slow");
      $(".card").css('margin-left', '16px');
      $("#item").append('<hr>');
      $("#item button").css('text-decoration', 'line-through');
      $("#order").fadeIn("slow");
    });
    $("#jajjangmyeon").click(function(){
      $("#welcome").hide();
      $("#menu").hide();
      var price = 6.99;
      orderTimer(price);
      items.push(jajjangmyeon);
      $("#item").hide().append(jajjangmyeon).fadeIn("slow");
      $(".card").css('margin-left', '16px');
      $("#item").append('<hr>');
      $("#item button").css('text-decoration', 'line-through');
      $("#order").fadeIn("slow");
    });
    $("#soju").click(function(){
      $("#welcome").hide();
      $("#menu").hide();
      var price = 5.99;
      orderTimer(price);
      items.push(soju);
      $("#item").hide().append(soju).fadeIn("slow");
      $(".card").css('margin-left', '16px');
      $("#item").append('<hr>');
      $("#item button").css('text-decoration', 'line-through');
      $("#order").fadeIn("slow");
    });
    $("#milk").click(function(){
      $("#welcome").hide();
      $("#menu").hide();
      var price = 5.99;
      orderTimer(price);
      items.push(milk);
      $("#item").hide().append(milk).fadeIn("slow");
      $(".card").css('margin-left', '16px');
      $("#item").append('<hr>');
      $("#item button").css('text-decoration', 'line-through');
      $("#order").fadeIn("slow");
    });
    $("#energy").click(function(){
      $("#welcome").hide();
      $("#menu").hide();
      var price = 5.99;
      orderTimer(price);
      items.push(energy);
      $("#item").hide().append(energy).fadeIn("slow");
      $(".card").css('margin-left', '16px');
      $("#item").append('<hr>');
      $("#item button").css('text-decoration', 'line-through');
      $("#order").fadeIn("slow");
    });

    var deal = .50;
    /* timer when ordering, if reaches 0, increases price, else apply 50% off */
    function orderTimer(price) {
        var newPrice = 10;
        var timeleft = 25;
        $(".progress").fadeIn("slow");
        progress(24, 24, $(".progress"));
        timer = setInterval(function(){
          if (timeleft <= 0) {
            clearInterval(timer);
            price += newPrice;
            console.log(price);
            document.getElementById("price").innerHTML = `Sorry. Price went up to $${Math.round(price)}`;
            $("#price").fadeIn("slow");
            $("#message").hide();
            $("#timer").hide();
          } else {
            $("#price").hide();
            
            document.getElementById("message").innerHTML = `Get it now with 50% off for only <span style="text-decoration:line-through">$${price}</span><span style="color:red">$${Math.round(price * deal)}!</span>`;
            document.getElementById("timer").innerHTML = timeleft + " seconds remaining";
          }
          timeleft -= 1;
        }, 1000);

        $("#order").click(function(value) {
          // clear timer if user orders
            clearTimeout(timer);
            console.log(price);
            $(".progress").hide();
            $("#menu").hide();
            $("#message").hide();
            $("#timer").hide();
            $("#order").hide();
            $("#price").hide();
            $("#user").fadeIn("slow");
            
            if (timeleft > 0) {
              //pushes price information data if user orders within time limit
              money.push(Math.round(price * deal)); 
            }
            else {
              //added price
              money.push(Math.round(price));
            }
            $("#order-form").submit(function() {
                $("#order-form").hide();
                $("#quantity-item").append(`Quantity: ${items.length}`);
                console.log(items)
                $("#item-price").append(`Price: $${money}`);
            });
        });
    } //end orderTimer function

    //progress bar function
    function progress(timeleft, timetotal, $element) {
      var progressBarWidth = timeleft * $element.width() / timetotal;
      $element.find('#bar').animate({ width: progressBarWidth }, 500);
      if(timeleft > 0) {
          setTimeout(function() {
              progress(timeleft - 1, timetotal, $element);
          }, 1000);
      }
    };

}); //end document ready
