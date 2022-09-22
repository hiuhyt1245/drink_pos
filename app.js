const drinkPos = new DrinkPos()

const addDrinkButton = document.querySelector('[data-drink-pos="add-drink"]')
addDrinkButton.addEventListener('click', function () {
  // 1. get checked value of options
  const drinkName = drinkPos.getCheckedValue('drink')
  const ice = drinkPos.getCheckedValue('ice')
  const sugar = drinkPos.getCheckedValue('sugar')

  // 2. show alert if user did not check any drink option
  if (!drinkName) {
    alert('Please choose at least one item.')
    return
  }

  // 3. Use Drink Constructor to create drink instance
  const drink = new Drink(drinkName, sugar, ice)

  // 4. add order UI
  drinkPos.addDrink(drink)
})

const orderLists = document.querySelector('[data-order-lists]')
orderLists.addEventListener('click', function (event) {
  let isDeleteButton = event.target.matches('[data-drink-pos="delete-drink"]')
  if (!isDeleteButton) {
    return
  }

  drinkPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
})

const checkoutButton = document.querySelector('[data-drink-pos="checkout"]')
checkoutButton.addEventListener('click', function () {
  // 1. calculate total amount
  alert(`Total amount of drinks：$${drinkPos.checkout()}`)

  // 2. reset the order list
  let isOrderConfirm = confirm('Make sure to checkout?')
  if (isOrderConfirm) {
    drinkPos.clearOrder(orderLists)
  }
})

// Constructor function for Drink Pos System
function DrinkPos() { }
DrinkPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`[name=${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}

DrinkPos.prototype.addDrink = function (drink) {
  let orderListsCard = `
    <div class="card mb-3">
    <div class="card-body pt-3 pr-3">
      <div class="text-right">
        <span data-drink-pos="delete-drink">×</span>
      </div>
      <h6 class="card-title mb-1">${drink.name}</h6>
      <div class="card-text">${drink.ice}</div>
      <div class="card-text">${drink.sugar}</div>
    </div>
    <div class="card-footer text-right py-2">
      <div class="card-text text-muted">$ <span data-drink-price>${drink.price()}</span></div>
    </div>
  </div>
  `

  orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}

DrinkPos.prototype.deleteDrink = function (target) {
  target.remove()
}

DrinkPos.prototype.checkout = function () {
  let totalAmount = 0
  document.querySelectorAll('[data-drink-price]').forEach(function (drink) {
    totalAmount += Number(drink.textContent)
  })
  return totalAmount
}

DrinkPos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(function (card) {
    card.remove()
  })
}

function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}

Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green Tea':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    case 'Americano':
      return 60
    case 'Caffee Latte':
      return 70
    case 'Mocha':
    case 'Macchiato':
      return 75
    default:
      alert('No this drink')
  }
}