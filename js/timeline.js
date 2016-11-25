app.timeline = {

    screenPlay : [],
    currentScene : null,
    nrSteps : 1000,
	
	frameCount : 50,
    

    addScene : function ( step ) {
         var scene = { items : [], index : this.screenPlay.length } ;
         
         var index =  this.screenPlay.push ( scene )  
         
         this.inputScene = scene;
    },
    addToScene : function ( id,  endValue ) {
        this.inputScene.items[ id ] = endValue
    },
    
    

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

         var nextScene = this.screenPlay.shift();
         
         if ( !nextScene ) return;
         
		 
		 this.currentSceneId = nextScene.index;
		
		 app.events.nextStep( this.currentSceneId );
		
         var nextItems = nextScene.items;

         this.frameCount = nextScene.frameCount || 50;
		 
		 this.frameMiddleCount = Math.round( this.frameCount / 2 )
         
         
         var currentScene = this.currentScene
         var currentItems = currentScene.items;
         
         console.log( "STARTING SCENE", nextItems);

         for( var i in nextItems ) {
             var newItem = nextItems[ i ];
             var item = currentItems[ i ];

             item.animation = newItem.animation || ani.walk;       
             

             item.skip = false;
             if ( typeof item.animation == "string" ) item.animation = ani[ item.animation ];
             
             item.animation.setupStage( item,  newItem , this.frameCount);             
         }

         for ( var i in currentItems ) {
            if ( nextItems[i]) continue;
              currentItems[i].skip = true;
         }


         
         this.nrSteps = 0;
    },
    
    
	pause : function ( ) {
		this.paused = true;
	},
	resume : function ( ) {
		this.paused = false;
		animate();
	},
    runAnimations : function ( ) {
        
		if ( this.paused ) return;
		
           var step = this.nrSteps++;
           
           if ( step > this.frameCount ) 
              this.startScene();  
          
           if ( !this.currentScene ) 
              return;

		   if ( step == this.frameMiddleCount )
			   app.events.stepMiddle( this.currentSceneId );
		   
          var step = this.nrSteps;

          
          for ( var i in this.currentScene.items ) {
                var item = this.currentScene.items[ i ];
               if( item.skip ) continue;
               item.animation.step( item, step );
               
               var player = app.objects.getPlayer(  i );

               for ( var i in item.values.position ) {
				   

				  player.obj.position[ i ]  = item.values.position[ i ];
				   
				}
          }
    },
	
	
}


var ani = {}

ani.walk = {
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
		if ( item.values.position.y < 0 ) item.values.position.y = 0;
		
		item.values.position.z = item.startValues.z + step * item.deltas.z
	},

	
}

