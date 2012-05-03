namespace('models.Dispenser');
var models;
models.Dispenser = (function() {
	var inventory = [];		// 제품 인벤토리 (Product 클래스 사용)
	var insertedCoins = [];	// 투입액 클래스 (Coin 클래스 사용) - 쓰지 말아보자.
	var totalRecord = 0;	// 총 매출액
	var currentAmount = 0;	// 현재 투입금액

	return {
		getCurrentAmount: function() {
			return currentAmount;
		}
		, setCoin: function(coin) {
			if(!coin instanceof models.Coin) return false;
			currentAmount += coin.getPrice();
			return true;
		}
		, returnCoin: function() {
			var thousand = Math.floor(currentAmount / 1000);
			var hundred = Math.floor((currentAmount % 1000) / 100);
			var ten = Math.floor((currentAmount % 100) / 10);
			var returnCoinSet = [], i;

			for(i = 0; i < thousand; i++) {
				returnCoinSet.push(new models.Coin(1000, 'paper'));
			}
			for(i = 0; i < hundred; i++) {
				returnCoinSet.push(new models.Coin(100));
			}
			for(i = 0; i < ten; i++) {
				returnCoinSet.push(new models.Coin(10));
			}
		
			currentAmount = 0;
			return returnCoinSet;
		}
		, setInventory: function(items) {
			inventory = items;
		}
		, getBeverage: function(code) {
			if(inventory.length < 1) return undefined;
			for(var i in inventory) {
				if(code === inventory[i].code) {
					if(inventory[i].amount === 0) {
						throw Error(inventory[i].name + " is sold out.");
					} else if(currentAmount >= inventory[i].price) {
						currentAmount -= inventory[i].price;
						inventory[i].amount -= 1;
						return inventory[i];
					}
					else
						throw new Error("Not enough money. Please insert coin or paper.");
				}
			}
			throw new Error("No matching item.");
		}
	}; 
})();


// 코인 클래스
namespace('models.Coin');

models.Coin = function(won, isPaper) {
	this.won = parseInt(won, 10);
	this.isPaper = Boolean(isPaper);
};

models.Coin.prototype = {
	// 동전이면 true, 그렇지 않으면 false를 반환한다.
	isCoin: function() {
		return (this.type === 'coin');
	}
	, getPrice: function() {
		return this.won;
	}
};

// 물건 클래스
namespace('models.Product');

models.Product = function(code, name, price, amount, imgurl, description) {
	this.code = code;
	this.name = name;
	this.price = price;
	this.amount = amount;
	this.imgurl = imgurl;
	this.description = description;
}

models.Product.prototype = {
	
};