	$(document).ready(function() {		
	     $("#submenu").hide();
	  });

	  $("#mainmenu").click(function() {
	      if($("#submenu").is(":hidden")){
	          $("#submenu").show("slow");
	          // $(".Menu").text("Close Menu");
	          // $(".Menu").removeClass( "Menu" ).addClass( "CloseMenu" );
	      }
	      else{
	          $("#submenu").hide();
	          // $(".CloseMenu").text("Menu");
	          // $(".CloseMenu").removeClass( "CloseMenu" ).addClass( "Menu" );
	      }
	  });


