def trace_until_repeat(start, step):
    seen=set();trace=[];state=start
    while state not in seen:
        seen.add(state);trace.append(state);state=step(state)
    return trace,state
