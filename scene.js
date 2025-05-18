import * as THREE from 'three';
import { ARButton } from 'three/addons/webxr/ARButton.js';

let camera, scene, renderer;
let tableGroup; // Necesario para añadir la mesa a la escena

// Constants (Necesarias para la posición de la cámara y luces)
const tableSurfaceY = -0.4;

export function initScene(container) {
    console.log("Configurando escena Three.js...");

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, tableSurfaceY + 1.5, 1);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearAlpha(0);
    renderer.xr.enabled = true;
    renderer.shadowMap.enabled = true; // Activar sombras
    container.appendChild(renderer.domElement);

    const arButton = ARButton.createButton(renderer);
    container.appendChild(arButton);

    // Iluminación
    scene.add(new THREE.AmbientLight(0xAAAAAA));
    const spotLight = new THREE.SpotLight(0xffffff, 0.9, 0, Math.PI / 4, 1);
    spotLight.position.set(0, tableSurfaceY + 2, -1.5);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);
    // La cámara se añade al final en main.js o donde se gestione el renderizado principal

    console.log("Configuración de escena completa.");

    return { scene, camera, renderer, tableGroup };
}

export function getScene() { return scene; }
export function getCamera() { return camera; }
export function getRenderer() { return renderer; }
export function getTableGroup() { return tableGroup; }
export function setTableGroup(group) { tableGroup = group; }

export function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}