$(document).ready(function(){

		var topics = [	"The Good, the Bad and the Ugly",
						"Alien Movie",
						"The Departed",
						"Whiplash",
						"Demolition Man",
						"The Prestige",
						"Terminator 2",
						"Seven Samurai"];

		function createButtons() {
			for (var i = 0; i < topics.length; i++) {
				var newButtons = $('<button type="button" value="' + topics[i] + '">' + topics[i] + "</button>").addClass("allButtons");
				newButtons.attr({"data-show": topics[i] });
				$("#buttonsDiv").append(newButtons);
			}
		}

		createButtons();
		
		$("#submitButton").on("click", function(event) {
    		event.preventDefault();
			var newUserButton = document.forms["inputForm"]["userInput"].value;
			topics.push(newUserButton);
			$("#buttonsDiv").empty();
			createButtons();
			console.log(newUserButton);
			console.log(topics);
		});

		$(document).on("click", ".allButtons", function(){

			var userChoice = $(this).data("show");
			var userChoiceEncoded = encodeURI(userChoice);
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userChoiceEncoded + "&limit=9&api_key=DvsZx0Y6B4OqmqBdLeTKj4ytKHMxoSPa";

			$.ajax({
				url: queryURL,
				method: "GET"
			}).done(function(response) {

				console.log(response);

				var firstRowTds = $("table").children().eq(1).children("tr").eq(0).children("td");
				firstRowTds.eq(0).html('<img src="'+ response.data[0].images.fixed_height_still.url + '" alt="' + response.data[0].title + '">');
				firstRowTds.eq(1).html('<img src="'+ response.data[1].images.fixed_height_still.url + '" alt="' + response.data[1].title + '">');
				firstRowTds.eq(2).html('<img src="'+ response.data[2].images.fixed_height_still.url + '" alt="' + response.data[2].title + '">');

				var secondRowTds = $("table").children().eq(1).children("tr").eq(1).children("td");
				secondRowTds.eq(0).html("Rated: " + response.data[0].rating);
				secondRowTds.eq(1).html("Rated: " + response.data[1].rating);
				secondRowTds.eq(2).html("Rated: " + response.data[2].rating);

				var thirdRowTds = $("table").children().eq(1).children("tr").eq(2).children("td");
				thirdRowTds.eq(0).html('<img src="'+ response.data[3].images.fixed_height_still.url + '" alt="' + response.data[3].title + '">');
				thirdRowTds.eq(1).html('<img src="'+ response.data[4].images.fixed_height_still.url + '" alt="' + response.data[4].title + '">');
				thirdRowTds.eq(2).html('<img src="'+ response.data[5].images.fixed_height_still.url + '" alt="' + response.data[5].title + '">');

				var fourthRowTds = $("table").children().eq(1).children("tr").eq(3).children("td");

				fourthRowTds.eq(0).html("Rated: " + response.data[3].rating);
				fourthRowTds.eq(1).html("Rated: " + response.data[4].rating);
				fourthRowTds.eq(2).html("Rated: " + response.data[5].rating);

				var fifthRowTds = $("table").children().eq(1).children("tr").eq(4).children("td");
				fifthRowTds.eq(0).html('<img src="'+ response.data[6].images.fixed_height_still.url + '" alt="' + response.data[6].title + '">');
				fifthRowTds.eq(1).html('<img src="'+ response.data[7].images.fixed_height_still.url + '" alt="' + response.data[7].title + '">');
				fifthRowTds.eq(2).html('<img src="'+ response.data[8].images.fixed_height_still.url + '" alt="' + response.data[8].title + '">');

				var sixthRowTds = $("table").children().eq(1).children("tr").eq(5).children("td");
				sixthRowTds.eq(0).html("Rated: " + response.data[6].rating);
				sixthRowTds.eq(1).html("Rated: " + response.data[7].rating);
				sixthRowTds.eq(2).html("Rated: " + response.data[8].rating);
				$("img").addClass("allGiphyImages");

			console.log(userChoice);
			console.log(userChoiceEncoded);
			console.log(queryURL);
			});
		});

		$("body").on("click", ".allGiphyImages", function() {
			var src = $(this).attr("src");
			if($(this).hasClass("play")){
				$(this).attr("src", src.replace(/\.gif/i, "_s.gif"));
				$(this).removeClass("play");
			} else {
				$(this).addClass("play");
				$(this).attr("src", src.replace(/\_s.gif/i, ".gif"));
			}
		});
});