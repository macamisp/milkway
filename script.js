
const planetData = {
    mercury: {
        name: "Mercury",
        description: "The smallest and innermost planet in the Solar System.",
        facts: [
            "Surface temperature ranges from -180°C to 430°C",
            "No moons",
            "Smallest planet in our solar system",
            "Closest planet to the Sun"
        ],
        missions: [
            {
                name: "MESSENGER",
                year: "2004-2015",
                description: "First spacecraft to orbit Mercury"
            },
            {
                name: "BepiColombo",
                year: "2018-Present",
                description: "Joint mission between ESA and JAXA to study Mercury"
            }
        ]
    },
    venus: {
        name: "Venus",
        description: "The second planet from the Sun and Earth's 'sister planet'.",
        facts: [
            "Surface temperature exceeds 450°C",
            "Has a thick atmosphere primarily of carbon dioxide",
            "Rotates in the opposite direction to most planets"
        ],
        missions: [
            {
                name: "Venera",
                year: "1961-1984",
                description: "Soviet missions that sent probes to Venus"
            },
            {
                name: "Magellan",
                year: "1989-1994",
                description: "Mapped the surface of Venus using radar"
            }
        ]
    },
    earth: {
        name: "Earth",
        description: "The third planet from the Sun and the only known planet to support life.",
        facts: [
            "Surface covered by 71% water",
            "Has one natural satellite: the Moon",
            "Atmosphere protects life and regulates temperature"
        ],
        missions: [
            {
                name: "Apollo Program",
                year: "1961-1972",
                description: "Manned lunar landings"
            },
            {
                name: "Mars Rovers",
                year: "2004-Present",
                description: "Exploration of Mars from Earth"
            }
        ]
    },
    mars: {
        name: "Mars",
        description: "The fourth planet from the Sun, known as the Red Planet.",
        facts: [
            "Has the largest volcano in the solar system: Olympus Mons",
            "Two small moons: Phobos and Deimos",
            "Surface features include valleys, deserts, and polar ice caps"
        ],
        missions: [
            {
                name: "Mars Rover Curiosity",
                year: "2012-Present",
                description: "Exploring the Gale Crater on Mars"
            },
            {
                name: "Mars Perseverance",
                year: "2020-Present",
                description: "Searching for signs of ancient life"
            }
        ]
    },
    jupiter: {
        name: "Jupiter",
        description: "The largest planet in the Solar System.",
        facts: [
            "Has a strong magnetic field and dozens of moons",
            "Great Red Spot, a giant storm, has lasted for centuries",
            "Made mostly of hydrogen and helium"
        ],
        missions: [
            {
                name: "Juno",
                year: "2016-Present",
                description: "Studying Jupiter's atmosphere and magnetic field"
            }
        ]
    },
    saturn: {
        name: "Saturn",
        description: "Known for its prominent ring system.",
        facts: [
            "Second-largest planet in the Solar System",
            "Rings are made of ice and rock particles",
            "Has more than 80 moons"
        ],
        missions: [
            {
                name: "Cassini-Huygens",
                year: "1997-2017",
                description: "Explored Saturn and its moons"
            }
        ]
    },
    uranus: {
        name: "Uranus",
        description: "The only planet that rotates on its side.",
        facts: [
            "Has a faint ring system and at least 27 moons",
            "Coldest planetary atmosphere in the Solar System",
            "Visible to the naked eye"
        ],
        missions: [
            {
                name: "Voyager 2",
                year: "1986",
                description: "The only spacecraft to fly by Uranus"
            }
        ]
    },
    neptune: {
        name: "Neptune",
        description: "The farthest planet from the Sun.",
        facts: [
            "Has the strongest winds in the Solar System",
            "Faint rings and at least 14 known moons",
            "Discovered in 1846"
        ],
        missions: [
            {
                name: "Voyager 2",
                year: "1989",
                description: "The only spacecraft to fly by Neptune"
            }
        ]
    },
    dwarf: {
        name: "Dwarf Planets",
        description: "Includes Pluto and other similar celestial bodies.",
        facts: [
            "Too small to be classified as full planets",
            "Pluto was reclassified as a dwarf planet in 2006",
            "Ceres is the largest object in the asteroid belt"
        ],
        missions: []
    },
    asteroids: {
        name: "Asteroids",
        description: "Small rocky bodies mostly found in the asteroid belt.",
        facts: [
            "Vary in size from a few meters to hundreds of kilometers",
            "Most are found between Mars and Jupiter",
            "Can be remnants from the early solar system"
        ],
        missions: []
    }
};

