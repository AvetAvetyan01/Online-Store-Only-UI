import { basketProductsData, compareProductsData, generalParameters, parameters, parametersData } from "./mainScript.js";
import mainPageProducts from "/Scripts/products_JSON.js";

export function createBasketCard(target,data,indx){
    const card = document.createElement("li")
    card.dataset.id = indx
    card.classList.add("basket_card")
    
    // image , model and price
    const image_nameContainer = document.createElement("div")
    const modelImg = document.createElement("img")

    modelImg.src = data[indx].image_URL

    image_nameContainer.classList.add("image_name_container")
    modelImg.classList.add("basket_card_img")

    const model_price = document.createElement("div")
    const modelName = document.createElement("p")
    const price = document.createElement("p")

    modelName.classList.add("card_model_name")
    price.classList.add("card_model_price")
    
    modelName.innerText = data[indx].company + " " + data[indx].model
    price.innerText = data[indx].cash + " AMD"
    
    model_price.append(modelName)
    model_price.append(price)
    image_nameContainer.append(modelImg)
    image_nameContainer.append(model_price)
    
    card.append(image_nameContainer)

    // add / minuse buy count
    const deviceCount = document.createElement("div")
    let deviceCountIndicator = document.createElement("p")
    const addCount = document.createElement("i")
    const minusCount = document.createElement("i")

    deviceCountIndicator.innerText = basketProductsData[indx]
    
    deviceCount.classList.add("device_count")
    deviceCountIndicator.classList.add("device_count_indicator")
    
    addCount.classList.add("fa-solid","fa-plus")
    minusCount.classList.add("fa-solid","fa-minus")
    
    addCount.onclick = () => {
        if (basketProductsData[indx] < 10){
            deviceCountIndicator.innerText = ++basketProductsData[indx] 
            ultimatePrice.innerText = data[indx].cash * deviceCountIndicator.innerText  + " AMD"
            finalCalculation()
        }
    }
    minusCount.onclick = () => {
        if (basketProductsData[indx] > 1){
            deviceCountIndicator.innerText = --basketProductsData[indx]
            ultimatePrice.innerText = data[indx].cash * deviceCountIndicator.innerText  + " AMD"
            finalCalculation()
        }
    }
    
    deviceCount.append(addCount)
    deviceCount.append(deviceCountIndicator)
    deviceCount.append(minusCount)

    card.append(deviceCount)

    // ultimate price and delete functional
    
    const ultPrice_delete = document.createElement("div")
    const ultimatePrice = document.createElement("p")
    const deleteButton = document.createElement("div")
    const deleteIcon = document.createElement("i")
    const deleteText = document.createElement("p")
    
    ultPrice_delete.classList.add("ultPrice_delete")
    ultimatePrice.classList.add("ultimate_price")
    deleteButton.classList.add("delete_button")
    deleteIcon.classList.add("fa-solid","fa-xmark")

    ultimatePrice.innerText = data[indx].cash * deviceCountIndicator.innerText + " AMD"
    deleteText.innerText = "Delete"

    ultPrice_delete.append(ultimatePrice)
    ultPrice_delete.append(deleteButton)
    deleteButton.append(deleteIcon)
    deleteButton.append(deleteText)

    card.append(ultPrice_delete)

    target.append(card)
    finalCalculation()
}

function finalCalculation(){
    const totalSum = document.getElementById("totalSum")
    const purchasedGoods = document.getElementById("purchasedGoods")
    const basketProducts = purchasedGoods.querySelectorAll("li")
    
    let sum = 0
    basketProducts.forEach(elm => { sum += +(elm.lastChild.firstChild.innerText).replaceAll(/[A-Z]/g,"") },0)
    totalSum.innerText = sum
}


