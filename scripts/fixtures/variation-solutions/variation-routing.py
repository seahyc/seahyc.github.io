def dispatch_events(routes, events):
    out=[]
    for event in events:
        fn=routes.get(event["kind"]);out.append(fn(event["data"]) if fn else None)
    return out
