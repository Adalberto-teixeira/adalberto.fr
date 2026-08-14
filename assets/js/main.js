"use strict";
document.addEventListener("DOMContentLoaded", function () {
  $(function ($) {
    // preloader
    $("#preloader")
      .delay(1000)
      .animate(
        {
          opacity: "0",
        },
        1000,
        function () {
          $("#preloader").css("display", "none");
        }
      );
    // Click to Scroll Top
    var ScrollTop = $(".scrollToTop");
    $(".scrollToTop").on("click", function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        600
      );
      return false;
    });
    // Sticky Header
    var fixed_top = $(".header-section");
    if ($(window).scrollTop() > 50) {
      fixed_top.addClass("animated fadeInDown header-fixed");
    } else {
      fixed_top.removeClass("animated fadeInDown header-fixed");
    }
    // navbar active header
    $(document).on("click", ".navigation ul li", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
    // Navbar add and close
    // mobile menubar
    const mobileSize = window.matchMedia("(max-width: 991px)");
    function handleMediaScreen(e) {
      if (e.matches) {
        $(".navbar-nav .sub").addClass("dropdown-menu");
        $(".navbar-nav .dropdown").removeClass("show-dropdown");
        $(".navbar-nav .sub").removeClass("sub-menu");

        $(".navbar-nav .dropdown-menu")
          .parent("li")
          .on("click", function (e) {
            if (e.target.className !== "dropdown-item") {
              $(this).find(">.dropdown-menu").toggle(300);
              e.stopPropagation();
            }
          });
      } else {
        $(".navbar-nav .dropdown-menu").parent("li").off("click");
        $("sub-dropdown").off("click");

        $(".navbar-nav .dropdown-menu").show();
        $(".navbar-nav .dropdown").addClass("show-dropdown");
        $(".navbar-nav .sub").addClass("sub-menu");
        $(".navbar-nav .sub").removeClass("dropdown-menu");
      }
    }
    handleMediaScreen(mobileSize);
    mobileSize.addEventListener("change", handleMediaScreen);

    // Navbar Custom Menu Button
    $(".navbar-toggler").on("click", function () {
      $(this).toggleClass("open");
    });

    // Navbar Active Class Only for HTML
    var curUrl = $(location).attr("href");
    var terSegments = curUrl.split("/");
    var desired_segment = terSegments[terSegments.length - 1];
    var removeGarbage = desired_segment.split(".html")[0] + ".html";
    var checkLink = $('.navbar-nav a[href="' + removeGarbage + '"]');
    var targetClass = checkLink.addClass("active");
    targetClass
      .parents(".sub-dropdown")
      .find("button")
      .first()
      .addClass("active");
    targetClass
      .parents(".show-dropdown")
      .find("button")
      .first()
      .addClass("active");

    $(".left-nav-icon").on("click", function () {
      $(".nav_aside").toggleClass("show");
    });

    $(".single-item .cmn-head").on("click", function () {
      $(this).parents(".single-item").toggleClass("active");
      $(this).parents(".single-item").siblings().removeClass("active");
    });

    $("section, .close-btn").on("click", function () {
      $(".single-item").removeClass("active");
    });

    // window on scroll function
    $(window).on("scroll", function () {
      // Sticky Header
      if ($(window).scrollTop() > 50) {
        fixed_top.addClass("animated fadeInDown header-fixed");
      } else {
        fixed_top.removeClass("animated fadeInDown header-fixed");
      }

      // Check Scroll
      if ($(this).scrollTop() < 600) {
        ScrollTop.removeClass("active");
      } else {
        ScrollTop.addClass("active");
      }
    });

    // active any class
    $(".clickable-active").click(function () {
      $(".clickable-active").removeClass("active");
      $(this).addClass("active");
    });

    // Home page active color
    let activeElement = null;

    $(".colorChangeTag").click(function () {
      if (activeElement !== null) {
        activeElement.css("color", "#190F47");
      }
      $(this).css("color", "#EC604F");
      activeElement = $(this);
    });

    // Navbar Auto Active Class
    var curUrl = $(location).attr("href");
    var terSegments = curUrl.split("/");
    var desired_segment = terSegments[terSegments.length - 1];
    var removeGarbage = desired_segment.split(".html")[0] + ".html";
    var checkLink = $('.menu-link a[href="' + removeGarbage + '"]');
    var targetClass = checkLink.addClass("active");
    targetClass.parents(".menu-item").addClass("active-parents");
    $(".active-parents > button").addClass("active");

    // navbar custom
    $(".navbar-toggle-btn").on("click", function () {
      $(".navbar-toggle-item").slideToggle(300);
      $("body").toggleClass("overflow-hidden");
      $(this).toggleClass("open");
    });
    $(".menu-item button").on("click", function () {
      $(this).siblings("ul").slideToggle(300);
    });

    // toggle search box
    $(".search-toggle-btn").on("click", function () {
      $(".search-toggle-box").slideToggle(300);
    });

    // text-wrapper
    function splitAllTextWrappers() {
      const wrappers = document.querySelectorAll('.text-wrapper');
      wrappers.forEach(wrapper => {
        const sourceText = wrapper.querySelector('.source-text');
        const wrappedTextDiv = wrapper.querySelector('.wrapped-text');
        if (!sourceText || !wrappedTextDiv) return;
        wrappedTextDiv.innerHTML = '';
        const containerWidth = wrapper.offsetWidth;
        const computedStyle = getComputedStyle(sourceText);
        const font = computedStyle.font;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = font;
        const words = sourceText.textContent.trim().split(/\s+/);
        let currentLine = '';
        let lineWords = [];
        words.forEach(word => {
          const testLine = lineWords.concat(word).join(' ');
          const testWidth = context.measureText(testLine).width;
          if (testWidth <= containerWidth) {
            lineWords.push(word);
          } else {
            const lineSpan = document.createElement('span');
            lineSpan.className = 'text-line';
            lineSpan.style.fontSize = 'inherit';
            lineSpan.textContent = lineWords.join(' ');
            wrappedTextDiv.appendChild(lineSpan);
            lineWords = [word];
          }
        });
        if (lineWords.length > 0) {
          const lineSpan = document.createElement('span');
          lineSpan.className = 'text-line';
          lineSpan.style.fontSize = 'inherit';
          lineSpan.textContent = lineWords.join(' ');
          wrappedTextDiv.appendChild(lineSpan);
        }
        const title = wrappedTextDiv.querySelectorAll('.title .text-line');
        title.forEach((line, index) => {
          line.style.transitionDelay = `${index * 0.3}s`;
        });
        const paragraph = wrappedTextDiv.querySelectorAll('.paragraph .text-line');
        const totalLines = paragraph.length;
        paragraph.forEach((line, index) => {
          const delay = (totalLines - 1 - index) * 0.3;
          line.style.transitionDelay = `${delay}s`;
        });
      });
    }
    window.addEventListener('load', splitAllTextWrappers);
    window.addEventListener('resize', splitAllTextWrappers);
    
    // data background
    $("[data-bg]").each(function () {
      $(this).css(
        "background-image",
        "url(" + $(this).attr("data-bg") + ")"
      );
    });

    // Current Year
    $(".currentYear").text(new Date().getFullYear());    

    $(window).resize(function () {
      handleWindowResize();
    });

    // Function to handle window resize
    function handleWindowResize() {
      var windowWidth = $(window).width();
      if (windowWidth <= 767) {
        $(document).click(function (event) {
          if (
            !$(event.target).closest(".search-toggle-box, .search-toggle-btn")
              .length
          ) {
            $(".search-toggle-box").slideUp(300);
          }
        });
      }
    }
    if ($(window).width() <= 767) {
      $(document).click(function (event) {
        if (
          !$(event.target).closest(".search-toggle-box, .search-toggle-btn")
            .length
        ) {
          $(".search-toggle-box").slideUp(300);
        }
      });
    }

    // ajax
    jQuery("#frmContactus").on("submit", function (e) {
      jQuery("#msg").html("");
      jQuery("#submit").html("Please wait....");
      jQuery("#submit").attr("disabled", true);
      jQuery.ajax({
        url: "mail.php",
        type: "POST",
        data: jQuery("#frmContactus").serialize(),
        success: function (result) {
          jQuery("#msg").html(result);
          jQuery("#submit").html("Send Message");
          jQuery("#submit").attr("disabled", false);
          jQuery("#frmContactus")[0].reset();

          setTimeout(function () {
            $(".alert-dismissible").fadeOut("slow", function () {
              $(this).remove();
            });
          }, 3000);
        },
      });
      e.preventDefault();
    });
  });
});

function sendToWhatsApp() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    alert("Merci de remplir tous les champs.");
    return;
  }

  const fullMessage = `Bonjour, je suis ${name}.\nEmail: ${email}\nObjet: ${subject}\nMessage: ${message}`;
  const encoded = encodeURIComponent(fullMessage);
  const phone = "33753911502";

  window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
}