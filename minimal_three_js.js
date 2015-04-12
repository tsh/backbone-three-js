var renderer,
	scene,
	camera;
	
function init(){
	scene = new THREE.Scene();
	
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000, 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight); // or window.innerWidth/Height
	renderer.shadowMapEnabled = true;
	
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.x = 15;
	camera.position.y = 16;
	camera.position.z = 13;
	camera.lookAt(scene.position);
	
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