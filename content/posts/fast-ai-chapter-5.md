---
title: "fast.ai chapter 5 questionnaire"
date: 2022-10-05
---

**Why do we first resize to a large size on the CPU, and then to a smaller size on the GPU?**

Resizing to a large image and then cropping is done on the CPU because it can only be done serially due to the different image dimensions. It is resized to a smaller but uniform dimensions on GPU because it can then be processed in parallel.

**What are the two ways in which data is most commonly provided, for most deep learning datasets?**

Individual files or table of data.

**Look up the documentation for `L` and try using a few of the new methods that it adds.**

[fastcore - Foundation

The `L` class and helpers for it

fastcore](https://fastcore.fast.ai/foundation.html#l)

**Look up the documentation for the Python `pathlib` module and try using a few methods of the `Path` class.**

[pathlib — Object-oriented filesystem paths — Python 3.10.7 documentation

Logo](https://docs.python.org/3/library/pathlib.html)

**Give two examples of ways that image transformations can degrade the quality of the data.**

Spurious empty zones can be introduced. Interpolation from zooming and rotation is also a lower quality.

**What method does fastai provide to view the data in a `DataLoaders`?**

show\_batch()

**What method does fastai provide to help you debug a `DataBlock`?**

summary

**Should you hold off on training a model until you have thoroughly cleaned your data?**

No, it's best to train the model as possible to get an early sense of its performance.

**What are the two pieces that are combined into cross-entropy loss in PyTorch?**

log\_softmax and nll\_loss

**What are the two properties of activations that softmax ensures? Why is this important?**

That all the activations add up to 1, and that the differences are exaggerated. This is important because it allows us to calculate the probabilities of inferences in multiple categories, which should sum to 1, and it allows us to select 1 category as the inference more easily.

**When might you want your activations to not have these two properties?**

When none of the categories is the correct answer.

**Calculate the `exp` and `softmax` columns of <<bear\_softmax>> yourself (i.e., in a spreadsheet, with a calculator, or in a notebook).**

**Why can't we use `torch.where` to create a loss function for datasets where our label can have more than two categories?**

**What is the value of log(-2)? Why?**

It is invalid. Exponential functions are always positive.

**What are two good rules of thumb for picking a learning rate from the learning rate finder?**

1. Get the rate that is 1 order of magnitude below the min loss.
2. Get the rate right before the the loss starts increasing.

**What two steps does the `fine_tune` method do?**

1. Freeze all layers except the randomly generated last few and train the last few layers for 1 epoch.
2. Unfreeze and train the whole model for requested number of epochs.

**In Jupyter Notebook, how do you get the source code for a method or function?**

??

**What are discriminative learning rates?**

A lower learning rate for the first layer, and higher ones for as the layer index increases.

**How is a Python `slice` object interpreted when passed as a learning rate to fastai?**

Learning rate for layer 0, learning rate for the last layer, multiplicative equidistant learning rates for the layers in between.

**Why is early stopping a poor choice when using 1cycle training?**

Because the models in the middle epochs hasn't gotten to the point of small learning rates.

**What is the difference between `resnet50` and `resnet101`?**

The number of layers

**What does `to_fp16` do?**

It enables mixed-precision training, using half-precision floating point fp16 to speed up training with less GPU memory.

## Further Research

Find the paper by Leslie Smith that introduced the learning rate finder, and read it.

<https://arxiv.org/pdf/1506.01186.pdf>