from bracket_checker import check


def test_balanced_returns_none():
    assert check("a(b[c]{d})") is None
    assert check("") is None


def test_unexpected_and_mismatched_closers():
    assert check("foo)") == (1, 4, "unexpected ')'")
    assert check("( ]") == (1, 3, "expected ')' but found ']'")


def test_comment_and_string_are_skipped():
    assert check("x = '(' + ']'  # ) ]") is None
    assert check("a /* ( */ b") is None
