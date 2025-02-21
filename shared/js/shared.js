/*!
 * ScriptName: shared.js
 *
 */

$(document).ready(function () {
  $('.keyvisual').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 2000,
    fade: true,
    responsive: [
      {
        breakpoint: 999,
        settings: {
          arrows: false,
          variableWidth: false,
          centerMode: false,
        },
      },
    ],
  });
  $(window).on('load resize orientationchange', function () {
    $('.keyvisual').slick('resize');
  });
});

$(document).ready(function () {
  var scrollSpeed = 0.3;
  var imgWidth = 2168;
  var posX = 0;
  setInterval(function () {
    if (posX >= imgWidth) posX = 0;
    posX -= scrollSpeed;
    $('.slide-h').css('background-position', posX + 'px 0px');
  }, 1);
});

$(document).ready(function () {
  var offsetY;
  $('.hamberger-btn').click(function () {
    if ($('body').hasClass('menu-open')) {
      $('body').removeClass('menu-open');
      $('body').css('position', 'static');
      $('html').removeClass('open');
      $(window).scrollTop(offsetY);
    } else {
      $('body').addClass('menu-open');
      $('html').addClass('open');
      offsetY = window.pageYOffset;
      $('body').css({
        position: 'fixed',
        width: '100%',
        top: -offsetY + 'px',
      });
    }
    return false;
  });
  $('.nav a, .nav a, .js-scroll a').click(function () {
    $('body').removeClass('menu-open');
    $('body').css('position', 'static');
    $(window).scrollTop(offsetY);
  });
  $('.hide-nav, .unsmooth').click(function () {
    if ($('body').hasClass('menu-open')) {
      $('body').removeClass('menu-open');
      $('body').css('position', 'static');
      $(window).scrollTop(offsetY);
    }
  });
});

var lastScrollTop = 0;
$(window).scroll(function () {
  var st = $(this).scrollTop();
  if (lastScrollTop != 0) {
    if (st < lastScrollTop) {
      $('#pagetop.style2').addClass('visible');
      if (st < 10) {
        $('#pagetop.style2').removeClass('visible');
      }
    } else if (st > lastScrollTop) {
      $('#pagetop.style2').removeClass('visible');
    }
  }
  lastScrollTop = st;
});

$(document).ready(function () {
  if ($('.nav[scroll-active]').length && $('.nav').attr('scroll-active') === 'true') {
    $(document).on('scroll', onScroll);
    $('.nav a[href*="#"]').on('click', function () {
      var e = $(this).attr('href');
      var h = $('.nav').outerHeight();
      var b = $(e).length ? $(e).offset().top : 0;
      console.log(b);
      console.log(b + 1 - h);
      $('html, body').animate(
        {
          scrollTop: b + 1 - h,
        },
        500
      );
    });
  }
});

function onScroll() {
  var scroll = $(window).scrollTop();
  var header = $('.nav').outerHeight();
  if ($(window).width() > 999) {
    var header = $('.nav').outerHeight();
  } else {
    var header = 60;
  }

  $('.nav a[href^="#"]').each(function () {
    var el = $(this).attr('href');
    var offset = $(el).length ? $(el).offset().top : 0;
    if ($(this).find('img').length) {
      var _src_ = $(this).find('img').attr('src');
      _src_ = _src_.replace(/^(.*?)_on\.(.*)$/, '$1.$2');
      $(this).find('img').attr('src', _src_);
    }
    if (scroll + header >= offset && $(el).outerHeight() + offset > scroll + header) {
      $('.nav a[href^="#"]').removeClass('active');
      $(this).addClass('active');
      if ($(this).find('img').length) {
        $('.nav a[href^="#"] img').addClass('btn');
        $(this).find('img').removeClass('btn');
        $('.nav a[href^="#"] img').each(function () {
          var src = $(this).attr('src');
          var newSrc = src.replace('_on', '');
          $(this).attr('src', newSrc);
        });

        $(this)
          .find('img')
          .attr('src')
          .match(/^(.*)(\.{1}.*)/g);
        var newSrc = RegExp.$1 + '_on' + RegExp.$2;

        $(this).find('img').attr('src', newSrc); // update src
      }
      // $(this).find('img').trigger('mouseout').trigger('mouseover')
    }
  });
}

