app.timeline = {
	
	
	animations : [],
	future     : [],
		
	namedAnimations : {},
	
	add : function ( name , obj, parameters ) {
		
		if ( this.namedAnimations[ name ] ) {
			var animation = this.namedAnimations[name];
			
			animation.addKeyFrame( parameters );
			
			if ( animation.isSleeping ) {
				animation.nextKeyFrame();
				this.animations.push( animation ) ;
			}
			return;
		}
		
		else { 
			var animation = new app.animation( obj, parameters );
			this.animations.push( animation );
			this.namedAnimations[name] = animation;
		}
	},
	
	getTime : function () {
		return new Date().getTime();
	},
	runAnimations : function ( ) {
		
		var time = this.getTime(); 
		
		for ( var i = 0; i< this.animations.length; i++ ) {
			
			var end = this.runAnimationStep( this.animations[ i ] , time);
			
			if ( end ) {
				this.animations.splice( i, 1 );
				i--;	
			}
		}
		
	},
	
	runAnimationStep : function ( animation , time ) {
		
		var elapsed = time - animation.start;
		var step    = elapsed / animation.duration
		
		
		var values  = animation.step( step, elapsed );
		var obj     = animation.obj;
		
		
		for ( var i in animation.currentPosition ) {
			obj.position[i] = animation.currentPosition[i]
		}
		
		if ( time > animation.end ) {
			
			return animation.nextKeyFrame();
		}
	}
}


app.animation = function ( obj, parameters ) {
	
	this.frames = [];
	
	this.duration = parameters.duration;
	
	this.obj   = obj.obj;
	
	this.endPosition  = parameters.endPosition;
	this.startPosition = { x : this.obj.position.x, z : this.obj.position.z };
	
	this.currentPosition = { x : 0, z : 0 };
	
	this.deltaPosition = { x : 0, z : 0 };
	
	this.start = app.timeline.getTime();
	this.end   = this.start + this.duration;
	
	
	this.computeDeltaPosition();
	
	
	console.log( this );
	
}

app.animation.prototype.computeDeltaPosition = function ( ) {
	this.deltaPosition.x =  this.endPosition.x - this.startPosition.x;
	this.deltaPosition.z = this.endPosition.z - this.startPosition.z;
}

app.animation.prototype.step = function ( time ) {
	
	this.currentPosition.x = this.startPosition.x + this.deltaPosition.x * time;
	this.currentPosition.z = this.startPosition.z + this.deltaPosition.z * time;
	
	//console.log( this.currentPosition );
}

app.animation.prototype.addKeyFrame = function( parameters ) {
	this.frames.push( parameters );
}

app.animation.prototype.nextKeyFrame = function () {
	if (this.frames.length ) {
		
		var frame = this.frames.shift();
		
		this.endPosition.x = frame.endPosition.x;
		this.endPosition.z = frame.endPosition.z;
		
		
		this.startPosition.x = this.currentPosition.x;
		this.startPosition.z = this.currentPosition.z;

		this.start = app.timeline.getTime(); 
		this.end   = this.start + this.duration;
		this.computeDeltaPosition();
	}
	else {
		this.isSleeping = true;
		return true;
	}
}

