var objetoReferencia = {
    posicao: "",
    time: "",
    variacao_posicao: "",
    pontos: "",
    jogos: "",
    vitorias: "",
    empates: "",
    derrotas: "",
    gols_pro: "",
    gols_contra: "",
    saldo_gols: "",
    aproveitamento: "",
    ultimos_jogos: "",
}

window.onload = function () {
    $.ajax({
        type: "GET",
        url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
        //headers: { 'Authorization': 'Bearer test_76176f75a6477ac211a273071d2c5f' },
        headers: { 'Authorization': 'Bearer live_86c7b69d6338179479317a14c9c0cf' },
        contentType: 'json',
        dataType: 'json',
        success: function (voltarDados) {
            gerarDados(voltarDados);
        },
        done: function (msg) {

        },
        error: function (msg) {

        }
    });


    function gerarDados(voltarDados) {
        var tabela = document.getElementById("tabela")

        for (var i = 0; i < voltarDados.length; i++) {
            var tr = document.createElement("tr");

            tabela.appendChild(tr);
            for (var j = 0; j < Object.keys(voltarDados[i]).length; j++) {
                var td = document.createElement("td");

                var objectNames = Object.getOwnPropertyNames(objetoReferencia);

                if (objectNames[j] == "ultimos_jogos") {
                    var ultimosJogos = criaDadosUltimosJogos(voltarDados[i][objectNames[j]]);

                    td.appendChild(ultimosJogos);
                }
                else if (objectNames[j] == "time") {
                    //cria td com o logo
                    var tdLogo = retornaTdLogo(voltarDados[i][objectNames[j]].escudo)

                    //coloca a descricao do time
                    td.innerText = voltarDados[i][objectNames[j]].nome_popular;
                    td.setAttribute("class", "nomeTime");

                    //adiciona td logo na linha (tr)
                    tr.appendChild(tdLogo);
                }
                else {
                    td.innerText = voltarDados[i][objectNames[j]];
                }
                tr.appendChild(td);
            }
        }
    }

    function retornaTdLogo(escudo) {
        var tdLogo = document.createElement("td");
        var img = document.createElement("img");
        img.setAttribute("src", escudo);
        img.setAttribute("class", "logo");
        tdLogo.appendChild(img);
        return tdLogo;
    }

    function criaDadosUltimosJogos(dadosUltimosJogos) {
        var divUltJogos = document.createElement("div");
        for (var k = 0; k < dadosUltimosJogos.length; k++) {
            var bola = document.createElement("span");
            bola.setAttribute("class", "ultJogos");

            if (dadosUltimosJogos[k] == "v") {
                bola.classList.add("vitoria");
            }
            else if (dadosUltimosJogos[k] == "d") {
                bola.classList.add("derrota");
            }
            else if (dadosUltimosJogos[k] == "e") {
                bola.classList.add("empate");
            }
            divUltJogos.append(bola);
        }
        return divUltJogos;
    }


    $.ajax({
        type: "GET",
        url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas",

        headers: { 'Authorization': 'Bearer live_86c7b69d6338179479317a14c9c0cf' },
        contentType: 'json',
        dataType: 'json',
        success: function (rodadaDados) {

            let posicao = 1;
            for (let r = 0; r < rodadaDados.length; r++) {
                if (rodadaDados[r].status === "encerrada") {
                    posicao += 1;
                }
            }
            buscarRodadas(posicao);
        },
        done: function (msg) {

        },
        error: function (msg) {

        }
    });






    $.ajax({
        type: "GET",
        url: "https://api.api-futebol.com.br/v1/campeonatos/10/artilharia",
        headers: { 'Authorization': 'Bearer live_86c7b69d6338179479317a14c9c0cf' },
        //headers: { 'Authorization': 'Bearer live_e26ea7d8ea9d41db77979fea8ca59e' },
        contentType: 'json',
        dataType: 'json',
        success: function (dadosArtilharia) {
            artilharia(dadosArtilharia);
        },
        done: function (msg) {

        },
        error: function (msg) {

        }
    });

    function artilharia(dadosArtilharia) {

        var boxRanking = document.getElementById("boxRanking");

        for (var i = 0; i < dadosArtilharia.length; i++) {
            // DIV PRINCIPAL
            var rankingItemWrapper = document.createElement("div");
            rankingItemWrapper.setAttribute("class", "rankingItemWrapper");
            boxRanking.appendChild(rankingItemWrapper);

            var rankingItem = document.createElement("span");
            rankingItem.setAttribute("class", "rankingItem");
            rankingItemWrapper.appendChild(rankingItem);
            rankingItem.innerText = i + 1;

            var jogador = document.createElement("div");
            jogador.setAttribute("class", "jogador");
            rankingItemWrapper.appendChild(jogador);

            // var jogadorFoto = document.createElement("img");
            // jogadorFoto.setAttribute("class", "jogadorFoto");
            // jogadorFoto.setAttribute("src","jogador.foto");
            // jogador.appendChild(jogadorFoto);
            // jogadorFoto.innerText = dadosArtilharia[i].atleta.foto;

            var jogadorEscudo = document.createElement("img");
            jogadorEscudo.setAttribute("class", "jogadorEscudo");
            jogadorEscudo.setAttribute("src", dadosArtilharia[i].time.escudo);
            jogador.appendChild(jogadorEscudo);
            jogadorEscudo.innerText = dadosArtilharia[i].time.escudo;

            var jogadorInfo = document.createElement("div");
            jogadorInfo.setAttribute("class", "jogadorInfo");
            jogador.appendChild(jogadorInfo);

            var jogadorNome = document.createElement("div");
            jogadorNome.setAttribute("class", "jogadorNome");
            jogadorInfo.appendChild(jogadorNome);
            jogadorNome.innerText = dadosArtilharia[i].atleta.nome_popular;

            var jogadorPosicao = document.createElement("div");
            jogadorPosicao.setAttribute("class", "jogadorPosicao");
            jogadorInfo.appendChild(jogadorPosicao);
            if (dadosArtilharia[i].atleta.posicao.nome != null) {
                jogadorPosicao.innerText = dadosArtilharia[i].atleta.posicao.nome;
            }
            else { jogadorPosicao.innerText = ". . . . ."; }

            var jogadorGols = document.createElement("div");
            jogadorGols.setAttribute("class", "jogadorGols");
            rankingItemWrapper.appendChild(jogadorGols);
            jogadorGols.innerText = dadosArtilharia[i].gols;
        }
    }
}


