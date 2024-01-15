
import mainPageProducts from "/Scripts/products_JSON.js"
import { logoClick,openLikedProducts,openComparePage, openBasketPage } from "./headerFunctional.js"
import { createBasketCard,addComperativeProduct } from "./loyautFunctions.js"

let likedProductsData = []
let compareProductsData = []
let parametersData = {}
let basketProductsData = {}

const basketPage = document.getElementById("basketPage")
const purchasedGoods = document.getElementById("purchasedGoods")
const likedProducts = document.getElementById("likedProducts")
const comparePage = document.getElementById("compareProductsPage")

const generalParameters = document.getElementById("generalParameters")
const parameters = document.getElementById("parameters")

export {
    basketPage,basketProductsData,
    likedProducts,likedProductsData,purchasedGoods,
    comparePage,compareProductsData,parametersData,generalParameters,parameters
}

const products = document.getElementById("products")

function createCard(target,data,indx){
    const card = document.createElement("li")
    card.classList.add("card")
    card.dataset.id = indx

    // top buttons (like,compare)
    
    const topElements = document.createElement("ul")
    const compareIcon = document.createElement("i")
    const likeIcon = document.createElement("i")
    
    topElements.append(compareIcon)
    topElements.append(likeIcon)
    
    topElements.classList.add("top_elements")
    
    compareIcon.classList.add("fa-classic","fa-solid","fa-scale-unbalanced")
    
    if (likedProductsData.includes(indx)){
          likeIcon.style.color = "rgb(255,0,0)"
          likeIcon.classList.add("fa-solid","fa-heart")
    }else likeIcon.classList.add("fa-regular","fa-heart")

    compareIcon.classList.add("compare_icon")
    likeIcon.classList.add("like_icon")
    
    card.prepend(topElements)

    const modelImg = document.createElement("img")
    modelImg.src = data[indx].image_URL


    modelImg.classList.add("model_img")
    
    card.append(modelImg)
    
    // name of model
    const companyName = document.createElement("p")
    const modelName = document.createElement("p")

    companyName.classList.add("company_name")
    modelName.classList.add("model_name")

    companyName.innerText = data[indx].company
    modelName.innerText = data[indx].model
    
    card.append(companyName)
    card.append(modelName)

    // price (credit and cash)
    const price = document.createElement("ul")
    const cash = document.createElement("li")
    const credit = document.createElement("li")

    price.append(cash)
    price.append(credit)
    
    price.classList.add("price")
    cash.classList.add("cash_price")
    credit.classList.add("credit_price")
    
    cash.innerText = data[indx].cash
    credit.innerText = data[indx].credit
    
    card.append(price)

    // bottom elements (stars, button for buy)
    const bottomElements = document.createElement("div")
    const starContainer = document.createElement("div")
    const buyButton = document.createElement("button")
    const buyButtonIcon = document.createElement("img")

    for (let i = 1; i <= 5; i++){
        const star = document.createElement("i") 
        star.classList.add("fa-regular","fa-star","star")
        star.dataset.id = i

        starContainer.append(star)
    }

    const stars = starContainer.querySelectorAll("i")

    stars.forEach(elm => {
        if (elm.dataset.id <= data[indx].rating){
            elm.classList.add("fa-solid")
            elm.classList.remove("fa-regular")
            elm.style.color = "rgb(255, 166, 0)"
        }else{
            elm.classList.add("fa-regular")
            elm.classList.remove("fa-solid")
            elm.style.color = "#5c5c5c"
        }
    })
        
        
    buyButton.append(buyButtonIcon)
    bottomElements.append(buyButton)
    bottomElements.prepend(starContainer)
    
    bottomElements.classList.add("bottom_elements")
    starContainer.classList.add("stars")
    buyButton.classList.add("buy_button")
    buyButtonIcon.classList.add("buy_button_emojy")
    
    buyButtonIcon.src = "https://cdn-icons-png.flaticon.com/128/2696/2696198.png"
    buyButtonIcon.alt = "cart emojy"

    card.append(bottomElements)
    
    target.append(card)
}

