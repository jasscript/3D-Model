////////////////////////////////////////////////////////////////////////////////
// Add a tail feather to the drinking bird
////////////////////////////////////////////////////////////////////////////////
/*global THREE */

// Erstellen der Globalen Variablen

var 	kamera,
		welt,
		zeichner;

var 	wuerfel,
		kugel,
		zylinder;

var kameraControlle;
var bevelRadius;
var uhr = new THREE.Clock();

    function weltBefuellen() {
        welt = new THREE.Scene();
        welt.fog = new THREE.Fog( 0xAAAAAA, 3000, 5000 );

        // Lichter
        welt.add( new THREE.AmbientLight( 0x222222 ) );
        var licht = new THREE.DirectionalLight( 0xFFFFFF, 0.7 );
        licht.position.set( 200, 500, 500 );
        welt.add( licht );
        licht = new THREE.DirectionalLight( 0xFFFFFF, 0.9 );
        licht.position.set( -200, -100, -400 );
        welt.add( licht );

        // Vogel
        var vogel = new THREE.Object3D();
        erstellTrinkvogel( vogel );
        welt.add( vogel );

    }

function modelUnterstuezung( unterstuetzung ) {
    var beinMaterial = new THREE.MeshPhongMaterial( { shininess: 4 } );
    beinMaterial.color.setHex( 0xAdA79b );
    beinMaterial.specular.setRGB( 0.5, 0.5, 0.5 );

    var fussMaterial = new THREE.MeshPhongMaterial( { color: 0x960f0b, shininess: 30 } );
    fussMaterial.specular.setRGB( 0.5, 0.5, 0.5 );

    var bodenMaterial = new THREE.MeshPhongMaterial( { color:0xffff00, shininess:30 } );

    // Boden
    wuerfel = new THREE.Mesh(
        new THREE.BeveledBlockGeometry( 3000, 8, 1000, bevelRadius ), bodenMaterial );
    wuerfel.position.x = -45;	// (20+32) - halbe Weite (20+64+110)/2
    wuerfel.position.y = -4;	// haelfte der hoehe
    wuerfel.position.z = 0;	// Ursprung Zentriert
    unterstuetzung.add( wuerfel );

    // Grundplatte Vogel
    wuerfel = new THREE.Mesh(
        new THREE.BeveledBlockGeometry( 20+64+110, 4, 2*77+12, bevelRadius ), fussMaterial );
    wuerfel.position.x = -45;	// (20+32) - halbe Weite (20+64+110)/2
    wuerfel.position.y = 4/2;	// haelfte der hoehe
    wuerfel.position.z = 0;	// Ursprung Zentriert
    unterstuetzung.add( wuerfel );

    // Fuesse
    wuerfel = new THREE.Mesh(
        new THREE.BeveledBlockGeometry( 20+64+110, 52, 6, bevelRadius ), fussMaterial );
    wuerfel.position.x = -45;	// (20+32) - halbe Weite (20+64+110)/2
    wuerfel.position.y = 52/2;	// haelfte der hoehe
    wuerfel.position.z = 77 + 6/2;	// raum 77 + halbe tiefe 6/2
    unterstuetzung.add( wuerfel );

    wuerfel = new THREE.Mesh(
        new THREE.BeveledBlockGeometry( 20+64+110, 52, 6, bevelRadius ), fussMaterial );
    wuerfel.position.x = -45;	// (20+32) - halbe Weite (20+64+110)/2
    wuerfel.position.y = 52/2;	// half of height
    wuerfel.position.z = -(77 + 6/2);	// negative raum 77 + halbe tiefe 6/2
    unterstuetzung.add( wuerfel );

    wuerfel = new THREE.Mesh(
        new THREE.BeveledBlockGeometry( 64, 104, 6, bevelRadius ), fussMaterial );
    wuerfel.position.x = 0;	// centered on origin along X
    wuerfel.position.y = 104/2;
    wuerfel.position.z = 77 + 6/2;	// negative raum 77 + halbe tiefe 6/2
    unterstuetzung.add( wuerfel );

    wuerfel = new THREE.Mesh(
        new THREE.BeveledBlockGeometry( 64, 104, 6, bevelRadius ), fussMaterial );
    wuerfel.position.x = 0;	// centered on origin along X
    wuerfel.position.y = 104/2;
    wuerfel.position.z = -(77 + 6/2);	// negative raum 77 + halbe tiefe 6/2
    unterstuetzung.add( wuerfel );

    // Beine
    wuerfel = new THREE.Mesh(
        new THREE.BeveledBlockGeometry( 60, 282+4, 4, bevelRadius ), beinMaterial );
    wuerfel.position.x = 0;	// centered on origin along X
    wuerfel.position.y = 104 + 282/2 - 2;
    wuerfel.position.z = 77 + 6/2;	// negative raum 77 + halbe tiefe 6/2
    unterstuetzung.add( wuerfel );

    wuerfel = new THREE.Mesh(
        new THREE.BeveledBlockGeometry( 60, 282+4, 4, bevelRadius ), beinMaterial );
    wuerfel.position.x = 0;	// centered on origin along X
    wuerfel.position.y = 104 + 282/2 - 2;
    wuerfel.position.z = -(77 + 6/2);	// negative raum 77 + halbe tiefe 6/2
    unterstuetzung.add( wuerfel );
}
// Koerper des Vogels 
// Verbinder von Koerper und Kopf

