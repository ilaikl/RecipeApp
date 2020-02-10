const fetchPlayersData = function () {

    console.log($("#team-input").val())
    let input = $("#team-input").val()

    $("#playersList").empty()

    $.get(`/teams/${input}`, function (teamData) {

        teamData.forEach(e => {
            $("#playersList").append(`<div class="player">${e.firstName} ${e.lastName}<img src="https://nba-players.herokuapp.com/players/${e.lastName}/${e.firstName}"></div>`)
        });
    })
}

const fetchDreamTeam = function () {
    $("#playersList").empty()

    $.get(`/dreamTeam`, function (teamData) {

        teamData.forEach(e => {
            console.log(e)
            $("#playersList").append(`<div class="player">${e}</div>`)
        });
    })
}


$("#playersList").on("click", ".player", function () {
    
    let data =  $(this).text()//JSON.stringify($(this).text())
    $.post('/roster', {name: data}, function (response) {
        console.log("posted "+data)
    })
});
