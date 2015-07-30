$(document).ready(function(){
	$("#read-more").click(function(){
		if($("#read-more-points").is(":visible")){
			$("#read-more").html("<u>Read more...</u>");
			$("#read-more-points").hide();
		} else {
			$("#read-more").html("<u>Read less...</u>");
			$("#read-more-points").show();
		}
	})
});