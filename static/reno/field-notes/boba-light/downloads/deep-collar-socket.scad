/*
  BOBA LIGHT — MODULAR OPEN-BAND COLLAR TOOL

  PARAMETRIC CONCEPT ONLY. The initialized values are owner-memory estimates,
  not fabrication dimensions. Measure the real fitting before exporting STLs.

  Coordinate system: wall at z=0; globe projects toward +z. Individual parts
  are modeled flat for FDM printing. The assembled preview shows purchased M5
  rods and a narrow removable metal band as reference geometry.
*/

// ---------- MEASURE THESE ----------
collar_od = 85;               // memory estimate: 60–70% of 130mm globe
collar_band = 10;             // grippable axial metal width
collar_depth = 15;            // memory range: roughly 11–20mm
wall_clearance = 5;           // available tool clearance near limewash
globe_od = 130;               // listing value; verify
clear_pier_width = 220;       // inside face to inside face of ledges
ledge_projection = 12;        // forward from wall plane

// ---------- DESIGN INPUTS ----------
liner = 1.0;                  // nitrile/EPDM inside rear shoes
edge_margin = 0.75;           // axial margin at each edge of collar band
rear_radial_wall = 5.5;
sphere_clearance = 7;
front_radial_wall = 8;
front_ring_width = 8;
rod_nominal = 5;              // purchased M5 threaded rod
rod_hole = 5.6;
rod_length = 110;
split_gap = 2.0;
handle_length = 30;
band_width = 8;               // purchased removable band; verify actual width
band_thickness = 0.8;

// "assembled", "rear_upper", "rear_lower", "front_upper", "front_lower"
part = "assembled";

$fn = 120;

jaw_width = collar_band - 2 * edge_margin;
rear_inner_r = collar_od / 2 + liner;
rear_outer_r = rear_inner_r + rear_radial_wall;
front_inner_r = globe_od / 2 + sphere_clearance;
front_outer_r = front_inner_r + front_radial_wall;
rod_r = (front_inner_r + front_outer_r) / 2;

assert(jaw_width >= 4, "Measured collar band is too narrow for this concept");
assert(wall_clearance > 0, "Wall clearance must be measured as a positive value");
assert(clear_pier_width / 2 > front_outer_r,
  "Front ring conflicts with side ledges; measure the real pier width and light offset");
assert(rod_length > ledge_projection + 25,
  "Front hand ring must remain comfortably forward of the ledges");

module ring(inner_r, outer_r, height) {
  difference() {
    cylinder(r=outer_r, h=height);
    translate([0, 0, -0.5]) cylinder(r=inner_r, h=height + 1);
  }
}

module half_space(radius, height, upper=true) {
  if (upper)
    translate([-radius - 2, split_gap / 2, -1])
      cube([2 * radius + 4, radius + 2, height + 2]);
  else
    translate([-radius - 2, -radius - 2, -1])
      cube([2 * radius + 4, radius + 2 - split_gap / 2, height + 2]);
}

module half_ring(inner_r, outer_r, height, upper=true) {
  intersection() {
    ring(inner_r, outer_r, height);
    half_space(outer_r, height, upper);
  }
}

function rod_angles(upper=true) = upper ? [38, 142] : [218, 322];

module radial_boss(angle, height) {
  hull() {
    translate([
      cos(angle) * (rear_outer_r - rod_hole / 2),
      sin(angle) * (rear_outer_r - rod_hole / 2), 0
    ]) cylinder(d=rod_hole + 5, h=height);
    translate([cos(angle) * rod_r, sin(angle) * rod_r, 0])
      cylinder(d=rod_hole + 5, h=height);
  }
}

module rear_half(upper=true) {
  difference() {
    union() {
      half_ring(rear_inner_r, rear_outer_r, jaw_width, upper);
      for (angle=rod_angles(upper)) radial_boss(angle, jaw_width);
    }
    for (angle=rod_angles(upper))
      translate([cos(angle) * rod_r, sin(angle) * rod_r, -0.5])
        cylinder(d=rod_hole, h=jaw_width + 1);
  }
}

module front_half(upper=true) {
  difference() {
    union() {
      half_ring(front_inner_r, front_outer_r, front_ring_width, upper);
      handle_y = upper ? front_outer_r : -front_outer_r - handle_length;
      translate([-20, handle_y, 0]) cube([40, handle_length, front_ring_width]);
    }
    for (angle=rod_angles(upper))
      translate([cos(angle) * rod_r, sin(angle) * rod_r, -0.5])
        cylinder(d=rod_hole, h=front_ring_width + 1);
  }
}

module purchased_rods() {
  for (angle=[38, 142, 218, 322])
    translate([cos(angle) * rod_r, sin(angle) * rod_r, jaw_width])
      color([0.72, 0.75, 0.79]) cylinder(d=rod_nominal, h=rod_length);
}

module removable_band_reference() {
  color([0.92, 0.70, 0.26])
    difference() {
      cylinder(r=rear_outer_r + band_thickness, h=band_width);
      translate([0, 0, -0.5]) cylinder(r=rear_outer_r, h=band_width + 1);
      // The cut illustrates that this must be a separable band, not a retained loop.
      translate([rear_outer_r - 2, -4, -1]) cube([12, 8, band_width + 2]);
    }
}

module assembled() {
  color([0.32, 0.71, 1.00]) rear_half(true);
  color([0.53, 0.84, 1.00]) rear_half(false);
  removable_band_reference();
  purchased_rods();
  translate([0, 0, jaw_width + rod_length]) {
    color([0.32, 0.71, 1.00]) front_half(true);
    color([0.53, 0.84, 1.00]) front_half(false);
  }
}

if (part == "rear_upper") rear_half(true);
else if (part == "rear_lower") rear_half(false);
else if (part == "front_upper") front_half(true);
else if (part == "front_lower") front_half(false);
else assembled();
