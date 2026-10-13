import time

import pytest

from build_order import CycleError, build_order


def nodes_of(deps):
    found = set(deps)
    for values in deps.values():
        found.update(values)
    return found


def assert_valid_order(order, deps):
    assert isinstance(order, list)
    assert len(order) == len(set(order)) and set(order) == nodes_of(deps)
    position = {node: i for i, node in enumerate(order)}
    for node, needs in deps.items():
        for need in needs:
            assert position[need] < position[node], f"{need} must precede {node}"


def oracle(deps):
    """Independent Kahn with a sorted ready list (quadratic, fine for tiny graphs)."""
    nodes = nodes_of(deps)
    done, order = set(), []
    while len(order) < len(nodes):
        ready = sorted(n for n in nodes if n not in done and all(d in done for d in deps.get(n, ())))
        if not ready:
            return None
        order.append(ready[0])
        done.add(ready[0])
    return order


def cycle_of(deps):
    with pytest.raises(CycleError) as info:
        build_order(deps)
    return info.value.cycle


def assert_valid_cycle(cycle, deps):
    assert isinstance(cycle, list) and len(cycle) >= 2 and cycle[0] == cycle[-1]
    assert len(set(cycle[:-1])) == len(cycle) - 1, "nodes repeat inside the cycle"
    for node, nxt in zip(cycle, cycle[1:]):
        assert nxt in deps.get(node, ()), f"{node} does not depend on {nxt}"


def test_linear_chain_order():
    assert build_order({"a": ["b"], "b": ["c"], "c": []}) == ["c", "b", "a"]
    assert build_order({"c": [], "b": ["c"], "a": ["b"]}) == ["c", "b", "a"]


def test_diamond_and_ready_set_tiebreak():
    assert build_order({"d": ["b", "c"], "b": ["a"], "c": ["a"], "a": []}) == ["a", "b", "c", "d"]
    assert build_order({"c": [], "b": [], "a": []}) == ["a", "b", "c"]
    assert build_order({"web": ["api", "ui"], "ui": ["core"], "api": ["core"], "core": []}) == ["core", "api", "ui", "web"]


def test_tiebreak_is_by_readiness_not_global_sort():
    assert build_order({"z": [], "a": ["z"], "b": []}) == ["b", "z", "a"]
    assert build_order({"d": ["a"], "b": [], "c": [], "a": []}) == ["a", "b", "c", "d"]
    assert build_order({"m": ["x"], "n": ["x"], "x": [], "b": ["m"]}) == ["x", "m", "b", "n"]


def test_dependency_only_nodes_included():
    assert build_order({"app": ["lib", "log"]}) == ["lib", "log", "app"]
    order = build_order({"a": ["z"], "b": ["y"]})
    assert_valid_order(order, {"a": ["z"], "b": ["y"]})
    assert order == ["y", "b", "z", "a"]


def test_duplicate_dependencies():
    deps = {"a": ["b", "b", "c", "b"], "b": ["c", "c"], "c": []}
    assert build_order(deps) == ["c", "b", "a"]
    assert build_order({"x": ["y", "y"]}) == ["y", "x"]
    assert cycle_of({"a": ["b", "b"], "b": ["a", "a"]}) == ["a", "b", "a"]


def test_empty_and_singleton():
    assert build_order({}) == []
    assert build_order({"a": []}) == ["a"]
    assert build_order({"a": ()}) == ["a"]
    assert build_order({"only": ["dep"]}) == ["dep", "only"]


def test_disconnected_components_interleave():
    deps = {"b2": ["b1"], "b1": [], "a2": ["a1"], "a1": [], "c": []}
    assert build_order(deps) == ["a1", "a2", "b1", "b2", "c"]
    deps = {"y": ["x"], "x": [], "b": ["a"], "a": []}
    assert build_order(deps) == ["a", "b", "x", "y"]


def test_random_dags_are_valid_and_match_oracle():
    seed = 12345
    for size in (5, 12, 30, 60):
        for _ in range(4):
            names = [f"n{i:03d}" for i in range(size)]
            deps = {}
            for i, name in enumerate(names):
                chosen = []
                for j in range(i):
                    seed = (seed * 1103515245 + 12345) % (2 ** 31)
                    if seed % 7 == 0:
                        chosen.append(names[j])
                deps[name] = chosen
            items = list(deps.items())
            items.reverse()
            shuffled = dict(items)
            order = build_order(shuffled)
            assert_valid_order(order, deps)
            assert order == oracle(deps)


def test_self_dependency_reports_path():
    assert cycle_of({"a": ["a"]}) == ["a", "a"]
    assert cycle_of({"ok": [], "x": ["ok", "x"]}) == ["x", "x"]


