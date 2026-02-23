---
title: "fast.ai Chapter 2 reflections"
date: 2022-09-15
---

Just completed [Chapter 2](https://github.com/fastai/fastbook/blob/master/02_production.ipynb) of the fastbook, which is about deploying models to production. Here are some of my answers on the questionnaire.

**Provide an example of where the bear classification model might work poorly in production, due to structural or style differences in the training data.**

Your training data might be wildlife photos which have gone through a filter for aesthetics, whereas if you deploy it as a bear detector for wildlife cams, the quality might be very different. Wildlife cams photos are lower-res and usually have poorer lighting conditions.

**Where do text models currently have a major deficiency?**

They're far better at generating convincing answers rather than accurate ones. In my eyeball tests with GPT-3, it frequently generates factually inaccurate answers with a lot of style and confidence, just like some people I know.

**What are possible negative societal implications of text generation models?**

Spam, scams, PR stunts, misinformation.

**In situations where a model might make mistakes, and those mistakes could be harmful, what is a good alternative to automating a process?**

Break it up into stages of rollout, with the 1st one being deployment of the model alongside human judgement, and use it as a decision-support system. The 2nd is partial rollout on a subset of the problem domain. The 3rd is that you can first backtest it with past data and simulate the results, with a threshold to pass before entering production.

**What kind of tabular data is deep learning particularly good at?**

Data wiht high-cardinality categorical columns - a large number of categories. Also with variety of data containing natural language like reviews.

**What's a key downside of directly using a deep learning model for recommendation systems?**

Explainability is low? Also more for recommending users what they are likely to purchase instead of what they need.

**What are the steps of the Drivetrain Approach?**

First define the outcome to achieve, the levers to pull, data you can acquire and the best model to use.

**How do the steps of the Drivetrain Approach map to a recommendation system?**

The outcome to achieve is to have a high acceptance rates in recommendations. Levers to pull is the items to recommend and their ranking. Data you can acquire is selection choices from users historically. Model might be collaborative filtering.

**What is `DataLoaders`?**

DataLoaders are abstractions for ingesting, labelling, transforming and splitting data before feeding them into the model.

**What four things do we need to tell fastai to create `DataLoaders`?**

1. Where to get the data from
2. How to split them into training and validation data set
3. How to label them
4. How to transform the data

**What does the `splitter` parameter to `DataBlock` do?**

It determines how the data is split into validation and training data set.

**How do we ensure a random split always gives the same validation set?**

Use the same seed.

**What letters are often used to signify the independent and dependent variables?**

x - independent

y - dependent

**What's the difference between the crop, pad, and squish resize approaches? When might you choose one over the others?**

Crop cuts out a smaller part, standard size of the image.

Pad resizes the image to a certain size, while retaining the dimensions, and then adds black or white space around the image.

Squish keeps all the image data intact, but will change the dimensions to fit within a certain size.

I think can use crop if the subject doesn't take up a big part of the image.

**What is data augmentation? Why is it needed?**

This is applying various modifications to the data. For images, it's things like switching up the hues, brightness changes, contrast changes, perspective warping, rotation, flipping. It's needed for modifying the training data so the model learns to recognise the subjects in different kinds of images. It adds more variation on top of the same data set.

**What is the difference between `item_tfms` and `batch_tfms`?**

`batch_tfms` applies the transformations in parallel to the whole batch using the GPU.

**What is a confusion matrix?**

It is a matrix of predictions against ground truth labels that shows the precision and recall of the model.

**What does `export` save?**

It saves the architecture and the trained parameters.

**What is it called when we use a model for getting predictions, instead of training?**

Inference.

**What are IPython widgets?**

These are GUI elements created in interactive python notebooks. It combines JavaScript and Python functionality in a web browser.

**When might you want to use CPU for deployment? When might GPU be better?**

Most use cases only require CPU because CPU is cheaper and easier to reason about. GPU is useful if you need to run massively parallel operations to save time, and the time savings is worth the additional cost of running GPU hardware and combining the parallel operations.

**What are the downsides of deploying your app to a server, instead of to a client (or edge) device such as a phone or PC?**

There is network latency and consumes network bandwidth. You also have to manage the servers.

**What are three examples of problems that could occur when rolling out a bear warning system in practice?**

1. The training data was using aesthetically filtered and clear photos uploaded online, whereas real-life wildllife photos might be a lot lower-light, and more obscured.
2. Video instead of images
3. Nighttime instead of daylight
4. Resolution differences
5. Speed might be too slow for usefulness

**What is "out-of-domain data"?**

Data that sits outside the type of data in the training set.

**What is "domain shift"?**

The type of data changing over time.

**What are the three steps in the deployment process?**

1. Manual process
2. Limited scope development
3. Gradual expansion