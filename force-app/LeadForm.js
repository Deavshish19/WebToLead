function beforeSubmit(){
    let inputDate = document.querySelector(".inputDate");
    let outputDate = document.querySelector(".outputDate");
    console.log("inputDate", inputDate.value);

    let formattedDate = new Date(inputDate.value).toLocaleDateString("en-In");
    outputDate.value = formattedDate;
}

