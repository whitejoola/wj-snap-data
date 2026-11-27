// JavaScript Document
(function() {
  var FITTING_SPEC_DATA = {
    "48613860": { // ハイストスーツ 781503-782502-776507-776508
      slides: [
        { img: "https://whitejoola.github.io/wj-snap-data/776507-n_m360.jpg", url: "" },
        { img: "https://whitejoola.github.io/wj-snap-data/776508-s_360.jpg", url: "" },
        { img: "https://whitejoola.github.io/wj-snap-data/776507_ms360.jpg", url: "" },
        { img: "https://whitejoola.github.io/wj-snap-data/776508-e_360.jpg", url: "" },
        { img: "https://whitejoola.github.io/wj-snap-data/776508-m_360.jpg", url: "" },
        { img: "https://whitejoola.github.io/wj-snap-data/776507-s-s_o360.jpg", url: "" },
        { img: "https://whitejoola.github.io/wj-snap-data/776507-m-s_o360.jpg", url: "" },
        { img: "https://whitejoola.github.io/wj-snap-data/776507-m-m_k360.jpg", url: "" },
        { img: "https://whitejoola.github.io/wj-snap-data/776507-l-m_k360.jpg", url: "" },
        { img: "https://whitejoola.github.io/wj-snap-data/776507-m-a_a360.jpg", url: "" },
        { img: "https://whitejoola.github.io/wj-snap-data/776507-l-a_a360.jpg", url: "" },
        { img: "https://whitejoola.github.io/wj-snap-data/776508-n_360l.jpg", url: "" },
        { img: "https://whitejoola.github.io/wj-snap-data/776508-n_360ll.jpg", url: "" }
      ],
      spec: {
        img: "https://base-ec2.akamaized.net/apps/item_layout/images/tmp/img_c6e9985b0e7891a483fe9967d2708e98.jpg",
        url: "https://whitejoola.official.ec/blog/2026/07/28/154231"
      }
    }
  };

  function initFittingSpec() {
    var match = location.pathname.match(/\/items\/(\d+)/);
    var itemId = match ? match[1] : null;
    var item = itemId && FITTING_SPEC_DATA[itemId];
    var root = document.getElementById("wj-fitting-spec");
    if (!item || !root) return;

    var slidesEl = document.getElementById("wj-fitting-slides");
    var slideList = Array.isArray(item.slides) ? item.slides : [];
    if (slidesEl && slideList.length > 0) {
      slidesEl.innerHTML = slideList.map(function(s) {
        var imgTag = '<img src="' + s.img + '" alt="">';
        var inner = s.url
          ? '<a href="' + s.url + '" target="_blank" rel="noopener">' + imgTag + '</a>'
          : imgTag;
        return '<div class="swiper-slide">' + inner + '</div>';
      }).join("");
    }

    var specEl = document.getElementById("wj-spec-content");
    var specLinkWrap = document.getElementById("wj-spec-link-wrap");
    var specLinkEl = document.getElementById("wj-spec-link");

    if (specEl && item.spec && item.spec.img) {
      specEl.innerHTML = '<img src="' + item.spec.img + '" alt="">';
    }

    if (specLinkWrap && specLinkEl) {
      if (item.spec && item.spec.url) {
        specLinkEl.href = item.spec.url;
        specLinkWrap.style.display = "block";
      } else {
        specLinkWrap.style.display = "none";
      }
    }

    root.style.display = "block";

    if (typeof Swiper === "function" && slideList.length > 0) {
      new Swiper(".wj-fitting-swiper", {
        loop: slideList.length > 1,
        slidesPerView: 1,
        navigation: {
          nextEl: ".wj-fitting-next",
          prevEl: ".wj-fitting-prev"
        },
        pagination: {
          el: ".wj-fitting-pagination",
          clickable: true
        }
      });
    }

    var tabs = root.querySelectorAll(".wj-fs-tab");
    var panels = root.querySelectorAll(".wj-fs-panel");
    tabs.forEach(function(tab) {
      tab.addEventListener("click", function() {
        var target = tab.getAttribute("data-tab");
        tabs.forEach(function(t) { t.classList.toggle("is-active", t === tab); });
        panels.forEach(function(p) {
          p.classList.toggle("is-active", p.getAttribute("data-panel") === target);
        });
      });
    });
  }

  window.addEventListener("load", initFittingSpec);
})();