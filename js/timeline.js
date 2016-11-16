app.timeline = {
	
	
	animations : [],
	future     : [],
		
	namedAnimations : {},
	
    
    screenPlay : [],
    currentStep : {},
    currentStepIndex : 0,
    objs : {},
    
    addScene : function ( step ) {
         var scene = { items : [] } ;
         
         var index =  this.screenPlay.push ( scene )  
         
         this.inputScene = scene;
    },
    addToScene : function ( id,  endValue ) {
        this.inputScene.items[ id ] = endValue
    },
    
    
    currentScene : null,
    
    initCurrentScene : function ( ) {         
         //this.currentScene = this.screenPlay.shift();        

         var scene = { items : [] };
         this.currentScene = scene;
         
         var cs = this.screenPlay.shift().items;
         for ( var i in cs ) {
             scene.items[ i ] = { endValues : cs[ i ] };
         }
         
    },
    startScene : function ( ) {

        
        if ( this.screenPlay.length < 2 ) 
             return;
         
         
        if ( !this.currentScene ) 
                this.initCurrentScene();
         console.log();

         var nextScene = this.screenPlay.shift();
         
         if ( !nextScene ) return;
         
         var nextItems = nextScene.items;
         
         var currentScene = this.currentScene
         var currentItems = currentScene.items;
         
         for( var i in nextItems ) {
             var newItem = nextItems[ i ];
             var item = currentItems[ i ];
             
             if ( !newItem.animation ) newItem.animation = ani.jump;

             newItem.animation.setupStage( item,  newItem , 50);
             
             item.animation = newItem.animation;
         }
         
         this.nrSteps = 0;
    },
    
    runStep   : function ( ) {
        
    },
    
    
    nrSteps : 1000,
    
    _runAnimation : function ( ) {
        
           var step = this.nrSteps++;
           
           if ( step > 50 ) 
              this.startScene();  
          
           if ( !this.currentScene ) 
              return;

          var step = this.nrSteps;

          
          for ( var i in this.currentScene.items ) {
                var item = this.currentScene.items[ i ];
               item.animation.step( item, step );
               
               var player = app.objects.getPlayer( "player_" + i );
               
               
               for ( var i in item.values.position ) 
                   
                player.obj.position[ i ]  = item.values.position[ i ];
          }
    },
	
	getTime : function () {
		return new Date().getTime();
	},
	runAnimations : function ( ) {
		return this._runAnimation(); 
		var time = this.getTime(); 
		
		for ( var i = 0; i< this.animations.length; i++ ) {
			
			var end = this.runAnimationStep( this.animations[ i ] , time);
			
			if ( end ) {
				this.animations.splice( i, 1 );
				i--;	
			}
		}
		
	},
    
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


var ani = {}

ani.defaultAnimation = {
     setupStage : function ( item, value, steps ) {
          item.startValues = item.endValues;
          
          item.endValues = value;
          
          item.deltas    = {};
          
          item.values = { position : {} };
          
          for ( var i in item.endValues ) {
                item.deltas[ i ] = ( item.endValues[ i ] - item.startValues[ i ] ) / steps;
          }
     },
     
     step    : function ( item, step  ) {
         item.values.position.x = item.startValues.x + step * item.deltas.x
         item.values.position.y = item.startValues.y + step * item.deltas.y
         item.values.position.z = item.startValues.z + step * item.deltas.z
     },
}



ani.jump = {
	
	setupStage : function ( item, value, steps ) {
		item.startValues = item.endValues;
		
		item.endValues = value;
		
		item.deltas    = {};
		
		item.values = { position : {y : item.startValues.y} };
		
		for ( var i in item.endValues ) {
			item.deltas[ i ] = ( item.endValues[ i ] - item.startValues[ i ] ) / steps;
		}
	},
	
	step    : function ( item, step  ) {
		item.values.position.x = item.startValues.x + step * item.deltas.x
		///item.values.position.y = item.startValues.y + step * item.deltas.y
		
		item.values.position.y += ( step < 25 ) ? 10 : -10
		
		item.values.position.z = item.startValues.z + step * item.deltas.z
	},

	
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

