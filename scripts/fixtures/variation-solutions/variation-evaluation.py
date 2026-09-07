def field_accuracy(cases):
    out={}
    for case in cases:
        for key,value in case["expected"].items():
            row=out.setdefault(key,{"matched":0,"total":0});row["total"]+=1
            if key in case["actual"] and case["actual"][key]==value:row["matched"]+=1
    return out
