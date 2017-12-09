---
layout: post
title: "Your First Post"
description: "Your First Post Description"
date: 2016-10-20 00:00:00 +0100
categories:
- modern
- setup
tags:
- posts
- layouts
- drafts
- build
- serve
- docs
- info
---

This post is stored in the `_posts` folder.

It uses a `post` layout, stored in the `_layouts` folder.

If the post was a draft, it would be stored in the `_drafts` folder.

When a post is edited, the site needs to be re-built in order to see the changes.

<!--more-->

To achieve this, run the following commands in a terminal window:

``` bash
# build the site
$ grunt build

# serve the site
$ grunt serve

# run the two commands above in one
$ grunt build-serve
```

To add a new post, create a file in the `_posts` folder that follows the naming convention:

`YYYY-MM-DD-name-of-post.md`

and contains the required front matter. As an example, you can take a look at this post.

For more information, visit the [Modern docs][modern-docs].

To file bugs/feature requests, visit [Modern's GitHub repository][modern-repo].

[modern-docs]: http://sergiu-tripon.com/modern-on-jekyll
[modern-repo]: https://github.com/SergiuTripon/modern-on-jekyll