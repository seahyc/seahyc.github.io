"""Implement PPO's policy, advantage estimator, and clipped policy objective."""
import torch
from torch import nn


def build_policy(obs_dim, action_dim):
    """Return an nn.Module: observations [B,obs_dim] -> logits [B,A], values [B].

    Use a small tanh MLP with separate policy/value heads. No hardcoded actions.
    All weights must be trainable; initialize from the evaluator's torch RNG.
    """
    raise NotImplementedError('Build the actor and critic')


def gae(rewards, values, next_values, terminated, episode_ends, gamma, lam):
    """All inputs [T,N]. Return advantages and returns of that shape.

    True termination removes value bootstrap. Truncation retains bootstrap from
    the FINAL observation but stops the recurrence across the reset boundary.
    Returns = advantages + values. Do not normalize here.
    """
    raise NotImplementedError('Implement reverse-time GAE')


def ppo_loss(logp, old_logp, advantages, clip):
    """Return scalar NEGATIVE mean clipped surrogate (min for either sign).

    old_logp and advantages are frozen rollout tensors. Preserve logp gradients.
    Value regression, entropy bonus and gradient clipping live in the harness.
    """
    raise NotImplementedError('Implement the PPO clipped surrogate')
