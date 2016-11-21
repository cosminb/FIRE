app.game = {
    
    runGame : function ( game ) {
        //reset
        //setare mapa
        //sadasdsad
        //call api functions
        
        
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