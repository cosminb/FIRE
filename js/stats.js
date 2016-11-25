app.stats = {
	
	
	init : function ( ) {
		this.clear();
	},
	
	clear : function ( ) {
		this.data = {
			steps : [] 
		};
	},
	
	data : {},
	
	addStep : function ( ) {
	
		var step = { logs : [], players : [], id : this.data.steps.length, removedPlayers : {} , bombs : []}
		
		this.data.steps.push( step );
		
		this.currentStep = step;
		
	},
	
	addBomb: function ( id, x, y, color ) {
         this.currentStep.bombs.push ( { id, x, y, color } );
    },
    
	log : function (type, data ) {		
		var log = app.ui.logs.getLog( type, data );
		this.currentStep.logs.push( log );
	},
	
	updatePlayer : function ( p, x, z ) {
		this.currentStep.players[ p ] = { x : x, z : z }
	},
    
    removePlayer : function ( p ) {
       this.currentStep.removedPlayers[ p ] = true;
    }
}
