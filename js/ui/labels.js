app.ui.labels = {
	
	items : {},
	
	init : function ( ) {
		frustum = new THREE.Frustum();
		cameraViewProjectionMatrix = new THREE.Matrix4();
		
	},
	render : function ( ) {
		
	},
	
	
	add  : function ( ) {
		
	},
	
	renderPlayer : function ( id, player, pos ) {
		
	},
	
	updatePlayer : function (playerId, player,  pos ) {
		if ( !this.items[ playerId ] ) this.renderPlayer( playerId, pos );
		
		this.items[ playerId ].move( );
		
	},
	
	updateAllPlayers : function ( ) {
		var that = this;
		app.objects.eachPlayer( function (p , i) {
			var pos = that.toScreenPosition( p.obj, app.scene.camera2 )
			//poss.push( pos );
			//{
			if ( that.frustum.containsPoint( p.obj.position ) ) {
				//if ( pos.x >= 0 && pos.x <= 700 && pos.y >= 0 && pos.y<= 700 ) {
				//ctx.strokeStyle= '#333';
				
				ctx.strokeRect(pos.x,pos.y-20,100 , 20);
				
				//ctx.fillStyle = 'rgba(20,20,20,1)';
				//ctx.strokeStyle = '#ddd';
				
				ctx.fillText( "player " + i, pos.x + 10, pos.y - 20 );
				//ctx.strokeText( "player " + i, pos.x + 10, pos.y - 20 );
			}
		});		
	},
	
	
	
	updateFrom3d : function ( ) {
		app.scene.camera2.matrixWorldInverse.getInverse( app.scene.camera2.matrixWorld );
		cameraViewProjectionMatrix.multiplyMatrices( app.scene.camera2.projectionMatrix, app.scene.camera2.matrixWorldInverse );
		frustum.setFromMatrix( cameraViewProjectionMatrix );
		
	},
	
	toScreenPosition : function (obj, camera)
	{
		var vector = new THREE.Vector3();
		
		var widthHalf = 0.5*CANVAS_WIDTH;
		var heightHalf = 0.5*CANVAS_HEIGHT;
		
		obj.updateMatrixWorld();
		vector.setFromMatrixPosition(obj.matrixWorld);
		vector.y = 200;
		
		vector.project(camera);
		
		vector.x = ( vector.x * widthHalf ) + widthHalf;
		vector.y = - ( vector.y * heightHalf ) + heightHalf;
		
		return { 
			x: vector.x,
			y: vector.y
		};
		
	};
	
}
