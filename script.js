// Simulación de datos (en una app real, vendrían de una API/backend)
const workOrders = {
    "MAQ-005": [
        { id: "OT-1023", description: "Ruido extraño en motor", priority: "Alta" }
    ],
    "EST-001": []
};

// Datos del activo seleccionado actualmente
let currentSelectedAsset = null;

document.addEventListener('DOMContentLoaded', () => {
    const sceneEl = document.querySelector('a-scene');
    const infoPanel = document.getElementById('info-panel');
    const infoTitle = document.getElementById('info-title');
    const infoId = document.getElementById('info-id');
    const infoStatus = document.getElementById('info-status');
    const infoOts = document.getElementById('info-ots');
    const btnCreateOt = document.getElementById('btn-create-ot');
    const btnViewDocs = document.getElementById('btn-view-docs');
    const btnClosePanel = document.getElementById('btn-close-panel');

    const assets = sceneEl.querySelectorAll('.interactable');

    // Añadir listener a cada activo
    assets.forEach(asset => {
        asset.addEventListener('click', (event) => {
            const clickedAsset = event.target;
            currentSelectedAsset = clickedAsset.dataset; // Guardar datos del activo

            // Poblar panel
            infoTitle.setAttribute('value', currentSelectedAsset.assetName);
            infoId.setAttribute('value', `ID: ${currentSelectedAsset.assetId}`);
            infoStatus.setAttribute('value', `Estado: ${currentSelectedAsset.status}`);

            // Buscar OTs asociadas (simulado)
            const assetOts = workOrders[currentSelectedAsset.assetId] || [];
            infoOts.setAttribute('value', `OTs Abiertas: ${assetOts.length}`);
            // Aquí podrías listar las OTs si hubiera más espacio/detalle

            // Mostrar panel delante de la cámara
            const camera = document.querySelector('a-camera');
            const cameraPosition = camera.getAttribute('position');
            const cameraRotation = camera.getAttribute('rotation');

            // Colocar el panel a 1.5m delante de la cámara (ajustar según sea necesario)
            // Esto es muy básico, una solución real usaría la dirección de la cámara.
             // Obtener la dirección de la cámara
            let direction = new THREE.Vector3();
            camera.object3D.getWorldDirection(direction);

            // Calcular la posición delante de la cámara
            let panelPosition = new THREE.Vector3();
            panelPosition.copy(camera.object3D.position).add(direction.multiplyScalar(1.5));

            infoPanel.setAttribute('position', `${panelPosition.x} ${panelPosition.y} ${panelPosition.z}`);

            // Hacer que el panel mire a la cámara (simplificado, solo rotación Y)
            // Una solución completa usaría look-at
             // Calcular el ángulo Y para que mire hacia la cámara (aproximado)
             const lookAtTarget = new THREE.Vector3(cameraPosition.x, panelPosition.y, cameraPosition.z); // Mantener la altura del panel
             const targetQuaternion = new THREE.Quaternion();
             const dummyObject = new THREE.Object3D();
             dummyObject.position.copy(panelPosition);
             dummyObject.lookAt(lookAtTarget);
             infoPanel.object3D.quaternion.copy(dummyObject.quaternion); // Aplicar rotación


            infoPanel.setAttribute('visible', true);
        });
    });

    // --- Listeners de los botones del panel ---

    btnClosePanel.addEventListener('click', () => {
        infoPanel.setAttribute('visible', false);
        currentSelectedAsset = null; // Limpiar selección
    });

    btnCreateOt.addEventListener('click', () => {
        if (!currentSelectedAsset) return;
        // Simular creación de OT
        console.log(`Solicitando creación de OT para: ${currentSelectedAsset.assetId} (${currentSelectedAsset.assetName})`);
        alert(`Simulación: Crear OT para ${currentSelectedAsset.assetName}`);
        // Aquí se abriría un formulario XR más detallado o se enviaría una petición al backend.
        infoPanel.setAttribute('visible', false); // Cerrar panel tras acción
    });

    btnViewDocs.addEventListener('click', () => {
        if (!currentSelectedAsset) return;
        // Simular visualización de documentos
        console.log(`Solicitando ver documentos para: ${currentSelectedAsset.assetId}`);
        alert(`Simulación: Ver documentos de ${currentSelectedAsset.assetName}.\n(Archivos permitidos: ${'.txt, .doc(x), .xls(x), .pdf, .png, .jpg, .gif, .dwg'}, Máx 5MB)`);
        // Aquí se buscarían documentos asociados en el backend y se mostrarían
        // en otro panel, quizás como una lista o miniaturas.
        // La visualización de PDF/DOC/DWG en WebXR es compleja y podría requerir
        // conversión previa o enlaces para descargar. Imágenes son más fáciles.
        infoPanel.setAttribute('visible', false); // Cerrar panel tras acción
    });

     // --- Efecto hover simple para botones ---
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        const originalColor = button.getAttribute('color');
        button.addEventListener('mouseenter', () => { button.setAttribute('color', '#DDDDDD'); });
        button.addEventListener('mouseleave', () => { button.setAttribute('color', originalColor); });
    });

});
