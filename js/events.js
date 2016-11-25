app.events = {
	
	newGame : function ( ) {
		this.isFirstStep = true;
		
	},
	
	nextStep : function ( i ) {
		if ( this.isFirstStep ) return this.firstStep();
		
	},
	
	stepMiddle : function ( i ) {
		
		var logs = app.stats.data.steps[i].logs;
		
		
		app.ui.logs.append( i, logs );
		
		app.ui.radar.updateAllPlayers( app.stats.data.steps[ i ].players );
	},
	
	firstStep : function ( ) {
		this.isFirstStep = false;
	}
}