function createProducts(myJSON){
        myJSON.forEach((elm,indx,arr) => createCard(
                                        products,
                                        arr,
                                        indx
                                        ))
                                    }
                                    
createProducts(mainPageProducts)

const allCharacteristics = document.getElementById("productAllCharacteristics")

products.addEventListener("click", loyautFunctional)

function loyautFunctional(e){
    if (["model_img","company_name","model_name"].includes(e.target.className)){
        const product = mainPageProducts[e.target.closest("li").dataset.id]
        main.style.display = "none"
        likedProducts.style.display = "none"
        document.body.scrollTop

        const popUp = document.getElementById("popUp")
        popUp.style.display = "block"
        
        let chars = Object.entries(product.characteristic)
        const cTitles = chars.map(elm => elm[0])
        
        chars = chars.map(elm => Object.entries(elm[1]))
        
        chars.forEach((elm,indx) => {
            const charsContainer = document.createElement("div")
            const charsTitle = document.createElement("div")
            const charsTitleIcon = document.createElement("i")
            const charsTitleText = document.createElement("p")
            const charsList = document.createElement("ul")
            
            charsContainer.classList.add("charContainer")
            charsTitle.classList.add("charTitle")
            charsTitleIcon.classList.add("charsTitleIcon")
            charsList.classList.add("charsList")
            charsTitleText.classList.add("charTitleText")

            charsTitleText.innerText = cTitles[indx]

            switch(charsTitleText.innerText){
                case "General":
                    charsTitleIcon.classList.add("fa-solid","fa-gear");break
                case "Display":
                    charsTitleIcon.classList.add("fa-solid","fa-tv");break
                case "Camera":
                    charsTitleIcon.classList.add("fa-solid","fa-camera");break
                case "Memory and CPU":
                    charsTitleIcon.classList.add("fa-solid","fa-server");break
                case "Network":
                    charsTitleIcon.classList.add("fa-solid","fa-diagram-project");break
                case "Other":
                    charsTitleIcon.classList.add("fa-solid","fa-arrows-up-down-left-right");break
            }
            
            charsTitle.append(charsTitleIcon)
            charsTitle.append(charsTitleText)

            charsContainer.append(charsTitle)
            charsContainer.append(charsList)
            allCharacteristics.append(charsContainer)
        
            const productImage = document.getElementById("productImage")
            productImage.src = product.image_URL
        
            const productName = document.querySelector("#productNameAndButtons h2")
            productName.innerText = product.company + " " + product.model
        
            const productCashPrice = document.querySelector("#productPrice p")
            const productCreditPrice = document.querySelector("#productPrice span")
            productCashPrice.innerText = product.cash
            productCreditPrice.innerText = product.credit
        
            
            let deviceCount = document.querySelector("#purchasesCount p")
            let count = 1
            deviceCount.innerText = count
            
            const addCount = document.getElementById("addCount")
            const minuseCount = document.getElementById("minuseCount")
            
            addCount.onclick = () => {if (count < 10) deviceCount.innerText = ++count}
            minuseCount.onclick = () => {if (count > 1) deviceCount.innerText = --count}
            
            
            const RAM = document.getElementById("RAM")
            const memory = document.getElementById("Memory")
            const announcementYear = document.getElementById("AnnouncementYear")
            
            RAM.innerText = product.characteristic["Memory and CPU"].RAM
            memory.innerText = product.characteristic["Memory and CPU"].Memory
            announcementYear.innerText = product.characteristic["General"].Date

            elm.forEach(element => {
                    const char = document.createElement("li")
                    const charType = document.createElement("p")
                    const charName = document.createElement("span")
            
                    charType.innerText = element[0]
                    charName.innerText = element[1]
                    
                    char.append(charType)
                    char.append(charName)
                    charsList.append(char)
                })
            })
        }
        else if (e.target.classList.contains("fa-heart")){
            const likeIcon = e.target
            const lovedIcon = document.querySelector("#lovedButton i")
            const indicator  = document.getElementById("lovedIndicator")
            const id = likeIcon.closest("li").dataset.id
                                                
            if (likedProducts.childElementCount == "2")
                likedProducts.lastChild.remove()
            
                const likedProductsList = document.createElement("ul")
                likedProductsList.id = "likedProductsList"
                likedProductsList.addEventListener("click",loyautFunctional)

            if (likeIcon.classList.contains("fa-regular")){
                likeIcon.classList.remove("fa-regular")
                likeIcon.classList.add("fa-solid")
                likeIcon.style.color = "rgb(255,0,0)"
                
                likedProductsData.push(id)
            }else{
                likeIcon.classList.add("fa-regular")
                likeIcon.classList.remove("fa-solid")
                likeIcon.style.color = "rgb(139, 139, 139)"

                const product = products.getElementsByClassName("card")[id]
                const productLikeIcon = product.firstChild.lastChild

                productLikeIcon.classList.add("fa-regular")
                productLikeIcon.classList.remove("fa-solid")
                productLikeIcon.style.color = "rgb(139, 139, 139)"

                likedProductsData.splice(likedProductsData.findIndex((indx) => indx === id),1)

                if (!likedProductsData.length) GBB_likedProducts.click()
            }

            likedProductsData.forEach(elm => { createCard(likedProductsList,mainPageProducts,elm) })
            likedProducts.append(likedProductsList)
            
            if (likedProductsData.length > 0){
                indicator.style.opacity = "1"
                indicator.innerText = likedProductsData.length
                lovedIcon.classList.remove("fa-regular")
                lovedIcon.classList.add("fa-solid")
            }else{
                indicator.style.opacity = "0"
                lovedIcon.classList.add("fa-regular")
                lovedIcon.classList.remove("fa-solid")
            }
        }
        else if (e.target.classList.contains("fa-scale-unbalanced")){
            const compareIcon = e.target
            const indicator  = document.getElementById("compareIndicator")
            const id = compareIcon.closest("li").dataset.id
            
            if (compareIcon.style.color != "rgb(55, 130, 242)"){
                if (compareProductsData.length < 3){
                    compareIcon.style.color = "rgb(55, 130, 242)"  
                    compareProductsData.push(+id)
                    addComperativeProduct(+id)
                    indicator.innerText = compareProductsData.length
                    indicator.style.opacity = compareProductsData.length > 0 ? "1" : "0"
                }
            }else{
                compareIcon.style.color = "rgb(139, 139, 139)"
                const ind = compareProductsData.findIndex((index) => index === +id)
                document.getElementById("modelImages").querySelectorAll("li")[ind].lastChild.click()
                // if (!compareProductsData.length) GBB_compareProducts.click()
            }
            
        }
        else if (e.target.className == "buy_button" || e.target.parentElement.className == "buy_button"){
            const buyButton = e.target
            let cardId = null

            
            if (buyButton.localName == "li")
                cardId = buyButton.parentElement.parentElement.closest("li").dataset.id
            else
                cardId = buyButton.parentElement.parentElement.closest("li").dataset.id


            if (!basketProductsData[cardId]){
                basketProductsData[cardId] = 1
                createBasketCard(purchasedGoods,mainPageProducts,+cardId)
            }else{
                if (basketProductsData[cardId] < 10){
                    const basketCards = purchasedGoods.querySelectorAll("li")

                    let basketCardIndex = null
                    basketCards.forEach((elm,ind) => { basketCardIndex = elm.dataset.id == cardId ? ind : false })
                    
                    const basketCard = basketCards[basketCardIndex]
                    
                    const  addCountButton = basketCard.children[1].firstChild
                    addCountButton.click()
                }
            }
            if (purchasedGoods.childElementCount > 0){
                const indicator = document.getElementById("basketIndicator")
                indicator.innerText = purchasedGoods.childElementCount
                indicator.style.opacity = "1"
            }
        }
        else if (e.target.classList.contains("fa-star")){
            const stars = e.target.parentElement.querySelectorAll("i")
            stars.forEach(elm => {
                if (elm.dataset.id <= e.target.dataset.id){
                    elm.classList.add("fa-solid")
                    elm.classList.remove("fa-regular")
                    elm.style.color = "rgb(255, 166, 0)"
                }else{
                    elm.classList.add("fa-regular")
                    elm.classList.remove("fa-solid")
                    elm.style.color = "#5c5c5c"
                }
            })
        }
}

