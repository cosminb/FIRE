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
	

	
	updateAllPlayers : function ( players ) {
		for ( var i in players ) {
            
            this.players[ i ].visible = true;
			this.movePlayer( i, players[ i ].x , players[ i ].z );
        }
	},
    
    removePlayers : function ( players ) {
        for ( var i in players ) {
            
            console.log ("hidding" );
            
            this.hidePlayer( i );
        }
    },
    
    hidePlayer : function ( id ) {
        this.players[ id ].visible = false;
    },
    showPlayer : function ( id ) {
        this.players[ id ].visible = true;
	},
	
	update : function ( ) {
		
	}
}
