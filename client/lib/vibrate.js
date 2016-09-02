const Vibrate = (bucket) => {
  navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }
}

export default Vibrate;
