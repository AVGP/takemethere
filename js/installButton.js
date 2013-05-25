var modules = modules || {};

modules.installButton = function(buttonId) {
    var installBtn = document.getElementById(buttonId);

    if(installBtn) {
        installBtn.style.display = 'none';
    
        if(navigator.mozApps) {
            installBtn.addEventListener('click', function() {
                navigator.mozApps.install(location.href + 'manifest.webapp');
            }, false);
    
            var req = navigator.mozApps.getSelf();
            req.onsuccess = function() {
                if(!req.result) {
                    installBtn.style.display = 'block';
                }
            };
        }
    }   
};