export function addComperativeProduct(indx){
    const product = mainPageProducts[indx]
    const modelImages = document.getElementById("modelImages")
    const modelNames = document.getElementById("modelNames")
    const modelPrices = document.getElementById("modelPrices")

    const imagesLi = document.createElement("li")
    const image = document.createElement("img")
    const deleteButton = document.createElement("button")
    const deleteIcon = document.createElement("i")

    deleteButton.classList.add("deleteComperativeProduct")
    deleteIcon.classList.add("fa-solid","fa-xmark")

    image.src = product.image_URL

    imagesLi.append(image)
    imagesLi.append(deleteButton)
    deleteButton.append(deleteIcon)
    modelImages.append(imagesLi)

    deleteButton.addEventListener("click", () => {
        let index = null
        modelImages.querySelectorAll("li").forEach((img,ind) => { if (img == deleteButton.parentElement) index = ind })
        generalParameters.querySelectorAll("ul").forEach(list => { list.querySelectorAll("li")[index].remove() })
        compareProductsData.splice(index,1)

        const compareIcon = document.querySelectorAll("#products > li")[indx].firstChild.firstChild
        compareIcon.style.color = "rgb(139, 139, 139)"

        const parametersList = document.querySelectorAll("#parameters > li")
        Object.keys(parametersData).forEach((paramList,listIndex) => {
            let i = 0
            Object.keys(parametersData[paramList]).forEach((paramTitle,titleIndex) => {
                parametersData[paramList][paramTitle].splice(index,1)
                
                const parameterContainer = parametersList[listIndex].lastChild.querySelectorAll("ul")[titleIndex - i]

                parameterContainer.querySelectorAll("li")[index + 1].remove()
                
                let deleter = true
                parametersData[paramList][paramTitle].forEach(elm => { if (elm != "") deleter = false })
                
                if (deleter){
                    delete parametersData[paramList][paramTitle]
                    parameterContainer.remove()
                    i++
                }
            })
            if (!Object.keys(parametersData[paramList]).length){
                delete parametersData[paramList]
                parametersList[listIndex].remove()
            }
        })
        const indicator = document.getElementById("compareIndicator")
        indicator.innerText = compareProductsData.length
        indicator.style.opacity = compareProductsData.length > 0 ? "1" : "0"

        if (!compareProductsData.length) document.getElementById("getBackButton_compareProducts").click()
    })

    const namesLi = document.createElement("li")
    const modelName = document.createElement("p")

    modelName.innerText = product.company + " " + product.model

    namesLi.append(modelName)
    modelNames.append(namesLi)

    const pricesLi = document.createElement("li")
    const modelPrice = document.createElement("p")

    modelPrice.innerText = product.cash
    
    pricesLi.append(modelPrice)
    modelPrices.append(pricesLi)

    // parameters
    Object.keys(product.characteristic).forEach(paramListName => {
        if (!parametersData[paramListName]){
            parametersData[paramListName] = {}
            createParameterContainer(paramListName)
        }

        Object.keys(product.characteristic[paramListName]).forEach(paramTitleName => {
            if (!parametersData[paramListName][paramTitleName])
                parametersData[paramListName][paramTitleName] = []
            
            parametersData[paramListName][paramTitleName][modelImages.childElementCount - 2] = product.characteristic[paramListName][paramTitleName]
        })
    })

    const parametersList = document.querySelectorAll("#parameters > li")
    
    Object.keys(parametersData).forEach((paramListName,ind) => {
        parametersList[ind].lastChild.querySelectorAll("ul").forEach(elm => { elm.remove() }) 

        Object.keys(parametersData[paramListName]).forEach(paramTitleName => {   
            parametersData[paramListName][paramTitleName].length = compareProductsData.length

            for (let i = 0; i < parametersData[paramListName][paramTitleName].length; i++){
                if (!parametersData[paramListName][paramTitleName][i])
                    parametersData[paramListName][paramTitleName][i] = ""
            }

            const paramList = document.createElement("ul")
            const parametersTitleName = document.createElement("li")
            
            parametersTitleName.innerText = paramTitleName
            paramList.append(parametersTitleName)

            parametersData[paramListName][paramTitleName].forEach(parameterName => {
                const parameter = document.createElement("li")
                parameter.innerText = parameterName
                    
                paramList.append(parameter)
            })
            parametersList[ind].lastChild.append(paramList)
        })
    })

    function createParameterContainer(listName){
        const paramContainer = document.createElement("li")
        const paramListTitle = document.createElement("div")
        const paramListTitleText = document.createElement("p")
        const paramListTitleIcon = document.createElement("i")
        
        paramContainer.dataset.type = listName
        
        paramContainer.classList.add("param_container")
        paramListTitle.classList.add("param_list_title")


        // shat lav kliner ete obyekt ogtagorcei switchi poxaren
        switch(listName){
            case "General":
                paramListTitleIcon.classList.add("fa-solid","fa-gear");break
            case "Display":
                paramListTitleIcon.classList.add("fa-solid","fa-tv");break
            case "Camera":
                paramListTitleIcon.classList.add("fa-solid","fa-camera");break
            case "Memory and CPU":
                paramListTitleIcon.classList.add("fa-solid","fa-server");break
            case "Network":
                paramListTitleIcon.classList.add("fa-solid","fa-diagram-project");break
            case "Other":
                paramListTitleIcon.classList.add("fa-solid","fa-arrows-up-down-left-right");break       
        }
3
        paramListTitleText.innerText = listName

        paramListTitle.append(paramListTitleIcon)
        paramListTitle.append(paramListTitleText)

        paramContainer.append(paramListTitle)
        paramContainer.append(document.createElement("div"))

        parameters.append(paramContainer)
    }
}













































































































