def size_buckets(payloads):
    out={'empty':0,'small':0,'large':0}
    for p in payloads:
        key='empty' if len(p)==0 else ('small' if len(p)<=3 else 'large')
        out[key]+=1
    return out
