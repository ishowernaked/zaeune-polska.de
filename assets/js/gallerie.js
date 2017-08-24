$(document).ready(function() {
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Lade Bild #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1]
		},
		image: {
			tError: '<a href="%url%">Das Bild #%curr%</a> konnte nicht geladen werden.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small>&copy; Zäune aus Polen</small>';
			}
		},
        zoom: {
			enabled: true,
			duration: 300,
			opener: function(element) {
				return element.find('img');
			}
		}
	});

    function abjustTileDimension() {
        $('.popup-gallery div.item-circle').each(function() {
            $container = $(this).parent();

            var length = $container.width() - 6;
            $(this).css({
                height: length + 'px',
                width: length + 'px'
            });
        });
    }

    $(window).resize(abjustTileDimension);

    // ctor
    abjustTileDimension();
});