Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZThmYzBhNC01MzE3LTRiNjYtYjYzMy1hNzkwOTg5YzE5MmYiLCJpZCI6MTI2MzA4LCJpYXQiOjE2NzczNjUwNzN9.BAp0iKzZzQlQYjwsjb9FIvWkRJ1p6ykJhh1ALL-D5wQ';


const viewer = new Cesium.Viewer('cesiumContainer', {
    baseLayerPicker: true,
    geocoder: true,
    homeButton: true,
    infoBox: true,
    navigationHelpButton: true,
    sceneModePicker: true,
    timeline: true,
    animation: true,
    fullscreenButton: true,
});

const tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId('1597040')
    })
);

viewer.zoomTo(tileset);

// Store the initial view
let initialView;

viewer.zoomTo(tileset).then(() => {
    initialView = {
        position: viewer.camera.position.clone(),
        heading: viewer.camera.heading,
        pitch: viewer.camera.pitch,
        roll: viewer.camera.roll,
    };
});

// Update the home view when the home button is clicked
viewer.homeButton.viewModel.command.beforeExecute.addEventListener((e) => {
    e.cancel = true;
    if (initialView) {
        viewer.camera.flyTo({
            destination: initialView.position,
            orientation: {
                heading: initialView.heading,
                pitch: initialView.pitch,
                roll: initialView.roll,
            },
        });
    }
});

viewer.clock.currentTime = Cesium.JulianDate.fromDate(new Date('2023-03-15T10:00:00Z'));

viewer.scene.backgroundColor = Cesium.Color.BLACK;
viewer.scene.shadowMap.enabled = true;
viewer.scene.highDynamicRange = true;
viewer.scene.sun.position = Cesium.SunPosition.compute(viewer.clock.currentTime);
viewer.scene.sun.intensity = 2.0;
viewer.scene.light.color = new Cesium.Color(0.8, 0.8, 0.8, 1.0);
viewer.scene.light.intensity = 0.6;
