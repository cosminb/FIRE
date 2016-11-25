app.gameManager = {
    
    
    games : [],
    
    parseGames : function ( ) {
        for ( var i in game ) {
            
            this.parseGame( game[ i ], i )
            this.games.push ( game [ i ] );
            
            
        }
    },
    
    parseGame : function ( game, i ) {
        var reg = /Level\s*(\d+)\s*- Map\s*(\d+)\s*- Round\s*(\d+)\s*/g
        var tokens = reg.exec( i  );
        
        
        game.level = tokens[ 1 ];
        game.map   = tokens[ 2] ;
        game.rount = tokens [ 3 ];
        
    },
    
    runNextGame : function ( ) {
        
      var ngame = this.games.shift( );  
      
      
      app.game.runGame( ngame );
    },
    
    
}