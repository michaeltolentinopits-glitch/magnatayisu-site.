/* Small, dependency-free interactions for the MagnaTayISU landing page. */
(() => {
  const foodItems = [
    { id: 'rice', name: 'Cooked White Rice', category: 'Rice and Staples', description: '1 cup cooked (about 158g)', kcal: 200 },
    { id: 'brown-rice', name: 'Brown Rice', category: 'Rice and Staples', description: '1 cup cooked', kcal: 215 },
    { id: 'fried-rice', name: 'Fried Rice', category: 'Fried Rice (Sinangag)', description: '1 cup garlic fried rice', kcal: 290 },
    { id: 'pandesal', name: 'Pandesal', category: 'Rice and Staples', description: '2 pieces pandesal', kcal: 160 },
    { id: 'sliced-bread', name: 'Sliced Bread', category: 'Rice and Staples', description: '2 slices white bread', kcal: 160 },
    { id: 'instant-noodles', name: 'Instant Noodles', category: 'Rice and Staples', description: '1 pack cooked (about 80g dry)', kcal: 380 },
    { id: 'boiled-egg', name: 'Boiled Egg', category: 'Protein and Ulam', description: '1 large boiled egg', kcal: 78 },
    { id: 'fried-egg', name: 'Fried Egg', category: 'Protein and Ulam', description: '1 large fried egg', kcal: 110 },
    { id: 'chicken-adobo', name: 'Chicken Adobo', category: 'Protein and Ulam', description: '1 cup with sauce', kcal: 380 },
    { id: 'fried-chicken', name: 'Fried Chicken', category: 'Protein and Ulam', description: '1 piece thigh with skin', kcal: 320 },
    { id: 'grilled-fish', name: 'Grilled Fish', category: 'Protein and Ulam', description: '1 fillet about 100g', kcal: 140 },
    { id: 'fried-fish', name: 'Fried Fish', category: 'Protein and Ulam', description: '1 piece about 100g', kcal: 210 },
    { id: 'pork-adobo', name: 'Pork Adobo', category: 'Protein and Ulam', description: '1 cup with sauce', kcal: 450 },
    { id: 'banana', name: 'Banana', category: 'Fruits and Vegetables', description: '1 medium lakatan/saba type average', kcal: 105 },
    { id: 'apple', name: 'Apple', category: 'Fruits and Vegetables', description: '1 medium apple', kcal: 95 },
    { id: 'papaya', name: 'Papaya', category: 'Fruits and Vegetables', description: '1 cup cubed ripe papaya', kcal: 62 },
    { id: 'boiled-vegetables', name: 'Boiled Vegetables', category: 'Fruits and Vegetables', description: '1 cup boiled mixed vegetables', kcal: 60 },
    { id: 'vegetable-dish', name: 'Vegetable Dish', category: 'Fruits and Vegetables', description: '1 cup Pinakbet-style mixed vegetables', kcal: 130 }
  ];

  const numberFormat = new Intl.NumberFormat('en-PH', { maximumFractionDigits: 0 });
  const servingFormat = new Intl.NumberFormat('en-PH', { maximumFractionDigits: 2 });
  const foodChoice = document.getElementById('food-choice');
  const servingsInput = document.getElementById('servings');
  const foodServingNote = document.getElementById('food-serving-note');
  const estimatedKcal = document.getElementById('estimated-kcal');
  const estimateEquation = document.getElementById('estimate-equation');

  if (foodChoice && servingsInput && foodServingNote && estimatedKcal && estimateEquation) {
    function selectedFood() {
      return foodItems.find((item) => item.id === foodChoice.value) || foodItems[0];
    }

    function updateEstimate() {
      const item = selectedFood();
      const servings = Number(servingsInput.value);
      const kcalText = numberFormat.format(item.kcal);
      foodServingNote.textContent = `${item.description} · ${kcalText} kcal per serving`;

      if (!Number.isFinite(servings) || servings <= 0) {
        estimatedKcal.textContent = '— kcal';
        estimateEquation.textContent = 'Enter servings greater than zero to preview.';
        servingsInput.setAttribute('aria-invalid', 'true');
        return;
      }

      servingsInput.removeAttribute('aria-invalid');
      const total = Math.round(item.kcal * servings);
      const servingText = servingFormat.format(servings);
      const plural = servings === 1 ? 'serving' : 'servings';
      estimatedKcal.textContent = `${numberFormat.format(total)} kcal`;
      estimateEquation.textContent = `${kcalText} kcal per serving × ${servingText} ${plural}`;
    }

    foodChoice.addEventListener('change', updateEstimate);
    servingsInput.addEventListener('input', updateEstimate);
    updateEstimate();
  }

  const slides = [
    {
      src: 'screenshots/dashboard_preview.png',
      title: 'Dashboard',
      description: 'An empty-state Dashboard preview with step, goal, distance, and food summaries.',
      alt: 'Dashboard HTML simulation preview with zero steps and no meals logged.'
    },
    {
      src: 'screenshots/step_tracker_preview.png',
      title: 'Step Tracker',
      description: 'A preview of the foreground step-tracking screen and its estimate labels.',
      alt: 'Step Tracker HTML simulation preview; no live sensor data is shown.'
    },
    {
      src: 'screenshots/food_log_preview.png',
      title: 'Food Log',
      description: 'A preview of the starter-food list and serving-entry interface.',
      alt: 'Food Log HTML simulation preview with starter foods and no logged meals.'
    },
    {
      src: 'screenshots/history_preview.png',
      title: 'History',
      description: 'A preview of date-based history in an empty state.',
      alt: 'History HTML simulation preview showing an empty records state.'
    },
    {
      src: 'screenshots/settings_preview.png',
      title: 'Settings',
      description: 'A preview of personal goal, stride, and optional estimate settings.',
      alt: 'Settings HTML simulation preview showing default values.'
    }
  ];

  const galleryStage = document.getElementById('gallery-stage');
  const galleryImage = document.getElementById('gallery-main-image');
  const galleryTitle = document.getElementById('gallery-title');
  const galleryDescription = document.getElementById('gallery-description');
  const galleryCount = document.getElementById('gallery-count');
  const galleryOpen = document.getElementById('gallery-open');
  const galleryPrevious = document.getElementById('gallery-previous');
  const galleryNext = document.getElementById('gallery-next');
  const galleryThumbnails = document.getElementById('gallery-thumbnails');
  const previewDialog = document.getElementById('preview-dialog');
  const dialogImage = document.getElementById('dialog-image');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogCaption = document.getElementById('dialog-caption');
  const dialogClose = document.getElementById('dialog-close');

  if (galleryStage && galleryImage && galleryTitle && galleryDescription && galleryCount && galleryOpen && galleryPrevious && galleryNext && galleryThumbnails) {
    let activeIndex = 0;
    let pointerStartX = null;
    let ignoreOpenUntil = 0;

    function renderThumbnails() {
      galleryThumbnails.replaceChildren();
      slides.forEach((slide, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'gallery-thumb';
        button.setAttribute('aria-pressed', String(index === activeIndex));
        button.setAttribute('aria-label', `Show ${slide.title} HTML preview`);
        button.dataset.index = String(index);

        const image = document.createElement('img');
        image.src = slide.src;
        image.alt = '';
        image.loading = 'lazy';
        image.width = 120;
        image.height = 220;

        const label = document.createElement('span');
        label.textContent = slide.title;
        const type = document.createElement('small');
        type.textContent = 'HTML preview';
        button.append(image, label, type);
        button.addEventListener('click', () => showSlide(index));
        galleryThumbnails.append(button);
      });
    }

    function showSlide(index) {
      activeIndex = (index + slides.length) % slides.length;
      const slide = slides[activeIndex];
      galleryImage.src = slide.src;
      galleryImage.alt = slide.alt;
      galleryTitle.textContent = slide.title;
      galleryDescription.textContent = slide.description;
      galleryCount.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')} · HTML PREVIEW`;
      galleryOpen.setAttribute('aria-label', `Open ${slide.title} HTML preview larger`);

      galleryThumbnails.querySelectorAll('.gallery-thumb').forEach((button, indexInList) => {
        button.setAttribute('aria-pressed', String(indexInList === activeIndex));
      });

      if (previewDialog && previewDialog.open) updateDialog();
    }

    function updateDialog() {
      const slide = slides[activeIndex];
      if (!dialogImage || !dialogTitle || !dialogCaption) return;
      dialogImage.src = slide.src;
      dialogImage.alt = `${slide.title} HTML simulation preview, enlarged. ${slide.alt}`;
      dialogTitle.textContent = slide.title;
      dialogCaption.textContent = `${slide.description} Interface preview only; not a capture from an installed Android app.`;
    }

    function openDialog() {
      if (Date.now() < ignoreOpenUntil) return;
      if (!previewDialog || typeof previewDialog.showModal !== 'function') return;
      updateDialog();
      previewDialog.showModal();
      if (dialogClose) dialogClose.focus();
    }

    renderThumbnails();
    showSlide(0);
    galleryPrevious.addEventListener('click', () => showSlide(activeIndex - 1));
    galleryNext.addEventListener('click', () => showSlide(activeIndex + 1));
    galleryOpen.addEventListener('click', openDialog);

    galleryStage.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showSlide(activeIndex - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showSlide(activeIndex + 1);
      }
    });

    galleryStage.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') pointerStartX = event.clientX;
    });
    galleryStage.addEventListener('pointerup', (event) => {
      if (pointerStartX === null) return;
      const difference = event.clientX - pointerStartX;
      pointerStartX = null;
      if (Math.abs(difference) > 55) {
        ignoreOpenUntil = Date.now() + 350;
        showSlide(difference < 0 ? activeIndex + 1 : activeIndex - 1);
      }
    });
    galleryStage.addEventListener('pointercancel', () => { pointerStartX = null; });

    if (previewDialog) {
      if (dialogClose) dialogClose.addEventListener('click', () => previewDialog.close());
      previewDialog.addEventListener('click', (event) => {
        if (event.target === previewDialog) previewDialog.close();
      });
      previewDialog.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') showSlide(activeIndex - 1);
        if (event.key === 'ArrowRight') showSlide(activeIndex + 1);
      });
    }
  }
})();
