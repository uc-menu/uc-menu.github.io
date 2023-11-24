// Make sure you have good knowledge of JavaScript
// and to check the documentation before modifying the code.
// Prices and products are *NOT* modified here.

const commissionRate = 0.3 // 30%
const webhookURL = "https://discord.com/api/webhooks/1177672115084869723/XiU5KGZVCU7chDEGRDm3SsqYEpDfsEMDoaQXJlWWjHXHwC5zP13GhyOkntPCxKGAMzR5" //

function setDiscount(num) {
    document.getElementById("discount").value = num
}

function getInput(div) { return div.getElementsByTagName("input")[0] }
function getLabel(div) { return div.getElementsByTagName("label")[0] }

function getPrice(div) { return div.getAttribute("data-price") }
function getAmount(div) { return div.getElementsByTagName("input")[0].value }
function getProduct(div) { return div.getElementsByTagName("label")[0].innerHTML }
function getEmployee() { return document.getElementById("employee").value }
function getDiscount() { return document.getElementById("discount").value }
function getDivDiscount() { return document.getElementById("discount").value / 100 }

function reset() {
    setDiscount("0")
    var items = document.getElementsByClassName("item")
    for (var i = 0; i < items.length; i++) {
        getInput(items[i]).value = ""
    }
}

function calculate() {
    var items = document.getElementsByClassName("item")
    total = 0
    for (var i = 0; i < items.length; i++) {
        var price = getPrice(items[i])
        var amount = getAmount(items[i])
        if (amount == "" || amount == "0") { continue }
        var sales = price * amount
        total = total + sales
    }
    if (getDiscount() > 0) {
        total = Math.floor(total - (total * getDivDiscount()))
    }
    document.getElementById("total").innerHTML = total
    document.getElementById("commission").innerHTML = Math.floor(total * commissionRate)
}


function sendToDiscWebHook(msg) {
    var request = new XMLHttpRequest()
    request.open("POST", webhookURL, true)
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify({
        "content": msg,
        "username": "Internal menu"
    }))
}

function initSheet(employee) {

}
function addToSheet(price,amount,product) {}
function finalizeSheet(total, discount) {}

function submit() {
    var items = document.getElementsByClassName("item")
    var employee = getEmployee()
    if (employee == "") { employee = "Anonymous" }
    total = 0
    msg = "Employee: " + employee + "\n---"
    sheet = initSheet(employee)

    for (var i = 0; i < items.length; i++) {
        var price = getPrice(items[i])
        var amount = getAmount(items[i])
        var product = getProduct(items[i])
        if (amount == "" || amount == "0") { continue }
        var sales = price * amount
        total = total + sales
        msg = msg + `\n${amount}x of ${product} worth ${price}`
    }
    msg = msg + "\n---"
    if (getDiscount() > 0) {
        msg = msg + "\nPrice before discount: " + total
        total = Math.floor(total - (total * getDivDiscount()))
    }
    msg = msg + "\nTotal price: " + total
    msg = msg + "\nCommission: " + total * commissionRate
    console.log(msg)
    if (total > 0) {
        sendToDiscWebHook(msg)
    }
    document.getElementById("total").innerHTML = total
    document.getElementById("commission").innerHTML = Math.floor(total * commissionRate)
    reset()
    alert("Submitted and resetted.")
}