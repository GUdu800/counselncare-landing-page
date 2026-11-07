(function () {
  'use strict';

  // 1. VSL Video Player + Topic Tabs
  var posterOverlay = document.getElementById('vslPoster');
  var videoIframe = document.getElementById('vslIframe');
  var vslTabs = document.querySelectorAll('.vsl-tab');
  var posterTitle = document.getElementById('posterTitle');
  var currentVideoId = 'zdC5W8EkxtQ';

  function loadAndPlayVideo(videoId) {
    currentVideoId = videoId;
    if (posterOverlay) posterOverlay.classList.add('hidden');
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
      if (posterTitle && title) posterTitle.textContent = title;
      loadAndPlayVideo(vid);
    });
  });

  // 2. Interactive 2x3 Symptom Tap Grid + Live Match Meter
  var symTiles = document.querySelectorAll('.sym-tile');
  var meterText = document.getElementById('meterText');
  var concernSelect = document.getElementById('clientConcern');

  function updateSymptomMeter() {
    var selected = [];
    symTiles.forEach(function (t) {
      if (t.classList.contains('checked')) {
        selected.push(t.getAttribute('data-symptom'));
      }
    });

    if (meterText) {
      if (selected.length === 0) {
        meterText.innerHTML =
          '<strong>Tap any symptom above:</strong> See how our root-cause CBT + ICBT method helps.';
      } else {
        meterText.innerHTML =
          '<strong>' +
          selected.length +
          ' pattern(s) matched:</strong> High recovery rate (80–90%) with structured 1-on-1 loop retraining.';
      }
    }

    // Pre-select matching track in checkout modal
    if (concernSelect && selected.length > 0) {
      var joined = selected.join(' ');
      if (joined.indexOf('Waswasa') !== -1) {
        concernSelect.value = 'Religious OCD (Waswasa / Scrupulosity)';
      } else if (joined.indexOf('Couple') !== -1) {
        concernSelect.value = 'Marriage & Couple Counseling';
      } else if (joined.indexOf('Panic') !== -1) {
        concernSelect.value = 'Panic Attacks & Severe Anxiety';
      } else {
        concernSelect.value = 'OCD & Intrusive Thoughts';
      }
    }
  }

  symTiles.forEach(function (tile) {
    tile.addEventListener('click', function () {
      tile.classList.toggle('checked');
      updateSymptomMeter();
    });
  });

  // 3. Interactive 4-Program Tabs
  var progTabs = document.querySelectorAll('.prog-tab');
  var progPanels = document.querySelectorAll('.prog-panel');

  progTabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      progTabs.forEach(function (b) {
        b.classList.remove('active');
      });
      progPanels.forEach(function (p) {
        p.classList.remove('active');
      });
      btn.classList.add('active');
      var target = document.getElementById('prog-' + btn.getAttribute('data-prog'));
      if (target) target.classList.add('active');
    });
  });

  // 4. Instant Slot & Payment Checkout Modal -> Redirects to thank-you.html
  var modal = document.getElementById('checkoutModal');
  var openBtns = document.querySelectorAll('.js-open-checkout');
  var closeBtn = document.getElementById('closeModal');
  var slotPills = document.querySelectorAll('.slot-pill');
  var bookingForm = document.getElementById('bookingForm');
  var selectedSlot = 'Today · 6:00 PM';

  openBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (modal) modal.classList.add('open');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      if (modal) modal.classList.remove('open');
    });
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  slotPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      slotPills.forEach(function (p) {
        p.classList.remove('active');
      });
      pill.classList.add('active');
      selectedSlot = pill.getAttribute('data-slot') || 'Today · 6:00 PM';
    });
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('clientName').value.trim() || 'Client';
      var phone = document.getElementById('clientPhone').value.trim() || '';
      var concern = document.getElementById('clientConcern').value;
      var bookingId = 'CNC-' + Math.floor(1000 + Math.random() * 9000);

      var tealFeedUrls = {
        'OCD & Intrusive Thoughts': 'https://tealfeed.com/care_891921/connect/call?callType=6a33e7d7be9e52a1656f9244',
        'Religious OCD (Waswasa / Scrupulosity)': 'https://tealfeed.com/care_891921/connect/package?packageId=6a33e7cf1e9ad26920c0e452',
        'Panic Attacks & Severe Anxiety': 'https://www.tealfeed.com/care_891921/connect/call?callType=6a4ce48f19832a00610cb914',
        'Marriage & Couple Counseling': 'https://tealfeed.com/care_891921/connect/call?callType=6a33e7dc1e9ad26920c0e475'
      };
      var tealUrl = tealFeedUrls[concern] || 'https://www.bookings.tealfeed.com/members/6a23e373c88ca55ecd261939';

      var qs = new URLSearchParams({
        name: name,
        phone: phone,
        concern: concern,
        slot: selectedSlot,
        id: bookingId,
        tealUrl: tealUrl
      });

      window.location.href = 'thank-you.html?' + qs.toString();
    });
  }
})();
