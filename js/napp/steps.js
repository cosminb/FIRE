napp.steps = {
	
	
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
		
		if ( frame.traps[ posId ] || frame.trapsRem[ posId ]) {
			cause = 1;
		}
		else if ( true  ) { //board has walls 
			cause = 2;
		}
		
		//player.setState
		
		if ( frame.traps[ posId ] ) {
			
			frame.removeTrap( posId );
		}
	},
	
	addBomb   : function ( frame, input ) {
		var playerId = this.ids[ input.player ];
		var trap = new napp.Trap ( playerId, input.x, input.y );
		frame.addTrap( trap );
	},
	
	playerAction : function ( frame, input ) {
		var playerId = this.ids [ input.player ];
		
		frame.players[ playerId ].setAction( input.type );
	},
	
	initialState : function ( steps, players ) {
		
		this.ids = {};
		
		var frame = new napp.FrameState( {} );
		
		var nr = 0;
		
		for ( var i in players ) {
			
			this.ids[ i ] = nr;
			
			
			var player = new napp.PlayerState( nr , players[i].startX, players[i].startY , false);
			frame.players[ nr ] = player;
			nr++;
			
		}
		
		return frame;
	}
}

var count = 10;

napp.FrameState = function (  traps ) {
	this.players = new Array( count )
	this.traps   = Object.create( traps );
	this.trapsAdded = {};
	this.trapsRem  = {};
}

napp.FrameState.prototype.clone = function ( ) {
	var frame = new napp.FrameState( this.traps);
	
	for ( var i in this.players ) {
		frame.players[ i ] = this.players[ i ].clone();
	}
	
	return frame;
}

napp.FrameState.prototype.addTrap = function ( trap ) {
	this.traps[ trap.id ] = trap;
	this.trapsAdded[ trap.id ] = trap;
}
napp.FrameState.prototype.removeTrap = function ( trapId ) {
	this.trapsRem[ trapId ] = this.traps[ trapId ];
	this.traps[ trapId ] = null;
}


napp.PlayerState= function ( id, x, y, removed ) {
	this.id = id;
	this.x = x;
	this.y = y;
	
	//3d space coords
	this.sx = 0;
	this.sy = 0;
	this.sz = 0;
	
	this.removed = removed;
	this.action   = 0;
	this.direction = "0__0";
}

napp.PlayerState.prototype.update3d = function ( ) {
	this.sx = this.x;
	this.sy = this.y;
	//this.sz = 0;
}

napp.PlayerState.prototype.setPos = function ( x, y ) {
	this.x = x;
	this.y = y;
	this.update3d();
}

napp.PlayerState.prototype.moveBy = function ( dx, dy ) {
	this.x += dx;
	this.y += dy;
	
	this.direction = dx + "__" + dy;
	
	this.update3d();
}

napp.PlayerState.prototype.setAction = function ( action  ){ 
	this.action = action;
}

napp.PlayerState.prototype.clone = function ( ) {
	return new napp.PlayerState( this.id, this.x, this.y, this.removed );
}





napp.Trap= function ( playerId, x, y) {
	this.id = x + "__" + y;
	
	this.x = x;
	this.y = y;
	
	//3d space coords
	this.sx = 0;
	this.sy = 0;
	this.sz = 0;
	
	//
	this.playerId = playerId;
}

napp.PlayerState.prototype.update3d = function ( ) {
	this.sx = this.x;
	this.sy = this.y;
	//this.sz = 0;
}

