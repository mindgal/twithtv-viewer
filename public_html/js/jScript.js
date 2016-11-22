var twitchtv_accounts = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "comster404"];

// twitchtv api pass through view site https://wind-bow.hyperdev.space/
var ttv_api = 'https://wind-bow.hyperdev.space/twitch-api/';

twitchtv_accounts.forEach(getData);

function getData(account) {

  var url = ttv_api + 'streams/' + account + '?callback=?';

  $.getJSON(url, function (data) {
    console.log(data);
    JSONController(data, account);
  });
}

function JSONController(data, account) {

  if (data.hasOwnProperty('error')) {
    user_not_found(data, account);
  } else if (data.hasOwnProperty('stream') && data.stream === null) {
    user_not_streaming(account);
  } else {
    user_streaming(data, account);
  }
}

function user_not_found(data, account) {

  var icon = "<img class=\"logo\" src=\"http://www.webhostingreviewjam.com/wp-content/uploads/2013/03/x-icon-none.png\" />";
  var accountName = "<span class=\"account-name\">" + account + "</span>";
  var text = "<div class=\"not-found\">" + icon + accountName + ": " + data.message + "</div>";

  $('#streamers').append(text);
}

function user_streaming(data, account) {
  
  var icon = "<img class=\"logo\" src=\"" + data.stream.channel.logo + "\"/>";
  var accountName = "<span class=\"account-name\">" + account + "</span>";
  var streamURL = data.stream.channel.url;
  var streamTitle = data.stream.channel.status;
  var streamLink = "<a href=\"" + streamURL + "\"" + "target=\"blank\">" + streamTitle + "</a>"; 
  var text = "<div class=\"streaming\">" + icon + accountName + " :" + streamLink + "</div>";
   
  $('#streamers').append(text);
}

function user_not_streaming(account) {
  
  var user_URL = ttv_api + "users/" + account + "?callback=?";
  var accountName = "<span class=\"account-name\">" + account + "</span>";
  
  $.getJSON(user_URL, function(data) {
    
    var icon = "<img class=\"logo\" src=\"" + data.logo + "\"/>";
    var text = "<div class=\"not-streaming\">" + icon + accountName + " : not streaming</div>";
  
    $('#streamers').append(text);
  });  
}