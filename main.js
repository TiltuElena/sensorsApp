let currentClassroom = 'dynamicClassroom'; // Track which classroom is being viewed
let dynamicData = {
    co2: {measurement_value: '830', measurement_unit: "p/m"},
    o2: {
        measurement_value: '100', measurement_unit: "p/m",
        measurement_value_temperature: '26', measurement_unit_temperature: "°C'",
        measurement_value_relative_humidity: '20', measurement_unit_relative_humidity: "%",
        measurement_value_absolute_humidity: '599', measurement_unit_absolute_humidity: "g/m³"
    }
};
const threshold = 800

window.onload = function () {
    // Initialize default view and button colors
    showClassroomData(currentClassroom);
    initializeButtonColors();
    // updateClassroomData(currentClassroom)
};

function initializeButtonColors() {
    let dynamicCO2 = dynamicData ? dynamicData.co2.measurement_value : null

    const classrooms = {
        classroom1: {co2: 420},
        classroom2: {co2: 300},
        classroom3: {co2: 670},
        classroom4: {co2: 980},
        dynamicClassroom: dynamicData ? {co2: dynamicCO2} : null // Dynamic data handled separately
    };

    Object.keys(classrooms).forEach((classroom) => {
        const button = document.querySelector(`[onclick="showClassroomData('${classroom}')"]`);
        const co2Value = classrooms[classroom]?.co2 || 0;

        if (button) {
            updateButtonColor(button, co2Value, classroom === currentClassroom);
        }
    });
}

function updateButtonColor(button, co2Value, isSelected) {
    if (co2Value > threshold) {
        button.style.backgroundColor = 'red';
        button.style.color = 'white';
        button.style.opacity = '1';

        if (isSelected) {
            button.style.opacity = '0.5';
        }

    } else if (isSelected) {
        button.style.opacity = '0.5';
        button.style.color = 'white';
        button.style.backgroundColor = '#007BFF';
    } else {
        button.style.opacity = '1';
        button.style.backgroundColor = '#007BFF';
        button.style.color = 'white';
    }
}

// ws.onmessage = function (event) {
//     let data = JSON.parse(event.data);
//     dynamicData = data.data;
//
//     if (data.status === 200) {
//         if (currentClassroom === 'dynamicClassroom') {
//             updateClassroomData(dynamicData);
//         }
//
//         const dynamicButton = document.querySelector(`[onclick="showClassroomData('dynamicClassroom')"]`);
//         const co2Value = data.data.co2.measurement_value;
//
//         updateButtonColor(dynamicButton, co2Value, currentClassroom === 'dynamicClassroom');
//     } else {
//         console.log(data.data.message);
//     }
// };

function updateClassroomData(data) {
    const co2ValueElem = document.getElementById('co2Value');
    const co2UnitElem = document.getElementById('co2Unit');
    const dataDisplayParent = document.getElementById('data-display');
    const classroomTitle = document.getElementById('classroomTitle')
    const message = document.getElementById('message')
    co2ValueElem.textContent = data.co2.measurement_value;
    co2UnitElem.textContent = 'p/m';


    if (data.co2.measurement_value > threshold) {
        co2ValueElem.style.color = 'red';
        co2ValueElem.style.fontWeight = 'bold';
        co2UnitElem.style.color = 'red';
        dataDisplayParent.style.boxShadow = " 0 0 20px rgba(255, 0, 0, 0.9)"
        classroomTitle.style.color = 'red'
        message.innerText = 'Este necesară aerisirea clasei!'
        message.style.padding = '10px 0'

    } else {
        co2ValueElem.style.color = 'black';
        co2UnitElem.style.color = 'black';
        dataDisplayParent.style.boxShadow = " 0 0 10px rgba(0, 0, 0, 0.1)"
        classroomTitle.style.color = 'black'
        message.innerText = ''
        message.style.padding = '0'
    }

    // Update O2 data
    document.getElementById('o2Value').textContent = data.o2.measurement_value;
    document.getElementById('o2Unit').textContent = 'p/m';
    document.getElementById('o2Temp').textContent = data.o2.measurement_value_temperature;
    document.getElementById('o2TempUnit').textContent = '°C';
    document.getElementById('o2Humidity').textContent = data.o2.measurement_value_relative_humidity;
    document.getElementById('o2HumidityUnit').textContent = '%';
    document.getElementById('o2AbsHumidity').textContent = data.o2.measurement_value_absolute_humidity;
    document.getElementById('o2AbsHumidityUnit').textContent = 'g/m³';
}

function showClassroomData(classroom) {
    currentClassroom = classroom; // Update current classroom
    // websocketPaused = classroom !== 'dynamicClassroom'; // Pause WebSocket for static classrooms

    const title = document.getElementById('classroomTitle');
    const classrooms = {
        classroom1: {
            name: "Clasa de Istorie",
            data: {
                co2: {measurement_value: 420.0, measurement_unit: "p/m"},
                o2: {
                    measurement_value: 21.0, measurement_unit: "p/h",
                    measurement_value_temperature: 22.0, measurement_unit_temperature: "°C",
                    measurement_value_relative_humidity: 55.0, measurement_unit_relative_humidity: "%",
                    measurement_value_absolute_humidity: 10.0, measurement_unit_absolute_humidity: "g/m³"
                }
            }
        },
        classroom2: {
            name: "Clasa de Matematică",
            data: {
                co2: {measurement_value: 300.0, measurement_unit: "p/m"},
                o2: {
                    measurement_value: 20.8, measurement_unit: "p/h",
                    measurement_value_temperature: 23.0, measurement_unit_temperature: "°C",
                    measurement_value_relative_humidity: 60.0, measurement_unit_relative_humidity: "%",
                    measurement_value_absolute_humidity: 14.0, measurement_unit_absolute_humidity: "g/m³"
                }
            }
        },
        classroom3: {
            name: "Clasa de Informatică",
            data: {
                co2: {measurement_value: 550.0, measurement_unit: "p/m"},
                o2: {
                    measurement_value: 19.5, measurement_unit: "p/h",
                    measurement_value_temperature: 25.0, measurement_unit_temperature: "°C",
                    measurement_value_relative_humidity: 48.0, measurement_unit_relative_humidity: "%",
                    measurement_value_absolute_humidity: 9.0, measurement_unit_absolute_humidity: "g/m³"
                }
            }
        },
        classroom4: {
            name: "Clasa de Chimie",
            data: {
                co2: {measurement_value: 980, measurement_unit: "p/m"},
                o2: {
                    measurement_value: 19.8, measurement_unit: "p/h",
                    measurement_value_temperature: 21.5, measurement_unit_temperature: "°C",
                    measurement_value_relative_humidity: 40.0, measurement_unit_relative_humidity: "%",
                    measurement_value_absolute_humidity: 8.0, measurement_unit_absolute_humidity: "g/m³"
                }
            }
        },
        dynamicClassroom: {
            name: "Clasa de Biologie"
        }
    };

    title.textContent = classrooms[classroom]?.name || "Clasa de Biologie";

    initializeButtonColors();

    if (classroom !== 'dynamicClassroom') {
        const classroomData = classrooms[classroom]?.data;
        if (classroomData) {
            updateClassroomData(classroomData);
        }
    } else {
        if (dynamicData) {
            updateClassroomData(dynamicData);
        }
    }
}
