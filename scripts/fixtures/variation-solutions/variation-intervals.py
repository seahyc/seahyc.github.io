def free_slots(busy, start, end):
    if start>=end:return []
    spans=sorted((max(start,a),min(end,b)) for a,b in busy if max(start,a)<min(end,b))
    out=[];cursor=start
    for a,b in spans:
        if a>cursor:out.append((cursor,a))
        cursor=max(cursor,b)
    if cursor<end:out.append((cursor,end))
    return out
