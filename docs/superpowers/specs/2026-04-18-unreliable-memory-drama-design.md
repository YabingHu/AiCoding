# Unreliable Memory Drama Browser Game Design

Date: 2026-04-18
Topic: Browser visual novel design and core loop

## Overview

This project is a browser-first visual novel focused on psychological drama, player choice, and unreliable memory. The player moves through several in-game days or weeks, experiences emotionally charged scenes, records subjective recollections of key events, and later faces contradictions from other characters or external evidence.

The design goal is to create tension through uncertainty rather than combat, puzzle complexity, or resource management. The player should feel responsible for outcomes while never being fully certain whether the protagonist is being manipulated, dissociating, or rewriting events to cope.

## Player Fantasy

The player fantasy is to inhabit a fragile perspective and shape a version of reality that may or may not be true.

The game should let the player:

- protect their sense of self
- preserve or damage fragile relationships
- decide who to trust when accounts of the past conflict
- uncover whether the protagonist is unstable, manipulated, or self-protective

A successful play session should feel intimate, tense, and slightly disorienting while remaining readable enough that the player can connect choices to later consequences.

## Core Loop

Each in-game day follows a three-phase emotional loop:

1. Live the day.
   The player moves through one to three story scenes such as conversations, texts, confrontations, and private moments. Choices are primarily dialogue and interpretation choices.
2. Record the memory.
   After a key scene, the player locks in a recollection through a journal entry, internal monologue, or reconstructed flashback. The player is not only choosing what to say, but sometimes what they believe happened.
3. Face the contradiction.
   Later scenes challenge that recollection through evidence, messages, or other characters' accounts. The player responds by defending their version, apologizing, revising their view, or escalating the conflict.

This creates the full loop:

- experience an event
- interpret it through a fragile mind
- live with the consequences later

## Core State Model

The game tracks lightweight narrative state rather than traditional action-game resources.

- `credibility`: how believable the protagonist seems to others
- `intimacy`: how open or emotionally available specific characters are
- `self-coherence`: how stable and internally consistent the protagonist's own reality feels

These values should shape scene availability, contradiction intensity, and ending outcomes without turning the experience into visible spreadsheet play.

## Story Structure And Progression

The story spans two to three in-game weeks and is divided into short daily chapters. Each day should be playable in roughly 10 to 15 minutes to support browser sessions and keep pacing tight.

Recommended progression arc:

- `Week 1`: establish routine, relationships, and subtle discrepancies
- `Week 2`: contradictions sharpen and trust begins to fracture
- `Week 3`: the player is forced into irreversible interpretations and the narrative resolves around the truth they have built or rejected

Each day contains:

- one mandatory anchor scene that advances the main plot
- one optional personal scene that deepens a relationship or reveals internal state
- one reflection or memory beat that updates the protagonist's internal narrative

## Replayability

Replay value comes from layered interpretation rather than a purely larger branch tree.

- early dialogue choices alter relationship dynamics
- memory-lock choices alter how scenes are stored internally
- later contradiction responses alter who believes the protagonist and which truths remain accessible

Two players can witness the same early event, remember it differently, and reach different late-game outcomes because later scenes are filtered through those remembered versions.

## Endings

Endings should depend on a mix of:

- which relationships survive, rupture, or transform
- how fractured the protagonist's self-coherence becomes
- whether the final truth is accepted, denied, obscured, or replaced with a more survivable lie

The game should support multiple ending tones:

- hopeful but unresolved
- tragic and isolating
- ambiguous and unsettling
- emotionally self-protective but morally compromised

## Presentation Direction

The presentation should be dialogue-first, intimate, and subtly unstable rather than visually loud.

Recommended visual language:

- clean dialogue layout with strong readability
- layered backgrounds and character portraits
- expression changes or transitions that occasionally feel a beat off
- repeated lines or recalled lines that later appear with altered wording
- journal or flashback screens that feel more composed than present-tense scenes

The instability should feel intentional and legible. Players must understand that contradictions are part of the design rather than UI or state bugs.

## Primary Screens

- `Dialogue scene`: background, character portrait, text, and two to four choices
- `Memory lock screen`: the player records how the protagonist believes an important moment happened
- `Journal or timeline view`: stores prior scenes and remembered versions, with later entries flagged as disputed
- `Relationship view`: shows emotional distance in a light-touch way without exposing too much raw numerical state

## System Design

The implementation should separate content, state, and presentation.

### Content Layer

The content layer defines:

- scenes
- dialogue branches
- conditions
- character metadata
- ending rules
- memory variants for key scenes
- contradiction hooks tied to later scenes

### State Engine

The state engine tracks:

- scene progression
- relationship values per major character
- memory records for key scenes
- contradiction flags and evidence triggers
- day progression
- save and load state

### Presentation Layer

The presentation layer handles:

- dialogue rendering
- transitions
- portrait and background swaps
- journal and timeline screens
- menus
- readable differentiation between present events, recollections, and disputed records

## Authoring Pattern

Each key authored scene should define three things:

1. the baseline event as the game understands it
2. the set of remembered versions the player is allowed to lock in
3. the contradiction hooks that can challenge that memory later

This keeps narrative content scalable and allows the unreliable-memory mechanic to stay central instead of being layered on as a rare special case.

## Failure States

The game should avoid a conventional fail state or abrupt game-over structure in the main route. Failure is narrative collapse rather than mechanical death.

Examples of failure pressure:

- important characters stop trusting the protagonist
- the protagonist's internal model becomes too unstable
- key truths become unreachable because the player has overwritten or denied too many critical memories

This supports bad, bittersweet, and ambiguous endings while preserving experimentation.

## Technical Direction

This should be treated as a browser-first narrative runtime rather than an action-game engine project. The priority is robust story scripting, state management, and save reliability.

Recommended direction:

- narrative web app structure
- dialogue-first runtime
- lightweight scene and state scripting
- subtle transitions and presentation effects
- strong save and load support

## Test Strategy

Testing should focus on content correctness, state integrity, and player readability.

### Content Validation

Automated checks should catch:

- broken branch links
- missing targets
- unreachable scenes
- invalid contradiction references
- malformed memory-lock definitions

### State Tests

State-level tests should verify:

- memory lock choices are stored correctly
- contradiction triggers fire only under intended conditions
- relationship and coherence shifts apply consistently
- endings resolve from the intended state combinations

### Save And Load Tests

The game must preserve:

- current day and scene
- chosen memory versions
- relationship progress
- contradiction and evidence flags
- ending eligibility state

### Playtest Focus

Playtesting should answer these questions:

- do players understand when they are making a dialogue choice versus a memory choice
- do contradictions feel intentional instead of buggy
- can players sense cause and effect without seeing all hidden math
- do days feel short, tense, and worth replaying

## Scope Recommendation

The first production version should stay narrow and polished.

Recommended v1 scope:

- one protagonist
- three to five major supporting characters
- two to three in-game weeks
- one main route with meaningful internal branching
- a small set of memory-critical scenes that echo across later chapters
- multiple endings driven by relationships, coherence, and truth acceptance

This scope is enough to express the core mechanic clearly without requiring an unmanageable amount of narrative content.

## Summary

The recommended game is a browser-first psychological visual novel about unstable recollection over several days or weeks. Its distinctive mechanic is that the player not only chooses what to do, but also chooses what they believe happened. The resulting design centers on scene interpretation, memory locking, contradiction, and the social cost of maintaining a fragile reality.

## Local Prototype Notes

- Install dependencies with `npm install`
- Start the dev server with `npm run dev`
- Run tests with `npm test`
- Build the prototype with `npm run build`
