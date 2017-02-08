/**
 * Created by Kong on 2017/2/8.
 */
window.onload = function () {
    console.log("onload")

    var screenH = document.documentElement.clientHeight || document.body.clientHeight;

    var top_a = document.querySelector('#com-d-top-a');

    window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        scrollTop >= screenH && (top_a.style.display='block');
        scrollTop < screenH && (top_a.style.display='none');
    }

    top_a.onclick = function () {
        window.scrollTo(0, 0);
        this.blur();
        return false;
    }
}