import time

import pytest

from bracket_checker import check


def test_balanced_inputs():
    for source in ("", "()", "[]{}()", "a(b[c]{d})", "{[()()]}", "no brackets at all", "\n\n", "(\n[\n{\n}\n]\n)"):
        assert check(source) is None
    assert check("(" * 50 + ")" * 50) is None


def test_unexpected_closer():
    assert check("foo)") == (1, 4, "unexpected ')'")
    assert check("]") == (1, 1, "unexpected ']'")
    assert check("a\nb }") == (2, 3, "unexpected '}'")
    assert check("()]") == (1, 3, "unexpected ']'")
    assert check("{}}") == (1, 3, "unexpected '}'")


def test_mismatched_pair():
    assert check("( ]") == (1, 3, "expected ')' but found ']'")
    assert check("[)") == (1, 2, "expected ']' but found ')'")
    assert check("{(})") == (1, 3, "expected ')' but found '}'")
    assert check("a = (\nb = [\n)") == (3, 1, "expected ']' but found ')'")
    assert check("([)]") == (1, 3, "expected ']' but found ')'")


def test_unclosed_reports_opener_position():
    assert check("foo(") == (1, 4, "unclosed '('")
    assert check("{") == (1, 1, "unclosed '{'")
    assert check("ok\n  [1, 2") == (2, 3, "unclosed '['")
    assert check("(a)\n(b") == (2, 1, "unclosed '('")


def test_innermost_unclosed_reported_first():
    assert check("( [ {") == (1, 5, "unclosed '{'")
    assert check("(\n[\n") == (2, 1, "unclosed '['")
    assert check("(()") == (1, 1, "unclosed '('")
    assert check("(()(") == (1, 4, "unclosed '('")


def test_brackets_in_strings_ignored():
    assert check("x = '(' + ']'") is None
    assert check('s = "[{("') is None
    assert check("""a = "it's (" + 'say "]"'""") is None
    assert check("'' + \"\"") is None
    assert check("f('(', ')')") is None
    assert check("('x'") == (1, 1, "unclosed '('")


def test_escapes_in_strings():
    assert check('s = "\\""') is None
    assert check('s = "\\\\"') is None
    assert check("s = '\\''") is None
    assert check('s = "a \\" ) \\" b"') is None
    # Escaped backslash, then the quote really closes: the ) after it is live.
    assert check('s = "\\\\" )') == (1, 10, "unexpected ')'")
    assert check('s = "\\\\\\"" )') == (1, 12, "unexpected ')'")
    assert check('("\\")') == (1, 1, "unclosed '('")
    assert check('"\\(" (') == (1, 6, "unclosed '('")


def test_line_comments():
    assert check("y = [1, 2]  # ] ] ]") is None
    assert check("# ( at start\nx") is None
    assert check("a # (\nb ) # )") == (2, 3, "unexpected ')'")
    assert check("# '\n)") == (2, 1, "unexpected ')'")
    assert check("(\n# )\n)") is None
    assert check("#") is None


def test_block_comments_span_lines():
    assert check("a /* ) */ b") is None
    assert check("/* ( [\n { \n ) */") is None
    assert check("x = 1 /* ( */ + (2)") is None
    assert check("(\n/* multi\nline ] */\n)") is None
    assert check("/**/)") == (1, 5, "unexpected ')'")
    assert check("/* a */ ] /* b */") == (1, 9, "unexpected ']'")
    assert check("/* ) */\n  (") == (2, 3, "unclosed '('")
    assert check("/*/ ) */") is None  # "/*/" is an opener followed by "/", not a full comment
    assert check("/*/)") == (1, 1, "unterminated comment")
    assert check("/* a\n b */ x\n)") == (3, 1, "unexpected ')'")


def test_comment_markers_inside_strings_and_each_other():
    assert check('s = "/* (" ; )') == (1, 14, "unexpected ')'")
    assert check('"# (" ]') == (1, 7, "unexpected ']'")
    assert check("a # /* \n)") == (2, 1, "unexpected ')'")
    assert check("/* # ( */ )") == (1, 11, "unexpected ')'")
    assert check("/* \" */ (") == (1, 9, "unclosed '('")
    assert check("/* ' */ ' ) '") is None
    assert check("*/ )") == (1, 4, "unexpected ')'")
    assert check("/* /* ( */ )") == (1, 12, "unexpected ')'")


def test_unterminated_string_ends_at_newline():
    assert check("s = 'abc") is None
    assert check("s = \"(\nx") is None
    assert check("'(\n)") == (2, 1, "unexpected ')'")
    assert check('"abc\\\n)') == (2, 1, "unexpected ')'")
    assert check("(\n'x\n") == (1, 1, "unclosed '('")
    assert check('"') is None


def test_unterminated_block_comment():
    assert check("a = 1 /* oops") == (1, 7, "unterminated comment")
    assert check("x\n  /* ( \n ) ") == (2, 3, "unterminated comment")
    assert check("( /* ") == (1, 3, "unterminated comment")  # comment reported before unclosed bracket
    assert check("/*") == (1, 1, "unterminated comment")
    assert check("/* a */ /* b") == (1, 9, "unterminated comment")
    assert check("[ ) /*") == (1, 3, "expected ']' but found ')'")  # an earlier error still wins


def test_positions_across_lines_and_blank_lines():
    assert check("\n\n\n  )") == (4, 3, "unexpected ')'")
    assert check("a\n\tb)") == (2, 3, "unexpected ')'")
    assert check("x = 1\ny = (2\n\n\nz = 3") == (2, 5, "unclosed '('")
    assert check("é(") == (1, 2, "unclosed '('")
    assert check("a\r\n)") == (2, 1, "unexpected ')'")
    assert check("/* a\n\n\n*/ ]") == (4, 4, "unexpected ']'")


def test_first_error_wins():
    assert check(") ]") == (1, 1, "unexpected ')'")
    assert check("(]) (") == (1, 2, "expected ')' but found ']'")
    assert check("( ) )\n(") == (1, 5, "unexpected ')'")
    assert check("(\n]\n)") == (2, 1, "expected ')' but found ']'")
    assert check("{ ( ] }") == (1, 5, "expected ')' but found ']'")
    assert check("a /* x */ ( # )\n]") == (2, 1, "expected ')' but found ']'")


def test_non_string_rejected():
    for bad in (None, 5, b"()", ["("], 1.5):
        with pytest.raises(TypeError):
            check(bad)


def test_scale_long_source():
    start = time.perf_counter()
    line = "f(a[1], {'k': \"v)\"}) # ) ]\n"
    source = line * 2500 + "/* " + "( " * 1000 + "*/\n" + "(" * 500 + "x"
    assert check(source) == (2502, 500, "unclosed '('")
    assert check("(" * 15000 + ")" * 15000) is None
    assert check("[" * 5000 + "}") == (1, 5001, "expected ']' but found '}'")
    assert check("/* " + "x" * 40000) == (1, 1, "unterminated comment")
    assert time.perf_counter() - start < 1.0
