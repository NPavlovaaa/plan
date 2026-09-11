document.addEventListener('alpine:init', () => {
  Alpine.store('trip', {
    active: 'd1',
    variants: { d6: 'A', d10: 'A', d13: 'A' },
    checked: { '0.0': true, '0.1': true },
    setActive(id) { this.active = id; },
    setVar(id, v) { this.variants[id] = v; },
    toggle(key) { this.checked[key] = !this.checked[key]; },
    isChecked(key) { return !!this.checked[key]; },
    doneCount() { return Object.values(this.checked).filter(Boolean).length; },
    totalCount() {
      return checklist.reduce((s, g) => s + g.items.length, 0);
    },
  });

  Alpine.data('trip', () => ({
    days, checklist, verify, budget, facts, luggage, shops, hotels, chains,
    fmt(y) { return y === '—' || y === '(в цене)' ? y : `¥${y.replace('¥', '')}`; },
    dayIds() { return days.map(d => d.id); },
    regionDays(r) { return days.filter(d => d.region === r); },
  }));

  Alpine.data('carousel', (imgs, imgsB, dayId) => ({
    imgsA: (imgs || []).slice(),
    imgsB: (imgsB || []).slice(),
    dayId: dayId || null,
    broken: {},
    i: 0,
    init() {
      if (this.dayId && this.imgsB.length) {
        this.$watch(() => this.$store.trip.variants[this.dayId], () => { this.i = 0; });
      }
    },
    _slide(item) {
      const u = typeof item === 'string' ? item : item.u;
      const cap = typeof item === 'object' ? (item.cap || null) : null;
      return { u, cap, k: u };
    },
    get currentImgs() {
      if (!this.dayId || !this.imgsB.length) return this.imgsA;
      return this.$store.trip.variants[this.dayId] === 'B' ? this.imgsB : this.imgsA;
    },
    get liveSlides() {
      return this.currentImgs.map(item => this._slide(item)).filter(s => !this.broken[s.k]);
    },
    get hasImg() { return this.liveSlides.length > 0; },
    fail(k) {
      this.broken[k] = true;
      if (this.i >= this.liveSlides.length) this.i = Math.max(0, this.liveSlides.length - 1);
    },
    go(idx) {
      this.i = idx;
      const track = this.$refs.track;
      if (track) track.scrollTo({ left: track.clientWidth * idx, behavior: 'smooth' });
    },
    prev() { this.go((this.i - 1 + this.liveSlides.length) % Math.max(1, this.liveSlides.length)); },
    next() { this.go((this.i + 1) % Math.max(1, this.liveSlides.length)); },
    onScroll(e) {
      const w = e.target.clientWidth;
      if (!w) return;
      const idx = Math.round(e.target.scrollLeft / w);
      if (idx !== this.i) this.i = idx;
    },
  }));
});
