// export class Course {
//     id: number;
//     name: string;
//     description: string;
//     date: string;
//     time: string;
//     duration: number;
//     constructor(id: number, name: string, description: string, date: string, time: string, duration: number) {
//         this.id = id;
//         this.name = name;
//         this.description = description;
//         this.date = date;
//         this.time = time;
//         this.duration = duration;
//       }
//   }
export interface Course {
    id: number;
    title: string;
    description: string;
    duration: number; // Duration in weeks
  }
  