def ranked_counts(names, limit):
    counts={};order={}
    for name in names:
        if name not in counts:order[name]=len(order)
        counts[name]=counts.get(name,0)+1
    return sorted(counts.items(),key=lambda x:(-x[1],order[x[0]]))[:max(0,limit)]
