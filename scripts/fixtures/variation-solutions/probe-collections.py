def stable_unique_objects(items):
    seen=set()
    out=[]
    for item in items:
        if item["id"] not in seen:
            seen.add(item["id"]);out.append(item)
    return out
