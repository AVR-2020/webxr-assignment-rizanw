AFRAME.registerComponent("menu", {
  schema: {},

  init: function () {
    var buttonEls = document.querySelectorAll(".button-nav");
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
    var buttonEls = this.buttonEls;
    for (var i = 0; i < buttonEls.length; ++i) {
      buttonEls[i].lastElementChild.setAttribute(
        "material",
        "color",
        "#013880"
      );
    }

    var pos = evt.target.getAttribute("position");
    var navBtnPos = { x: 0.07, y: 0.17 };
    anime({
      targets: ".button-nav",
      update: function () {
        evt.target.setAttribute("position", {
          x: pos.x / 2,
          y: pos.y / 2,
          z: pos.z,
        });
      },
    });
    setTimeout(function () {
      anime({
        targets: ".button-nav",
        update: function () {
          evt.target.setAttribute("position", {
            x: navBtnPos.x,
            y: navBtnPos.y,
            z: pos.z,
          });
        },
      });
      evt.target.lastElementChild.setAttribute("material", "color", "#FEC410");
    }, 100);
    var text = document.querySelector("#textHello");
    if (text.getAttribute("visible")) {
      text.setAttribute("visible", false);
    } else {
      text.setAttribute("visible", true);
    }
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

  onMenuButtonClick: function (evt) {
    console.log("cilcked no: " + evt.currentTarget.id);
  },
});
