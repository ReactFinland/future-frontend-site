---
slug: 'how-we-optimized-ff-site'
title: 'How we optimized Future Frontend website'
description: 'Future Frontend website is fairly fast. Learn how we did it.'
date: 2024-02-21T12:00:00Z
keywords: ['future-frontend', 'performance']
author: 'Juho Vepsäläinen'
---

Given that the Future Frontend conference is oriented around future frontend technologies, it would be embarrassing to run the conference on a website that was not fast. The performance issue is relevant as the size of websites grew by close to 600\% over a decade, as shown by the study by [Web Almanac](https://almanac.httparchive.org/en/2022/page-weight). To make things worse, mobile usage of the web has grown, and these days, it amounts to over half of overall traffic, according to [Exploding Topics](https://explodingtopics.com/blog/mobile-internet-traffic). That means there are many good reasons to optimize the size and performance of your site.

In this brief article, I will go through the main techniques we applied to make the site fast, and hopefully, you can adopt some of the ideas in your daily work to make the web slightly less bloated.

## Lazy loading

If you head to the [site index](/), open your browser inspector (`Command-Option-J` for Mac users), and check out the `Network` tab, you can see that not a lot is going on. You should refresh the page to see the initial traffic. It gets more interesting when you scroll down the page, as the front page has many heavy elements, including videos and a map. Overall, the page is heavier than I would like, but at least this way, the initial experience is fast, even on mobile. To achieve this, I applied the following techniques:

* Lazy loading images - I set `loading="lazy"` on my `img` elements so the browser knows to load these lazily. Although the same should work for `iframe`, I could not make this work on my Chromium, so I went with another technique I will cover next. The vital caveat to know about `loading="lazy"` is that lazy loading is not applied if the user has disabled JavaScript, but that seems like a limitation that cannot be avoided.
* Lazy loading videos and the map - Given we host our videos on YouTube, it provides a simple `iframe` based integration. To load the videos lazily, I set up an [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) that triggers once and replaces the `src` attribute of the `iframe`s to load the videos. The same technique is used for the map, and I replace `src` with a `script` there instead. To save effort, I went with [Sidewind x-intersect](https://sidewind.js.org/sources/#x-intersect); although you can find the same idea in many other libraries, it is simple to implement yourself.

## Static site generation

The site follows [Jamstack](https://jamstack.org/) architecture, meaning its content has been decoupled from the layouts, which are bound together during a build process. We maintain a [GraphQL API](https://github.com/ReactFinland/graphql-api) for the conferences, which also served well for this case. The blog posts and some site content are still maintained at the site repository for convenience, as we don't need this information elsewhere. Any data used outside of the site goes behind the GraphQL API.

Earlier, I used [Antwar](https://antwar.js.org/), a React-based static site generation implementing interactive islands, but given the solution started to show its age, I wrote a new solution called [Gustwind](https://gustwind.js.org/). In short, it's a light framework with just enough opinions for building websites and perhaps applications, and it is my playground for unconventional ideas. For example, I combined HTML and Lisp for templating, which has been surprisingly fun to use.

The site is hosted [Cloudflare Pages](https://pages.cloudflare.com/), and I have found it a good host for this purpose. What makes the platform attractive to me is that you can implement your workers on it, meaning it is possible to add backend logic on the edge when needed. Furthermore, shaping traffic is possible, although I don't need it in this use case. Technically, that would allow the implementation of ideas like AB testing on top of the platform easily.

## Image optimization through Jampack

Given that images contribute significantly to a website's size, I went with [Divriots Jampack](https://jampack.divriots.com/) to optimize the site's images. The tool runs as a post-process against the compiled site, optimizes and converts images to the [WebP](https://developers.google.com/speed/webp) format that is well-supported these days and more optimal than earlier jpeg and png.

I would not use Jampack for a big site, but it is enough for something minor like this. For me, likely the ideal solution would be to push the images to a service like [Cloudflare Images](https://www.cloudflare.com/developer-platform/cloudflare-images/) or [Cloudinary](https://cloudinary.com/) as the services can produce optimized images on the fly with a minimal hassle. An option might be to leverage a library like [Sharp](https://sharp.pixelplumbing.com/) on the edge and then cache the results on an edge database to save on costs.

## Minimal amount of third-party dependencies

During development, I was aware of the project dependencies and tried to keep them minimal and to a minimum. For example, I discovered that [Tito](https://ti.to/home) widget is somewhat heavy and loaded it lazily initially. Later on, I pushed it to a page of its own to improve the site's usability and keep the landing page a notch shorter. The move also had tracking benefits, as I can see how many people check out our tickets.

## Leveraging lighter graphics

Initially, I used quite a heavy JPEG asset as a background for the site header. To optimize site speed further, I went initially with an SVG from [SVG Backgrounds](https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/) site, which allows you to generate a good-looking background quickly. To optimize further, I converted the gradient I found to pure CSS. In general, SVG patterns are a cheap way to add a visual touch to your website, and the technique can be combined with CSS effectively in many ways (masking, etc.).

## What could be done better

With optimization, there is always more work to be done. I can imagine at least the following further optimizations:

* Image sizes are not always optimal. For example, speaker images could be dimensioned better and this could be solved as I outlined above.
* Navigation could be more optimal. Right now, I rely on a classic Multi-Page Application (MPA) style where you refresh the entire page on navigation. It works here, given the pages are relatively small, but something like an application shell could be implemented at the cost of loading more JavaScript. It still might be worth a go.
* The map could use vector tiles instead of images. My understanding is that the mapping space is still evolving, and we might see something like this soon to eliminate wasteful map tiles with a lot of data.

## Conclusion

Although the website we maintain is somewhat small, it still took some effort to make it performant. A good framework can help in the effort, but it can be good to check out what the site looks like from the perspective of [PageSpeed Insights](https://pagespeed.web.dev/) as you might notice clear improvement points there.

The Future Frontend conference aims to foster discussion and awareness of topics like web performance, and we have many related sessions in store for you. [The next edition](/blog/ff24/) takes place 13-14.6 in Helsinki, Finland.
