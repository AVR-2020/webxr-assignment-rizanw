AFRAME.registerComponent("menu", {
  schema: {},

  init: function () {
    var buttonEls = document.querySelectorAll(".button-menu");

    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    // this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    // for (var i = 0; i < buttonEls.length; ++i) {
    //   buttonEls[i].addEventListener("click", this.onMenuButtonClick);
    // }

    for (var i = 0; i < buttonEls.length; ++i) {
      buttonEls[i].addEventListener("mouseenter", this.onMouseEnter);
      buttonEls[i].addEventListener("mouseleave", this.onMouseLeave);
      buttonEls[i].addEventListener("click", this.onClick);
    }
  },

  onClick: function (evt) {
    evt.target.pause();
    evt.target.setAttribute("material", "color", "#046de7");
    this.el.addState("clicked");
    evt.target.object3D.scale.set(1.2, 1.2, 1.2);
  },

  onMouseEnter: function (evt) {
    var buttonEls = this.buttonEls;
    evt.target.setAttribute("material", "color", "#046de7");
    for (var i = 0; i < buttonEls.length; ++i) {
      if (evt.target === buttonEls[i]) {
        continue;
      }
      buttonEls[i].setAttribute("material", "color", "white");
    }
  },

  onMouseLeave: function (evt) {
    if (this.el.is("clicked")) {
      return;
    }
    evt.target.setAttribute("material", "color", "white");
  },

  onMenuButtonClick: function (evt) {
    console.log("cilcked no: " + evt.currentTarget.id);
  },
});
