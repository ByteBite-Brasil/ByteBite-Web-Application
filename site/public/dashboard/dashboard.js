let myChart;
let myChart1;
let myChart2;
let myChart3;

function obterListaDeMaquinas() {

    // Resolver a questao de quanto realizar login com usuario diferente de empresa, conseguir fazer a busca no banco das maquinas pela FK empresa, no momento esta somente via ID empresa.
    var idEmpresa = sessionStorage.ID_USUARIO

    fetch(`/medidas/getMaquinas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            idServer: idEmpresa

        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            resposta.json().then(json => {

                // console.log(JSON.stringify(json));
                var maquinas = json

                console.log(maquinas)

                plotarListaDeMaquinas(maquinas)

            });

        } else {

            throw ("Houve um erro ao tentar o certo");

        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);

    });

    return false;
}

function plotarListaDeMaquinas(maquinas) {

    var comboBox = document.getElementById("sel_maquina");

    maquinas.forEach(maquinas => {
        var option = document.createElement("option");
        option.value = maquinas.idMaquina;
        option.text = maquinas.nome;
        comboBox.add(option);
    });

    var valorSelecionado = maquinas[0].idMaquina

    obterDadosConsumoCPU(valorSelecionado)
    obterDadosTemperaturaCPU(valorSelecionado);
    obterDadosConsumoDISCO(valorSelecionado);
    obterDadosConsumoRAM(valorSelecionado);

}

var minhaSelect = document.getElementById("sel_maquina");

minhaSelect.addEventListener("change", function () {

    var valorSelecionado = minhaSelect.value;

    obterDadosConsumoCPU(valorSelecionado);
    obterDadosTemperaturaCPU(valorSelecionado);
    obterDadosConsumoDISCO(valorSelecionado);
    obterDadosConsumoRAM(valorSelecionado);

});

let proximaAtualizacao;


// OBTER DADOS
function obterDadosConsumoCPU(valorSelecionado, componente, tipo) {

    componente = 1;
    tipo = 1

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/dados/maquinas/${valorSelecionado}/${componente}/${tipo}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse()


                plotarGraficoConsumoCPU(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function obterDadosTemperaturaCPU(valorSelecionado, componente, tipo) {

    componente = 1;
    tipo = 2

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/dados/maquinas/${valorSelecionado}/${componente}/${tipo}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse()

                plotarGraficoTemperaturaCPU(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function obterDadosConsumoDISCO(valorSelecionado, componente, tipo) {

    componente = 3;
    tipo = 1

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/dados/maquinas/${valorSelecionado}/${componente}/${tipo}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse()

                plotarGraficoConsumoDISCO(resposta);




            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function obterDadosConsumoRAM(valorSelecionado, componente, tipo) {

    componente = 2;
    tipo = 1

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/dados/maquinas/${valorSelecionado}/${componente}/${tipo}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse()


                plotarGraficoConsumoRAM(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// PLOTAR DADOS
function plotarGraficoConsumoCPU(resposta) {

    console.log('iniciando plotagem do gráfico...');

    let labels = [];

    let data = {
        labels: labels,
        datasets: [{
            label: 'Consumo - % de Uso',
            data: [],
            borderWidth: 1,
            pointStyle: false,
            borderWidth: 3,
            borderColor: '#c90a02',
            fill: true,
            backgroundColor: '#7d0400',
            color: '#c90a02',
            tickBorderDash: [8, 4]
        }]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        labels.push(registro.hora);
        data.datasets[0].data.push(registro.medicao);
    }

    const config = {
        type: 'line',
        data: data,
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
        },
    };

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(
        document.getElementById('ConsumoCPU'),
        config
    );

    // setTimeout(() => atualizarGrafico(valorSelecionado, data, myChart), 5000);
}

function plotarGraficoTemperaturaCPU(resposta) {

    console.log('iniciando plotagem do gráfico...');

    let labels1 = [];

    let data1 = {
        labels: labels1,
        datasets: [{
            label: 'Temperatura - ºC',
            data: [],
            borderWidth: 1,
            pointStyle: false,
            borderWidth: 3,
            borderColor: '#c90a02',
            fill: true,
            backgroundColor: '#7d0400',
            color: '#c90a02',
            tickBorderDash: [8, 4]
        }]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        labels1.push(registro.hora);
        data1.datasets[0].data.push(registro.medicao);
    }

    const config1 = {
        type: 'line',
        data: data1,
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
        },
    };

    if (myChart1) {
        myChart1.destroy();
    }

    myChart1 = new Chart(
        document.getElementById('TemperaturaCPU'),
        config1
    );

    // setTimeout(() => atualizarGrafico(valorSelecionado, data, myChart), 5000);
}

function plotarGraficoConsumoDISCO(resposta) {

    console.log('iniciando plotagem do gráfico...');

    let labels2 = [];

    let data2 = {
        labels: labels2,
        datasets: [{
            label: 'Consumo - %',
            data: [],
            borderWidth: 1,
            pointStyle: false,
            borderWidth: 3,
            borderColor: '#c90a02',
            fill: true,
            backgroundColor: '#7d0400',
            color: '#c90a02',
            tickBorderDash: [8, 4]
        }]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        labels2.push(registro.hora);
        data2.datasets[0].data.push(registro.medicao);
    }

    const config2 = {
        type: 'line',
        data: data2,
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
        },
    };

    if (myChart2) {
        myChart2.destroy();
    }

    myChart2 = new Chart(
        document.getElementById('ConsumoDISCO'),
        config2
    );

    // setTimeout(() => atualizarGrafico(valorSelecionado, data, myChart), 5000);
}

function plotarGraficoConsumoRAM(resposta) {

    console.log('iniciando plotagem do gráfico...');

    let labels3 = [];

    let data3 = {
        labels: labels3,
        datasets: [{
            label: 'Consumo - %',
            data: [],
            borderWidth: 1,
            pointStyle: false,
            borderWidth: 3,
            borderColor: '#c90a02',
            fill: true,
            backgroundColor: '#7d0400',
            color: '#c90a02',
            tickBorderDash: [8, 4]
        }]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        labels3.push(registro.hora);
        data3.datasets[0].data.push(registro.medicao);
    }

    const config3 = {
        type: 'line',
        data: data3,
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
        },
    };

    if (myChart3) {
        myChart3.destroy();
    }

    myChart3 = new Chart(
        document.getElementById('ConsumoRAM'),
        config3
    );

    // setTimeout(() => atualizarGrafico(valorSelecionado, data, myChart), 5000);
}


// ATUALIZAR DADOS
function atualizarGrafico(valorSelecionado, data, myChart) {

    fetch(`/medidas/tempo-real/${valorSelecionado}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(data);

                if (novoRegistro[0].hora == data.labels[data.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].hora)
                    console.log("Horário do último dado capturado:")
                    console.log(data.labels[data.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {

                    // tirando e colocando valores no gráfico

                    data.labels.shift(); // apagar o primeiro

                    data.labels.push(novoRegistro[0].hora); // incluir um novo momento

                    data.datasets[0].data.shift();  // apagar o primeiro de temperatura
                    data.datasets[0].data.push(novoRegistro[0].medicao); // incluir uma nova medida de temperatura

                    myChart.update();


                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(valorSelecionado, data, myChart), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(valorSelecionado, data, myChart), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// const ctx1 = document.getElementById('myChart1');

// new Chart(ctx1, {
//     type: 'line',
//     options: {
//         responsive: true,


//     },
//     data: {
//         labels: ['', '', '', '', '', '', '', '', '', ''],
//         datasets: [{
//             label: 'Consumo - % de Uso',
//             data: [50, 51, 49, 53, 64, 100, 50, 51, 49, 53],
//             borderWidth: 1,
//             pointStyle: false,
//             borderWidth: 3,
//             borderColor: '#c90a02',
//             fill: true,
//             backgroundColor: '#7d0400',
//             color: '#c90a02',
//             tickBorderDash: [8, 4]
//         }]
//     },
//     options: {
//         scales: {
//             x: {
//                 border: {
//                     display: false
//                 },
//                 grid: {
//                     display: false,
//                     drawTicks: true

//                 }
//             },
//             y: {
//                 beginAtZero: true,
//                 border: { display: false },

//                 grid: {
//                     color: '#A7A6A6',
//                     border: false
//                 }
//             },
//         }
//     }
// });

// const ctx2 = document.getElementById('temp2');

// new Chart(ctx2, {
//     type: 'bar',
//     options: {
//         responsive: true,


//     },
//     data: {
//         labels: ['', '', '', '', '', '', '', '', '', ''],
//         datasets: [{
//             label: 'Temperatura - ºC',
//             data: [50, 51, 49, 53, 64, 50, 50, 51, 49, 100],
//             borderWidth: 1,
//             pointStyle: false,
//             borderWidth: 3,
//             borderColor: '#c90a02',
//             fill: true,
//             backgroundColor: '#7d0400',
//             color: '#c90a02',
//             tickBorderDash: [8, 4]
//         }]
//     },
//     options: {
//         scales: {
//             x: {
//                 border: {
//                     display: false
//                 },
//                 grid: {
//                     display: false,
//                     drawTicks: true

//                 }
//             },
//             y: {
//                 beginAtZero: true,
//                 border: { display: false },

//                 grid: {
//                     color: '#A7A6A6',
//                     border: false
//                 }
//             },
//         }
//     }
// });

// const ram = document.getElementById('consumoRam');

// new Chart(ram, {
//     type: 'line',
//     options: {
//         responsive: true,


//     },
//     data: {
//         labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
//         datasets: [{
//             label: 'Consumo - % de Uso',
//             data: [50, 51, 49, 53, 64, 50, 50, 51, 49, 70, 100, 80, 60, 40, 50, 44, 55],
//             borderWidth: 1,
//             pointStyle: false,
//             borderWidth: 3,
//             borderColor: '#c90a02',
//             fill: true,
//             backgroundColor: '#7d0400',
//             color: '#c90a02',
//             tickBorderDash: [8, 4]
//         }]
//     },
//     options: {
//         scales: {
//             x: {
//                 border: {
//                     display: false
//                 },
//                 grid: {
//                     display: false,
//                     drawTicks: true

//                 }
//             },
//             y: {
//                 beginAtZero: true,
//                 border: { display: false },

//                 grid: {
//                     color: '#A7A6A6',
//                     border: false
//                 }
//             },
//         }
//     }
// });



