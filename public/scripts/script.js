// const post = require("../../model/post");

let mainContainer = document.querySelector('.main-container');
// let hackPosts = require('../../model/post')
mainContainer.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('love')) {

        let id = document.querySelector('#postid')
        // console.log(id)
        // console.log(ev.target.id)

    }
    else if (ev.target.classList.contains('comment')) {
        console.log("comment")
    }
    else if (ev.target.classList.contains('bookmark')) {
        console.log("bookmark")
    }
    else if (ev.target.classList.contains('retweet')) {
        console.log("retweet")
    }
});


function addLike(pid) {
    // console.log(pid)
    fetch('http://localhost:4444/addLike', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ postId: pid }),
    })
        .then(r => {

            return r.json()
        }).then(result => {
            console.log(result.data)
            // console.log()
            if (result.data === 'inc') {
                let a = document.getElementById(pid);
                // console.log("TEXT:",a.textContent)
                // console.log(a, a.innerText)
                // let b = Number(a.innerText)

                a.textContent = Number(a.textContent) + 1;
                // console.log(a.previousElementSibling)
                let b = a.previousElementSibling
                // console.log(b);
                b.classList.remove('fa-regular');
                b.classList.add('fa-solid');

            }
            else if(result.data === 'dec'){
                let a = document.getElementById(pid);
                // console.log(a, a.textContent)
                a.textContent = Number(a.textContent) - 1;
                let b = a.previousElementSibling
                b.classList.remove('fa-solid')
                b.classList.add('fa-regular')
            }
        })
}

async function addSave(pid) {
    console.log("pid:", pid)
   await fetch('http://localhost:4444/addSave',{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ postId: pid }),   //Yaha se pid bhej rhe hai(PostId) aur controller mein receive kr rhe hai in req.body
    })
    .then(r => {
        console.log("r hai ye:",r)
    }).then(result => {
        console.log("result hai ye:",result)
        // console.log()
//         if (result.data === 'inc') {
//             let a = document.getElementById(pid);
//             // console.log("TEXT:",a.textContent)
//             // console.log(a, a.innerText)
//             // let b = Number(a.innerText)

//             a.textContent = Number(a.textContent) + 1;
//             console.log(a.previousElementSibling)
//             let b = a.previousElementSibling
//             b.classList.remove('fa-regular');
//             b.classList.add('fa-solid');

//         }
//         else if(result.data === 'dec'){
//             let a = document.getElementById(pid);
//             // console.log(a, a.textContent)
//             a.textContent = Number(a.textContent) - 1;
//             let b = a.previousElementSibling
//             b.classList.remove('fa-solid')
//             b.classList.add('fa-regular')
//         }
})
}


// function addComment(pid) {
//     // console.log(pid)
//     fetch('http://localhost:4444/addComment', {
//         method: "POST",
//         mode: "cors",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ postId: pid }),
//     })
//         .then(r => {
//             console.log("r hai ye:", r)
//         })
// }

// function addSave(pid) {
//     // console.log(pid)
//     fetch('http://localhost:4444/addSave', {
//         method: "POST",
//         mode: "cors",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ postId: pid }),
//         //Yaha se pid bhej rhe hai(PostId) aur controller mein receive kr rhe hai in req.body
//     })
//         .then(r => {
//             console.log("r hai ye:", r)
//         })
// }