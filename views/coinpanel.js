namespace('views.coinPanel');
views.coinPanel = (function () {
	var logpan, dispenser, coin,
		button_panel, costObject;
	
	function init() {
		dispenser = models.Dispenser;
		coin = models.Coin;
		logpan = views.logPanel;
		button_panel = document.getElementById('sub_panel_insert_button');
		util.event('click', button_panel, this, addPushEvent);
		
		if(arguments.length > 0)
			costObject = document.getElementById(arguments[0]);
		else if(!costObject)
			costObject = document.getElementById('total_cost');		// Default
	}
	
	function addPushEvent(e) {
		if(e.target.className !== 'coin_push') return;
		// invoke coinpush event to dispenser object
		var amount = e.target.getAttribute('amount'),
			isPaper = e.target.getAttribute('paper'),
			returnArray, success, i;
			
		if(amount > 0) {
			success = dispenser.setCoin(new coin(amount, isPaper));
			if(success) {
				logpan.writeMessage(amount + '원이 투입되었습니다.');
				updateCost();
			}
		} else {
			returnArray = dispenser.returnCoin();
			if(returnArray.length < 1) {
				logpan.writeMessage('덜컥');
			}
			for(i = 0; i < returnArray.length; i++) {
				logpan.writeMessage(returnArray[i].won + '원이 반환.');
				updateCost();	
			}
		}
	}
	
	function updateCost() {
		var cost = dispenser.getCurrentAmount();
		costObject.innerHTML = cost;
	}
	
	return {
		init: init,
		updateCost: updateCost
	};
}());