---
title: "Forest Crew — AI crew"
slug: "forest-crew-ai-crew"
aliases:
  - "/projects/forest-crew-ai-crew/"
visibility: public
description: "Two AI firefighters negotiate hose and pump jobs while you fight the fire. A local collaboration preview, with public code."
tech: ["Babylon.js", "Codex", "Agent tools"]
weight: -5
date: 2026-09-12
link: "/making/forest-crew-ai-crew/"
cover: "/images/making/forest-crew-ai-crew.webp"
cover_alt: "The player and two firefighter teammates beside a pink water pump, facing a burning volcanic grove"
---

Two model-driven firefighters work alongside the player in the same pink-deck volcanic grove. They negotiate who fetches and connects the hose and who repairs and operates the pump. Their actions determine whether the player's hose has water pressure.

![In-engine capture from the local AI crew test](/images/making/forest-crew-ai-crew.webp)

**This is a local AI preview.** The [public Grove 01 game](/making/forest-crew-grove-01/) remains the stable hand-gesture playtest without model actors. The AI crew currently runs through a local Codex account; it is not yet a hosted multi-user service.

[Get the code and contribute on GitHub](https://github.com/seahyc/forest-crew)

With Node 24 and your own logged-in Codex CLI:

```sh
git clone https://github.com/seahyc/forest-crew.git
cd forest-crew
npm ci
npm run crew:server
```

In a second terminal, run `npm run dev`, then open `http://127.0.0.1:4180/?crew=1` and show your hands. Model calls consume your Codex account usage. The ordinary local game runs without the agent bridge.

In the first real test, the two Sol actors made conflicting requests, negotiated complementary jobs, completed the supply chain, and produced full pressure in the rendered game. One actor also wrote a literal learned `SKILL.md` backed by successful game events. Skill transfer, adaptation to another incident, and human team playtests still need work.

The [contributor guide](https://github.com/seahyc/forest-crew/blob/main/CONTRIBUTING.md) covers setup, tests and asset attribution. The [agent setup guide](https://github.com/seahyc/forest-crew/blob/main/server/README.md) describes the tools, model limits and current boundaries. Private recordings and visual references are excluded from the repository.