purchasedGoods.addEventListener("click", (e) => {
    if (e.target.closest("div").className == "delete_button"){
        const indicator = document.getElementById("basketIndicator")
        const totalSum = document.getElementById("totalSum")
        const card = e.target.closest("li")
        const price = card.getElementsByClassName("ultimate_price")[0].innerText.replaceAll(/[^0-9]/g,"")

        totalSum.innerText -= price
        delete basketProductsData[card.dataset.id]
        card.remove()
        indicator.innerText = purchasedGoods.childElementCount

        const GBB_basketProducts = document.getElementById("getBackButton_basketProducts")

        if (indicator.innerText == 0){
            GBB_basketProducts.click()
            indicator.style.opacity = "0"
        }
    }
})

// GET BACK BUTTONS 

const GBB_PopUp = document.getElementById("getBackButton_PopUp")
const main = document.querySelector("main")

GBB_PopUp.onclick = function(){
    const popUp = document.getElementById("popUp")

    popUp.style.display = "none"
    main.style.display = "block"

    const allCharacteristics = document.getElementById("productAllCharacteristics")
    const charContainers = allCharacteristics.querySelectorAll(".charContainer")
    charContainers.forEach(elm => elm.remove())
}

const GBB_likedProducts = document.getElementById("getBackButton_likedProducts")

