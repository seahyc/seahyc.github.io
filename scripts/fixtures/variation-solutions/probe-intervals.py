def active_labels(windows, point):
    return [label for start,end,label in windows if start<=point<end]
