import { Artifact } from "@/models/Artifact";

export const featuredArtifacts: Artifact[] = [
  {
    id: 101,
    name: "Luba Royal Stool",
    tribe: "Luba",
    price: 4800,
    description: "A ceremonial stool used by Luba royalty, intricately carved with ancestral figures and cultural symbols. Collected circa 1992.",
    material: "Hardwood with natural patina",
    dimensions: "45cm × 30cm × 35cm",
    image: "/images/featured_artifacts/luba_stool.jpg",
    images: [
      "/api/placeholder/500/500",
      "/api/placeholder/500/500",
      "/api/placeholder/500/500",
    ],
    featured: false
  },
  {
    id: 102,
    name: "Lega Mask",
    tribe: "Lega",
    price: 500,
    description: "Lega mask, covered with an old coat of kaolin, light wood,rough cutting of the back, age and usage obvious  ",

    material: "Coat with kaolin ",
    dimensions: "28 x 16 x 9 cm. 	",
    image: "/images/antiques/mask1.jpg",
    images: [
      "/images/antiques/mask1.jpg",
      "/images/antiques/mask2.jpg",
      "/images/antiques/mask3.jpg",
    ],
    featured: false
  },
  {
    id: 103,
    name: "Lega Mask",
    tribe: "Lega",
    price: 450,
    description: "Lega mask with small horns, medium light wood, kaolin remaining on most of the face. Signs of usage, remnant of raffia beard. ",

    material: "Kaolin",
    dimensions: "24 x 17 x 7 cm",
    image: "/images/antiques/mask4.jpg",
    images: [
      "/images/antiques/mask4.jpg",
      "/images/antiques/mask5.jpg",
      "/images/antiques/mask6.jpg",
    ],
    featured: false
  },
  {
    id: 104,
    name: "Lega Ancestor Figure",
    tribe: "Lega",
    price: 300,
    description: "Sakimatwematwe, Lega. Each head with holes for the eyes and he mouth, medium heavy wood,Traditional black patina and kaolin remnants on face. ",
    material: "Wood, Kaolin, Patina",
    dimensions: "24 x 12 x 12 cm	",
    image: "/images/antiques/figure1.jpg",
    images: ["/images/antiques/figure1.jpg", "/images/antiques/figure2.jpg"],
    featured: false
  },
];
