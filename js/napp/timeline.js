napp.timeline = {
	
	values : {

	},
	
	frameDuration : 700, 
	auto : true, 
	
	play : function ( frameId ) {
		
		this.auto = true;
		
		this.currentFrame = frameId || 0;
		
		window.clearTimeout( this.timer );
		
		
		this.goto( this.currentFrame ) ;
		
		this.currentFrame++;
		
		
		this.scheduleNextFrame();
		
	},
	
	scheduleNextFrame : function ( ) {
		
		if ( !this.auto || this.currentFrame >= this.frames.length )  {
			//this.smoothTransition  = false;
			return;
		}
			
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
	
	
	updateTransition : function ( ) {
		if ( !this.smoothTransition ) return;
		
		var time = Date.now();
		
		var percent = (time - this.startTime )/ this.frameDuration;
		
		if ( percent > 1 ) {
			percent = 1;
			this.smoothTransition = false;
		}
		
		for ( var i in this.delta ) {
			if ( !this.delta[ i ] )  continue;
			
			var delta = this.delta[ i ];
			
			var x = delta.sx + percent*delta.dx;
			var y = delta.sy + percent*delta.dy;
			var z = delta.sz + percent*delta.dz;
			
			napp.arena3d.players.movePlayer( i, x, y, z );
		}
		
	},
	
	transitionTo : function ( id ) {
		
		var frame = this.frames[ id ];
		if ( !frame ) return;
		
		
		this.startTime = Date.now();
		
		this.endTime   = this.startTime + this.frameDuration
		
		this.smoothTransition = true;
		
		
		for ( var i in frame.players ) {
			this.updatePlayer( frame.players[ i ] );
		}
		
		for ( var i in frame.addedTraps ) {
			this.addTrap( frame.addedTraps[ i ] );
		}
		
		for ( var i in frame.removedTraps ) {
			this.removeTrap( frame.removedTraps[ i ] );
		}
		
		
		var prevFrame = this.frames[ id - 1 ];
		
		this.delta = [];
		
		for ( var i in frame.players ) {
			var dp = {};
			
			dp.sx = prevFrame.players[ i ].sx;
			dp.sy = prevFrame.players[ i ].sy;
			dp.sz = prevFrame.players[ i ].sz;
			
			dp.dx = frame.players[ i ] . sx - prevFrame.players[ i ].sx;
			dp.dy = frame.players[ i ] . sy - prevFrame.players[ i ].sy;
			dp.dz = frame.players[ i ] . sz - prevFrame.players[ i ].sz;
			dp.times = 1;
			
			if ( !dp.dx && !dp.dy && !dp.dz ) continue;
			
			this.delta[ i ] = dp;
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
		
		napp.arena3d.traps.setTraps( traps );
	},
	
	addTrap : function ( trap ) {
		napp.radar.addTrap( trap );
		
		napp.arena3d.traps.add( trap );
	},
	
	removeTrap : function ( trap ) {
		napp.radar.removeTrap( trap.id );
		napp.arena3d.traps.remove( trap.id );
		
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