function parAuto() {
  if (window.matchMedia('(min-width: 999px)').matches) {
    $('.img_parallax img').each(function (index, element) {
      let src = $(element).attr('data-src');
      if (src === undefined) {
        src = $(element).attr('src');
      }
      $(element).css('display', 'none');
      $(element)
        .parent()
        .parent()
        .parent()
        .css({
          'background-image': "url('" + src + "')",
        });
    });
  } else {
    $('.img_parallax img').each(function (index, element) {
      let src = $(element).attr('data-src');
      if (src === undefined) {
        src = $(element).attr('src');
      }
      $(element).css('display', 'block');
      $(element)
        .parent()
        .parent()
        .parent()
        .css({
          'background-image': "url('" + src + "')",
        });
    });
  }
  var isIE = /*@cc_on!@*/ false || !!document.documentMode;
  if (isIE === true) {
    $('body').on('mousewheel', function (e) {
      event.preventDefault();
      var wd = event.wheelDelta;
      var csp = window.pageYOffset;
      window.scrollTo(0, csp - wd);
    });
    $('.unsmooth').click(function () {
      $('body').on('mousewheel', function (e) {
        if (e.wheelDelta) delta = e.wheelDelta;
        else if (e.originalEvent) {
          if (e.originalEvent.wheelDelta) delta = e.originalEvent.wheelDelta;
          else if (e.originalEvent.deltaY) delta = 0 - e.originalEvent.deltaY;
          else if (e.originalEvent.detail) delta = e.originalEvent.detail * -40;
        } else if (event.originalEvent) {
          if (event.originalEvent.wheelDelta) delta = event.originalEvent.wheelDelta;
          else if (event.originalEvent.deltaY) delta = 0 - event.originalEvent.deltaY;
          else if (event.originalEvent.detail) delta = event.originalEvent.detail * -40;
        }
      });
    });
  }
}
$(document).ready(function () {
  parAuto();
});

$(document).load($(window).bind('resize orientationchange', parAuto));

$(window).load(function (e) {
  var hash1 = location.hash;
  var $root = $('html, body');
  if (hash1 != '') {
    var top01 = $(hash1).offset();
    //alert(hash1);
    if ($(window).width() < 767) {
      $('html,body').animate({ scrollTop: top01.top }, 200);
    }
  }
});

const doc = document.documentElement;
doc.style.setProperty('--app-height', `${window.innerHeight}px`);
window.addEventListener('resize', doc.style.setProperty('--app-height', `${window.innerHeight}px`));

$(document).ready(function () {
  // Set time out is run when slick initialized
  setTimeout(function () {
    // Enable Slick Play when Focus or Touch On Slider
    $('.slick-initialized.slick-slider').on('touchend touchcancel touchmove touchstart', function () {
      $(this).slick('slickPlay');
    });
  }, 0);

  $(window).on('resize load', function () {
    $('.slick-initialized.slick-slider').each(function () {
      $(this).slick('resize');
    });
  });

  // Slick slider auto play when in viewport
  function sliderAutoPlayInViewPort() {
    var settings = {
      selector: '.slide-auto-play-in-view',
      debug: false,
    };

    // Add option autoplay: false
    if ($(settings.selector).hasClass('slick-initialized')) {
      $(settings.selector).slick('slickSetOption', 'autoplay', false);
    }

    // Detect Browser support observer
    if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
      // Create observer
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            // Check element is Slick Initialized
            if ($(entry.target).hasClass('slick-initialized')) {
              if (entry.isIntersecting) {
                $(entry.target).slick('slickPlay');
                settings.debug ? console.log(entry.target.id + ' play') : null;
              } else {
                $(entry.target).slick('slickPause');
                settings.debug ? console.log(entry.target.id + ' pause') : null;
              }
            } else {
              console.log('not slick');
            }
          });
        },
        {
          threshold: 0,
        }
      );

      // Add observer to each slide
      $(settings.selector).each(function () {
        observer.observe(this);
      });

      // Remove observer
      $(settings.selector).on('destroy', function () {
        observer.unobserve(this);
      });
    } else {
      // If browser not support observer

      function isElementInViewport(el) {
        var elementTop = $(el).offset().top - 100; //fix top 100px
        var elementBottom = elementTop + $(el).outerHeight() - 100; //fix bottom 100px

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
      }

      // Add event scroll to check if slide in viewport
      $(window).on('load scroll', function () {
        $(settings.selector).each(function () {
          if ($(this).hasClass('slick-initialized')) {
            if (isElementInViewport(this)) {
              settings.debug ? console.log($(this).attr('id') + ' play') : null;
              $(this).slick('slickPlay');
            } else {
              settings.debug ? console.log($(this).attr('id') + ' pause') : null;
              $(this).slick('slickPause');
            }
          } else {
            console.log('not slick');
          }
        });
      });
    }
  }
  // Run function after all slick initialized
  setTimeout(sliderAutoPlayInViewPort(), 0);
});
