app.api = {
    resetAll : function ( game ) {
        //dmove players 
        //remove all Bombs
        //reset idol
		
		app.floor.updateBoard( game.board, app.game.boardSize );
		
		app.ui.radar.updateBoard( game.board, app.game.boardSize );
		
		app.api.resetPlayersPosition(game.players);

        
        app.units.idol = { x : Math.floor( app.game.boardSize / 2 ),z : Math.floor( app.game.boardSize / 2 ) };        
        app.dummy.line.move( pos3d( app.units.idol.x, app.units.idol.z ) );
        
        app.objects.removeAllBombs();
    },
    
    initMap : function ( ) {
        
    },
    
    
    players : {},
    
    addPlayer : function ( p, x, z, color ) {

        var pos = pos3d( x, z );
            
        this.players.initialPosition = pos;
        
        var color = app.persistent.data( p ).color;
        
        app.objects.addPlayer( p, x, z, color );
		
		app.ui.radar.addPlayer(  p );
		
    },
    
    addFrame : function ( ) {
      app.timeline.addScene();        	  
	  app.stats.addStep( );
	  
    },
    
    movePlayer : function ( p,  x, z, animationType ) {
        pos = pos3d( x, z );
		
        
        app.timeline.addToScene( p, { x: pos.x, y : pos.y, z : pos.z, point : { x , z }, animation : animationType || "walk" } )
		
		app.stats.log( "move", [ p, x , z ] );
		
		app.stats.updatePlayer( p, x, z );
		
    }, 
    
    killPlayer : function ( p ) { 
      //  pos = this.initialPosition[ p ];
      
      var item = app.objects.getPlayer( p );
      var pos = pos3d( item.initialX, item.initialZ );
      
      app.timeline.addToScene( p, { x: pos.x, y : 10000, z : pos.z, point : { x  : item.initialX , z : item.initialZ }, animation : "jump" } )
 
 	  app.stats.log( "kill", [ p ] );
		
        app.stats.removePlayer( p )
        
      //app.timeline.addToScene( p, { x : pos.x, y : pos.y, z : pos.z, animation : "jump" } ); 
    },
    
    
    nextId : 1, 
    
    addBomb : function ( p, x, y ) {
        id = "bomb_" + this.nextId++
        
        app.stats.log( "bomb", [ p , x, y] );
		
        app.stats.addBomb( id, x, y, this.nextId );
        
        //app.ui.radar.addBomb( id, x, y );
        
    },
    
    explodeBomb : function ( ) {
        
    },
    
    useSonar : function( p){
		app.stats.log( "sonar", [ p ] );
		
    },

    playerWin : function(){

    },

    resetPlayersPosition : function( players ){
      
      
      for ( var id in players ) {
            
            var itemId = app.persistent.getPlayer( id );

            var item = app.objects.getPlayer( itemId );

            
            item.initialX = players[ id ].startX;
            item.initialZ = players[ id ].startY;

            item.xx = players[ id ].startX;
            item.xz = players[ id ].startY;

			app.ui.radar.showPlayer( id );
			app.ui.radar.movePlayer( id, item.xx, item.xz );

            app.api.movePlayer( id, item.xx, item.xz, "walk" );

      } 
    },

}
