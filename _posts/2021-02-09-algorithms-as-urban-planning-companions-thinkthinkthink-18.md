---
title: "Algorithms as Urban Planning Companions | thinkthinkthink #18"
subtitle: How to start employing the fascinating innovations in Machine Learning
  to plan better cities.
date: 2021-02-09T21:46:29.112Z
thumb_img_path: /images/terrain_0.gif
excerpt: How to start employing the fascinating innovations in Machine Learning
  to plan better cities.
layout: post
---
<!--StartFragment-->

> *An amateur incursion on how data science and machine learning can augment our understanding of cities. This issue is 937 words long & it should take 3.5 minutes to read through; hope you enjoy it!*

<!--EndFragment-->

- - -

<!--StartFragment-->

A couple of decades ago I was obsessed with [Folding@home](https://foldingathome.org/), a distributed network effort that used the down-time of computers around the world to simulate and model the dynamics of proteins in search of novel medicines and therapeutics. Recently Deepmind’s [AlphaFold](https://deepmind.com/blog/article/AlphaFold-Using-AI-for-scientific-discovery) has solved an important element of protein dynamics through Artificial Intelligence. Simply put the algorithm is able to predict the structure of proteins to a level of precision usually achieved through costly and time-consuming experimental techniques.

Artificial Intelligence and Machine Learning are slowly popping up in most fields of human interest. Until recently I felt like understanding and employing these technologies was well beyond the ability of non-technical folks. Last year however I spent a month dabbling with [Coursera’s IBM Data Science Professional Certificate](https://www.coursera.org/professional-certificates/ibm-data-science), a set of self-paced courses which cover the basics of machine learning, data analysis and visualization. I was immediately struck by the fact that you don’t have to understand everything in order to use these powerful algorithms.

Most scientists who had access to a computer in the 60s probably understood almost everything that was going on under the hood. This has not been the case for decades - today most of us employ computers in our daily life, learn to use complex software and at the same time have little to no understanding of what’s physically going on behind the monitor. The same level of abstraction is slowly becoming true for Machine Learning. **I think the challenge for urban professionals - and most professionals dealing with complex issues - is to conceptually understand relevant algorithms and apply them to specific knowledge-domains.** The advent of [no-code](https://en.wikipedia.org/wiki/No-code_development_platform) will quickly remove the already-low barrier to entry in employing these tools in our daily workflows.

As an example, I recently came across a simple algorithm that can work wonders in clarifying relationships and clustering urban data in groups. [K-Modes takes categorical data as its input and clusters them in groups with similar features.](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.15.4028&rep=rep1&type=pdf) This is easier to understand on data that has two or three features (or dimensions). The following images show how the results of clustering algorithms look like in two and three dimensions.

[![](https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F87b79cc8-72d2-4d9e-a16d-d93b557491c4_943x484.png)](https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F87b79cc8-72d2-4d9e-a16d-d93b557491c4_943x484.png)

Low dimensions make it easy to visually understand that the algorithm has grouped similar variables together in clusters. The power of K-Modes however if that it can work for a larger number of dimensions. It is physically impossible for us to visualize more than three dimensions: similar to how we understand the rules driving the shape of a four-dimensional cube ([a hypercube](https://en.wikipedia.org/wiki/Hypercube)) even though we cannot “see” it. Mathematically the algorithm would go through an identical process to the one we can visualize but for more dimensions; it would then cluster data based on their similarity and dissimilarity. **The output would be buckets of data that are related to one another across their features. It would then fall upon the professional to label and give meaning to clusters by looking at the correlated features of each group.**

As an example imagine having a database of businesses in your city with a thirty or more of variables: number of employees, type of business, yearly turnover, neighborhood location etc. If you want to design an outreach campaign to clarify a new fiscal policy, it might be much more impactful if you could segment and group them in 10 or 15 clusters with similar kinds of businesses - not just their size, or location - but a more complex segmentation based upon all of the available variables. Think of the potential to better understand neighborhoods, social issues across the city, land value changes and so on. This extremely complex exercise is rendered by writing just two lines of code in [Python](https://www.python.org/). The [complicated equations](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.15.4028&rep=rep1&type=pdf) are already coded in a [free module](https://pypi.org/project/kmodes/) that you can import into your [programming notebook](https://colab.research.google.com/). Most of the technical difficulties have already been removed.

> `kmodes = KModes(n_clusters=cost, verbose=2, max_iter=100)
> clusters = kmodes.fit_predict(mark_array)`

When one thinks of algorithms and urban planning we typically imagine computers doing the crunching and spitting out the plan. **That might be the case in the future, but for now they can serve as complex calculators; tools that can help us better understand the intricacies and subtleties of our cities.**

<!--EndFragment-->

- - -

Did you like this issue of [thinkthinkthink](https://thinkthinkthink.substack.com/)? Consider sharing it with your network: [Share](https://thinkthinkthink.substack.com/p/algorithms-as-urban-planning-companions)

- - -

#### **📚 One Book**

<!--StartFragment-->

[The Lives of a Cell](https://www.goodreads.com/book/show/294368.The_Lives_of_a_Cell) by [Lewis Thomas](https://en.wikipedia.org/wiki/Lewis_Thomas)

The Lives of a Cell is one of these uniquely ephemeral books where you can't but feel sheer excitement at what's coming for you in that next sentence. You often have to stop and think of the fact that a human mind has come up with such a brilliant, fun and complex combination of words to make you smile, mid-read. **Some ideas are of course outdated - it is a 46 year old book after all - but the ability of Lewis' writing to make science exciting, and biology just plain fun, is unrivalled.**

<!--EndFragment-->

#### **📝 Three Links**

[Improve the News](https://www.improvethenews.org/) by [Max Tegmark et al.](https://twitter.com/tegmark)\
*Wielding “the algorithm” against the bubble.*

[Illuminated Equations](https://agilescientific.com/blog/2021/1/14/illuminated-equations) by [Matt Hall](https://twitter.com/kwinkunks)\
*Employing design to simplify the understanding of complicated equations.*

[The complex grid](http://emergenturbanism.com/2009/02/16/the-complex-grid/) by [Mathieu Hélie](https://twitter.com/mathieuhelie?lang=en)\
*On scaling the urban grid by breaking free of its arbitrary simplicity.*

#### **🐤 Five Tweets**

<!--StartFragment-->

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">CEO of the city<br><br>In a remote world, talent is mobile. Mayors no longer need to run for higher office — they can level up just by recruiting talent to their city. On the other hand, they can also \*lose\* talent if the city doesn’t perform.<br><br>More upside and downside than before.</p>&mdash; balajis.com (@balajis) <a href="https://twitter.com/balajis/status/1350491203897159680?ref_src=twsrc%5Etfw">January 16, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<!--EndFragment--><!--StartFragment-->

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I made some gifs of various types of fitness landscape for my speculation for the evolution of gene, society, design, and software. <a href="https://t.co/cFqb5cYfcL">https://t.co/cFqb5cYfcL</a> (CC-0) <a href="https://t.co/V4sCSVKdad">pic.twitter.com/V4sCSVKdad</a></p>&mdash; Baku 麦 (@_baku89) <a href="https://twitter.com/_baku89/status/1348141856400396288?ref_src=twsrc%5Etfw">January 10, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<!--EndFragment--><!--StartFragment-->

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Don’t ever let anyone tell you that streets can’t be vibrant places to foster friendships &amp; connect with neighbours. But as Donald Appleyard illustrated decades ago, the volume &amp; speed of traffic, &amp; the overall design of the streets, are social life dealbreakers. <a href="https://twitter.com/hashtag/StickyStreets?src=hash&amp;ref_src=twsrc%5Etfw">#StickyStreets</a> <a href="https://t.co/Spkgw9vzXF">pic.twitter.com/Spkgw9vzXF</a></p>&mdash; Brent Toderian (@BrentToderian) <a href="https://twitter.com/BrentToderian/status/1349930306971713541?ref_src=twsrc%5Etfw">January 15, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<!--EndFragment--><!--StartFragment-->

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">When ride sharing companies enter a new market vehicle ownership increases, traffic increases, transit use decreases. Not a good look, as they say. <a href="https://t.co/wodfWCNvWi">https://t.co/wodfWCNvWi</a></p>&mdash; Wrath Of Gnon (@wrathofgnon) <a href="https://twitter.com/wrathofgnon/status/1349679271812337665?ref_src=twsrc%5Etfw">January 14, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<!--EndFragment--><!--StartFragment-->

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">The fastest trajectory is not always the shortest. <a href="https://t.co/gxP7SfeCaW">pic.twitter.com/gxP7SfeCaW</a></p>&mdash; Maxim Leyzerovich (@round) <a href="https://twitter.com/round/status/1348788536971915264?ref_src=twsrc%5Etfw">January 12, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<!--EndFragment-->

- - -

This was the eighteenth issue of [thinkthinkthink](https://thinkthinkthink.substack.com/) - a periodic newsletter by [Joni Baboci](https://joni.baboci.net/) on cities, science and complexity. If you really liked it why not subscribe?

<iframe src="https://thinkthinkthink.substack.com/embed" width="100%" height="200" style="border:0px solid #EEE; background:white;" frameborder="0" scrolling="no"></iframe>