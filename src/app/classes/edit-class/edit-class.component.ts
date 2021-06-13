import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/shared/log/log.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent implements OnInit {

  constructor(private logger: LogService) { }

  ngOnInit(): void {
    this.logger.log('The dialog was opened')
  }

  // showModal(): void {
  //   this.displayService.setShowModal(true);
  //   // communication to show the modal, I use a behaviour subject from a service layer here
  // }

}
