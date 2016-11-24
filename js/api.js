app.api = {
    resetAll : function ( ) {
        //dmove players 
        //remove all Bombs
        //reset idol
        
    },
    
    initMap : function ( ) {
        
    },
    
    
    players : {},
    
    addPlayer : function ( p, x, z, color ) {

        var pos = pos3d( x, z );
            
        this.players.initialPosition = pos;
        
        app.objects.addPlayer( "p" + p, x, z, color );
    },
    
    addFrame : function ( ) {
      app.timeline.addScene();        
    },
    
    movePlayer : function ( p,  x, z, animationType ) {
        pos = pos3d( x, z );
        
        app.timeline.addToScene( p, { x: pos.x, y : pos.y, z : pos.z, point : { x , z }, animation : animationType || "walk" } )
    }, 
    
    killPlayer : function ( p ) { 
      //  pos = this.initialPosition[ p ];
        
        app.timeline.addToScene( p, { x : pos.x, y : pos.y, z : pos.z, animation : "jump" } ); 
    },
    
    
    addBomb : function ( ) {
        
    },
    
    explodeBomb : function ( ) {
        
    },
    
    useSonar : function(){

    },

    playerWin : function(){

    },

    resetPlayersPosition : function( players ){
      

      app.objects.eachPlayer( function ( item, id ) {

console.log( id, players );

            item.initialX = players[ id ].startX;
            item.initialZ = players[ id ].startY;

            item.xx = players[ id ].startX;
            item.xz = players[ id ].startY;


            app.api.movePlayer( id, item.xx, item.xz, "walk" );



      }) 
    },

}
