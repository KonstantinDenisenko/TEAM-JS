(function () {
    var $portfolio = document.getElementById("portfolio");
    var $btnLeft = $portfolio.querySelector(".arrow-left");
    var $btnRight = $portfolio.querySelector(".arrow-right");
    var $carousel = $portfolio.querySelector(".nav-tab-wrap");
    var $galleryItems = $portfolio.querySelectorAll(".item");
    var $tabs = document.querySelectorAll(".tab");
    var VISIBLE_ITEMS = 3;
    var CLASS_VISIBLE = "visible";
    var CLASS_ACTIVE = "active";
    var baseItemWidth = $galleryItems[0].getBoundingClientRect().width;
    var itemWidth = 0;

    $btnRight.addEventListener("click", function () {
        itemWidth -= baseItemWidth;
        checkCarouselLength();
    });

    $btnLeft.addEventListener("click", function () {
        itemWidth += baseItemWidth;
        checkCarouselLength();
    });

    function checkCarouselLength() {
        var quantityItems = $galleryItems.length - VISIBLE_ITEMS;

        if (itemWidth < -(baseItemWidth * quantityItems)) {
            itemWidth = -(baseItemWidth * quantityItems);
        } else if (itemWidth > 0) {
            itemWidth = 0;
        }

        moveCarousel(itemWidth);
        toggleRewindButtons(quantityItems);
    };

    function moveCarousel(itemWidth) {
        $carousel.style.transform = "translateX(" + itemWidth + "px)";
    };

    function toggleRewindButtons(quantityItems) {
        if (itemWidth < 0) {
            $btnLeft.classList.add(CLASS_VISIBLE);
        } else {
            $btnLeft.classList.remove(CLASS_VISIBLE);
        }
        if (itemWidth === -(baseItemWidth * quantityItems)) {
            $btnRight.classList.remove(CLASS_VISIBLE);
        } else {
            $btnRight.classList.add(CLASS_VISIBLE);
        }
    };

    function initTabs() {
        for (var a = 0; a < $galleryItems.length; a++) {
            (function (item) {
                item.addEventListener("click", function () {
                    showActivTab(item);
                });
            })($galleryItems[a]);
        }
    };

    function showActivTab(item) {
        if (!item.classList.contains(CLASS_ACTIVE)) {
            for(var a = 0; a < $galleryItems.length; a++) {
                if ($galleryItems[a].classList.contains(CLASS_ACTIVE)) {
                    $galleryItems[a].classList.remove(CLASS_ACTIVE);
                }
            }
            item.classList.add(CLASS_ACTIVE);
        }
        showTab(item);
    };

    function showTab(item) {
        var dataId = item.dataset.id;
        var tab = document.getElementById(dataId);

        if (!tab.classList.contains(CLASS_VISIBLE)) {
            for(var a = 0; a < $tabs.length; a++) {
                if ($tabs[a].classList.contains(CLASS_VISIBLE)) {
                    $tabs[a].classList.remove(CLASS_VISIBLE);
                }
            }
            tab.classList.add(CLASS_VISIBLE);
        }
    };

    initTabs();
})();