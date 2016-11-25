app.producer = {
	
	
	newGame : function ( game ) {
		
		this.data = {};
		
		var level = this.data.level = 0;
		
		level += ( game.steps.length < 10 ) ? 0 : 100;
		
		
		var watchList = this.watchList = [];
		
		for ( var i in game.results ){
				watchList.push( { p : i, score : game.results[i ] } )
		}
		
		watchList.sort( function ( a, b ) { return b.score - a.score } );
		
		console.log( watchList );
        
        
        this.target = 0;
        this.hero = 0;
        this.stepnr = 0;
	},
	
	afterAddingStep : function ( ) {
		if ( this.target == 0 ) {
             this.setNewCameraTarget( );
             
             this.target = 5;
        } 
        
        else this.target-= 1;
        
	},
	
	addAction : function ( type ) {
		
	},
    
    
    setNewCameraTarget : function ( ) {
        
        
        var index = Math.round( Math.random() * (this.watchList.length -1 ) );
        
        var playerId = this.watchList[ index ].p;
        
        if ( app.stats.currentStep.players[ playerId ] ) {
               playerId = Object.keys( app.stats.currentStep.players ) [ 0 ];
        }
        
        if ( !playerId ) return;
        
        
        var player = app.stats.currentStep.players[ playerId ];
        
        if ( !player ) return;

        
        var shotId = Math.round( Math.random() * ( this.shots.length - 1 ) );
        
        var shot =  this.shots[ shotId ] ( player, app.units.idol );
        
        var cameraShot = { stepId :  app.stats.currentStep.id, shot : shot };
        
        app.timeline.cameraShots[ cameraShot.stepId ] = cameraShot;
        
    },
    
    shots : [
        function ( target, idol ) {
            var dz = target.x - idol.x;
            var dx = - (target.z - idol.z );
            var angle = Math.atan2( dx, dz );
            
                if (angle < 0)
            angle = Math.abs(angle);
        else
            angle = 2*Math.PI - angle;

        angle = 180 * angle / Math.PI;
    
            var shot = { type : "fixed", params : [target.x, target.z, Math.random() * 10 + 20,  50 , angle] };
            
            return shot
        },
        
    ],
	
	ct : {
		move : 1,
		kill : 10,
		bomb : 20,
		
	}
	
	
}
