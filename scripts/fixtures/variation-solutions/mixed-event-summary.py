def event_summary(events):
    out={}
    for event in events:
        value=event.get("type")
        if not isinstance(value,str):continue
        value=value.strip().lower()
        if not value:continue
        out[value]=out.get(value,0)+1
    return out
