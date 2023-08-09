
let compines=[]
let current
let mode=0
let regStatus =1
let addSetilmentStatus
let editElement
let referance
const dateFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
window.onload = function() {
//   localStorage.clear()
    compines= JSON.parse(localStorage.getItem('allData'))!=null?JSON.parse(localStorage.getItem('allData')):compines;
    current= JSON.parse(localStorage.getItem('current'))!=null?JSON.parse(localStorage.getItem('current')):current;
    mode= JSON.parse(localStorage.getItem('mode'))!=null?JSON.parse(localStorage.getItem('mode')):mode;
    // console.log(compines)
    // console.log(current)
    // console.log(mode)
    if(mode==0){
        registerMode()
        removeEntry()
        hideCompiney()
        regStatus=1
        loadHome()    
        document.getElementById('setelment').classList.add('hide')            
        // 

    }else{
        regStatus=0
        removeEntry()
        loadEntry()
        hideCompiney()
        setelmentMode()
        document.getElementById('setelment').classList.remove('hide')

    }
    // 
}
let oruForm=document.getElementById('enterCompiny');
oruForm.addEventListener("submit",(e) => {
    e.preventDefault()
    // console.log(inputObj.value)
    if(regStatus==1)
        register()
    else{
        
        userEditing()
    } 
})
const form = document.getElementById("entryDet");

// Event listener for form submission
form.addEventListener("submit", event=> {
    event.preventDefault(); // Prevent form submission
    // console.log(1)
    submitEntry(addSetilmentStatus)
    
    
});

// Event listener for "You Give" button

