AFRAME.registerComponent("navigation", {
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

    document.querySelector("#screen-menu").object3D.visible = false;
    document.querySelector("#screen-profile").object3D.visible = false;
  },

  onClick: function (evt) {
    evt.target.pause();
    this.el.addState("clicked");

    // button animation
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
    }, 100);

    // button indicator reset
    var buttonEls = this.buttonEls;
    for (var i = 0; i < buttonEls.length; ++i) {
      if (
        buttonEls[i].id != evt.target.id &&
        buttonEls[i].id != "profile" &&
        buttonEls[i].id != "notif"
      ) {
        buttonEls[i].lastElementChild.setAttribute(
          "material",
          "color",
          "#013880"
        );
      }
    }
    var btnIndicator = evt.target.lastElementChild.getAttribute("material")
      .color;
    var isClicked = btnIndicator == "#013880" ? true : false;

    // button indicator color
    if (!isClicked) {
      evt.target.lastElementChild.setAttribute("material", "color", "#013880");
    } else {
      evt.target.lastElementChild.setAttribute("material", "color", "#FEC410");
    }

    // menu changes
    var selectedMenu = evt.target.id;
    if (selectedMenu == "menu" && isClicked) {
      document.querySelector("#screen-menu").object3D.visible = true;
      this.raycasterToggle(".button-menu", "raycastable");
    } else {
      document.querySelector("#screen-menu").object3D.visible = false;
      this.raycasterToggle(".button-menu", "raycastable");
      if (selectedMenu == "profile" && isClicked) {
        document.querySelector("#screen-profile").object3D.visible = true;
      } else if (selectedMenu == "profile" && !isClicked) {
        document.querySelector("#screen-profile").object3D.visible = false;
      } else if (selectedMenu == "notif" && isClicked) {
      } else if (selectedMenu == "notif" && !isClicked) {
      }
    }
  },

  raycasterToggle: function (it, st) {
    cl = document.querySelectorAll(it);
    for (var i = 0; i < cl.length; ++i) {
      cl[i].classList.toggle(st);
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
});
