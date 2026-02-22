---
layout: post
date:   2030-01-01 15:13:39 +1100
categories: jekyll update
title: All Posts Combined
---

{% for post in site.posts %}
  <h1>{{ post.title }}</h1>
  <div class="post-content">
    {{ post.content }}
  </div>
  <hr>
{% endfor %}