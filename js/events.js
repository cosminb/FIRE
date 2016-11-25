app.events = {
	
	newGame : function ( ) {
		this.isFirstStep = true;
		
	},
	
	nextStep : function ( i ) {
		if ( this.isFirstStep ) return this.firstStep();
		
		console.log( "step " + i );
		
	},
	
	stepMiddle : function ( i ) {
		
		var logs = app.stats.data.steps[i].logs;
		
		app.ui.logs.append( i, logs );
	},
	
	firstStep : function ( ) {
		this.isFirstStep = false;
	}
}
