var gifUrls = [];
var GIF_LOAD_RATION = 10;

function getGifs(keyword) {
  var api_key = 'dc6zaTOxFJmzC'; // public beta key
  var base_uri = 'http://api.giphy.com';
  var search_query = '/v1/gifs/search' + '?q=';
  var url = base_uri + search_query + encodeURI(keyword) + '&api_key=' + api_key;
  console.log(url);

  $.getJSON(url, function(data) {
    // console.log(data.data);
    for (var g in data.data) {
      gifUrls.push(data.data[g].images.original.url);
    }
    loadGifs(GIF_LOAD_RATION);
  });
  return true;
}

function loadGifs(howMany) {
  console.log(gifUrls.length, 'gif URLs collected:', gifUrls);
  var $body = $('body');
  for ( var i = 0; i < howMany; i++ ) {
    if ( gifUrls.length === 0 )
      break;
    $body.append('<img src="' + gifUrls.pop() + '">');
  }
}

$('#search').on('submit', function(e) {
  e.preventDefault();
  $('img').remove();

  getGifs( $('#keyword').val() );

});

$(window).scroll( function() {
  if ( $(window).scrollTop() + $(window).height() > $(document).height() - 100 && gifUrls.length > 0 ) {
    console.log('Near bottom of page');
    loadGifs(GIF_LOAD_RATION);
  }
});
