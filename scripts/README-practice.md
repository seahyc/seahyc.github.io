# Coding practice

`static/practice/` is a standalone static application served at `/practice/` by Hugo. No build step or server-side execution is required. The pinned Python runtime loads from jsDelivr in a module worker; each run starts in a fresh filesystem. Stop terminates the worker. After initialization, execution is capped at 10 seconds and Python output at 30 KB.

The curriculum contains original general exercises, fixed public test suites, editable source and design notes. It includes no reference solutions. Practice progress and code are stored in localStorage; backup import/export is available. There is no cross-device sync. The public tests are not hidden assessment tests, and browser-side progress is self-reported practice evidence rather than secure certification.

Modes: assisted practice, fresh cold recall, and timed mocks. Hints and paste events remove cold credit; guided/faded tasks never count as cold recall. Same-day reruns cannot increment recall days. A saved attempt carried into another day loses cold eligibility until restarted from the scaffold. Review intervals are 1, 3, 7, and 14 days.

Validation:

```
node --test scripts/state.test.mjs
node --check static/practice/app.mjs
node --check static/practice/runner.mjs
```

The browser smoke test requires Playwright (or `PLAYWRIGHT_MODULE` pointing to its module), an installed browser (`BROWSER_EXECUTABLE` optionally), and a preview at `PRACTICE_URL`, defaulting to `http://127.0.0.1:8768/practice/`:

```
node scripts/browser-practice.mjs
```

`verify-exercises.py` accepts private exercise/reference roots at runtime to check reference solutions against the public tests. Never copy those private roots into the site. Reference validation is separate from production deployment.

The application deliberately supports standard-library Python without a shell or package installation. Tests are visible and read only in the UI. User experiments can be written in the main file, or design notes where supplied. Browser storage can be lost; export backups.
