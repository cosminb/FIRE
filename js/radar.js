app.radar = {
	
	players : {},
	traps   : {},
	
	blockSize : 1,
	render : function ( ) {
		this.renderBoard();
	},
	
	renderBoard : function ( ){

		
		this.board  = new createjs.Shape();
		this.board.setTransform( app.units.radar.left+10, 10 );
		
		this.offsetX = app.units.radar.left+10;
		this.offsetY = 10;
		
		this.board.cache(0, 0, app.units.radar.width, app.units.radar.height);
		
		
		
		app.ui.scene.add( this.board);
		
	},
	updateBoard : function ( map, size ) {
		
		if ( !this.board ) this.renderBoard();
		
		var blockSize = app.units.radar.width / size;
		
		
		
		this.blockSize = blockSize;
		this.blockMiddle = blockSize / 2;
		
		
		var ctx = this.board.graphics;
		
		ctx.clear();
		ctx.beginFill( "#C2B280" );
		
		
		for ( var i = 0 ; i< size ; i++ ) {
			for ( var j = 0; j<size; j++ ) {
				if ( map[ i ][j] !== "W" )
				ctx.rect( i * blockSize, j* blockSize, blockSize, blockSize );
			}
		}
		
		this.board.updateCache();
		
		
	},
	
	removeAllTraps : function ( ) {
		for ( var i in this.traps ) {
			app.ui.scene.scene.removeChild( this.traps[i] );
			delete this.traps[ i ];
		}
	},
	
	setTraps : function ( traps ) {
		for ( var i in traps ) {
			if ( !traps[ i] ) continue;
			if ( this.traps[ i ] ) continue;
			
			this.addTrap( traps[ i ] );
		}
		
		for ( var i in this.traps ) {
			if ( traps[ i ] ) continue;
			
			this.removeTrap( i );
			
			delete this.traps[ i ];
		}
	},
	
    addTrap : function ( trap ) {
		
		var id = trap.id;
		
		//assume that only a bomb per location
		if ( this.traps[ id ] ) return;
		
		var shape = new createjs.Shape();
		
		var ctx = shape.graphics;
		
		
      
        ctx.beginFill("red").drawRect(0,0,8, 8);
        
        this.traps[ id ] = shape;
        
		this.move( shape, trap.x, trap.y );
		shape.visible = true;
		
        app.ui.scene.add( shape , 1);
		
    },
	removeTrap : function ( trapId ) {
		var shape = this.traps[ trapId ];
		app.ui.scene.scene.removeChild( shape );
		
	},
	
	move : function ( shape, x, y ) {
		
		shape.x = this.offsetX - (-x - 0.5) * this.blockSize -4 , 
		shape.y = this.offsetY -(-y - 0.5)* this.blockSize - 4;
		
	},
	addPlayer : function ( player ) {

        var playerColor = player.color.base;
		
		var shape = new createjs.Shape();

		shape.alpha = 0.9;
		shape.cache(0, 0, 20, 20 );
		
		
		var ctx = shape.graphics;
		ctx.clear();
		ctx.beginFill( playerColor );
		
		ctx.drawCircle(8,8,8);
		
		shape.updateCache( );
		
		var id = player.id;
		
		this.players[ id ] = shape;
		
		this.movePlayer( id , 10, 10 );
		
		app.ui.scene.add( shape );
		
	},
	
	movePlayer : function ( id, x, y ) {
		
		var player = this.players[ id ];
		
		player.x = this.offsetX + (x + 0.5) * this.blockSize -8 , 
		player.y = this.offsetY +(y + 0.5)* this.blockSize - 8;
		
		player.visible = true;
		//player.updateCache( );
	},
	
	removePlayer : function ( id ) {
		
		var player = this.players[ id ];
		
		
		player.visible = false;
	},
	
	update : function ( ) {
		
	}
}