function createPlanetPage(planetId) {
    const planet = planetData[planetId];
    if (!planet) return '';
    
    return `
        <div class="planet-page" id="${planetId}-page">
            <button class="close-btn" onclick="closePlanetPage('${planetId}')">&times;</button>
            <div class="planet-content">
                <div class="planet-info">
                    <h1>${planet.name}</h1>
                    <p>${planet.description}</p>
                    
                    <h2>Key Facts</h2>
                    <ul>
                        ${planet.facts.map(fact => `<li>${fact}</li>`).join('')}
                    </ul>
                    
                    <h2>Space Missions</h2>
                    ${planet.missions.map(mission => `
                        <div class="mission-card">
                            <h3>${mission.name}</h3>
                            <p>${mission.year}</p>
                            <p>${mission.description}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div class="planet-visual">
                    <div id="${planetId}-3d-model"></div>
                    <div class="moon-gallery">
                        <!-- Add moon cards here -->
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showPlanetPage(planetId) {
    
    if (!document.getElementById(`${planetId}-page`)) {
        document.getElementById('planetPages').innerHTML += createPlanetPage(planetId);
        initPlanet3DModel(planetId);
    }
    
    document.getElementById(`${planetId}-page`).style.display = 'block';
}

function closePlanetPage(planetId) {
    document.getElementById(`${planetId}-page`).style.display = 'none';
}

function initPlanet3DModel(planetId) {
 
    const container = document.getElementById(`${planetId}-3d-model`);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    

}

let scene, camera, renderer, stars, galaxyParticles, solarSystem, nebula;
let isStarfieldVisible = true;
let planetOrbits = [];
let baseOrbitSpeed = 1;
let baseRotationSpeed = 1;
let isPlanetMotionReversed = false;
let isPlanetMotionPaused = false;

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

 
    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for(let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starsMaterial = new THREE.PointsMaterial({color: 0xFFFFFF, size: 0.5});
    stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

   
    const galaxyGeometry = new THREE.BufferGeometry();
    const galaxyVertices = [];
    const galaxyColors = [];
    for(let i = 0; i < 50000; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 50;
        const spiral = angle + radius/10;
        
        const x = Math.cos(spiral) * radius;
        const y = (Math.random() - 0.5) * 2;
        const z = Math.sin(spiral) * radius;
        
        galaxyVertices.push(x, y, z);
        
        const color = new THREE.Color();
        color.setHSL(0.6, 0.8, 0.9);
        galaxyColors.push(color.r, color.g, color.b);
    }
    
    galaxyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(galaxyVertices, 3));
    galaxyGeometry.setAttribute('color', new THREE.Float32BufferAttribute(galaxyColors, 3));
    
    const galaxyMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    galaxyParticles = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxyParticles);


    solarSystem = new THREE.Group();
    
 
    const sunGeometry = new THREE.SphereGeometry(4, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 1
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    solarSystem.add(sun);

  
    const planets = [
        {name: 'Mercury', radius: 0.383, distance: 5.7, color: 0x8B8B8B, orbitSpeed: 0.0474},
        {name: 'Venus', radius: 0.949, distance: 10.8, color: 0xFFA500, orbitSpeed: 0.0354},
        {name: 'Earth', radius: 1, distance: 14.9, color: 0x0077be, orbitSpeed: 0.0298},
        {name: 'Mars', radius: 0.532, distance: 22.7, color: 0xc1440e, orbitSpeed: 0.0241},
        {name: 'Jupiter', radius: 11.21, distance: 77.8, color: 0xd8ca9d, orbitSpeed: 0.0131},
        {name: 'Saturn', radius: 9.45, distance: 142.7, color: 0xead6b8, orbitSpeed: 0.0097},
        {name: 'Uranus', radius: 4.01, distance: 287.1, color: 0xc5d5d6, orbitSpeed: 0.0068},
        {name: 'Neptune', radius: 3.88, distance: 449.5, color: 0x3f54ba, orbitSpeed: 0.0054}
    ];

    planets.forEach(planet => {
        const planetGroup = new THREE.Group();
        
        
        const orbitGeometry = new THREE.RingGeometry(planet.distance, planet.distance + 0.1, 64);
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0x666666,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        solarSystem.add(orbit);

       
        const geometry = new THREE.SphereGeometry(planet.radius * 0.3, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: planet.color,
            shininess: 30
        });
        const mesh = new THREE.Mesh(geometry, material);
        planetGroup.add(mesh);
        
      
        planetGroup.position.x = planet.distance;
      
        planetOrbits.push({
            group: planetGroup,
            speed: planet.orbitSpeed * 0.001,
            distance: planet.distance
        });
        
        solarSystem.add(planetGroup);
    });

    scene.add(solarSystem);

    
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    
    const sunLight = new THREE.PointLight(0xffffff, 1.5);
    scene.add(sunLight);

   
    nebula = new THREE.Group();
    const nebulaParticles = new THREE.BufferGeometry();
    const nebulaVertices = [];
    const nebulaColors = [];
    
    for(let i = 0; i < 15000; i++) {
        const radius = Math.random() * 15;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        nebulaVertices.push(x, y, z);
        
        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.1 + 0.6, 0.8, 0.5);
        nebulaColors.push(color.r, color.g, color.b);
    }
    
    nebulaParticles.setAttribute('position', new THREE.Float32BufferAttribute(nebulaVertices, 3));
    nebulaParticles.setAttribute('color', new THREE.Float32BufferAttribute(nebulaColors, 3));
    
    const nebulaMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.7
    });
    
    const nebulaPoints = new THREE.Points(nebulaParticles, nebulaMaterial);
    nebula.add(nebulaPoints);
    nebula.position.set(60, 30, -40);
    scene.add(nebula);

    camera.position.z = 100;

    
    createAsteroidBelt();

    window.addEventListener('resize', onWindowResize, false);
}

