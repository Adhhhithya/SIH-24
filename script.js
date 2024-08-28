function changeForm(){
    const box = document.querySelector(".signup");
    const change=document.querySelector(".btn");
    console.log(box.style);
    change.addEventListener('click',()=>{
        box.style.opacity=1;
    })
}