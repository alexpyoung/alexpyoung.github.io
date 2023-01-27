const hero = document.querySelector(".hero");
hero?.addEventListener("touchstart", onTouchStart, false);
hero?.addEventListener("touchmove", onTouchMove, false);

let xDown = null;
let yDown = null;

function onTouchStart(event) {
    const firstTouch = event.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function onTouchMove(event) {
    if (!xDown || !yDown) return;
    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        const hero = document.querySelector(".hero img");
        const current = document.querySelectorAll(
            `[src="${hero?.getAttribute("src")}"][loading=lazy]`
        )[0];
        if (xDiff > 0) {
            // Swipe left
            const next =
                current?.parentElement?.nextElementSibling?.children[0];
            if (next) {
                const src = next.getAttribute("src");
                hero?.setAttribute("src", src);
                next.scrollIntoView({ behavior: "smooth", inline: "center" });
            }
        } else {
            // Swipe right
            const previous =
                current?.parentElement?.previousElementSibling?.children[0];
            if (previous) {
                const src = previous.getAttribute("src");
                hero?.setAttribute("src", src);
                previous.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                });
            }
        }
    }
    xDown = null;
    yDown = null;
}
