app.ui.radar = {
	
	
	render : function ( ) {
		
		
		this.renderBoard();
	},
	
	renderBoard : function ( ){
		
		this.board  = new createjs.Shape();
		this.board.setTransform( app.units.radar.left, app.units.radar.top );
		
		
		this.board.cache(0, 0, 300, 300 );
		
		
		
		app.ui.scene.add( this.board );
		
	},
	updateBoard : function ( map, size ) {
		
		if ( !this.board ) this.renderBoard();
		
		var blockSize = 300 / size;
		
		var ctx = this.board.graphics;
		
		ctx.clear();
		ctx.beginFill( "#444" );
		
		
		for ( var i = 0 ; i< size ; i++ ) {
			for ( var j = 0; j<size; j++ ) {
				if ( map[ i ][j] == "W" )
				ctx.rect( i * blockSize, j* blockSize, blockSize, blockSize );
			}
		}
		
		this.board.updateCache();
		
		
		
	},
	
	update : function ( ) {
		
	}
}