function erstelleKoerper(koerper) {
    var koerperMaterial = new THREE.MeshPhongMaterial( { shininess: 100 } );
    koerperMaterial.color.setRGB( 31/255, 86/255, 169/255 );
    koerperMaterial.specular.setRGB( 0.5, 0.5, 0.5 );

    var glasMaterial = new THREE.MeshPhongMaterial( { color: 0x0, specular: 0xFFFFFF, shininess: 100, opacity: 0.3, transparent: true } );

    var stangenMaterial = new THREE.MeshPhongMaterial( { color: 0x808080, specular: 0xFFFFFF, shininess: 400 } );

    // Koerper
    kugel = new THREE.Mesh(
        new THREE.SphereGeometry( 104/2, 32, 16, 0, Math.PI * 2, Math.PI/2, Math.PI ), koerperMaterial );
    kugel.position.x = 0;
    kugel.position.y = 160;
    kugel.position.z = 0;
    koerper.add( kugel );

    // Spitze
    zylinder = new THREE.Mesh(
        new THREE.CylinderGeometry( 104/2, 104/2, 0, 32 ), koerperMaterial );
    zylinder.position.x = 0;
    zylinder.position.y = 160;
    zylinder.position.z = 0;
    koerper.add( zylinder );

    zylinder = new THREE.Mesh(
        new THREE.CylinderGeometry( 12/2, 12/2, 390 - 100, 32 ), koerperMaterial );
    zylinder.position.x = 0;
    zylinder.position.y = 160 + 390/2 - 100;
    zylinder.position.z = 0;
    koerper.add( zylinder );

    // Glas Stiehl
    kugel = new THREE.Mesh(
        new THREE.SphereGeometry( 116/2, 32, 16 ), glasMaterial );
    kugel.position.x = 0;
    kugel.position.y = 160;
    kugel.position.z = 0;
    koerper.add( kugel );

    zylinder = new THREE.Mesh(
        new THREE.CylinderGeometry( 24/2, 24/2, 390, 32 ), glasMaterial );
    zylinder.position.x = 0;
    zylinder.position.y = 160 + 390/2;
    zylinder.position.z = 0;
    koerper.add( zylinder );

    // Querstange
    zylinder = new THREE.Mesh(
        new THREE.CylinderGeometry( 5, 5, 200, 32 ), stangenMaterial );
    zylinder.position.set( 0, 360, 0 );
    zylinder.rotation.x = 90 * Math.PI / 180.0;
    koerper.add( zylinder );

}

