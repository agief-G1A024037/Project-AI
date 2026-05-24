/**
 * Shortest Route - Shortest Path AI
 * UAS Project - University of Bengkulu
 */

// 1. DATA CONFIGURATION
const buildings = [
    { id: 'rektorat', name: 'Rektorat UNIB', lat: -3.759168, lng: 102.272554, icon: 'fa-university', type: 'building', desc: 'Pusat administrasi dan kantor rektor Universitas Bengkulu.', img: 'https://images.weserv.nl/?url=unib.ac.id/wp-content/uploads/2021/04/Gedung-Rektorat-UNIB.jpg' },
    { id: 'gsg', name: 'GSG UNIB', lat: -3.757754, lng: 102.276632, icon: 'fa-landmark', type: 'building', desc: 'Gedung Serbaguna untuk berbagai acara besar, wisuda, dan pertemuan.', img: 'https://images.weserv.nl/?url=unib.ac.id/wp-content/uploads/2021/04/Gedung-GSG-UNIB.jpg' },
    { id: 'ft', name: 'Fakultas Teknik', lat: -3.7590801270053205, lng: 102.276935892375, icon: 'fa-cog', type: 'building', desc: 'Gedung Fakultas Teknik yang menaungi berbagai jurusan teknik.', img: 'https://images.weserv.nl/?url=teknik.unib.ac.id/wp-content/uploads/2019/07/gedung-dekanat.jpg' },
    { id: 'fkip', name: 'FKIP UNIB', lat: -3.756641, lng: 102.275275, icon: 'fa-graduation-cap', type: 'building', desc: 'Fakultas Keguruan dan Ilmu Pendidikan (Kampus Utama).', img: 'https://images.weserv.nl/?url=fkip.unib.ac.id/wp-content/uploads/2021/05/Gedung-FKIP.jpg' },
    { id: 'feb', name: 'FEB', lat: -3.761659, lng: 102.268447, icon: 'fa-chart-line', type: 'building', desc: 'Fakultas Ekonomi dan Bisnis, pusat studi ekonomi, manajemen, dan akuntansi.', img: 'https://images.weserv.nl/?url=feb.unib.ac.id/wp-content/uploads/2021/04/Gedung-FEB.jpg' },
    { id: 'fh', name: 'Fakultas Hukum', lat: -3.760646, lng: 102.268460, icon: 'fa-balance-scale', type: 'building', desc: 'Gedung Fakultas Hukum Universitas Bengkulu.', img: 'https://images.weserv.nl/?url=fh.unib.ac.id/wp-content/uploads/2021/04/Gedung-FH.jpg' },
    { id: 'fisip', name: 'FISIP', lat: -3.759142, lng: 102.274154, icon: 'fa-users', type: 'building', desc: 'Fakultas Ilmu Sosial dan Ilmu Politik, pusat kajian sosial dan komunikasi.', img: 'https://images.weserv.nl/?url=fisip.unib.ac.id/wp-content/uploads/2021/04/Gedung-FISIP.jpg' },
    { id: 'fp', name: 'Fakultas Pertanian', lat: -3.759438, lng: 102.269237, icon: 'fa-leaf', type: 'building', desc: 'Fakultas Pertanian, mengelola lahan praktikum dan riset pertanian.', img: 'https://images.weserv.nl/?url=fp.unib.ac.id/wp-content/uploads/2021/04/Gedung-FP.jpg' },
    { id: 'fk', name: 'Fakultas Kedokteran', lat: -3.755229, lng: 102.278009, icon: 'fa-user-md', type: 'building', desc: 'Gedung Fakultas Kedokteran dan Ilmu Kesehatan dengan fasilitas modern.', img: 'https://images.weserv.nl/?url=fkik.unib.ac.id/wp-content/uploads/2021/04/Gedung-FKIK.jpg' },
    { id: 'fmipa', name: 'FMIPA', lat: -3.756124, lng: 102.274984, icon: 'fa-microscope', type: 'building', desc: 'Fakultas Matematika dan Ilmu Pengetahuan Alam.', img: 'https://images.weserv.nl/?url=fmipa.unib.ac.id/wp-content/uploads/2021/04/Gedung-MIPA.jpg' },
    { id: 'lab', name: 'Laboratorium Dasar', lat: -3.755497, lng: 102.274151, icon: 'fa-flask', type: 'building', desc: 'Pusat laboratorium dasar untuk riset dan praktikum sains dasar.', img: 'https://images.weserv.nl/?url=unib.ac.id/wp-content/uploads/2021/04/Lab-Dasar.jpg' },
    { id: 'gate', name: 'Gerbang Utama', lat: -3.763071, lng: 102.271031, icon: 'fa-door-open', type: 'building', desc: 'Pintu masuk utama Universitas Bengkulu di Jalan WR Supratman.', img: 'gambar maps/Gerbang masuk.png' },
    { id: 'gate_back_in', name: 'Gerbang Belakang (Masuk)', lat: -3.759594, lng: 102.275135, icon: 'fa-door-open', type: 'building', desc: 'Akses masuk alternatif di bagian belakang kampus (Area FKIP).', img: 'gambar maps/Gerbang masuk.png' },
    { id: 'gate_back_out', name: 'Gerbang Belakang (Keluar)', lat: -3.759386, lng: 102.276226, icon: 'fa-door-open', type: 'building', desc: 'Akses keluar alternatif di bagian belakang kampus (Area FKIP).', img: 'gambar maps/Gerbang keluar.png' },
    { id: 'masjid', name: 'Masjid Baitul Hikmah', lat: -3.758978198570871, lng: 102.27593298279153, icon: 'fa-mosque', type: 'building', desc: 'Masjid utama Universitas Bengkulu, pusat kegiatan ibadah dan dakwah kampus.', img: 'https://images.weserv.nl/?url=unib.ac.id/wp-content/uploads/2021/04/Masjid-UNIB.jpg' },
    { id: 'gb34', name: 'Gedung Bersama 3 & 4', lat: -3.7562880292817, lng: 102.27653806007558, icon: 'fa-building', type: 'building', desc: 'Gedung Bersama (Gb) 3 & 4 Universitas Bengkulu, digunakan untuk ruang kuliah dan laboratorium terpadu.', img: 'https://images.weserv.nl/?url=unib.ac.id/wp-content/uploads/2021/04/Gedung-Bersama.jpg' },
    { id: 'gb5', name: 'Gedung Bersama 5', lat: -3.755543242140786, lng: 102.27647426603788, icon: 'fa-building', type: 'building', desc: 'Gedung Bersama (Gb) 5 Universitas Bengkulu, fasilitas penunjang akademik dan perkuliahan.', img: 'https://images.weserv.nl/?url=unib.ac.id/wp-content/uploads/2021/04/Gedung-Bersama.jpg' },
    { id: 'sekre', name: 'Sekretariat Teknik', lat: -3.7582426240230253, lng: 102.27731768668863, icon: 'fa-users-cog', type: 'building', desc: 'Sekretariat Bersama Mahasiswa Fakultas Teknik Universitas Bengkulu, pusat kegiatan organisasi dan kemahasiswaan teknik.', img: 'https://images.weserv.nl/?url=teknik.unib.ac.id/wp-content/uploads/2019/07/gedung-dekanat.jpg' },
    { id: 'lab_ft', name: 'Laboratorium Teknik', lat: -3.7588980740669906, lng: 102.27690209797674, icon: 'fa-flask', type: 'building', desc: 'Laboratorium Fakultas Teknik Universitas Bengkulu, fasilitas riset dan praktikum bagi mahasiswa teknik.', img: 'https://images.weserv.nl/?url=teknik.unib.ac.id/wp-content/uploads/2019/07/gedung-dekanat.jpg' },
    
    // --- MICRO-TRACING ROAD NETWORK ---
    { id: 'j_gate', lat: -3.763071, lng: 102.271031, type: 'junction' },
    { id: 'j_curve_main_1', lat: -3.7628, lng: 102.2708, type: 'junction' }, // Belokan gerbang utama
    { id: 'j_r1', lat: -3.7626, lng: 102.2711, type: 'junction' },
    { id: 'j_r2', lat: -3.7622, lng: 102.2715, type: 'junction' },
    { id: 'j_r3', lat: -3.7618, lng: 102.2718, type: 'junction' },
    { id: 'j_r4', lat: -3.7614, lng: 102.2722, type: 'junction' },
    { id: 'j_r5', lat: -3.7610, lng: 102.2727, type: 'junction' },
    { id: 'j_r6', lat: -3.7606, lng: 102.2731, type: 'junction' },
    { id: 'j_r_fisip_1', lat: -3.759324, lng: 102.274154, type: 'junction' },
    { id: 'j_r_fisip_2', lat: -3.7598, lng: 102.2739, type: 'junction' },
    { id: 'j_r_gsg_1', lat: -3.757954, lng: 102.276632, type: 'junction' },
    { id: 'j_r_gsg_2', lat: -3.7591, lng: 102.2747, type: 'junction' },
    { id: 'j_r_fkip_1', lat: -3.7575, lng: 102.2754, type: 'junction' },
    { id: 'j_r_fkip_2', lat: -3.7585, lng: 102.2758, type: 'junction' },
    { id: 'j_r_fkip_3', lat: -3.756841, lng: 102.275275, type: 'junction' },
    { id: 'j_r_fk_1', lat: -3.7580, lng: 102.2768, type: 'junction' },
    { id: 'j_r_fk_2', lat: -3.7565, lng: 102.2775, type: 'junction' },
    { id: 'j_br_s', lat: -3.7587, lng: 102.2740, type: 'junction' },
    { id: 'j_br_mid', lat: -3.7582, lng: 102.2737, type: 'junction' },
    { id: 'j_br_n', lat: -3.7577, lng: 102.2735, type: 'junction' },
    { id: 'j_r_rek_1', lat: -3.7586, lng: 102.2728, type: 'junction' },
    { id: 'j_r_rek_2', lat: -3.7588, lng: 102.2723, type: 'junction' },
    { id: 'j_r_west_1', lat: -3.7592, lng: 102.2718, type: 'junction' },
    { id: 'j_r_west_2', lat: -3.7597, lng: 102.2712, type: 'junction' },
    { id: 'j_r_west_3', lat: -3.7602, lng: 102.2705, type: 'junction' },
    { id: 'j_r_fh_1', lat: -3.7607, lng: 102.2698, type: 'junction' },
    { id: 'j_r_fh_2', lat: -3.7612, lng: 102.2692, type: 'junction' },
    { id: 'j_r_feb_1', lat: -3.7617, lng: 102.2688, type: 'junction' },
    { id: 'j_r_fp_1', lat: -3.7598, lng: 102.2698, type: 'junction' },
    { id: 'j_r_north_1', lat: -3.7570, lng: 102.2739, type: 'junction' },
    { id: 'j_r_north_2', lat: -3.7562, lng: 102.2742, type: 'junction' },
    { id: 'j_r_lab_1', lat: -3.7558, lng: 102.2744, type: 'junction' },
    { id: 'j_r_ft_1', lat: -3.7555, lng: 102.2735, type: 'junction' },
    { id: 'j_r_ft_2', lat: -3.7552, lng: 102.2726, type: 'junction' },
    { id: 'j_r_ft_3', lat: -3.7589, lng: 102.2768, type: 'junction' },
    { id: 'j_r_mipa_1', lat: -3.756324, lng: 102.274984, type: 'junction' },
    { id: 'j_back_in', lat: -3.759594, lng: 102.275135, type: 'junction' },
    { id: 'j_curve_back_1', lat: -3.7595, lng: 102.2754, type: 'junction' }, // Belokan depan gerbang
    { id: 'j_curve_back_2', lat: -3.7593, lng: 102.2758, type: 'junction' }, // Pertigaan internal
    { id: 'j_back_out', lat: -3.759386, lng: 102.276226, type: 'junction' },
    { id: 'j_masjid', lat: -3.758978, lng: 102.275933, type: 'junction' },
    { id: 'j_curve_ft_1', lat: -3.7589, lng: 102.2765, type: 'junction' }, // Belokan ke arah Lab
    { id: 'j_gb34', lat: -3.756288, lng: 102.276538, type: 'junction' },
    { id: 'j_gb5', lat: -3.755543, lng: 102.276474, type: 'junction' },
    { id: 'j_sekre', lat: -3.758243, lng: 102.277318, type: 'junction' },
    { id: 'j_lab_ft', lat: -3.758898, lng: 102.276902, type: 'junction' }
];

