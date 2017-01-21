napp.timeline = {
	
	values : {

	},
	
	frameDuration : 500, 
	auto : true, 
	
	play : function ( frameId ) {
		
		this.auto = true;
		
		this.currentFrame = frameId || 0;
		
		
		
		this.goto( this.currentFrame ) ;
		
		this.currentFrame++;
		
		
		this.scheduleNextFrame();
		
	},
	
	scheduleNextFrame : function ( ) {
		
		if ( !this.auto || this.currentFrame >= this.frames.length ) 
			return;
			
		var that = this;
		
		window.clearTimeout( this.timer );
		
		this.timer = window.setTimeout( function ( ) {
			that.nextFrame();
		}, this.frameDuration)
		
	},
	
	
	nextFrame : function ( ) {
			
		this.transitionTo( this.currentFrame );
		this.currentFrame++;
		
		this.scheduleNextFrame();
	},
	
	setFrames : function ( frames ) {
		this.frames = frames;
	},
	
	
	transitionTo : function ( id ) {
		
		var frame = this.frames[ id ];
		if ( !frame ) return;
		
		for ( var i in frame.players ) {
			this.updatePlayer( frame.players[ i ] );
		}
		
		for ( var i in frame.addedTraps ) {
			this.addTrap( frame.addedTraps[ i ] );
		}
		
		for ( var i in frame.removedTraps ) {
			this.removeTrap( frame.removedTraps[ i ] );
		}
	},
	
	
	goto : function ( id ) {
		
		var frame = this.frames[ id ];
		if ( !frame ) return;
		
		for ( var i in frame.players ) {
			this.updatePlayer( frame.players[ i ] );
		}
		
		this.setTraps( frame.traps );
		
	},
	
	setTraps : function ( traps ) {
		//no transitions
		
		napp.radar.setTraps ( traps );
	},
	
	addTrap : function ( trap ) {
		napp.radar.addTrap( trap );
	},
	
	removeTrap : function ( trap ) {
		napp.radar.removeTrap( trap.id );
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
