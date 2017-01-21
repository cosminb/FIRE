app.gameManager = {
    
    
    games : [],
    
    parseGames : function ( ) {
        for ( var i in game ) {
             
            this.parseGame( game[ i ], i )
            this.games.push ( game [ i ] );
            
            
        }
        
        
        this.games.sort( function( a, b) {
            
            return b.info.matchId < a.info.matchId ;
        });
    },
    
    parseGame : function ( game, i ) {
        var reg = /Level\s*(\d+)\s*- Map\s*(\d+)\s*- Round\s*(\d+)\s*/g
        var tokens = reg.exec( i  );
        
        
        game.level = 1*tokens[ 1 ];
        game.map   = 1*tokens[ 2] ;
        game.rount = 1*tokens [ 3 ];
        
    },
    
    runNextGame : function ( ) {
        
      var ngame = this.games.shift( );  
      
      
      app.game.runGame( ngame );
	  
	  napp.game.runGame( ngame );
    },
    
    
}
