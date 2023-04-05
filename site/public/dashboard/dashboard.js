

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
