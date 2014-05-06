var a;
$(document).ready(function(){
$.ajax({
type: "POST",
url: "http://ergast.com/api/f1/2014/driverStandings.json?callback=tsl",
dataType:"jsonp" 
})
.done(function( msg ) {
    console.log(msg);
    a=msg;
    for (i=0;i<a.MRData.StandingsTable.StandingsLists[0].DriverStandings.length;i++)
        {
            $('#driverlist').append("<li><a href='#driverdetail' data-transition='slide' class='driver' id='"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.driverId+"'><img src='img/flags/"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.nationality+".png' class='ui-li-icon'>"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName+"&nbsp;"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName+"<br/><span class='driverfor'>"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Constructors[0].name+"</span>&nbsp;<img src='img/FlagIcon.png'><span class='ui-li-count'>"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points+"</span></a></li>");
        }
        $( "#driverlist" ).listview( "refresh" );
});



});

$('.driver').bind('click',function(){
did=$(this).attr('id');    
$.ajax({
type: "POST",
url: "http://ergast.com/api/f1/2014/drivers/"+did+"/driverStandings.json?callback=tsl",
dataType:"jsonp" 
})
.done(function( msg ) {
    console.log(msg);
    a=msg;
    for (i=0;i<a.MRData.StandingsTable.StandingsLists[0].DriverStandings.length;i++)
        {
            $('#driverlist').append("<li><a href='#driverdetail' data-transition='slide' class='driver' id='"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.driverId+"'><img src='img/flags/"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.nationality+".png' class='ui-li-icon'>"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName+"&nbsp;"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName+"<br/><span class='driverfor'>"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Constructors[0].name+"</span>&nbsp;<img src='img/FlagIcon.png'><span class='ui-li-count'>"+a.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points+"</span></a></li>");
        }
        $( "#driverlist" ).listview( "refresh" );
});
});