function createAsteroidBelt() {
    const asteroidBelt = new THREE.Group();
    const beltGeometry = new THREE.BufferGeometry();
    const asteroidPositions = [];
    
    for(let i = 0; i < 2000; i++) {
        const radius = Math.random() * 20 + 30; 
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 2;
        
        const x = Math.cos(angle) * radius;
        const y = height;
        const z = Math.sin(angle) * radius;
        
        asteroidPositions.push(x, y, z);
    }
    
    beltGeometry.setAttribute('position', new THREE.Float32BufferAttribute(asteroidPositions, 3));
    const asteroidMaterial = new THREE.PointsMaterial({
        color: 0x888888,
        size: 0.1,
        transparent: true,
        opacity: 0.8
    });
    
    const asteroids = new THREE.Points(beltGeometry, asteroidMaterial);
    asteroidBelt.add(asteroids);
    scene.add(asteroidBelt);
    
    return asteroidBelt;
}

function animate() {
    requestAnimationFrame(animate);
    
    updatePlanetAnimations();
    updateNebulaEffects();
    
   
    if(stars) {
        stars.rotation.y += 0.0001;
        stars.rotation.x += 0.00005;
    }
    
   
    if(galaxyParticles) {
        galaxyParticles.rotation.y += 0.0005;
        const time = Date.now() * 0.0001;
        galaxyParticles.children.forEach((particle, i) => {
            particle.position.y = Math.sin(time + i) * 0.1;
        });
    }
    
    renderer.render(scene, camera);
}

function updatePlanetAnimations() {
    planetOrbits.forEach((planet, index) => {
        if (!isPlanetMotionPaused) {
            const direction = isPlanetMotionReversed ? -1 : 1;
            const time = Date.now() * planet.speed * baseOrbitSpeed * direction;
            
        
            const eccentricity = 0.1;
            const a = planet.distance;
            const b = planet.distance * Math.sqrt(1 - eccentricity * eccentricity);
            
            planet.group.position.x = Math.cos(time) * a;
            planet.group.position.z = Math.sin(time) * b;
            
           
            const rotationSpeed = baseRotationSpeed * (index < 4 ? 1.5 : 0.8);
            planet.group.rotation.y += 0.02 * rotationSpeed * direction;
            
          
            if (index > 3) {
                planet.group.rotation.z = Math.sin(time * 0.5) * 0.1;
            }
        }
    });
}

