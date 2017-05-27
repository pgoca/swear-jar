(function ($) {
    var poll = {},
        $video = $('.layout__background-video'),
        video = $video.get(0),
        $heroBtn = $('#be-hero-btn'),
        $heroMultiplier = $heroBtn.closest('.hero-trigger').find('.hero-trigger__multiplier');

    $heroBtn.prop('disabled', true);

    $video.on('ended', function (e) {
        $heroBtn.prop('disabled', false);
        this.currentTime = 0;
    });

    function getMultiplier() {
        var value = parseInt($.trim($heroMultiplier.val()));

        return isNaN(value) ? 1 : Math.max(value, 1);
    }

    $heroBtn.on('click', function (e) {
        e.preventDefault();
        var multiplier = getMultiplier();

        poll.value += 10 * multiplier;
        updatePoll();

        $heroBtn.prop('disabled', true);
        video.play();

    });

    function updatePoll() {
        var parts = (poll.value / 100).toFixed(2).toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        $('.poll').text(parts.join(',') + ' ' + poll.currency);
    }

    function getCurrentPoll() {
        var promise = $.Deferred();
        setTimeout(function () {
            promise.resolve({
                value: 100,
                currency: 'PLN',
                swearCost: 10
            })
        }, 10);

        return promise;
    }


    getCurrentPoll().then(function (data) {
        poll = data;
        updatePoll();
        $heroBtn.prop('disabled', false);
    });

})(jQuery);
