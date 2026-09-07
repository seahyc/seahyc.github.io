def route_action(handlers, request):
    name=request["action"]
    if name not in handlers:return {"ok":False,"error":"unknown"}
    return {"ok":True,"value":handlers[name](request.get("payload"))}
