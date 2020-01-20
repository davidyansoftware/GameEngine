class Mouse {
  constructor() {
    document.addEventListener("mousemove", this._onMouseMove);
  }

  _onMouseMove() {}
}

module.exports = Mouse;
