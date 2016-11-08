app.api = {
    
    initMap : function ( ) {
        
    },
    
    
    moveTo : function ( p, x, z) {
		
		app.timeline.add( "animation_" + p, app.objects.getPlayer("player_"+p), {
			
			duration : 500,
			
			endPosition : {
				x : app.units.getX(x),
				z : app.units.getZ(z)
			},

		});
		
		
        
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
