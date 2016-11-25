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
	
	addStep : function ( ) {
		if ( this.target == 0 ) {
             
        } 
	},
	
	addAction : function ( type ) {
		
	},
	
	ct : {
		move : 1,
		kill : 10,
		bomb : 20,
		
	}
	
	
}
