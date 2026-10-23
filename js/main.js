window.siteContent = {
  business: {
    name: "Posto Bichão",
    slogan: "Se é pra parar, para no Bichão.",
    address: "R. Roberto Romanelli, 843 - Jardim Riviera, Cambé – PR, 86187-015",
    city: "Cambé – PR",
    phone: "(43) 98431-1420",
    whatsapp: "5543988288537",
    whatsappDisplay: "(43) 98828-8537",
    rating: "4,9",
    reviewsCount: "73 comentários no Google",
    hoursWeekday: "Aberto 24 horas",
    hoursSunday: "07:00 às 20:00",
    googleMapsUrl: "https://maps.google.com/?q=Posto+Bichao+Cambe",
    googleRouteUrl: "https://maps.google.com/dir/?api=1&destination=Posto+Bichao+Cambe",
    wazeUrl: "https://waze.com/ul?q=Posto+Bichao+Cambe",
    instagramUrl: "https://instagram.com/postobichao"
  }
};

document.addEventListener('DOMContentLoaded', function () {
  // ── 0. SENSOR DE STATUS INTELIGENTE EM TEMPO REAL ───────────
  function updateLiveStatus() {
    var statusText = document.getElementById('liveStatusText');
    var statusBadge = document.getElementById('liveStatusBadge');
    if (!statusText || !statusBadge) return;

    var now = new Date();
    var day = now.getDay(); // 0 = Domingo, 1-6 = Seg a Sáb
    var hour = now.getHours();

    var isOpen = true;
    var statusMsg = "Aberto Agora • Cambé – PR (24h)";

    if (day === 0) {
      // Domingo: 07:00 às 20:00
      if (hour >= 7 && hour < 20) {
        isOpen = true;
        statusMsg = "Aberto Agora • Domingo até 20h";
      } else {
        isOpen = false;
        statusMsg = "Fechado Agora • Reabre às 07h";
      }
    } else {
      // Segunda a Sábado: 24h
      isOpen = true;
      statusMsg = "Aberto Agora • 24 Horas";
    }

    statusText.textContent = statusMsg;
    var dot = statusBadge.querySelector('.status-dot');
    if (dot) {
      dot.style.background = isOpen ? '#4ADE80' : '#EF4444';
      dot.style.boxShadow = isOpen ? '0 0 0 4px rgba(74, 222, 128, 0.25)' : '0 0 0 4px rgba(239, 68, 68, 0.25)';
    }
  }
  updateLiveStatus();

  // ── 1. TOAST NOTIFICATION ────────────────────────────────────
  var toast = document.getElementById('uiToast');
  var toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-shown');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-shown'); }, 2600);
  }

  // ── 2. DRAWER MOBILE ─────────────────────────────────────────
  var openBtn = document.getElementById('openDrawerBtn');
  var closeBtn = document.getElementById('closeDrawerBtn');
  var drawer = document.getElementById('mobileDrawer');
  var backdrop = document.getElementById('drawerBackdrop');
  var drawerLinks = document.querySelectorAll('.js-drawer-link');

  function toggleDrawer(open) {
    if (!drawer || !backdrop || !openBtn) return;
    drawer.classList.toggle('is-open', open);
    backdrop.classList.toggle('is-open', open);
    openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (openBtn) openBtn.addEventListener('click', function () { toggleDrawer(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { toggleDrawer(false); });
  if (backdrop) backdrop.addEventListener('click', function () { toggleDrawer(false); });
  drawerLinks.forEach(function (l) { l.addEventListener('click', function () { toggleDrawer(false); }); });

  // ── 3. COPIAR ENDEREÇO OFICIAL COMPLETO ──────────────────────
  var copyBtn = document.getElementById('copyAddressBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var fullAddress = 'Posto Bichão - R. Roberto Romanelli, 843 - Jardim Riviera, Cambé - PR, 86187-015';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullAddress).then(function () {
          showToast('📍 Endereço copiado para o GPS!');
        }).catch(function () {
          showToast('📍 ' + fullAddress);
        });
      } else {
        showToast('📍 ' + fullAddress);
      }
    });
  }

  // ── 4. ESTRUTURA & SERVIÇOS SHOWCASE (INSPIRADO NO PRINT 5 DA IPIRANGA) ─
  var servicesData = [
    {
      key: "ipimax",
      tag: "Ipimax • Alta Performance",
      title: "Combustível Ipimax",
      desc: "Gasolina, Diesel S10 e Etanol aditivados com tecnologia de ponta Ipiranga. Limpa bicos, reduz atritos internos e rende mais quilômetros por litro.",
      img: "public/images/posto-pista-caminhao.jpg",
      linkText: "Consultar no WhatsApp",
      linkHref: "https://api.whatsapp.com/send/?phone=5543988288537&text=Ol%C3%A1%21%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20abastecimento%20Ipimax."
    },
    {
      key: "conveniencia",
      tag: "Conveniência 24h • Sabor Fresco",
      title: "Conveniência & Cafeteria 24h",
      desc: "Ambiente climatizado com Wi-Fi, café expresso passado na hora, pão de queijo caseiro quentinho, salgados assados, bebidas geladas e muito mais.",
      img: "public/images/posto-conveniencia-entrada.jpg",
      linkText: "Falar com a Conveniência",
      linkHref: "https://api.whatsapp.com/send/?phone=5543988288537&text=Ol%C3%A1%21%20Gostaria%20de%20saber%20sobre%20a%20conveni%C3%AAncia%20do%20Posto%20Bich%C3%A3o."
    },
    {
      key: "patio",
      tag: "Pátio & Descanso • Segurança 24h",
      title: "Pátio Amplo & Descanso Seguro",
      desc: "Pátio 100% asfaltado e iluminado com lâmpadas LED de alta potência, câmeras de segurança monitoradas 24 horas e sanitários com higienização contínua.",
      img: "public/images/posto-exterior.webp",
      linkText: "Traçar Rota até o Pátio",
      linkHref: "https://maps.google.com/dir/?api=1&destination=Posto+Bichao+Cambe"
    },
    {
      key: "pista",
      tag: "Jet Oil & Serviços de Pista",
      title: "Jet Oil & Pista Ágil",
      desc: "Troca de óleo especializada com a garantia e segurança Texaco / Ipiranga. Calibrador de pneus digital gratuito. Verificação de fluidos e para-brisa na cortesia.",
      img: "public/images/posto-jet-oil.jpg",
      linkText: "Agendar Jet Oil no WhatsApp",
      linkHref: "https://api.whatsapp.com/send/?phone=5543988288537&text=Ol%C3%A1%21%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20troca%20de%20%C3%B3leo%20Jet%20Oil."
    }
  ];

  var showcaseImg = document.getElementById('showcaseImg');
  var showcaseTag = document.getElementById('showcaseTag');
  var showcaseTitle = document.getElementById('showcaseTitle');
  var showcaseDesc = document.getElementById('showcaseDesc');
  var showcaseLink = document.getElementById('showcaseLink');
  var showcaseCardContent = document.querySelector('.showcase-card-content');
  var servicePills = document.querySelectorAll('.service-pill-btn');
  var showcasePrevBtn = document.getElementById('showcasePrevBtn');
  var showcaseNextBtn = document.getElementById('showcaseNextBtn');
  var currentServiceIdx = 0;

  function setService(index) {
    currentServiceIdx = (index + servicesData.length) % servicesData.length;
    var data = servicesData[currentServiceIdx];

    if (showcaseImg) showcaseImg.classList.add('is-changing');
    if (showcaseCardContent) showcaseCardContent.classList.add('is-changing');

    setTimeout(function () {
      if (showcaseImg) {
        showcaseImg.src = data.img;
        showcaseImg.alt = data.title;
        showcaseImg.classList.remove('is-changing');
      }
      if (showcaseTag) showcaseTag.textContent = data.tag;
      if (showcaseTitle) showcaseTitle.textContent = data.title;
      if (showcaseDesc) showcaseDesc.textContent = data.desc;
      if (showcaseLink) {
        showcaseLink.href = data.linkHref;
        var linkSpan = showcaseLink.querySelector('span');
        if (linkSpan) linkSpan.textContent = data.linkText;
      }
      if (showcaseCardContent) showcaseCardContent.classList.remove('is-changing');
    }, 140);

    servicePills.forEach(function (pill, i) {
      var isAct = (i === currentServiceIdx);
      pill.classList.toggle('is-active', isAct);
      pill.setAttribute('aria-selected', isAct ? 'true' : 'false');
    });

    if (window.innerWidth < 900) {
      var activeCard = document.getElementById('showcaseActiveCard');
      if (activeCard) {
        var rect = activeCard.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.72) {
          activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  }

  servicePills.forEach(function (pill, i) {
    pill.addEventListener('click', function () { setService(i); });
  });
  if (showcasePrevBtn) showcasePrevBtn.addEventListener('click', function () { setService(currentServiceIdx - 1); });
  if (showcaseNextBtn) showcaseNextBtn.addEventListener('click', function () { setService(currentServiceIdx + 1); });

  // ── 5. SIMULADOR INTELIGENTE DE PIT STOP (ESTILO PRINT 3 DA IPIRANGA) ─
  var cleanVPills = document.querySelectorAll('.clean-v-pill');
  var cleanFuelVal = document.getElementById('cleanFuelVal');
  var cleanSnackVal = document.getElementById('cleanSnackVal');
  var cleanTimeVal = document.getElementById('cleanTimeVal');

  var vehicleCleanData = {
    carro: {
      fuel: "Gasolina Aditivada Ipimax ou Etanol Ipimax",
      snack: "Café Expresso + Pão de Queijo Quentinho",
      time: "5 a 10 Minutos"
    },
    suv: {
      fuel: "Gasolina Ipimax ou Diesel S10 Ipimax",
      snack: "Cappuccino Cremoso + Salgados & Bebidas Geladas",
      time: "10 a 15 Minutos"
    },
    moto: {
      fuel: "Gasolina Aditivada Ipimax",
      snack: "Água de Coco Gelada ou Energético + Snack",
      time: "3 a 5 Minutos"
    },
    caminhao: {
      fuel: "Diesel S10 Ipimax de Alta Filtragem",
      snack: "Lanche Reforçado na Conveniência + Café Quente",
      time: "15 a 25 Minutos"
    }
  };

  cleanVPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      var vKey = pill.getAttribute('data-v');
      cleanVPills.forEach(function (p) {
        var isThis = (p === pill);
        p.classList.toggle('is-active', isThis);
        p.setAttribute('aria-selected', isThis ? 'true' : 'false');
      });

      var d = vehicleCleanData[vKey];
      if (d && cleanFuelVal && cleanSnackVal && cleanTimeVal) {
        cleanFuelVal.textContent = d.fuel;
        cleanSnackVal.textContent = d.snack;
        cleanTimeVal.textContent = d.time;
      }
    });
  });

  // ── 6. GALERIA ENCONTROS NO BICHÃO ───────────────────────────
  var mainImg = document.getElementById('galleryMainImg');
  var capTitle = document.getElementById('galleryCaptionTitle');
  var capSub = document.getElementById('galleryCaptionSub');
  var idxNow = document.getElementById('galleryIdxNow');
  var thumbs = document.querySelectorAll('.gal-thumb-item');
  var prevBtn = document.getElementById('galleryPrevBtn');
  var nextBtn = document.getElementById('galleryNextBtn');
  var stage = document.getElementById('galleryStage');
  var curIdx = 0;

  function setSlide(i) {
    if (!thumbs.length || !mainImg) return;
    curIdx = (i + thumbs.length) % thumbs.length;
    var btn = thumbs[curIdx];
    mainImg.classList.add('is-switching');
    setTimeout(function () {
      mainImg.src = btn.getAttribute('data-src');
      if (capTitle) capTitle.textContent = btn.getAttribute('data-title');
      if (capSub) capSub.textContent = btn.getAttribute('data-sub');
      if (idxNow) idxNow.textContent = String(curIdx + 1).padStart(2, '0');
      mainImg.classList.remove('is-switching');
    }, 140);
    thumbs.forEach(function (t, idx) {
      var act = (idx === curIdx);
      t.classList.toggle('is-active', act);
      t.setAttribute('aria-selected', act ? 'true' : 'false');
    });
  }
  thumbs.forEach(function (t) {
    t.addEventListener('click', function () {
      setSlide(parseInt(t.getAttribute('data-idx'), 10) || 0);
    });
  });
  if (prevBtn) prevBtn.addEventListener('click', function () { setSlide(curIdx - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { setSlide(curIdx + 1); });
  if (stage) {
    var sx = 0;
    stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      var dx = sx - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 40) setSlide(dx > 0 ? curIdx + 1 : curIdx - 1);
    }, { passive: true });
  }

  // ── 7. ESTRELAS INTERATIVAS ──────────────────────────────────
  var starBtns = document.querySelectorAll('.star-btn');
  var starMsg = document.getElementById('starFeedbackMsg');
  var revMascot = document.getElementById('reviewMascotImg');
  starBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var v = parseInt(b.getAttribute('data-star'), 10) || 5;
      starBtns.forEach(function (sb) {
        var sv = parseInt(sb.getAttribute('data-star'), 10);
        sb.classList.toggle('is-popped', sv <= v);
        sb.classList.toggle('is-dimmed', sv > v);
      });
      if (starMsg) {
        starMsg.textContent = v === 5
          ? '★★★★★ O Bichão adorou! Clique abaixo para avaliar 5 estrelas no Google!'
          : 'Obrigado pelo carinho! Clique abaixo para deixar seu comentário no Google.';
      }
      if (revMascot) {
        revMascot.style.transform = 'scale(1.08) rotate(-3deg)';
        setTimeout(function () { revMascot.style.transform = ''; }, 260);
      }
    });
  });

  // ── 8. SCROLL REVEAL ─────────────────────────────────────────
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { obs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }
});
