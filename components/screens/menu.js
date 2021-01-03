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

    // reset icon
    evt.target.object3D.scale.set(1.0, 1.0, 1.0);
    evt.target.setAttribute("rotation", "90 45 45");
    evt.target.setAttribute("mixin", "hoverAnimation");

    // var isClicked = btnIndicator == "#013880" ? true : false;
    var btnIndicator = document
      .querySelector("#menu")
      .lastElementChild.setAttribute("material", "color", "#013880");

    var selectedMenu = evt.target.id;
    if (selectedMenu == "menu-news") {
      document.querySelector("#screen-menu").object3D.visible = false;
      document.querySelector("#screen-news").object3D.visible = true;
      document.querySelector("#screen-endowment").object3D.visible = false;
      document.querySelector("#screen-search").object3D.visible = false;
      this.raycasterToggle(".button-menu", 1);
      this.raycasterToggle("#keyboard", 0);
      this.raycasterToggle("#numpad", 0);
      document
        .querySelector("#news")
        .lastElementChild.setAttribute("material", "color", "#FEC410");
    } else if (selectedMenu == "menu-endowment") {
      document.querySelector("#screen-menu").object3D.visible = false;
      document.querySelector("#screen-news").object3D.visible = false;
      document.querySelector("#screen-endowment").object3D.visible = true;
      document.querySelector("#screen-search").object3D.visible = false;
      this.raycasterToggle(".button-menu", 0);
      this.raycasterToggle("#keyboard", 0);
      this.raycasterToggle("#numpad", 1);
    } else if (selectedMenu == "menu-search") {
      document.querySelector("#screen-menu").object3D.visible = false;
      document.querySelector("#screen-news").object3D.visible = false;
      document.querySelector("#screen-endowment").object3D.visible = false;
      document.querySelector("#screen-search").object3D.visible = true;
      this.raycasterToggle(".button-menu", 0);
      this.raycasterToggle("#keyboard", 1);
      this.raycasterToggle("#numpad", 0);
      document
        .querySelector("#search")
        .lastElementChild.setAttribute("material", "color", "#FEC410");
    } else {
      document.querySelector("#screen-menu").object3D.visible = false;
      document.querySelector("#screen-news").object3D.visible = false;
      document.querySelector("#screen-endowment").object3D.visible = false;
      document.querySelector("#screen-search").object3D.visible = false;
      this.raycasterToggle(".button-menu", 0);
      this.raycasterToggle("#keyboard", 0);
      this.raycasterToggle("#numpad", 0);
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
      for (var i = 0; i < cl[0].children.length; ++i) {
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
