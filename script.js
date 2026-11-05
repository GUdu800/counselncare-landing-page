(function () {
  'use strict';

  // 1. Preserve Paid Ad UTM & fbclid Parameters Across All Booking Links
  var searchParams = new URLSearchParams(window.location.search);
  var bookingLinks = document.querySelectorAll('.js-booking-link');

  if (searchParams.toString()) {
    bookingLinks.forEach(function (link) {
      try {
        var url = new URL(link.href);
        searchParams.forEach(function (val, key) {
          url.searchParams.set(key, val);
        });
        link.href = url.toString();
      } catch (e) {
        // Ignore invalid URLs
      }
    });
  }

  // 2. Interactive VSL Video Player + Topic Switcher
  var posterOverlay = document.getElementById('vslPoster');
  var videoIframe = document.getElementById('vslIframe');
  var vslTabs = document.querySelectorAll('.vsl-tab');
  var posterTitle = document.getElementById('posterTitle');
  var currentVideoId = 'zdC5W8EkxtQ';

  function loadAndPlayVideo(videoId) {
    currentVideoId = videoId;
    if (posterOverlay) {
      posterOverlay.classList.add('hidden');
    }
    if (videoIframe) {
      videoIframe.src =
        'https://www.youtube.com/embed/' +
        encodeURIComponent(videoId) +
        '?autoplay=1&rel=0&modestbranding=1';
    }
  }

  if (posterOverlay) {
    posterOverlay.addEventListener('click', function () {
      loadAndPlayVideo(currentVideoId);
    });
  }

  vslTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      vslTabs.forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      var vid = tab.getAttribute('data-video-id');
      var title = tab.getAttribute('data-video-title');
      if (posterTitle && title) {
        posterTitle.textContent = title;
      }
      loadAndPlayVideo(vid);
    });
  });

  // 3. Interactive Symptom Checklist Mirror + Dynamic WhatsApp Pre-fill
  var symptomCards = document.querySelectorAll('.symptom-card');
  var feedbackBar = document.getElementById('symptomFeedback');
  var symptomCountEl = document.getElementById('symptomCount');
  var waLinks = document.querySelectorAll('.js-wa-link');

  function updateSymptomSelection() {
    var selected = [];
    symptomCards.forEach(function (card) {
      if (card.classList.contains('checked')) {
        var label = card.getAttribute('data-symptom');
        if (label) selected.push(label);
      }
    });

    if (feedbackBar && symptomCountEl) {
      if (selected.length > 0) {
        symptomCountEl.textContent = selected.length;
        feedbackBar.classList.add('active');
      } else {
        feedbackBar.classList.remove('active');
      }
    }

    var baseMsg =
      'Assalamu Alaikum / Hello Counsel N Care Team, I visited your page and would like to book a consultation session with Aftab Siddiqui Sir.';
    if (selected.length > 0) {
      baseMsg +=
        ' I am experiencing: ' + selected.slice(0, 4).join(', ') + '.';
    }
    var encoded = encodeURIComponent(baseMsg);
    waLinks.forEach(function (a) {
      a.href = 'https://wa.me/919324749190?text=' + encoded;
    });
  }

  symptomCards.forEach(function (card) {
    card.addEventListener('click', function () {
      card.classList.toggle('checked');
      var isChecked = card.classList.contains('checked');
      card.setAttribute('aria-pressed', isChecked ? 'true' : 'false');
      updateSymptomSelection();
    });
  });

  // 4. Testimonial Category Filter
  var filterPills = document.querySelectorAll('.filter-pill');
  var testimonialCards = document.querySelectorAll('.testimonial-card');

  filterPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      filterPills.forEach(function (p) {
        p.classList.remove('active');
      });
      pill.classList.add('active');
      var cat = pill.getAttribute('data-filter');

      testimonialCards.forEach(function (card) {
        var cardCat = card.getAttribute('data-category') || '';
        if (cat === 'all' || cardCat.indexOf(cat) !== -1) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Slide-in Sticky Bottom Bar (Scroll Past Hero or 8s Fallback)
  var sticky = document.getElementById('stickyCta');
  var shown = false;

  function showBar() {
    if (shown || !sticky) return;
    shown = true;
    sticky.classList.add('visible');
  }

  window.addEventListener(
    'scroll',
    function () {
      if (window.scrollY > window.innerHeight * 0.75) {
        showBar();
      }
    },
    { passive: true }
  );

  setTimeout(showBar, 8000);
})();
