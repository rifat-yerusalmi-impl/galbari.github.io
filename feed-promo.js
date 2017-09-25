function transitionBanner() {
    function createOrganicCardObj(cardData) {
        var container = cardData.container;
        var card = cardData.boxes[0];
        return {
            title: card.title,
            content: card.textContent,
            container: container,
            img: card.video_data.thumbnail
        };
    }

    function getCardsData() {
        var allCards = TRCImpl.boxes;
        var organicCards = allCards.filter(function(card){return card.mode.indexOf('organic');});
        return organicCards.map(createOrganicCardObj);
    }

    var cardsData = getCardsData();
    console.log(cardsData);
}
setTimeout(function(){
    transitionBanner();
}, 3000)


