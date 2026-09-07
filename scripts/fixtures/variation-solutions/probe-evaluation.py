def check_summary(checks):
    passed=sum(1 for x in checks if x["passed"])
    total=len(checks)
    return {"passed":passed,"failed":total-passed,"rate":passed/total if total else 0}
