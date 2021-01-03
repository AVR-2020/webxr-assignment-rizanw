AFRAME.registerComponent("profile", {
  schema: {},

  init: function () {
    // Do something when component first attached.
    var buttonEls = document.querySelectorAll(".button-profile");

    this.buttonEls = buttonEls;
    this.onClick = this.onClick.bind(this);
    for (var i = 0; i < buttonEls.length; ++i) {
      buttonEls[i].addEventListener("click", this.onClick);
    }
  },

  onClick: function (evt) { 
    // button animation
    var pos = evt.target.getAttribute("position");
    var navBtnPos = { z: 0 };
    anime({
      targets: ".button-profile",
      update: function () {
        evt.target.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z / 3,
        });
      },
    });
    setTimeout(function () {
      anime({
        targets: ".button-profile",
        update: function () {
          evt.target.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: navBtnPos.z,
          });
        },
      });
    }, 100);
  },
});
