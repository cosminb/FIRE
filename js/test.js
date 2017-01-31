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
		if ( pl.xxx > 100 ) pl.xxx = 100;
		if ( pl.zzz< 0 ) pl.zzz = 0;
		if ( pl.zzz > 100 ) pl.zzz = 100;
		
		//app.api.moveTo( p, pl.xxx, pl.zzz );
        
        return { x : pl.xxx, z : pl.zzz };
	},
	
	pl : {},
	
	init : function ( ) {
		
		for ( var i = 0; i<this.nr; i++ ) {
			this.pl[ i ] = { xxx : Math.round( Math.random( ) * 100 ) , zzz : Math.round( Math.random( ) * 100 ) }
		}
	},
	
	nr : 5, 

    addStep : function () {

      app.api.addFrame();
      
      for ( var i = 0; i< this.nr;i++ ) {
            var pos = this.movePlayer( i );
            
            app.api.movePlayer( i , pos.x, pos.z, Math.random() < 0.5 ? "walk" : "walk"  );
      }      
    },
	
	auto : function ( ) {
		//*

        /*
        for ( var i = 0; i < 100 ; i ++ ) {
            app.objects.addBomb( "bomb_" + i, Math.round(i / 10 ) * 3,  ( i % 10 )* 3, i );
        }

        */
        
        /*
		for ( var i = 1 ; i < this.nr; i++ ) {
            app.api.addPlayer( i, Math.round( i/3 ), i % 3, i *1543 );
        }

        */
        /*
        for( var i = 0 ; i < 10050; i++  ){
			this.addStep()
		}
		
		//*/
        
	},
    
    animateCamera : function ( ) {
		
		var b = 90;
            
            var that = this;
		
		//app.scene.camera2.matrixAutoUpdate = false;
		
		var x = 600;
		
		if ( this.x ) window.clearInterval( this.x );
		this.dist = 3000;

		
		
		//this.x = window.setTimeout( function ( ) {
		
		this.shouldRotate = true;
		this.x = window.setInterval( function ( ) {
		
			if ( !that.shouldRotate ) return;
			
			app.test.center = Math.floor( app.game.boardSize / 2  );
			app.test.dist = Math.floor( app.game.boardSize / 2 + 10 ) * 150;
			
			
			b -= 0.03;
			x+= 10;
			
			that.dist = 9000;
			
			
			app.camera.positionAtAngle ( that.center, that.center, that.dist,75, b );
			//app.scene.camera2.near += 1;

		}, 50 );
	},
	
}



