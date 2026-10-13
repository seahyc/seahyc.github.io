"""Resolve $id/$ref documents into object graphs and dump them back. See instructions.md."""


class ResolveError(ValueError):
    """Raised for malformed documents or graphs that cannot be represented."""


def resolve(doc):
    raise NotImplementedError


def dump(value):
    raise NotImplementedError
