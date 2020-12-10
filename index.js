function SimpleSlider(element = 'slider', auto = false, pause) {
    var $this = $(element);
    var slidesCont = $this.children('.slides-container');
    var slides = slidesCont.children('.slide');
    var pager = $this.children('.pager');
    var arrowsCont = $this.children('.arrows');
    var prevSlide = arrowsCont.children('.prev');
    var nextSlide = arrowsCont.children('.next');
    var slidesCount = slides.length;
    var currentSlideIndex = 1;
    var currentSlide = slides.first();
    var autoPlay = null;
    slides.not(':first').css('display', 'none');
    currentSlide.addClass('active');

    function fadeNext() {
        currentSlide.removeClass('active').fadeOut(700);

        if (currentSlideIndex == slidesCount) {
            currentSlide = slides.first();
            currentSlide.delay(500).addClass('active').fadeIn(700);
            currentSlideIndex = 1;
        } else {
            currentSlideIndex++;
            currentSlide = currentSlide.next();
            currentSlide.delay(500).addClass('active').fadeIn(700);
        }
        pager.text(currentSlideIndex + ' / ' + slidesCount);
    }

    function fadePrev() {
        currentSlide.removeClass('active').fadeOut(700);

        if (currentSlideIndex == 1) {
            currentSlide = slides.last();
            currentSlide.delay(500).addClass('active').fadeIn();
            currentSlideIndex = slidesCount;
        } else {
            currentSlideIndex--;
            currentSlide = currentSlide.prev();
            currentSlide.delay(500).addClass('active').fadeIn(700);
        }

        pager.text(currentSlideIndex + ' / ' + slidesCount);
    }

    function AutoPlay() {
        clearInterval(autoPlay);

        if (auto == true)
            autoPlay = setInterval(function() {
                fadeNext()
            }, pause);
    }
    $(nextSlide).click(function(e) {
        e.preventDefault();
        fadeNext();
        AutoPlay();
    });
    $(prevSlide).click(function(e) {
        e.preventDefault();
        fadePrev();
        AutoPlay();
    });

    $('.footerdot').click(function() {
        currentDotIndex = $(this).html();
        // console.log(currentDotIndex)
        if (currentDotIndex == 1) {
            if (currentSlideIndex == 2) {
                fadePrev();
            } else if (currentSlideIndex == 3) {
                fadeNext();
            }
        } else if (currentDotIndex == 2) {
            if (currentSlideIndex == 1) {
                fadeNext();
            } else if (currentSlideIndex == 3) {
                fadePrev();
            }
        } else {
            if (currentSlideIndex == 1) {
                fadePrev();
            } else if (currentSlideIndex == 2) {
                fadeNext();
            }
        }
    })
    AutoPlay();
}
$(function() {
    SimpleSlider('#slider', true, 4000);
});