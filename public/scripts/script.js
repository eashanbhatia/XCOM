// const post = require("../../model/post");

let mainContainer = document.querySelector('.container');
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

// JavaScript to handle comment modal display
function openCommentModal(postId) {
    const commentModal = document.getElementById(`commentModal${postId}`);
    commentModal.style.display = 'block';
}

function closeCommentModal(postId) {
    const commentModal = document.getElementById(`commentModal${postId}`);
    commentModal.style.display = 'none';
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}

// async function getPostComment(pid) {
//     console.log("script ki id:", pid);

//     try {
//         const response = await fetch(`http://localhost:4444/getPostComment?pid=${pid}`, {
//             method: "GET",
//             mode: "cors",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log(result);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

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
            else if (result.data === 'dec') {
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
    await fetch('http://localhost:4444/addSave', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ postId: pid }),   //Yaha se pid bhej rhe hai(PostId) aur controller mein receive kr rhe hai in req.body
    })
        .then(r => {
            console.log("r hai ye:", r)
        }).then(result => {
            console.log("result hai ye:", result)
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

/*
let page = 2; // Start with the next page to load

    function loadMorePosts() {
        // Assuming jQuery for simplicity, you can use vanilla JavaScript as well
        $.ajax({
            url: `/homepage?page=${page}`,
            method: 'GET',
            success: function (data) {
                // Append the new posts to the postsContainer
                $('#postsContainer').append(data);
                page++;
            },
            error: function (error) {
                console.error("Error loading more posts:", error);
            }
        });
    }

    // Implement a scroll event listener
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() >= $('#postsContainer').height() - 100) {
            // Load more posts when the user is near the bottom of the page
            loadMorePosts();
        }
    });

    // Load more posts initially (optional)
    // loadMorePosts();


    */


// loader logic

document.getElementById('yourForm').addEventListener('submit', function (event) {
    // Show loader
    document.getElementById('loader').classList.remove('hidden');

    // Optionally, you can disable form elements during submission
    // Disable form elements: this disables the whole form
    // Array.from(this.elements).forEach(element => element.disabled = true);

    // You can also disable specific elements if needed
    // document.getElementById('submitButton').disabled = true;

    // Perform form submission (either using AJAX/fetch or let the normal form submission happen)
    // ...

    // For demonstration purposes, use setTimeout to simulate form submission
    setTimeout(function () {
        // Hide loader
        document.getElementById('loader').classList.add('hidden');

        // Optionally, enable form elements after submission
        // Array.from(event.target.elements).forEach(element => element.disabled = false);

        // You can also enable specific elements if needed
        // document.getElementById('submitButton').disabled = false;
    }, 3000); // Replace 3000 with the actual time it takes for your form submission
});