app.ui.radar = {
	
	players : {},
	
	
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
		
		this.blockSize = blockSize;
		this.blockMiddle = blockSize / 2;
		
		var ctx = this.board.graphics;
		
		ctx.clear();
		ctx.beginFill( "#ddd" );
		
		
		for ( var i = 0 ; i< size ; i++ ) {
			for ( var j = 0; j<size; j++ ) {
				if ( map[ i ][j] !== "W" )
				ctx.rect( i * blockSize, j* blockSize, blockSize, blockSize );
			}
		}
		
		this.board.updateCache();
		
		//app.ui.scene.setIndex( this.board, 0 );
		
	},
	
	
	addPlayer : function ( id ) {
		
        var playerColor = app.persistent.data( id ).color;
		
		var player = new createjs.Shape();

		player.alpha = 0.8;
		player.cache(0, 0, 20, 20 );
		
		var ctx = player.graphics;
		ctx.clear();
		ctx.beginFill( playerColor );
		
		ctx.drawCircle(8,8,8);
		
		player.updateCache( );
		
		this.players[ id ] = player;
		
		this.movePlayer( id , 10, 10 );
		
		app.ui.scene.add( player );
		
	},
	
	movePlayer : function ( id, x, y ) {
		var player = this.players[ id ];
		
		player.x = app.units.radar.left + (x + 0.5) * this.blockSize -8 , 
		player.y = app.units.radar.top +(y + 0.5)* this.blockSize - 8;
				
		//player.updateCache( );
	},
	
	showPlayer : function ( id ) {
		
	},
	
	updateAllPlayers : function ( players ) {
		for ( var i in players )
			this.movePlayer( i, players[ i ].x , players[ i ].z );
	},
	
	
	update : function ( ) {
		
	}
}