function buscarRodadas(rodadaId) {
    if(rodadaId == null)
    {
        return;
    }
    $.ajax({
        type: "GET",
        url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodadaId,

        headers: { 'Authorization': 'Bearer live_86c7b69d6338179479317a14c9c0cf' },
        contentType: 'json',
        dataType: 'json',
        success: function (rodadaDados) {
            gerarRodada(rodadaDados);
        },
        done: function (msg) {

        },
        error: function (msg) {

        }
    });
}


function gerarRodada(rodadaDados) {

    var tabela2 = document.getElementById("tabela2");
    tabela2.innerHTML = "";

    var nav = document.getElementById("listaRodadas");
    listaRodadas.innerHTML = "";
    nav.setAttribute("class", "listaRodadas");

    var navEsquerda = document.createElement("i");
    navEsquerda.setAttribute("class", "bi bi-chevron-left navEsquerda");
    navEsquerda.setAttribute("src", "/chevron-left.svg");
    var rodadaAnteriorId = rodadaDados.rodada_anterior == null ? null : rodadaDados.rodada_anterior.rodada;
    navEsquerda.setAttribute("onclick", "buscarRodadas("+rodadaAnteriorId+")");
    nav.appendChild(navEsquerda)

    var infRodadas = document.createElement("span");
    infRodadas.setAttribute("class", "infRodadas");
    nav.appendChild(infRodadas);
    infRodadas.innerText = rodadaDados.nome;

    var navDireita = document.createElement("i");
    navDireita.setAttribute("class", "bi bi-chevron-right navDireita");
    navDireita.setAttribute("src", "/chevron-right.svg");
    var proximaRodadaId = rodadaDados.proxima_rodada == null ? null : rodadaDados.proxima_rodada.rodada;
    navDireita.setAttribute("onclick", "buscarRodadas("+proximaRodadaId+")");
    nav.appendChild(navDireita);

    for (var i = 0; i < rodadaDados.partidas.length; i++) {

        //div principal
        var rodada = document.createElement("div");
        rodada.setAttribute("class", "dadosJogos");
        tabela2.appendChild(rodada);

        //div descrição fica na div principal
        var jogoInformacoes = document.createElement("div");
        jogoInformacoes.setAttribute("class", "jogoInformacoes");
        rodada.appendChild(jogoInformacoes);

        var jogoDia = document.createElement("span");
        var dia = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
        var d = new Date(rodadaDados.partidas[i].data_realizacao_iso);
        jogoDia.innerHTML = dia[d.getDay()];
        jogoDia.setAttribute("class", "jogoData");
        jogoInformacoes.appendChild(jogoDia);
        var jogoData = document.createElement("span");
        jogoData.setAttribute("class", "jogoData");
        jogoInformacoes.appendChild(jogoData);
        jogoData.innerText = rodadaDados.partidas[i].data_realizacao;

        var jogoLocal = document.createElement("span");
        jogoLocal.setAttribute("class", "jogoLocal");
        jogoInformacoes.appendChild(jogoLocal);
        jogoLocal.innerText = rodadaDados.partidas[i].estadio.nome_popular;

        var jogoHora = document.createElement("span");
        jogoHora.setAttribute("class", "jogoHora");
        jogoInformacoes.appendChild(jogoHora);
        jogoHora.innerText = rodadaDados.partidas[i].hora_realizacao;

        //div interna dentro da div principal
        var placarJogos = document.createElement("div");
        placarJogos.setAttribute("class", "placarJogos");
        rodada.appendChild(placarJogos);

        //div interna time mandante
        var timeMandante = document.createElement("div");
        var sigla = document.createElement("span");
        sigla.innerText = rodadaDados.partidas[i].time_mandante.sigla;
        timeMandante.appendChild(sigla);
        var imgcasa = document.createElement("img");
        timeMandante.setAttribute("class", "timeMandante");
        imgcasa.setAttribute("src", rodadaDados.partidas[i].time_mandante.escudo);
        imgcasa.setAttribute("class", "logo");
        placarJogos.appendChild(timeMandante);
        timeMandante.appendChild(imgcasa);

        //div interna versus
        var versus = document.createElement("div");
        var placarTimeMandante = document.createElement("span");
        placarTimeMandante.innerText = rodadaDados.partidas[i].placar_mandante;
        versus.appendChild(placarTimeMandante);
        var versus2 = document.createElement("img");
        versus2.setAttribute("class", "imagemX")
        versus2.setAttribute("src", "x-solid.svg");
        versus.appendChild(versus2);
        var placarTimeVisitante = document.createElement("span");
        placarTimeVisitante.innerText = rodadaDados.partidas[i].placar_visitante;
        versus.appendChild(placarTimeVisitante);
        versus.setAttribute("class", "versus");
        placarJogos.appendChild(versus);

        //div interna time visitante
        var timeVisitante = document.createElement("div");
        var imgfora = document.createElement("img");
        timeVisitante.setAttribute("class", "timeVisitante");
        imgfora.setAttribute("src", rodadaDados.partidas[i].time_visitante.escudo);
        imgfora.setAttribute("class", "logo");
        var sigla = document.createElement("span");
        placarJogos.appendChild(timeVisitante);
        timeVisitante.appendChild(imgfora);
        sigla.innerText = rodadaDados.partidas[i].time_visitante.sigla;
        timeVisitante.appendChild(sigla);

        //div veja aqui fica na div principal
        var acompanheEmTempoReal = document.createElement("div");
        acompanheEmTempoReal.setAttribute("class", "acompanheEmTempoReal");
        acompanheEmTempoReal.innerText = "ACOMPANHE EM TEMPO REAL";

        rodada.appendChild(acompanheEmTempoReal);
    }
}