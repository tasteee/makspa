import { pocket } from './database/pocket';

const artistIds = [
  'nu5goxc1nxxs2jl', 'cy6hedrhnztgxhw', 'bb51ugzdcupcorh'
];

const spaceNames = [
  "Gallery Nexus",
  "Digital Sanctuary",
  "Creative Haven",
  "Ethereal Studio",
  "Innovation Lab",
  "Vision Space"
];

const spaceDescriptions = [
  "A curated space for creative exploration",
  "Where imagination meets reality",
  "A sanctuary for artistic expression",
  "Exploring new dimensions of creativity",
  "A hub for collaborative innovation",
  "Where visions come to life"
];

const colors = [
  "#9f6eff",
  "#ff6e6e",
  "#6eff9f",
  "#6e9fff",
  "#ff9f6e",
  "#9fff6e"
];

const backgroundColors = [
  "#0C1D1A",
  "#1A0C1D",
  "#1D1A0C",
  "#0C1A1D",
  "#1D0C1A",
  "#1A1D0C"
];

const gridCellColors = [
  "#1E7158",
  "#71581E",
  "#581E71",
  "#1E5871",
  "#711E58",
  "#58711E"
];

const gridSectionColors = [
  "#00FFD5",
  "#FFD500",
  "#D500FF",
  "#00D5FF",
  "#FF00D5",
  "#D5FF00"
];

const floorColor1s = [
  "#0F1A33",
  "#331A0F",
  "#1A0F33",
  "#0F3319",
  "#330F1A",
  "#19330F"
];

const floorColor2s = [
  "#15291E",
  "#29151E",
  "#1E1529",
  "#152918",
  "#291518",
  "#182915"
];

async function createSpaces() {
  let spaceIndex = 0;

  for (const artistId of artistIds) {
    for (let i = 0; i < 3; i++) {
      const space = {
        isPublic: true,
        name: spaceNames[spaceIndex],
        about: spaceDescriptions[spaceIndex],
        thumbnail: "https://i.pinimg.com/474x/65/9d/5f/659d5fd2b1f5ce399fd6f15ac7b3c02b.jpg",
        artist: artistId,
        artists: [artistId],
        items: {},
        sizeX: 24,
        sizeY: 12,
        sizeZ: 36,
        color: colors[spaceIndex],
        visits: 0,
        hdr: "sunflowers_puresky_2k.hdr",
        hdrBlur: 0.8,
        backgroundColor: backgroundColors[spaceIndex],
        backgroundMode: "color",
        gridOpacity: 50,
        gridCellLineColor: gridCellColors[spaceIndex],
        gridCellSize: 0.1,
        gridCellLineThickness: 1,
        gridSectionLineColor: gridSectionColors[spaceIndex],
        gridSectionSize: 1,
        gridSectionLineThickness: 1,
        gridFadeAmount: 1,
        gridFadeDistance: 20,
        isGridVisible: true,
        isFloorVisible: true,
        isHdrEnabled: true,
        floorColor1: floorColor1s[spaceIndex],
        floorOpacity1: 75,
        floorColor2: floorColor2s[spaceIndex],
        floorOpacity2: 100,
        soundtrack: [],
        assets: []
      };

      try {
        const created = await pocket.collection('spaces').create(space);
        console.log(`Created space "${space.name}" for artist ${artistId}:`, created.id);
      } catch (error) {
        console.error(`Error creating space "${space.name}":`, error);
      }

      spaceIndex++;
    }
  }
}



globalThis.createSpaces = () => {
  createSpaces().then(() => {
    console.log('All spaces created successfully!');
  }).catch((error) => {
    console.error('Error creating spaces:', error);
  });
}