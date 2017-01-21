napp.timeline = {
	
	values : {

	},
	
	start : function ( frames ) {
		var nr = 0;
		
		for ( var i in frames ) {
			this.setFrame(frames[ i ]);
		}
	},
	
	setFrames : function ( frames ) {
		this.frames = frames;
		
	},
	gotoFrame : function ( id ) {
		
		var frame = this.frames[ id ];
		if ( !frame ) return;
		
		for ( var i in frame.players ) {
			this.updatePlayer( frame.players[ i ] );
		}
	},
	
	updatePlayer : function ( player ) {
		if ( player.removed ) {
			this.removePlayer( player );
			return ;
		}
		
		napp.radar.movePlayer( player.id, player.x, player.y );
		
	},
	
	removePlayer : function ( player ) {
		
	},
}
