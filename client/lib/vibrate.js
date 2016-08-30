const Vibrate = (bucket) => {
  navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

  if (navigator.vibrate) {
    navigator.vibrate(500);
  }
}

export default Vibrate;
