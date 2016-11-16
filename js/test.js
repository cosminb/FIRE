app.test = {
	
	
	movePlayer : function ( p ) {
		
		var pl = this.pl[ p];
		
		do { 
			var dx = Math.round( Math.random() * 4 ) -4 ;
			var dz = Math.round( Math.random() * 4 ) -4 ;
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
	
	xnext : function ( ) {
        
		for ( var i = 0; i<35; i++ ) 
			this.movePlayer( i );
	},
    
    anext : function () {
        
      app.timeline.addScene();

      for ( var i = 0; i< 35;i++ ) {
            var pos = this.movePlayer( i );
            
            pos = pos3d( pos.x, pos.z );
            
            app.timeline.addToScene( i, { x: pos.x, y : pos.y, z : pos.z } )
      }      
    },
	
	add : function ( ) {
		for( var i = 0 ; i < 50; i++  ){
			this.anext()
		}	
	},
	
	next : function () {
		
		app.timeline.addScene();
		
		for ( var i = 0; i< 35;i++ ) {
			var pos = this.movePlayer( i );
			app.api.moveTo( i, pos.x, pos.z );
			//pos = pos3d( pos.x, pos.z );
			
			//app.timeline.addToScene( i, pos )
		}      
	},
	
	auto : function ( ) {
		this.add();
		window.setInterval ( function ( ) {
		
			app.test.next( i );
		}, 500);
	}
}



/*

var xfn = function () {
    var overlay, lastCount, lastTime, timeoutFun;

    overlay = document.createElement('div');
    overlay.style.background = 'rgba(0, 0, 0, .7)';
    overlay.style.bottom = '0';
    overlay.style.color = '#fff';
    overlay.style.display = 'inline-block';
    overlay.style.fontFamily = 'Arial';
    overlay.style.fontSize = '10px';
    overlay.style.lineHeight = '12px';
    overlay.style.padding = '5px 8px';
    overlay.style.position = 'fixed';
    overlay.style.right = '0';
    overlay.style.zIndex = '1000000';
    overlay.innerHTML = 'FPS: -';
    document.body.appendChild(overlay);

    lastCount = window.mozPaintCount;
    lastTime = performance.now();

    timeoutFun = function () {
        var curCount, curTime;

        curCount = window.mozPaintCount;
        curTime = performance.now();
        overlay.innerHTML = 'FPS: ' + ((curCount - lastCount) / (curTime - lastTime) * 1000).toFixed(2);
        lastCount = curCount;
        lastTime = curTime;
        setTimeout(timeoutFun, 1000);
    };

    setTimeout(timeoutFun, 1000);
}

xfn();*/


