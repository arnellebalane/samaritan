var svg = {
    element: $('#viewport'),
    initialize: function() {
        svg.element.attr('width', window.innerWidth);
        svg.element.attr('height', window.innerHeight);
    }
};

svg.initialize();
