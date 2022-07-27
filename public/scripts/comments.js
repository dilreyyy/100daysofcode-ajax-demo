const loadCommentsButtonElement = document.getElementById("load-comments-btn");
const commentSectionElement = document.getElementById("comments");

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
    const response = await fetch(`/posts/${postId}/comments`);
    const responseData = await response.json();

    // console.log(responseData);

    const comments = loadCommentList(responseData);
    commentSectionElement.innerHTML = '';
    commentSectionElement.appendChild(comments);
}
loadCommentsButtonElement.addEventListener('click', showComments);