const connections = [
    { from: 'j_gate', to: 'j_curve_main_1', weight: 10 },
    { from: 'j_curve_main_1', to: 'j_r1', weight: 15 },
    { from: 'j_r_ft_3', to: 'j_lab_ft', weight: 15 },
    { from: 'j_r_fk_1', to: 'j_sekre', weight: 20 },
    { from: 'j_gb34', to: 'j_gb5', weight: 30 },
    { from: 'j_gb5', to: 'j_r_fk_2', weight: 40 },
    { from: 'j_r_fkip_3', to: 'j_gb34', weight: 40 },
    { from: 'j_gb34', to: 'j_r_fk_2', weight: 50 },
    { from: 'j_back_in', to: 'j_masjid', weight: 20 },
    { from: 'j_masjid', to: 'j_back_out', weight: 20 },
    { from: 'j_r1', to: 'j_r2', weight: 40 },
    { from: 'j_r2', to: 'j_r3', weight: 40 },
    { from: 'j_r3', to: 'j_r4', weight: 40 },
    { from: 'j_r4', to: 'j_r5', weight: 40 },
    { from: 'j_r5', to: 'j_r6', weight: 40 },
    { from: 'j_r6', to: 'j_r_fisip_2', weight: 40 },
    { from: 'j_r_fisip_2', to: 'j_r_fisip_1', weight: 40 },
    { from: 'j_r_fisip_1', to: 'j_r_gsg_2', weight: 40 },
    { from: 'j_r_gsg_2', to: 'j_r_gsg_1', weight: 40 },
    { from: 'j_r_gsg_1', to: 'j_back_out', weight: 50 },
    { from: 'j_r_fkip_1', to: 'j_back_in', weight: 30 },
    { from: 'j_back_in', to: 'j_back_out', weight: 40 },
    { from: 'j_r_fkip_3', to: 'j_r_fkip_1', weight: 40 },
    { from: 'j_r_fkip_1', to: 'j_r_fkip_2', weight: 40 },
    { from: 'j_r_fkip_2', to: 'j_r_fk_1', weight: 40 },
    { from: 'j_r_fkip_3', to: 'j_r_fk_1', weight: 150 },
    { from: 'j_r_fk_1', to: 'j_r_fk_2', weight: 150 },
    { from: 'j_r_gsg_1', to: 'j_br_s', weight: 60 },
    { from: 'j_br_s', to: 'j_br_mid', weight: 50 },
    { from: 'j_br_mid', to: 'j_br_n', weight: 50 },
    { from: 'j_br_s', to: 'j_r_rek_1', weight: 60 },
    { from: 'j_r_rek_1', to: 'j_r_rek_2', weight: 50 },
    { from: 'j_r_rek_2', to: 'j_r_west_1', weight: 50 },
    { from: 'j_r_west_1', to: 'j_r_west_2', weight: 60 },
    { from: 'j_r_west_2', to: 'j_r_west_3', weight: 60 },
    { from: 'j_r_west_3', to: 'j_r_fh_1', weight: 60 },
    { from: 'j_r_fh_1', to: 'j_r_fh_2', weight: 60 },
    { from: 'j_r_fh_2', to: 'j_r_feb_1', weight: 50 },
    { from: 'j_r_west_2', to: 'j_r_fp_1', weight: 80 },
    { from: 'j_br_n', to: 'j_r_north_1', weight: 80 },
    { from: 'j_r_north_1', to: 'j_r_north_2', weight: 80 },
    { from: 'j_r_north_2', to: 'j_r_lab_1', weight: 40 },
    { from: 'j_r_lab_1', to: 'j_r_ft_1', weight: 100 },
    // --- INTERNAL CAMPUS ROUTES (CURVED & SMOOTH) ---
    { from: 'j_back_in', to: 'j_curve_back_1', weight: 5 },
    { from: 'j_curve_back_1', to: 'j_curve_back_2', weight: 10 },
    { from: 'j_curve_back_2', to: 'j_masjid', weight: 10 },
    { from: 'j_masjid', to: 'j_curve_ft_1', weight: 10 },
    { from: 'j_curve_ft_1', to: 'j_lab_ft', weight: 5 },
    { from: 'j_lab_ft', to: 'ft', weight: 5 },
    { from: 'j_lab_ft', to: 'j_r_ft_3', weight: 10 },
    { from: 'j_r_ft_3', to: 'ft', weight: 5 },
    
    // --- EXTERNAL/OUTSIDE ROUTES (SECONDARY) ---
    { from: 'j_back_out', to: 'j_r_gsg_1', weight: 100 },
    { from: 'j_back_in', to: 'j_back_out', weight: 200 },

    // --- BUILDINGS TO JUNCTIONS (Critical for Pathfinding) ---
    { from: 'rektorat', to: 'j_r_rek_2', weight: 10 },
    { from: 'gsg', to: 'j_r_gsg_1', weight: 10 },
    { from: 'ft', to: 'j_r_ft_3', weight: 5 },
    { from: 'fkip', to: 'j_r_fkip_3', weight: 10 },
    { from: 'feb', to: 'j_r_feb_1', weight: 10 },
    { from: 'fh', to: 'j_r_fh_2', weight: 10 },
    { from: 'fisip', to: 'j_r_fisip_1', weight: 10 },
    { from: 'fp', to: 'j_r_fp_1', weight: 10 },
    { from: 'fk', to: 'j_r_fk_2', weight: 10 },
    { from: 'fmipa', to: 'j_r_mipa_1', weight: 10 },
    { from: 'lab', to: 'j_r_lab_1', weight: 10 },
    { from: 'gate', to: 'j_gate', weight: 5 },
    { from: 'gate_back_in', to: 'j_back_in', weight: 5 },
    { from: 'gate_back_out', to: 'j_back_out', weight: 5 },
    { from: 'masjid', to: 'j_masjid', weight: 5 },
    { from: 'gb34', to: 'j_gb34', weight: 5 },
    { from: 'gb5', to: 'j_gb5', weight: 5 },
    { from: 'sekre', to: 'j_sekre', weight: 5 },
    { from: 'lab_ft', to: 'j_lab_ft', weight: 5 }
];

