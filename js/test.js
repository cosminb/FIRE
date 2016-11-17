app.test = {
	
	
	movePlayer : function ( p ) {
		
		var pl = this.pl[ p];
		
		do { 
			var dx = Math.round( Math.random() * 10 ) -5 ;
			var dz = Math.round( Math.random() * 10 ) -5 ;
		} while ( (dx == 0 && dz == 0) || (dx!=0 && dz!=0)  );
		
		pl.xxx +=  dx;
		pl.zzz +=  dz;

		if ( pl.xxx < 0 ) pl.xxx = 0;
		if ( pl.xxx > 34 ) pl.xxx = 34;
		if ( pl.zzz< 0 ) pl.zzz = 0;
		if ( pl.zzz > 34 ) pl.zzz = 34;
		
		//app.api.moveTo( p, pl.xxx, pl.zzz );
        
        return { x : pl.xxx, z : pl.zzz };
	},
	
	pl : {},
	
	init : function ( ) {
		
		for ( var i = 0; i<35; i++ ) {
			this.pl[ i ] = { xxx : Math.round( Math.random( ) * 50 ) , zzz : Math.round( Math.random( ) * 50 ) }
		}
	},

    next : function () {
        
      app.timeline.addScene();

      for ( var i = 0; i< 35;i++ ) {
            var pos = this.movePlayer( i );
            
            pos = pos3d( pos.x, pos.z );
            
            app.timeline.addToScene( i, { x: pos.x, y : pos.y, z : pos.z } )
      }      
    },
	
	add : function ( ) {
		for( var i = 0 ; i < 50; i++  ){
			this.next()
		}	
	},
	
	auto : function ( ) {
		this.add();
	}
}



