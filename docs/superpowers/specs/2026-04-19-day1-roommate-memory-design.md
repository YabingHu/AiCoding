# Day 1 Roommate Memory Chapter Design

Date: 2026-04-19
Topic: Expand the prototype prologue into a full Day 1 chapter centered on conflicting memory with a roommate

## Goal

Turn the current short prototype into a playable Day 1 chapter with 12 scenes or more. The chapter should establish a roommate relationship, introduce the first major reality mismatch, and end with the player locking in a remembered version of what happened the previous night.

This chapter should feel like one complete day rather than a short branching vignette. The design priority is pacing, emotional escalation, and clear unreliable-memory tension, not large route divergence.

## Narrative Intent

The player should finish Day 1 feeling two things at once:

- their memory of the previous night felt vivid and emotionally true
- the available evidence made that memory difficult to trust

The chapter should not resolve the truth. It should instead force the player to decide which version of events feels survivable enough to carry into Day 2.

## Scope

This design covers one authored chapter:

- one playable `Day 1`
- one primary relationship focus: the protagonist and a roommate or close friend they live with
- one central contradiction: the protagonist remembers explaining a late return the previous night, but the roommate and the message history suggest that explanation never happened
- one memory lock at the end of the day
- one shared scene chain with light interpretive branching rather than separate major routes

This design does not include:

- a full multi-day story
- a journal or timeline UI
- ending logic beyond Day 1 aftermath state
- a generalized content authoring pipeline for all future narrative needs

## Recommended Chapter Structure

The chapter should use a single-day, escalating structure. The player experiences the day in order from morning to night while small inconsistencies accumulate into a clear contradiction.

The chapter is divided into four phases:

1. `Scenes 1-3: Daily routine with friction`
   The protagonist begins the day believing a difficult but manageable conversation already happened the previous night.
2. `Scenes 4-6: Suspicion`
   Small interactions suggest the roommate is reacting to something different from what the protagonist remembers.
3. `Scenes 7-9: Evidence`
   Messages or voice history reveal that the remembered conversation is missing or materially different.
4. `Scenes 10-12: Internal collapse and memory lock`
   The protagonist is left alone with two plausible versions of reality and must choose which one to preserve.

## Scene Outline

The Day 1 chapter should include these 12 scenes:

1. `Morning kitchen`
   The protagonist casually assumes that last night's late return was already explained. The roommate responds with cool distance, as if hearing the explanation for the first time.
2. `Hallway exit`
   The protagonist lightly references the supposed agreement from last night. The roommate shows confusion and cuts the exchange short.
3. `Walk alone`
   The protagonist internally replays the previous night's conversation in rich detail, including tone, pauses, and the feeling of reluctant mutual understanding.
4. `Midday text`
   The roommate sends an ordinary message that reopens the morning tension and frames the protagonist's behavior as sudden and strange.
5. `Message search`
   The protagonist checks the chat history and cannot find the key explanation they were sure they sent.
6. `Self-repair`
   The protagonist rationalizes the mismatch. Maybe it happened in voice, on a call, or in person. The game should allow the player to lean into confidence or doubt.
7. `Evening return`
   Back home, the protagonist probes the roommate about last night. The roommate explicitly states that they never had the remembered conversation.
8. `Voice evidence`
   A surviving voice note or nearby message thread shows that the exchange was shorter, colder, and less resolved than the protagonist remembers.
9. `Escalation`
   The protagonist insists the roommate once acknowledged the explanation. The roommate begins responding less like an offended friend and more like someone worried about the protagonist's state.
10. `After the argument`
   The roommate leaves or withdraws. The protagonist is left alone with a destabilized replay of the night, and the remembered version begins to feel incomplete.
11. `Memory lock`
   The player chooses which interpretation to preserve.
12. `Chapter aftermath`
   The chapter closes with variant inner narration and updated state based on the locked memory.

## Choice Model

The chapter should use two kinds of choices.

### Dialogue Choices

Dialogue choices shape emotional tone and hidden stats during the day. They should not immediately split the story into separate scene trees. Their job is to modulate:

- `intimacy`
- `credibility`
- `selfCoherence`
- the phrasing of selected later lines

Day 1 should favor interpretive choices such as deflecting, insisting, apologizing, or testing the roommate indirectly.

