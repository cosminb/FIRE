app.api = {
    
    initMap : function ( ) {
        
    },
    
    
    moveTo : function ( p, x, y) {
        console.log( "moved" );
        
        var item = app.objects.getPlayer( p );
        
        app.player.moveTo( item, x, y );
        
    },
    killPlayer : function ( killMethod ) { 
        console.log( "killed" );
        
        var item = app.objects.getPlayer( p );
        
        app.player.killIt( item  );
    },
    
    
    addBomb : function ( ) {
        
    },
    
    explodeBomb : function ( ) {
        
    },

}
