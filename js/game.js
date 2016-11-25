app.game = {
    
    runGame : function ( game ) {

	   app.events.newGame();

	   app.api.addFrame();

       this.matchId = game.info.matchId;
       this.boardSize = game.info.size;
       
        app.api.resetAll(game );
		
		
		for ( var j = 0; j < 100 ; j++ ) {
			for ( var i in game.steps ) {
				this.runStep( game.steps[ i ] );
			}
		}
    },
    
    runStep : function( steps ) {

        app.api.addFrame();
		
        
        for ( var i=0; i<steps.length; i++ ) {
            
            this.executeStep( steps[ i ] );
        }
    },
    
    executeStep : function ( step ) {
        
        switch ( step.type ) {
            
            
            case "move" : 
                    var player = app.objects.getPlayer( step.player );

                    player.xx -= -step.x;
                    player.xz -= -step.y;

                    app.api.movePlayer( step.player, player.xx, player.xz, "walk", step );
                    break;
            case "kill":
                   // app.api.killPlayer(step.player );
                       break;         
            case "Bomb" :
    //                app.api.addBomb();
                    break;
            case "explodeBomb":
      //              app.api.explodeBomb();
                    break;
           
            case "sonar":
                    app.api.useSonar(step.player);
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
