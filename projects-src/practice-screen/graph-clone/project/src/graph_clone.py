"""Identity-preserving deep copy for list/dict graphs. See instructions.md."""


class CloneError(ValueError):
    """Raised for unsupported values; the message names the path to the value."""


def clone(value):
    raise NotImplementedError
