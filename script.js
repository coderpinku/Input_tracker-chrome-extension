let myInput = []
const inputEl = document.getElementById("input-el")
const getInput = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-El")
const tabBtn = document.getElementById("save-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myInput") )

if (leadsFromLocalStorage) {
    myInput = leadsFromLocalStorage
    render(myInput) 
}


tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myInput.push(tabs[0].url)
        localStorage.setItem("myInput", JSON.stringify(myInput) )
        render(myInput)
    })
})




function render(Items){
let listItems = ""

for(let i=0; i < myInput.length; i++){
    // listItems += "<li> <a target='_blank' href ='"+myInput[i]+"' >" + myInput[i] + "</a> </li>"
    listItems += `
    <li>
        <a target='_blank' href="${myInput[i]}">
            ${myInput[i]}
            </a>
            </li>
            
                `
}
ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myInput = []
    render(myInput)
})
getInput.addEventListener('click', function() {
    myInput.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myInput", JSON.stringify(myInput) )
    render(myInput)
})