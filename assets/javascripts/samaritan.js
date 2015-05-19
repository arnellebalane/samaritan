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
                }, 40);
            }, 250);
        }
    },
    send: function(message, callback) {
        messaging.$dom.parent().removeClass('important');
        messaging._send(message, callback);
    },
    important: function(message, callback) {
        setTimeout(function() {
            messaging.$dom.parent().addClass('important');
        }, 250);
        messaging._send(message, callback);
    },
    set: function(message) {
        messaging.blur();
        messaging.$dom.text(message);
    },
    clear: function() {
        if (messaging._available) {
            messaging.$dom.text('');
        }
    },
    blur: function() {
        messaging.$dom.next('span').addClass('hidden');
    },
    focus: function() {
        messaging.$dom.next('span').removeClass('hidden');
    }
};


setTimeout(function() {
    messaging.send('Initializing System', function() {
        setTimeout(function() {
            messaging.important('Enter Input Text', function() {
                messaging.blur();
                $('textarea, .identify-author').removeClass('hidden');
                setTimeout(function() {
                    $('textarea').focus();
                }, 0);
            });
        }, 1000);
    });
}, 1000);



$('textarea').on('keydown keyup', function() {
    $(this).height(0);
    $(this).height(this.scrollHeight);
});

$('.identify-author').on('click', function() {
    var input = $('textarea').val().trim().replace(/\r?\n/g, ' ');
    $('textarea').val('');
    $('textarea, .identify-author').addClass('hidden');

    messaging.focus();
    messaging.send('Identifying Author', function() {
        setTimeout(function() {
            messaging.send('Author Identified', function() {
                $('.again, .quit').removeClass('hidden');

                var data = {
                    name: 'Arnelle Balane',
                    url: 'http://static.guim.co.uk/sys-images/Guardian/About/General/2011/11/27/1322410813055/Charles-Dickens-007.jpg',
                };
                $('.profile h1').text(data.name);
                $('.profile .image').css('background-image',
                    'url("' + data.url + '")');
                $('.profile').removeClass('scaled');
            });
        }, 2000);
    });
});

$('.again').on('click', function() {
    $('.again, .quit').addClass('hidden');
    $('.profile').addClass('scaled');

    messaging.important('Enter Input Text', function() {
        messaging.blur();
        $('textarea, .identify-author').removeClass('hidden');
        setTimeout(function() {
            $('textarea').focus();
        }, 0);
    });
});

$('.quit').on('click', function() {
    $('.again, .quit').addClass('hidden');
    $('.profile').each(function() {
        setTimeout(function() {
            $(this).addClass('scaled');
        }.bind(this), Math.random() * 3 * 1000);
    });

    messaging.$dom.parent().addClass('going-offline');
    messaging.set('Terminating in :03');
    messaging.blur();
    var i = 2;
    var t = setInterval(function() {
        if (i--) {
            messaging.set('Terminating in :0' + (i + 1));
        } else {
            clearInterval(t);
            $('#viewport').addClass('offline');
            messaging.set('Samaritan: Offline');
        }
    }, 1000);
});



// POSITIONING THE TARGET PROFILE
var modal = $('.system-modal');
var profile = $('.profile');

profile.css({
    top: modal.offset().top + modal.outerHeight() + 30 + 'px',
    left: modal.offset().left - profile.outerWidth() / 2 + 'px'
});



// RANDOMIZING THE RANDOM THINGS
setInterval(function() {
    $('.random').each(function() {
        var random = '';
        random += ~~(Math.random() * 9);
        random += ~~(Math.random() * 9);
        random += ~~(Math.random() * 9);
        random += '.';
        random += ~~(Math.random() * 9);
        random += ~~(Math.random() * 9);
        random += '/';
        random += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(~~(Math.random() * 26));
        random += ~~(Math.random() * 9);
        random += ~~(Math.random() * 9);
        random += '-';
        random += ~~(Math.random() * 9);
        random += ~~(Math.random() * 9);
        random += '.';
        random += ~~(Math.random() * 9);
        random += '.';
        random += ~~(Math.random() * 9);
        random += '.';
        random += ~~(Math.random() * 9);
        random += ~~(Math.random() * 9);
        random += ~~(Math.random() * 9);
        random += ~~(Math.random() * 9);
        random += ~~(Math.random() * 9);
        random += '-';
        random += ~~(Math.random() * 9);
        random += ~~(Math.random() * 9);
        random += ~~(Math.random() * 9);
        setTimeout(function() {
            $(this).text(random);
        }.bind(this), Math.random() * 3 * 100);
    });
}, 500);
