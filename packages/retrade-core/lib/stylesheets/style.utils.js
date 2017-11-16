export function borderRadius(radius) {
  return `
    -webkit-border-radius: ${radius};
    -moz-border-radius: ${radius};
    border-radius: ${radius};
  `;
}

export function boxShadow(inset, hoff, voff, blur, color) {
  return `
  -webkit-box-shadow: ${inset} ${hoff} ${voff} ${blur} ${color};
  -moz-box-shadow: ${inset} ${hoff} ${voff} ${blur} ${color};
  box-shadow: ${inset} ${hoff} ${voff} ${blur} ${color};
  `
}

export function transform(type, amt) {
  return `
    -webkit-transform: ${type}(${amt});
    -moz-transform: ${type}(${amt});
    -ms-transform: ${type}(${amt});
    -o-transform: ${type}(${amt});
    transform: ${type}(${amt});
  `
}

export function backgroundSize(type) {
  return `
    -webkit-background-size: ${type};
    background-size: ${type};
  `
}

export function boxSizing(type) {
  return `
    -webkit-box-sizing: ${type};
    -moz-box-sizing: ${type};
    box-sizing: ${type};
  `
}

export function fontSmoothing(type) {
  return `
    -webkit-font-smoothing: ${type};
    font-smoothing: ${type};
  `
}

export function animationFillMode(type) {
  return `
    -webkit-animation-fill-mode: ${type};
    -moz-animation-fill-mode: ${type};
    -ms-animation-fill-mode: ${type};
    -o-animation-fill-mode: ${type};
    animation-fill-mode: ${type};
  `
}

export function transition(prop, time) {
  return `
    -webkit-transition: ${prop} ${time};
    -moz-transition: ${prop} ${time};
    -ms-transition: ${prop} ${time};
    -o-transition: ${prop} ${time};
    transition: ${prop} ${time};
  `
}
