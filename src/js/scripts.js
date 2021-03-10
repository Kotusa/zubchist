$(document).ready(function () {
  mobile();
  informationSlider();
  compilationsSlider();
  saleSlider();
  price();
  accordion();
  timer();
  amountCounter();
  toggleFavourite();
  modal();
  tabs();
  dropdown();
});

function mobile() {
  $('[rel="js-mobile-toggle"]').on('click', function () {
    $(this).toggleClass('active');
    $('[rel="js-mobile-menu"]').toggleClass('active');
    $('[rel="js-mobile-search"]').toggleClass('hidden');
    $('body').toggleClass('locked');
  });
}

function slidersTemplate(parent, options) {
  let swiperInit;
  let slider = parent.find('[rel="js-slider"]');
  swiperInit = new Swiper(slider[0], options);
}

function informationSlider() {
  let sliderParent = $('[rel="js-information"]');
  let options = {
    slidesPerView: 1.3,
    spaceBetween: 15,
    loop: true,
    navigation: {
      nextEl: sliderParent.find('.b-custom-navigation__button--next')[0],
      prevEl: sliderParent.find('.b-custom-navigation__button--prev')[0],
    },
    breakpoints: {
      380: {
        slidesPerView: 1.45,
      },
      420: {
        slidesPerView: 2,
      },
      600: {
        slidesPerView: 2.3,
      },
      680: {
        slidesPerView: 3,
      },
    },
  };
  slidersTemplate(sliderParent, options);
}

function compilationsSlider() {
  let sliderParent = $('[rel="js-compilation"]');
  sliderParent.each(function () {
    let options = {
      slidesPerView: 2.4,
      spaceBetween: 15,
      loop: true,
      navigation: {
        nextEl: $(this).find('.b-custom-navigation__button--next')[0],
        prevEl: $(this).find('.b-custom-navigation__button--prev')[0],
      },
      slidesOffsetBefore: 1,
      breakpoints: {
        360: {
          slidesPerView: 2.9,
        },
        420: {
          slidesPerView: 3.4,
        },
        550: {
          slidesPerView: 4,
        },
        680: {
          slidesPerView: 5,
        },
        990: {
          slidesPerView: 6,
        },
      },
    };
    slidersTemplate($(this), options);
  });
}

function saleSlider() {
  let sliderParent = $('[rel="js-compilation-sale"]');
  let options = {
    slidesPerView: 2.4,
    spaceBetween: 10,
    slidesOffsetBefore: 0,
    loop: true,
    navigation: {
      nextEl: sliderParent.find('.b-custom-navigation__button--next')[0],
      prevEl: sliderParent.find('.b-custom-navigation__button--prev')[0],
    },
    breakpoints: {
      360: {
        slidesPerView: 2.9,
      },
      420: {
        slidesPerView: 3.4,
      },
      550: {
        slidesPerView: 4,
      },
      576: {
        slidesPerView: 3.1,
      },
      780: {
        slidesPerView: 3.5,
      },
      850: {
        slidesPerView: 4,
        slidesOffsetBefore: 10,
      },
    },
  };
  slidersTemplate(sliderParent, options);
}

function price() {
  function normalPrice(str) {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }
  let price = $('[rel="js-price"]');
  price.each(function () {
    $(this).html(normalPrice($(this).html()));
  });
}

function accordion() {
  let accordion = $('[rel="js-accordion-toggle"]');
  function accordionToggle() {
    accordion.on('click', function () {
      $(this).toggleClass('active');

      if ($(this).hasClass('active')) {
        $(this).next().slideDown();
      } else {
        $(this).next().slideUp();
      }
    });
  }

  function mobileAccordionToggle() {
    accordion.next().slideUp();
    accordionToggle();
  }
  if ($(window).innerWidth() < 576) {
    mobileAccordionToggle();
  }
}

function timer() {
  let targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 12);
  let hoursVal = $('[rel="js-timer-hours"]');
  let minutesVal = $('[rel="js-timer-minutes"]');
  let secondsVal = $('[rel="js-timer-seconds"]');

  function timeCount() {
    let now = new Date();
    let leftUntil = targetDate - now;

    let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
    let minutes = Math.floor(leftUntil / 1000 / 60) % 60;
    let seconds = Math.floor(leftUntil / 1000) % 60;

    hoursVal.html(hours < 10 ? '0' + hours : hours);
    minutesVal.html(minutes < 10 ? '0' + minutes : minutes);
    secondsVal.html(seconds < 10 ? '0' + seconds : seconds);
  }

  timeCount();
  setInterval(timeCount, 1000);
}

