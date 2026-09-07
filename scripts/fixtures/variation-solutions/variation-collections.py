def split_repeats(items):
    seen=set();firsts=[];repeats=[]
    for item in items:
        target=repeats if item["key"] in seen else firsts
        target.append(item);seen.add(item["key"])
    return firsts,repeats
