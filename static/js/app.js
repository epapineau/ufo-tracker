// from data.js
var tableData = data;

// Define pieces of site
var date = d3.select("#datetime");
var city = d3.select("#city-input");
var state = d3.select("#state-input");
var country = d3.select("#country-input");
var shape = d3.select("#shape-input");
var button = d3.select("#filter-btn");

button.on("click", function(){
    // Prevent form refreshing
    d3.event.preventDefault();

    // Format search date for matching
    var searchDate = date.property("value");
    searchDate = new Date(searchDate);

    // Format remaining search terms
    searchCity = city.property("value").toLowerCase();
    searchState = state.property("value").toLowerCase().replace(" ", "");
    searchCountry = country.property("value").toLowerCase().replace(" ", "");
    searchShape = shape.property("value").toLowerCase().replace(" ", "");

    // Setup table variable
    var tBody = d3.select("tbody");

    // Empty table in case it was already populated
    tBody.selectAll("td").remove()

    // Loop through data to find matching dates
    var matches = tableData.map(sighting => {
        // Format date string for matching
        var dataDate = new Date(sighting.datetime)

        if(dataDate.getTime() === searchDate.getTime()){
            if(sighting.city === searchCity || searchCity.length === 0){
                if(sighting.state === searchState || searchState.length === 0){
                    if(sighting.country === searchCountry || searchCountry.length === 0){
                        if(sighting.shape === searchShape || searchShape.length === 0){
                            // Append matches to table
                            tBody.append("tr");
                            tBody.append("td").text(sighting.datetime);
                            tBody.append("td").text(sighting.city);
                            tBody.append("td").text(sighting.state);
                            tBody.append("td").text(sighting.country);
                            tBody.append("td").text(sighting.shape);
                            tBody.append("td").text(sighting.durationMinutes);
                            tBody.append("td").text(sighting.comments);
                        }
                    }
                }
            }   
        }
    });
});