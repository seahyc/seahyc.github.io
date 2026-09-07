def ready_jobs(jobs):
    return [job for job in jobs if job.get("ready") is True]
