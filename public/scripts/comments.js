const loadCommentsButtonElement = document.getElementById("load-comments-btn");
const commentSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector("#comments-form form");
const commentTitleElement = document.getElementById('title');
const commentTextElement = document.getElementById('text');


function loadCommentList(comments){
    const commentList = document.createElement('ol');
    
    for (const comment of comments){
        const commentElement = document.createElement('li');
        commentElement.innerHTML = `
        <article class="comment-item">
        <h2>${comment.title}</h2>
        <p>${comment.text}</p>
        </article>
        `;
        commentList.appendChild(commentElement);
    }
    
    return commentList;
}

async function showComments(){
    const postId = loadCommentsButtonElement.dataset.postid;
    
    try {
        const response = await fetch(`/posts/${postId}/comments`);
    
        if ( !response.ok ) {
            return;
        }
    
        const responseData = await response.json();
        
        if ( responseData && responseData.length > 0 ) {
            const comments = loadCommentList(responseData);
            commentSectionElement.innerHTML = '';
            commentSectionElement.appendChild(comments);
        } else { 
            commentSectionElement.firstElementChild.textContent = 'There are no comments for this post, maybe start by adding one?';
        }
    } catch ( error ){
        alert ( 'Error fetchin comments' );
    }
}

async function submitCommentForm(event){
    event.preventDefault();
    const postId = loadCommentsButtonElement.dataset.postid;
    const commentTitle = commentTitleElement.value;
    const commentText = commentTextElement.value;  

    const comment = {title: commentTitle, text: commentText}

    try {
        const response = await fetch(`/posts/${postId}/comments`, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-type': 'application/json'
            }
        })
        console.log(response.ok);
        
        if (response.ok) {
            commentTitleElement.value = '';
            commentTextElement.value = ''; 
            showComments();
            console.log("ok");
        }else{
            console.log("not ok");
            alert ('Could not add comments - maybe try again later!');
        }
    } catch ( error ) {
        alert ('Could not send request');
    }
}

loadCommentsButtonElement.addEventListener('click', showComments);
commentsFormElement.addEventListener('submit', submitCommentForm);