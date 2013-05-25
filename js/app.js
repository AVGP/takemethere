modules.installButton("installMe");

document.getElementById("go").onclick = function() {
    var destinationText = document.getElementById("destination").value;  
    
    navigator.geolocation.getCurrentPosition(function(position) {
      modules.transportation.getClosestStation({
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        }).then(function(stations) {
          var start = stations[0];
          modules.transportation.getClosestStation({
            name: document.getElementById("destination").value
          })
          .then(function(stations) {
              var dest = stations[0];
              return modules.transportation.getConnections(start.id, dest.id);
          })
          .then(function(connections) {
              var container = document.getElementById("connections");
              for(var i=0, len = connections.length; i<len; i++) {
                  var listItem = document.createElement("li");
                  listItem.innerHTML = moment(connections[i].from.departure).fromNow();
                  if(connections[i].from.platform) {
                      listItem.innerHTML += "on platform " + connections[i].from.platform;
                  }
                  listItem.innerHTML += " with " + (connections[i].products.length-1) + "change" + (connections[i].products.length > 1 ? 's' : '')
                    + " (" + connections[i].products.join(",") +  ")";
                  container.appendChild(listItem);
                  console.log(connections[i]);
              }
          });
      });
    });
}