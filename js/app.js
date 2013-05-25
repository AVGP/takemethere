modules.installButton("installMe");

var notifications = navigator.mozNotification || window.webkitNotifications;
function createNotification() {
    notifications.createNotification(
        'favicon.ico',
        'Leave now!',
        'You have to leave now to be on time!'
    ).show();    
}

document.getElementById("go").onclick = function() {
    
    if(notifications && window.webkitNotifications) {
        window.webkitNotifications.requestPermission();   
    }
    
    var destinationText = document.getElementById("destination").value;  
    
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
      modules.transportation.getClosestStation({
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        }).then(function(stations) {
          var start = stations[0];
          modules.transportation.getClosestStation({
            name: document.getElementById("destination").value
          })
          .then(function(stations) {
              if(!stations || stations.length < 1) {
                  alert("Sorry, I don't know where you are :(");
              }
              var dest = stations[0];
              return modules.transportation.getConnections(start.id, dest.id);
          })
          .then(function(connections) {
              var container = document.getElementById("connections");
              for(var i=0, len = connections.length; i<len; i++) {
                  var listItem = document.createElement("li");
                  listItem.innerHTML = moment(connections[i].from.departure).fromNow();
                  if(connections[i].from.platform) {
                      listItem.innerHTML += " from platform " + connections[i].from.platform;
                  }
                  if(connections[i].products && connections[i].products.length > 1) {
                      listItem.innerHTML += " with " + (connections[i].products.length-1)
                        + " change" + (connections[i].products.length > 2 ? 's' : '');
                  }
                  listItem.innerHTML += " (" + connections[i].products.join(",") +  ")";
                  listItem.onclick = function() {
                      setTimeout(createNotification,15000);
                  };

                  container.appendChild(listItem);
              }
              console.log(connections);
          });
      });
    });
}