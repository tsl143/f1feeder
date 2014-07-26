var a;
var currentdate = new Date();
var currentYear = currentdate.getFullYear(); 
var postURL="http://ergast.com/api/f1/"+currentYear+"/";
$(document).ready(function(){
getDriverList();
$('.backBtn').css('marginLeft',$(window).width()-50);
});

function getDriverList()
{
    $.ajax({
    type: "POST",
    url: postURL+"driverStandings.json?callback=tsl",
    dataType:"jsonp" 
    })
    .done(function( msg ) {
        a=msg;
        for (i=0;i<a.MRData.StandingsTable.StandingsLists[0].DriverStandings.length;i++)
            {
                $('#driverlist').append("<li><a href='#driverdetail' data-transition='slide' class='driver' onclick='getRaces(\""+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName+" "+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName+"\",\""+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.driverId+"\")'><img src='img/flags/"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.nationality+".png' class='ui-li-icon'>"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName+"&nbsp;"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName+"<br/><span class='driverfor'>"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Constructors[0].name+"</span>&nbsp;<img src='img/FlagIcon.png'><span class='ui-li-count'>"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points+"</span></a></li>");
            }
            $( "#driverlist" ).listview( "refresh" );
    });
}
function getRaces(driverName,did)
{   
    $('#driverRaces').html('');
    $.ajax({
    type: "POST",
    url: postURL+"drivers/"+did+"/results.json?callback=tsl",
    dataType:"jsonp" 
    })
    .done(function( result ) {
        window.sessionStorage.setItem('driverData',JSON.stringify(result.MRData.RaceTable));
        $(".dirverName").html(driverName+" <br/>( "+currentYear+" )");
        if(result.MRData.RaceTable.Races[0].Results[0].Driver.url){
        $(".dirverName").attr('href',result.MRData.RaceTable.Races[0].Results[0].Driver.url);}
        for (i=0;i<result.MRData.RaceTable.Races.length;i++)
            {
                $('#driverRaces').append("<li><a href='#racedetail' data-transition='flip' onclick='getRaceResults("+i+")'>"+result.MRData.RaceTable.Races[i].raceName+"</a></li>");
            }
            $( "#driverRaces" ).listview( "refresh" );
    });
}
function getRaceResults(index)
{
    obj=JSON.parse(window.sessionStorage.getItem('driverData'));
    if(obj.Races[index].Circuit.circuitName)
    {$('#circuitName').html(obj.Races[index].Circuit.circuitName);}
    if(obj.Races[index].Circuit.url)
    {$('.circuit').attr('href',obj.Races[index].Circuit.url);}
    if(obj.Races[index].Circuit.Location.locality)
    {$('#state').html(obj.Races[index].Circuit.Location.locality);}
    if(obj.Races[index].Circuit.Location.country)
    {$('#country').html("( "+obj.Races[index].Circuit.Location.country+" )");}
    if(obj.Races[index].Results[0].position)
    {$('#racePosition').html(obj.Races[index].Results[0].position);}
    if(obj.Races[index].Results[0].status)
    {$('#raceStatus').html(obj.Races[index].Results[0].status);}
    if(obj.Races[index].Results[0].Time.time)
    {$('#raceTime').html(obj.Races[index].Results[0].Time.time);}
    if(obj.Races[index].Results[0].FastestLap.AverageSpeed.speed)
    {$('#raceSpeed').html(obj.Races[index].Results[0].FastestLap.AverageSpeed.speed+" "+obj.Races[index].Results[0].FastestLap.AverageSpeed.units);}
    if(obj.Races[index].Results[0].laps)
    {$('#raceLaps').html(obj.Races[index].Results[0].laps);}
    if(obj.Races[index].Results[0].FastestLap.lap)
    {$('#raceFastestLap').html(obj.Races[index].Results[0].FastestLap.lap);}
    if(obj.Races[index].Results[0].grid)
    {$('#raceGrid').html(obj.Races[index].Results[0].grid);}
}
