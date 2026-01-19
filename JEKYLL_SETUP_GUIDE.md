# Jekyll Integration Guide for Your Portfolio

This guide explains how to integrate Jekyll with your existing portfolio website to enable easy blog post management.

## What is Jekyll?

Jekyll is a static site generator that GitHub Pages supports natively. It allows you to:
- Write blog posts in Markdown
- Use templates and layouts
- Automatically generate blog pages
- Manage content without writing HTML

## Current Setup

Your portfolio currently has:
- ✅ Static HTML blog posts in `/blog/` directory
- ✅ Jekyll configuration (`_config.yml`)
- ✅ Jekyll post layout (`_layouts/post.html`)
- ✅ Example Jekyll post (`_posts/2026-01-20-neural-network-optimization.md`)

## File Structure

```
LamichhaneKamal.github.io/
├── _config.yml                 # Jekyll configuration
├── _layouts/
│   └── post.html              # Blog post template
├── _posts/                    # Jekyll blog posts (Markdown)
│   └── 2026-01-20-neural-network-optimization.md
├── blog/                      # Static HTML blog posts
│   ├── generative-ai-future.html
│   ├── edge-ai-optimization.html
│   └── transformer-models.html
├── index.html                 # Main portfolio page
├── modern-style.css
└── modern-script.js
```

## How to Create New Blog Posts

### Method 1: Jekyll Markdown Posts (Recommended)

1. **Create a new file** in `_posts/` directory
2. **Name format**: `YYYY-MM-DD-title-slug.md`
3. **Add front matter** at the top:

```markdown
---
layout: post
title: "Your Blog Post Title"
date: 2026-01-25
category: AI/ML
read_time: 10
author: Kamal Lamichhane
tags: [AI, Machine Learning, Deep Learning]
---

Your content here in Markdown...

## Section 1

Content...

### Subsection

More content...
```

### Method 2: Static HTML Posts (Current Method)

Continue creating HTML files in `/blog/` directory like you have been doing.

## Jekyll Post Front Matter Explained

```yaml
---
layout: post              # Uses _layouts/post.html template
title: "Post Title"       # Displayed as H1
date: 2026-01-25         # Publication date
category: AI/ML          # Main category
read_time: 10            # Reading time in minutes
author: Kamal Lamichhane # Author name
tags: [Tag1, Tag2]       # Array of tags
---
```

## Markdown Syntax Quick Reference

```markdown
# H1 Heading
## H2 Heading
### H3 Heading

**Bold text**
*Italic text*

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

[Link text](https://example.com)

![Image alt text](image-url.jpg)

`inline code`

```python
# Code block
def hello():
    print("Hello, World!")
```

> Blockquote text

| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

## Updating Your Main Blog Section

To display Jekyll posts on your main page, you have two options:

### Option 1: Manual Updates (Current Method)

Continue manually adding blog cards to `index.html` as you've been doing.

### Option 2: Dynamic Jekyll Integration

Modify your `index.html` to dynamically load Jekyll posts:

```html
<!-- Blog Section -->
<section id="blog" class="section blog-section">
    <div class="container">
        <div class="section-header">
            <span class="section-tag">Technical Insights</span>
            <h2 class="section-title">Blog & <span class="gradient-text">Articles</span></h2>
        </div>
        <div class="blog-grid" style="grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
            {% for post in site.posts limit:6 %}
            <div class="blog-card {% if forloop.first %}featured{% endif %}">
                <div class="blog-image">
                    <img src="{{ post.image | default: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&q=80' }}" alt="{{ post.title }}">
                    <div class="blog-overlay">
                        <div class="blog-badge">{{ post.category | default: 'Article' }}</div>
                    </div>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span><i class="fas fa-calendar"></i> {{ post.date | date: "%B %d, %Y" }}</span>
                        <span><i class="fas fa-clock"></i> {{ post.read_time | default: 5 }} min read</span>
                        <span><i class="fas fa-tag"></i> {{ post.category }}</span>
                    </div>
                    <h3>{{ post.title }}</h3>
                    <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
                    <div class="tech-tags">
                        {% for tag in post.tags limit:4 %}
                        <span class="tag">{{ tag }}</span>
                        {% endfor %}
                    </div>
                    <a href="{{ post.url }}" class="read-more-btn">Read Full Article <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            {% endfor %}
        </div>
    </div>
</section>
```

## Testing Jekyll Locally

### Prerequisites

1. **Install Ruby** (if not already installed)
   - Windows: Download from [rubyinstaller.org](https://rubyinstaller.org/)
   - Mac: `brew install ruby`
   - Linux: `sudo apt-get install ruby-full`

2. **Install Jekyll and Bundler**
   ```bash
   gem install jekyll bundler
   ```

### Create Gemfile

Create a `Gemfile` in your project root:

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.3"
gem "webrick", "~> 1.8"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end
```

### Run Jekyll Locally

```bash
cd LamichhaneKamal.github.io
bundle install
bundle exec jekyll serve
```

Visit: `http://localhost:4000`

## Deploying to GitHub Pages

GitHub Pages automatically builds Jekyll sites. Just push your changes:

```bash
git add .
git commit -m "Add new blog post"
git push origin main
```

GitHub will automatically:
1. Detect Jekyll configuration
2. Build your site
3. Deploy to `https://lamichhanekamal.github.io`

## Best Practices

### 1. Post Naming Convention

Always use: `YYYY-MM-DD-title-slug.md`

Examples:
- `2026-01-25-deep-learning-basics.md`
- `2026-02-01-transformer-architecture.md`

### 2. Front Matter Consistency

Always include:
- `layout: post`
- `title`
- `date`
- `category`
- `tags`

### 3. Image Management

Store images in `/images/blog/` directory:

```markdown
![Description](/images/blog/my-image.jpg)
```

### 4. Code Blocks

Use syntax highlighting:

```markdown
```python
def example():
    return "Hello"
```
```

## Mixing Jekyll and Static HTML

You can use both approaches:

- **Jekyll Markdown**: For regular blog posts (easier to write)
- **Static HTML**: For special posts with custom layouts

Both will work together seamlessly!

## Common Issues & Solutions

### Issue 1: Posts Not Showing

**Solution**: Check file naming and front matter format

### Issue 2: Styling Not Applied

**Solution**: Ensure `modern-style.css` path is correct in layout

### Issue 3: Local Build Fails

**Solution**: Run `bundle update` and try again

## Example Workflow

1. **Write post** in Markdown:
   ```bash
   # Create new post
   touch _posts/2026-01-25-my-new-post.md
   ```

2. **Add front matter and content**

3. **Test locally**:
   ```bash
   bundle exec jekyll serve
   ```

4. **Push to GitHub**:
   ```bash
   git add _posts/2026-01-25-my-new-post.md
   git commit -m "Add new blog post"
   git push
   ```

5. **Wait 1-2 minutes** for GitHub Pages to build

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages + Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)
- [Markdown Guide](https://www.markdownguide.org/)
- [Liquid Template Language](https://shopify.github.io/liquid/)

## Summary

You now have two ways to create blog posts:

1. **Jekyll Markdown** (`.md` files in `_posts/`)
   - Easier to write
   - Automatic formatting
   - Template-based

2. **Static HTML** (`.html` files in `blog/`)
   - Full control
   - Custom layouts
   - Current method

Choose the method that works best for each post!
