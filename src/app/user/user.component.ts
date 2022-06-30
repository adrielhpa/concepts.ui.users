import { Component, OnInit } from '@angular/core';
import { filter, firstValueFrom, take } from 'rxjs';
import { SignalrService } from '../signalr-services/signalr-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private signalRService: SignalrService) { }

  async ngOnInit(): Promise<void> {
    const promise = firstValueFrom(this.signalRService.started.pipe(filter(x => x),take(1)));
    await promise;
    this.signalRService.joinGroup('Users');
    this.signalRService.exitGroup('Products');
  }
}
