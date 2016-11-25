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
	
		var step = { logs : [], players : [], id : this.data.steps.length, removedPlayers : {} }
		
		this.data.steps.push( step );
		
		this.currentStep = step;
		
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
