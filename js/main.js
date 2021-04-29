$(document).ready(function () {

var lang = window.location.href;

$('.mobile-wrap').on('click', function () {
    $('.line-burger').toggleClass('line-active');
    $('.main-header__list').slideToggle();
});

$(window).resize(function () {
    if ($(window).width() >= 840) {
        $('.main-header__list').attr('style', '');
        $('.line-burger').removeClass('line-active');
    }
    showLink();
});

$('.main-header__button button').on('click', function (e) {
    $('.main-header__input').trigger('focus');
    $('.main-header__search').addClass('main-header__search-active');
});

$('html').on('click', function (e) {
    if (!$(e.target).is('.main-header__button button, .main-header__input, main-header__search-wrap, main-header__search-wrap, main-header__search-btn')) {
        $('.main-header__search').removeClass('main-header__search-active');
    }
});

$('.btn--write').on('click', function (e) {
    $('.overlay-request').addClass('overlay-active');
});

$('body').on('click', function (e) {
    if ($(e.target).is('.overlay-request, .overlay-video, .overlay-close')) {
        $('.overlay-request').removeClass('overlay-active');
        $('.overlay-video').removeClass('overlay-active');
        $('.inner__video iframe').remove();
    }
});

$('.main-header__mode').on('change', function (event) {
    if (event.target.tagName == "INPUT") {
        $('html').removeClass('dark', 'light');
        $('html').addClass(event.target.value);
    }
})

const sliderInfo = $('.info__elem');
let arrowsInfo = $('.info__wrapper').find('.info__arrows');
sliderInfo.slick({
    infinite: true,
    slidesToShow: 1,
    draggable: true,
    fade: false,
    arrows: true,
     appendArrows: arrowsInfo,
    prevArrow: '<button class="info__arrow info__arrow--dir_left"></div>',
    nextArrow: '<button class="info__arrow info__arrow--dir_right"></button>',
    dots: false,
    dotsClass: 'info__dots-list',
    responsive: [
        {
            breakpoint: 1340,
            settings: {
                dots: true,
                arrows: false,
            }
        },
        {
            breakpoint: 970,
            settings: {
                dots: true,
                arrows: false,
            }
        },
        {
            breakpoint: 661,
            settings: {
                dots: true,
                arrows: false,
            }
        }
    ]
});

if($('.info__slide').length<2) {
    $('.video__dots-list').hide();
}

const sliderVideo = $('.video__elem');
let arrowsVideo = $('.video__wrapper').find('.video__arrows');
sliderVideo.slick({
    infinite: true,
    slidesToShow: 3,
    draggable: true,
    fade: false,
    arrows: true,
     appendArrows: arrowsVideo,
    prevArrow: '<button class="video__arrow video__arrow--dir_left"></div>',
    nextArrow: '<button class="video__arrow video__arrow--dir_right"></button>',
    dots: false,
    dotsClass: 'video__dots-list',
    responsive: [
        {
            breakpoint: 1340,
            settings: {
                dots: true,
                arrows: false,
            }
        },
        {
            breakpoint: 970,
            settings: {
                slidesToShow: 2,
                dots: true,
                arrows: false,
            }
        },
        {
            breakpoint: 661,
            settings: {
                slidesToShow: 1,
                dots: true,
                arrows: false,
            }
        }
    ]
});

 function ChangeStateArrow(cols, dots) {
    let count = $(cols).length;
   var resizeTimeout;
    $(window).on('resize', function() {
      let win = $(this);
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        if ((win.width() <= 1351 && count > 3) || (win.width() <= 955 && count > 2) || (win.width() <= 645 && count > 1)) {
          $(dots).show();
        } else {
          $(dots).hide();
        }
      }, 100);
    }).trigger('resize', dots);
  }

ChangeStateArrow('.video__item', '.video__dots-list');

$('.blog__elem').on('click', function () {
    let elems = $('.blog__elem');
   elems.each(function(index, item) {
    $(item).removeClass('blog__elem--active'); 
    });
   $(this).addClass('blog__elem--active');
   changeFormat();
})