function amountCounter() {
  let plusButton = $('[rel="js-plus-button"]');
  let minusButton = $('[rel="js-minus-button"]');

  plusButton.on('click', function () {
    $(this)
      .parent()
      .prev()
      .val(+$(this).parent().prev().val() + 1);
  });
  minusButton.on('click', function () {
    if ($(this).parent().prev().val() > 0) {
      $(this)
        .parent()
        .prev()
        .val(+$(this).parent().prev().val() - 1);
    }
  });
}

function toggleFavourite() {
  $('[rel="js-favourite"]').on('click', function () {
    $(this).parent().toggleClass('active');
  });
}

function modal() {
  let modalLinks = $('[rel="js-modal-opener"]');
  if (modalLinks.length) {
    modalLinks.on('click', function (event) {
      event.preventDefault();
      let target = $(this);
      let modalID = target.attr('href').replace('#', '');
      let modal = $(`#${modalID}`);
      $('body').css({
        'padding-right': `${calculateScrollBarWidth()}px`,
        overflow: 'hidden',
      });
      modal.addClass('b-modal--active');

      let close = $('[rel="js-modal-closer"]');

      close.on('click', function () {
        let modal = $(this).closest('.b-modal');
        modal.removeClass('b-modal--active');
        modal.on('transitionend', showScroll);
      });

      $(document).on('click', function (event) {
        if ($(event.target).is('.b-modal--active')) {
          let modal = $(event.target).closest('.b-modal');
          modal.removeClass('b-modal--active');
          modal.on('transitionend', showScroll);
        }
      });

      $(document).on('keydown', function (event) {
        if (event.key == 'Escape') {
          let modal = $('.b-modal--active');
          modal.removeClass('b-modal--active');
          modal.on('transitionend', showScroll);
        }
      });

      function showScroll(event) {
        if (event.type === 'transitionend') {
          $('body').css({
            'padding-right': '',
            overflow: 'visible',
          });
          $(event.target).closest('.b-modal').off('transitionend', showScroll);
        }
      }

      function calculateScrollBarWidth() {
        var inner = document.createElement('p');
        inner.style.width = '100%';
        inner.style.height = '200px';
        var outer = document.createElement('div');
        outer.style.position = 'absolute';
        outer.style.top = '0px';
        outer.style.left = '0px';
        outer.style.visibility = 'hidden';
        outer.style.width = '200px';
        outer.style.height = '150px';
        outer.style.overflow = 'hidden';
        outer.appendChild(inner);
        document.body.appendChild(outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2) w2 = outer.clientWidth;
        document.body.removeChild(outer);
        let scrollBarWidth = w1 - w2;
        return scrollBarWidth;
      }
    });
  }
}

function tabs() {
  let tabs = $('[rel="js-tabs"]');

  tabs.each(function () {
    let currentTabs = $(this);

    let buttons = currentTabs.find('[rel="js-tabs-button"]');
    let targets = currentTabs.find('[rel="js-tabs-target"]');

    buttons.on('click', function (event) {
      event.preventDefault();
      let currentButton = $(this);

      buttons.removeClass('active');
      currentButton.addClass('active');

      let index = buttons.index(currentButton);
      showActiveTarget(index);
    });

    function showActiveTarget(index) {
      targets.removeClass('active');
      targets.eq(index).addClass('active');
    }
  });
}

function dropdown() {
  let dropdowns = $('[rel="js-dropdown"]');
  $(document).on('click', function (event) {
    if (!$(event.target).is(dropdowns) && !$(event.target).closest(dropdowns)) {
      $('[rel="js-dropdown"]').removeClass('opened');
    } else {
      let target = $(event.target).closest(dropdowns);
      $('[rel="js-dropdown"]').not(target).removeClass('opened');
      if (target.hasClass('opened')) {
        target.removeClass('opened');
      } else {
        target.addClass('opened');
      }
    }
  });

  dropdowns.each(function () {
    let dropdown = $(this);
    let dropdownHead = dropdown.find('[rel="js-dropdown-head"]');
    let dropdownContent = dropdown.find('[rel="js-dropdown-content"]');
    let selectedValue = dropdownHead.find('span');

    let options = dropdownContent.children();

    options.on('click', function () {
      let option = $(this);

      options.removeClass('selected');
      selectedValue.html(option.html());
      option.addClass('selected');
    });
  });
}
