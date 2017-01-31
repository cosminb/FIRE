app.test = {
	
	//test class 
    //only for camera movement
    
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