def test_cycle_path_is_canonical_for_single_cycle():
    assert cycle_of({"b": ["a"], "a": ["b"]}) == ["a", "b", "a"]
    assert cycle_of({"c": ["b"], "b": ["a"], "a": ["c"]}) == ["a", "c", "b", "a"]
    deps = {"app": ["lib"], "lib": ["core"], "core": ["util"], "util": ["lib"]}
    assert cycle_of(deps) == ["core", "util", "lib", "core"]
    deps = {"z": ["y"], "y": ["x"], "x": ["z"], "root": ["z"]}
    assert cycle_of(deps) == ["x", "z", "y", "x"]


def test_cycle_path_edges_valid_with_several_cycles():
    deps = {"a": ["b"], "b": ["a"], "c": ["d"], "d": ["e"], "e": ["c"], "f": ["f"], "g": ["a", "c"]}
    cycle = cycle_of(deps)
    assert_valid_cycle(cycle, deps)
    deps = {"a": ["b", "c"], "b": ["a"], "c": ["a"], "d": ["a", "e"], "e": []}
    assert_valid_cycle(cycle_of(deps), deps)
    assert cycle_of(deps)[0] == "a"


def test_cycle_hidden_behind_acyclic_part():
    deps = {"s1": [], "s2": ["s1"], "s3": ["s2"], "p": ["q", "s3"], "q": ["r"], "r": ["p"]}
    cycle = cycle_of(deps)
    assert_valid_cycle(cycle, deps)
    assert cycle == ["p", "q", "r", "p"]
    assert not {"s1", "s2", "s3"} & set(cycle)
    # A node that only depends on the cycle is reported as not part of it.
    assert "tail" not in cycle_of({"tail": ["p"], "p": ["q"], "q": ["p"]})


def test_cycle_error_message_names_path():
    with pytest.raises(CycleError) as info:
        build_order({"a": ["b"], "b": ["c"], "c": ["a"]})
    assert "a -> b -> c -> a" in str(info.value)
    assert isinstance(info.value, ValueError)
    with pytest.raises(CycleError, match="x -> x"):
        build_order({"x": ["x"]})


def test_input_not_mutated():
    deps = {"d": ["b", "c", "b"], "b": ["a"], "c": ["a"]}
    before = {k: list(v) for k, v in deps.items()}
    keys = list(deps)
    build_order(deps)
    assert deps == before and list(deps) == keys
    assert "a" not in deps
    cyclic = {"a": ["b"], "b": ["a"]}
    try:
        build_order(cyclic)
    except CycleError:
        pass
    assert cyclic == {"a": ["b"], "b": ["a"]}


def test_order_independent_of_input_ordering():
    deps = {"d": ["c", "b"], "b": ["a"], "c": ["a"], "a": [], "e": ["d", "a"]}
    expected = build_order(deps)
    assert expected == ["a", "b", "c", "d", "e"]
    reordered = {k: list(reversed(v)) for k, v in reversed(list(deps.items()))}
    assert build_order(reordered) == expected
    assert build_order({k: tuple(v) for k, v in deps.items()}) == expected
    first = cycle_of({"c": ["a"], "a": ["b"], "b": ["c"]})
    second = cycle_of({"a": ["b"], "b": ["c"], "c": ["a"]})
    assert first == second == ["a", "b", "c", "a"]


def test_malformed_input_rejected():
    for bad in (None, [], [("a", [])], "a", 5):
        with pytest.raises(TypeError):
            build_order(bad)
    with pytest.raises(TypeError):
        build_order({"a": "b"})
    with pytest.raises(TypeError):
        build_order({"a": None})
    with pytest.raises(TypeError):
        build_order({1: []})
    with pytest.raises(TypeError):
        build_order({"a": [2]})
    with pytest.raises(TypeError):
        build_order({"a": ["b", None]})


def test_scale_chain_and_wide():
    start = time.perf_counter()
    count = 8000
    chain = {f"n{i:05d}": [f"n{i + 1:05d}"] for i in range(count - 1)}
    order = build_order(chain)
    assert order[0] == f"n{count - 1:05d}" and order[-1] == "n00000" and len(order) == count
    wide = {f"leaf{i:05d}": ["root"] for i in range(count)}
    order = build_order(wide)
    assert order[0] == "root" and order[1] == "leaf00000" and order[-1] == f"leaf{count - 1:05d}"
    ring = {f"r{i:04d}": [f"r{(i + 1) % 3000:04d}"] for i in range(3000)}
    cycle = cycle_of(ring)
    assert len(cycle) == 3001 and cycle[0] == "r0000" and cycle[1] == "r0001" and cycle[-1] == "r0000"
    assert time.perf_counter() - start < 1.0
