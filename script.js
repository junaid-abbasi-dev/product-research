
const products = []
// read values
const productName = document.querySelector("#product-name")
const productCost = document.querySelector("#product-cost")
const sellingPrice = document.querySelector("#selling-price")

const marketplaceFees = document.querySelector("#marketplace-fees")
const estimatedSale = document.querySelector("#estimated-sales")
const estimatedSalesInput = document.querySelector("#estimated-sales-input")
const productsSavedStatus = document.querySelector("#sub-heading")
const savedProductsContainer = document.querySelector(".saved-products")
// saved
const savedProductsCost = document.querySelector(".saved-product-cost")
const savedProductsProfit = document.querySelector(".saved-products-profit")

// buttons
const clearForm = document.querySelector("#clear")
const saveProductsBtn = document.querySelector(".add-products")
const calculateBtn = document.querySelector(".calculate")

// profit fields
const profitPerUnit = document.querySelector("#profit-per-unit")
const profitPerMargin = document.querySelector("#profit-margin")
const estimatedSalesProfitPerUnit = document.querySelector("#estimated-sales-profit")


function readProductValues() {
    const product = {
        name: productName.value.trim(),
        cost: Number(productCost.value),
        sellingPrice: Number(sellingPrice.value),
        fees: Number(marketplaceFees.value),
        estimatedSales: Number(estimatedSalesInput.value)
    }
    return product
}

calculateBtn.addEventListener("click", function() {
    event.preventDefault()

    const product = readProductValues()

    if (product.sellingPrice <= 0) {
        alert("Enter a selling price greater than zero.")
        return
    }

    const profit = 
        product.sellingPrice - product.cost - 
        (product.sellingPrice * product.fees / 100)
    const margin = (profit / product.sellingPrice) * 100
    const totalProfit = profit * product.estimatedSales

    profitPerUnit.textContent = `$${profit.toFixed(2)}`
    profitPerMargin.textContent = `${margin.toFixed(2)}%`
    estimatedSalesProfitPerUnit.textContent = `$${totalProfit.toFixed(2)}`
})

// save products
saveProductsBtn.addEventListener("click", function() {
    event.preventDefault()

    const product = readProductValues()

    if(product.name === "" || product.sellingPrice <= 0) {
        alert("Enter a product name and a selling price greater than zero.")
        return
    }

    products.push(product)
    const profit = 
        product.sellingPrice - product.cost - 
        (product.sellingPrice * product.fees / 100)

    // render values
    productsSavedStatus.textContent = `${products.length} Products Saved`
    savedProductsContainer.innerHTML += 
    `
    <h2 class="product-name">${product.name}</h2>
    <p class="product-add-status">Added today</p> 
    `
    savedProductsCost.innerHTML = 
    `
    <p class="cost">COST</P>
    <p class="cost">$${product.cost}</p>
    `
    savedProductsProfit.innerHTML = 
    `
    <p class="profit">PROFIT</p>
    <p class="profit">$${profit}</p>
    `
})

// clear form 
clearForm.addEventListener("click", function(){
    // clear fields 
    profitPerUnit.textContent = "$0.00"
    profitPerMargin.textContent = "0%"
    estimatedSalesProfitPerUnit.textContent = "$0.00"
    productsSavedStatus.textContent = `${products.length} Products Saved`
})