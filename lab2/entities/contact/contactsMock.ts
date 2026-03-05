import { Contact } from "./types";

export const contactsMock: { title: string; data: Contact[] }[] = [
  {
    title: "Friends",
    data: [
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        group: "Friends",
        avatar: "https://robohash.org/onecat?set=set4",
      },
      {
        id: "2",
        firstName: "Alice",
        lastName: "Walker",
        group: "Friends",
        avatar: "https://robohash.org/alicecat?set=set4",
      },
      {
        id: "3",
        firstName: "Charlie",
        lastName: "Brown",
        group: "Friends",
        avatar: "https://robohash.org/charliecat?set=set4",
      },
      {
        id: "4",
        firstName: "Diana",
        lastName: "Prince",
        group: "Friends",
        avatar: "https://robohash.org/dianacat?set=set4",
      },
    ],
  },
  {
    title: "Family",
    data: [
      {
        id: "5",
        firstName: "Jane",
        lastName: "Smith",
        group: "Family",
        avatar: "https://robohash.org/megacat?set=set4",
      },
      {
        id: "6",
        firstName: "Michael",
        lastName: "Smith",
        group: "Family",
        avatar: "https://robohash.org/michaelcat?set=set4",
      },
      {
        id: "7",
        firstName: "Emma",
        lastName: "Smith",
        group: "Family",
        avatar: "https://robohash.org/emmacat?set=set4",
      },
    ],
  },
  {
    title: "Work",
    data: [
      {
        id: "8",
        firstName: "Bob",
        lastName: "Johnson",
        group: "Work",
        avatar: "https://robohash.org/cat?set=set4",
      },
      {
        id: "9",
        firstName: "Sarah",
        lastName: "Connor",
        group: "Work",
        avatar: "https://robohash.org/sarahcat?set=set4",
      },
      {
        id: "10",
        firstName: "Kevin",
        lastName: "Hart",
        group: "Work",
        avatar: "https://robohash.org/kevincat?set=set4",
      },
      {
        id: "11",
        firstName: "Laura",
        lastName: "Palmer",
        group: "Work",
        avatar: "https://robohash.org/lauracat?set=set4",
      },
    ],
  },
  {
    title: "Gym",
    data: [
      {
        id: "12",
        firstName: "Mike",
        lastName: "Tyson",
        group: "Gym",
        avatar: "https://robohash.org/mikecat?set=set4",
      },
      {
        id: "13",
        firstName: "Rocky",
        lastName: "Balboa",
        group: "Gym",
        avatar: "https://robohash.org/rockycat?set=set4",
      },
    ],
  },
  {
    title: "University",
    data: [
      {
        id: "14",
        firstName: "Peter",
        lastName: "Parker",
        group: "University",
        avatar: "https://robohash.org/petercat?set=set4",
      },
      {
        id: "15",
        firstName: "Gwen",
        lastName: "Stacy",
        group: "University",
        avatar: "https://robohash.org/gwencat?set=set4",
      },
      {
        id: "16",
        firstName: "Harry",
        lastName: "Osborn",
        group: "University",
        avatar: "https://robohash.org/harrycat?set=set4",
      },
    ],
  },
];
