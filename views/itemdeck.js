namespace('views.itemDeck');
views.itemDeck = (function () {
	var dispenser, logpan, coinpan;
	
	function init() {
		dispenser = models.Dispenser;
		logpan = views.logPanel;
		coinpan = views.coinPanel;
	}
	
	function setHTML(item) {
		return '<div class="item_slot center padbottom">'
				+ '	<img src="' + item.imgurl + '"></img>'
				+ '</div>'
				+ '<div class="center padbottom">'
				+ item.name + '<br />'
				+ '	(<span class="item_amount">' + item.amount + '</span> Remaining)<br />'
				+ item.price + ' 원'
				+ '</div>'
				+ '<div class="center padbottom">'
				+ '	<button itemcode="' + item.code + '">Get One</button>'
				+ '</div>';
	}
	
	function addEjectEvent(e) {
		if(!e.target.hasAttribute('itemcode'))
			return;
		try {
			var returnObj = dispenser.getBeverage(e.target.getAttribute('itemcode'));
			if(returnObj) {
				logpan.writeMessage(returnObj.name + ' 이 나왔습니다.');
				updateAmount(e.currentTarget, returnObj.amount);
			}
		} catch(e) {
			logpan.writeMessage(e.message);
		} finally {
			coinpan.updateCost();
		}
	}
	
	function updateAmount(containerobj, capacity) {
		var obj = containerobj.getElementsByClassName('item_amount');
		obj[0].innerHTML = capacity;
	}
	
	return {
		init: init,
		itemRender: function(item) {
			var contents = document.getElementById("panel_left");
			var div = document.createElement("div");
			div.className = "viewpanel";
			div.innerHTML = setHTML(item);

			util.event('click', div, this, addEjectEvent);
			contents.appendChild(div);
		},
		
	};
}());
