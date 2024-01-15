import {
    basketPage,basketProductsData,
    likedProducts,likedProductsData,
    comparePage,compareProductsData,
} from "./mainScript.js"

const main = document.querySelector("main")
const popUp = document.getElementById("popUp")

function openBasketPage(e){
    if (e.target.localName == "i" && Object.keys(basketProductsData).length){
        document.body.scrollTop
        main.style.display = "none"
        popUp.style.display = "none"
        likedProducts.style.display = "none"
        comparePage.style.display = "none"
        
        basketPage.style.display = "grid"
    }
}

function openLikedProducts(e){
    if (e.target.localName == "i" && likedProductsData.length){
        document.body.scrollTop
        main.style.display = "none" 
        popUp.style.display = "none"
        basketPage.style.display = "none"
        comparePage.style.display = "none"

        likedProducts.style.display = "block"
    }
}

function openComparePage(e){    
    if (e.target.localName == "i" && compareProductsData.length){
        document.body.scrollTop
        main.style.display = "none"
        popUp.style.display = "none"
        likedProducts.style.display = "none"
        basketPage.style.display = "none"

        comparePage.style.display = "block"
    }
}

function logoClick(){
    document.body.scrollTop
    popUp.style.display = "none"
    likedProducts.style.display = "none"
    basketPage.style.display = "none"
    comparePage.style.display = "none"
    
    main.style.display = "block"
}

export {
    logoClick,
    openBasketPage,
    openLikedProducts,
    openComparePage
}


















































































