GBB_likedProducts.onclick = function(){
    main.style.display = "block"
    likedProducts.style.display = "none"
}


const GBB_basketProducts = document.getElementById("getBackButton_basketProducts")

GBB_basketProducts.onclick = function(){
    main.style.display = "block"
    basketPage.style.display = "none"
}


const GBB_compareProducts = document.getElementById("getBackButton_compareProducts")
const compareProductsPage = document.getElementById("compareProductsPage")

GBB_compareProducts.onclick = function(){
    main.style.display = "block"
    compareProductsPage.style.display = "none"
}


// BUY AGGRIMENT

const check = document.getElementById("check")
const orderButton = document.getElementById("orderButton")

check.onclick = () => {
    if (check.childElementCount == 0){
        const checkIcon = document.createElement("i")
        checkIcon.classList.add("fa-solid","fa-check")
        orderButton.style = "opacity: 1;cursor: pointer;"
        check.append(checkIcon)
    }else{
        orderButton.style = "opacity: 0.6;cursor: default;"
        check.firstChild.remove()
    }
}

// HEARDER FUNCTIONAL

const lovedButton = document.getElementById("lovedButton")
lovedButton.onclick = openLikedProducts

const basketButton = document.getElementById("basketButton")
basketButton.onclick = openBasketPage

const compareButton = document.getElementById("comparePageButton")
compareButton.onclick = openComparePage

const logo = document.getElementById("logo")
logo.onclick = logoClick

// LOG IN
loginButton.onclick = function(){
    if (!+login_container.style.opacity)
        login_container.style = "opacity: 1;transform: translate(-50%,10%);"
    else
        login_container.style = "opacity: 0;transform: translate(-50%,-120%);"
}

// BURGER

burgerButton.onclick = () => burger.style = "visibility: visible;opacity: 1;"
closeIcon.onclick = () => burger.style = "visibility: hidden;opacity: 0;"

// SLIDER
const mSlides = document.querySelectorAll(".mSlide")
let active = 0

slideList.addEventListener("click", function (e){
    if (e.target.localName == "img") {
        active = e.target.parentElement.dataset.slideid
        deleteActiveClass()
        addActiveClass(e.target.parentElement)
    }
})

function deleteActiveClass() {
    document.querySelectorAll("#slideList li").forEach(elment => elment.classList.remove("active-slide"))
    mSlides.forEach(elm => elm.classList.remove("active-mSlide"))
}
function addActiveClass (elm){
    elm.classList.add("active-slide")
    mSlides[active - 1].classList.add("active-mSlide")
}







































































