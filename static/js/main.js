var map = L.map('map').setView([60, 100], 3); // Центрирование на России
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

var enterprises = [
    {
        lat: 58.5953,
        lng: 49.6601,
        name: "Завод в Кирове",
        description: "Нефтеперерабатывающий завод, производящий высококачественное топливо и масла. Основное производство ориентировано на экспорт.",
        icon: 'factory',
        image: 'image.png'
    },
    {
        lat: 54.9924,
        lng: 73.3686,
        name: "Завод в Омске",
        description: "Один из крупнейших нефтеперерабатывающих заводов в России, специализирующийся на производстве нефтепродуктов высокого качества.",
        icon: 'oil',
        image: 'image2.png'
    },
    {
        lat: 61.5240,
        lng: 105.3188,
        name: "Завод в Красноярске",
        description: "Завод специализируется на производстве химических и нефтепродуктов для различных промышленных отраслей.",
        icon: 'factory',
        image: 'image3.png'
    },
    {
        lat: 60.7039,
        lng: 135.0580,
        name: "Газовая вышка в Якутии",
        description: "Газовая вышка, обеспечивающая добычу и переработку природного газа для внутреннего и внешнего рынка.",
        icon: 'gas',
        image: 'image4.png'
    },
    {
        lat: 64.1472,
        lng: 76.7859,
        name: "Нефтяная вышка в Ханты-Мансийском",
        description: "Нефтяная вышка, занимающаяся добычей нефти и переработкой в готовые нефтепродукты для экспорта.",
        icon: 'oil',
        image: 'image5.png'
    }
];

var icons = {
    factory: L.icon({
        iconUrl: 'static/img/zavod.png',
        iconSize: [65, 65],
        iconAnchor: [48, 65],
        popupAnchor: [0, -65]
    }),
    oil: L.icon({
        iconUrl: 'static/img/neft.png',
        iconSize: [65, 65],
        iconAnchor: [48, 65],
        popupAnchor: [0, -65]
    }),
    gas: L.icon({
        iconUrl: 'static/img/gaz.png',
        iconSize: [65, 65],
        iconAnchor: [48, 65],
        popupAnchor: [0, -65]
    })
};

var markers = [];

// открытия основного модального окна
function openModal(imagePath) {
    document.getElementById("modalImage").src = "static/img/" + imagePath;
    document.getElementById("nestedElements").innerHTML = ""; 

    if (imagePath === "image.png") {
        var squareElement = document.createElement("div");
        squareElement.innerHTML = '<span style="color:white; cursor:pointer; color: black; background-color: #8ccadd; padding: 10px; border-radius: 10px;" onclick="openNestedModal(\'image (1).png\')">Всего базовых масел</span>';
        document.getElementById("nestedElements").appendChild(squareElement);
    }
    if (imagePath === "image3.png") {
        var squareElement = document.createElement("div");
        squareElement.innerHTML = '<span style="color:white; cursor:pointer; color: black; background-color: #8ccadd; padding: 10px; border-radius: 10px;" onclick="openNestedModal(\'image3(1).png\')">Фин. отдел</span> &nbsp;<span style="color:white; cursor:pointer; color: black; background-color: #8ccadd; padding: 10px; border-radius: 10px;" onclick="openNestedModal(\'image3(2).png\')">Отдел разработки</span>';
        document.getElementById("nestedElements").appendChild(squareElement);
    }
    if (imagePath === "image4.png") {
        var squareElement = document.createElement("div");
        squareElement.innerHTML = '<span style="color:white; cursor:pointer; color: black; background-color: #8ccadd; padding: 10px; border-radius: 10px;" onclick="openNestedModal(\'image4(1).png\')">Режим управления</span>';
        document.getElementById("nestedElements").appendChild(squareElement);
    }

    document.getElementById("myModal").style.display = "block";
}

// открытия вложенного модального окна
function openNestedModal(imagePath) {
    document.getElementById("nestedModalImage").src = "static/img/" + imagePath;
    document.getElementById("nestedModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function closeNestedModal() {
    document.getElementById("nestedModal").style.display = "none";
}

enterprises.forEach(function(enterprise) {
    var marker = L.marker([enterprise.lat, enterprise.lng], {icon: icons[enterprise.icon]})
        .addTo(map)
        .bindPopup(`
            <strong>${enterprise.name}</strong>
            <p>${enterprise.description}</p>
            <button onclick="openModal('${enterprise.image}')">Открыть изображение</button>
        `);
    markers.push(marker);
});

//связей между предприятиями
var connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [2, 4]
];

connections.forEach(function(connection) {
    var latlngs = [
        [markers[connection[0]].getLatLng().lat, markers[connection[0]].getLatLng().lng],
        [markers[connection[1]].getLatLng().lat, markers[connection[1]].getLatLng().lng]
    ];
    var polyline = L.polyline(latlngs, {color: 'black', weight: 2}).addTo(map);
});