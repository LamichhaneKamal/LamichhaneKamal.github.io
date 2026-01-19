# Dynamic Blog Section Guide

This guide explains how to make your blog section automatically display the latest 3 posts from Jekyll.

## Current Situation

Right now, you have:
- **Static HTML posts** in `/blog/` directory (manually added to index.html)
- **Jekyll posts** in `/_posts/` directory (not shown on homepage)

## The Solution

Convert your `index.html` to use Jekyll templating so it can automatically pull the latest posts.

## Option 1: Full Jekyll Integration (Recommended)

### Step 1: Rename index.html

```bash
# Backup current index.html
cp index.html index-static-backup.html

# Rename to use Jekyll
mv index.html index-jekyll.html
```

### Step 2: Add Jekyll Front Matter

Add this to the very top of your `index.html`:

```yaml
---
layout: none
---
```

### Step 3: Replace Blog Section

Find your blog section and replace it with this dynamic version:

```html
<!-- Blog Section -->
<section id="blog" class="section blog-section">
    <div class="container">
        <div class="section-header">
            <span class="section-tag">Technical Insights</span>
            <h2 class="section-title">Blog & <span class="gradient-text">Articles</span></h2>
        </div>
        <div class="blog-grid" style="grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
            
            {% assign post_count = 0 %}
            {% for post in site.posts limit:3 %}
            {% assign post_count = post_count | plus: 1 %}
            
            <div class="blog-card {% if post_count == 1 %}featured{% endif %}">
                <div class="blog-image">
                    {% if post.image %}
                    <img src="{{ post.image }}" alt="{{ post.title }}">
                    {% else %}
                    {% comment %}Default images based on category{% endcomment %}
                    {% if post.category contains 'Generative' or post.category contains 'AI' %}
                    <img src="https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&q=80" alt="{{ post.title }}">
                    {% elsif post.category contains 'Edge' or post.category contains 'Optimization' %}
                    <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80" alt="{{ post.title }}">
                    {% elsif post.category contains 'Transformer' or post.category contains 'Deep Learning' %}
                    <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80" alt="{{ post.title }}">
                    {% else %}
                    <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80" alt="{{ post.title }}">
                    {% endif %}
                    {% endif %}
                    <div class="blog-overlay">
                        <div class="blog-badge">{% if post_count == 1 %}Featured{% else %}{{ post.category | default: 'Article' }}{% endif %}</div>
                    </div>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span><i class="fas fa-calendar"></i> {{ post.date | date: "%B %d, %Y" }}</span>
                        <span><i class="fas fa-clock"></i> {{ post.read_time | default: 8 }} min read</span>
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

## How It Works

### Automatic Post Detection

The code `{% for post in site.posts limit:3 %}` automatically:
1. Finds all posts in `_posts/` directory
2. Sorts them by date (newest first)
3. Shows only the latest 3

### Dynamic Images

Images are selected based on post category:
- **Generative AI / AI** → AI neural network image
- **Edge / Optimization** → Edge computing image  
- **Transformer / Deep Learning** → Transformer architecture image
- **Default** → Generic AI image

You can override this by adding `image:` to post front matter:

```yaml
---
layout: post
title: "My Post"
date: 2026-01-25
category: AI/ML
image: "https://example.com/my-custom-image.jpg"
---
```

### Featured Badge

The first (most recent) post automatically gets the "Featured" badge.

## Converting Static HTML Posts to Jekyll

To include your existing HTML posts in the automatic listing, convert them to Jekyll posts:

### Example: Converting generative-ai-future.html

1. **Create new file**: `_posts/2026-01-19-generative-ai-future.md`

2. **Add front matter**:
```yaml
---
layout: post
title: "The Future of Generative AI: From LLMs to Multimodal Intelligence"
date: 2026-01-19
category: Generative AI
read_time: 12
tags: [LLMs, Transformers, Multimodal, Ethics]
image: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&q=80"
excerpt: "Exploring the evolution of generative AI from large language models to sophisticated multimodal systems."
---
```

3. **Add content in Markdown** (much easier than HTML!)

4. **Keep or delete** the HTML version in `/blog/`

## Testing Locally

```bash
# Install Jekyll if not already installed
gem install jekyll bundler

# Navigate to your project
cd LamichhaneKamal.github.io

# Serve locally
bundle exec jekyll serve

# Visit
http://localhost:4000
```

## Deploying to GitHub Pages

Just push your changes:

```bash
git add .
git commit -m "Add dynamic blog section"
git push origin main
```

GitHub Pages will automatically:
1. Detect Jekyll
2. Build your site
3. Deploy with dynamic blog section

## Benefits

✅ **Automatic Updates**: New posts appear automatically
✅ **Always Latest**: Shows 3 most recent posts
✅ **No Manual Editing**: No need to update index.html
✅ **Consistent Styling**: Uses same design for all posts
✅ **Easy Maintenance**: Just add posts to `_posts/`

## Customization Options

### Change Number of Posts

```liquid
{% for post in site.posts limit:5 %}  <!-- Show 5 instead of 3 -->
```

### Filter by Category

```liquid
{% for post in site.posts %}
  {% if post.category == 'AI/ML' %}
    <!-- Show only AI/ML posts -->
  {% endif %}
{% endfor %}
```

### Custom Sorting

```liquid
{% assign sorted_posts = site.posts | sort: 'read_time' %}
{% for post in sorted_posts limit:3 %}
  <!-- Sorted by read time -->
{% endfor %}
```

## Troubleshooting

### Posts Not Showing

**Check:**
1. File naming: `YYYY-MM-DD-title.md`
2. Front matter format
3. Date is not in future
4. Jekyll is building correctly

### Images Not Loading

**Check:**
1. Image URL is correct
2. Category name matches conditions
3. Default image URL is accessible

### Styling Issues

**Check:**
1. CSS classes match your stylesheet
2. Jekyll liquid tags are properly closed
3. No syntax errors in template

## Example Workflow

1. **Write new post**:
   ```bash
   touch _posts/2026-01-25-my-new-post.md
   ```

2. **Add content**:
   ```markdown
   ---
   layout: post
   title: "My New Post"
   date: 2026-01-25
   category: AI/ML
   read_time: 10
   tags: [AI, ML]
   ---
   
   Your content here...
   ```

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

5. **Done!** Post appears automatically on homepage

## Summary

With this setup:
- ✅ Latest 3 posts show automatically
- ✅ No manual index.html updates needed
- ✅ Consistent styling across all posts
- ✅ Easy to add new posts
- ✅ Works with GitHub Pages
- ✅ Keeps your existing static HTML posts

Choose between:
1. **Keep static HTML posts** in `/blog/` (manual updates)
2. **Convert to Jekyll posts** in `/_posts/` (automatic updates)
3. **Mix both** (some manual, some automatic)

The dynamic blog section will only show Jekyll posts from `/_posts/`, so you can gradually migrate your content!
