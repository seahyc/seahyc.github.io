def dependency_layers(dependencies, roots):
    first=[];seen=set()
    for x in roots:
        if x not in seen:seen.add(x);first.append(x)
    if not first:return []
    layers=[];current=first
    while current:
        layers.append(current);nxt=[]
        for node in current:
            for dep in dependencies.get(node,[]):
                if dep not in seen:seen.add(dep);nxt.append(dep)
        current=nxt
    return layers
