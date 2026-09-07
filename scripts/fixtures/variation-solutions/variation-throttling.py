def quota_decisions(timestamps, window, limit):
    accepted=[];out=[]
    for t in timestamps:
        accepted=[x for x in accepted if x>t-window]
        ok=len(accepted)<limit
        out.append(ok)
        if ok:accepted.append(t)
    return out
