var messaging = {
    $dom: $('.written-message .message'),
    _available: true,
    _t: null,
    send: function(message) {
        if (messaging._available) {
            messaging._available = false;
            setTimeout(function() {
                var characters = message.split('');
                messaging._t = setInterval(function() {
                    if (characters.length) {
                        var text = messaging.$dom.text();
                        messaging.$dom.text(text + characters.shift());
                    } else {
                        messaging._available = true;
                        clearInterval(messaging._t);
                    }
                }, 50);
            }, 1000);
        }
    },
    clear: function() {
        if (messaging._available) {
            messaging.$dom.text('');
        }
    }
};

messaging.send('System Initializing');
