app.timeline = {
    //animates and change objects between steps
    
	values : {},
	
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
			
			var that = this;
			this.timer = window.setTimeout( function ( ) {
				that.cleanup();
			}, this.frameDuration);
			return;
		}
			
		var that = this;
		
		window.clearTimeout( this.timer );
		
		this.timer = window.setTimeout( function ( ) {
			that.nextFrame();
		}, this.frameDuration)
		
	},
	
	cleanup : function ( ) {
		
		this.smoothTransition = false;
		for ( var i in this.deltaTraps ) 
			app.arena3d.traps.remove( this.deltaTraps[i].id );
		
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
			
			app.arena3d.players.movePlayer( i, x, y, z );
		}
		
		
		for ( var i in this.deltaTraps ) {
			
			app.arena3d.traps.disolve( this.deltaTraps[ i ].id, percent );
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

		
		
		for ( var i in this.deltaTraps ) 
			app.arena3d.traps.remove( this.deltaTraps[i].id );
		
		this.deltaTraps = [];
		
		for ( var i in frame.removedTraps ) {
			
			this.deltaTraps.push( { id : i } );
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
		
		app.radar.setTraps ( traps );
		
		app.arena3d.traps.setTraps( traps );
	},
	
	addTrap : function ( trap ) {
		app.radar.addTrap( trap );
		
		app.arena3d.traps.add( trap );
	},
	
	removeTrap : function ( trap ) {
		app.radar.removeTrap( trap.id );
		//app.arena3d.traps.remove( trap.id );
		
	},
	
	updatePlayer : function ( player ) {
		if ( player.removed ) {
			this.removePlayer( player );
			return ;
		}
		
		app.radar.movePlayer( player.id, player.x, player.y );
		app.status.updatePlayer( player );
	},
	
	removePlayer : function ( player ) {
		app.status.updatePlayer( player );		
		app.radar.removePlayer( player.id );
	},
}