function loadHome(){
    let data=document.getElementById('compines')
    let message
    let postive=0,negative=0
    data.innerHTML=''
    // document.getElementById('summery_give').innerHTML=100
    // console.log()
   
    compines.forEach(element => {
        if(element.total>0){
            postive+=element.total
             message=`<div class="compinyStyle" onClick=selectOp(this)>
                    <h4>${element.name}<h4>
                    <div class='moneyGet'><span class="rssymbol">₹</span>${element.total}</div>
                    </div>`
        }else if(element.total<0){
            negative=negative+element.total
            message=`<div class="compinyStyle" onClick=selectOp(this)>
            <h4>${element.name}<h4>
            <div class='moneyGot'><span class="rssymbol">₹</span>${-1*element.total}</div>
            </div>`
        }else{
            message=`<div class="compinyStyle" onClick=selectOp(this)>
                    <h4>${element.name}<h4>
                    <div ><span class="rssymbol">₹</span>${element.total}</div>
                    </div>`
        }
        data.insertAdjacentHTML("afterbegin",message)
        
    });
    document.getElementById('summery_give').innerHTML=`<span class="rssymbol">₹</span>${postive}`
    document.getElementById('summery_got').innerHTML=`<span class="rssymbol">₹</span>${-1*negative}`
    data.insertAdjacentHTML("beforeend",`<div class='dummy'></div>`)
}
function loadEntry(){
    // console.log(current)
    let index=compines.map(x=>x.name).indexOf(current)
        // console.log(index)
        document.getElementById('customer').innerHTML=`<div><button onclick="home()"  class="fa-solid fa-circle-chevron-left fa-2xl" ></button><h2 id='comp'>${current}</h2></div>
        <div>
        <button  class="fa-solid fa-user-pen fa-2xl" onclick=userEdit(this) ></button>
        <button class="fa-solid fa-trash-can fa-2xl" onclick=remove(this)></button>
        </div>`

        if(compines[index].total>0){
            document.getElementById('result').innerHTML=`<h2>Totel Credit</h2> <h2 class="moneyGet"><span class="rssymbol">₹</span>${compines[index].total}</h2>`
        }else if(compines[index].total<0){
            document.getElementById('result').innerHTML=`<h2>Totel Debit</h2> <h2 class="moneyGot"><span class="rssymbol">₹</span>${-1*compines[index].total}</h2>`
        }else{
            document.getElementById('result').innerHTML=`<h2>Settled Up <i class="fa-solid fa-square-check" style="color: #59CE8F;"></i></i></h2>`
        }
        let message
        document.getElementById('Entry').innerHTML=''
        compines[index].entry.forEach(element => {
            const formattedDate = new Date(element.date).toLocaleString('en-IN', dateFormatOptions);
            if(element.amount>0){
                message =`<div class='element_feature'>
                            <span class='hide'>${element.id}</span>
                            <div>
                                <div class="dateTime">${formattedDate}</div>
                                <div class="label">${element.remark}</div>
                            </div>
                            <div class='feature-button'>
                                <div class="amount moneyGet"><span class="rssymbol">₹</span>${element.amount}</div>
                                <button class="fas fa-edit fa-2xl" onclick="edit(this)"></button>
                             </div>
                         </div>`
            }else if(element.amount<0){
                message =`<div class='element_feature '>
                            <span class='hide'>${element.id}</span>
                            <div>
                                <div class="dateTime">${formattedDate}</div>
                                <div class="label">${element.remark}</div>
                            </div>
                            <div class='feature-button'>
                            <div class="amount moneyGot"><span class="rssymbol">₹</span>${-1*element.amount}</div>
                            <button class="fas fa-edit fa-2xl" onclick="edit(this)"></button>
                            </div>
                         </div>`
            }else{
                message =`<div class='element_feature'>
                            <span class='hide'>${element.id}</span>
                            <div>
                                <div class="dateTime">${formattedDate}</div>
                                <div class="label">${element.remark}</div>
                            </div>
                            <div class='feature-button'>
                                <div class="amount"><span class="rssymbol">₹</span>${element.amount}</div>
                                <button class="fas fa-edit fa-2xl" onclick="edit(this)"></button>
                             </div>
                         </div>`
            }
            document.getElementById('Entry').insertAdjacentHTML("afterbegin",message)
        });
        document.getElementById('Entry').insertAdjacentHTML("beforeend",`<div class='dummy'></div>`)
}
function registerMode(){
    // document.getElementById('regster').style.display = "flex";
    // document.getElementById('setelment').style.display = "none";
    // document.getElementById('regster').classList.add("showRegister")
    document.getElementById('setelment').classList.add('hide')
    document.getElementById('regster').classList.remove("hide")
    // document.getElementById('setelment').classList.remove('showSetelment')
    document.getElementById('addSetilment').classList.add('hide')
    // document.getElementById('Entry').classList.add('hide')
}
function setelmentMode(){
    document.getElementById('regster').classList.add("hide")
    // document.getElementById('setelment').classList.add('showSetelment')
    // document.getElementById('regster').classList.remove("showRegister")
    document.getElementById('setelment').classList.remove('hide')
    document.getElementById('addSetilment').classList.remove('hide')
    // document.getElementById('Entry').classList.remove('hide')
    // document.getElementById('regster').style.display = "none";
    // document.getElementById('setelment').style.display = "flex";
}
function addCompiney(){
    regStatus=1
    document.getElementById('but').classList.add('hide')
    document.getElementById('enterCompiny').classList.add("EnterCom")
    document.getElementById('enterCompiny').classList.remove("hide")
    document.getElementById('compines').classList.add('hide')
    document.getElementById('sum').classList.add('hide')
}
function hideCompiney(){
    if(regStatus==1){
        document.getElementById('but').classList.remove('hide')
        document.getElementById('enterCompiny').classList.add("hide")
        document.getElementById('enterCompiny').classList.remove("EnterCom")
        document.getElementById('compines').classList.remove('hide')
        document.getElementById('sum').classList.remove('hide')
    }
    if(regStatus==0){
        document.getElementById('setelment').classList.remove('hide')
        document.getElementById('compines').classList.remove('hide')
        document.getElementById('enterCompiny').classList.remove("EnterCom")
        document.getElementById('enterCompiny').classList.add("hide")
        document.getElementById('regster').classList.remove("showRegister")
        document.getElementById('regster').classList.add("hide")
        document.getElementById('but').classList.remove("hide")
        regStatus=1   
    }
}
function register(){
    let name =document.getElementById('compinyName').value.trim()
    
    // if(name){
        
        if(compines.map(x=>x.name).indexOf(name)==-1){
            
            // let prority=compines.map(x=>x.priority).length==0?0:Math.max(...compines.map(x=>x.priority))+1
            // compines.push({'name':name,'entry':[],'total':0, 'priority':prority})
            compines.push({'name':name,'entry':[],'total':0})
            // console.log(prority)
            

            let data=document.getElementById('compines')
            let message=`<div class="compinyStyle" onClick=selectOp(this)>
                            <h4>${name}<h4>
                            <div><span class="rssymbol">₹</span>${compines.filter(x=>x.name==name).map(x=>x.total)}</div>
                         </div>`
                          
            data.insertAdjacentHTML("afterbegin",message)
            hideCompiney()
            document.getElementById('compinyName').value=''
            localStorage.setItem('allData', JSON.stringify(compines))
            localStorage.setItem('mode',JSON.stringify(mode))
            localStorage.setItem('current',JSON.stringify(current))
        }else{
            alert(`${name} Alredy Exist`)
        }
        
    // }
}
function selectOp(data){
    
    mode=1
    localStorage.setItem('mode',JSON.stringify(mode))
    current=data.querySelector('h4').innerText
    localStorage.setItem('current',JSON.stringify(current))
    document.getElementById('customer').innerHTML=`<div><button  class="fa-solid fa-circle-chevron-left fa-2xl"  onclick="home()"></button><h2  id='comp'>${current}</h2></div> 
    <div>
    <button  class="fa-solid fa-user-pen fa-2xl" onclick=userEdit(this) ></button>
    <button class="fa-solid fa-trash-can fa-2xl" onclick=remove(this)></button>
    </div>`
    // console.log(current)
    // console.log(mode)
    loadEntry()
    setelmentMode()
    
    // hideCompiney()
    
}
function addEntry(x){
    document.getElementById('entryDet').classList.add("EntryDet")
    document.getElementById('entryDet').classList.remove('hide')
    addSetilmentStatus=x
    document.getElementById('setelment').classList.add('hide')
    if(x=='edit'){
        document.getElementById('amount').value=parseInt(editElement.amount)
        document.getElementById('remark').value=editElement.remark
        
        let selectedDate = new Date(editElement.date);

        // Adjust the date to Indian Standard Time (IST) timezone
        let indianStandardTimeOffset = 330; // IST is UTC+5:30
        let adjustedDate = new Date(selectedDate.getTime() + indianStandardTimeOffset * 60 * 1000);
    
        // Format the date as required by the datetime-local input
        let formattedDate = adjustedDate.toISOString().slice(0, 16);
    
        // Set the value of the input directly using the formatted date
        document.getElementById('date').value = formattedDate;  
        document.getElementById('specialRemove').classList.remove('hide')
        
    }
}
function removeEntry(){
    document.getElementById('entryDet').classList.remove("EntryDet")
    document.getElementById('entryDet').classList.add('hide')
    document.getElementById('setelment').classList.remove('hide')
}
function entrySort(ind){
    console.log(compines[ind])
    let i ,j
    for(i=0;i<compines[ind].entry.length-1;i++){
        for( j=0;j<compines[ind].entry.length-i-1;j++){
            let date1=new Date(compines[ind].entry[j].date)
            let date2=new Date(compines[ind].entry[j+1].date)
            console.log(`${compines[ind].entry[j].date}<${compines[ind].entry[j+1].date}`)
            if(date1.getTime()>date2.getTime()){
                let temp=compines[ind].entry[j]
                compines[ind].entry[j]=compines[ind].entry[j+1]
                compines[ind].entry[j+1]=temp
            }
        }
    }
    console.log(compines[ind])
}