function changeFormat() {
    if($('.blog__elem--row').hasClass("blog__elem--active") ) {
        $('.blog').addClass('blog--inner')
    } else {
     $('.blog').removeClass('blog--inner')
    }
}

$('body').on('click', '.video__item', function (e) {
    var video = $(this).attr('data-video');
    $('.inner__block').append($('<iframe>', {
        src: video,
        frameborder: 0,
        on: {
            load: function () {
                $('.overlay-video').addClass('overlay-active');
            }
        }
    }))

});

$('.block__all').on('click', function () {
    $(this).hide();
    $('.block__link').show();
});

function showLink() {
const linkAll = $('.block__link');

    linkAll.each(function(index, item) {
      if (index > 4) {
        
          $(item).css({
            'display': 'none'
          });
        } else {
          $(item).css({
            'display': 'block'
          });
        }
    })

    if(linkAll.length>4) {
         $('.block__all').css({
            'display': 'block'
          });
    } else {
         $('.block__all').css({
            'display': 'none'
          });
    }

    if ($(window).width() < 1050) {
         $('.block__all').css({
            'display': 'none'
          });
    }
}

showLink();

if($('#news').length > 0) {
    var url = window.location.pathname;
    if(url.indexOf('/page') !== -1) {
        var offset = $('#news').offset().top;
        $('html, body').animate({scrollTop: offset + 'px'}, 700);
    }
}

(function() {
    if($('.single__text iframe').length > 0) {
        $('.single__text iframe').each(function() {
            $(this).unwrap('p').wrap('<div class="single__relative"><div class="single__relative--inner"></div></div>');
        })
    }
})();

function validate(input, length, regExp, error, phone) {

    $(input).on('blur keyup', function () {
        var value = $(this).val();
        var that = $(this);

        regExp = regExp == '' ? /./ : regExp;

        if (phone === true) {
            bool_reg = !regExp.test(value);
        } else {
            bool_reg = regExp.test(value);
        }

        if (value.length > length && value !== '' && bool_reg) {
            that.removeClass('form-fail').addClass('form-done');
            $(error).slideUp();
        } else {
            that.removeClass('form-done').addClass('form-fail');
            $(error).slideDown();
        }
    });

}

// деакцивация кнопки если есть поле с ошибкой

function disBtn(input, btn, bool) {
    var input = $(input);
    input.on('blur keyup', function () {

        if (input.hasClass('form-fail') || bool == true) {
            $(btn).attr('disabled', 'disabled');
        } else {
            $(btn).removeAttr('disabled');
        }

    });

}

// для проверки при нажатии

function valClick(input, length, regExp, error, phone) {
    var value = $(input).val();

    regExp = regExp == '' ? /./ : regExp;

    if (phone === true) {
        bool_reg = regExp.test(value);
    } else {
        bool_reg = !regExp.test(value);
    }

    if (value.length < length || value === '' || bool_reg) {
        $(input).addClass('form-fail');
        $(error).slideDown();
    }
}

//  деакцивация кнопки при нажатии

function disBtnClick(input, btn) {
    var input = $(input);

    if (input.hasClass('form-fail')) {
        $(btn).attr('disabled', 'disabled');
        return false;
    } else {
        return true;
    }

}

$('input[type="tel"]').mask("+38 (999) 999-99-99");

var regName = /^[a-zA-Zа-яА-ЯёЁIi]+/;
var regPhone = /[_]/i;
var regEmail = /.+@.+\..+/i;
var regNumber = /^\d{1,}$/;

