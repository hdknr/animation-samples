console.clear();

ScrollOut({
  targets: '.photo',
  //once: true,
  onShown: function (el) {
    if (!el.src) {
      el.src = el.dataset.src;
    }
  }
})