app.game = {
    
    runGame : function ( game, id ) {

      this.gameId = id;

      app.persistent.matchPlayers( game );
        
	   app.events.newGame();

	   app.api.addFrame();

       this.matchId = game.info.matchId;
       this.boardSize = game.info.size;
       
       
        app.api.resetAll( game );
		
		
		app.producer.newGame( game );
		
        for ( var i in game.steps ) {
            this.runStep( game.steps[ i ] );
        }
    },
    
    runStep : function( steps ) {
        app.api.addFrame();
        
        for ( var i=0; i<steps.length; i++ ) {
            
            this.executeStep( steps[ i ] );
        }
        
        app.producer.afterAddingStep ( );
    },
    
    executeStep : function ( step ) {
        
        
        
        var playerId = app.persistent.getPlayer( step.player );
        

        switch ( step.type ) {
            
            
            case "move" : 
                    var player = app.objects.getPlayer( playerId );

                    player.xx -= -step.x;
                    player.xz -= -step.y;

                    app.api.movePlayer( playerId, player.xx, player.xz, "walk", step );
                    break;
            case "kill":
                   // app.api.killPlayer(playerId);
                       break;         
            case "Bomb" :
    //                app.api.addBomb();
                    break;
            case "explodeBomb":
      //              app.api.explodeBomb();
                    break;
           
            case "sonar":
                    app.api.useSonar(playerId);
                    break;
            case "win":
          //          app.api.playerWin();
                    break;
        }
    }
}

/*

function runGame ( game ) {

    app.api.startGame ( game );

    app.api.setupBoard( game.board );
    
    var steps = game.steps;
    
    for ( var i in steps ) {
        
        var currentStep = steps[ i ];
        
        for ( j in currentStep ) {
            
        }

    }
}

for ( var i in game ) {

    runGame( game[ i ] );
        
}
*/
