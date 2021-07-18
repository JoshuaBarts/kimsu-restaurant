$(document).ready(function() {

    /* Hide questions */
    $("#q1").hide();
    $("#q2").hide();
    $("#q3").hide();
    $("#q4").hide();
    $("#buy").hide();
    $(".hr").hide();
    $("#special").hide();
    $("#view").hide();
    $("#deal").hide();

    var money = []; //store price data
    var item = []; //store item data

    /* Show quiz if user wants to take the quiz */
    $("#takeQuiz").click(function() {
        $("#q1").fadeIn("slow");
        $("#takeQuiz").hide();
        $("#welcome").hide();
    });


    $("#submit-form").click(function(event) {
        //get the value of city
        var city = $("#selection option:selected").val();
        console.log(city);
        
        //if user did not select anything, do an alert
        if (city == "nothing") {
            alert("Please select a city.");
        }
        else if (city == "no_value") {
          //if user does not live in Victoria and wants to enter his/her own city
          $("#q1").hide();
          $("#special").fadeIn("slow");
          
          $("#special_button").click(function(event) {
            //get user's city value
            var s_city = document.getElementById("special_city").value;
            console.log(s_city)
            
            if (s_city == "" || !isNaN(s_city)) {
              alert("Please enter a city.");
            }
            else {
              //get data from openweather api
              specialWeather(event);
              $("#special").hide();
              $("#q2").fadeIn("slow");
            }
          }); 
        }
        else {
            //if user selects city from list, continue to question 2
            $("#q1").hide();
            $("#q2").fadeIn("slow");
            searchWeather(event);
        }
    }); //end submit-form function

    /* function to request current weather information from the list of cities */
    function searchWeather(event) {
      var request;
      event.preventDefault();
      request = $.ajax({
        type: "GET",
        url: 'https://api.openweathermap.org/data/2.5/weather?',
        data: {
          q: $("#selection option:selected").val(),
          appid: '8711bc88385b2a5e816ab7e60b689176',
          units : 'metric',
          sys: 'CA',
          timezone: '1000'
        }
      });
      request.done(function(response){
        takeQuiz(response)
      }).fail(function() {
        alert("Not available");
      })
    }; //end searchWeather function

    /*** TEST API TO GET DIFFERENT RESULT BY TYPING YOUR OWN CITY ***/
    /* function to request current weather informatin of user's own city */
    function specialWeather(event) {
      var request;
      event.preventDefault();
      request = $.ajax({
        type: "GET",
        url: 'https://api.openweathermap.org/data/2.5/weather?',
        data: {
          q: $("#special_city").val(),
          appid: '8711bc88385b2a5e816ab7e60b689176',
          units : 'metric',
          sys: 'CA',
          timezone: '1000'
        }
      });
      request.done(function(response){
        takeQuiz(response)
      }).fail(function() {
        //alert user if entered a wrong information or cannot get response
        alert("Sorry, our service is not available in that city.");
        //refreshes page
        location.reload();
      })
    }; //end specialWeather function

    function showTime() {
      $("#time").text(new Date().toLocaleTimeString());
    } //shows current time
    
    /* function for taking the quiz and gathers all information from user */
    function takeQuiz(city) {

      var city_name = city.name;
      var city_weather = city.weather[0].main;
      var weather_desc = city_weather + "(" + city.weather[0].description + ")";
      var city_temp = city.main.temp;
      var temp = city_temp + " °C";
      var sys_country = city.sys.country;
      var timezone = city.timezone;
      var date = new Date();

      /* variables for videos */
      var cloudy = 'video/clear.mp4';
      var snowy = 'video/snow.mp4';
      var thunderstorm = 'video/thunderstorm.mp4';
      var rain = 'video/rain.mp4';
      var fair = 'video/fair.mp4';

      console.log(city_weather);
      console.log(city_temp);  
      console.log(sys_country);
      console.log(timezone);
      /* adds information to weather-card */
      $("#view").fadeIn("slow");
      $("#city-name").text(city_name);
      $("#weather-info").text(weather_desc);
      $("#temp").text(temp);
      $("#date").text(date.toDateString());
      showTime();
      window.setInterval(showTime, 1000);

      //a function to load video
      function load() {
        $("video")[0].load();
      }

      
      /* adds background image and video to weather-card depending on current weather from api */
      if (city_weather == "Snow") {
        $(".card-weather").attr('background-image', 'url(images/snowy.jpg)');
        $("video source#video-source").attr('src', snowy);
        load();
      }
      else if (city_weather == 'Clouds') {
        $(".card-weather").css('background-image', 'url(images/clouds.jpg)');
        $("video source#video-source").attr('src', cloudy);
        load();
      }
      else if (city_weather == 'Clear') {
        $(".card-weather").css('background-image', 'url(images/clear.jpg)');
        $("video source#video-source").attr('src', cloudy);
        load();
      }
      else if (city_weather == 'Thunderstorm') {
        $(".card-weather").css('background-image', 'url(images/thunder.jpg)');
        $("video source#video-source").attr('src', thunderstorm);
        load();
      }
      else if (city_weather == 'Rain' || city_weather == 'Drizzle') {
        $(".card-weather").css('background-image', 'url(images/rain.jpg)');
        $("video source#video-source").attr('src', rain);
        load();
      }
      else {
        $(".card-weather").css('background-image', 'url(images/sunny.jpg)');
        $("video source#video-source").attr('src', fair);
        load();
      }

      //function for breakfast items
      function getBreakfast() {
        document.getElementById("weather").innerHTML = `Today's weather temperature is ${city_temp}°C. We found a recommended breakfast set for you!`;
        setTimeout(flash(), 1000);      
      }

      //function for dinner items
      function getDinner() {
        document.getElementById("weather").innerHTML = `Today's weather temperature is ${city_temp}°C. We found a recommended dinner set for you!`;
        setTimeout(flash(), 1000);      
      }

      //blink for 10 times
      function flash() {
        var blink = 10;
        for (let i = 0; i < blink; i++) {
            $("#deal").delay(500).fadeOut(900);
            $("#deal").fadeIn(900);
        }
      }
      
      /* Functions to Store question answers from user */
      $("input[name=choice]:radio").change(function(){
        var choice = $("input[name=choice]:radio:checked").val();
        console.log(choice);
        $("#q2").hide();
        $("#q3").fadeIn("slow");

        $("input[name=flavor]:radio").change(function() {
          var flavor = $("input[name=flavor]:radio:checked").val();
          $("#q3").hide();
          $("#q4").fadeIn("slow");

          $("input[name=type]:radio").change(function() {
              var type = $("input[name=type]:radio:checked").val();
              $("#q4").hide();
              $("#welcome").hide();

              if (choice == "breakfast" && flavor == "classic" && type == "noodles" && city_temp > 5) {
                $("#set").text("Breakfast Set A Classic");
                getBreakfast();
                $("#items").append(jajjangmyeon);
                $("#items").append(kalguksu);
                $("#items").append(milk);
                $("#items button").css('text-decoration', 'line-through');
                item.push(jajjangmyeon, kalguksu, milk);
                item.join('');
                showOrder();
                var price = 25.99;
                orderTimer(price);
                console.log("price is " + price);
              }
              else if (choice == "breakfast" && flavor == "classic" && type == "noodles" && city_temp < 5) {
                $("#set").text("Breakfast Set B Classic");
                getBreakfast();
                $("#items").append(jajjangmyeon);
                $("#items").append(kalguksu);
                $("#items").append(soju);
                $("#items button").css('text-decoration', 'line-through');
                item.push(jajjangmyeon, kalguksu, soju);
                item.join('');
                showOrder();
                var price = 25.99;
                orderTimer(price);
                console.log("price is " + price);
              }
              else if (choice == "breakfast" && flavor == "classic" && type == "rice" && city_temp > 5) {
                $("#set").text("Breakfast Set C Classic");
                getBreakfast();
                $("#items").append(bibimbap);
                $("#items").append(fried_rice);
                $("#items").append(energy);
                $("#items button").css('text-decoration', 'line-through');
                item.push(bibimbap, fried_rice, energy);
                item.join('');
                showOrder();
                var price = 30;
                orderTimer(price);
                console.log("price is " + price);
              }
              else if (choice == "breakfast" && flavor == "classic" && type == "rice" && city_temp < 5) {
                $("#set").text("Breakfast Set D Classic");
                getBreakfast();
                $("#items").append(tangsuyuk);
                $("#items").append(bibimbap);
                $("#items").append(soju);
                $("#items button").css('text-decoration', 'line-through');
                item.push(tangsuyuk, bibimbap, soju);
                item.join('');
                var price = 33;
                orderTimer(price);
                console.log("price is " + price);
              }
              else if (choice == "breakfast" && flavor == "spicy" && type == "noodles" && city_temp > 5) {
                $("#set").text("Breakfast Set E Spicy");
                getBreakfast();
                $("#items").append(koreanRamen);
                $("#items").append(jjamppong);
                $("#items").append(milk);
                $("#items button").css('text-decoration', 'line-through');
                item.push(koreanRamen, jjamppong, milk);
                item.join('');
                showOrder();
                var price = 27;
                orderTimer(price);
                console.log("price is " + price);
              }
              else if (choice == "breakfast" && flavor == "spicy" && type == "noodles" && city_temp < 5) {
                $("#set").text("Breakfast Set F Spicy");
                getBreakfast();
                $("#items").append(koreanRamen);
                $("#items").append(jjamppong);
                $("#items").append(energy);
                $("#items button").css('text-decoration', 'line-through');
                item.push(koreanRamen, jjamppong, energy);
                item.join('');
                showOrder();
                var price = 29;
                orderTimer(price);
                console.log("price is " + price);
              }
              else if (choice == "breakfast" && flavor == "spicy" && type == "rice" && city_temp > 5) {
                $("#set").text("Breakfast Set G Spicy");
                getBreakfast();
                $("#items").append(spicy_bibimbap);
                $("#items").append(fried_rice);
                $("#items").append(soju);
                $("#items button").css('text-decoration', 'line-through');
                item.push(spicy_bibimbap, fried_rice, soju);
                item.join('');
                showOrder();
                var price = 30;
                orderTimer(price);
                console.log("price is " + price);
              }
              else if (choice == "breakfast" && flavor == "spicy" && type == "rice" && city_temp < 5) {
                $("#set").text("Breakfast Set H Spicy");
                getBreakfast();
                $("#items").append(spicy_bibimbap);
                $("#items").append(fried_rice);
                $("#items").append(milk);
                $("#items button").css('text-decoration', 'line-through');
                item.push(spicy_bibimbap, fried_rice, milk);
                item.join('');
                showOrder();
                var price = 24;
                orderTimer(price);
                console.log("price is " + price);
              }
              else if (choice == "dinner" && flavor == "classic" && type == "rice" && city_temp > 5) {
                $("#set").text("Dinner Set A Classic");
                getDinner();
                $("#items").append(bulgogi);
                $("#items").append(tangsuyuk);
                $("#items").append(soju);
                $("#items button").css('text-decoration', 'line-through');
                item.push(bulgogi, tangsuyuk, soju);
                item.join('');
                showOrder();
                var price = 29;
                orderTimer(price);
                console.log("price is " + price);
              }
              else if (choice == "dinner" && flavor == "classic" && type == "rice" && city_temp < 5) {
                $("#set").text("Dinner Set B Classic");
                getDinner();
                $("#items").append(bulgogi);
                $("#items").append(fried_rice);
                $("#items").append(soju);
                $("#items button").css('text-decoration', 'line-through');
                item.push(bulgogi, fried_rice, soju);
                item.join('');
                showOrder();
                var price = 26;
                orderTimer(price);
                console.log("price is " + price);
              }
              else if (choice == "dinner" && flavor == "classic" && type == "noodles" && city_temp > 5) {
                $("#set").text("Dinner Set C Classic");
                getDinner();
                $("#items").append(jajjangmyeon);
                $("#items").append(kalguksu);
                $("#items").append(energy);
                $("#items button").css('text-decoration', 'line-through');
                item.push(jajjangmyeon, kalguksu, energy);
                item.join('');
                showOrder();
                var price = 28;
                orderTimer(price);
                console.log("price is " + price);
              }
              else if (choice == "dinner" && flavor == "classic" && type == "noodles" && city_temp < 5) {
                $("#set").text("Dinner Set D Classic");
                getDinner();
                $("#items").append(kalguksu);
                $("#items").append(koreanRamen);
                $("#items").append(milk);
                $("#items button").css('text-decoration', 'line-through');
                item.push(kalguksu, koreanRamen, milk);
                item.join('');
                showOrder();
                var price = 27;
                orderTimer(price);
                console.log("price is " + price);
              }
              else if (choice == "dinner" && flavor == "spicy" && type == "rice" && city_temp > 5) {
                $("#set").text("Dinner Set E Spicy");
                getDinner();
                $("#items").append(spicy_bibimbap);
                $("#items").append(fried_rice);
                $("#items").append(soju);
                $("#items button").css('text-decoration', 'line-through');
                item.push(spicy_bibimbap, fried_rice, soju);
                item.join('');
                showOrder();
                var price = 31;
                orderTimer(price);
                console.log("price is " + price);
              }
              else if (choice == "dinner" && flavor == "spicy" && type == "rice" && city_temp < 5) {
                $("#set").text("Dinner Set F Spicy");
                getDinner();
                $("#items").append(spicy_bibimbap);
                $("#items").append(fried_rice);
                $("#items").append(milk);
                $("#items button").css('text-decoration', 'line-through');
                item.push(spicy_bibimbap, fried_rice, milk);
                item.join('');
                showOrder();
                var price = 28;
                orderTimer(price);
                console.log("price is " + price);
              }
              else if (choice == "dinner" && flavor == "spicy" && type == "noodles" && city_temp > 5) {
                $("#set").text("Dinner Set G Spicy");
                getDinner();
                $("#items").append(koreanRamen);
                $("#items").append(jjamppong);
                $("#items").append(energy);
                $("#items button").css('text-decoration', 'line-through');
                item.push(koreanRamen, jjamppong, energy);
                item.join('');
                showOrder();
                var price = 28;
                orderTimer(price);
                console.log("price is " + price);
              }
              else if (choice == "dinner" && flavor == "spicy" && type == "noodles" && city_temp < 5) {
                $("#set").text("Dinner Set H Spicy");
                getDinner();
                $("#items").append(koreanRamen);
                $("#items").append(jjamppong);
                $("#items").append(milk);
                $("#items button").css('text-decoration', 'line-through');
                item.push(koreanRamen, jjamppong, milk);
                item.join('');
                showOrder();
                var price = 29;
                orderTimer(price);
                console.log("price is " + price);
              }
              else {
                $("#items").text("Oops! Sorry nothing recommended at this moment.")
              } 
          }); 
        });
      });
    }; //end takeQuiz

    $("#user").hide();
    $("#thankyou").hide();
    $("#final").hide();

    //show order button
    function showOrder() {
      $("#buy").fadeIn("slow");
      $(".hr").show();
    };
    
    //function for submitting user email
    $("#order-form").submit(function(email) {
      //get user email
      email = $("#email_user").val();
      //var price = 
      //var order = 
      $("#buy").hide();
      $("#weather").hide();
      $("#set").text(`Your order:`);
      $("#set").append(`<hr>`);
      $("#items").append(`<hr>`);
      $("#thankyou").fadeIn("slow");
      $("#items").hide();
      $("#details").hide().fadeIn("slow");
      $("#item-detail button").remove();
      $("#quantity").append(`Quantity: ${item.length}`);
      $("#price").append(`Price: $${money}`);
      $("#item-detail").append(`${item}`);
      $("#final").fadeIn("slow").text(`Thank you for your purchase, ${email}. Have a great day!`);
      
      $(".hr").hide();
    });

    var deal = .50;
    /* function for order timer, if timer reached 0, price will increase, else apply 50% off */
    function orderTimer(price) {
      var newPrice = 10;
      var timeleft = 25;
      $(".progress").hide().fadeIn("slow");
      progress(24, 24, $(".progress"));
      
      timer = setInterval(function(){
        if(timeleft <= 0){
          clearInterval(timer);
          price += newPrice;
          console.log(price);
          $("#message").hide();
          $(".progress").hide();
          document.getElementById("timer").innerHTML = `Sorry. Price went up to $${Math.round(price)}`;
          
        } else {
          document.getElementById("message").innerHTML = `Get it now for only <span style="text-decoration:line-through">$${price}</span><span style="color:red">$${Math.round(price * deal)}!</span>`;
          document.getElementById("timer").innerHTML = timeleft + " seconds remaining";
        }
        timeleft -= 1;
      }, 1000);
      $("#order").click(function() {
        //clears timer if user orders
        clearTimeout(timer);
        $(".progress").hide();
        $("#message").hide();
        $("#timer").hide();
        $("#order").hide();
        $("#user").fadeIn("slow");
        console.log(price);
        if (timeleft > 0) {
          //pushes price information data if user orders within time limit
          money.push(Math.round(price * deal)); 
        }
        else {
          //added price
          money.push(Math.round(price));
        }
      });
    } //end orderTimer function

    //progress bar function
    function progress(timeleft, timetotal, $element) {
      var progressBarWidth = timeleft * $element.width() / timetotal;
      $element.find('#bar').animate({ width: progressBarWidth }, 500);
      if (timeleft > 0) {
          setTimeout(function() {
              progress(timeleft - 1, timetotal, $element);
          }, 1000);
      }
    };

}); //end document ready
