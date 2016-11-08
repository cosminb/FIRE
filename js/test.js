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
		
		app.api.moveTo( p, pl.xxx, pl.zzz );
	},
	
	pl : {},
	
	init : function ( ) {
		
		for ( var i = 0; i<35; i++ ) {
			this.pl[ i ] = { xxx : Math.round( Math.random( ) * 50 ) , zzz : Math.round( Math.random( ) * 50 ) }
		}
	},
	
	next : function ( ) {
		for ( var i = 0; i<35; i++ ) 
			this.movePlayer( i );
	},
	
	auto : function ( ) {
		
		window.setInterval ( function ( ) {
		
			app.test.next( i );
		}, 500);
	}
}
