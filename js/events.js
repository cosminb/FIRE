app.events = {
	
	newGame : function ( ) {
		this.isFirstStep = true;
		
	},
	
	nextStep : function ( i ) {
		i = i - 1;
        if ( this.isFirstStep ) return this.firstStep();
		
        
        app.camera.reposition ( i ) ;
	},
	
	stepMiddle : function ( i ) {
		
        i = i-1;
        
		var logs = app.stats.data.steps[i].logs;
		
		
		app.ui.logs.append( i, logs );
		
		app.ui.radar.updateAllPlayers( app.stats.data.steps[ i ].players );
	},
	
	firstStep : function ( ) {
		this.isFirstStep = false;
	},
    
    matchEnded : function ( ) {
        console.log( "match ended", app.game.gameId );
    },
}