function updateNebulaEffects() {
    if(nebula) {
        const time = Date.now() * 0.001;
        
        nebula.rotation.y += 0.001;
        nebula.rotation.x += 0.0005;
        
     
        const scale = 1 + Math.sin(time * 0.5) * 0.1;
        nebula.scale.set(scale, scale, scale);
        
       
        nebula.children.forEach(child => {
            if (child.material) {
                child.material.opacity = 0.7 + Math.sin(time) * 0.2;
            }
        });
    }
}

function animateCamera(targetPosition, duration) {
    const startPosition = camera.position.clone();
    const startRotation = camera.rotation.clone();
    const startTime = Date.now();
    
    function update() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
  
        const easeProgress = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        camera.position.lerpVectors(startPosition, targetPosition, easeProgress);
        
        if(progress < 1) {
            requestAnimationFrame(update);
        } else {
           
            startFloatingAnimation();
        }
    }
    
    update();
}

function startFloatingAnimation() {
    const initialY = camera.position.y;
    const amplitude = 0.5;
    const frequency = 0.001;
    
    function animate() {
        camera.position.y = initialY + Math.sin(Date.now() * frequency) * amplitude;
        requestAnimationFrame(animate);
    }
    
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function focusEarth() {
    const targetPosition = new THREE.Vector3(30, 0, 30);
    animateCamera(targetPosition, 2000);
}

function focusGalaxyCenter() {
    const targetPosition = new THREE.Vector3(0, 50, 0);
    animateCamera(targetPosition, 2000);
}

function focusSolarSystem() {
    const targetPosition = new THREE.Vector3(20, 10, 20);
    animateCamera(targetPosition, 2000);
}

function focusNebula() {
    const targetPosition = new THREE.Vector3(40, 20, -20);
    animateCamera(targetPosition, 2000);
}

function focusPlanet(planetName) {
    const planetIndex = planets.findIndex(p => p.name === planetName);
    if (planetIndex !== -1) {
        const planet = planetOrbits[planetIndex];
        const planetPosition = planet.group.position;
        
       
        const distance = planets[planetIndex].radius * 2 + 10;
        const targetPosition = new THREE.Vector3(
            planetPosition.x + Math.cos(Date.now() * 0.001) * distance,
            planetPosition.y + 2,
            planetPosition.z + Math.sin(Date.now() * 0.001) * distance
        );
        
        animateCamera(targetPosition, 2000);
        updatePlanetInfo(planetIndex);
    }
}

function updateOrbitSpeed(value) {
    const targetSpeed = value / 100;
    const duration = 1000; 
    const startSpeed = baseOrbitSpeed;
    const startTime = Date.now();
    
    function updateSpeed() {
        const currentTime = Date.now();
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeProgress = 1 - Math.cos((progress * Math.PI) / 2);
        
        baseOrbitSpeed = startSpeed + (targetSpeed - startSpeed) * easeProgress;
        
        if(progress < 1) {
            requestAnimationFrame(updateSpeed);
        }
    }
    
    updateSpeed();
}


document.addEventListener('keydown', (event) => {
    const moveSpeed = 2;
    switch(event.key) {
        case 'ArrowUp':
            camera.position.y += moveSpeed;
            break;
        case 'ArrowDown':
            camera.position.y -= moveSpeed;
            break;
        case 'ArrowLeft':
            camera.position.x -= moveSpeed;
            break;
        case 'ArrowRight':
            camera.position.x += moveSpeed;
            break;
        case 'r':
           
            camera.position.set(0, 0, 100);
            camera.rotation.set(0, 0, 0);
            break;
    }
});


document.addEventListener('wheel', (event) => {
    const zoomSpeed = 0.1;
    camera.position.z += event.deltaY * zoomSpeed;
   
    camera.position.z = Math.max(10, Math.min(camera.position.z, 200));
});


renderer.domElement.addEventListener('dblclick', (event) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
        const target = intersects[0].point;
        const targetPosition = new THREE.Vector3(
            target.x + 5,
            target.y + 2,
            target.z + 5
        );
        animateCamera(targetPosition, 1000);
    }
});


document.getElementById('planetInfo').style.display = 'block';

