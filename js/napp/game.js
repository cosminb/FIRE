napp.game = {
	
	isInitialize : false, 
	
	
	runGame : function ( game ) {		
		if ( !this.isInitialize ) 
			this.init(game.players);

		
		this.score = game.results;
		
		
		var frames = napp.frameBuilder.build( game.players, game.steps );
		
		napp.timeline.setFrames( frames );
		
		this.removeTraps ( );
		this.setupBoards ( game.board , game.info.size );
	},
	
	
	init : function ( players ) {
		this.isInitialize = true;
		
		napp.players.init( players );
		
		napp.radar.render();
		
	},
	
	
	setupBoards : function ( board , boardSize ) {
		napp.radar.updateBoard( board, boardSize );
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
	},
}
