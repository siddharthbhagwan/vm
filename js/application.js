$(document).ready(function(){

  if ($("#lightGallery")) {
    $.ajax({
      url: 'http://api.github.com/repos/siddharthbhagwan/vm/contents/images',
      type: 'get',
      context: 'this',
      success: function(response){ 
        parseResponseData(response);
      },
      error: function(jqXHR, textStatus, errorThrown) {}
    });
  }

  function parseResponseData(response) {

    var imageUrls = [];
    response.forEach(function(imageObject) {
      if (imageObject.download_url.indexOf('.jpg') > -1) {
        console.log(imageObject.download_url);
        imageUrls.push(imageObject.download_url);
      }
    }); 

    //TODO: extract image name and use relative path instead of download_url

    displayImages(imageUrls);
    setUpGallery();
    // displayLoadMoreButton(response);
  }

  function displayImages(imageUrls) {
    for(var i=0; i<imageUrls.length; i++){
      $("#lightGallery").append(createThumbnail(imageUrls[i].source));
    }
  }

  function createThumbnail(imageUrl) {

    //TODO: generate thumbnail

    var image = '';
    image += "<li data-src='" + imageUrl + "' >";
    image += "<img src='" + imageUrl + "' class='thumbnail' />";
    image += "</li>";
    return image;
  }

  // function displayLoadMoreButton(response) {
  //   if (response.paging.next) {
  //     $("#loadMore").attr("href", response.paging.next);
  //     $("#loadMore").show();
  //   } else {
  //     $("#loadMore").hide();
  //   }
  // }

  // $("#loadMore").click(function(e){
  //   e.preventDefault();
  //   getPicsFromFb($(this).attr('href'));
  // });

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  var setUpGallery = function() {

    $("#lightGallery").lightGallery({

      mode      : 'slide',  // Type of transition between images. Either 'slide' or 'fade'.
      useCSS    : true,     // Whether to always use jQuery animation for transitions or as a fallback.
      cssEasing : 'ease',   // Value for CSS "transition-timing-function".
      easing    : 'linear', //'for jquery animation',//
      speed     : 600,      // Transition duration (in ms).
      addClass  : '',       // Add custom class for gallery.
      
      preload         : 1,    //number of preload slides. will exicute only after the current slide is fully loaded. ex:// you clicked on 4th image and if preload = 1 then 3rd slide and 5th slide will be loaded in the background after the 4th slide is fully loaded.. if preload is 2 then 2nd 3rd 5th 6th slides will be preloaded.. ... ...
      showAfterLoad   : true,  // Show Content once it is fully loaded.
      selector        : null,  // Custom selector property insted of just child.
      index           : false, // Allows to set which image/video should load when using dynamicEl.

      thumbnail            : true,     // Whether to display a button to show thumbnails.
      showThumbByDefault   : false,    // Whether to display thumbnails by default..
      exThumbImage         : false,    // Name of a "data-" attribute containing the paths to thumbnails.
      animateThumb         : true,     // Enable thumbnail animation.
      currentPagerPosition : 'middle', // Position of selected thumbnail.
      thumbWidth           : 100,      // Width of each thumbnails
      thumbMargin          : 5,        // Spacing between each thumbnails 

      controls         : true,  // Whether to display prev/next buttons.
      hideControlOnEnd : true, // If true, prev/next button will be hidden on first/last image.
      loop             : false, // Allows to go to the other end of the gallery at first/last img.
      auto             : false, // Enables slideshow mode.
      pause            : 4000,  // Delay (in ms) between transitions in slideshow mode.
      escKey           : true,  // Whether lightGallery should be closed when user presses "Esc".
      closable         : true,  //allows clicks on dimmer to close gallery

      counter      : true, // Shows total number of images and index number of current image.
      lang         : { allPhotos: 'All photos' }, // Text of labels.

      mobileSrc         : false, // If "data-responsive-src" attr. should be used for mobiles.
      mobileSrcMaxWidth : 640,   // Max screen resolution for alternative images to be loaded for.
      swipeThreshold    : 50,    // How far user must swipe for the next/prev image (in px).
      enableTouch       : true,  // Enables touch support
      enableDrag        : true,  // Enables desktop mouse drag support
    });
  }

});