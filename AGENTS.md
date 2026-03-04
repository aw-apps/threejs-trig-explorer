# AGENTS.md

## Project Goal
Build an interactive educational web app that explains trigonometric principles (sine, cosine, tangent) through synchronized 3D animation and 2D function graphs. The app must be classroom-friendly, beginner-friendly, and deployable as a static site.

## Product Description
Users interact with a unit-circle based 3D scene and immediately see how angle changes affect sin/cos/tan values and curves. The experience should prioritize clarity and responsiveness over feature bloat.

## Tech Stack
- HTML5 (single-page app entry)
- CSS3 (layout and visual styling)
- Vanilla JavaScript (ES modules)
- Three.js via CDN (3D rendering and controls)
- No backend, no database
- Optional persistence via localStorage only if needed
- Deployment target: GitHub Pages

## Architecture Overview
- `index.html`: app shell and panel containers
- `styles/main.css`: layout, responsive UI, controls, chart styling
- `src/main.js`: bootstrap, render loop, app wiring
- `src/scene/unitCircleScene.js`: Three.js scene, camera, controls, angle indicator
- `src/math/trigModel.js`: angle normalization and sin/cos/tan computation
- `src/ui/controlPanel.js`: play/pause/step, function toggles, angle input
- `src/ui/valuePanel.js`: real-time value display
- `src/charts/trigPlot.js`: 2D plotting and cursor sync

## References (Phase 2 Research)
1. https://github.com/unconed/mathbox
   - Relevant patterns: modular math-visualization primitives, examples-driven structure (`examples/`, `docs/`)
2. https://github.com/AlejandroDagobah/VisualTrig
   - Relevant patterns: unit-circle + cartesian curve synchronization, function toggles, educational focus
3. https://github.com/arossti/ARTexplorer
   - Relevant patterns: pure static architecture, Three.js interaction model, clear module grouping for math + rendering

## Coupling Analysis
- Strongly coupled: scene animation loop, trig computation model, and value display must be developed together to avoid state drift.
- Strongly coupled: function toggles and chart rendering pipeline should be implemented in one module set.
- Independent-ish: deployment setup and documentation can be finalized after core features are stable.

## Global Acceptance Criteria
1. User can rotate/zoom a 3D unit-circle scene and see an angle indicator update in real time.
2. User can play/pause/step angle animation and observe synchronized sin/cos/tan numeric values.
3. User can toggle sin/cos/tan visibility and corresponding curves update correctly on a 2D plot.
4. App clearly communicates tangent behavior near asymptotes (no misleading continuous line through undefined regions).
5. App is deployable as a static GitHub Pages site and README provides reproducible local run + validation steps.

## Engineering Constraints
- Keep dependencies minimal (Three.js CDN only for MVP).
- Preserve deterministic behavior in render/update loop.
- Avoid hidden failures; surface invalid angle input with explicit UI feedback.
- Keep files and functions small and maintainable.

## Definition of Done
All global acceptance criteria pass via manual validation steps described in issue checklists and README; workflows, skills, and issue plan are in place for autonomous implementation pipeline.
