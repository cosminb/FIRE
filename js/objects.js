app.objects = {
    
    players : {},
    traps   : {},
    cogs    : {},
    idol    : {},
    walls   : {},
	
	obj : {},
	
    
    addPlayer : function (id, x, z, color ) {		
        var item = { x, z, id, color, initialX : x, initialZ : z };
         
        app.player.add(item);
         
        var pos = pos3d( x, z );
	
        app.player.move( item, pos.x, pos.y, pos.z ) ; //300 * (i / 3 ) + 50, 10, 300 * ( i % 3 ) + 50 ) ;
    
        this.obj[ id ] = item;
		this.players [ id ] = item;
    },
    
    addBomb   : function (id, x, y, color ) {
		
        var item = { x, y, id, color };
        
        app.trap.add( item );

         
        var pos = pos3d( x, y );
	    
        app.trap.move( item, pos.x, pos.y, pos.z );
     
        this.obj[ id ] = item;
		this.traps[ id ] = item;
    },
    
    getPlayer : function ( id ) {
        return this.players[ id ];
    },
    
    getBomb   : function ( id ) {
        return this.obj[ id ];
    },
    
    
    eachPlayer : function ( cb ) {
        for ( var i in this.players ) {
            cb( this.players[i], i ) ;
        }
    },
    eachTrap : function ( cb ) {
        for ( var i in this.traps ) {
            cb( this.traps[i], i ) ;
        }
    }
}
