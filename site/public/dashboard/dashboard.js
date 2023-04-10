

const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'line',
    options: {
        responsive: true,


    },
    data: {
        labels: ['', '', '', '', '', '', '', '', '', ''],
        datasets: [{
            label: 'Consumo - % de Uso',
            data: [50, 51, 49, 53, 64, 50, 50, 51, 49, 53],
            borderWidth: 1,
            pointStyle: false,
            borderWidth: 3,
            borderColor: '#c90a02',
            fill: true,
            backgroundColor: '#7d0400',
            color: '#c90a02',
            tickBorderDash: [8, 4]
        }]
    },
    options: {
        scales: {
            x: {
                border: {
                    display: false
                },
                grid: {
                    display: false,
                    drawTicks: true

                }
            },
            y: {
                beginAtZero: true,
                border: { display: false },

                grid: {
                    color: '#A7A6A6',
                    border: false
                }
            },
        }
    }
});

const ctxTemp = document.getElementById('temp1');

new Chart(ctxTemp, {
    type: 'bar',
    options: {
        responsive: true,


    },
    data: {
        labels: ['', '', '', '', '', '', '', '', '', ''],
        datasets: [{
            label: 'Temperatura - ºC',
            data: [50, 51, 49, 53, 64, 50, 50, 51, 49, 100],
            borderWidth: 1,
            pointStyle: false,
            borderWidth: 3,
            borderColor: '#c90a02',
            fill: true,
            backgroundColor: '#7d0400',
            color: '#c90a02',
            tickBorderDash: [8, 4]
        }]
    },
    options: {
        scales: {
            x: {
                border: {
                    display: false
                },
                grid: {
                    display: false,
                    drawTicks: true

                }
            },
            y: {
                beginAtZero: true,
                border: { display: false },

                grid: {
                    color: '#A7A6A6',
                    border: false
                }
            },
        }
    }
});


const ctx1 = document.getElementById('myChart1');

new Chart(ctx1, {
    type: 'line',
    options: {
        responsive: true,


    },
    data: {
        labels: ['', '', '', '', '', '', '', '', '', ''],
        datasets: [{
            label: 'Consumo - % de Uso',
            data: [50, 51, 49, 53, 64, 100, 50, 51, 49, 53],
            borderWidth: 1,
            pointStyle: false,
            borderWidth: 3,
            borderColor: '#c90a02',
            fill: true,
            backgroundColor: '#7d0400',
            color: '#c90a02',
            tickBorderDash: [8, 4]
        }]
    },
    options: {
        scales: {
            x: {
                border: {
                    display: false
                },
                grid: {
                    display: false,
                    drawTicks: true

                }
            },
            y: {
                beginAtZero: true,
                border: { display: false },

                grid: {
                    color: '#A7A6A6',
                    border: false
                }
            },
        }
    }
});

const ctx2 = document.getElementById('temp2');

new Chart(ctx2, {
    type: 'bar',
    options: {
        responsive: true,


    },
    data: {
        labels: ['', '', '', '', '', '', '', '', '', ''],
        datasets: [{
            label: 'Temperatura - ºC',
            data: [50, 51, 49, 53, 64, 50, 50, 51, 49, 100],
            borderWidth: 1,
            pointStyle: false,
            borderWidth: 3,
            borderColor: '#c90a02',
            fill: true,
            backgroundColor: '#7d0400',
            color: '#c90a02',
            tickBorderDash: [8, 4]
        }]
    },
    options: {
        scales: {
            x: {
                border: {
                    display: false
                },
                grid: {
                    display: false,
                    drawTicks: true

                }
            },
            y: {
                beginAtZero: true,
                border: { display: false },

                grid: {
                    color: '#A7A6A6',
                    border: false
                }
            },
        }
    }
});

const ram = document.getElementById('consumoRam');

new Chart(ram, {
    type: 'line',
    options: {
        responsive: true,


    },
    data: {
        labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        datasets: [{
            label: 'Consumo - % de Uso',
            data: [50, 51, 49, 53, 64, 50, 50, 51, 49, 70, 100, 80, 60, 40, 50, 44, 55],
            borderWidth: 1,
            pointStyle: false,
            borderWidth: 3,
            borderColor: '#c90a02',
            fill: true,
            backgroundColor: '#7d0400',
            color: '#c90a02',
            tickBorderDash: [8, 4]
        }]
    },
    options: {
        scales: {
            x: {
                border: {
                    display: false
                },
                grid: {
                    display: false,
                    drawTicks: true

                }
            },
            y: {
                beginAtZero: true,
                border: { display: false },

                grid: {
                    color: '#A7A6A6',
                    border: false
                }
            },
        }
    }
});



