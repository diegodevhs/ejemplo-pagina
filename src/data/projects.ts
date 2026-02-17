import type { Project } from '@/types'

// Helper function to get project image paths
// Place your images in /public/images/projects/{projectId}/cover.jpg and /public/images/projects/{projectId}/{1,2,3}.jpg
const getProjectImage = (projectId: string, imageName: string): string => {
  return `/images/projects/${projectId}/${imageName}`
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'industrial-slab-warehouse',
    title: 'Industrial Slab Pour — Warehouse Complex',
    shortDescription: 'High-strength industrial floor slab for a 12,000 m² distribution warehouse.',
    description:
      'A large-scale industrial slab project for a regional logistics company. The pour required carefully coordinated ready-mix deliveries over two days to achieve a monolithic result. Fiber-reinforced concrete with hardener topping was specified to withstand heavy forklift traffic and racking loads.',
    coverImage: getProjectImage('1', 'cover.jpg'),
    images: [
      getProjectImage('1', 'cover.jpg'),
      getProjectImage('1', '1.jpg'),
      getProjectImage('1', '2.jpg'),
    ],
    location: 'Los Angeles, CA',
    date: '2024-02-10',
    concreteType: 'Fiber-Reinforced Ready-Mix',
    strength: '5000 PSI / 34 MPa',
    volumeM3: 420,
    pricePerM3: 185,
    tags: ['industrial', 'slab', 'warehouse', 'fiber-reinforced'],
  },
  {
    id: '2',
    slug: 'residential-driveway-polished',
    title: 'Residential Driveway — Polished Finish',
    shortDescription: 'Exposed aggregate polished concrete driveway with decorative banding.',
    description:
      'A premium residential driveway replacement featuring exposed aggregate with a polished top finish and contrasting charcoal banding. Colour hardener was integrated into the mix to achieve a consistent slate-grey tone that complements the home\'s modern façade.',
    coverImage: getProjectImage('2', 'cover.jpg'),
    images: [
      getProjectImage('2', 'cover.jpg'),
      getProjectImage('2', '1.jpg'),
      getProjectImage('2', '2.jpg'),
    ],
    location: 'Pasadena, CA',
    date: '2024-04-22',
    concreteType: 'Exposed Aggregate with Colour Hardener',
    strength: '3500 PSI / 24 MPa',
    volumeM3: 18,
    pricePerM3: 220,
    tags: ['residential', 'driveway', 'polished', 'decorative'],
  },
  {
    id: '3',
    slug: 'highway-bridge-deck',
    title: 'Highway Bridge Deck Replacement',
    shortDescription: 'Full bridge deck replacement on a state highway overpass using high-performance concrete.',
    description:
      'A challenging bridge deck replacement project completed within tight traffic management windows. High-performance concrete with low w/c ratio and silica fume addition was used to meet AASHTO durability requirements. Night pours were required to avoid daytime traffic disruption.',
    coverImage: getProjectImage('3', 'cover.jpg'),
    images: [
      getProjectImage('3', 'cover.jpg'),
      getProjectImage('3', '1.jpg'),
      getProjectImage('3', '2.jpg'),
    ],
    location: 'Sacramento, CA',
    date: '2023-11-05',
    concreteType: 'High-Performance Silica Fume Concrete',
    strength: '6000 PSI / 41 MPa',
    volumeM3: 890,
    pricePerM3: 210,
    tags: ['infrastructure', 'bridge', 'high-performance', 'civil'],
  },
  {
    id: '4',
    slug: 'retail-parking-structure',
    title: 'Retail Parking Structure — Multi-Level',
    shortDescription: 'Three-level cast-in-place parking structure for a major shopping centre.',
    description:
      'Structural concrete for a 3-level above-grade parking structure serving a retail complex. Post-tensioned slab system was adopted to minimise structural depth. Epoxy-coated rebar and corrosion inhibitors were incorporated throughout due to coastal environment exposure.',
    coverImage: getProjectImage('4', 'cover.jpg'),
    images: [
      getProjectImage('4', 'cover.jpg'),
      getProjectImage('4', '1.jpg'),
      getProjectImage('4', '2.jpg'),
    ],
    location: 'Long Beach, CA',
    date: '2023-08-18',
    concreteType: 'Post-Tensioned Structural Concrete',
    strength: '5500 PSI / 38 MPa',
    volumeM3: 2800,
    pricePerM3: 195,
    tags: ['structural', 'parking', 'post-tensioned', 'commercial'],
  },
  {
    id: '5',
    slug: 'school-gymnasium-foundation',
    title: 'K-12 School Gymnasium Foundation',
    shortDescription: 'Deep footings and grade beams for a new school gymnasium on expansive soil.',
    description:
      'Challenging foundation work for a new gymnasium building at a K-12 school campus. Expansive clay soils required drilled pier foundations and grade beams. Sulfate-resistant Type V cement was specified due to elevated sulfate content in the native soil.',
    coverImage: getProjectImage('5', 'cover.jpg'),
    images: [
      getProjectImage('5', 'cover.jpg'),
      getProjectImage('5', '1.jpg'),
      getProjectImage('5', '2.jpg'),
    ],
    location: 'Riverside, CA',
    date: '2024-01-30',
    concreteType: 'Sulfate-Resistant Type V',
    strength: '4000 PSI / 28 MPa',
    volumeM3: 340,
    pricePerM3: 178,
    tags: ['foundation', 'education', 'sulfate-resistant', 'institutional'],
  },
  {
    id: '6',
    slug: 'luxury-pool-deck',
    title: 'Luxury Residential Pool Deck',
    shortDescription: 'Stamped and stained concrete pool surround with custom slate pattern.',
    description:
      'A visually striking pool deck using stamped concrete with a custom slate-ashlar pattern and acid-stained earth tones. The job required precise timing to achieve consistent stamp impressions across the 280 m² pour. Sealer with anti-slip additive was applied for safety.',
    coverImage: getProjectImage('6', 'cover.jpg'),
    images: [
      getProjectImage('6', 'cover.jpg'),
      getProjectImage('6', '1.jpg'),
      getProjectImage('6', '2.jpg'),
    ],
    location: 'Beverly Hills, CA',
    date: '2024-05-14',
    concreteType: 'Stamped & Stained Decorative Concrete',
    strength: '4000 PSI / 28 MPa',
    volumeM3: 42,
    pricePerM3: 260,
    tags: ['decorative', 'stamped', 'residential', 'pool'],
  },
  {
    id: '7',
    slug: 'tilt-up-office-campus',
    title: 'Tilt-Up Office Campus Panels',
    shortDescription: 'Tilt-up concrete panels for a 6-building tech office campus.',
    description:
      'Ground-floor slabs and tilt-up wall panels for a modern office campus development. The slab-on-grade was precision-leveled (FF50/FL35) to serve as the casting bed for 84 tilt-up panels. Integrated lifting inserts and pour-backs were coordinated with the structural engineer.',
    coverImage: getProjectImage('7', 'cover.jpg'),
    images: [
      getProjectImage('7', 'cover.jpg'),
      getProjectImage('7', '1.jpg'),
      getProjectImage('7', '2.jpg'),
    ],
    location: 'Irvine, CA',
    date: '2023-06-01',
    concreteType: 'Tilt-Up Wall Panel Concrete',
    strength: '5000 PSI / 34 MPa',
    volumeM3: 1650,
    pricePerM3: 190,
    tags: ['tilt-up', 'commercial', 'office', 'large-scale'],
  },
  {
    id: '8',
    slug: 'water-treatment-facility',
    title: 'Water Treatment Facility — Containment Walls',
    shortDescription: 'Watertight reinforced concrete tanks and containment walls for municipal water treatment.',
    description:
      'Critical containment structures for a new municipal water treatment facility. Crystalline waterproofing admixture was used throughout to achieve watertight performance. Strict ACI 350 (Environmental Engineering Concrete Structures) requirements were met for mix design, cover, and joint detailing.',
    coverImage: getProjectImage('8', 'cover.jpg'),
    images: [
      getProjectImage('8', 'cover.jpg'),
      getProjectImage('8', '1.jpg'),
      getProjectImage('8', '2.jpg'),
    ],
    location: 'San Bernardino, CA',
    date: '2023-09-22',
    concreteType: 'Watertight Crystalline-Admixture Concrete',
    strength: '4500 PSI / 31 MPa',
    volumeM3: 1100,
    pricePerM3: 200,
    tags: ['watertight', 'municipal', 'industrial', 'ACI-350'],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
