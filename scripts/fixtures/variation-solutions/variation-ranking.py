def order_retries(jobs):
    return sorted(jobs,key=lambda x:(x["attempts"],-x["priority"]))
