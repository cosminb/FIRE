app.frameBuilder = {
	
	
	build : function ( players, input ) {
		var steps = Array( input.length + 1 );
		
		steps[ 0 ]  = this.initialState( steps, players );
		
		for ( var i = 0; i <input.length;i++ )
			this.addStep( steps, i, input[ i ] );
		
		return steps;
	},
	
	addStep : function ( frames, nr, inputs ) {
		var frame = frames[ nr + 1 ] = frames[ nr ].clone();
		
		for ( var i  in inputs ) {
			this.handleInput(frame, inputs[ i ] );
		}
	},
	
	handleInput : function (frame, input ) {
		switch ( input.type ) {
			case "move" : 
				this.movePlayer( frame, input );
				break;
			case "kill":
				this.remPlayer( frame, input );
				break;      
				
			case "bomb" :
				this.addBomb( frame, input );
				break;
				
			case "sonar" : 
				this.playerAction ( frame, input );
		}
		
	},
	
	movePlayer : function ( frame, input ) {
		var id = this.ids[ input.player ];
		frame.players[ id ].moveBy( 1*input.x, 1*input.y );
		
	},
	
	remPlayer : function ( frame, input ) {
		var id = this.ids[ input.player ];
		var player = frame.players[ id];
		var posId = player.x + "__" + player.y;
		
		var cause = 0;
		
		if ( frame.traps[ posId ] || frame.removedTraps[ posId ]) {
			cause = 1;
		}
		else if ( true  ) { //board has walls 
			cause = 2;
		}
		
		//player.setState
		
		if ( frame.traps[ posId ] ) {
			
			frame.removeTrap( posId );
		}
		
		player.sy = 2540;
		
		player.removed = true;
	},
	
	addBomb   : function ( frame, input ) {
		var playerId = this.ids[ input.player ];
		var trap = new app.Trap ( playerId, input.x, input.y );
		frame.addTrap( trap );
	},
	
	playerAction : function ( frame, input ) {
		var playerId = this.ids [ input.player ];
		
		frame.players[ playerId ].setAction( input.type );
	},
	
	initialState : function ( steps, players ) {
		
		this.ids = {};
		
		var frame = new app.FrameState( {} );
		
		var nr = 0;
		
		for ( var i in players ) {
			
			this.ids[ i ] = nr;
			
			
			var player = new app.PlayerState( nr , players[i].startX, players[i].startY , false);
			frame.players[ nr ] = player;
			nr++;
			
		}
		
		return frame;
	}
}

app.FrameState = function (  traps ) {
	this.players = new Array( app.players.count )
	this.traps   = Object.create( traps );
	this.addedTraps = {};
	this.removedTraps = {};
}

app.FrameState.prototype.clone = function ( ) {
	var frame = new app.FrameState( this.traps);
	
	for ( var i in this.players ) {
		frame.players[ i ] = this.players[ i ].clone();
	}
	
	return frame;
}

app.FrameState.prototype.addTrap = function ( trap ) {
	this.traps[ trap.id ] = trap;
	this.addedTraps[ trap.id ] = trap;
}
app.FrameState.prototype.removeTrap = function ( trapId ) {
	this.removedTraps[ trapId ] = this.traps[ trapId ];
	this.traps[ trapId ] = null;
}


app.PlayerState= function ( id, x, y, removed, direction, sy ) {
	this.id = id;
	this.x = x;
	this.y = y;
	
	//3d space coords
	this.sx = 0;
	this.sy = sy || 0;
	this.sz = 0;
	
	this.removed = removed;
	this.action   = 0;
	this.direction = direction || "0__0";
	
	this.update3d();
}

app.PlayerState.prototype.update3d = function ( ) {
	this.sx = app.units.getX( this.x );
	//this.sy = this.y;
	this.sz = app.units.getZ(this.y);
	
}

app.PlayerState.prototype.setPos = function ( x, y ) {
	this.x = x;
	this.y = y;
	this.update3d();
}

app.PlayerState.prototype.moveBy = function ( dx, dy ) {
	this.x += dx;
	this.y += dy;
	
	this.direction = dx + "__" + dy;
	
	this.update3d();
}

app.PlayerState.prototype.setAction = function ( action  ){ 
	this.action = action;
}

app.PlayerState.prototype.clone = function ( ) {
	var player =  new app.PlayerState( this.id, this.x, this.y, this.removed , this.direction, this.sy);
	
	
	return player;
}





app.Trap= function ( playerId, x, y) {
	this.id = x + "__" + y;
	
	this.x = x;
	this.y = y;
	
	//3d space coords
	this.sx = 0;
	this.sy = 0;
	this.sz = 0;
	
	//
	this.playerId = playerId;
	
	this.update3d();
}

app.Trap.prototype.update3d = function ( ) {
	this.sx = app.units.getX( this.x );
	//this.sy = this.y;
	this.sz = app.units.getZ(this.y);
}