// --- UTILS ---
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
}

// 2. A* ALGORITHM
class AStar {
    constructor(nodes, edges) {
        this.nodes = nodes;
        this.adj = {};
        nodes.forEach(n => this.adj[n.id] = []);
        
        edges.forEach(e => {
            const n1 = nodes.find(n => n.id === e.from);
            const n2 = nodes.find(n => n.id === e.to);
            if (n1 && n2) {
                // AUTO-CALCULATE WEIGHT BASED ON REAL DISTANCE
                const realDist = getDistance(n1.lat, n1.lng, n2.lat, n2.lng);
                this.adj[e.from].push({ to: e.to, w: realDist });
                this.adj[e.to].push({ to: e.from, w: realDist });
            }
        });
    }

    heuristic(aId, bId) {
        const a = this.nodes.find(n => n.id === aId);
        const b = this.nodes.find(n => n.id === bId);
        if (!a || !b) return 0;
        return getDistance(a.lat, a.lng, b.lat, b.lng);
    }

    findPath(start, end) {
        const open = [{ id: start, cost: 0, f: 0 }];
        const gScore = { [start]: 0 };
        const cameFrom = {};
        
        while (open.length > 0) {
            open.sort((a, b) => a.f - b.f);
            const current = open.shift();
            if (current.id === end) return this.reconstruct(cameFrom, end, gScore[end]);
            
            this.adj[current.id].forEach(edge => {
                const tentativeG = gScore[current.id] + edge.w;
                if (tentativeG < (gScore[edge.to] ?? Infinity)) {
                    cameFrom[edge.to] = current.id;
                    gScore[edge.to] = tentativeG;
                    const h = this.heuristic(edge.to, end);
                    open.push({ id: edge.to, cost: tentativeG, f: tentativeG + h });
                }
            });
        }
        return { path: null, distance: 0 };
    }

