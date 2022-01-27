(function () {
    var t,
        e,
        r = document.querySelector(".js-cursor"),
        i = 0,
        n = 0,
        s = 0,
        o = 0;
    if (r) {
        window.addEventListener("mousemove", function (t) {
            (i = t.clientX), (n = t.clientY);
        }),
            (function a() {
                (s += 0.09 * (i - s)),
                    (o += 0.09 * (n - o)),
                    (t = Math.abs((s - i) / 1e3)),
                    (e = Math.abs((o - n) / 750)),
                    (r.style.transform = "translate3d("
                        .concat(s, "px, ")
                        .concat(o, "px, 0) scaleX(")
                        .concat(1 - e, ") scaleY(")
                        .concat(1 - t, ")")),
                    requestAnimationFrame(a);
            })();
    }
})();