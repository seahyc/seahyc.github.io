def matching_notes(notes, allowed_tags):
    allowed=set(allowed_tags)
    return [note for note in notes if any(tag in allowed for tag in note.get("tags", []))]
