"""Deterministic build ordering with cycle reporting. See instructions.md."""


class CycleError(ValueError):
    """Raised when no build order exists.

    ``cycle`` is a closed path such as ``["a", "b", "a"]`` (each node depends on the next).
    """

    def __init__(self, cycle):
        self.cycle = list(cycle)
        super().__init__("dependency cycle: " + " -> ".join(self.cycle))


def build_order(deps):
    raise NotImplementedError
