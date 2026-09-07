def accept_spaced(timestamps, gap):
    out=[]
    for t in timestamps:
        if not out or t-out[-1]>=gap:out.append(t)
    return out
