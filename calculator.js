const focusKeyboardEvent = function (ev) {
  const active = document.querySelector(".calculator.wrapper:focus");
  if (!active) return;

  // const activeScreen = active.querySelector('.screen');
  // console.log("key", ev.key);
  const btnActive = active.querySelector(`button[data-code='${ev.key}']`);
  if (!!btnActive) btnActive.click();
  switch (ev.key) {
    case "Enter":
      active.querySelector(`button[data-operation='equal']`).click();
      break;
    case "Backspace":
      active.querySelector(`button[data-operation='delete']`).click();
      break;
    case "c":
    case "C":
      active.querySelector(`button[data-operation='clear']`).click();
      break;
    default:
      break;
  }
};

class Calculator {
  constructor(_id, initEvent = false) {
    if (!_id) {
      const randomNumber = new Date().getTime() + Math.random() * 10;
      this._id = `calc-for-${randomNumber}`;
    } else {
      console.log("_id", _id);
      this._id = `calc-for-${_id}`;
    }

    this.htmlElement = document.createElement("div");
    this.htmlElement.setAttribute("class", "calculator wrapper max-width-32");
    this.htmlElement.setAttribute("tabindex", "-1");
    this.htmlElement.setAttribute("id", this._id);
    this.htmlElement.innerHTML = this.html;

    if (initEvent) this.initControlsEvent();
  }

  html = `
  <section class="displays">
    <input type="text" class="screen" readonly />
  </section>
  <section class="controls">
    <button class="btn btn-operation" data-operation="clear" data-symbol="C">C</button>
    <button class="btn btn-operation" data-operation="delete" data-symbol="D">D</button>
    <button class="btn btn-operation" data-operation="percent" data-symbol="%">%</button>
    <button class="btn btn-operation" data-operation="divide" data-symbol="&divide;" data-code="/">&divide;</button>
    <button class="btn btn-number" data-symbol="7" data-code="7">7</button>
    <button class="btn btn-number" data-symbol="8" data-code="8">8</button>
    <button class="btn btn-number" data-symbol="9" data-code="9">9</button>
    <button class="btn btn-operation" data-operation="times" data-symbol="&times;" data-code="*">&times;</button>
    <button class="btn btn-number" data-symbol="4" data-code="4">4</button>
    <button class="btn btn-number" data-symbol="5" data-code="5">5</button>
    <button class="btn btn-number" data-symbol="6" data-code="6">6</button>
    <button class="btn btn-operation" data-operation="minus" data-symbol="&minus;" data-code="-">&minus;</button>
    <button class="btn btn-number" data-symbol="1" data-code="1">1</button>
    <button class="btn btn-number" data-symbol="2" data-code="2">2</button>
    <button class="btn btn-number" data-symbol="3" data-code="3">3</button>
    <button class="btn btn-operation" data-operation="plus" data-symbol="&plus;" data-code="+">&plus;</button>
    <button class="btn btn-operation" data-operation="extra" data-symbol="Ex">Ex</button>
    <button class="btn btn-number" data-symbol="0" data-code="0">0</button>
    <button class="btn btn-number" data-symbol="." data-code=".">.</button>
    <button class="btn btn-operation" data-operation="equal" data-symbol="&equals;">&equals;</button>
  </section>
`;

  histories = [];
  values = [];
  lastHistory = null;

  getId = () => this._id;

  getHtml = () =>
    `<div class="calculator wrapper" id="${this._id}">${this.html}</div>`;

  getHtmlElement = () => this.htmlElement;

  renderTo = (identifier = "") => {
    const wrapper = document.querySelector(identifier);
    // console.log(wrapper);
    wrapper.append(this.htmlElement);
  };

  initControlsEvent = () => {
    const screen = this.htmlElement.querySelector(".screen");
    screen.addEventListener("click", (ev) => {
      console.log(ev.target);
      this.htmlElement.focus();
      this.initFocusKeyboard();
      // document.getElementById(this._id).focus();
      // window.location.hash = `#${this._id}`;
    });
    this.htmlElement.addEventListener("blur", this.initFocusKeyboard);
    this.htmlElement.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", (ev) => {
        console.log("who am click", this.htmlElement);
        switch (btn.dataset.operation) {
          case "clear":
            this.clear();
            break;
          case "delete":
            this.histories.pop();
            const len = this.histories.length > 0 ? this.histories.length : 1;
            this.lastHistory = this.histories[len - 1];

            this.setScreen();
            break;
          case "equal":
            this.onEqualCallback(this.getResult()());
            this.setScreen(this.getResult()());
            this.histories = [
              {
                symbol: this.getResult()(),
                code: this.getResult()(),
                type: "number",
              },
            ];
            break;
          case "extra":
            this.extraFunction();
            break;

          default:
            this.setHistory(btn);

            break;
        }
      });
    });
  };

  setHistory = (btn) => {
    if (btn.classList.contains("btn-number")) {
      if (!!this.lastHistory && this.lastHistory.type === "number") {
        this.histories[this.histories.length - 1].code += "" + btn.dataset.code;
        this.histories[this.histories.length - 1].symbol +=
          "" + btn.dataset.symbol;
      } else {
        this.histories.push({
          symbol: btn.dataset.symbol,
          code: btn.dataset.code,
          type: "number",
        });
      }
    } else if (btn.dataset.operation === "minus") {
      this.histories.push({
        symbol: btn.dataset.symbol,
        code: btn.dataset.code,
        type: "operation",
      });
    } else {
      if (!!this.lastHistory && this.lastHistory.type === "number") {
        if (btn.dataset.operation === "percent") {
          this.histories[this.histories.length - 1] = {
            symbol: Number(this.lastHistory.code) / 100,
            code: Number(this.lastHistory.code) / 100,
            type: "number",
          };
        } else {
          this.histories.push({
            symbol: btn.dataset.symbol,
            code: btn.dataset.code,
            type: "operation",
          });
        }
      }
    }

    const len = this.histories.length > 0 ? this.histories.length : 1;
    this.lastHistory = this.histories[len - 1];

    this.setScreen();
  };

  clear = () => {
    this.histories = [];
    this.setScreen("");
    this.lastHistory = null;
    this.onClear();
  };

  setScreen = (value = "") => {
    if (!value)
      return (this.htmlElement.querySelector(
        ".screen"
      ).value = this.histories.map((history) => history.symbol).join(" "));

    this.htmlElement.querySelector(".screen").value = value;
  };

  getResult = () => {
    if (!!this.lastHistory && this.lastHistory.type !== "number") {
      this.histories.pop();
      if (this.histories.length > 0) {
        this.lastHistory = this.histories[this.histories.length - 1];
      }
    }

    if (this.histories.length === 0) return function () {};

    return Function(
      `"use strict";return (${this.histories
        .map((history) => history.code)
        .join(" ")})`
    );
  };

  onEqualClick = (callback) => {
    this.onEqualCallback = callback;
  };

  onEqualCallback = function () {};
  onClear = function () {};
  extraFunction = function () {};
  initFocusKeyboard = function () {
    const active = document.querySelector(".calculator.wrapper:focus");
    console.log("active calculator", active);
    if (!active) {
      document.removeEventListener("keyup", focusKeyboardEvent);
      // console.log("rm event");
    } else {
      document.addEventListener("keyup", focusKeyboardEvent);
      // document.addEventListener("keyup", (ev) => {
      //   ev.code
      // });
    }
  };
}

// export default Calculator;
// module.exports = Calculator;
