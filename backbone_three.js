var renderer,
	scene,
	camera,
	cube,
	WIDTH = 800,
	HEIGHT = 600;
	
function init(){
	scene = new THREE.Scene();
	
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000, 1.0);
	renderer.setSize(WIDTH, HEIGHT); 
	renderer.shadowMapEnabled = true;
	
	// elements of the scene
	// Plane
	var planeGeometry = new THREE.PlaneGeometry(20, 20);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	// by default plane is vertical; rotate to horizontal. 90 deg.
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 0;
	plane.position.y = -2;
	plane.position.z = 0;
	scene.add(plane);
	
	// Cube
	var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
	var cubeMaterial = new THREE.MeshLambertMaterial({color: 'red'});
	cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.castShadow = true;
	scene.add(cube);
	
	camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 1000);
	camera.position.x = 15;
	camera.position.y = 16;
	camera.position.z = 13;
	camera.lookAt(scene.position);
	
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(10, 20, 20);
	spotLight.shadowCameraNear = 20;
	spotLight.shadowCameraFar = 50;
	spotLight.castShadow = true;
	scene.add(spotLight);
	
	
	$("#canvas-container").append(renderer.domElement);
	
	render();
}

function render(){
	// scene.getObjectByName('cube').material.opacity = 1
	// scene.getObjectByName('cube').material.color = new THREE.Color(control.color);
	
	requestAnimationFrame(render);
	renderer.render(scene, camera);
};

function handleResize() {
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
	renderer.setSize(WIDTH, HEIGHT);
}

window.onload=init;
window.addEventListener('resize', handleResize, false);

ControlView = Backbone.View.extend({
	el: "#control-holder",
	events: {
		"change input": "changeOpacity" 
	},
	
	initialize: function(){
		this.render();
	},
	
	render: function(){
		$(this.el).append('<input type="number" id="cube-red" placeholder="RED" min=0 max=1 step=0.1><input type="number" id="cube-green" placeholder="GREEN" min=0 max=1 step=0.1><input type="number" id="cube-blue" placeholder="BLUE" min=0 max=1 step=0.1>')
	},
	
	changeOpacity: function(e){
		cube.material.color.r = $("#cube-red").val();
		cube.material.color.g = $("#cube-green").val();
		cube.material.color.b = $("#cube-blue").val();
	}
});

var controlView = new ControlView();