def route_batches(values, width, routes):
    if width<=0 or width>len(values):return []
    out=[]
    for i in range(len(values)-width+1):
        window=list(values[i:i+width]);fn=routes.get(window[0]);out.append(fn(window) if fn else None)
    return out
