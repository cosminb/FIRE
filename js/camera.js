app.camera = {
    
    
    moveSq : function ( a, b) {
        a = pos3d( a.x, a.y, a.z );

        b = pos3d( b.x, b.y, b.z );
        
        
        app.scene.camera2.lookAt( a ) ;
        app.scene.camera2.position = b;
    },
    
    
}