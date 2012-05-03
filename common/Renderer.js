namespace('common.Renderer');

// 렌더러. 동적으로 DOM을 렌더링한다. 템플릿은 일단 임의로 정함.
common.Renderer = (function() {
	var templateHTML,
		messageObject,
		costObject;
	
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
	
	return {
		render: function(item) {
			var contents = document.getElementById("panel_left");
			var div = document.createElement("div");
			div.className = "viewpanel";
			div.innerHTML = setHTML(item);
			div.addEventListener("click", function(e) {
				if(!e.target.hasAttribute('itemcode')) return;
				try {
					var returnObj = models.Dispenser.getBeverage(e.target.getAttribute('itemcode'));
					if(returnObj) {
						common.Renderer.writeMessage(returnObj.name + ' 이 나왔습니다.');
						common.Renderer.updateAmount(e.currentTarget, returnObj.amount);						
					}
				} catch(e) {
					common.Renderer.writeMessage(e.message);
				} finally {
					common.Renderer.updateCost(models.Dispenser.getCurrentAmount());
				}
			});
			contents.appendChild(div);
		},
		writeMessage: function(msg) {
			this.setMessageObject();
			messageObject.innerHTML += msg + "\n";
		},
		clrMessageBox: function() {
			this.setMessageObject();
			messageObject.innerHTML = '';
		},
		updateCost: function(cost) {
			this.setTotalCostObject();
			costObject.innerHTML = cost;
		},
		setMessageObject: function() {
			if(arguments.length > 0)
				messageObject = document.getElementById(arguments[0]);
			else if(!messageObject)
				messageObject = document.getElementById('message');		// Default
		},
		setTotalCostObject: function() {
			if(arguments.length > 0)
				costObject = document.getElementById(arguments[0]);
			else if(!costObject)
				costObject = document.getElementById('total_cost');		// Default
		},
		updateAmount: function(containerobj, capacity) {
			var obj = containerobj.getElementsByClassName('item_amount');
			obj[0].innerHTML = capacity;
		}
	};
})();