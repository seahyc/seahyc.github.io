"""Versioned JSON codec for object graphs. See instructions.md."""


class CodecError(ValueError):
    """Raised for unsupported values, bad registrations and malformed documents."""


class Registry:
    def register(self, cls, fields, name=None):
        raise NotImplementedError


def encode(value, registry=None):
    raise NotImplementedError


def decode(doc, registry=None):
    raise NotImplementedError
