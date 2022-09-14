const BASE_URL = 'https://statsapi.web.nhl.com/api/v1'
const TEAMS = '/teams'
const PLAYER = '/people/'

const refTeamContainer = document.getElementById('teams-container'); 

let teamList = []

const fetchData = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data
  } catch (err) {
    console.error(err.message)
  }
}

const getTeamsAndPrint = async () => {
  const result = await fetchData(BASE_URL + TEAMS + '?expand=team.roster')

  teamList = result.teams
  teamList.forEach(team => {
    console.log(team)
    const roster = team.roster.roster
    console.log(team.id + ' - ' + team.name + ' roster size: ' + roster.length )
  })
}

const appendNewTeamToNode = (team, parentNodeName) => {
  const mainNode = document.createElement("div");
  const nameNode = document.createElement("h2");
  const textnode = document.createTextNode(team.name);
  const listNode = document.createElement("ul");
  const roster = team.roster.roster
  roster.forEach(player => {
    const playerElement = document.createElement("li");

    const jerseyNumber = player.jerseyNumber
    const fullName = player.person.fullName
    const playernode = document.createTextNode(jerseyNumber + ' - ' + fullName);
    playerElement.appendChild(playernode)
    listNode.appendChild(playerElement)
  })
  
  nameNode.appendChild(textnode);
  
  mainNode.appendChild(nameNode)
  mainNode.appendChild(listNode)
  document.getElementById(parentNodeName).appendChild(mainNode);
}

getTeamsAndPrint().then(() => {
  teamList.forEach(team => {
      appendNewTeamToNode(team, 'teams-container')
  })
})