// Kopf des Vogels
// Kopf und Hut
function erstelleKopf(kopf) {
    var kopfMaterial = new THREE.MeshLambertMaterial( );
    kopfMaterial.color.r = 104/255;
    kopfMaterial.color.g = 1/255;
    kopfMaterial.color.b = 5/255;

    var hutMaterial = new THREE.MeshPhongMaterial( { shininess: 100 } );
    hutMaterial.color.r = 24/255;
    hutMaterial.color.g = 38/255;
    hutMaterial.color.b = 77/255;
    hutMaterial.specular.setRGB( 0.5, 0.5, 0.5 );

    var augenMaterial = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x303030, shininess: 4 } );

    // Kopf
    kugel = new THREE.Mesh(
        new THREE.SphereGeometry( 104/2, 32, 16 ), kopfMaterial );
    kugel.position.x = 0;
    kugel.position.y = 160 + 390;
    kugel.position.z = 0;
    kopf.add( kugel );

    // Hut
    zylinder = new THREE.Mesh(
        new THREE.CylinderGeometry( 142/2, 142/2, 10, 32 ), hutMaterial );
    zylinder.position.x = 0;
    zylinder.position.y = 160 + 390 + 40 + 10/2;
    zylinder.position.z = 0;
    kopf.add( zylinder );

    zylinder = new THREE.Mesh(
        new THREE.CylinderGeometry( 80/2, 80/2, 70, 32 ), hutMaterial );
    zylinder.position.x = 0;
    zylinder.position.y = 160 + 390 + 40 + 10 + 70/2;
    zylinder.position.z = 0;
    kopf.add( zylinder );

    // Nase
    Zylinder = new THREE.Mesh(
        new THREE.CylinderGeometry( 6, 14, 70, 32 ), kopfMaterial );
    Zylinder.position.set( -70, 530, 0 );
    Zylinder.rotation.z = 90 * Math.PI / 180.0;
    kopf.add( Zylinder );

    // Augen
    var kugelGeom = new THREE.SphereGeometry( 10, 32, 16 );

    // Linkes Auge
    kugel = new THREE.Mesh( kugelGeom, augenMaterial );
    kugel.position.set( -48, 560, 0 );
    var auge = new THREE.Object3D();
    auge.add( kugel );
    auge.rotation.y = 20 * Math.PI / 180.0;
    kopf.add( auge );

    // Rechtes Auge
    kugel = new THREE.Mesh( kugelGeom, augenMaterial );
    kugel.position.set( -48, 560, 0 );
    auge = new THREE.Object3D();
    auge.add( kugel );
    auge.rotation.y = -20 * Math.PI / 180.0;
    kopf.add( auge );
}

function erstellTrinkvogel(vvogel) {
    var support = new THREE.Object3D();
    var body = new THREE.Object3D();
    var head = new THREE.Object3D();

    // Modele
    // Grundplatte, Beine und Fuesse
    modelUnterstuezung(support);

    // Körper und Kopf verbindung
    erstelleKoerper(body);

    // Kopf und Hut
    erstelleKopf(head);

    // make moving piece

    var bodyhead = new THREE.Object3D();
    bodyhead.add(body);
    bodyhead.add(head);

    vvogel.add(support);
    vvogel.add(bodyhead);
}

function init() {
    var zeichenflaecheWeite = 846;
    var zeichenflaecheHoehe = 494;
    // For grading the window is fixed in size; here's general code:
    //var zeichenflaecheWeite = window.innerWidth;
    //var zeichenflaecheHoehe = window.innerHeight;
    var divRatio = zeichenflaecheWeite / zeichenflaecheHoehe;

    // Zeichner
    zeichner = new THREE.WebGLRenderer( { antialias: true} );
    zeichner.gammaInput = true;
    zeichner.gammaOutput = true;
    zeichner.setSize(zeichenflaecheWeite, zeichenflaecheHoehe);
    zeichner.setClearColor( 0xAAAAAA, 1.0 );

    // Kamera
    kamera = new THREE.PerspectiveCamera( 35, divRatio, 1, 8000 );
    kamera.position.set( -220, 820, -1260 );

    // Kamera Controlle
    kameraControlle = new THREE.OrbitAndPanControls(kamera, zeichner.domElement);
    kameraControlle.target.set(0,270,0);

}

function hinzufuegenDerDOM() {
    var zeichenflaeche = document.querySelector('#zeichenflaeche');
    var canvas = zeichenflaeche.getElementsByTagName('canvas');
    if (canvas.length>0) {
        zeichenflaeche.removeChild(canvas[0]);
    }
    zeichenflaeche.appendChild( zeichner.domElement );
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}

function render() {
    var delta = uhr.getDelta();
    kameraControlle.update(delta);

    zeichner.render(welt, kamera);
}

try {
    init();
    weltBefuellen();
    hinzufuegenDerDOM();
    animate();
    render();
} catch(e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    document.querySelector('#zeichenflaeche').append(errorReport+e);
}
