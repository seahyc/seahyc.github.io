"""Deterministic object-graph codec. See instructions.md."""


class CodecError(ValueError):
    """Raised for unsupported input values or malformed payloads."""


def encode(value):
    raise NotImplementedError


def decode(payload):
    raise NotImplementedError
