def rolling_totals(values, width):
    if width<=0 or width>len(values):return []
    total=sum(values[:width]);out=[total]
    for i in range(width,len(values)):
        total+=values[i]-values[i-width];out.append(total)
    return out