    reconstruct(cameFrom, current, dist) {
        const path = [current];
        while (current in cameFrom) {
            current = cameFrom[current];
            path.unshift(current);
        }
        return { path, distance: Math.round(dist) };
    }
}

// 3. INITIALIZE MAP
const map = L.map('map', { zoomControl: false }).setView([-3.759, 102.274], 16);

// Define Base Layers
const satelliteLayer = L.layerGroup([
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        minZoom: 5
    }),
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        minZoom: 5
    })
]);

const map2DLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    minZoom: 5,
    attribution: '&copy; OpenStreetMap &copy; CARTO'
});

// Set default layer
let currentMapStyle = localStorage.getItem('unib_map_style') || 'satellite';

if (currentMapStyle === '2d') {
    map2DLayer.addTo(map);
} else {
    satelliteLayer.addTo(map);
}

// Add Markers
buildings.filter(b => b.type === 'building').forEach(b => {
    const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-pin"><i class="fas ${b.icon}"></i></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 34]
    });

    L.marker([b.lat, b.lng], { icon }).addTo(map).on('click', () => showInfoPanel(b));
});

// 4. UI LOGIC
// Sound status (default: false / muted)
let isSoundEnabled = false;

function updateSoundButtonState() {
    const soundBtn = document.getElementById('soundToggleBtn');
    if (!soundBtn) return;
    
    const icon = soundBtn.querySelector('i');
    if (isSoundEnabled) {
        soundBtn.classList.remove('muted');
        soundBtn.title = 'Matikan Suara';
        if (icon) {
            icon.className = 'fas fa-volume-up';
        }
    } else {
        soundBtn.classList.add('muted');
        soundBtn.title = 'Aktifkan Suara';
        if (icon) {
            icon.className = 'fas fa-volume-mute';
        }
    }
}

