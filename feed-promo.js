function transitionBanner() {
    function cutTextContent(string, endPosition) {
        return string.slice(0, endPosition).trim() + '...';
    }

    function createOrganicCardObj(cardData) {
        var card = cardData.boxes[0];
        var textContent = card.textContent;
        var maxContentLength = 30;

        textContent = textContent.length >= maxContentLength ? cutTextContent(textContent, maxContentLength) : textContent;
        return {
            content: textContent,
            container: cardData.container,
            img: card.video_data.thumbnail
        };
    }

    function getOrganicCards(allCards) {
        var organicCards = [];
        for (var card in allCards) {
            if (allCards[card].mode.indexOf('organic') > -1) {
                organicCards.push(allCards[card]);
            }
        }

        return organicCards;
    }

    function getCardsData() {
        var organicCards = getOrganicCards(TRCImpl.boxes);
        return organicCards.map(createOrganicCardObj);
    }

    function getItmesAsHtmlString(cardsData) {
        return cardsData.reduce(function(html, card, index){
            var showClass = index === 0 ? 'show' : '';
            return html + '<li class="item card-' + index + ' ' + showClass + '" style="z-index:'+ index + ';">' +
                            '<div class="img" style="background-image: url(' + card.img + ')"></div>' +
                            '<div class="content-container">' +
                                '<div class="content">' + card.content + '</div>' +
                            '</div>' +
                        '</li>';
        }, '');
    }

    function createHeader() {
        var header = document.createElement('div');
        header.className += 'tbl-slider-header';
        header.innerText = "Up next";

        return header;
    }

    function createCloseBtn() {
        var closeBtn = document.createElement('div');
        closeBtn.className += 'tbl-slider-closeBtn-wrapper';
        closeBtn.innerHTML = '<div class="tbl-slider-closeBtn">' +
                                '<svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                                    '<desc>Created with Sketch.</desc>' +
                                    '<defs></defs>' +
                                    '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                                        '<g id="icons" transform="translate(-23.000000, -130.000000)" fill="#FFFFFF">' +
                                            '<polygon id="Desktop-Close-initial" points="33 131.208868 31.7911325 130 28 133.791132 24.2088675 130 23 131.208868 26.7911325 135 23 138.791132 24.2088675 140 28 136.208868 31.7911325 140 33 138.791132 29.2088675 135"></polygon>' +
                                        '</g>' +
                                    '</g>' +
                                '</svg>'+
                            '</div>';

        return closeBtn;
    }

    function createArrowIcon() {
        var arrowIcon = document.createElement('div');
        arrowIcon.className += 'arrow';
        arrowIcon.innerHTML = '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                                    '<title>Desktop arrow initial</title>' +
                                    '<desc>Created with Sketch.</desc>' +
                                    '<defs></defs>' +
                                    '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                                        '<g id="icons" transform="translate(-18.000000, -20.000000)" fill="#4472C4">' +
                                            '<path d="M34.4775,29.751875 L28.2275,36.3925 L28,36.634375 L27.771875,36.3925 L21.521875,29.751875 L21.2775,29.49125 L21.568125,29.28375 L22.4125,28.679375 L22.635,28.52 L22.8225,28.719375 L27.14125,33.308125 L27.14125,23.67875 L27.14125,23.36625 L27.45375,23.36625 L28.54625,23.36625 L28.85875,23.36625 L28.85875,23.67875 L28.85875,33.308125 L33.1775,28.719375 L33.365,28.52 L33.586875,28.679375 L34.431875,29.28375 L34.7225,29.49125 L34.4775,29.751875 Z M28,20 C22.476875,20 18,24.4775 18,30 C18,35.523125 22.476875,40 28,40 C33.5225,40 38,35.523125 38,30 C38,24.4775 33.5225,20 28,20 L28,20 Z" id="Desktop-arrow-initial"></path>' +
                                        '</g>' +
                                    '</g>' +
                                '</svg>';

        return arrowIcon;
    }

    function createHoverDiv() {
        var hoverDiv = document.createElement('div');
        hoverDiv.className += 'clickAction';
        hoverDiv.innerText = 'Click for more content';

        return hoverDiv;
    }

    function createSlider(cardsData) {
        var slider = document.createElement('div');
        var header = createHeader();
        var arrowIcon = createArrowIcon();
        var closeBtn = createCloseBtn();
        var hoverDiv = createHoverDiv();
        var itemsContainer = document.createElement('ul');
        var items = getItmesAsHtmlString(cardsData);

        slider.id = 'tbl-slider';
        slider.className += ' tbl-cards-slider';
        itemsContainer.innerHTML = items;

        slider.appendChild(header);
        slider.appendChild(arrowIcon);
        slider.appendChild(hoverDiv);
        slider.appendChild(itemsContainer);
        slider.appendChild(closeBtn);

        return slider;
    }

    function getStyle() {
        var styleDiv = document.createElement('div');
        styleDiv.id = 'tbl-slider-style';
        styleDiv.innerHTML = '<style>' +
            '.tbl-cards-slider {position: fixed; background: #f7f7f7; left: 16px; bottom: -500px; transition: bottom 0.4s ease 2s; width: 264px; height: 64px; border-radius: 4px; border: 1px solid rgba(0,0,0,0.04);; box-shadow: 0 0 2px 0 rgba(0,0,0,0.14), 0 2px 2px 0 rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20); }' +
            '.tbl-cards-slider.in-viewport{bottom: 25px}' +
            '.tbl-cards-slider .tbl-slider-header {position: absolute; top: 11px; left: 93px; line-height: 15px; font-weight: bold; font-size: 12px;}' +
            '.tbl-cards-slider .clickAction { width: 220px; height: 100%; background: #f7f7f7; position: absolute; top: 0px; left: 0px; text-align: center; font-weight: bold; font-size: 16px; color: #000000; line-height: 62px; visibility: hidden; opacity: 0; z-index: 99999; transition: opacity 0.2s ease}' +
            '.tbl-cards-slider:hover .clickAction {visibility: visible; opacity: 1;}' +
            '.tbl-cards-slider ul {margin: 0; padding: 0; width: 100%; height: 100%;}' +
            '.tbl-cards-slider .item {list-style: none; width: 100%; height: 100%; position: absolute; top: 140px; left: 0;}' +
            '.tbl-cards-slider .item.show {top: 0;}' +
            '.tbl-cards-slider .img {display: inline-block; vertical-align: middle; width: 81px; height: 100%; background-size: cover; background-position: center; transform: translateY(140px); transition: transform 0.2s ease;}' +
            '.tbl-cards-slider .item.show .img {transform: translateY(0);}' +
            '.tbl-cards-slider .content-container {display: inline-block; width: 130px; height: 100%; padding-top: 26px; padding-left: 12px; vertical-align: middle; overflow: hidden;}' +
            '.tbl-cards-slider .content {font-size: 12px; background: #f7f7f7; line-height: 15px; transform: translateY(140px); transition: transform 0.35s ease;}' +
            '.tbl-cards-slider .item.show .content {transform: translateY(0);}' +
            '.tbl-cards-slider .arrow {position: absolute; top: 22px; right: 16px}' +
            '.tbl-cards-slider .arrow svg{transition: 0.2s ease;}' +
            '.tbl-cards-slider:hover .arrow svg {transform: scale(1.4);}' +
            '.tbl-cards-slider .tbl-slider-closeBtn-wrapper {position: absolute; top: -25px; right: -25px; width: 27px; height: 27px;}' +
            '.tbl-cards-slider .tbl-slider-closeBtn {position: absolute; top: 0; right: 0; width: 20px; height: 20px; border-radius: 50%; background: #000000; visibility: hidden; opacity:0}' +
            '.tbl-cards-slider .tbl-slider-closeBtn svg {display: block; height: 100%; margin: auto; fill: #ffffff;}' +
            '.tbl-cards-slider:hover .tbl-slider-closeBtn {visibility: visible; opacity: 1}' +
            '.tbl-cards-slider:hover .tbl-slider-closeBtn:hover {visibility: visible; opacity: 1; transition: opacity 0.2s ease}' +
        '</style>';

        return styleDiv;
    }

    function addEventsListners() {
        document.querySelector('.tbl-cards-slider').addEventListener('click', handleSliderClick);
    }

    function handleSliderClick(e) {
        var feed = document.querySelector('.tbl-feed-container');
        var feedPosition = feed.offsetTop;
        window.scrollTo(0, feedPosition);
        //scrollToFeed(feed);
        console.log(e.currentTarget);
    }

    function showNextItem() {
        var allShownItems = document.querySelectorAll('#tbl-slider .item.show');
        var lastShownItem = allShownItems[allShownItems.length - 1];
        var firstItem = document.querySelector('#tbl-slider .card-0');
        var nextItem = lastShownItem.nextSibling;

        if (nextItem) {
            nextItem.classList.add("show");
            firstItem.classList.remove('show');
        } else {
            //show first Item agian when no organic items left
            firstItem.style.zIndex = 99;
            firstItem.classList.add("show");

            stopSlider();
        }
    }

    function stopSlider() {
        clearInterval(activeSlider);
        console.log('clear interval accomplished!');
    }

    var cardsData = getCardsData();
    var style = getStyle();
    var slider = createSlider(cardsData);
    var activeSlider;



    document.body.appendChild(style);
    document.body.appendChild(slider);
    addEventsListners();

    setTimeout(function() {
        slider.classList.add('in-viewport');
    },1000);

    setTimeout(function(){
        activeSlider = setInterval(function () {
            console.log("executing interval");
            showNextItem();
        }, 3500);
    }, 5000);

}

setTimeout(function(){
    transitionBanner();
}, 5000);


