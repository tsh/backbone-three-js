var renderer,
	scene,
	camera;
	
function init(){
	scene = new THREE.Scene();
	
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000, 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight); 
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
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.castShadow = true;
	scene.add(cube);
	
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
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
	
	document.body.appendChild(renderer.domElement);
	
	render();
}

function render(){
	requestAnimationFrame(render);
	renderer.render(scene, camera);
};

function handleResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload=init;
window.addEventListener('resize', handleResize, false);