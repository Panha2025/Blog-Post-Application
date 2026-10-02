
window.addEventListener("DOMContentLoaded", () => {
    const blogList = document.querySelector(".blog-list");

    let posts = [
        {
            title: "Welcome to My Blog",
            content: "This is my first blog post. I'm excited to share my thoughts and experiences with you all!"
        },
        {
            title: "Learn JavaScript",
            content: "JavaScript is a powerful programming language that enables interactive web development. Today I learned about event listeners and DOM manipulation."
        },
        {
            title: "Web Development Tips",
            content: "Always write clean and maintainable code. Use meaningful variable names and comment your code when necessary."
        }
    ];

    function displayPosts() {
        blogList.innerHTML = "";

        posts.forEach((post, index) => {
            const article = document.createElement("article");
            article.classList.add("blog-post");

            const title = document.createElement("h2");
            title.textContent = post.title;

            const editTitleButton = document.createElement("button");
            editTitleButton.type = "button";
            editTitleButton.textContent = "Edit Title";
            editTitleButton.dataset.action = "edit-title";

            const content = document.createElement("p");
            content.textContent = post.content;

            const editContentButton = document.createElement("button");
            editContentButton.type = "button";
            editContentButton.textContent = "Edit Content";
            editContentButton.dataset.action = "edit-content";

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.textContent = "Delete Post";
            deleteButton.dataset.action = "delete";

            article.append(
                title,
                editTitleButton,
                content,
                editContentButton,
                deleteButton
            );

            // Store the post position on its article element.
            article.dataset.index = index;

            blogList.appendChild(article);
        });
    }

    // Handle button clicks using the event object.
    document.addEventListener("click", function (event) {
        const button = event.target.closest("button");

        if (!button) {
            return;
        }

        const action = button.dataset.action;

        // Add a new blog post.
        if (action === "add") {
            const title = prompt("Enter blog title:");

            if (title === null || title.trim() === "") {
                return;
            }

            const content = prompt("Enter blog content:");

            if (content === null || content.trim() === "") {
                return;
            }

            posts.push({
                title: title.trim(),
                content: content.trim()
            });

            displayPosts();
            return;
        }

        // Find the post belonging to the clicked button.
        const article = button.closest(".blog-post");

        if (!article) {
            return;
        }

        const index = Number(article.dataset.index);

        // Edit the title.
        if (action === "edit-title") {
            const newTitle = prompt(
                "Edit blog title:",
                posts[index].title
            );

            if (newTitle === null || newTitle.trim() === "") {
                return;
            }

            posts[index].title = newTitle.trim();
            displayPosts();
        }

        // Edit the content.
        else if (action === "edit-content") {
            const newContent = prompt(
                "Edit blog content:",
                posts[index].content
            );

            if (newContent === null || newContent.trim() === "") {
                return;
            }

            posts[index].content = newContent.trim();
            displayPosts();
        }

        // Delete a post.
        else if (action === "delete") {
            const confirmed = confirm(
                "Are you sure you want to delete this post?"
            );

            if (confirmed) {
                posts.splice(index, 1);
                displayPosts();
            }
        }
    });

    // Display the initial blog posts.
    displayPosts();
});
