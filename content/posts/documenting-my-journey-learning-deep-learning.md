---
title: "Documenting my journey learning deep learning - Rough notes"
date: 2022-08-29
---

I'd been learning deep learning via fast.ai, going through their fastbook, on and off in the past 6 months. Here are some rough notes and observations.

**Chapter 1**

* I was wondering why there was a python process occupying my GPU memory even when no python program was running. Turns out pytorch keeps a portion of the memory allocated in cache. empty\_cache does as the tin says.
* The fast.ai library is really high-level! Which is great for a beginner, but I'll have to be sure to peel back the underlying mechanics down the road. eg. I'm not too sure how fine\_tune actually works under the hood
* Other than validation set, a good practice is to isolate an even more reserved subset of data called the test set, to avoid hyperparameters overfitting. Most suitable if you have a 3rd-party developing the model.
* In curating the validation set, maximise the chances of the model getting it wrong. A specific case of this is ensuring that your validation data set contains data that is very different from the training set.

**Chapter 2**

* Deep learning NLP is good at imitating styles in generated text, but as of 2 years ago (2020), not great at combining this with a knowledge base to generate accurate information. Seems to still be the case with GPT-3
* For tabular data, random forests and gradient boosting machines generally already work quite well. Deep learning increases the variety of columns that can be trained on.
* Recommendation systems are essentially a giant sparse matrix, with say customers as the row and the products as columns. This is a mind-blowingly huge matrix for Amazon.