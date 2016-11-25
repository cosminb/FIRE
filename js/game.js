app.game = {
    
    runGame : function ( game, id ) {
       

    this.currentGame = game;
       
     app.timeline.pause();
     
        app.ui.info.NewMatch();
        
      this.gameId = id;
      
      app.stats.clear();

      app.persistent.matchPlayers( game );
        
        
      app.timeline.reset( );

        app.ui.radar.reset();

      
	   app.events.newGame();

	   app.api.addFrame();

       this.matchId = game.info.matchId;
       this.boardSize = game.info.size;
  
  
  
        app.test.center = Math.floor( this.boardSize / 2  );
        app.test.dist = Math.floor( this.boardSize / 2 + 10 ) * 150;
        
        app.api.resetAll( game );
		
		app.ui.logs.clear();
        
		app.producer.newGame( game );
		
        for ( var i in game.steps ) {
            this.runStep( game.steps[ i ] );
        }
        
        
        app.timeline.resume ( );
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
                   app.api.killPlayer(playerId);
                  break;         
            case "bomb" :
                app.api.addBomb( playerId, step.x, step.y );
                
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
