$(document).ready(function() {

  $('.mobile-wrap').on('click', function() {
    $('.line-burger').toggleClass('line-active');
    $('.main-header__list').slideToggle();
  });

  $(window).resize(function() {
    if ($(window).width() >= 840) {
      $('.main-header__list').attr('style', '');
      $('.line-burger').removeClass('line-active');
    }
    showLink();

  });

  $('.main-header__button button').on('click', function(e) {
    $('.main-header__input').trigger('focus');
    $('.main-header__search').addClass('main-header__search-active');
  });

  $('html').on('click', function(e) {
    if (!$(e.target).is('.main-header__button button, .main-header__input, main-header__search-wrap, main-header__search-wrap, main-header__search-btn')) {
      $('.main-header__search').removeClass('main-header__search-active');
    }
  });

  $('.main-header__mode').on('change', function(e) {
    if (event.target.tagName == "INPUT") {
      $('html').removeClass('dark', 'light');
      $('html').addClass(event.target.value);
    }
  })

  const info = $('.info__elem');

  info.slick({
    infinite: true,
    // speed: 600,
    slidesToShow: 1,
    // autoplay: true,
    //autoplaySpeed:5000,
    draggable: true,
    fade: false,
    arrows: false,
    dots: false,
    dotsClass: 'info__dots-list',
    /* responsive: [{
       breakpoint: 781,
       settings: {
         dots: true,
       }
     }]*/

    responsive: [{
      breakpoint: 1351,
      settings: {
        dots: true
      }
    }]
  });

  $('.info__arrow--dir_right').on('click', function() {
    $('.info__elem').slick('slickNext');
  });

  const blog = $('.blog .blog__wrap');

  blog.slick({
    infinite: true,
    // speed: 600,
    slidesToShow: 3,
    // autoplay: true,
    //autoplaySpeed:5000,
    draggable: true,
    fade: false,
    arrows: false,
    dots: false,
    dotsClass: 'blog__dots-list',
    /* responsive: [{
       breakpoint: 781,
       settings: {
         dots: true,
       }
     }]*/

    responsive: [

      {
        breakpoint: 1340,
        settings: {
          dots: true
        }
      },

      {
        breakpoint: 970,
        settings: {
          slidesToShow: 2,
          dots: true
        }
      },
      {
        breakpoint: 661,
        settings: {
          slidesToShow: 1,
          dots: true
        }
      }
    ]
  });

  $('.blog__arrow--dir_right').on('click', function() {
    $('.blog__wrap').slick('slickNext');
  });


  const linkAll = $('.tags__box');
  console.log(linkAll);

  function showLink() {

    linkAll.each(function(index, item) {
      if (index > 4) {
        if ($(window).width() > 1050) {
          $(item).css({
            'display': 'none'
          });
        } else {
          $(item).css({
            'display': 'block'
          });
        }

      }
    })

  }
  showLink();

  $('.tags__details').on('click', function() {

    $(this).css({
      'display': 'none'
    });

    linkAll.each(function(index, item) {
      $(item).css({
        'display': 'block'
      });
    })

  });

  $('.blog__like, .info__like, .single__like').click(function(e) {

    var counter = Number($(this).children('p').html());
    let singleElems = $('.single__like');

    if ($(this).data('liked')) {
      counter -= 1;
      $(this).data('liked', false);

      singleElems.each(function(index, item) {
        $(item).data('liked', false);
      })

    } else {
      counter += 1;
      $(this).data('liked', true);

      singleElems.each(function(index, item) {
        $(item).data('liked', true);
      })
    }

    const single = $(this).data('single');

    if (single) {
      $('[data-single="true"] p').html(counter);
    } else {
      $(this).children('p').html(counter);
    }

  });

  function validate(input, length, regExp, error, phone) {

    $(input).on('blur keyup', function() {
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
    input.on('blur keyup', function() {

      if (input.hasClass('form-fail') || bool == true) {
        $(btn).attr('disabled', 'disabled');
      } else {
        $(btn).removeAttr('disabled');
      }

    });

  }

  // для проверки при нажатии

  function valClick(input, length, regExp, error, btn, phone) {
    var value = $(input).val();

    regExp = regExp == '' ? /./ : regExp;

    if (phone === true) {
      bool_reg = regExp.test(value);
    } else {
      bool_reg = !regExp.test(value);
    }

    if (value.length < length && value === '' && bool_reg) {
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

  function validateCheck(input) {
    $(input).on('change', function() {
      var check = $(this).prop('checked');
      var that = $(this);

      if (check) {
        that.removeClass('input-fail').addClass('input-done');
      } else {
        that.removeClass('input-done').addClass('input-fail');
      }
    });
  }

  var regName = /^[a-zA-Zа-яА-ЯёЁ]+/;
  var regPhone = /[_]/i;
  var regEmail = /.+@.+\..+/i;
  var regNumber = /^\d{1,}$/;

  validate('#с_name', 1, regName, '.contacts__fail--name');

  validate('#с_msg', 1, regName, '.contacts__fail--msg');

  disBtn('#с_name, #с_msg', '#btn--contact');

});
