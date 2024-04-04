document.addEventListener('DOMContentLoaded', function() {
    const threadList = document.getElementById('thread-list');
    const newThreadForm = document.getElementById('new-thread-form');

    newThreadForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('thread-title').value;
        const content = document.getElementById('thread-content').value;
        const newThread = createThread(title, content);
        newThreadForm.insertAdjacentElement('afterend', newThread); // Insert the new thread after the form
        newThreadForm.reset();
    });

    function createThread(title, content) {
        const thread = document.createElement('div');
        thread.classList.add('thread');
        thread.innerHTML = `
            <h3><i class="fas fa-comments"></i> ${title}</h3>
            <p>${content}</p>
            <button class="reply-btn"><i class="fas fa-reply"></i> Reply</button>
            <div class="comments"></div>
        `;

        const replyBtn = thread.querySelector('.reply-btn');
        replyBtn.addEventListener('click', function() {
            const commentTextBox = document.createElement('input');
            commentTextBox.setAttribute('type', 'text');
            commentTextBox.setAttribute('placeholder', 'Enter your comment');
            commentTextBox.style.marginTop = '10px'; // Apply margin top
            const submitBtn = document.createElement('button');
            submitBtn.textContent = 'Submit';
            submitBtn.addEventListener('click', function() {
                const comment = commentTextBox.value.trim();
                if (comment !== '') {
                    addComment(thread, comment);
                    commentTextBox.remove();
                    submitBtn.remove();
                }
            });
            thread.appendChild(commentTextBox);
            thread.appendChild(submitBtn);
        });

        return thread; // Return the created thread
    }

    function addComment(thread, comment) {
        const commentsSection = thread.querySelector('.comments');
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<i class="fas fa-comment"></i> ${comment}`;
        commentsSection.appendChild(commentDiv);
    }
});
