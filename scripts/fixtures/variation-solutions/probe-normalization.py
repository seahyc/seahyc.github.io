def normalize_channels(values):
    if any(not isinstance(value,str) for value in values):raise ValueError('channel names must be strings')
    out=[];seen=set()
    for value in values:
        value='-'.join(value.strip().lower().split())
        if value and value not in seen:seen.add(value);out.append(value)
    return out
