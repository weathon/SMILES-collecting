function go(cid) {
    let element = document.querySelector('#container-01');
    let config = { backgroundColor: 'lightgray' };
    let viewer = $3Dmol.createViewer(element, config);
    let v = viewer;


    fetch("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/CID/"+cid+"/record/SDF?record_type=3d&response_type=display").then((response) => (response.text())).then(
        (data) => {
            console.log(data)
            v.clear()
            console.log(data)
            v.addModel(data, "sdf");                       /* load data */
            v.setStyle({
                "stick": { "radius": 0.15, "color": "gray" }, "sphere": {
                    "scale": 0.2, "colorfunc": (atom) => {
                        // return "#000000"
                        // https://en.wikipedia.org/wiki/CPK_coloring
                        let color = {
                            "C": "#505050",
                            "H": "#FEFEFE",
                            "N": "#87CEEB",
                            "O": "#FE0000",
                            "Cl": "#00FE00",
                            "Br": "darkred",
                            "I": "darkpurple",
                            "S": "yellow"
                        }[atom.elem];
                        return color ? color : "pink";
                    }
                }
            })
            v.zoomTo();
            v.render();     
        }
    )


}

url = window.location.href.split("?");
go(url[url.length-1])