(function () {
	var contentData = {
		barleyBreak: {
			title: 'Пятнашки:',
			description: 'Игра в пятнашки  —  популярная головоломка, придуманная в 1878 году Ноем Чепмэном. Представляет собой набор одинаковых квадратных костяшек с нанесёнными числами, заключённых в квадратную коробку. Длина стороны коробки в четыре раза больше длины стороны костяшек для набора из 15 элементов, соответственно в коробке остаётся незаполненным одно квадратное поле. Цель игры — перемещая костяшки по коробке, добиться упорядочивания их по номерам, желательно сделав как можно меньше перемещений.',
			img: 'sourceimages/barley-break.png'
		},
		solitaire: {
			title: 'Косынка:',
			description: '«Косынка» — старинный пасьянс. Правила игры — разложить карты по мастям в порядке от туза до короля в четыре стопки. Карту можно перекладывать на другую рангом выше, но другого цвета (чёрного или красного). В каждую из четырёх базовых стопок (домов), по которым необходимо разложить все карты, сначала кладутся тузы, затем двойки, тройки и так далее до короля. Карты можно сдавать из оставшейся от раздачи колоды (в левом верхнем углу) либо по одной, либо по три штуки, в зависимости от модификации. В свободную ячейку (не дом) можно положить только короля. Цель игры состоит в том, чтобы разложить все карты в четыре стопки по возрастанию, начиная с туза так, чтобы карты одной масти находились в одной стопке.',
			img: 'sourceimages/solitaire.png'
		},
		maze: {
			title: 'Лабиринт:',
			description: 'В этой программе, Вы можете сгенерировать лабиринт и пройти его самостоятельно. Или программа сама покажем Вам, кротчайший путь.',
			img: 'sourceimages/maze.png'
		},
		example: {
			title: 'Калькулятор:',
			description: 'В скором времени здесь Вы увидите калькулятор – мою следующую работу.',
			img: 'sourceimages/next-work.png'
		}
		
	};
    var $portfolio = document.getElementById("portfolio");
    var $btnLeft = $portfolio.querySelector(".arrow-left");
    var $btnRight = $portfolio.querySelector(".arrow-right");
    var $carousel = $portfolio.querySelector(".nav-tab-wrap");
    var $galleryItems = $portfolio.querySelectorAll(".item");
    var $tabsContainer = document.querySelector(".tabs");
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
		$tabsContainer.innerHTML = createTabContent(item.dataset.id);
    };
	
	function createTabContent(dataId) {
		return '<div class="tab"><div class="space-between"><h2>'+contentData[dataId].title+'</h2><p>'+contentData[dataId].description+'</p></div><div class="tab-wrap"><img src="'+contentData[dataId].img+'"></div>';
	}

    initTabs();
})();