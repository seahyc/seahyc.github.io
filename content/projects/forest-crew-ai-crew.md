---
title: "Forest Crew — AI crew"
slug: "forest-crew-ai-crew"
aliases:
  - "/projects/forest-crew-ai-crew/"
visibility: public
description: "Two AI firefighters negotiate hose and pump jobs while you fight the fire. An invitation-only playable cooperation test, with public code."
tech: ["Babylon.js", "Codex", "Agent tools"]
weight: -5
date: 2026-09-12
link: "/making/forest-crew-ai-crew/"
cover: "/images/making/forest-crew-ai-crew.webp"
cover_alt: "The player and two firefighter teammates beside a pink water pump, facing a burning volcanic grove"
---

Two model-driven firefighters work alongside the player in the same pink-deck volcanic grove. They negotiate who fetches and connects the hose and who repairs and operates the pump. A small 12-second starter reserve lets you practise spraying immediately. Their actions then provide continuous full-pressure water; the reserve does not refill when crew supply disconnects. Teal and amber gear distinguish the teammates, with visible travel, connection, repair and pump-operation gestures. Teammates avoid each other while moving between separate workstations. Either actor can choose either job; after supply setup, one maintains the pump and the other stands by.

![In-engine capture from the local AI crew test](/images/making/forest-crew-ai-crew.webp)

**The hosted AI crew is an invitation-only demo.** Two Sol teammates run on the owner’s server and use the owner’s Codex account. The waiting crew appears beside you after opening a private invitation link. Show your hands to begin their work. Only one crew session can run at a time, with a daily session limit. The [public Grove 01 game](/making/forest-crew-grove-01/) remains the stable gesture playtest without model actors.

[Get the code and contribute on GitHub](https://github.com/seahyc/forest-crew)

With Node 24 and your own logged-in Codex CLI:

```sh
git clone https://github.com/seahyc/forest-crew.git
cd forest-crew
npm ci
npm run dev
```

Open `http://127.0.0.1:4180/` and show your hands. The development command starts the local crew bridge too. Model calls consume your Codex account usage; `?crew=0` selects the solo baseline.

In the first real test, the two Sol actors made conflicting requests, negotiated complementary jobs, completed the supply chain, and produced full pressure in the rendered game. One actor also wrote a literal learned `SKILL.md` backed by successful game events. Skill transfer, adaptation to another incident, and human team playtests still need work.

The [contributor guide](https://github.com/seahyc/forest-crew/blob/main/CONTRIBUTING.md) covers setup, tests and asset attribution. The [agent setup guide](https://github.com/seahyc/forest-crew/blob/main/server/README.md) describes the tools, model limits and current boundaries. Private recordings and visual references are excluded from the repository.
