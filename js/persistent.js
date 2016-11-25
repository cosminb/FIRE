app.persistent = {
    PLAYER : {},
    
    init : function ( ) {
        
        var players = {};
        
        
        var firstGame = Object.keys( game )[ 0 ];
        
        var agame = game[ firstGame ];
        
        var players = this.players = {};
        
        var count = 0;
        for ( var i in agame.players ) {
            
            var player = { id : i , name : agame.players[i].name };
            
            players[ agame.players[i].name ] = player;
            
            player.color = this.colors[ count ];
            
            
            this.PLAYER[ i ] = player;
            count ++; 
            
            console.log( i );
            app.api.addPlayer( i ,0, 0,  player.color );
        }
        

    },
    
    
    data : function ( id ) {
        return this.PLAYER[ id ];
        
    },
    matchPlayers : function ( game ) {
       this.map = {};
       
       for ( var i in game.players ) {
           this.map[ i ] = this.players[ game.players[ i ].name ].id;
       }
    },
    
    getPlayer : function ( id ) {        
      return this.map[ id ];  
    },
    
    map : {},
    players : {},
    
    
    colors : ["hsl(0, 100%, 50%)","hsl(20, 100%, 50%)","hsl(40, 100%, 50%)","hsl(60, 100%, 50%)","hsl(80, 100%, 50%)","hsl(100, 100%, 50%)","hsl(120, 100%, 50%)","hsl(140, 100%, 50%)","hsl(160, 100%, 50%)","hsl(180, 100%, 50%)","hsl(200, 100%, 50%)","hsl(220, 100%, 50%)","hsl(240, 100%, 50%)","hsl(260, 100%, 50%)","hsl(280, 100%, 50%)","hsl(300, 100%, 50%)","hsl(320, 100%, 50%)"]
}