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
    
    nrSteps : 1000,
    
    runAnimations : function ( ) {
        
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

