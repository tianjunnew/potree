import Potree from './dist/index'

const viewer = new Potree.Viewer(document.getElementById('potree_render_area'));

viewer.setEDLEnabled(false);
viewer.setFOV(60);
viewer.setPointBudget(2_000_000);
viewer.loadSettingsFromURL();
viewer.setBackground('gradient');

viewer.loadGUI(() => {
  viewer.setLanguage('en');
  $('#menu_tools').next().show();
  $('#menu_clipping').next().show();
  viewer.toggleSidebar();
});

Potree.loadPointCloud(
  'https://nas-web.bj.tusimple.ai/scratch/Map/datum/gaea4_prod/potree/potree/potree_1634034128842-3f969271/pointclouds/potree_1634034128842-3f969271/cloud.js',
  'sigeom.sa',
  e => {
    let scene = viewer.scene;
    let pointcloud = e.pointcloud;

    let material = pointcloud.material;
    material.size = 1;
    material.pointSizeType = Potree.PointSizeType.FIXED;
    material.shape = Potree.PointShape.SQUARE;

    scene.addPointCloud(pointcloud);

    viewer.fitToScreen();
  },
);