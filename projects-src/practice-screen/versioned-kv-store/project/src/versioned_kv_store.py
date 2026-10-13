"""In-memory key/value store with global versions and per-key history. See instructions.md."""


class VersionedStore:
    def __init__(self):
        raise NotImplementedError

    @property
    def version(self):
        raise NotImplementedError

    def put(self, key, value):
        raise NotImplementedError

    def delete(self, key):
        raise NotImplementedError

    def get(self, key, version=None):
        raise NotImplementedError

    def history(self, key):
        raise NotImplementedError

    def snapshot(self, version=None):
        raise NotImplementedError