function initUI() {
    const startSelect = document.getElementById('startNode');
    const endSelect = document.getElementById('endNode');
    
    buildings.filter(b => b.type === 'building').sort((a, b) => a.name.localeCompare(b.name)).forEach(b => {
        startSelect.add(new Option(b.name, b.id));
        endSelect.add(new Option(b.name, b.id));
    });

    // Sound Toggle Button
    const soundBtn = document.getElementById('soundToggleBtn');
    if (soundBtn) {
        updateSoundButtonState();
        soundBtn.onclick = () => {
            isSoundEnabled = !isSoundEnabled;
            updateSoundButtonState();
            if (!isSoundEnabled && 'speechSynthesis' in window) {
                speechSynthesis.cancel();
            }
        };
    }

    // Travel Mode Toggle
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('travelMode').value = btn.dataset.mode;
        };
    });

    // Map Style Toggle
    const mapStyleBtn = document.getElementById('mapStyleBtn');
    if (mapStyleBtn) {
        // Atur ikon awal sesuai localStorage
        if (currentMapStyle === '2d') {
            mapStyleBtn.title = "Ubah ke Mode Satelit";
            mapStyleBtn.innerHTML = '<i class="fas fa-satellite"></i>';
        } else {
            mapStyleBtn.title = "Ubah ke Mode 2D";
            mapStyleBtn.innerHTML = '<i class="fas fa-map"></i>';
        }

        mapStyleBtn.onclick = () => {
            if (currentMapStyle === 'satellite') {
                map.removeLayer(satelliteLayer);
                map2DLayer.addTo(map);
                currentMapStyle = '2d';
                localStorage.setItem('unib_map_style', '2d');
                mapStyleBtn.title = "Ubah ke Mode Satelit";
                mapStyleBtn.innerHTML = '<i class="fas fa-satellite"></i>';
            } else {
                map.removeLayer(map2DLayer);
                satelliteLayer.addTo(map);
                currentMapStyle = 'satellite';
                localStorage.setItem('unib_map_style', 'satellite');
                mapStyleBtn.title = "Ubah ke Mode 2D";
                mapStyleBtn.innerHTML = '<i class="fas fa-map"></i>';
            }
        };
    }

    document.getElementById('findPathBtn').onclick = findPath;
    document.getElementById('closeInfoBtn').onclick = () => {
        const navPanel = document.getElementById('navPanel');
        const infoPanel = document.getElementById('infoPanel');
        infoPanel.classList.add('hidden');
        infoPanel.classList.remove('active');
        navPanel.classList.remove('hidden');
        navPanel.classList.add('active');
    };
    document.getElementById('setDestinationBtn').onclick = () => {
        const selectedId = document.getElementById('infoPanel').dataset.currentId;
        document.getElementById('endNode').value = selectedId;
        
        const navPanel = document.getElementById('navPanel');
        const infoPanel = document.getElementById('infoPanel');
        infoPanel.classList.add('hidden');
        infoPanel.classList.remove('active');
        navPanel.classList.remove('hidden');
        navPanel.classList.add('active');
        
        // Auto-run routing if start node is already selected
        if (document.getElementById('startNode').value) {
            findPath();
        }
    };
}

