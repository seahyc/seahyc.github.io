# Modular open-band collar tool — provisional build guide

This concept exists because the approximately spherical globe is larger than the
metal collar, while the collar is close to a limewash wall and boxed between two
side ledges. A conventional retained-loop wrench cannot reach the collar, and a
normal strap-wrench handle has inadequate sweep near the wall.

The proposed tool uses four flat-printing split rings, four purchased M5 rods and
a separable narrow metal band. The band closes two rubber-lined rear shoes on the
collar. The rods carry torque to a hand ring in front of the globe.

This is an untested concept, not a safety-rated tool. The initialized values are
owner-memory estimates and must not be treated as fabrication dimensions.

## Measurements required before printing

1. Metal collar outside diameter.
2. Grippable axial metal width, excluding glass, wall and any curved transition.
3. Overall axial collar depth.
4. Minimum rigid-part clearance to the wall at 12, 3, 6 and 9 o'clock.
5. Clear width between the side ledges and the light's left/right offset.
6. Ledge projection from the limewash plane.
7. Globe diameter and maximum clearance above and below it.
8. Exact width and screw-housing dimensions of the proposed removable band.

## Current provisional values

- Globe: 130mm from the product listing; verify.
- Collar outside diameter: 85mm, representing the owner's 60–70% globe estimate.
- Grippable collar band: 10mm.
- Overall collar depth: 15mm midpoint of the owner's approximate 11–20mm memory.
- Wall clearance: approximately 5mm.
- Front clear opening: 144mm with 7mm radial clearance around the sphere.
- Four M5 rod centres: approximately 76mm radius.
- Rod length: 110mm, placing the hand ring beyond the shallow ledges.

## Purchased components

- Four M5 threaded rods, initially 110–120mm long, plus washers and hand nuts.
- A separable narrow metal band sized for the measured rear-shoe outside diameter.
  Its band must fit fully within the measured metal collar width. A retained closed
  loop is unsuitable because it cannot pass over the globe.
- 1mm nitrile or EPDM sheet for the rear-shoe liners.
- Optional 0.5–0.8mm PET or Mylar sheet cut as a loose two-piece wall guard. Do not
  tape it to the limewash.
- Soft edge tape for any printed surface that could approach the glass.

## Printed components

Set `part` in `deep-collar-socket.scad` and export these four STLs:

1. `rear_upper`
2. `rear_lower`
3. `front_upper`
4. `front_lower`

All four parts are oriented flat. PLA is for fit checking only. PETG can be used
for a cautious low-torque prototype. Nylon or polycarbonate is preferable for a
functional FDM version; SLS PA12 remains the strongest convenient service-print
route. Actual suitability depends on printer, filament condition, layer adhesion,
wall count and the torque required by the damaged thread.

## Validation before approaching the stuck fitting

1. Fit the complete tool to the removable lower light or a dummy cylinder first.
2. Confirm the rear liner touches only the metal collar.
3. Confirm no rigid part can reach the wall even if the tool flexes slightly.
4. Rotate through a complete turn and confirm all rods remain clear of the sphere
   and both side ledges.
5. Tighten the band only until the liner stops slipping. Reject the design if the
   collar starts to ovalize.
6. Mark the wall plate and verify that modest hand torque does not rotate it.

## Use limitations

Isolate the circuit and allow the bulb to cool. One person supports the globe while
the other uses the forward ring. Use slow hand torque and small back-and-forth motion;
never use an impact driver, breaker bar or the wall as a reaction surface. Stop if the
glass creaks, the collar deforms, clearance closes, or the fixed base turns—rotation
of that base can twist the supply wiring.
