AFRAME.registerComponent("screen-menu", {
  schema: {},

  init: function () {
    // Do something when component first attached.
    var buttonEls = document.querySelectorAll(".button-menu");
    this.buttonEls = buttonEls;
    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    for (var i = 0; i < buttonEls.length; ++i) {
      buttonEls[i].addEventListener("mouseenter", this.onMouseEnter);
      buttonEls[i].addEventListener("mouseleave", this.onMouseLeave);
      buttonEls[i].addEventListener("click", this.onClick);
    }
  },

  onClick: function (evt) {
    evt.target.pause();
    this.el.addState("clicked");
  },

  onMouseEnter: function (evt) {
    var buttonEls = this.buttonEls;
    for (var i = 0; i < buttonEls.length; ++i) {
      buttonEls[i].object3D.scale.set(1.0, 1.0, 1.0);
    }
    evt.target.object3D.scale.set(1.2, 1.2, 1.2);
    evt.target.setAttribute("mixin", "selectAnimation");
  },

  onMouseLeave: function (evt) {
    if (this.el.is("clicked")) {
      return;
    }
    evt.target.object3D.scale.set(1.0, 1.0, 1.0);
    evt.target.setAttribute("rotation", "90 45 45");
    evt.target.setAttribute("mixin", "hoverAnimation");
  },
});
