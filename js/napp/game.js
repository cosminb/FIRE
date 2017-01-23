napp.game = {
	
	isInitialize : false, 
	
	
	runGame : function ( game ) {		
		if ( !this.isInitialize ) 
			this.init(game.players);

		
		this.score = game.results;
		this.boardSize = game.info.size;
		
		
		var frames = napp.frameBuilder.build( game.players, game.steps );
		
		napp.timeline.setFrames( frames );
		
		this.removeTraps ( );
		this.setupBoards ( game.board , game.info.size );
	},
	
	
	init : function ( players ) {
		this.isInitialize = true;
		
		napp.radar.render();
		
		napp.arena3d.grid.add();
		
		napp.arena3d.idol.add();
		
		
		napp.players.init( players );
		
		
		napp.status.render();
	},
	
	
	setupBoards : function ( board , boardSize ) {
		napp.radar.updateBoard( board, boardSize );
		napp.arena3d.grid.update( board, boardSize );
		napp.arena3d.idol.update( boardSize );
	},
	
	resetPlayers : function ( players ) {
	},
	
	removeTraps : function ( ) {
		napp.radar.removeAllTraps( );
	},
	parse : function ( ) {
		
	},
}

napp.players = {
	items : {},
	names : {},
	ids   : {},
	count : 0,
	
	init : function ( inputs ) {
		this.count = 0;
		
		for ( var i in inputs ) {
			this.createPlayer( i, inputs[ i ] );
		}
		
		this.initColors( );
		
		for ( var i in this.items ) 
			this.addToUI( this.items[ i ] );
	},
	
	
	initColors : function ( ) {
		var step = 360 /  (this.count + 1 );
		
		for ( var i = 0; i < this.count; i++ ) {
			this.items[i].color.base = "hsl(" + i*step + ",100%,50%)" ;
		}
	},
	
	createPlayer : function ( i, input ) {
		var id = this.count;
		this.count++;
		
		var player = { 
			name : input.name, 
			id   : id,
			color: { base : "#007abc", accent : "" }
		}
		
		this.names [player.name] = id;
		this.ids[i]  = id;
		
		this.items[ id ] = player;
	},
	
	
	get  : function ( index ) {
		var id = this.ids[ index ];
		
		return this.items [ id ];
	},
	
	getId : function ( index ) {
		return this.ids[ index ];
	},
	
	addToUI : function ( player ) {
		napp.radar.addPlayer( player );
		
		napp.arena3d.players.addPlayer( player );
	},
}
