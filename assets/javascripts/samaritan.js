var messaging = {
    $dom: $('.written-message .message'),
    _available: true,
    _t: null,
    _send: function(message, callback) {
        if (messaging._available) {
            messaging.clear();
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
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                }, 50);
            }, 500);
        }
    },
    send: function(message, callback) {
        messaging.$dom.parent().removeClass('important');
        messaging._send(message, callback);
    },
    important: function(message, callback) {
        setTimeout(function() {
            messaging.$dom.parent().addClass('important');
        }, 500);
        messaging._send(message, callback);
    },
    clear: function() {
        if (messaging._available) {
            messaging.$dom.text('');
        }
    },
    blur: function() {
        messaging.$dom.next('span').addClass('invisible');
    },
    focus: function() {
        messaging.$dom.next('span').removeClass('invisible');
    }
};



$('textarea').on('keydown keyup', function(e) {
    $(this).height(0);
    $(this).height(this.scrollHeight);
});

$('button').on('click', function() {
    var input = $('textarea').val().trim().replace(/\r?\n/g, ' ');
    $('textarea, button').addClass('hidden');

    messaging.focus();
    messaging.send('Identifying Author', function() {
        setTimeout(function() {
            messaging.important('Author Identified', function() {
                messaging.blur();
            });
        }, 2000);
    });
});



messaging.send('Initializing System', function() {
    setTimeout(function() {
        messaging.important('Enter Input Text', function() {
            messaging.blur();
            $('textarea, button').removeClass('hidden');
            setTimeout(function() {
                $('textarea').focus();
            }, 0);
        });
    }, 3000);
});
