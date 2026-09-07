def reachable(graph, start):
    seen={start};queue=[start];out=[]
    for node in queue:
        out.append(node)
        for nxt in graph.get(node,[]):
            if nxt not in seen:seen.add(nxt);queue.append(nxt)
    return out
