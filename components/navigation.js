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
    document.querySelector("#screen-notif").object3D.visible = false;
    document.querySelector("#screen-news").object3D.visible = false;
    document.querySelector("#screen-search").object3D.visible = false;
    document.querySelector("#screen-endowment").object3D.visible = false;
    this.raycasterToggle("#keyboard", 0);
    this.raycasterToggle("#numpad", 0);
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
    if (selectedMenu == "profile" && isClicked) {
      document.querySelector("#screen-profile").object3D.visible = true;
    } else if (selectedMenu == "profile" && !isClicked) {
      document.querySelector("#screen-profile").object3D.visible = false;
    } else if (selectedMenu == "notif" && isClicked) {
      document.querySelector("#screen-notif").object3D.visible = true;
    } else if (selectedMenu == "notif" && !isClicked) {
      document.querySelector("#screen-notif").object3D.visible = false;
    } else {
      if (selectedMenu == "menu" && isClicked) {
        document.querySelector("#screen-news").object3D.visible = false;
        document.querySelector("#screen-search").object3D.visible = false;
        document.querySelector("#screen-menu").object3D.visible = true;
        document.querySelector("#screen-endowment").object3D.visible = false;
        this.raycasterToggle(".button-menu", 1);
        this.raycasterToggle("#keyboard", 0);
        this.raycasterToggle("#numpad", 0);
      } else if (selectedMenu == "news" && isClicked) {
        document.querySelector("#screen-menu").object3D.visible = false;
        document.querySelector("#screen-search").object3D.visible = false;
        document.querySelector("#screen-news").object3D.visible = true;
        document.querySelector("#screen-endowment").object3D.visible = false;
        this.raycasterToggle(".button-menu", 0);
        this.raycasterToggle("#keyboard", 0);
        this.raycasterToggle("#numpad", 0);
      } else if (selectedMenu == "search" && isClicked) {
        document.querySelector("#screen-menu").object3D.visible = false;
        document.querySelector("#screen-news").object3D.visible = false;
        document.querySelector("#screen-search").object3D.visible = true;
        document.querySelector("#screen-endowment").object3D.visible = false;
        this.raycasterToggle(".button-menu", 0);
        this.raycasterToggle("#keyboard", 1);
        this.raycasterToggle("#numpad", 0);
      } else {
        document.querySelector("#screen-menu").object3D.visible = false;
        document.querySelector("#screen-news").object3D.visible = false;
        document.querySelector("#screen-search").object3D.visible = false;
        document.querySelector("#screen-endowment").object3D.visible = false;
        this.raycasterToggle(".button-menu", 0);
        this.raycasterToggle("#keyboard", 0);
        this.raycasterToggle("#numpad", 0);
      }
    }
  },

  raycasterToggle: function (it, st) {
    cl = document.querySelectorAll(it);
    if (it == "#keyboard") {
      for (var i = 1; i < cl[0].children.length; ++i) {
        if (st) {
          cl[0].children[i].children[1].classList.add("raycastable");
        } else {
          cl[0].children[i].children[1].classList.remove("raycastable");
        }
      }
    } else if (it == "#numpad") {
      for (var i = 1; i < cl[0].children.length; ++i) {
        if (st) {
          cl[0].children[i].classList.add("raycastable");
        } else {
          cl[0].children[i].classList.remove("raycastable");
        }
      }
    } else {
      for (var i = 0; i < cl.length; ++i) {
        if (st) {
          cl[i].classList.add("raycastable");
        } else {
          cl[i].classList.remove("raycastable");
        }
      }
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
