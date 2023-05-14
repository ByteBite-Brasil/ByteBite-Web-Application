const ctx = document.getElementById('myChart');

//var valorSelecionado = comboBox.value;

//window.onload = obterDadosGrafico(valorSelecionado)

function obterTodosOsgraficos() {

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

                plotarMaquinas(maquinas)

            });

        } else {

            throw ("Houve um erro ao tentar o certo");

        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);

    });

    return false;

}

function plotarMaquinas(maquinas) {

    var comboBox = document.getElementById("sel_maquina"); // Obtém uma referência à combobox

    maquinas.forEach(maquinas => { // Itera sobre as informações das máquinas
        var option = document.createElement("option"); // Cria uma nova opção
        option.value = maquinas.idMaquina; // Define o valor da opção como o ID da máquina
        option.text = maquinas.nome; // Define o texto da opção como o nome da máquina
        comboBox.add(option); // Adiciona a nova opção à combobox
    });

    var valorSelecionado = maquinas[0].idMaquina

    obterDadosGrafico(valorSelecionado)

}

var minhaSelect = document.getElementById("sel_maquina"); // Obtém uma referência ao elemento select

minhaSelect.addEventListener("change", function () { // Adiciona um event listener ao elemento select
    var valorSelecionado = minhaSelect.value; // Obtém o valor do option selecionado
    obterDadosGrafico(valorSelecionado); // Chama a função minhaFuncao() com o valor selecionado como argumento
});


function obterDadosGrafico(valorSelecionado) {

    console.log('estou aqui')
    console.log(valorSelecionado);

    // if (proximaAtualizacao != undefined) {
    // clearTimeout(proximaAtualizacao);
    // }

    fetch(`/medidas/ultimas/${valorSelecionado}`, { cache: 'no-store' }).then(function (response) {
        // console.log(idMaquina);
        if (response.ok) {

            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                // console.log(JSON.stringify(resposta[0].idLog))

                plotarGrafico(resposta,valorSelecionado);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function plotarGrafico(resposta,valorSelecionado) {

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

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        if (registro.trataDe == 'Consumo' && registro.nome == 'Cpu') {
            labels.push(registro.hora);
            data.datasets[0].data.push(registro.medicao);
        }

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

    var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    setTimeout(() => atualizarGrafico(valorSelecionado, data, myChart), 5000);
}

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





// new Chart(ctx, {
//     type: 'line',
//     options: {
//         responsive: true,


//     },
//     data: {
//         labels: ['', '', '', '', '', '', '', '', '', ''],
//         datasets: [{
//             label: 'Consumo - % de Uso',
//             data: [],
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

// const ctxTemp = document.getElementById('temp1');

// new Chart(ctxTemp, {
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