### Memory Lock Choice

The chapter ends with one major memory choice. The player should choose between two explicitly incompatible interpretations:

- `they agreed last night, and are denying it now`
- `they never agreed, and I filled in the missing conversation myself`

The wording may be refined during implementation, but the two options must represent denial by the roommate versus distortion by the protagonist.

This choice should:

- store a durable memory record for later days
- immediately affect `selfCoherence` and either `credibility` or `intimacy`
- change the tone of the chapter-ending narration

## State Model Changes

The current prototype state is too narrow for a full chapter. It should be extended carefully without overbuilding.

### Existing State To Keep

- `currentSceneId`
- `stats.credibility`
- `stats.intimacy`
- `stats.selfCoherence`

### New State To Add

- `lockedMemories`
  A key-value record for durable chapter decisions. Day 1 should write one entry such as `day1-roommate-conversation`.
- `currentDay`
  A simple day or chapter marker so later content can reason about progression cleanly.

### State Not Needed Yet

- inventory
- evidence databases
- complex relationship objects
- freeform journal entries

## Content Model Changes

The current content model is suitable for a short prototype but too rigid for a 12-scene chapter. The next revision should remain data-driven and intentionally small.

### Required Content Capabilities

Each scene should be able to define:

- scene id
- scene type
- text content
- speaker metadata when relevant
- available choices
- default next scene behavior
- optional state effects from entering or exiting the scene
- optional conditions for variant text or scene availability

### Recommended Approach

Keep a single content file for Day 1 if possible, but move scene-to-scene flow out of hardcoded engine branches and into content data wherever it is straightforward to do so.

The engine should still interpret the content, but it should stop knowing about specific scene ids like `opening-conversation` or `aftermath-calm` as special cases.

This keeps the implementation focused on a single authored chapter while making future chapter expansion realistic.

## Branching Strategy

Day 1 should use shared progression with light divergence.

The same core 12-scene chain is played by all users, but:

- some lines can vary based on earlier tone choices
- state changes differ based on player responses
- the memory lock determines the chapter's emotional resolution

This is preferable to early hard route splits because:

- it keeps authored content manageable
- it emphasizes uncertainty over content quantity
- it preserves the feeling that the player is reinterpreting one day, not selecting separate timelines

## UI And Presentation Requirements

No major UI expansion is required for this chapter, but the content should feel structurally different from the current prototype.

The implementation should support:

- multiple dialogue scenes with distinct speakers and choices
- at least one scene centered on reading or reviewing chat or voice evidence
- a dedicated end-of-day memory lock screen
- a slightly different chapter-ending tone depending on the locked memory

The existing dialogue and sidebar layout can remain in place for this phase.

## Error Handling And Save Behavior

The chapter must preserve the prototype's current reliability guarantees.

- save after meaningful state changes
- recover safely if stored scene ids become invalid
- recover safely if `lockedMemories` is malformed or missing
- default invalid or partial old saves to a clean Day 1 start rather than crashing

Backward compatibility for existing prototype saves is important. Older saves with only `memoryVoice` should not break the app.

## Testing Strategy

The implementation should be verified at three levels.

### Engine Tests

Cover:

- full Day 1 progression through the shared scene chain
- stat updates from representative dialogue choices
- durable memory lock writes into `lockedMemories`
- chapter aftermath selection based on locked memory

### Storage Tests

Cover:

- save and load with the expanded state shape
- invalid `lockedMemories` recovery
- fallback behavior for missing or legacy fields

### App Tests

Cover:

- one full playthrough from morning scene to memory lock
- one alternate playthrough that ends with the other locked memory
- recovery to a fresh state when the saved scene id is invalid

## Implementation Constraints

- prefer extending existing React components and story engine code over replacing them
- keep the architecture readable and small enough for a single chapter
- avoid speculative abstractions for content tooling that Day 1 does not need
- preserve the current local-storage-based save flow

## Success Criteria

This work is successful when:

- the project contains a playable Day 1 chapter with at least 12 scenes
- the chapter clearly communicates one escalating memory contradiction with the roommate
- the player reaches a final memory lock with two meaningful interpretations
- the saved game records the locked memory durably
- tests cover the new state shape and at least two Day 1 endings
- the app still builds and loads safely from bad or outdated save data
