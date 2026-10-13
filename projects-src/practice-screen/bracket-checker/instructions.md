# Bracket and Comment Checker

A code editor wants to point at the exact place a generated snippet goes wrong instead of
saying "parse failed". The first layer is a scanner that balances `()`, `[]` and `{}`
while ignoring anything inside string literals and comments.

## Task

Implement `check(source)` in `src/bracket_checker.py`. It returns `None` when the source
is balanced, otherwise a tuple `(line, col, message)` describing the **first** error.
`line` and `col` are 1-based; `col` counts characters on the line (a tab is one column);
`"\n"` is the only line break.

**Lexical rules**

- **Strings** open with `'` or `"` and end at the next unescaped matching quote. A
  backslash escapes the next character inside a string (`"\""` is one complete string,
  `"\\"` is a string holding one backslash). Brackets and comment markers inside a
  string mean nothing.
- A string never spans lines. A string still open at a newline or at the end of input
  is **not** an error: it simply ends there and scanning resumes on the next line. A
  backslash directly before the newline does not carry the string over.
- **Line comment:** `#` outside a string runs to the end of the line.
- **Block comment:** `/*` outside a string opens a comment that ends at the next `*/`
  and may span lines. Block comments do not nest, and `/*/` is an opener followed by `/`,
  not a complete comment.
- Inside a comment nothing else is recognised: quotes, `#`, brackets, and `/*` are plain text.
  Likewise `*/` outside a comment is plain text.

**Errors** (scan left to right, top to bottom; return the first one found)

| Situation | Position | Message |
|---|---|---|
| closer with an empty stack | the closer | `unexpected ')'` |
| closer that does not match the innermost opener | the closer | `expected ']' but found ')'` |
| end of input with a block comment still open | the `/` of that `/*` | `unterminated comment` |
| end of input with brackets still open | the **innermost** (most recent) unclosed opener | `unclosed '('` |

Messages use the real characters. An unterminated block comment is reported before
unclosed brackets, since the scanner cannot say anything about text inside a comment.

```python
check("a(b[c]{d})")             # None
check("foo)")                   # (1, 4, "unexpected ')'")
check("( ]")                    # (1, 3, "expected ')' but found ']'")
check("f(\n  x /* ) */ [")      # (2, 16, "unclosed '['")
check("a = 1 /* oops")          # (1, 7, "unterminated comment")
check('s = "\\""')              # None   (the source is s = "\"")
```

A non-`str` argument raises `TypeError`. A 100,000-character source must run well under a
second, so scan once and avoid repeated slicing.

## Files

- `src/bracket_checker.py`: your solution.
- `tests/test_bracket_checker.py`: a few visible tests. Grading uses a separate, larger hidden suite.
- `tests/test_candidate.py`: add your own tests for the risks you see.
- `DESIGN.md`: four short sections.

Target: **60 minutes**.
