app.game = {
	
	isInitialize : false, 
	
	
	runGame : function ( game ) {		
		if ( !this.isInitialize ) 
			this.init(game.players);

		
		this.score = game.results;
		this.boardSize = game.info.size;
		
		
		var frames = app.frameBuilder.build( game.players, game.steps );
		
		app.timeline.setFrames( frames );
		
		this.removeTraps ( );
		this.setupBoards ( game.board , game.info.size );
	},
	
	
	init : function ( players ) {
		this.isInitialize = true;
		
		app.radar.render();
		
		app.arena3d.grid.add();
		
		app.arena3d.idol.add();
		
		
		app.players.init( players );
		
		
		app.status.render();
	},
	
	
	setupBoards : function ( board , boardSize ) {
		app.radar.updateBoard( board, boardSize );
		app.arena3d.grid.update( board, boardSize );
		app.arena3d.idol.update( boardSize );
	},
	
	resetPlayers : function ( players ) {
	},
	
	removeTraps : function ( ) {
		app.radar.removeAllTraps( );
	},
	parse : function ( ) {
		
	},
}
