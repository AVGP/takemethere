var modules = modules || {};

modules.transportation = (function(Q) {
    var self = {};
    self.getClosestStation = function(queryObject) {
        var queryUrl = "http://transport.opendata.ch/v1/locations?";
        if(queryObject.name) {
            queryUrl += "query=" + queryObject.name;
        } else {
            queryUrl += "x=" + queryObject.lat + "&y=" + queryObject.lng;
        }
    
        var defer = Q.defer();
        $.getJSON(queryUrl, function(response) {
            defer.resolve(response.stations);
        });
    
        return defer.promise;
    };

    self.getConnections = function(start, dest) {
        var defer = Q.defer();
        $.getJSON("http://transport.opendata.ch/v1/connections?from=" + start + "&to=" + dest, function(response) {
            defer.resolve(response.connections);
        });
        return defer.promise;
    };
    
    return self;
})(Q);