$('#btn--contact').on('click', function() {
    var name = $('#c_name').val();
    var phone = $('#c_phone').val();
    var email = $('#c_email').val();
    var msg = $('#c_msg').val();

    validate('#c_name', 1, regName, '.contacts__fail--name');
    validate('#c_msg', 1, '', '.contacts__fail--msg');
    disBtn('#c_name, #c_msg', '#btn--contact');

    valClick('#c_name', 1, regName, '.contacts__fail--name');
    valClick('#c_msg', 1, '', '.contacts__fail--msg');
    var btn_bool = disBtnClick('#c_name, #c_msg', '#btn--contact');

    if( contactCaptcha() && btn_bool ) {
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'contact',
                name: name,
                phone: phone,
                email: email,
                msg: msg,
            },
        }).done(function(data) {
            $('#c_name, #c_phone, #c_email, #c_msg').val('').removeClass('form-done');
            if(lang.indexOf('/ru/') !== -1) {
                var text = "Ваше сообщение успешно отправлено!";
            } else {
                var text = "Ваше повідомлення успішно відправлено!";
            }
             
            $('.msg-modal').html(text).addClass('msg-modal-active');
            setTimeout(function() {
                $('.msg-modal').removeClass('msg-modal-active');
            }, 2500); 
        });
    }
    return false;
});

$('#btn--request').on('click', function() {
    var name = $('#r_name').val();
    var phone = $('#r_phone').val();
    var email = $('#r_email').val();
    var msg = $('#r_msg').val();

    validate('#r_name', 1, regName, '.request__fail--name');
    validate('#r_msg', 1, '', '.request__fail--msg');
    disBtn('#c_name, #r_msg', '#btn--request');

    valClick('#r_name', 1, regName, '.request__fail--name');
    valClick('#r_msg', 1, '', '.request__fail--msg');
    var btn_bool = disBtnClick('#r_name, #r_msg', '#btn--request');

    if( requestCaptcha() && btn_bool ) {
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'contact',
                name: name,
                phone: phone,
                email: email,
                msg: msg,
            },
        }).done(function(data) {
            $('#r_name, #r_phone, #r_email, #r_msg').val('').removeClass('form-done');
            $('.overlay-request').removeClass('overlay-active');
            if(lang.indexOf('/ru/') !== -1) {
                var text = "Ваше сообщение успешно отправлено!";
            } else {
                var text = "Ваше повідомлення успішно відправлено!";
            }
             
            $('.msg-modal').html(text).addClass('msg-modal-active');
            setTimeout(function() {
                $('.msg-modal').removeClass('msg-modal-active');
            }, 2500); 
        });
    }
    return false;
});

// cookie
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }

    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

var cookie_theme = getCookie('theme');
if(!cookie_theme) {
    var theme = $('html').attr('class');
    setCookie('theme', theme, {expires: 1209600, path: '/'});
}

$('input[name="theme"]').on('change', function() {
    setCookie('theme', $(this).val(), {expires: 1209600, path: '/'});
});

$('.single__like').on('click', function() {
    var self = $(this);
    var id = self.data('id');
    var cookie_like = getCookie('like-' + id);
    if(cookie_like) {
        $('.single__like').data('ajax', false);
    } else {
        $('.single__like').data('ajax', true);
    }

    if(self.data('ajax')) {
        $('.single__like').data('ajax', false);
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'like',
                id: id,
            },
        }).done(function(data) {
            var obj = JSON.parse(data);
            if(obj.status == 'done') {
                $('[data-id="' + id + '"]')
                    .addClass('like--active')
                    .data('ajax', false)
                    .find('p')
                    .text(obj.count);
                setCookie('like-' + id, true, {expires: 31536000, path: '/'});
            }
        });
    }

    return false;    
});

$('.info__like, .blog__like').on('click', function() {
    var self = $(this);
    var id = self.data('id');
    var cookie_like = getCookie('like-' + id);
    if(cookie_like) {
        self.data('ajax', false);
    } else {
        self.data('ajax', true);
    }

    if(self.data('ajax')) {
        self.data('ajax', false);
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'like',
                id: id,
            },
        }).done(function(data) {
            var obj = JSON.parse(data);
            if(obj.status == 'done') {
                $('[data-id="' + id + '"]')
                    .addClass('like--active')
                    .data('ajax', false)
                    .find('p')
                    .text(obj.count);
                setCookie('like-' + id, true, {expires: 31536000, path: '/'});
            }
        });
    }

    return false;    
});

});