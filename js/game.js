app.game = {
    
    runGame : function ( game ) {

       this.matchId = game.info.matchId;
       this.boardSize = game.info.size;
       
        app.api.resetAll( );
        app.floor.updateBoard( game.board, this.boardSize );
      //  app.api.updateBoard(game.board, game.info);
        // app.game.runGame( game[matchId] );
        
        for ( var i in game.steps ) {
            this.runStep( game.steps[ i ] );
        }
    },
    
    runStep : function( steps ) {
        
        for ( var i=0; i<steps.length; i++ ) {
            
            this.executeStep( steps[ i ] );
        }
    },
    
    executeStep : function ( step ) {
        
        switch ( step.type ) {
            
            
            case "move" : 
                      app.api.movePlayer( step.player, step.posX, step.posY, "walk" );
                      break;
            case "Bomb" :
                    app.api.addBomb();
                    break;
            case "explodeBomb":
                    app.api.explodeBomb();
                    break;
            case "kilL":
                    app.api.killPlayer(step.player, killMethod );
                    break;
            case "useSonar":
                    app.api.useSonar();
                    break;
            case "win":
                    app.api.playerWin();
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