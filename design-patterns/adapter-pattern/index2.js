const  localStorageAdapter = {
  findAll: function(callback) {
    let cartList = JSON.parse(localStorage['cart'])
    callback(cartList)
  },
  save: function(item) {
    let cartList = JSON.parse(localStorage['cart'])
    cartList.push(item)
    localStorage['cart'] = JSON.stringify(cartList)
  }
}

const  serverAdapter = {
  findAll: function(callback) {
    fetch('https://jirengu.com/getCartList')
      .then(res => res.json())
      .then(data => callback(data))
  },
  save: function(item) {
    fetch('https://jirengu.com/addToCart', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) })
      .then(res => res.json())
      .then(data => callback(data))
  }
}

class ShoppingCart {
  constructor(adapter) {
    this.adapter = adapter
  }
  add(item) {
    this.adapter.save(item)
  }
  show() {
    this.adapter.findAll(list => {
      console.log(list)
    } )
  }
}


let cart = new ShoppingCart(localStorageAdapter)
//let cart = new ShoppingCart(serverAdapter)
cart.add({title: '手机'})
cart.add({title: '电脑'})
cart.show()
