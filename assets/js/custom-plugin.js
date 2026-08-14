document.addEventListener("DOMContentLoaded", function () {
  // header mood icon
  const icon = document.getElementById("mood_icon");
  const mood_toggle = document.getElementById("toggle");

  mood_toggle &&
    mood_toggle.addEventListener("click", function () {
      if (icon.classList.contains("ph-sun")) {
        icon.classList.remove("ph-sun");
        icon.classList.add("ph-moon");
      } else {
        icon.classList.add("ph-sun");
        icon.classList.remove("ph-moon");
      }
    });

  // service slider
  const swiper = new Swiper(".service_slider", {
    spaceBetween: 60,
    speed: 6000,
    loop: true,
    leftToRight: true,
    autoplay: {
      delay: 1,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },

      750: {
        slidesPerView: 1.8,
      },
      1200: {
        slidesPerView: 2,
      },

      1500: {
        slidesPerView: 2.3,
      },
    },
  });

  // tab
  const tabs = document.querySelectorAll("[data-tab-target]");
  const tabContents = document.querySelectorAll("[data-tab-content]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = document.querySelector(tab.dataset.tabTarget);
      tabContents.forEach((tabContent) => {
        tabContent.classList.remove("active");
      });
      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });
      tab.classList.add("active");
      target.classList.add("active");
    });
  });

  // odometer
  const odometerElements = document.querySelectorAll(".odometer");
  function initOdometer(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const odometerElement = entry.target.querySelector(".odometer");
        const elementValue = Number(
          odometerElement.getAttribute("data-counter-value")
        );
        const od = new Odometer({
          el: odometerElement,
          value: 0,
          format: "",
          theme: "digital",
        });
        od.update(elementValue);
        observer.unobserve(entry.target);
      }
    });
  }

  // counter up
  function counterUp(el, t) {
    let n = 0;
    const r = parseFloat(el.innerHTML);
    const finalValue = Number.isInteger(r) ? parseInt(r, 10) : r;
    const i = t.duration || 2000;
    const u = t.delay || 16;
    const step = finalValue / (i / u);

    const l = setInterval(() => {
      n += step;
      el.innerHTML = Number.isInteger(finalValue)
        ? Math.floor(n)
        : n.toFixed(2);
      if (n >= finalValue) {
        clearInterval(l);
        el.innerHTML = finalValue;
      }
    }, u);
  }

  const counterElements = document.querySelectorAll(".counter");
  counterElements.forEach((el) => {
    const IO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counterUp(entry.target, { duration: 2000, delay: 16 });
          IO.unobserve(entry.target); // Stop observing once the element is intersecting
        }
      });
    });
    IO.observe(el);
  });


  // banner-carousel
  let bannerTranslate = document.querySelector('.banner-translate-carousel');
  if (bannerTranslate) {
    const swiper = new Swiper(bannerTranslate, {
      effect: "fade",
      fadeEffect: { crossFade: true },
      loop: false,
      autoplay: {
        delay: 200000,
      },
      spaceBetween: 24,
      slidesPerView: 1,
      allowTouchMove: true,
      pagination: {
        el: bannerTranslate.closest('section').querySelector('.slider-pagination'),
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          const currentEl = bannerTranslate.closest('section').querySelector('.slider-current');
          const totalEl = bannerTranslate.closest('section').querySelector('.slider-total');
          const sliderPagination = bannerTranslate.closest('section').querySelector('.slider-pagination');
          sliderPagination.style.width = 'initial';
          if (currentEl) currentEl.innerHTML = current;
          if (totalEl) totalEl.innerHTML = total;
        }
      }
    });
    const nextBtn = bannerTranslate.closest('section').querySelector('.ara-next');
    const prevBtn = bannerTranslate.closest('section').querySelector('.ara-prev');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (swiper.activeIndex === swiper.slides.length - 1) {
          swiper.slideTo(0);
        } else {
          swiper.slideNext();
        }
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (swiper.activeIndex === 0) {
          swiper.slideTo(swiper.slides.length - 1);
        } else {
          swiper.slidePrev();
        }
      });
    }
  }



  // magnific-popup
  $('.popup-video').magnificPopup({
    type: 'iframe'
  });





  // carouselInfinity
  let carouselInfinity = document.querySelectorAll('.carousel-infinity');
  if (carouselInfinity.length > 0) {
    carouselInfinity.forEach(function (carousel) {
      const swiper = new Swiper(carousel, {
        spaceBetween: 0,
        centeredSlides: false,
        speed: 13000,
        autoplay: {
          delay: 0,
        },
        loop: true,
        slidesPerView: 'auto',
        allowTouchMove: true,
        disableOnInteraction: true,
      });
    });
  }

  // testimonial slider
  const testimonial = new Swiper(".testimonial_slider", {
    spaceBetween: 30,
    speed: 2500,
    loop: true,
    leftToRight: true,
    autoplay: {
      delay: 2500,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },

      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });

  // faq according
  const faqs = document.querySelectorAll(".faq");
  faqs &&
    faqs.forEach((faq) => {
      faq.addEventListener("click", () => {
        const activeItem = document.querySelector(".faqactive");
        const hiddenIcon = document.querySelector(".hiddenIcon");
        const faqIcon = faq.querySelector(".faqIcon");

        if (faq.classList.contains("faqactive")) {
          faq.classList.remove("faqactive");
          faqIcon.classList.remove("hiddenIcon");
        } else {
          activeItem?.classList.remove("faqactive");
          hiddenIcon?.classList.remove("hiddenIcon");

          faq.classList.add("faqactive");
          faqIcon.classList.add("hiddenIcon");
        }
      });
    });

  // clients slider
  const clients = new Swiper(".clients_slider", {
    spaceBetween: 24,
    speed: 6000,
    loop: true,
    leftToRight: true,
    autoplay: {
      delay: 1,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },

      1200: {
        slidesPerView: 5,
      },
      1400: {
        slidesPerView: 6,
      },
    },
  });

  // dark mood
  const body = document.querySelector("body");
  const toggle = document.querySelector(".mood_toggle");

  let getMood = localStorage.getItem("mode");
  if (getMood && getMood === "dark") {
    body.classList.add("dark");
    body.classList.add("active");
  }

  toggle.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (!body.classList.contains("dark")) {
      return localStorage.setItem("mode", "light");
    }
    localStorage.setItem("mode", "dark");
  });

  toggle.addEventListener("click", () => toggle.classList.toggle("active"));
  if (document.body.classList.contains("dark")) {
    icon.classList.add("ph-sun");
    icon.classList.remove("ph-moon");
  } else {
    icon.classList.remove("ph-sun");
    icon.classList.add("ph-moon");
  }

  // contact -Send us a message
  const btn = document.getElementById("contact-submit-btn");
  btn && emailjs.init("Your public key");
  const contactForm = document.getElementById("contact-form");
  contactForm &&
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      btn.value = "Sending...";
      const serviceID = "Your service id";
      const templateID = "Your template id";
      emailjs.sendForm(serviceID, templateID, this).then(
        () => {
          btn.value = "Send Email";
          alert("Sent!");
          document.querySelector("#name").value = "";
          document.querySelector("#email").value = "";
          document.querySelector("#subject").value = "";
          document.querySelector("#message").value = "";
        },
        (err) => {
          btn.value = "Send Email";
          alert(JSON.stringify(err));
        }
      );
    });

  // rtl mood
  const btnEl = document.querySelector("#rtlBtn");
  const htmlTag = document.querySelector("html");
  const rtlCheck = localStorage.getItem("dir") === "rtl";
  if (rtlCheck) {
    htmlTag.dir = "rtl";
    btnEl.innerHTML = "ltr";
  }
  function toggleDirection() {
    if (btnEl.innerHTML === "rtl") {
      htmlTag.dir = "rtl";
      btnEl.innerHTML = "ltr";
      localStorage.setItem("dir", "rtl");
    } else {
      htmlTag.dir = "ltr";
      btnEl.innerHTML = "rtl";
      localStorage.setItem("dir", "ltr");
    }
  }
  btnEl.addEventListener("click", toggleDirection);
  //end
});
