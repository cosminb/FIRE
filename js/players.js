
app.players = {
    //global collection of players
    //doesn't include the 3d and 2d graphic representation 
    
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
		app.radar.addPlayer( player );
		app.arena3d.players.addPlayer( player );
	},
}
