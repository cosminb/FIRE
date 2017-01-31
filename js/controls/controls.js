var controls = {}


controls.main = {
	
	init : function ( ) {
		this.setup();
	},
	
	setup : function ( ) {
		$("#logFile").on("change", function ( ) {
			controls.logs.load( this ) ;
		});
		
		$("#goto").on("click", function ( ) {
			var frameId = $("#frameCount").val();
			controls.game.goto(frameId);
		});
	}
	
}

controls.logs = {
	
	load : function ( input ) {
		file = input.files[0];
		fr = new FileReader();
		fr.onload = function ( e ) {  
			
			controls.logs.setTextLogs( e.target.result )
			
		} ;
		fr.readAsText(file);
	},
	
	
	setTextLogs : function ( text ) {
		
		var game = {};
		
		try { 
			
			var obj = eval( text );
		} catch ( e ) {
			obj = null;
		}
		
		if ( obj ) {
			controls.game.start( obj );
		}
	}
}


controls.game = {
	
	goto  : function ( frameId) {
		window.opener.app.timeline.play( frameId )
		
	},
	
	start : function ( obj ) {
		
		
		console.log( obj );
		
		var count = obj.steps.length;
		$("#frameCount").attr("max", count );
		
		var parent = window.opener.app.game.runGame( obj );
		
		window.opener.app.timeline.play( 0 );
	}
}
