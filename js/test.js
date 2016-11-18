app.test = {
	
	
	movePlayer : function ( p ) {
		
		var pl = this.pl[ p];
		
		do { 
			var dx = Math.round( Math.random() * 2 ) -1 ;
			var dz = Math.round( Math.random() * 2 ) -1 ;
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

    addFrame : function () {

      app.api.addFrame();
      
      for ( var i = 0; i< 35;i++ ) {
            var pos = this.movePlayer( i );
            
            
            app.api.movePlayer( i , pos.x, pos.z, Math.random() < 0.5 ? "walk" : "walk"  );
      }      
    },
	
	auto : function ( ) {
		for ( var i = 0 ; i < 35; i++ ) {
            app.api.addPlayer( i, Math.round( i/3 ), i % 3, i *1543 );
        }

        
        for( var i = 0 ; i < 50; i++  ){
			this.addFrame()
		}	
        
	}
}



