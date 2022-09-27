import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const lists = [
      { id: 1, name: "Teeth Brush", category_id: 1, explanation: "We have to brush teeth three times a day.", expiration_day: "2022-12-31 07:30", priority: "middle" },
      { id: 2, name: "Finish Task A", category_id: 2, explanation: "Task A can take 5 days to finish, so I have to start it as soon as possible.", expiration_day: "2022-11-01 23:59", priority: "high" }
    ];
    const categories = [
      { id: 1, name: "HouseHold" },
      { id: 2, name: "Work" },
      { id: 3, name: "Event" }
    ];
    return { lists, categories };
  }
}
