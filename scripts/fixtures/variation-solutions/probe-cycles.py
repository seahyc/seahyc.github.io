def first_repeat(states):
    seen={}
    for i,state in enumerate(states):
        if state in seen:return seen[state],i
        seen[state]=i
    return None
