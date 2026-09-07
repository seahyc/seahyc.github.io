def preference_key(parts):
    clean=[part.strip().lower() for part in parts]
    return ".".join(part for part in clean if part)
