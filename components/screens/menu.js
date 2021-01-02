AFRAME.registerComponent("screen-menu", {
  schema: {},

  init: function () {
    // Do something when component first attached.
    var buttonEls = document.querySelectorAll(".button-menu");

    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    for (var i = 0; i < buttonEls.length; ++i) {
      buttonEls[i].addEventListener("mouseenter", this.onMouseEnter);
      buttonEls[i].addEventListener("mouseleave", this.onMouseLeave);
      buttonEls[i].addEventListener("click", this.onClick);
      buttonEls[i].setAttribute("clicked", 0);
    }
  },

  onClick: function (evt) {
    evt.target.pause();
    this.el.addState("clicked");
  },

  onMouseEnter: function (evt) {
    var buttonEls = this.buttonEls;
    for (var i = 0; i < buttonEls.length; ++i) {
      buttonEls[i].firstElementChild.object3D.scale.set(1.0, 1.0, 1.0);
    }
    evt.target.firstElementChild.object3D.scale.set(1.2, 1.2, 1.2);
  },

  onMouseLeave: function (evt) {
    if (this.el.is("clicked")) {
      return;
    }
    evt.target.firstElementChild.object3D.scale.set(1.0, 1.0, 1.0);
  },
});
