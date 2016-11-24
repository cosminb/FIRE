var sun = new Image();
var moon = new Image();
var earth = new Image();
var ctx;

var frustum;
var cameraViewProjectionMatrix;

function init(){
	sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
	moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
	earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
	ctx = document.getElementById('canvas').getContext('2d');
	
	ctx.globalCompositeOperation = 'destination-over';
	
	
	
	frustum = new THREE.Frustum();
	cameraViewProjectionMatrix = new THREE.Matrix4();
	
	
	
}

var CANVAS_HEIGHT = 702;
var CANVAS_WIDTH = 702;

function toScreenPosition(obj, camera)
{
	var vector = new THREE.Vector3();
	
	var widthHalf = 0.5*CANVAS_WIDTH;
	var heightHalf = 0.5*CANVAS_HEIGHT;
	
	obj.updateMatrixWorld();
	vector.setFromMatrixPosition(obj.matrixWorld);
	vector.y = 200;
	
	vector.project(camera);
	
	vector.x = ( vector.x * widthHalf ) + widthHalf;
	vector.y = - ( vector.y * heightHalf ) + heightHalf;
	
	return { 
		x: vector.x,
		y: vector.y
	};
	
};




function draw(isa) {
	
	
	//return;
	
	ctx.save();
	
	ctx.beginPath();            /// add a beginPath here
	
	ctx.rect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
	//ctx.clip();
	
	
	ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
	
	
	ctx.fillStyle = 'rgba(200,200,200,1)';
	//ctx.strokeStyle= '#333';
	
// every time the camera or objects change position (or every frame)
	
	//camera.updateMatrixWorld(); // make sure the camera matrix is updated
	app.scene.camera2.matrixWorldInverse.getInverse( app.scene.camera2.matrixWorld );
	cameraViewProjectionMatrix.multiplyMatrices( app.scene.camera2.projectionMatrix, app.scene.camera2.matrixWorldInverse );
	frustum.setFromMatrix( cameraViewProjectionMatrix );
	
	
	ctx.textBaseline = "top"
	
	//var poss = [];
	app.objects.eachPlayer( function (p , i) {
		var pos = toScreenPosition( p.obj, app.scene.camera2 )
		//poss.push( pos );
		//{
		if ( frustum.containsPoint( p.obj.position ) ) {
		//if ( pos.x >= 0 && pos.x <= 700 && pos.y >= 0 && pos.y<= 700 ) {
			//ctx.strokeStyle= '#333';
			
			ctx.strokeRect(pos.x,pos.y-20,100 , 20);
			
			//ctx.fillStyle = 'rgba(20,20,20,1)';
			//ctx.strokeStyle = '#ddd';

			ctx.fillText( "player " + i, pos.x + 10, pos.y - 20 );
			//ctx.strokeText( "player " + i, pos.x + 10, pos.y - 20 );
		}
	});
	ctx.restore();
	
	
	//console.log( poss );
	return;
	isa = true;
	
	if ( isa ) {
	ctx.fillStyle = 'rgba(0,0,0,0)';
	
	//ctx.clearRect(0,0,1000,1000); // clear canvas
	
	ctx.fillStyle = 'rgba(0,0,0,0.4)';
	ctx.strokeStyle = 'rgba(0,153,255,0.4)';
	
	ctx.save();
	ctx.translate(150,150);
	
	// Earth
	var time = new Date();
	ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
	ctx.translate(105,0);
	
	ctx.restore();
	// Moon
	ctx.save();
	ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
	ctx.translate(0,28.5);
	
	for ( var i = 0; i < 10; i++ ) {
		ctx.beginPath();
		ctx.arc(i*10 + 150,i*10 + 150,105,0,Math.PI*2,false); // Earth orbit
		ctx.stroke();
	}
	
	ctx.restore();
	
	}
	
	ctx.save();
	
	ctx.moveTo(0,0);
	ctx.rotate( 0, 0 );
	ctx.translate(0,0);
	
	// Earth
	var time = new Date();
	ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
	ctx.translate(105,0);

	
	ctx.restore();
	
	
	//ctx.drawImage(sun,0,0,700,700);
	
}