function submitEntry(state){
    // state.preventDefault();
    
    //  console.log(state)
    // compines[current].entry.date.sort(((date1,date2)=>date1-date2))
    // console.log(compines[current])
    let index=compines.map(x=>x.name).indexOf(current)
    
    // compines[index].entry.date.sort(((date1,date2)=>date1-date2))
    // console.log(compines[index].entry)
   

    let remark=document.getElementById('remark').value
    let amount=parseInt(document.getElementById('amount').value)
    let readdate=document.getElementById('date').value
    let date=new Date(readdate)
    const formattedDate = date.toLocaleString('en-US', dateFormatOptions);
    //  console.log(formattedDate)
    // console.log(current)
    // console.log(index)
    // console.log(amount)
    if(state=='edit'){
   
        // console.log('edit')
        // console.log(editElement)
        let cash=editElement.amount
        let index=compines.map(x=>x.name).indexOf(current)
        let entryIndex=compines[index].entry.map(x=>x.id).indexOf(editElement.id)
        
        compines[index].entry[entryIndex].amount=parseInt(amount)
        compines[index].entry[entryIndex].remark=remark
        compines[index].entry[entryIndex].date=date
        // console.log(compines)
        compines[index].total=parseInt(compines[index].total)-parseInt(cash)+parseInt(amount)
        entrySort(index)
        // console.log(parseInt(compines[index].total))
        // console.log(parseInt(cash))
        // console.log(parseInt(amount))
        // console.log(parseInt(compines[index].total)-parseInt(editElement.total)+parseInt(amount))
     
    }
    else{
       
        // let localId=compines[index].entry.length==0?0:compines[index].entry[compines[index].entry.length-1].id+1
        // let localId=compines[index].entry[compines[index].entry.length]!=null?compines[index].entry[compines[index].entry.length]+1:0
      
       let localId=compines[index].entry.length==0?0:findUniqu(compines[index].entry.map(x=>x.id))
       console.log(compines[index].entry.map(x=>x.id))
      
       
        if(state=='neg')
            amount=amount*-1
        compines[index].total+=amount
        let insertIndex = compines[index].entry.findIndex(element => new Date(element.date).getTime() > new Date(date).getTime());

        if (insertIndex === -1) {
            compines[index].entry.push({'remark':remark,'amount':amount ,'date':date ,'id':localId})
        } else {
            compines[index].entry.splice(insertIndex, 0, {'remark':remark,'amount':amount ,'date':date ,'id':localId});
        }
        console.log(compines)
        let message
        document.getElementById('Entry').innerHTML=''
        compines[index].entry.forEach(element => {
            const formattedDate = new Date(element.date).toLocaleString('en-IN', dateFormatOptions)
            if(element.amount>0){
                message =`<div class='element_feature'>
                            <span class='hide'>${element.id}</span>
                            <div>
                                <div class="dateTime">${formattedDate}</div>
                                <div class="label">${element.remark}</div>
                            </div>
                            <div class='feature-button'>
                                <div class="amount moneyGet"><span class="rssymbol">₹</span>${element.amount}</div>
                                <button class="fas fa-edit fa-2xl" onclick="edit(this)"></button>
                             </div>
                         </div>`
            }else if(element.amount<0){
                message =`<div class='element_feature '>
                            <span class='hide'>${element.id}</span>
                            <div>
                                <div class="dateTime">${formattedDate}</div>
                                <div class="label">${element.remark}</div>
                            </div>
                            <div class='feature-button'>
                            <div class="amount moneyGot"><span class="rssymbol">₹</span>${-1*element.amount}</div>
                            <button class="fas fa-edit fa-2xl" onclick="edit(this)"></button>
                            </div>
                         </div>`
            }else{
                message =`<div class='element_feature'>
                            <span class='hide'>${element.id}</span>
                            <div>
                                <div class="dateTime">${formattedDate}</div>
                                <div class="label">${element.remark}</div>
                            </div>
                            <div class='feature-button'>
                                <div class="amount"><span class="rssymbol">₹</span>${element.amount}</div>
                                <button class="fas fa-edit fa-2xl" onclick="edit(this)"></button>
                             </div>
                         </div>`
            }
            document.getElementById('Entry').insertAdjacentHTML("afterbegin",message)
        });
        document.getElementById('Entry').insertAdjacentHTML("beforeend",`<div class='dummy'></div>`)
        // 
        if(compines[index].total>0){
            document.getElementById('result').innerHTML=`<h2>Totel Credit</h2> <h2 class="moneyGet"><span class="rssymbol">₹</span>${compines[index].total}</h2>`
        }else if(compines[index].total<0){
            document.getElementById('result').innerHTML=`<h2>Totel Debit</h2> <h2 class="moneyGot"><span class="rssymbol">₹</span>${-1*compines[index].total}</h2>`
        }else{
            document.getElementById('result').innerHTML=`<h2>Settled Up <i class="fa-solid fa-square-check" style="color: #59CE8F;"></i></i></h2>`
        }
        removeEntry()
    }
    prioritySort(index)
    localStorage.setItem('allData', JSON.stringify(compines))
    localStorage.setItem('mode',JSON.stringify(mode))
    localStorage.setItem('current',JSON.stringify(current))
    document.getElementById('remark').value=''
    document.getElementById('amount').value=''
     if(state=='edit'){
        removeEntry()
        loadEntry()
        hideCompiney()
        setelmentMode()
        document.getElementById('setelment').classList.remove('hide')
        //  location.reload()
    }

}
function home(){
    mode=0
    localStorage.setItem('mode',JSON.stringify(mode))
    loadHome()
    
    removeEntry()
    registerMode()
    
}
function edit(data){
    document.getElementById('specialRemove').classList.remove('hide')
    referance=data
    let id=data.parentElement.parentElement.querySelector('span').innerHTML
    editElement=compines.filter(x=>x.name==current)[0].entry.filter(x=>x.id==id)[0]
    addEntry('edit')
    
      
}
function userEdit(data){
    regStatus=0
    document.getElementById('setelment').classList.add('hide')
    document.getElementById('compines').classList.add('hide')
    document.getElementById('enterCompiny').classList.add("EnterCom")
    document.getElementById('enterCompiny').classList.remove("hide")
    document.getElementById('regster').classList.add("showRegister")
    document.getElementById('regster').classList.remove("hide")
    document.getElementById('but').classList.add("hide")
    editElement=data.parentElement.parentElement.querySelector('h2').innerHTML
    document.getElementById('sum').classList.add('hide')
    document.getElementById('compinyName').value=editElement
    
    
}
function userEditing(){
    let i=compines.map(x=>x.name).indexOf(editElement)
    // console.log(compines.map(x=>x.name).indexOf(document.getElementById('compinyName').value))
    
    if(compines.map(x=>x.name).indexOf(document.getElementById('compinyName').value.trim())<=-1){
        current=document.getElementById('compinyName').value
        document.getElementById('comp').innerHTML=current
        compines[i].name=current
        prioritySort(i)
        localStorage.setItem('allData', JSON.stringify(compines))
        localStorage.setItem('current',JSON.stringify(current)) 

    }else{
        alert(`${document.getElementById('compinyName').value} Alredy Exist`)
    }  
    document.getElementById('compinyName').value=''
    document.getElementById('setelment').classList.remove('hide')
    document.getElementById('compines').classList.remove('hide')
    document.getElementById('enterCompiny').classList.remove("EnterCom")
    document.getElementById('enterCompiny').classList.add("hide")
    document.getElementById('regster').classList.remove("showRegister")
    document.getElementById('regster').classList.add("hide")
    document.getElementById('but').classList.remove("hide")
    document.getElementById('sum').classList.remove('hide')
    regStatus=1   
}
function remove(data){
    let c=data.parentElement.parentElement.querySelector('h2').innerHTML
    compines.splice(compines.map(x=>x.name).indexOf(c),1)
    mode=0
    regStatus =1
    localStorage.setItem('allData', JSON.stringify(compines))
    localStorage.setItem('mode',JSON.stringify(mode))
    location.reload();
    
}
function removeElement(){
    let i=compines.map(x=>x.name).indexOf(current)
    let j=compines[i].entry.map(x=>x.id).indexOf(editElement.id)
    compines[i].total-=compines[i].entry[j].amount
    compines[i].entry.splice(j,1)
    //  console.log(compines[i])
    // console.log(.removeChild(referance.parentElement.parentElement))
    if(compines[i].total>0){
        document.getElementById('result').innerHTML=`<h2>Totel Credit</h2> <h2 class="moneyGet"><span class="rssymbol">₹</span>${compines[i].total}</h2>`
    }else if(compines[i].total<0){
        document.getElementById('result').innerHTML=`<h2>Totel Debit</h2> <h2 class="moneyGot"><span class="rssymbol">₹</span>${-1*compines[i].total}</h2>`
    }else{
        document.getElementById('result').innerHTML=`<h2>Settled Up <i class="fa-solid fa-square-check" style="color: #59CE8F;"></i></i></h2>`
    }
    referance.parentElement.parentElement.parentElement.removeChild(referance.parentElement.parentElement)
    localStorage.setItem('allData', JSON.stringify(compines))
    document.getElementById('specialRemove').classList.add('hide')
    removeEntry()
}
function findUniqu(list){
    console.log(list)
    console.log(Math.max(...list)+1)
    return Math.max(...list)+1
}
function prioritySort(index){
   
    let temp=compines[index]
    for(let i=index;i<compines.length-1;i++){
        // compines[i]=compines[i-1]
        compines[i]=compines[i+1]
        // console.log(compines[i].name)
    }
    compines[compines.length-1]=temp
    // console.log('after')
    // console.log(compines)

}