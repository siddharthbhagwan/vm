$(document).ready(function(){

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1501046463544748',
      xfbml      : true,
      version    : 'v2.4',
      cookie     : true
    });

    getPicsFromFb("me/photos?fields=picture,images&type=uploaded&access_token=CAACEdEose0cBAESVslmlk90lcpYV6vj5Ky3qZB4mdmDIYluKimPddOQk6ZA5NdmzD37nNc8SNuEA1eeQCuQMkfYn65FdmoO43K8FNTFdZBdd4XJkx8VakgIZB77ovz7GEjiPMPrVZC2TUMbobdZB9tKeBQkCLI3DSjfyRBm1clAhBelvS4DPyGc8ZBUzDFWtSG1kZAM5B4L3mwZDZD");
  };

  function getPicsFromFb(url) {
    FB.api(
      url,
      function (response) {
        if (response && !response.error) {
          parseResponseData(response);
        } else {
          console.log(response.error);
        }
      }
    );
  }

  function parseResponseData(response) {
    var images = []; var thumbnails = [];
    response.data.forEach(function(data){
      images.push(data.images[0]);
      thumbnails.push(data.picture);
    });
    displayImages(images, thumbnails);
    setUpGallery();
    displayLoadMoreButton(response);
  }

  function displayImages(imageObjects, thumbnailObjects) {
    for(var i=0; i<imageObjects.length; i++){
      $("#lightGallery").append(createThumbnail(thumbnailObjects[i], imageObjects[i].source));
    }
  }

  function createThumbnail(thumbnailUrl, imageUrl) {
    var image = '';
    image += "<li data-src='" + imageUrl + "' >";
    image += "<img src='" + thumbnailUrl + "' class='thumbnail' />";
    image += "</li>";
    return image;
  }

  function displayLoadMoreButton(response) {
    if (response.paging.next) {
      $("#loadMore").attr("href", response.paging.next);
      $("#loadMore").show();
    } else {
      $("#loadMore").hide();
    }
  }

  $("#loadMore").click(function(e){
    e.preventDefault();
    getPicsFromFb($(this).attr('href'));
  });

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