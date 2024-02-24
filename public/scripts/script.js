// const post = require("../../model/post");

let Container = document.querySelector('.main-container');
// let hackPosts = require('../../model/post')
Container.addEventListener('click', (ev) => {
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
        body: JSON.stringify({ postId: pid  }),
    })
        .then(r => {
            console.log(r)
        })
}


function addComment(pid) {
    // console.log(pid)
    fetch('http://localhost:4444/addComment',{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ postId: pid }),
    })
    .then(r => {
        console.log("r hai ye:",r)
    })
}

function addSave(pid) {
    // console.log(pid)
    fetch('http://localhost:4444/addSave',{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ postId: pid }),   //Yaha se pid bhej rhe hai(PostId) aur controller mein receive kr rhe hai in req.body
    })
    .then(r => {
        console.log("r hai ye:",r)
    })
}