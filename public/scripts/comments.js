const loadCommentsButtonElement = document.getElementById("load-comments-btn");

async function loadComments(){
    const postId = loadCommentsButtonElement.dataset.postid;
    console.log(postId);
    const response = await fetch(`/posts/${postId}/comments`);
    // const responseData = await response.json();

    // console.log(responseData);
}
loadCommentsButtonElement.addEventListener('click', loadComments);