function showInfoPanel(b) {
    const navPanel = document.getElementById('navPanel');
    const infoPanel = document.getElementById('infoPanel');
    infoPanel.dataset.currentId = b.id;
    document.getElementById('infoContent').innerHTML = `
        <img src="${b.img || 'https://via.placeholder.com/400x200?text=UNIB+Campus'}" alt="${b.name}">
        <div class="info-details">
            <h2>${b.name}</h2>
            <div class="rating">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                <span>4.8 (Simulasi)</span>
            </div>
            <p class="desc">${b.desc}</p>
        </div>
    `;
    navPanel.classList.add('hidden');
    navPanel.classList.remove('active');
    infoPanel.classList.remove('hidden');
    infoPanel.classList.add('active');
}

function generateDirections(startName, endName) {
    return `Mulai dari <b>${startName}</b>, sampai di <b>${endName}</b>.`;
}

function speak(text) {
    if (isSoundEnabled && 'speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(text.replace(/<b>|<\/b>/g, ''));
        u.lang = 'id-ID';
        speechSynthesis.speak(u);
    }
}

// Store current routing control
let routingControl = null;
let currentPathLayer = null;
let routeMode = 'real'; // 'real' = OSRM ikuti jalan | 'direct' = A* garis langsung

function setRouteMode(mode) {
    routeMode = mode;
    document.getElementById('btnRealRoad').classList.toggle('active', mode === 'real');
    document.getElementById('btnDirect').classList.toggle('active', mode === 'direct');
}

