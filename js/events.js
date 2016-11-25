app.events = {
	
	newGame : function ( ) {
		this.isFirstStep = true;
		
	},
	
	nextStep : function ( i ) {
		i = i - 1;

        if ( this.isFirstStep ) return this.firstStep();
		
                
		var logs = app.stats.data.steps[i].logs;
		
		
		app.ui.logs.append( i, logs );
		
		app.ui.radar.updateAllPlayers( app.stats.data.steps[ i ].players );
        app.ui.radar.removePlayers( app.stats.data.steps[ i ].removedPlayers);
        
        
        var bombs = app.stats.data.steps[ i ].bombs;
        
        for ( var i in bombs ) {
              app.objects.addBomb( bombs[i].id, bombs[i].x, bombs[i].y, bombs[i].color );
            app.ui.radar.addBomb(  bombs[i].id, bombs[i].x, bombs[i].y );

        }
        
        
        //app.camera.reposition ( i ) ;
	},
	
	stepMiddle : function ( i ) {
		
        i = i-1;

	},
	
	firstStep : function ( ) {
		this.isFirstStep = false;
	},
    
    matchEnded : function ( ) {
        console.log( "match ended", app.game.gameId );

       var i = app.stats.data.steps.length - 1;
       
		var logs = app.stats.data.steps[i].logs;
		
		
		app.ui.logs.append( i, logs );
		
		app.ui.radar.updateAllPlayers( app.stats.data.steps[ i ].players );
        app.ui.radar.removePlayers( app.stats.data.steps[ i ].removedPlayers);
        

        
        app.ui.info.EndOfMatch ( );
        
        
        
        var logs = [];
        var results = app.game.currentGame.results
        for ( var i in results ) {
            var playerId = app.persistent.getPlayer( i );

            logs.push ( app.ui.logs.getLog("results", [ playerId, results[ i ] ] ) );
            
        }   

        app.ui.logs.append( "results" , logs );
        
    },
}
