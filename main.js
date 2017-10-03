var postcode_field = document.getElementById("postcode");
var lookup_button = document.getElementById("lookup");
var output_div = document.getElementById("output");

// Events

postcode_field.addEventListener("keyup", function(e) {
    if(e.keyCode === 13) {
        e.preventDefault();
        lookup_constituency_by_postcode(postcode_field);
        postcode_field.blur();
    }
});

lookup_button.addEventListener("click", function(e) {
    e.preventDefault();
    lookup_constituency_by_postcode(postcode_field);
});

function lookup_constituency_by_postcode(postcode_field) {
    
    var constituency_request_url = "https://api.postcodes.io/postcodes/" + encodeURIComponent(postcode_field.value.trim());
    
    var constituency_request = new XMLHttpRequest();
                        
    constituency_request.open('GET', constituency_request_url, true);

    constituency_request.onload = function() {
        if (constituency_request.status === 200) {

            var data = JSON.parse(constituency_request.responseText);
            
            output_div.innerHTML = "";

            var constituency_name = document.createElement("p");
            constituency_name.innerHTML = "<strong>Constituency:</strong> " + data.result.parliamentary_constituency;
            output_div.insertAdjacentElement("beforeend", constituency_name);

            var ward_name = document.createElement("p");
            ward_name.innerHTML = "<strong>Ward:</strong> " + data.result.admin_ward;
            output_div.insertAdjacentElement("beforeend", ward_name);

            var district = document.createElement("p");
            district.innerHTML = "<strong>District:</strong> " + data.result.admin_district;
            output_div.insertAdjacentElement("beforeend", district);

            var county = document.createElement("p");
            county.innerHTML = "<strong>County:</strong> " + (data.result.admin_county || data.result.admin_district);
            output_div.insertAdjacentElement("beforeend", county);

            var region = document.createElement("p");
            region.innerHTML = "<strong>Region:</strong> " + data.result.region;
            output_div.insertAdjacentElement("beforeend", region);

            var country = document.createElement("p");
            country.innerHTML = "<strong>Country:</strong> " + data.result.country;
            output_div.insertAdjacentElement("beforeend", country);

        } else {

            //console.error(constituency_request.status + " error from API");
            
            output_div.innerHTML = "";
            
            var error_message = document.createElement("p");
            error_message.innerHTML = "Postcode not found";
            error_message.classList.add("error");
            output_div.insertAdjacentElement("beforeend", error_message);

        }
    };

    constituency_request.onerror = function() {

        //console.error("Connection error from API");
            
        output_div.innerHTML = "";

        var error_message = document.createElement("p");
        error_message.innerHTML = "Connection error from API";
        error_message.classList.add("error");
        output_div.insertAdjacentElement("beforeend", error_message);
        
    };

    constituency_request.send();
    
}
