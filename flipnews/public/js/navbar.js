$(document).ready(function() {
	$("#submenu").hide();
});

$("#mainmenu").click(function() {
	if($("#submenu").is(":hidden")) {
		$("#submenu").show("slow");
	} else {
		$("#submenu").hide();
	}
});