function findPath() {
    const startId = document.getElementById('startNode').value;
    const endId = document.getElementById('endNode').value;
    const mode = document.getElementById('travelMode').value;

    if (!startId || !endId || startId === endId) {
        alert("Silakan pilih lokasi awal dan tujuan yang berbeda.");
        return;
    }

    const startBuilding = buildings.find(b => b.id === startId);
    const endBuilding = buildings.find(b => b.id === endId);
    if (!startBuilding || !endBuilding) return;

    // Bersihkan rute sebelumnya
    if (routingControl) { map.removeControl(routingControl); routingControl = null; }
    if (currentPathLayer) { map.removeLayer(currentPathLayer); currentPathLayer = null; }

    if (routeMode === 'real') {
        // ── MODE 1: OSRM — ikuti jalan nyata ──
        let profile = 'foot';
        if (mode === 'motorcycle' || mode === 'car') profile = 'driving';

        routingControl = L.Routing.control({
            waypoints: [
                L.latLng(startBuilding.lat, startBuilding.lng),
                L.latLng(endBuilding.lat, endBuilding.lng)
            ],
            router: L.Routing.osrmv1({
                serviceUrl: 'https://router.project-osrm.org/route/v1',
                profile: profile
            }),
            lineOptions: {
                styles: [{ color: '#2563eb', weight: 6, opacity: 0.9 }],
                addWaypoints: false
            },
            show: false,
            addWaypoints: false,
            routeWhileDragging: false,
            fitSelectedRoutes: true,
            showAlternatives: false,
            createMarker: () => null
        }).addTo(map);

        routingControl.on('routesfound', function(e) {
            const summary = e.routes[0].summary;
            const distM = Math.round(summary.totalDistance);
            const distDisplay = distM >= 1000 ? `${(distM/1000).toFixed(2)} km` : `${distM} m`;
            let speed = 80;
            if (mode === 'motorcycle') speed = 500;
            if (mode === 'car') speed = 333;
            const minutes = Math.ceil(distM / speed);
            document.getElementById('totalDistance').innerText = distDisplay;
            document.getElementById('estimatedTime').innerText = `${minutes} menit`;
            document.getElementById('pathText').innerHTML = `Mulai dari <b>${startBuilding.name}</b>, sampai di <b>${endBuilding.name}</b>.`;
            document.getElementById('resultsCard').classList.remove('hidden');
            speak(`Rute ditemukan. Jarak ${distDisplay}. Estimasi waktu ${minutes} menit.`);
        });

        routingControl.on('routingerror', function() {
            alert('Tidak dapat menemukan rute. Pastikan koneksi internet tersedia.');
        });

    } else {
        // ── MODE 2: A* — rute langsung (offline) ──
        const astar = new AStar(buildings, connections);
        const result = astar.findPath(startId, endId);

        if (result.path) {
            const coords = result.path.map(id => {
                const b = buildings.find(n => n.id === id);
                return [b.lat, b.lng];
            });
            currentPathLayer = L.polyline(coords, {
                color: '#f59e0b',
                weight: 6,
                opacity: 0.85,
                dashArray: '12, 8',
                lineJoin: 'round'
            }).addTo(map);
            map.fitBounds(currentPathLayer.getBounds(), { padding: [50, 50] });

            const distM = result.distance;
            const distDisplay = distM >= 1000 ? `${(distM/1000).toFixed(2)} km` : `${distM} m`;
            let speed = 80;
            if (mode === 'motorcycle') speed = 500;
            if (mode === 'car') speed = 333;
            const minutes = Math.ceil(distM / speed);
            document.getElementById('totalDistance').innerText = distDisplay;
            document.getElementById('estimatedTime').innerText = `${minutes} menit`;
            document.getElementById('pathText').innerHTML = `Mulai dari <b>${startBuilding.name}</b>, sampai di <b>${endBuilding.name}</b>.`;
            document.getElementById('resultsCard').classList.remove('hidden');
            speak(`Rute ditemukan. Jarak ${distDisplay}. Estimasi waktu ${minutes} menit.`);
        } else {
            alert('Rute tidak ditemukan. Coba lokasi lain.');
        }
    }
}

initUI();
