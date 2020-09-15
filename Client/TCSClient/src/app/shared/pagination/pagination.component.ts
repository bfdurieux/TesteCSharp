import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpresaListService } from '../../empresa/empresa-list.service';
import { listenerCount } from 'process';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() page: number;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();

  isDisabledBtnPrev: boolean;
  isDisabledBtnNext: boolean;
  private _listService: EmpresaListService;

  constructor(listService: EmpresaListService) {
    this._listService = listService;
  }

  ngOnInit(): void {
    this._listService.disablePageNextButton.subscribe(
      (f) => (this.isDisabledBtnNext = f)
    );
    this._listService.disablePagePrevButton.subscribe(
      (f) => (this.isDisabledBtnPrev = f)
    );
  }

  onPrev(): void {
    this.goPrev.emit(true);
  }

  onNext() {
    this.goNext.emit(true);
  }
}
