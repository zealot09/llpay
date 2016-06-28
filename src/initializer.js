var llIconHandler = function() {
  var imageScaleStyle = document.createElement('style'),
    scale = document.documentElement.clientWidth / 750,
    scaleCss = '[class^="ll-icon"]{zoom: ' + scale + ';}'

  imageScaleStyle.innerHTML = scaleCss;
  document.head.appendChild(imageScaleStyle);
}

export default {
  init() {
    llIconHandler();
  }
}
