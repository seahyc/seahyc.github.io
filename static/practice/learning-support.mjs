// Small worked patterns shown only after a learner has trouble.
// Each prompt is static: predict first, then reveal `answer` to self-check.
export const supports = {
  filtering: {
    title: 'Keep only matching items',
    explanation: 'A filter visits each item and copies only items that pass a yes/no test. The output keeps the original order because items are appended as they are visited.',
    code: `temperatures = [18, 23, 17, 26]
warm = []

for temperature in temperatures:
    if temperature >= 20:
        warm.append(temperature)

print(warm)`,
    prompt: 'Predict the exact output, then reveal the answer to check it.',
    answer: '[23, 26]',
  },
  counting: {
    title: 'Count repeated values',
    explanation: 'A dictionary can store one counter per value. get(key, 0) supplies zero the first time a value appears.',
    code: `sizes = ["small", "large", "small", "medium"]
counts = {}

for size in sizes:
    counts[size] = counts.get(size, 0) + 1

print(counts)`,
    prompt: 'Predict the exact dictionary printed, then reveal the answer.',
    answer: "{'small': 2, 'large': 1, 'medium': 1}",
  },
  normalization: {
    title: 'Normalize before comparing',
    explanation: 'Normalization turns equivalent inputs into one standard form before comparison. Stripping removes surrounding spaces, while lowercasing removes capitalization differences.',
    code: `labels = ["  Urgent", "urgent ", " Later "]
normalized = []

for label in labels:
    clean = label.strip().lower()
    if clean not in normalized:
        normalized.append(clean)

print(normalized)`,
    prompt: 'Predict the exact list printed, then reveal the answer.',
    answer: "['urgent', 'later']",
  },
  collections: {
    title: 'Use a set for membership',
    explanation: 'A set stores unique values and answers membership checks directly. Pair it with a list when you also need encounter order.',
    code: `attendees = ["Mina", "Ravi", "Mina", "Jo"]
seen = set()
unique = []

for name in attendees:
    if name not in seen:
        seen.add(name)
        unique.append(name)

print(unique)`,
    prompt: 'Predict the exact ordered list, then reveal the answer.',
    answer: "['Mina', 'Ravi', 'Jo']",
  },
  routing: {
    title: 'Dispatch by name',
    explanation: 'A router maps a requested name to the function that owns that behavior. Looking up the function first keeps selection separate from execution.',
    code: `def double(value):
    return value * 2

def add_one(value):
    return value + 1

routes = {"double": double, "add_one": add_one}
request = {"name": "add_one", "value": 6}
handler = routes[request["name"]]
print(handler(request["value"]))`,
    prompt: 'Which handler runs, and what exact value is printed? Predict, then reveal.',
    answer: '7',
  },
  intervals: {
    title: 'Reason with half-open intervals',
    explanation: 'A half-open interval includes its start and excludes its end, written [start, end). Two such intervals overlap when each starts before the other ends.',
    code: `meeting = (9, 11)
delivery = (10, 12)

latest_start = max(meeting[0], delivery[0])
earliest_end = min(meeting[1], delivery[1])
overlap = latest_start < earliest_end

print(overlap, (latest_start, earliest_end))`,
    prompt: 'Predict the exact overlap result and interval, then reveal the answer.',
    answer: 'True (10, 11)',
  },
  graphs: {
    title: 'Visit a graph breadth first',
    explanation: 'A graph is a set of items connected to neighbors. Breadth-first search uses a queue so everything one step away is visited before anything two steps away.',
    code: `from collections import deque

links = {"home": ["shop", "park"], "shop": ["cafe"], "park": []}
queue = deque(["home"])
seen = {"home"}
order = []

while queue:
    place = queue.popleft()
    order.append(place)
    for neighbor in links.get(place, []):
        if neighbor not in seen:
            seen.add(neighbor)
            queue.append(neighbor)

print(order)`,
    prompt: 'Predict the exact visit order, then reveal the answer.',
    answer: "['home', 'shop', 'park', 'cafe']",
  },
  ranking: {
    title: 'Make tie breaking explicit',
    explanation: 'Sorting needs a key that states what “best” means. A tuple key can rank by score first and a second field when scores tie.',
    code: `offers = [
    {"name": "basic", "value": 8},
    {"name": "plus", "value": 12},
    {"name": "annual", "value": 12},
]

ranked = sorted(offers, key=lambda item: (-item["value"], item["name"]))
print([item["name"] for item in ranked])`,
    prompt: 'Predict the exact name order, including the tie, then reveal the answer.',
    answer: "['annual', 'plus', 'basic']",
  },
  evaluation: {
    title: 'Aggregate case-level results',
    explanation: 'Evaluation checks several cases with the same rule, then summarizes the individual results. Keeping the per-case booleans makes the aggregate easy to inspect.',
    code: `expected = [4, 7, 9]
predicted = [4, 6, 9]
checks = []

for want, got in zip(expected, predicted):
    checks.append(want == got)

passed = sum(checks)
print(checks, passed)`,
    prompt: 'Predict the exact booleans and pass count, then reveal the answer.',
    answer: '[True, False, True] 2',
  },
  windows: {
    title: 'Compute a rolling window',
    explanation: 'A rolling window repeatedly examines the latest fixed-size slice. As the window moves one position, one old value leaves and one new value enters.',
    code: `orders = [2, 5, 1, 4]
window_size = 3
totals = []

for end in range(window_size, len(orders) + 1):
    start = end - window_size
    totals.append(sum(orders[start:end]))

print(totals)`,
    prompt: 'Predict the two rolling totals, then reveal the exact output.',
    answer: '[8, 10]',
  },
  cycles: {
    title: 'Detect repeated state',
    explanation: 'A process is cycling when it reaches a state it has seen before. Store visited states in a set and stop at the first repeat.',
    code: `state = 7
seen = set()

while state not in seen:
    seen.add(state)
    state = (state * 2) % 9

print(state, len(seen))`,
    prompt: 'Predict the first repeated state and number of unique states, then reveal.',
    answer: '7 6',
  },
  throttling: {
    title: 'Refill a token bucket',
    explanation: 'A token bucket represents permission to do limited work. Elapsed time adds tokens up to a capacity, and accepted work subtracts its cost.',
    code: `capacity = 5
tokens = 1
refill_per_second = 2
elapsed = 3

tokens = min(capacity, tokens + elapsed * refill_per_second)
cost = 4
allowed = tokens >= cost
if allowed:
    tokens -= cost

print(allowed, tokens)`,
    prompt: 'Predict whether the work is allowed and the tokens left, then reveal.',
    answer: 'True 1',
  },
  serialization: {
    title: 'Preserve shared identity',
    explanation: 'Two fields can point to the very same object, which is stronger than merely containing equal values. A reference table lets serialized data name that shared object once.',
    code: `shared = ["draft"]
board = {"today": shared, "tomorrow": shared}

same_before = board["today"] is board["tomorrow"]
board["today"].append("review")
visible_from_both = board["tomorrow"]

print(same_before, visible_from_both)`,
    prompt: 'Predict the identity check and list seen through the other field, then reveal.',
    answer: "True ['draft', 'review']",
  },
  parsing: {
    title: 'Carry parser state forward',
    explanation: 'An incremental parser reads one character at a time and carries forward the state needed to interpret the next character. A stack remembers which opening brackets still need a close.',
    code: `text = "([x])"
pairs = {")": "(", "]": "["}
stack = []

for char in text:
    if char in "([":
        stack.append(char)
    elif char in pairs:
        print(char, stack.pop() == pairs[char])

print(stack)`,
    prompt: 'Predict all three output lines in order, then reveal the answer.',
    answer: '] True\n) True\n[]',
  },
  stateful: {
    title: 'Keep state across operations',
    explanation: 'A stateful object remembers data between method calls. Each call can read or change that stored data according to one small contract.',
    code: `class Counter:
    def __init__(self):
        self.value = 0

    def add(self, amount):
        self.value += amount
        return self.value

counter = Counter()
print(counter.add(3), counter.add(2))`,
    prompt: 'Predict both returned values, then reveal the exact output.',
    answer: '3 5',
  },
  concurrency: {
    title: 'Keep async results ordered',
    explanation: 'Concurrent jobs may finish at different times even when they start together. asyncio.gather waits for all jobs and returns results in the same order as its inputs.',
    code: `import asyncio

async def price(quantity):
    await asyncio.sleep(0)
    return quantity * 3

async def main():
    jobs = [price(2), price(5), price(1)]
    results = await asyncio.gather(*jobs)
    print(results)

asyncio.run(main())`,
    prompt: 'Predict the exact ordered result list, then reveal the answer.',
    answer: '[6, 15, 3]',
  },
  identity: {
    title: 'Mark containers before descending',
    explanation: 'A container can point back to itself, so traversal must recognize objects by identity. Mark each container as visited before following its children to prevent infinite recursion.',
    code: `box = ["note"]
box.append(box)
visited = set()

def count_containers(value):
    if not isinstance(value, list) or id(value) in visited:
        return 0
    visited.add(id(value))
    return 1 + sum(count_containers(item) for item in value)

print(count_containers(box), box[1] is box)`,
    prompt: 'Predict the container count and identity check, then reveal the answer.',
    answer: '1 True',
  },
};
