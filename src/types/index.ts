export interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  coverImage: string
  images: string[]
  location: string
  date: string           // ISO date string e.g. "2024-03-15"
  concreteType: string   // e.g. "Ready-Mix Normal Concrete"
  strength: string       // e.g. "4000 PSI / 28 MPa"
  volumeM3: number
  pricePerM3: number     // USD
  tags: string[]
}

export interface QuoteFormData {
  name: string
  phone: string
  email: string
  projectType: string
  desiredM3: number
  address: string
  notes: string
  prefillProjectName?: string
}
