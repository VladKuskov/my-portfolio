import { blogPosts } from './blogPosts.js';
let isViewingFullPost = false;
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('section');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
  
      // Show/hide sections
      sections.forEach(section => {
        section.classList.toggle('active', section.id === targetId);
      });
  
      // Toggle active class on buttons
      navButtons.forEach(btn => {
        btn.classList.toggle('active', btn === button);
      });
      
      // If Blog section is activated, render the blog post list
    if (targetId === 'blog-section' && !isViewingFullPost) {
        renderBlogList();
      }
      
    });
  });

  //When the page loads, highlight the Home nav button
document.addEventListener('DOMContentLoaded', () => {
    navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-target') === 'home-section');
    });
  });

  function renderBlogList() {
    isViewingFullPost = false;
    const blogSection = document.getElementById('blog-section');
    
    // Clear existing content except header
    blogSection.innerHTML = `
  <h1>Writing</h1>
  <p id="writing-intro">This section isn’t loud, but it’s honest. If you’re here,
   I already like you. If you’re the type to read the writing tab of a site, odds are you’ll find something worth staying for.</p>
`;
    
    blogPosts.forEach(post => {
      const postCard = document.createElement('div');
      postCard.className = 'post-card';
      
      postCard.innerHTML = `
        <h2 class="post-title">${post.title}</h2>
        <small class="post-date">${post.date}</small>
        <p class="post-excerpt">${post.excerpt}</p>
      `;
      
      postCard.addEventListener('click', () => {
        renderFullPost(blogPosts.indexOf(post));
      });
      
      blogSection.appendChild(postCard);
    });
  }

  function renderFullPost(index) {
    isViewingFullPost = true;
    const post = blogPosts[index];
    const blogSection = document.getElementById('blog-section');
  
    blogSection.innerHTML = `
  <h1>Writing</h1>
  <button id="back-to-list" class="nav-btn">← Back to Writing</button>
  <article>
    <h2>${post.title}</h2>
    <small>${post.date}</small>
    <div class="post-content">${post.content}</div>
  </article>
  <div id="post-nav">
    <button id="prev-post" class="nav-btn"${index === 0 ? ' disabled' : ''}>← Previous</button>
    <button id="next-post" class="nav-btn"${index === blogPosts.length - 1 ? ' disabled' : ''}>Next →</button>
  </div>
`;
  
    document.getElementById('back-to-list').addEventListener('click', () => {
      renderBlogList();
    });
  
    if (index > 0) {
      document.getElementById('prev-post').addEventListener('click', () => {
        renderFullPost(index - 1);
      });
    }
  
    if (index < blogPosts.length - 1) {
      document.getElementById('next-post').addEventListener('click', () => {
        renderFullPost(index + 1);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderBlogList();
    
    // Also highlight Home nav button
    navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-target') === 'home-section');
    });
  });