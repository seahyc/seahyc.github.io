def distinct_per_window(names, width):
    if width<=0 or width>len(names):return []
    return [len(set(names[i:i+width])) for i in range(len(names)-width+1)]
