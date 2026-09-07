def best_candidate(candidates):
    if not candidates:return None
    return min(candidates,key=lambda x:(-x["score"],x["name"]))
