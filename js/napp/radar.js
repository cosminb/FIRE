napp.radar = {
	
	players : {},
	
	
	blockSize : 1,
	render : function ( ) {
		this.renderBoard();
	},
	
	renderBoard : function ( ){

		
		this.board  = new createjs.Shape();
		this.board.setTransform( app.units.radar.left+20, 300 );
		
		this.offsetX = app.units.radar.left+20;
		this.offsetY = 300;
		
		this.board.cache(0, 0, 300, 300 );
		
		
		
		app.ui.scene.add( this.board );
		
	},
	updateBoard : function ( map, size ) {
		
		if ( !this.board ) this.renderBoard();
		
		var blockSize = 300 / size;
		
		
		
		this.blockSize = blockSize;
		this.blockMiddle = blockSize / 2;
		
		
		console.log( this.blockSize );
		
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
		
		//app.ui.scene.setIndex( this.board, 0 );
		
	},
	
	traps : {},
    
    reset : function ( ) {
        
        console.log( this.traps, "reseT" );
        
      for ( var i in this.traps ) {
            
            app.ui.scene.scene.removeChild( this.traps[ i ] );
            
            //delete
      }      
    },
    addBomb : function ( id, x, y ) {
        
      var trap = new createjs.Shape();
      
      var ctx = trap.graphics;
      
      
      
        ctx.beginFill("red").drawRect(0,0,8, 8);
  
  
        //trap.cache( 0, 0, 20, 20 ) ;
        
        
        this.traps[ id ] = trap;
        
		trap.x = app.units.radar.left - (-x - 0.5) * this.blockSize -4 , 
		trap.y = app.units.radar.top -(-y - 0.5)* this.blockSize - 4;

        app.ui.scene.add( trap );

    },
	addPlayer : function ( player ) {
		
		console.log( "napp", "addPlayer", player );
		
        var playerColor = player.color.base;
		
		var shape = new createjs.Shape();

		shape.alpha = 0.8;
		shape.cache(0, 0, 20, 20 );
		
		shape.setTransform( app.units.radar.left+20, 300 );
		
		
		
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
		
		console.log( "napp", id, x, y ,this.offsetX,  x , this.blockSize -8);
		
		var player = this.players[ id ];
		
		player.x = this.offsetX + (x + 0.5) * this.blockSize -8 , 
		player.y = this.offsetY +(y + 0.5)* this.blockSize - 8;
				
		//player.updateCache( );
	},
	
	update : function ( ) {
		
	}
}
